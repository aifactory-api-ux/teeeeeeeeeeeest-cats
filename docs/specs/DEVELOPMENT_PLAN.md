# MASTER DEVELOPMENT PLAN

> Fuente de verdad única. Los nombres de clases, fields, rutas y variables
> definidos en §1 son los ÚNICOS válidos — el coder no puede inventar nombres.

> ⚠️ **ORDEN DE IMPLEMENTACIÓN GLOBAL — NO NEGOCIABLE:**
> 1. Implementa **TODOS** los ítems marcados 🔴 TEST (de todos los waves) antes de escribir cualquier ítem 🟢 PROD.
> 2. Una vez escritos todos los tests, implementa los ítems 🟢 PROD.
> 3. Si no hay ítems 🔴 TEST, implementa los 🟢 PROD directamente.
> Razón: el código de producción debe ser escrito sabiendo qué contratos deben satisfacer los tests.

---

# §1 Contratos Globales

## §1.1 Especificación Técnica — Stack, Modelos, Estructura, Env Vars

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

## §1.2 Contrato API (OpenAPI 3.1)
> Ref obligatoria para tests de endpoints: usa los paths, schemas y status codes exactos de aquí.

```yaml
openapi: 3.1.0
info:
  title: Derived API Contract
  version: 1.0.0
paths:
  /api/auth/login:
    post:
      operationId: post_api_auth_login
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/auth/me:
    get:
      operationId: get_api_auth_me
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
  /api/auth/register:
    post:
      operationId: post_api_auth_register
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/cart:
    get:
      operationId: get_api_cart
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
  /api/cart/items:
    post:
      operationId: post_api_cart_items
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/cart/items/:productId:
    delete:
      operationId: delete_api_cart_items_productId
      responses:
        '204':
          description: Derived from SPEC.md
    put:
      operationId: put_api_cart_items_productId
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/orders:
    get:
      operationId: get_api_orders
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
    post:
      operationId: post_api_orders
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/orders/:id:
    get:
      operationId: get_api_orders_id
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
  /api/products:
    get:
      operationId: get_api_products
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
    post:
      operationId: post_api_products
      responses:
        '201':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
  /api/products/:id:
    delete:
      operationId: delete_api_products_id
      responses:
        '204':
          description: Derived from SPEC.md
    get:
      operationId: get_api_products_id
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
    put:
      operationId: put_api_products_id
      responses:
        '200':
          description: Derived from SPEC.md
          content:
            application/json:
              schema:
                type: object
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
```

## §1.3 Archivos de Test y Scripts a Crear (TDD — complemento de la estructura §1.1)
> La FILE STRUCTURE de §1.1 fue generada antes de los specs TDD — no incluye `tests/` ni `run_tests.sh`.
> Los siguientes archivos son OBLIGATORIOS. Créalos en los paths exactos indicados.
> ⚠️  NUNCA usar archivos `.spec.*` co-ubicados con el source.

**Scripts de ejecución (crear y hacer chmod +x):**
- `backend/api-service/run_tests.sh`
- `backend/shared/run_tests.sh`

---

# §2 Plan de Implementación

> **REGLA TDD OBLIGATORIA**
> 1. Escribe el ítem 🔴 TEST completo antes de tocar el ítem 🟢 PROD.
> 2. Corre los tests: deben fallar (RED). Si pasan sin código de producción, el test está mal.
> 3. Escribe el código de producción mínimo para que pasen (GREEN).
> 4. Si los tests fallan después del paso 3, corrige SOLO producción — nunca los tests.

## Wave 1

### 🟢 PROD — run_tests.sh — backend/api-service
> Crea el archivo `backend/api-service/run_tests.sh` con el siguiente contenido EXACTO (no lo modifiques ni resumas):
**Archivos:**
  - `backend/api-service/run_tests.sh`

