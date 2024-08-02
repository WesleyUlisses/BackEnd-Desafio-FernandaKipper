import { Request, Response, NextFunction  } from "express";
import { UserServices } from "../services/user.services";
class UserControllers {
    private readonly userServices: UserServices
    constructor(){
        this.userServices = new UserServices();
    }

    async hello(request: Request, response:Response, nextFunction: NextFunction){
        const result = await this.userServices.hello();
        return response.status(200).json(result); 
    }    
}

export {UserControllers};