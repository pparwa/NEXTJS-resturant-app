import React from 'react'
import { Navbar } from '../../../components/Navbar'
import { Header } from '../components/Header'
import { ResturantNavbar } from '../components/ResturantNavbar'
import Menu from '../components/Menu'
export default function Menue() {
  return (
<>
    {/* NAVBAR */} {/* HEADER */}

    {/* HEADER */} {/* DESCRIPTION PORTION */}

      <div className="bg-white w-[100%] rounded p-3 shadow">
        {/* RESAURANT NAVBAR */}
       <ResturantNavbar />
        {/* RESAURANT NAVBAR */} {/* MENU */}
<Menu />
        {/* MENU */}
      </div>
   
    {/* DESCRIPTION PORTION */}
</>

  )
}
