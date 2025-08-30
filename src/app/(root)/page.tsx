"use client"
import React from 'react'
import { useUser, SignInButton, UserButton } from '@clerk/nextjs'
import Link from 'next/link';
import Navbar from '@/components/Navbar';

const HomePage = () => {
    const { isSignedIn } = useUser();
  return (
    <div className='w-full container mx-auto'>
      <Navbar />
   
    <div className='flex flex-col w-full '>
       
        <hr />
        <div className='w-full  py-20 px-2 md:px-4 flex flex-col gap-4'>
            <h1 className='mt-8 text-left text-xl md:text-3xl lg:text-5xl '>Build, connect, and automate your workflows with intuitive drag-and-drop flow creation.</h1>
            <div className='mt-4 flex gap-4 md:gap-8'>
            <Link className=' px-4 py-2 w-fit text-white rounded-md bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500' href={'/flow/new-project'}>Create Flow</Link>
            <Link className=' px-4 py-2 w-fit text-white rounded-md bg-gradient-to-r from-green-400 via-teal-500 to-blue-500' href={'/flow/new-project'}>My Flows</Link>
            </div>
        </div>
    </div>
     </div>
  )
}

export default HomePage