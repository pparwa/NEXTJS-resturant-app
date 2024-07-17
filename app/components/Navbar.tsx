"use client"

import Link from "next/link";
import React from 'react'
import LoginModal from "./LoginModal";
import { useContext } from "react";
import { AuthContext } from "./context/AthContext";
import {deleteCookie} from "cookies-next"
export const Navbar = () => {
  const {data , setAuthState} = useContext(AuthContext)
  const handelout =()=>{
    deleteCookie("jwt")
    setAuthState(
      {
        data:null,
        error:null,
        loading: false
      }
    )
  }
  return (
    <nav className="bg-white p-2 flex justify-between">
      <a href="" className="font-bold text-gray-700 text-2xl"> OpenTable </a>
      <div>
        <div className="flex">

          {data? <button  className="bg-red-500 rounded-md px-4 py-2 text-white" onClick={()=>handelout()}>Log out</button>:<>
          <LoginModal isSignin={true} /> 
          <LoginModal isSignin={false} /> 
          </>}
         
        </div>
      </div>
    </nav>
  )
}
