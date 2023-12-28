import express, { Request, Response } from 'express';
import swaggerUi from 'swagger-ui-express';
import specs from './swagger';
import learningFactRoutes from './routes/LearningFactRoutes';
import learningPackageRoutes from './routes/LearningPackageRoutes';

// Create Express application
const app = express();

(async () => {
  try {
    // Start the server
    const port = 3000; // You can change this to the desired port number
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

// Middleware to parse JSON request bodies
app.use(express.json());

// Use Swagger UI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

// Use the imported route files as middleware
app.use(learningFactRoutes);
app.use(learningPackageRoutes);

// Define route handlers
app.get('/api/liveness', (req: Request, res: Response) => {
  res.status(200).send('OK');
});

export default app;
