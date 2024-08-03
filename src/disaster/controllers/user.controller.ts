import { Request, Response, NextFunction  } from "express";
import { UserServices } from "../services/user.services";
class UserControllers {
    private readonly userServices: UserServices
    constructor(){
        this.userServices = new UserServices();
    }

    async createUser(request: Request, response:Response, nextFunction: NextFunction){
        const { latitude, longitude, name, whatsapp, phone, email, city, state, cep, neighborhood} = request.body;
        const result = await this.userServices.createUser({ name, whatsapp, phone, email, city, state, cep, neighborhood, latitude, longitude});
        return response.status(200).json(result); 
    }    
}

export {UserControllers};