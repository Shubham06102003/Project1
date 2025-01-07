"use client"
import React from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'

const AddCourse = () => {
  const {user} = useUser();
  return (
    <div className='flex items-center justify-between mt-5'>
    <div>
        <div className='text-2xl'>Hello,
        <span className='font-bold'> {user?.fullName}</span></div>
        <p className='text-sm text-gray-500'>Create new course with AI</p>
    </div>
    <Link href='/create-course'>
        <Button className='hover:bg-slate-400 hover:scale-105 hover:shadow-md cursor-pointer transition-all'>+ Create New Course</Button>
    </Link>
</div>
  )
}

export default AddCourse