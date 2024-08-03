import swaggerJSDoc from 'swagger-jsdoc';

const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;

const options: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: '3.0.0',
    info: {
      title: 'API Apoio EcoCrise',
      version: '1.0.0',
      description: `Esta API é responsável por gerenciar crie climaticar alertas os usuarios.`,
    },
    servers: [
      {
        "url": `http://localhost:${PORT}`,
        "description": "Servidor Local"
      }
    ],
  },
  apis: ['./src/disaster/routes/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;
