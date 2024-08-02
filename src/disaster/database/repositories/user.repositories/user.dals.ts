import { prisma } from '../../prisma.databases';
import { IUserCreate } from '../../../interfaces/user.interfaces';
class UserDals{
    ccnstructor(){

    }
    async createUser({name, whatsapp, phone, email}: IUserCreate){
        const result = await prisma.user.create({
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
export {UserDals}