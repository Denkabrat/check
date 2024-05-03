import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Контакты",
    description: "HimNN - Контакты",
    keywords: "HimNN - Контакты",
  };


export default function contactsLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}