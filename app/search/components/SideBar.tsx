import { Cusins, Location } from '@prisma/client'
import React from 'react'
import { PRICE } from '@prisma/client';
import Link from 'next/link';

export const SideBar = ({locations , cusins , searchParams}:{locations:Location[] , cusins:Cusins[],
searchParams:{city?: string;
    cusins?: string ;
    price?: PRICE ;}}) => {


      const prices =[
        {
          value:PRICE.CHEAP,
          label:"$",
          className:"border w-full text-reg font-light rounded-l p-2"
        },
             {
          value:PRICE.REGULAR,
          label:"$$",
          className:"border w-full text-reg font-light rounded-l p-2"
        },
             {
          value:PRICE.EXPENSIVE,
          label:"$$$$",
          className:"border w-full text-reg font-light rounded-l p-2"
        }
      ]
  return (
          <div className="w-1/5">
        <div className="border-b pb-4">
          <h1 className="mb-2">Region</h1>
          {locations && locations.map(location => <Link href={{
            pathname:'/search',
            query:{
              ...searchParams,
              city:location.name
            }
          }} className="font-light text-reg">{location.name}</Link>)}
  
        </div>
        <div className="border-b pb-4 mt-3">
          <h1 className="mb-2">Cuisine</h1>
          {cusins && cusins.map(cusin=> <Link href={{
              query:{
              ...searchParams,
              cusins:cusin.name
            }
          }} className="font-light text-reg">{cusin.name}</Link>)}
         
        </div>
        <div className="mt-3 pb-4">
          <h1 className="mb-2">Price</h1>
          <div className="flex">
          {prices.map(price=><Link href={{
            pathname:'/search',
            query:{
              ...searchParams,
              price:price.value
            }
          }}   className={price.className}>{price.label}</Link>)}
          </div>
        </div>
      </div>
  )
}
