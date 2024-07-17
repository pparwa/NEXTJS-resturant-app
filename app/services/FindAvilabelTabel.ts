import { PrismaClient, Resturant, Tabel } from "@prisma/client"
import { times } from "../data/times"
import { NextApiRequest, NextApiResponse } from "next"


const prisma = new PrismaClient()
export async function FindAvilabeTabela({time , day,resturant , res}:{
    time:string,
    day:string,
     resturant:{
        tabels:Tabel[]| undefined,
        open_time:string | undefined,
        close_time:string | undefined
     }| null,
    res:NextApiResponse

}){



    
   const searchtime = times.find(t=>{
        return t.time === time
    })?.searchTimes
 if(searchtime){
  const bookings = await prisma.booking.findMany({
    where:{
        booking_time :{

            gte:new Date(`${day}T${searchtime[0]}`),
            lte:new Date(`${day}T${searchtime[searchtime.length - 1]}`)
        },
        
    },
    select:{
        booking_time:true,
        number_of_peopel:true,
         tabels:true
    
    }
  })



  let bookingTabelObj :{[key:string] :{[key:number]:true }} ={}
  bookings.forEach(book=>{
    bookingTabelObj[book.booking_time.toISOString()] = book.tabels.reduce((obj , item)=>{
      return{
        ...obj,
        [item.tabel_id]:true
      }
    },{})

  })

  const tabels = resturant?.tabels

  const searchTimeTabel = searchtime.map(search=>{
    return{
        date: new Date(`${day}T${search}`),
        tabels,
        time:search,

    }
  })

  searchTimeTabel.forEach(search=>{
    search.tabels?.filter(tabel=>{
        if(bookingTabelObj[search.date.toISOString()]){
            if(bookingTabelObj[search.date.toISOString()][tabel.id]) return false
        }
    })
  })
  return searchTimeTabel
}
}