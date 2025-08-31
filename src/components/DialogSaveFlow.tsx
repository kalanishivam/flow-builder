"use client"
import React, { useState } from 'react'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { SidebarMenuButton } from './ui/sidebar'
import { Button } from './ui/button'
import { useFlowContext } from "@/context/FlowContext"
import { toast } from 'sonner'
import { Loader2, Save } from 'lucide-react'
import { useRouter } from "next/navigation";
import { createWorkFlow } from '@/actions/flow-actions'

const DialogSaveFlow = () => {
    const {  nodes, edges } = useFlowContext();
    const [loaderForSaveFlow, setLoaderForSaveFlow] = useState(false);
    const router = useRouter();

    const handleSave = async (event : React.FormEvent<HTMLFormElement>) => {
    try {
        event.preventDefault();
        setLoaderForSaveFlow(true);
      const newFrm = new FormData(event.currentTarget);
      const flowName = newFrm.get("flowName") as string;
      const saveWorkFlow = await createWorkFlow(nodes , edges , flowName);
        if(saveWorkFlow.success == true){
            toast.success("Flow saved successfully")
            router.push("/")
        }else{
            toast.error("Error saving flow ");
        }
    } catch (error) {
        toast.error("Error saving flow")
    }finally{
        setLoaderForSaveFlow(false);
    }
  }

  return (
     <Dialog>
              <DialogTrigger asChild>
                <SidebarMenuButton className="text-[1rem] font-normal text-center flex gap-3 items-center bg-blue-400 hover:bg-blue-500 text-white hover:text-white "> Save Flow</SidebarMenuButton>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Save Flow</DialogTitle>

                  <DialogDescription>
                    Are you sure you want to save this flow?
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={handleSave}>
                  <input type='text' required name="flowName" placeholder="Enter Flow Name" className="input input-bordered w-full mt-2 mb-4 py-2 rounded-md px-1" />
                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Cancel</Button>
                    </DialogClose>
                    <Button disabled = {loaderForSaveFlow} type="submit">{loaderForSaveFlow == true ? <Loader2 className='animate-spin' /> : <Save />} Save</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
  )
}

export default DialogSaveFlow