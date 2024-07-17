 import React from 'react'
import { Header } from './components/Header'
import { SideBar } from './components/SideBar'
import { ResturantCaed } from './components/ResturantCaed'
import { Cusins, Location, PRICE, PrismaClient, Resturant } from '@prisma/client'


const prisma = new PrismaClient()
interface SearchParams {
  city?:string,
  cusins?:string,
  price?:PRICE
}
const fetchSingelResturant = async(searchParams:SearchParams | undefined):Promise<Resturant[]|undefined>=>{
  const where : any = {};

 if(searchParams?.city){
   const location = {
    name:{
      equals:searchParams.city.toLowerCase()
    }
   }
   where.location = location

 }
 if(searchParams?.cusins){
   const   cusins= {
    name:{
      equals:searchParams.cusins.toLowerCase()
    }
   }
   where.cusins = cusins
 }
 if(searchParams?.price){
  const price ={
    equals:searchParams.price 
  }
  where.price = price
 }
   const resturent = await prisma.resturant.findMany({
    where})
  return resturent

}
const fetchlocations = async()=>{
  const locations = await prisma.location.findMany()
  return locations
}
const fetchCusins = async()=>{
  const cusins = await prisma.cusins.findMany()
  return cusins 
}
export default async function Search({searchParams}:SearchParams | any) {
console.log(searchParams.city)
  const resturants = await fetchSingelResturant(searchParams)
  console.log(resturants)
  const locatons =await fetchlocations();
  const cusins =await fetchCusins()
  return (
 <>    {/* HEADER */}
   <Header />
    <div className="flex py-4 m-auto w-2/3 justify-between items-start">
      {/* SEARCH SIDE BAR */}
      <SideBar locations={locatons} cusins={cusins} searchParams={searchParams}/>
      {/* SEARCH SIDE BAR */}
      <div className="w-5/6">
        {/* RESAURANT CAR */}
   { resturants  ?resturants.map(resturant =>( <ResturantCaed resturant={resturant } /> ))  : <p>soory but there is not resturant in this area</p>}
        {/* RESAURANT CAR */}
      </div>
    </div>
    </>


  )
}
