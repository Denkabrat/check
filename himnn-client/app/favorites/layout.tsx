import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Избранное",
    description: "HimNN - Избранное",
    keywords: "HimNN - Избранное",
  };


export default function favoritesLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}