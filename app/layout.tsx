import './globals.css'
import { Navbar } from './components/Navbar'
import AuthContextProvider from './components/context/AthContext'
import "react-datepicker/dist/react-datepicker.css";
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */
      }
  
    
      <head />
      <body>
  
          <main className="bg-gray-100 min-h-screen w-screen">
 <AuthContextProvider>
  <main className="max-w-screen-2xl m-auto bg-white">

  <Navbar />
  {children}
  </main>
  </AuthContextProvider>
  </main>
      </body>
    </html>
  )
}
