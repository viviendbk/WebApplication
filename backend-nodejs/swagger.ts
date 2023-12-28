// swagger.ts

import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Your API Title',
            version: '1.0.0',
            description: 'Your API Description',
        },
    },
    apis: ['./routes/*.ts'], // Specify your route files here
};

const specs = swaggerJsdoc(options);

export default specs;
