"use client"
import React from 'react'
import { useState } from 'react';
import DatePicker from "react-datepicker";
import { times } from '../../../data/times';
import UseAvailbiity from '../../../../hooks/UseAvalibility';
import { CircularProgress } from '@mui/material';
import { link } from 'fs';
import Link from 'next/link';
export default function ReservationCard({opentime , closetime,slug}:{opentime:string|undefined , closetime:string|undefined,slug:string|undefined}) {
 const [date , setdate] = useState<Date|null>(new Date())
 const [time , settime] = useState('')
 const [partySize , setPartySize] = useState('')
 const [day , setday ] = useState('')
  let { fetchavalibility,data,error,loading} = UseAvailbiity()
 const rendertimes = ()=>{
 let show:boolean = false;

    let showtimes: typeof times = []
  times.forEach(time=>{
   
    if(opentime == time.time ){
     show = true
   
    }
    else if(show){
        showtimes.push(time)  
    }
    else if(closetime == time.time){
    show = false
    }
  })
  
  return showtimes
 }
 const handeldatechange = (d:Date|null)=>{
    if(d){
      const day = d.toISOString().split('T')[0]
      setday(day)
      setdate(d)
    }else{
      setdate(null)
    }
 }
 const handelreserve =async ()=>{
     fetchavalibility({slug,day,time,partySize})
     console.log(data)
 }
 
  return (
 <div className="fixed w-[15%] bg-white rounded p-3 shadow">
          <div className="text-center border-b pb-2 font-bold">
            <h4 className="mr-7 text-lg">Make a Reservation</h4>
          </div>
          <div className="my-3 flex flex-col">
            <label htmlFor="">Party size</label>
            <select name="" className="py-3 border-b font-light" id="" value={partySize}
            onChange={(e)=>setPartySize(e.target.value)}>
              <option value="1">1 person</option>
              <option value="2">2 people</option>
                 <option value="3">3 person</option>
              <option value="4">4 people</option>
                 <option value="5">5 person</option>
              <option value="6">6 people</option>
                <option value="7">7 person</option>
              <option value="8">8 people</option>
            </select>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col w-[48%]"> 
              <label htmlFor="">Date</label>
              <DatePicker selected={date} onChange={handeldatechange} dateFormat={"MMM d"} className='w-24 border-4 border-black'  />
              <input type="text" className="py-3 border-b font-light w-28" />
            </div>
            <div className="flex flex-col w-[48%]">
              <label htmlFor="">Time</label>
              <select name="" id="" className="py-3 border-b font-light" value={time} onChange={(e)=>settime(e.target.value)}>
              {
                rendertimes().map(time=>(
                  <option value={time.time}  >{time.displayTime}</option>
                ))
              }
              </select>
            </div>
          </div>
          <div className="mt-5">
            <button
              className="bg-red-600 rounded w-full px-4 text-white font-bold h-16"
              onClick={handelreserve}
              disabled={loading}
            >
            
              {loading ? <CircularProgress /> : 'Find Time'}
            </button>
            {(data && data.length) && 
            <div className='mt-4'>
           <div className='text-red-600'>Select Time</div>
           <div className='flex flex-wrap mt-2'>
              {
                data.map(time=>(
                  time.avilabel ? <Link href={`/reserve/${slug}?date=${day}T${time.time} & partySize=${partySize}`} 
                  className='bg-red-600 text-white px-6 py-4 mx-2 w-24' >{time.time}</Link> : <div>No Time</div>
                ))
              }
            </div>


            </div>
            
            }
          </div>
        </div>

  )
}
