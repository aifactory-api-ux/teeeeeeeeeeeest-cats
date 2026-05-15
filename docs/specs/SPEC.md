# SPEC.md

## 1. TECHNOLOGY STACK

- **Backend**
  - Node.js v20.x
  - Express.js v4.18.x
  - PostgreSQL v15.x
  - Redis v7.x
  - JWT (jsonwebtoken v9.x)
  - Swagger/OpenAPI (swagger-jsdoc v7.x, swagger-ui-express v5.x)
- **Frontend**
  - React v18.x
  - Next.js v14.x
  - TypeScript v5.x
- **Infrastructure**
  - Docker v24.x
  - docker-compose v2.x
  - Kubernetes v1.28.x

## 2. DATA CONTRACTS

### TypeScript Interfaces (frontend & backend shared)

```typescript
// Product
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// ProductCreate
export interface ProductCreate {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  stock: number;
  category: string;
}

// User
export interface User {
  id: number;
  email: string;
  passwordHash: string;
  name: string;
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// UserRegister
export interface UserRegister {
  email: string;
  password: string;
  name: string;
}

// UserLogin
export interface UserLogin {
  email: string;
  password: string;
}

// AuthResponse
export interface AuthResponse {
  token: string;
  user: User;
}

// CartItem
export interface CartItem {
  productId: number;
  quantity: number;
}

// Cart
export interface Cart {
  id: number;
  userId: number;
  items: CartItem[];
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}

// Order
export interface Order {
  id: number;
  userId: number;
  items: CartItem[];
  total: number;
  status: 'pending' | 'paid' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string; // ISO8601
  updatedAt: string; // ISO8601
}
```

## 3. API ENDPOINTS

### Product Endpoints

- **GET /api/products**
  - Request: none
  - Response: `Product[]`

- **GET /api/products/:id**
  - Request: none
  - Response: `Product`

- **POST /api/products**
  - Request body: `ProductCreate`
  - Response: `Product`

- **PUT /api/products/:id**
  - Request body: `ProductCreate`
  - Response: `Product`

- **DELETE /api/products/:id**
  - Request: none
  - Response: `{ success: boolean }`

### User & Auth Endpoints

- **POST /api/auth/register**
  - Request body: `UserRegister`
  - Response: `AuthResponse`

- **POST /api/auth/login**
  - Request body: `UserLogin`
  - Response: `AuthResponse`

- **GET /api/auth/me**
  - Auth: Bearer JWT
  - Request: none
  - Response: `User`

### Cart Endpoints

- **GET /api/cart**
  - Auth: Bearer JWT
  - Request: none
  - Response: `Cart`

- **POST /api/cart/items**
  - Auth: Bearer JWT
  - Request body: `{ productId: number; quantity: number }`
  - Response: `Cart`

- **PUT /api/cart/items/:productId**
  - Auth: Bearer JWT
  - Request body: `{ quantity: number }`
  - Response: `Cart`

- **DELETE /api/cart/items/:productId**
  - Auth: Bearer JWT
  - Request: none
  - Response: `Cart`

### Order Endpoints

- **POST /api/orders**
  - Auth: Bearer JWT
  - Request body: none (creates order from current cart)
  - Response: `Order`

- **GET /api/orders**
  - Auth: Bearer JWT
  - Request: none
  - Response: `Order[]`

- **GET /api/orders/:id**
  - Auth: Bearer JWT
  - Request: none
  - Response: `Order`

## 4. FILE STRUCTURE

### PORT TABLE

| Service         | Listening Port | Path                    |
|-----------------|---------------|-------------------------|
| api-service     | 23001         | backend/api-service/    |
| redis           | 26379         | (docker image)          |
| postgres        | 25432         | (docker image)          |

### FILE TREE

