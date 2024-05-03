import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Категории",
    description: "HimNN - Категории",
    keywords: "HimNN - Категории",
  };


export default function categoryLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}