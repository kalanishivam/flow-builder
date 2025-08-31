"use client"
import Navbar from '@/components/Navbar'
import { WorkFlowType } from '@/types'
import { Loader2 } from 'lucide-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { toast } from 'sonner'

const MyFlows = () => {
    const [flows, setFlows] = useState<WorkFlowType[]>([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const getFlows = async () => {
            try {
                const flows = await fetch("/api/flows", { method: "GET" });
                const flowsData = await flows.json();
                setFlows(flowsData);
            } catch (error) {
                toast.error("Error fetching flows")
            }finally{
                setLoading(false);
            }
        }
        getFlows();
    }, [])
    return (
        <div>
            <Navbar />
            <div className='container mx-auto mt-4 md:mt-8 md:p-4 max-md:p-2 '>
                {loading  ? <div className='w-full flex justify-center items-end h-[35vh]'><Loader2 className='animate-spin ' /> </div>: 
                flows.length == 0 ? <h1 className='text-center text-2xl font-bold'>You have no flows</h1> :
                <div className='grid md:grid-cols-2 gap-4 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1'>
                    {flows.map((item, index) => {
                        return (
                            <Link href = {'/flow/my-flows/' +item.id} key={index} className="bg-blue-50 hover:bg-blue-100 cursor-pointer shadow-md rounded-lg p-4 w-64">
                                <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
                                <p className="text-sm text-gray-500">{new Date(item.createdAt).toLocaleString()}</p>
                            </Link>
                        )
                    })}
                    </div>
                }

            </div>
        </div>
    )
}

export default MyFlows