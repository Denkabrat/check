import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Admin",
    description: "HimNN - Admin",
    keywords: "HimNN - Admin",
  };


export default function adminLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}