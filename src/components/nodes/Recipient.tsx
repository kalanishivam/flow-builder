"use client"
import { useFlowContext } from '@/context/FlowContext'
import { Handle, Position , NodeProps } from '@xyflow/react'
import { Mail } from 'lucide-react'
import React from 'react'

const Recipient = ({id , data} : NodeProps) => {
  const {updateNodeData} = useFlowContext();
  const handlEmailChange = (e : React.ChangeEvent<HTMLInputElement>) =>{
    const value = e.target.value;
    updateNodeData(id , {"textVal" : value});
  }
  return (

    <div className=' bg-white rounded-sm border-[0.5px] border-black flex flex-col text-[0.4rem]'>
        <div className='bg-blue-300   rounded-t-sm px-2 py-0.5 text-black flex items-center gap-2 justify-between'>
            <div className='flex items-center gap-2'>
                <p>Enter Recipient email</p>
            </div>
            <Mail size={8} />
        </div>
        <div className=''>
            <input onChange={(e)=>{handlEmailChange(e)}} type='email' value={data?.textVal as string || ""} className='w-full h-6 pl-0.5 outline-none focus:ring-0 border-none' placeholder='Enter recipient email'></input>
        </div>
    <Handle type="source"  position={Position.Top} />
    <Handle type="target" position={Position.Bottom} />
    </div>
  )
}

export default Recipient