"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const error_middlewares_1 = require("../src/middlewares/error.middlewares");
const user_routes_1 = require("./disaster/routes/user.routes");
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const swagger_1 = __importDefault(require("./swagger"));
class App {
    constructor(corsConfig) {
        this.app = (0, express_1.default)();
        this.middleware(corsConfig);
        this.setupAllRoutes();
    }
    listen(port) {
        this.app.listen(port, () => {
            console.log(`Servidor rodando na porta ${port}`);
        });
        this.app.use(error_middlewares_1.errorMiddleware);
    }
    setupUserRoutes() {
        const userRoutes = new user_routes_1.UserRoutes();
        const userBaseRoute = '/user';
        this.app.use(userBaseRoute, userRoutes.postRoutes());
    }
    setupAllRoutes() {
        this.setupUserRoutes();
        this.setupSwagger();
    }
    setupSwagger() {
        this.app.use('/documentation', swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(swagger_1.default));
    }
    middleware(corsConfig) {
        this.app.use(express_1.default.json());
        this.app.use(corsConfig);
        this.app.use(express_1.default.urlencoded({ extended: true }));
    }
}
exports.App = App;
