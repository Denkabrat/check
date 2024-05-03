import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Каталог",
    description: "HimNN - Каталог",
    keywords: "HimNN - Каталог",
  };


export default function catalogLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}