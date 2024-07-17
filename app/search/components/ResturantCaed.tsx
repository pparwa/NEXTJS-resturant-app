import { Resturant } from '@prisma/client'
import Link from 'next/link'
import React from 'react'
import Price from '../../components/Price'

interface Props  {
    resturant:Resturant | undefined
} 

export const ResturantCaed = ({resturant}:Props ) => {
  return (
     <div className="border-b flex pb-5">

          <img
            src={resturant?.main_image}
            alt=""
            className="w-44 rounded"
          />
          <div className="pl-5">
            <h2 className="text-3xl">{resturant?.name}</h2>
            <div className="flex items-start">
              <div className="flex mb-2">*****</div>
              <p className="ml-2 text-sm">Awesome</p>
            </div>
            <div className="mb-9">
              <div className="font-light flex text-reg">
               <Price price={resturant?.price} />
                <p className="mr-4">{resturant?.name}</p>
              </div>
            </div>
            <div className="text-red-600">
            <Link href={`/resturant/${resturant?.slug}`} >View more</Link>
            </div>
          </div>
          
        </div>
  )
}
