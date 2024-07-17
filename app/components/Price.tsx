import React from 'react'
import { PRICE } from '@prisma/client'
export default function Price({price}:{price:PRICE | undefined}) {
    const RenderPrice = ()=>{
        if(price === PRICE.CHEAP)
        {
            return <><span>$</span><span className='text-gray-400'>$$$</span></>
        }
        else if(price === PRICE.REGULAR)
        {
              return <><span>$$</span><span className='text-gray-400'>$$</span></>
        }
         else if(price === PRICE.EXPENSIVE){
                    return <><span>$$$$</span>  </>
         }
    }

  return (
    <p>{RenderPrice()}</p>
  )
}
