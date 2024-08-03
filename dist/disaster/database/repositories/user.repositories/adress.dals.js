"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdressDals = void 0;
const prisma_databases_1 = require("../../prisma.databases");
class AdressDals {
    constructor() { }
    async createAdress({ neighborhood, cep, cityName, latitude, longitude, state, userId }) {
        const result = await prisma_databases_1.prisma.$transaction(async (prisma) => {
            // Primeiro, crie a cidade
            const createdCity = await prisma.city.create({
                data: {
                    name: cityName,
                    state: state,
                    latitude: latitude,
                    longitude: longitude,
                },
            });
            // Em seguida, crie o endereço relacionado à cidade
            const createdAddress = await prisma.adress.create({
                data: {
                    neighborhood,
                    cep,
                    cityId: createdCity.id, // Relacionando com a cidade criada
                    state: createdCity.state,
                    userId,
                },
            });
            return { createdCity, createdAddress };
        });
        return result;
    }
}
exports.AdressDals = AdressDals;
