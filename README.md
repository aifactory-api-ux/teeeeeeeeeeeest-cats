# E-commerce API Service

Backend API service for e-commerce platform built with Node.js, Express, PostgreSQL, and Redis.

## Technology Stack

- **Runtime**: Node.js v20.x
- **Framework**: Express.js v4.18.x
- **Database**: PostgreSQL v15.x
- **Cache**: Redis v7.x
- **Authentication**: JWT (jsonwebtoken v9.x)
- **API Documentation**: Swagger/OpenAPI

## Project Structure

```
backend/
├── api-service/
│   ├── src/
│   │   ├── controllers/
│   │   ├── routes/
│   │   ├── models/
│   │   ├── middlewares/
│   │   ├── utils/
│   │   ├── swagger/
│   │   ├── config/
│   │   └── shared/
│   └── package.json
└── shared/
    ├── types.ts
    └── constants.ts
```

## Getting Started

### Prerequisites

- Node.js v20.x
- Docker & Docker Compose
- PostgreSQL 15.x
- Redis 7.x

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend/api-service
   npm install
   ```

3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```

4. Start services:
   ```bash
   docker-compose up -d
   ```

5. Run the application:
   ```bash
   ./run.sh
   ```

## API Endpoints

### Products
- `GET /api/products` - List all products
- `GET /api/products/:id` - Get product by ID
- `POST /api/products` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login
- `GET /api/auth/me` - Get current user

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/items` - Add item to cart
- `PUT /api/cart/items/:productId` - Update cart item
- `DELETE /api/cart/items/:productId` - Remove from cart

### Orders
- `POST /api/orders` - Create order from cart
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get order by ID

## API Documentation

Once running, visit:
- Swagger UI: http://localhost:23001/docs
- OpenAPI JSON: http://localhost:23001/openapi.json

## Running Tests

```bash
# Run api-service tests
cd backend/api-service && chmod +x run_tests.sh && ./run_tests.sh

# Run shared tests
cd backend/shared && chmod +x run_tests.sh && ./run_tests.sh
```

## Ports

| Service     | Port |
|-------------|------|
| API Service | 23001 |
| PostgreSQL  | 25432 |
| Redis       | 26379 |