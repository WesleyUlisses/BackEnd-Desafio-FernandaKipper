"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const swagger_jsdoc_1 = __importDefault(require("swagger-jsdoc"));
const PORT = process.env.PORT ? parseInt(process.env.PORT) : 3003;
const options = {
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
const swaggerSpec = (0, swagger_jsdoc_1.default)(options);
exports.default = swaggerSpec;
