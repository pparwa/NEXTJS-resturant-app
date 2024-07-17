import React from 'react'

export default function Header({image , name , date , partySize}:{
  image:string|undefined,name:string|undefined,
  date:string | undefined , partySize:string|undefined
}) {

  const [day , time] : any = date?.split("T")
 console.log(partySize)
  return (
     <div>
          <h3 className="font-bold">You're almost done!</h3>
          <div className="mt-5 flex">
            <img
              src={image}
              alt=""
              className="w-32 h-18 rounded"
            />
            <div className="ml-4">
              <h1 className="text-3xl font-bold">
                {name}
              </h1>
              <div className="flex mt-3">
                <p className="mr-6">{day}</p>
                <p className="mr-6">{time}</p>
                <p className="mr-6">{partySize? partySize : 'don t find'}</p>
              </div>
            </div>
          </div>
        </div>
  )
}