```
.
├── docker-compose.yml                # Multi-service orchestration
├── .env.example                     # Environment variables template
├── .gitignore                       # Git ignore rules
├── README.md                        # Project documentation
├── run.sh                           # Root startup script
├── backend/
│   ├── api-service/
│   │   ├── Dockerfile               # API service Dockerfile (EXPOSE 23001)
│   │   ├── src/
│   │   │   ├── index.ts             # Express app entry point
│   │   │   ├── app.ts               # Express app setup
│   │   │   ├── routes/
│   │   │   │   ├── products.ts      # Product endpoints
│   │   │   │   ├── auth.ts          # Auth endpoints
│   │   │   │   ├── cart.ts          # Cart endpoints
│   │   │   │   ├── orders.ts        # Order endpoints
│   │   │   ├── controllers/
│   │   │   │   ├── productController.ts
│   │   │   │   ├── authController.ts
│   │   │   │   ├── cartController.ts
│   │   │   │   ├── orderController.ts
│   │   │   ├── models/
│   │   │   │   ├── product.ts
│   │   │   │   ├── user.ts
│   │   │   │   ├── cart.ts
│   │   │   │   ├── order.ts
│   │   │   ├── middlewares/
│   │   │   │   ├── auth.ts
│   │   │   │   ├── errorHandler.ts
│   │   │   ├── utils/
│   │   │   │   ├── jwt.ts
│   │   │   │   ├── db.ts
│   │   │   │   ├── redis.ts
│   │   │   ├── swagger/
│   │   │   │   ├── swagger.ts       # Swagger setup
│   │   │   ├── shared/
│   │   │   │   ├── types.ts         # Shared TypeScript interfaces
│   │   │   │   ├── constants.ts
│   │   │   └── config/
│   │   │       ├── index.ts         # Loads env vars
│   │   │       ├── db.ts            # DB config
│   │   │       ├── redis.ts         # Redis config
│   │   └── package.json
│   │   └── tsconfig.json
│   └── shared/                      # Shared modules (copied into api-service)
│       ├── types.ts                 # Shared interfaces
│       ├── constants.ts
├── frontend/
│   ├── Dockerfile                   # Frontend Dockerfile (EXPOSE 3000)
│   ├── next.config.js               # Next.js config
│   ├── package.json
│   ├── tsconfig.json
│   ├── public/
│   │   └── favicon.ico
│   ├── src/
│   │   ├── pages/
│   │   │   ├── _app.tsx
│   │   │   ├── index.tsx
│   │   │   ├── products/
│   │   │   │   ├── index.tsx
│   │   │   │   ├── [id].tsx
│   │   │   ├── cart.tsx
│   │   │   ├── orders.tsx
│   │   │   ├── login.tsx
│   │   │   ├── register.tsx
│   │   ├── components/
│   │   │   ├── ProductList.tsx
│   │   │   ├── ProductCard.tsx
│   │   │   ├── Cart.tsx
│   │   │   ├── CartItem.tsx
│   │   │   ├── OrderList.tsx
│   │   │   ├── OrderCard.tsx
│   │   │   ├── AuthForm.tsx
│   │   ├── hooks/
│   │   │   ├── useProducts.ts
│   │   │   ├── useCart.ts
│   │   │   ├── useOrders.ts
│   │   │   ├── useAuth.ts
│   │   ├── context/
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CartContext.tsx
│   │   ├── styles/
│   │   │   ├── tokens.ts
│   │   │   ├── globals.css
│   │   └── utils/
│   │       ├── api.ts
│   │       ├── fetcher.ts
│   └── .env.example
├── k8s/
│   ├── api-deployment.yaml          # API service deployment
│   ├── api-service.yaml             # API service definition
│   ├── frontend-deployment.yaml     # Frontend deployment
│   ├── frontend-service.yaml        # Frontend service definition
│   ├── postgres-deployment.yaml     # PostgreSQL deployment
│   ├── postgres-service.yaml        # PostgreSQL service definition
│   ├── redis-deployment.yaml        # Redis deployment
│   ├── redis-service.yaml           # Redis service definition
```

### SHARED MODULES

| Shared path         | Imported by services      |
|---------------------|--------------------------|
| backend/shared/     | api-service              |

## 5. ENVIRONMENT VARIABLES

| Name                  | Type     | Description                                   | Example Value                |
|-----------------------|----------|-----------------------------------------------|------------------------------|
| NODE_ENV              | string   | Node environment                              | production                   |
| PORT                  | number   | API service port                              | 23001                        |
| DATABASE_URL          | string   | PostgreSQL connection string                  | postgres://user:pass@db:5432/cats |
| REDIS_URL             | string   | Redis connection string                       | redis://redis:6379           |
| JWT_SECRET            | string   | JWT signing secret                            | supersecretjwtkey            |
| JWT_EXPIRES_IN        | string   | JWT expiration (e.g., 1d, 12h)                | 1d                           |
| FRONTEND_URL          | string   | Public frontend URL                           | http://localhost:3000        |
| SWAGGER_USER          | string   | Swagger UI basic auth username                | admin                        |
| SWAGGER_PASS          | string   | Swagger UI basic auth password                | password                     |
| NEXT_PUBLIC_API_URL   | string   | API base URL for frontend                     | http://localhost:23001/api   |

