import React from 'react'
import { Header } from '../../components/Header'
import "react-datepicker/dist/react-datepicker.css";
export default function Resturabtlayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    <Header />
     <div className="flex m-auto w-2/3 justify-between items-start 0 -mt-11">
   
     {children}
     </div>
    
     </>
  )
}
