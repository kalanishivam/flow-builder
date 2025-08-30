import React from 'react'
import { Handle, Position } from '@xyflow/react';
import { Mail, MessageCircleMore } from 'lucide-react';

const MessageBody = () => {
  return (
    <div className=' bg-white rounded-sm border-[0.5px] border-black flex flex-col text-[0.4rem]'>
        <div className='bg-green-300   rounded-t-sm px-2 py-0.5 text-black flex items-center gap-2 justify-between'>
            <div className='flex items-center gap-2'>
                <MessageCircleMore size={8} />
                <p>Enter Message Body</p>
            </div>
            <Mail size={8} />
        </div>
        <div className=''>
            <input className='w-full h-6 pl-0.5 outline-none focus:ring-0 border-none' placeholder='Enter Message Body'></input>
        </div>
    <Handle type="source"  position={Position.Top} />
    <Handle type="target" position={Position.Bottom} />
    </div>
  )
}

export default MessageBody