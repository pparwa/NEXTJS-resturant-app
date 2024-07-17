import { AuthContext } from './../app/components/context/AthContext';
import { useContext } from 'react';
import axios from "axios";
 
  export default  function UseAth(){
    const {data , error , loading , setAuthState} = useContext(AuthContext)
   const SignIn = async ({email , password} :{email:string | undefined , password:string | undefined})=>{
  try{
    setAuthState({
      error:null,
      data:null,
      loading:true
    })
   const res =await axios.post(`http://localhost:3000/api/auth/SignIn`,{
        email,
        password
    })
    const data = await res.data
    setAuthState({
      error:null,
      data:data,
      loading:false
    })
    console.log(data,error,loading)

  }catch(err:any){
          setAuthState({
      error:err.message,
      data:null,
      loading:false
    })
  }
   } 
   
  
const SignUp = async ({
  firstname,
  lastname,
  city,
  phone,
  email,
  password
}:{
   firstname:string|undefined,
  lastname:string|undefined,
  city:string|undefined,
  email:string|undefined,
  phone:string|undefined,
  password:string|undefined
})=>{


  try{
      setAuthState({
      error:null,
      data:null,
      loading:true
    })
 const res = await  axios.post('http://localhost:3000/api/auth/SignUp',{
      firstname,
  lastname,
  city,
  phone,
  email,
  password
   })
  const data = await res.data
  const lastdata = await data.data
   setAuthState({
    error:null,
    data:lastdata,
    loading:false
   })
console.log(data,error,loading)
} catch(err:any){


  setAuthState({
       error:err.message,
    data:null,
    loading:false
  })

}






 
  }
    return{
    SignIn,
    SignUp
   }
}
