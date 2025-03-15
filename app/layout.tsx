import './globals.css'
import { Inter } from 'next/font/google'
import Sidebar from '@/components/Sidebar'
import TopBar from '@/components/TopBar'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'ERP Agent',
  description: 'A comprehensive ERP system for business management',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1 flex flex-col overflow-hidden">
            <TopBar />
            <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-100 p-6">
              {children}
            </main>
          </div>
        </div>
      </body>
    </html>
  )
}
