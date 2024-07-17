import { error } from 'console';
import { PrismaClient } from "@prisma/client";
import { NextApiHandler, NextApiRequest, NextApiResponse } from "next";
import { FindAvilabeTabela } from '../../../../app/services/FindAvilabelTabel';
const prisma = new PrismaClient()
export async function handler(req:NextApiRequest ,res:NextApiResponse ){
   const { slug, day, time, partySize } = req.query as unknown as { slug: string; day: string; time: string; partySize: string; };
    res.json({
         slug, day, time, partySize
    })
         const {booker_email,
booker_phone,
 booker_first_name,
booker_last_name,
booker_ocasion,
booker_request
}   = req.body
     const resturant = await prisma.resturant.findUnique({
    where:{
        slug
    },
    select:{
        tabels:true,
        open_time:true,
        close_time:true,
        id:true
    }
  })
    if(!resturant){
        res.status(401).json({
            error:"resturant dosenot found"
        })
    }

     const searchTimeTabel:any =await  FindAvilabeTabela({time , day,resturant , res})
if(!searchTimeTabel){
  res.status(400).json({
    error:"invalid"
  })
}
    
  const mytabel = searchTimeTabel.find((t: any)=>{
      return t.date.toISOString()=== new Date(`${day}T${time}`).toISOString()
    })


    const tabelscount :{
        2:number[],
        4:number[]
    }={
        2:[],
        4:[]
    }
mytabel.tabels.forEach((tabel:any) => {
    if(tabel.seats === 2){
          tabelscount[2].push(tabel.id)
    }else{
                tabelscount[4].push(tabel.id)
    }
});

const mytabelRemaining : number [] =[]
 let seatsremining = parseInt(partySize)

 while(seatsremining){

    if(seatsremining >= 3){

      if(tabelscount[4].length){
           mytabelRemaining.push(tabelscount[4][0])
           tabelscount[4].shift()
            seatsremining = seatsremining -4
      }else{
         mytabelRemaining.push(tabelscount[2][0])
           tabelscount[2].shift()
            seatsremining = seatsremining -2
      }

    }else{
       if(tabelscount[2].length){
           mytabelRemaining.push(tabelscount[2][0])
           tabelscount[2].shift()
            seatsremining = seatsremining -2
      }else{
            mytabelRemaining.push(tabelscount[4][0])
           tabelscount[4].shift()
            seatsremining = seatsremining -4
      }


    }



 }
 const booking = await prisma.booking.create({
    data:{
    number_of_peopel:parseInt(partySize),
    booking_time: new Date(`${day}T${time}`),
    booker_email: booker_email,
    booker_phone: booker_phone,
    booker_first_name: booker_first_name,
    booker_ocasion:booker_ocasion,
    booker_request:booker_request,
    booker_last_name: booker_last_name,
    resturant_id:resturant ? resturant.id  : 0

    }
 })
   

    let bookingObjects = mytabel.map((myid:any)=>{
      return{
       tabel_id: myid,
       booking_id: booking.id
      }
    })
 await prisma.bookingOnTabels.createMany({
 data:bookingObjects
 })

res.json({
   booking
})


}