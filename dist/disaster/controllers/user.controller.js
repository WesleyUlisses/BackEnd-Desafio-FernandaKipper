"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_services_1 = require("../services/user.services");
class UserControllers {
    constructor() {
        this.userServices = new user_services_1.UserServices();
    }
    async createUser(request, response, nextFunction) {
        const { latitude, longitude, name, whatsapp, phone, email, city, state, cep, neighborhood } = request.body;
        const result = await this.userServices.createUser({ name, whatsapp, phone, email, city, state, cep, neighborhood, latitude, longitude });
        return response.status(200).json(result);
    }
}
exports.UserControllers = UserControllers;
