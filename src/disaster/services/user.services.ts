import { UserDals } from '../database/repositories/user.repositories/user.dals';
import { AdressDals } from '../database/repositories/user.repositories/adress.dals';
import { IUserData } from '../interfaces/user.interfaces';
import { BadRequestError } from '../../helpers/error.helpers';


class UserServices {
    private userDals: UserDals;
    private adressDals: AdressDals;

    constructor() {
        this.userDals = new UserDals();
        this.adressDals = new AdressDals();
    }

    async createUser({ name, whatsapp, phone, email, city, state, cep, neighborhood, latitude, longitude}: IUserData) {
            const user = await this.userDals.createUser({ name, whatsapp, phone, email });
            if(!user){
                throw new BadRequestError({message: 'user not created'})
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
            if(!address){
                throw new BadRequestError({message: 'adress not created'})
            }
            return {
                user: user,
                address: address,
                message: "User and address created successfully"
            };
    }
}

export { UserServices };
