import validator from "validator";
import { NextApiRequest,NextApiResponse } from "next";
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt'
import * as jose from 'jose'
import { error } from "console";
import { setCookie } from "cookies-next";
export default async function handler(req:NextApiRequest,res:NextApiResponse){

    const erros : string[] = [];
    const prisma = new PrismaClient();
if(req.method === "POST"){
  const ValidationSchema = [
        {
           valid:validator.isEmail(req.body.email),
           error:"Tshis Email is Invalid"  
        },
        {
            valid:validator.isLength(req.body.password,{min:3,max:8}),
             error:"Tshis Password is Invalid"
        }
    ]
    ValidationSchema.forEach(check=>{
        if(!check.valid){
            erros.push(check.error)
        }
    })

    if(erros.length > 0){
        return res.status(400).json({
            erros:erros[0]
        })
    }else{
        

        const UserEmail = await prisma.user.findUnique({
            where:{
                email:req.body.email
            }
        })
        if(!UserEmail){
              return res.status(400).json({
            erros:"you have to signup first"
        })
        }else{
            const alg = 'HS256'
                const secret = new TextEncoder().encode(process.env.JWT_SECRET)
                const token = await new jose.SignJWT({email:req.body.email})
                .setProtectedHeader({alg})
                .setExpirationTime("1h")
                .sign(secret)
                setCookie("jwt",token,{req,res , maxAge:60 * 6 * 24 })
            const isMatch = await bcrypt.compare(req.body.password , UserEmail.password)
            
            if(isMatch) {
                 res.status(200).json({
                    firstname:UserEmail.first_name,
                    lastname:UserEmail.last_name,
                    email:UserEmail.email
                }
                )
            }else{
                res.status(404).json({
                    error:"sorry your password is wrong"
                })
            }

            

        }



    }

}

}