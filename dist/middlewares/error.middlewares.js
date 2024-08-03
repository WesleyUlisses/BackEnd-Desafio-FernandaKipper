"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorMiddleware = void 0;
const errorMiddleware = (error, request, response, next) => {
    const statusCode = error.statusCode ?? 500;
    const message = error.message;
    return response.status(statusCode).json({ statusCode, message });
};
exports.errorMiddleware = errorMiddleware;
