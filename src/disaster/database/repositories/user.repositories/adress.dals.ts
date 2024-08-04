import { prisma } from '../../prisma.databases';
import { IAdressCreate } from '../../../interfaces/adress.interfaces';
import { CityDals } from './city.dals';

class AdressDals {
    private cityDals: CityDals;
    constructor() {
        this.cityDals = new CityDals();
    }
    async findAddressesByCity(cityName: string, state: string) {
        // Verificar se a cidade existe
        const city = await this.cityDals.doesCityExist(cityName, state);
        if (!city) {
            throw new Error(`Cidade ${cityName}, ${state} não encontrada no banco de dados.`);
        }

        // Recuperar todos os endereços associados à cidade
        const addresses = await prisma.adress.findMany({
            where: {
                cityId: city.id,
            },
        });

        return addresses;
    }

    async createAdress({ neighborhood, cep, cityName, latitude, longitude, state, userId }: IAdressCreate) {
        const result = await prisma.$transaction(async (prisma) => {

            let city = await this.cityDals.doesCityExist(cityName, state);
            if(!city){
                city = await prisma.city.create({
                    data: {
                        name: cityName,
                        state: state,
                        latitude: latitude,
                        longitude: longitude,
                    },
                });
         }

            // Em seguida, crie o endereço relacionado à cidade
            const createdAddress = await prisma.adress.create({
                data: {
                    neighborhood,
                    cep,
                    cityId: city.id, 
                    userId,
                },
            });

            return { city, createdAddress };
        });

        return result;
    }
}

export { AdressDals };
