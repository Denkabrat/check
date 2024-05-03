import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Корзина",
    description: "HimNN - Корзина",
    keywords: "HimNN - Корзина",
  };


export default function cartLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}