## 6. IMPORT CONTRACTS

### Backend

- `from models/product import Product`
- `from models/user import User`
- `from models/cart import Cart`
- `from models/order import Order`
- `from shared/types import Product, ProductCreate, User, UserRegister, UserLogin, AuthResponse, Cart, CartItem, Order`
- `from utils/jwt import signJwt, verifyJwt`
- `from utils/db import getDbConnection`
- `from utils/redis import getRedisClient`
- `from middlewares/auth import authenticate`
- `from middlewares/errorHandler import errorHandler`
- `from config/index import config`
- `from swagger/swagger import swaggerSpec`

### Frontend

- `import { Product, ProductCreate, User, UserRegister, UserLogin, AuthResponse, Cart, CartItem, Order } from '../../backend/shared/types'`
- `import { useProducts } from '../hooks/useProducts'`
- `import { useCart } from '../hooks/useCart'`
- `import { useOrders } from '../hooks/useOrders'`
- `import { useAuth } from '../hooks/useAuth'`
- `import { AuthContext } from '../context/AuthContext'`
- `import { CartContext } from '../context/CartContext'`
- `import { tokens } from '../styles/tokens'`
- `import { api } from '../utils/api'`
- `import { fetcher } from '../utils/fetcher'`

## 7. FRONTEND STATE & COMPONENT CONTRACTS

### React Hooks

- `useProducts() → { products, loading, error, fetchProducts, createProduct, updateProduct, deleteProduct }`
- `useCart() → { cart, loading, error, addToCart, updateCartItem, removeFromCart, clearCart }`
- `useOrders() → { orders, loading, error, createOrder, fetchOrders }`
- `useAuth() → { user, token, loading, error, login, register, logout }`

### React Context

- `AuthContext → { user, token, login, register, logout }`
- `CartContext → { cart, addToCart, updateCartItem, removeFromCart, clearCart }`

### Components

- `ProductList  props: { products: Product[], onSelect: (id: number) => void }`
- `ProductCard  props: { product: Product, onAddToCart: (productId: number) => void }`
- `Cart        props: { cart: Cart, onCheckout: () => void }`
- `CartItem    props: { item: CartItem, product: Product, onUpdate: (quantity: number) => void, onRemove: () => void }`
- `OrderList   props: { orders: Order[], onSelect: (id: number) => void }`
- `OrderCard   props: { order: Order }`
- `AuthForm    props: { onSubmit: (data: UserLogin | UserRegister) => void, loading: boolean, error: string | null, mode: 'login' | 'register' }`

## 8. FILE EXTENSION CONVENTION

- All frontend files use `.tsx` (TypeScript React)
- The project is TypeScript throughout (backend and frontend)
- Entry point: `/src/pages/_app.tsx` (referenced by Next.js, not directly in index.html)

## 9. DESIGN TOKENS

```typescript
export const tokens = {
  colors: {
    primary: '#FFB300',
    secondary: '#4A4A4A',
    accent: '#FF7043',
    background: '#FFF8E1',
    surface: '#FFFFFF',
    text: '#222222',
    muted: '#757575',
    border: '#E0E0E0',
    error: '#D32F2F',
    success: '#388E3C'
  },
  typography: {
    fontFamily: "'Inter', 'Roboto', sans-serif",
    fontSizeBase: '1rem',
    fontSizeSm: '0.875rem',
    fontSizeLg: '1.25rem',
    fontWeightRegular: 400,
    fontWeightBold: 700,
    lineHeight: 1.5
  },
  spacing: {
    0: '0px',
    1: '0.25rem',
    2: '0.5rem',
    3: '0.75rem',
    4: '1rem',
    6: '1.5rem',
    8: '2rem'
  },
  borderRadius: {
    sm: '4px',
    md: '8px',
    lg: '16px',
    full: '9999px'
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 8px rgba(0,0,0,0.10)',
    lg: '0 4px 16px rgba(0,0,0,0.15)'
  }
};
```
