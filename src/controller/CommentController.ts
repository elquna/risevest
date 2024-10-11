/*
import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { encryption } from "../helpers/encryption"

export class UserController {

    private userRepository = AppDataSource.getRepository(User)

    async all(request: Request, response: Response, next: NextFunction) {
        return this.userRepository.find()
    }

   

    async save(request: Request, response: Response, next: NextFunction) {
        const { first_name, last_name, age, email, password, phone } = request.body;

        const encryptedPassword = await encryption.encryptpass(password);
        const user = new User();
        user.first_name = first_name;
        user.email = email;
        user.password = encryptedPassword;
        user.phone = phone;
        user.last_name = last_name;
        user.age = age;
    
        const userRepository = AppDataSource.getRepository(User);
     

        return this.userRepository.save(user)
    }
   

   

}
    */

import { AppDataSource } from "../data-source"
import { NextFunction, Request, Response } from "express"
import { User } from "../entity/User"
import { encryption } from "../helpers/encryption"
import { request } from "http"







export const save = async (request: Request, response: Response, next: NextFunction) => {
   
    const validator = request.body;
    if(!validator.first_name || !validator.password || !validator.email)
    {
            return response.status(400).json({ message:'email, first_name, password are required '})
    }

    const {email, password, first_name,last_name, phone, age} = request.body;

    const encryptedPassword = await encryption.encryptpass(password);
    const user = new User();
    user.first_name = first_name;
    user.email = email;
    user.password = encryptedPassword;
    user.phone = phone;
    user.last_name = last_name;
    user.age = age;
    const userRepository = AppDataSource.getRepository(User);
        
    try{
        const saved = await  userRepository.save(user);
        delete saved.password;
        response.status(201).json({message:'user saved successfully', data:saved});
    }
    catch(error)
    {
         response.status(400).json({message:error.message});
    }

}


export const getUsers = async(request :Request, response:Response, next :NextFunction)=>{

    const userRepository = AppDataSource.getRepository(User);

    const users = userRepository.find();

    try{
        const users_fetch = await  userRepository.find();

        response.status(200).json({message:'user fetched successfully', data:users_fetch});
    }
    catch(error)
    {
         response.status(400).json({message:error.message});
    }
}


