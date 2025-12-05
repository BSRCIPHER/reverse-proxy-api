const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Swagger Proxy Server API',
      version: '1.0.0',
      description: 'A proxy server that bypasses CORS and X-Frame-Options restrictions, allowing you to embed any URL in an iframe. Includes URL frameability checking and base64url encoding support.',
      contact: {
        name: 'API Support',
        email: 'support@example.com'
      },
      license: {
        name: 'MIT',
        url: 'https://opensource.org/licenses/MIT'
      }
    },
    servers: [
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      },
      {
        url: 'https://reverse-proxy-007-9si2.vercel.app',
        description: 'Production server (Vercel)'
      }
    ],
    tags: [
      {
        name: 'Health',
        description: 'Server health and information endpoints'
      },
      {
        name: 'Proxy',
        description: 'Proxy and URL checking endpoints'
      }
    ],
    components: {
      schemas: {
        HealthResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'ok'
            },
            message: {
              type: 'string',
              example: 'Swagger Proxy Server'
            },
            endpoints: {
              type: 'object',
              properties: {
                proxy: {
                  type: 'string'
                },
                proxyLegacy: {
                  type: 'string'
                },
                check: {
                  type: 'string'
                },
                broken: {
                  type: 'string'
                }
              }
            }
          }
        },
        CheckRequest: {
          type: 'object',
          required: ['url'],
          properties: {
            url: {
              type: 'string',
              format: 'uri',
              example: 'https://example.com',
              description: 'The URL to check for frameability'
            }
          }
        },
        CheckResponse: {
          type: 'object',
          properties: {
            frameable: {
              type: 'boolean',
              description: 'Whether the URL can be embedded in an iframe'
            },
            xFrameOptions: {
              type: 'string',
              nullable: true,
              description: 'The X-Frame-Options header value, if present'
            },
            csp: {
              type: 'string',
              nullable: true,
              description: 'The Content-Security-Policy header value, if present'
            }
          }
        },
        Error: {
          type: 'object',
          properties: {
            error: {
              type: 'string',
              description: 'Error message'
            },
            frameable: {
              type: 'boolean',
              description: 'Always false for error responses'
            }
          }
        }
      }
    }
  },
  apis: ['./server.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = { swaggerUi, swaggerSpec };
