


import { NextFunction, Request, Response } from "express"
import { encryption } from "../helpers/encryption"
import { request } from "http"
import { PrismaClient } from '@prisma/client';


export const save = async (request: Request, response: Response, next: NextFunction) => {
   
    const validator = request.body;
    if(!validator.name || !validator.password || !validator.email)
    {
            return response.status(400).json({ message:'email, name, password are required '})
    }

    const {email,  name, phone} = request.body;
    const password  = await encryption.encryptpass(request.body.password);
    const prisma = new PrismaClient();
    try {
        const user = await prisma.user.create({
          data: { name, email, password, phone  }
        });
        delete user.password;
        response.status(201).json({message:'user saved successfully', data:user})
    }
    catch(error)
    {
         response.status(400).json({message:error.message});
    }

}


export const getUsers = async(request :Request, response:Response, next :NextFunction)=>{

    try{
        const prisma = new PrismaClient();
        const users = await prisma.user.findMany({
            select: { 
              name: true,
              email: true,
              phone: true,
              createdAt:true,
              id:true
            }
          })
        response.json(users);
    }
    catch(error)
    {
         response.status(400).json({message:error.message});
    }
}


