import validator from 'validator'
import {NextApiRequest, NextApiResponse} from 'next'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcrypt'
import { setCookie } from "cookies-next";
import * as jose from 'jose'
export default  async function handler(req:NextApiRequest,res:NextApiResponse ){
    const prisma = new PrismaClient()
  
  if(req.method === 'POST'){
  
 
   const errors :string[] =[]
    const validatorSchema =[
  {
    valid: validator.isLength(req.body.firstname, { min: 3, max: 20 }),
    error: 'You have to fill in this input'
  },
  {
    valid: validator.isLength(req.body.lastname, { min: 3, max: 20 }),
    error: 'You have to fill in this input'
  },
  {
    valid: validator.isEmail(req.body.email),
    error: 'This email is not valid'
  },
 
  {
    valid: validator.isLength(req.body.password, { min: 6, max: 20 }),
    error: 'Password must be between 6 and 20 characters'
  }
];
               validatorSchema.forEach((check)=>{
                if(!check.valid){
                    errors.push(check.error)
                }
               })
               if(errors.length > 0){
                res.status(400).json({
                    errors:errors
                })
            }else{

                const UserEmail = await prisma.user.findUnique({
                    where:{
                        email : req.body.email
                    }
                })
                if(UserEmail)
                {
                    return res.status(400).json({error:"this email is already singed up"})
                }

               else{
                const alg = 'HS256'
                const secret = new TextEncoder().encode(process.env.JWT_SECRET)
                const token = await new jose.SignJWT({email:req.body.email})
                .setProtectedHeader({alg})
                .setExpirationTime("1h")
                .sign(secret)
                const hashedpassword = await bcrypt.hash(req.body.password,10)
                setCookie("jwt",token , {req,res,maxAge:60* 6 * 24})
                const user = await prisma.user.create({ 
data:{            
  first_name:req.body.firstname,
  last_name: req.body.lastname,
  email: req.body.email,
  phone: req.body.phone,
  city: req.body.city,
  password: hashedpassword

               }})
            return   res.status(201).json({
                data:user
               })

               
            }
        }
               


    
    } 

}