"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserServices = void 0;
const user_dals_1 = require("../database/repositories/user.repositories/user.dals");
const adress_dals_1 = require("../database/repositories/user.repositories/adress.dals");
const error_helpers_1 = require("../../helpers/error.helpers");
class UserServices {
    constructor() {
        this.userDals = new user_dals_1.UserDals();
        this.adressDals = new adress_dals_1.AdressDals();
    }
    async createUser({ name, whatsapp, phone, email, city, state, cep, neighborhood, latitude, longitude }) {
        const user = await this.userDals.createUser({ name, whatsapp, phone, email });
        if (!user) {
            throw new error_helpers_1.BadRequestError({ message: 'user not created' });
        }
        const address = await this.adressDals.createAdress({
            cityName: city,
            state: state,
            userId: user.id,
            cep: cep,
            neighborhood: neighborhood,
            latitude: latitude,
            longitude
        });
        if (!address) {
            throw new error_helpers_1.BadRequestError({ message: 'adress not created' });
        }
        return {
            user: user,
            address: address,
            message: "User and address created successfully"
        };
    }
}
exports.UserServices = UserServices;
