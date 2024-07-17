import { error } from 'console';

import { NextApiRequest , NextApiResponse } from "next";
import { times } from "../../../../app/data/times";
import { PrismaClient } from "@prisma/client";

import { FindAvilabeTabela } from "../../../../app/services/FindAvilabelTabel";

export default async function handler(req:NextApiRequest , res:NextApiResponse) {
    const prisma = new PrismaClient()
    const {slug , day , time , partySize} = req.query as {
        slug:string,
        day:string,
        time:string,
        partySize:string
    }
 

   if( !day || !time || !partySize){
        res.status(401).json({
            error:"query is not defind"
        })
     
    }
      const resturant = await prisma.resturant.findUnique({
    where:{
        slug
    },
    select:{
        tabels:true,
        open_time:true,
        close_time:true
    }
  })

  const tabels = resturant?.tabels

 const searchTimeTabel:any =await  FindAvilabeTabela({time , day,resturant , res})
if(!searchTimeTabel){
  res.status(400).json({
    error:"invalid"
  })
}
  const availbilities = searchTimeTabel.map((search : any) =>{
     const sumseat = search.tabels?.reduce((sum:any , tabel:any)=>{
       return  sum += tabel.seats
     },0)
     return {
        time:search.time,
        avilabel:sumseat? sumseat >= parseInt(partySize) : true
     }
  })

  return res.status(200).json(
    availbilities
  )

  
}