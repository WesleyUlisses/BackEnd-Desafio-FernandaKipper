import { prisma } from '../../prisma.databases';
import { IUserCreate } from '../../../interfaces/user.interfaces';
class UserDals{
    ccnstructor(){

    }
    async createUser({name, phone, email}: IUserCreate){
        const result = await prisma.user.create({
            data: {
                name,
                phone,
                email
            }
        });

        return result;
    }
    async findUserById(id: number){
        const result = await prisma.user.findUnique({
            where:{id}
        })
        return result;
    }
}
export {UserDals}