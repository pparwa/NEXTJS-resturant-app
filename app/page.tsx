
import { Inter } from '@next/font/google'


import { Header } from './components/Header'
import { ResturantCard } from './components/ResturantCard'
import { Cusins, Location, PRICE, PrismaClient, Review } from '@prisma/client'
const inter = Inter({ subsets: ['latin'] })

export interface ResturantCardType {
     id:number,
      name:string,
      price:PRICE,
      main_image:string,
      slug:string,
      location:Location,
      cusins:Cusins,
      reviews:Review[],
      images:string[]

}



const prisma = new PrismaClient()
const fetchdata = async () =>{
  const resturants =await prisma.resturant.findMany({
    select:{
      id:true,
      name:true,
      price:true,
      main_image:true,
      slug:true,
      location:true,
      cusins:true,
      reviews:true,
      images:true
     

    }
  })
  return resturants;
}

export default async function Home() {
const data = await fetchdata()
console.log(data)
  return (

  
    <main>
      {/* HEADER */}
    <Header />
      {/* HEADER */} {/* CARDS */}
      <div className="py-3 px-36 mt-10 flex flex-wrap justify-center">
        {/* CARD */}
       {data && data.map(resturant=>(
        <ResturantCard  resturant={resturant}/>
       ))}
        {/* CARD */}
      </div>

      {/* CARDS */}
    </main>


  )
}
