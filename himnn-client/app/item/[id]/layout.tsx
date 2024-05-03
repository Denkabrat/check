import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN",
    description: "HimNN",
    keywords: "HimNN",
  };


export default function itemLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}