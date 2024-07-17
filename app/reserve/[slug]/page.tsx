import React from 'react'
import { Navbar } from '../../components/Navbar'
import Header from './components/Header'
import Form from './components/Form'
import { PrismaClient } from '@prisma/client'
import notfound from '../../not-found'


const prisma = new PrismaClient()
const FindResturantbyName = async(slug:string)=>{
   const resturant = await prisma.resturant.findUnique({
    where:{
      slug
    }
  }) 
  if(!resturant){
    notfound()
  }  
  return resturant

}
export default async function page({params,searchParams}:{
  params:{
    slug:string
  },
  searchParams:{
    date:string,
    partySize:string
  }
}) {
  
  const resturant = await FindResturantbyName(params.slug)
  return (

  
    <div className="border-t h-screen">
      <div className="py-9 w-3/5 m-auto">
        {/* HEADER */}
       <Header image={resturant?.main_image} name={resturant?.name} date={searchParams.date} partySize={searchParams.partySize}/>
        {/* HEADER */} {/* FORM */}
      <Form />
      </div>
    </div>
  

  )


}
