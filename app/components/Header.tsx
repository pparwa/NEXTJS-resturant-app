
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import SearchBox from './SearchBox'
export const Header = () => {

      
  return (
    

      <div className="h-64 bg-gradient-to-r from-[#0f1f47] to-[#5f6984] p-2">
        <div className="text-center mt-10">
          <h1 className="text-white text-5xl font-bold mb-2">
            Find your table for any occasion
          </h1>
          {/* SEARCH BAR */}
        <SearchBox />
          {/* SEARCH BAR */}
        </div>
      </div>
  )
}
