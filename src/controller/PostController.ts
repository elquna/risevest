
import { NextFunction, Request, Response } from "express"
import { encryption } from "../helpers/encryption"
import { request } from "http"
import { PrismaClient } from '@prisma/client';
import { Prisma } from "@prisma/client";








export const savePost = async (request: Request, response: Response, next: NextFunction) => {
   
    const validator = request.body;
    if(!validator.content || !validator.title )
    {
            return response.status(400).json({ message:'title and body are required '})
    }

    const {title, content} = request.body;
    const userId = request.params.id;


    const prisma = new PrismaClient();
    try {
        const post = await prisma.post.create({
          data: {
            title,
            content,
            userId: parseInt(userId)
          }
        });
        response.status(201).json({message:'post saved successfully', data:post});
      } catch (error) {
        response.status(400).json({message:error.message});
      }
        

}


export const getUserPosts = async(request :Request, response:Response, next :NextFunction)=>{


    const id = request.params.id;
 
    const prisma = new PrismaClient();
   

    const posts = await prisma.post.findMany({
        where: { userId: parseInt(id) },
      });

    response.status(200).json({message:'post fetched successfully', data:posts});

}



export const saveComment = async (request: Request, response: Response, next: NextFunction) => {
   
    const validator = request.body;
    if(!validator.content )
    {
            return response.status(400).json({ message:'content required '})
    }

    const postId = request.params.postId;
    const {  content , userId} = request.body;

 
    const prisma = new PrismaClient();

    
       

  try {
    const comment = await prisma.comment.create({
      data: {
        content,
        postId: parseInt(postId),
        userId: userId
      }
    });
    response.status(201).json(comment);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
  }


  export const getTopUserswithPost = async(request : Request, response : Response, next : NextFunction) =>{

    /*Optimised SQL


    SELECT users.id, users.name, posts.title, latest_comment.content
FROM users
JOIN posts ON users.id = posts.userId
LEFT JOIN (
    SELECT postId, content
    FROM comments
    WHERE (postId, createdAt) IN (
        SELECT postId, MAX(createdAt)
        FROM comments
        GROUP BY postId
    )
) AS latest_comment ON posts.id = latest_comment.postId
GROUP BY users.id, posts.id, latest_comment.content
ORDER BY COUNT(posts.id) DESC
LIMIT 3;

its converted to prisma orm as shown below

    */

    const prisma = new PrismaClient();
    try {
        const topUsers = await prisma.user.findMany({
          orderBy: {
            posts: {
              _count: 'desc'
            }
          },
          take: 3,
          include: {
            comments: {
              orderBy: {
                createdAt: 'desc'
              },
              take: 1
            }
          }
        });

        topUsers.map((one)=>{
            delete(one.password)
        })

        response.status(200).json(topUsers);
      } catch (error) {
        response.status(400).json({ error: error.message });
      }
}



