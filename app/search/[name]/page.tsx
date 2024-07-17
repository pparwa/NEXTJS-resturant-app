import React from 'react'
import { Header } from '../components/Header'
import { SideBar } from '../components/SideBar'
import { ResturantCaed } from '../components/ResturantCaed'
import { useParams } from 'next/navigation'
export default function Search() {

  return (
 <>    {/* HEADER */}
   <Header />
    <div className="flex py-4 m-auto w-2/3 justify-between items-start">
      {/* SEARCH SIDE BAR */}
      <SideBar />
      {/* SEARCH SIDE BAR */}
      <div className="w-5/6">
        {/* RESAURANT CAR */}
       <ResturantCaed resturant={undefined} />
        {/* RESAURANT CAR */}
      </div>
    </div>
    </>


  )
}
