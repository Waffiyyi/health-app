import type { Metadata } from 'next'
import './globals.css'
import React from "react";

export const metadata: Metadata = {
  title: 'Health Suggestion App',
  description: 'Health Suggestion App assessment for A & H',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
