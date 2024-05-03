import React, { Children } from 'react'
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "HimNN - Поиск",
    description: "HimNN - Поиск",
    keywords: "HimNN - Поиск",
  };


export default function searchLayout({children}: {children: React.ReactNode}) {
    

return <div>{children}</div>
    
}