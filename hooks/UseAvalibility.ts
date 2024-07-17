import { error } from 'console';
import { useState } from "react"
import axios from "axios"


export default function UseAvailbiity(){
   

   const [loading , setloading] = useState(false)
   const [data, setdata ] =useState <{time:string ; avilabel:boolean}[]>([])
   const [error , seterror] = useState(null)

   async  function fetchavalibility({slug,day,time ,partySize}:{
    slug:string|undefined,
    day:string|undefined,
    time:string|undefined,
    partySize:string|undefined
}){

    setloading(true)
    try{
       const res = await axios.get(`http://localhost:3000/api/resturant/${slug}/availibility`,{
       params:{
        day,time ,partySize
       }
       })
       setloading(false)
       setdata(res.data)
    }catch(err:any){
        setloading(false)
        seterror(err)
        setdata([])
    }

  

}

  return {
        fetchavalibility,
        loading,
        data,
        error
    }



}