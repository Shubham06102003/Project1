import React from 'react'
import Header from './_components/Header'
import { Toaster } from '@/components/ui/sonner'

function DashboardLayout({children}) {
  return (
    <div>
      <Header/>
      <div className='mx-5 md:mx-20 lg:mx-36s'>
      <Toaster />
        {children}
      </div>
    </div>
  )
}

export default DashboardLayout