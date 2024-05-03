import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Оплата",
    description: "HimNN - Оплата",
    keywords: "HimNN - Оплата",
  };


export default function paymentLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}