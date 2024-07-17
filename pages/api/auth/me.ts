import { error } from 'console';
import { NextApiRequest , NextApiResponse } from "next";
import * as jose from 'jose'
import jwt from 'jsonwebtoken'
import { PrismaClient } from '@prisma/client';
export default async function handler(req:NextApiRequest,res:NextApiResponse) {
      const prisma = new PrismaClient()
      const bearerToken = req.headers["authorization"] as string;
      if(!bearerToken){
         res.status(401).json({
            error:"none Athourization"
         })
      }
      const token = bearerToken.split(" ")[1]
      if(!token){
          
           res.status(401).json({
            error:"none Athourization"
         })
      }
      const secret =new TextEncoder().encode(process.env.JWT_SECRET)
      try{
        await jose.jwtVerify(token , secret)
      }catch{
            res.status(401).json({
            error:"none Athourization"
         })
      }
         const payload = await jwt.decode(token) as {email:string}
          const User = await prisma.user.findUnique({
            where:{
               email:payload.email
            }
          })
         return res.json({
            data:payload
         })
    
    }