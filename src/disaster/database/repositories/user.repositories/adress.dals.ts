import { prisma } from '../../prisma.databases';
import { IAdressCreate } from '../../../interfaces/adress.interfaces';
class   AdressDals{
    ccnstructor(){

    }
    async createAdress({neighborhood, cep, city, state, userId}: IAdressCreate){
        const result = await prisma.adress.create({
            data: {
                city,
                state,
                userId,
                cep,
                neighborhood
            }
        });

        return result;
    }
}
export {AdressDals}