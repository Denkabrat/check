import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Оформление заказа",
    description: "HimNN - Оформление заказа",
    keywords: "HimNN - Оформление заказа",
  };


export default function checkoutLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}