**Detalle:**
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")"
echo ">>> [backend/api-service] Installing Python test dependencies..."
pip install pytest pytest-cov pytest-asyncio httpx anyio aiosqlite     fastapi sqlalchemy pyjwt passlib bcrypt python-multipart -q 2>/dev/null || true
# Install project deps declared in requirements.txt if present
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt -q 2>/dev/null || true
fi
echo ">>> [backend/api-service] Running tests..."
# Override DB URLs to SQLite in-memory so tests run without a live database
export DATABASE_URL="sqlite+aiosqlite:///:memory:"
export ASYNC_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export DB_URL="sqlite:///:memory:"
export TEST_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export SECRET_KEY="test-secret-key"
export JWT_SECRET="test-secret-key"
# Add service dir + parent dirs to PYTHONPATH so both relative and package imports work
# This handles: microservice layout (from routes import ...) and
#               monolith layout (from app.routers.auth import ...)
export PYTHONPATH="$(pwd):$(dirname $(pwd)):$(dirname $(dirname $(pwd))):${PYTHONPATH:-}"
mkdir -p coverage
python -m pytest tests/ --tb=short -q \
  --cov=. --cov-report=term-missing \
  --cov-report=json:coverage/coverage.json \
  --no-header 2>&1 | tee /tmp/test_out_backend_api-service.txt
echo ">>> [backend/api-service] Done."
```

Luego ejecuta: `chmod +x backend/api-service/run_tests.sh`

### 🟢 PROD — run_tests.sh — backend/shared
> Crea el archivo `backend/shared/run_tests.sh` con el siguiente contenido EXACTO (no lo modifiques ni resumas):
**Archivos:**
  - `backend/shared/run_tests.sh`

**Detalle:**
```bash
#!/bin/bash
set -e
cd "$(dirname "$0")"
echo ">>> [backend/shared] Installing Python test dependencies..."
pip install pytest pytest-cov pytest-asyncio httpx anyio aiosqlite     fastapi sqlalchemy pyjwt passlib bcrypt python-multipart -q 2>/dev/null || true
# Install project deps declared in requirements.txt if present
if [ -f "requirements.txt" ]; then
    pip install -r requirements.txt -q 2>/dev/null || true
fi
echo ">>> [backend/shared] Running tests..."
# Override DB URLs to SQLite in-memory so tests run without a live database
export DATABASE_URL="sqlite+aiosqlite:///:memory:"
export ASYNC_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export DB_URL="sqlite:///:memory:"
export TEST_DATABASE_URL="sqlite+aiosqlite:///:memory:"
export SECRET_KEY="test-secret-key"
export JWT_SECRET="test-secret-key"
# Add service dir + parent dirs to PYTHONPATH so both relative and package imports work
# This handles: microservice layout (from routes import ...) and
#               monolith layout (from app.routers.auth import ...)
export PYTHONPATH="$(pwd):$(dirname $(pwd)):$(dirname $(dirname $(pwd))):${PYTHONPATH:-}"
mkdir -p coverage
python -m pytest tests/ --tb=short -q \
  --cov=. --cov-report=term-missing \
  --cov-report=json:coverage/coverage.json \
  --no-header 2>&1 | tee /tmp/test_out_backend_shared.txt
