import type { Metadata } from 'next'
import './globals.css'
 
export const metadata: Metadata = {
  title: 'NeoNatal Guide — Your gentle baby health companion',
  description: "Ask anything about your baby's health, sleep, feeding, or milestones.",
}
 
export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
 