"use client"
import React from 'react'
import './LoginInputs.css'
import UseAth from '../../hooks/UseAth'
interface Props{
  inputs:{
   firstname:string | undefined,
    lastname:string | undefined, 
    email:string | undefined,
    phone:string | undefined,
    city:string | undefined,
    password:string | undefined
  },
  handelchange : (event:React.ChangeEvent<HTMLInputElement>)=>void,
  isSignin:boolean
}


 
export default function LoginInputs({inputs , handelchange , isSignin}:Props) {
  const {SignIn ,SignUp} = UseAth()
   const handelclick = ()=>{
   
  if(isSignin){
       SignIn({email:inputs.email , password:inputs.password})
  }
  else{
     console.log('click')
         SignUp({email:inputs.email,firstname:inputs.firstname,lastname:inputs.lastname,password:inputs.password,city:inputs.city,phone:inputs.phone})
  }
}
  return (
    <div className='login-box'>
      {!isSignin? (<> <div className='name-box'>
         <input type='text' placeholder='firstName' name='firstname' value={inputs.firstname}
         onChange={handelchange}/>
          <input type='text' placeholder='lastname' name='lastname'  value={inputs.lastname}
          onChange={handelchange}/>
           </div>   </>) : ""}
       
       
       
       <div className='email-box'>
        <input type='email' placeholder='email' name='email'   value={inputs.email}
        onChange={handelchange}/>
       </div>
         {!isSignin? ( <div className='name-box'>
         <input type='text' placeholder='phone' name='phone' value={inputs.phone}
         onChange={handelchange}/>
          <input type='text' placeholder='city' name='city'   value={inputs.city}
          onChange={handelchange}/>
           </div>) : ""}
       
       
         <div className='email-box'>
        <input type='password' placeholder='password' name='password' value={inputs.password}
        onChange={handelchange}/>
       </div>

       <div className='button-container'> 
      <button onClick={()=>handelclick()}>SignIn</button>
       </div>
    </div>
  )
}
