import React from 'react'
import MenueCard from './MenueCard'

export default function Menu() {
  return (
    <main className="bg-white mt-5">
          <div>
            <div className="mt-4 pb-1 mb-1">
              <h1 className="font-bold text-4xl">Menu</h1>
            </div>
            <div className="flex flex-wrap justify-between">
              {/* MENU CARD */}
                    <MenueCard />
              {/* MENU CARD */}
            </div>
          </div>
        </main>
  )
}
