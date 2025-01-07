
"use client"
import { UserButton } from '@clerk/nextjs'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import React from 'react'
 
function Header() {
  const path = usePathname();

  return (
    <div className="flex items-center justify-between bg-secondary shadow-sm pr-5 pl-5 pt-2 pb-2">
      <Image src={'/blacklogo.png'} width={125} height={20} alt="logo" />
      <ul className="hidden md:flex gap-12">
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard' && 'text-primary font-bold'
          }`}
        >
          <Link href="/dashboard">AI Mock Interview</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/courses' && 'text-primary font-bold'
          }`}
        >
          {/* Update the link to point outside the dashboard folder */}
          <Link href="/dashboard/courses">Courses</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/questions' && 'text-primary font-bold'
          }`}
        >
          <Link href="/dashboard/questions">FAQ's</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/upgrade' && 'text-primary font-bold'
          }`}
        >
          <Link href="/dashboard/upgrade">Upgrade</Link>
        </li>
        <li
          className={`hover:text-primary hover:font-bold transition-all cursor-pointer ${
            path === '/dashboard/how' && 'text-primary font-bold'
          }`}
        >
          <Link href="/dashboard/how">How it Works?</Link>
        </li>
      </ul>
      <UserButton />
    </div>
  );
}

export default Header;
