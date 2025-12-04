const express = require('express');
const cors = require('cors');
const { verifyUser } = require('../middleware');
const userRoutes = require('../routes/userRoutes');
const { swaggerUi, swaggerSpec } = require('../swagger');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Swagger JSON endpoint for export
app.get('/api-docs.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

/**
 * @swagger
 * /:
 *   get:
 *     summary: Health check endpoint
 *     description: Returns a simple hello world message to verify the API is running
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Successful response
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 msg:
 *                   type: string
 *                   example: Hello World!
 *       500:
 *         description: Internal server error
 */
app.get('/', async (req, res) => {
  try {
    return res.json({msg: 'Hello World!'});
  } catch (error) {
    console.error('Error handling request:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.use("/users", verifyUser, userRoutes);

module.exports = app;