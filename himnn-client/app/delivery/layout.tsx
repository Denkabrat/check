import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Доставка",
    description: "HimNN - Доставка",
    keywords: "HimNN - Доставка",
  };


export default function deliveryLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}