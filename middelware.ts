import { error } from 'console';
import { NextRequest,NextResponse } from "next/server";
import * as jose from 'jose'
import { json } from 'node:stream/consumers';
export async function middelware(req:NextRequest,res:NextResponse) {
    
 const bearerToken = req.headers.get("authorization")  as string;
      if(!bearerToken){
        return new NextResponse(
            JSON.stringify({error:"The Token Is Invalid"}),{status:401})

      }
      const token = bearerToken.split(" ")[1]
      if(!token){
          
         return new NextResponse(
            JSON.stringify({error:"The Token Is Invalid"}),{status:401})
      }
        const secret =new TextEncoder().encode(process.env.JWT_SECRET)
      try{
        await jose.jwtVerify(token , secret)
      }catch{
            return new NextResponse(
            JSON.stringify({error:"The Token Is Invalid"}),{status:401})
          
      }

}
export const  config ={
    mathcer:["/api/auth/me"]
}