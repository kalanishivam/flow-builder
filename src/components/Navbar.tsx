"use client"
import React from 'react'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
const Navbar = () => {
    const { isSignedIn } = useUser();
  return (
     <div className='flex gap-2 items-center justify-between p-2 md:p-4 bg-gray-200'>
        <h1 className="text-xl font-normal group-data-[state=collapsed]:hidden">bite<span className="font-bold">Speed</span></h1>
        <h1 className="text-sm text-gray-600">Assignment Submission</h1>
        
        {isSignedIn ?

            <UserButton /> :
            <div className='animated-btn hover:cursor-pointer'>
              <SignInButton />
            </div>
          }
        </div>
  )
}

export default Navbar