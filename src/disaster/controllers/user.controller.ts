import { Request, Response, NextFunction } from "express";
import { UserServices } from "../services/user.services";
import { IUserRegistrationData } from "../interfaces/user.interfaces"; // Supondo que a interface foi nomeada assim

class UserControllers {
    private readonly userServices: UserServices;

    constructor() {
        this.userServices = new UserServices();
    }

    async createUser(request: Request, response: Response, nextFunction: NextFunction) {
        try {
            const { name,  phoneNumber, email, address }: IUserRegistrationData = request.body;

            // Chame o serviço para criar o usuário e endereço
            const result = await this.userServices.createUser({
                name,
                phoneNumber,
                email,
                address,
            });

            return response.status(200).json(result); 
        } catch (error) {
            nextFunction(error); // Passa o erro para o middleware de tratamento de erros
        }
    }
}

export { UserControllers };
