import { prisma } from '../../prisma.databases';
import { IAdressCreate } from '../../../interfaces/adress.interfaces';

class AdressDals {
    constructor() {}

    async createAdress({ neighborhood, cep, cityName, latitude, longitude, state, userId }: IAdressCreate) {
        const result = await prisma.$transaction(async (prisma) => {
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

export { AdressDals };
