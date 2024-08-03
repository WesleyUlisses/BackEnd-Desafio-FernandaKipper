"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = require("../controllers/user.controller");
class UserRoutes {
    constructor() {
        this.router = (0, express_1.Router)();
        this.userController = new user_controller_1.UserControllers();
    }
    postRoutes() {
        /**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: John Doe
 *         whatsapp:
 *           type: string
 *           example: +1234567890
 *         phone:
 *           type: string
 *           example: +1234567890
 *         email:
 *           type: string
 *           example: johndoe@example.com
 *         city:
 *           type: string
 *           example: São Paulo
 *         state:
 *           type: string
 *           example: SP
 *         cep:
 *           type: string
 *           example: 01001-000
 *         neighborhood:
 *           type: string
 *           example: Centro
 *         latitude:
 *           type: number
 *           example: -23.55052
 *         longitude:
 *           type: number
 *           example: -46.633308
 *
 *   responses:
 *     UserCreated:
 *       description: Usuário e endereço criados com sucesso
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user:
 *                 $ref: '#/components/schemas/User'
 *               address:
 *                 $ref: '#/components/schemas/User'
 *               message:
 *                 type: string
 *                 example: "User and address created successfully"
 *
 * /users:
 *   post:
 *     summary: Cria um novo usuário e endereço
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         $ref: '#/components/responses/UserCreated'
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: user not created
 */
        this.router.post('/create-user', this.userController.createUser.bind(this.userController));
        return this.router;
    }
}
exports.UserRoutes = UserRoutes;
