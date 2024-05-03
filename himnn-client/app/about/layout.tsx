import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - О компании",
    description: "HimNN - О компании",
    keywords: "HimNN - О компании",
  };


export default function aboutLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}