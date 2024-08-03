import { Request, Response, NextFunction  } from "express";
import { UserServices } from "../services/user.services";

class DesasterControllers {
    private readonly userServices: UserServices
    constructor(){
        this.userServices = new UserServices();
    }

    async detectedDesaster(request: Request, response:Response, nextFunction: NextFunction){
        
        const result = await this.userServices.detectedUser();
        return response.status(200).json(result); 
    }    
}

export {DesasterControllers};