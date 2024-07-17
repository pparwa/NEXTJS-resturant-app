import Link from 'next/link'
import React from 'react'
import { Navbar } from '../../components/Navbar'
import { Header } from './components/Header'
import { ResturantNavbar } from './components/ResturantNavbar'
import Images from './components/Images'
import Review from './components/Review'
import ReservationCard from './components/ReservationCard'
import { ResturantCardType } from '../../page'
import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'



const prisma = new PrismaClient()
const fetchSingeldata = async (slug:string) =>{
if(!slug) return
  const resturant =await prisma.resturant.findUnique({
    where:{
      slug:slug,
    },
    select:{
      id:true,
      name:true,
      price:true,
      main_image:true,
      slug:true,
      location:true,
      cusins:true,
      reviews:true,
      images:true,
      open_time:true,
      close_time:true

    }
  })
  if(!resturant){
    notFound()
  }
  return resturant;
}




export default async function Details({params}:{params:{slug:string}}) {
  console.log(params.slug)
  console.log('hello')
  const resturant = await fetchSingeldata(params.slug)
  return (
     
   
    <>
 
    {/* HEADER */} {/* DESCRIPTION PORTION */}
  
      <div className="bg-white w-[70%] rounded p-3 shadow">
        {/* RESAURANT NAVBAR */}
      <ResturantNavbar />
        {/* RESAURANT NAVBAR */} {/* TITLE */}
        <div className="mt-4 border-b pb-6">
          <h1 className="font-bold text-6xl">{resturant?.name}</h1>
        </div>
        {/* TITLE */} {/* RATING */}
        <div className="flex items-end">
          <div className="ratings mt-2 flex items-center">
            <p>*****</p>
            <p className="text-reg ml-3">4.9</p>
          </div>
          <div>
            <p className="text-reg ml-4">{resturant?.reviews.length}</p>
          </div>
        </div>
        {/* RATING */} {/* DESCRIPTION */}
        <div className="mt-4">
          <p className="text-lg font-light">
            The classics you love prepared with a perfect twist, all served up
            in an atmosphere that feels just right. That’s the Milestones
            promise. So, whether you’re celebrating a milestone, making the most
            of Happy Hour or enjoying brunch with friends, you can be sure that
            every Milestones experience is a simple and perfectly memorable one.
          </p>
        </div>
        {/* DESCRIPTION */} {/* IMAGES */}
 <Images  images={resturant?.images}/>
        {/* IMAGES */} {/* REVIEWS */}
        <div>
          <h1 className="font-bold text-3xl mt-10 mb-7 borber-b pb-5">
            What  people are saying
          </h1>
          <div>
            {/* REVIEW CARD */}
         <Review  reviews={resturant?.reviews}/>
            {/* REVIEW CARD */}
          </div>
        </div>
        {/* REVIEWS */}
      </div>
      <div className="w-[27%] relative text-reg">
   <ReservationCard opentime={resturant?.open_time} closetime={resturant?.close_time} slug={resturant?.slug}/>
      </div>
    
    {/* DESCRIPTION PORTION */} {/* RESERVATION CARD PORTION */} {/* RESERVATION
    CARD PORTION */}
</>

  )
}