echo ">>> [backend/shared] Done."
```

Luego ejecuta: `chmod +x backend/shared/run_tests.sh`

### 🔴 TEST — Tests: backend/shared/types.ts
**Archivo a crear:** `backend/shared/tests/test_types.py`


### 🔴 TEST — Tests: backend/shared/constants.ts
**Archivo a crear:** `backend/shared/tests/test_constants.py`


### 🔴 TEST — Tests: backend/api-service/src/shared/types.ts
**Archivo a crear:** `backend/api-service/src/shared/tests/test_types.py`


### 🔴 TEST — Tests: backend/api-service/src/shared/constants.ts
**Archivo a crear:** `backend/api-service/src/shared/tests/test_constants.py`


### 🔴 TEST — Tests: backend/api-service/src/config/index.ts
**Archivo a crear:** `backend/api-service/src/config/tests/test_index.py`


### 🔴 TEST — Tests: backend/api-service/src/config/db.ts
**Archivo a crear:** `backend/api-service/src/config/tests/test_db.py`


### 🔴 TEST — Tests: backend/api-service/src/config/redis.ts
**Archivo a crear:** `backend/api-service/src/config/tests/test_redis.py`


### 🔴 TEST — Tests: backend/api-service/src/utils/db.ts
**Archivo a crear:** `backend/api-service/src/utils/tests/test_db.py`


### 🔴 TEST — Tests: backend/api-service/src/utils/redis.ts
**Archivo a crear:** `backend/api-service/src/utils/tests/test_redis.py`


### 🔴 TEST — Tests: backend/api-service/src/utils/jwt.ts
**Archivo a crear:** `backend/api-service/src/utils/tests/test_jwt.py`


### 🟢 PROD — Foundation — shared types, interfaces, DB schemas, config
> Create all shared TypeScript interfaces, constants, and utility modules; define PostgreSQL schema for all entities; provide environment/config validation and shared constants. All other backend modules will import from these files.
**Archivos:**
  - `backend/shared/types.ts`  
  - `backend/shared/constants.ts`  
  - `backend/api-service/src/shared/types.ts`  
  - `backend/api-service/src/shared/constants.ts`  
  - `backend/api-service/src/config/index.ts`  
  - `backend/api-service/src/config/db.ts`  
  - `backend/api-service/src/config/redis.ts`  
  - `backend/api-service/src/utils/db.ts`  
  - `backend/api-service/src/utils/redis.ts`  
  - `backend/api-service/src/utils/jwt.ts`


### 🟢 PROD — Infrastructure & Deployment
> Provide complete Docker Compose orchestration, environment template, run script, and documentation for local development and deployment. All services must be healthy and accessible after `./run.sh`.
**Archivos:**
  - `docker-compose.yml`  
  - `run.sh`  
  - `README.md`


## Wave 2

### 🔴 TEST — Tests: backend/api-service/src/routes/products.ts
**Archivo a crear:** `backend/api-service/tests/test_products.py`


### 🔴 TEST — Tests: backend/api-service/src/controllers/productController.ts
**Archivo a crear:** `backend/api-service/tests/test_productController.py`


### 🔴 TEST — Tests: backend/api-service/src/models/product.ts
**Archivo a crear:** `backend/api-service/tests/test_product.py`


### 🔴 TEST — Tests: backend/api-service/src/routes/auth.ts
**Archivo a crear:** `backend/api-service/tests/test_auth.py`


### 🔴 TEST — Tests: backend/api-service/src/controllers/authController.ts
**Archivo a crear:** `backend/api-service/tests/test_authController.py`


### 🔴 TEST — Tests: backend/api-service/src/models/user.ts
**Archivo a crear:** `backend/api-service/tests/test_user.py`


### 🔴 TEST — Tests: backend/api-service/src/middlewares/auth.ts
**Archivo a crear:** `backend/api-service/tests/test_auth_middleware.py`


### 🔴 TEST — Tests: backend/api-service/src/routes/cart.ts
**Archivo a crear:** `backend/api-service/tests/test_cart.py`


### 🔴 TEST — Tests: backend/api-service/src/controllers/cartController.ts
**Archivo a crear:** `backend/api-service/tests/test_cartController.py`


### 🔴 TEST — Tests: backend/api-service/src/models/cart.ts
**Archivo a crear:** `backend/api-service/tests/test_cart.py`


### 🔴 TEST — Tests: backend/api-service/src/routes/orders.ts
**Archivo a crear:** `backend/api-service/tests/test_orders.py`


### 🔴 TEST — Tests: backend/api-service/src/controllers/orderController.ts
**Archivo a crear:** `backend/api-service/tests/test_orderController.py`


### 🔴 TEST — Tests: backend/api-service/src/models/order.ts
**Archivo a crear:** `backend/api-service/tests/test_order.py`


### 🟢 PROD — Product Module — CRUD endpoints, search, pagination
> Implement all product endpoints (`GET /api/products`, `GET /api/products/:id`, `POST /api/products`, `PUT /api/products/:id`, `DELETE /api/products/:id`) with pagination and search by name. Includes controller, route, model, and tests.
**Archivos:**
  - `backend/api-service/src/routes/products.ts`  
  - `backend/api-service/src/controllers/productController.ts`  
  - `backend/api-service/src/models/product.ts`


### 🟢 PROD — Auth & User Module — registration, login, JWT, user profile
> Implement user registration (`POST /api/auth/register`), login (`POST /api/auth/login`), and profile (`GET /api/auth/me`) endpoints. Includes JWT issuance/validation, password hashing, and user model.
**Archivos:**
  - `backend/api-service/src/routes/auth.ts`  
  - `backend/api-service/src/controllers/authController.ts`  
  - `backend/api-service/src/models/user.ts`  
  - `backend/api-service/src/middlewares/auth.ts`


### 🟢 PROD — Cart Module — cart CRUD, persistence, JWT protection
> Implement cart endpoints (`GET /api/cart`, `POST /api/cart/items`, `PUT /api/cart/items/:productId`, `DELETE /api/cart/items/:productId`) with JWT protection and Redis-backed persistence. Includes controller, route, model, and tests.
**Archivos:**
  - `backend/api-service/src/routes/cart.ts`  
  - `backend/api-service/src/controllers/cartController.ts`  
  - `backend/api-service/src/models/cart.ts`


### 🟢 PROD — Order Module — order creation, status, history
> Implement order endpoints (`POST /api/orders`, `GET /api/orders`, `GET /api/orders/:id`) with JWT protection, order creation from cart, and order history. Includes controller, route, model, and tests.
**Archivos:**
  - `backend/api-service/src/routes/orders.ts`  
  - `backend/api-service/src/controllers/orderController.ts`  
  - `backend/api-service/src/models/order.ts`


### 🟢 PROD — Design Tokens File
> Implement all Figma design tokens (colors, typography, spacing, radius, shadow) as a TypeScript module.
**Archivos:**
  - `frontend/src/styles/tokens.ts`


### 🟢 PROD — API Hooks/Services
> Implement all API data hooks (useProducts, useProduct, useCart, useOrders, useAuth, etc.) for frontend data fetching/mutation.
**Archivos:**
  - `frontend/src/hooks/useProducts.ts`  
  - `frontend/src/hooks/useProduct.ts`  
  - `frontend/src/hooks/useCart.ts`  
  - `frontend/src/hooks/useOrders.ts`  
  - `frontend/src/hooks/useAuth.ts`


## Wave 3

### 🔴 TEST — Tests: backend/api-service/src/app.ts
**Archivo a crear:** `backend/api-service/tests/test_app.py`


### 🔴 TEST — Tests: backend/api-service/src/index.ts
**Archivo a crear:** `backend/api-service/tests/test_index.py`


### 🔴 TEST — Tests: backend/api-service/src/middlewares/errorHandler.ts
**Archivo a crear:** `backend/api-service/tests/test_errorHandler.py`


### 🔴 TEST — Tests: backend/api-service/src/swagger/swagger.ts
**Archivo a crear:** `backend/api-service/tests/test_swagger.py`


### 🔴 TEST — Tests: backend/api-service/package.json
**Archivo a crear:** `backend/api-service/tests/test_package.py`


### 🔴 TEST — Tests: backend/api-service/tsconfig.json
**Archivo a crear:** `backend/api-service/tests/test_tsconfig.py`


### 🟢 PROD — API Service Bootstrap, Error Handling, Swagger, Healthcheck
> Implement Express app setup, error handling middleware, Swagger/OpenAPI docs, and healthcheck endpoint. Ensure all routes are registered and app starts on correct port.
**Archivos:**
  - `backend/api-service/src/app.ts`  
  - `backend/api-service/src/index.ts`  
  - `backend/api-service/src/middlewares/errorHandler.ts`  
  - `backend/api-service/src/swagger/swagger.ts`  
  - `backend/api-service/package.json`  
  - `backend/api-service/tsconfig.json`


### 🟢 PROD — Navegación principal Component
> Implement the "Navegación principal" component as per Figma and contract.
**Archivos:**
  - `frontend/src/components/ui/NavegacionPrincipal.tsx`


### 🟢 PROD — Botón CTA primario Component
> Implement the "Botón CTA primario" component with all states.
**Archivos:**
  - `frontend/src/components/ui/BotonCTAPrimario.tsx`


### 🟢 PROD — Tarjeta de producto Component
> Implement the "Tarjeta de producto" component for product grid/list.
**Archivos:**
  - `frontend/src/components/ui/TarjetaDeProducto.tsx`


### 🟢 PROD — Campo de entrada de texto Component
> Implement the "Campo de entrada de texto" component for forms and search.
**Archivos:**
  - `frontend/src/components/ui/CampoDeEntradaDeTexto.tsx`


### 🟢 PROD — Selector de cantidad Component
> Implement the "Selector de cantidad" component for product and cart.
**Archivos:**
  - `frontend/src/components/ui/SelectorDeCantidad.tsx`


### 🟢 PROD — Badge Component
> Implement the "Badge" component for discounts, stock, and categories.
**Archivos:**
  - `frontend/src/components/ui/Badge.tsx`


### 🟢 PROD — Modal Component
> Implement the "Modal" component for overlays and dialogs.
**Archivos:**
  - `frontend/src/components/ui/Modal.tsx`


### 🟢 PROD — Tabla de datos Component
> Implement the "Tabla de datos" component for admin/panel use.
**Archivos:**
  - `frontend/src/components/ui/TablaDeDatos.tsx`


### 🟢 PROD — Paginación Component
> Implement the "Paginación" component for product/catalog navigation.
**Archivos:**
  - `frontend/src/components/ui/Paginacion.tsx`


### 🟢 PROD — Barra de búsqueda Component
> Implement the "Barra de búsqueda" component with icon and autocomplete.
**Archivos:**
  - `frontend/src/components/ui/BarraDeBusqueda.tsx`


### 🟢 PROD — Inicio Page
> Implement the "Inicio" page using hero banner, featured categories, popular products, testimonials, and newsletter.
**Archivos:**
  - `frontend/src/pages/Inicio.tsx`


### 🟢 PROD — Catálogo de productos Page
> Implement the "Catálogo de productos" page with product grid, sidebar filters, and search bar.
**Archivos:**
  - `frontend/src/pages/CatalogoDeProductos.tsx`


### 🟢 PROD — Detalle de producto Page
> Implement the "Detalle de producto" page with gallery, info, quantity selector, add-to-cart, and reviews.
**Archivos:**
  - `frontend/src/pages/DetalleDeProducto.tsx`


### 🟢 PROD — Carrito de compras Page
> Implement the "Carrito de compras" page with cart item list, summary, and checkout button.
**Archivos:**
  - `frontend/src/pages/CarritoDeCompras.tsx`


---

# §3 Reglas de Infraestructura (obligatorias)

## §3.1 Dockerfiles
- `WORKDIR /app` en todos los Dockerfiles — paths portables, nunca UUIDs ni `/workspace/...`
- El `docker build` debe funcionar en cualquier máquina sin modificaciones

## §3.2 Base de Datos — Auto-Init Obligatorio
Si el proyecto usa base de datos relacional (PostgreSQL, MySQL, SQLite, MariaDB, etc.),
el backend DEBE ejecutar esta secuencia automáticamente al arrancar el contenedor:

1. **Esperar a que la DB esté lista** — retry loop o wait-for-it, nunca asumir que está disponible
2. **Correr migraciones** — `alembic upgrade head` / `prisma migrate deploy` / `knex migrate:latest` / etc.
3. **Seed de datos de ejemplo** — solo si la tabla principal está vacía (idempotente, nunca duplica al reiniciar)
   - Insertar **3–5 registros realistas** por entidad principal
   - El seed usa los mismos modelos/schemas del proyecto — nunca SQL crudo hardcodeado
   - Patrón Python: `if db.query(Model).count() == 0: db.add_all([...]); db.commit()`
   - Patrón Node: `const count = await prisma.model.count(); if (count === 0) { await prisma.model.createMany({...}) }`

Resultado: después de `./run.sh` la app tiene datos de ejemplo listos, sin pasos manuales.

## §3.3 Puertos de Servicio
- Rango obligatorio para **todos** los puertos del host en docker-compose.yml: **21000–65000**.
- Aplica a TODOS los servicios: backends, frontends Y bases de datos / infraestructura.
- El puerto interno del contenedor se mantiene en el default de la tecnología:
  | Tecnología | Puerto interno | Ejemplo host mapping |
  |-----------|---------------|----------------------|
  | PostgreSQL | 5432 | `'25432:5432'` |
  | MySQL      | 3306 | `'23306:3306'` |
  | Redis      | 6379 | `'26379:6379'` |
  | MongoDB    | 27017 | `'37017:27017'` |
  | Backend API | (PORT TABLE §1.1) | `'23001:23001'` |
- NUNCA exponer 3000, 5000, 5432, 6379, 8000, 8080, 8443 en el lado del host.
- El Tech Lead remapeará automáticamente cualquier puerto fuera del rango 21000–65000.

## §3.4 Frontend con Vite / React / Vue
- `index.html` en la RAÍZ del proyecto (mismo nivel que `package.json` y `vite.config.js`)
- NUNCA solo en `public/` — Vite requiere el entry point en la raíz
- Entry point: `<script type='module' src='/src/main.jsx'></script>`

## §3.5 Variables de Entorno
- Vite: `import.meta.env.VITE_NOMBRE` con fallback → `|| 'http://localhost:PUERTO'` (PUERTO del PORT TABLE §1.1)
- Nunca hardcodear URLs, tokens ni secrets en código fuente

## §3.6 Criterios de Finalización
- Todos los archivos listados en §2 deben existir en disco
- Código completo y funcional — sin TODOs ni stubs
- Tests corriendo y pasando antes del commit final
- `git add -A && git commit -m 'feat: implement project'`