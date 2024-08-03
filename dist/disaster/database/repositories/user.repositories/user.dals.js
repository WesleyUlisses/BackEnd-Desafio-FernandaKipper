"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserDals = void 0;
const prisma_databases_1 = require("../../prisma.databases");
class UserDals {
    ccnstructor() {
    }
    async createUser({ name, whatsapp, phone, email }) {
        const result = await prisma_databases_1.prisma.user.create({
            data: {
                name,
                whatsapp,
                phone,
                email
            }
        });
        return result;
    }
}
exports.UserDals = UserDals;
