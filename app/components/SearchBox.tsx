"use client"

import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
export default function SearchBox() {
    const [place , setplace] = useState("")
  const router = useRouter()


  return (
      <div className="text-left text-lg py-3 m-auto flex justify-center">
            <input
              className="rounded  mr-3 p-2 w-[450px]"
              type="text"
              placeholder="State, city or town"
              onChange={(event)=>setplace(event.target.value)}
              value={place}
            />
            <button className="rounded bg-red-600 px-9 py-2 text-white" onClick={()=>router.push(`/search?city=${place}`)}>
              Let's go
            </button>
          </div>
  )
}
