import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.1.0',
    info: {
      title: 'E-commerce API',
      version: '1.0.0',
      description: 'API for e-commerce platform',
    },
    servers: [
      {
        url: 'http://localhost:23001',
        description: 'Development server',
      },
    ],
    paths: {
      '/api/products': {
        get: {
          operationId: 'get_api_products',
          responses: {
            '200': {
              description: 'List of products',
              content: {
                'application/json': {
                  schema: {
                    type: 'array',
                  },
                },
              },
            },
          },
        },
        post: {
          operationId: 'post_api_products',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Product created',
            },
          },
        },
      },
      '/api/products/{id}': {
        get: {
          operationId: 'get_api_products_id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Product details',
            },
          },
        },
        put: {
          operationId: 'put_api_products_id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Product updated',
            },
          },
        },
        delete: {
          operationId: 'delete_api_products_id',
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            '204': {
              description: 'Product deleted',
            },
          },
        },
      },
      '/api/auth/register': {
        post: {
          operationId: 'post_api_auth_register',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User registered',
            },
          },
        },
      },
      '/api/auth/login': {
        post: {
          operationId: 'post_api_auth_login',
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'User logged in',
            },
          },
        },
      },
      '/api/auth/me': {
        get: {
          operationId: 'get_api_auth_me',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '200': {
              description: 'Current user',
            },
          },
        },
      },
      '/api/cart': {
        get: {
          operationId: 'get_api_cart',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '200': {
              description: 'Cart details',
            },
          },
        },
      },
      '/api/cart/items': {
        post: {
          operationId: 'post_api_cart_items',
          security: [
            {
              bearerAuth: [],
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          responses: {
            '201': {
              description: 'Item added to cart',
            },
          },
        },
      },
      '/api/cart/items/{productId}': {
        put: {
          operationId: 'put_api_cart_items_productId',
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: 'productId',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          requestBody: {
            required: true,
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                },
              },
            },
          },
          responses: {
            '200': {
              description: 'Cart item updated',
            },
          },
        },
        delete: {
          operationId: 'delete_api_cart_items_productId',
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: 'productId',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            '204': {
              description: 'Item removed from cart',
            },
          },
        },
      },
      '/api/orders': {
        get: {
          operationId: 'get_api_orders',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '200': {
              description: 'List of orders',
            },
          },
        },
        post: {
          operationId: 'post_api_orders',
          security: [
            {
              bearerAuth: [],
            },
          ],
          responses: {
            '201': {
              description: 'Order created',
            },
          },
        },
      },
      '/api/orders/{id}': {
        get: {
          operationId: 'get_api_orders_id',
          security: [
            {
              bearerAuth: [],
            },
          ],
          parameters: [
            {
              name: 'id',
              in: 'path',
              required: true,
              schema: {
                type: 'integer',
              },
            },
          ],
          responses: {
            '200': {
              description: 'Order details',
            },
          },
        },
      },
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/*.ts'],
};

export const swaggerSpec = swaggerJsdoc(swaggerOptions);

export { swaggerUi };