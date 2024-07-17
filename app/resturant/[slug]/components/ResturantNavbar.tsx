import React from 'react'
import Link from 'next/link'
export const ResturantNavbar = () => {
  return (
       <nav className="flex text-reg border-b pb-2">
        <Link href={'./resturant'}> Overview </Link>
           <Link href={'./resturant/menue'}>Menu </Link>
        </nav>
  )
}
