"use client"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
} from "@/components/ui/sidebar"
import { sideBarOptions } from "@/constants"
import { useFlowContext } from "@/context/FlowContext"
import { Loader2Icon, Save } from "lucide-react";
import { useState } from "react";

export function AppSidebar() {
    const {addNode , nodes , edges} = useFlowContext();
    const [loaderForSaveFlow , setLoaderForSaveFlow] = useState(false);

    const handleSave = async () =>{
        try{
          console.log(nodes);
          console.log(edges)
        }catch(error){

        }
    }
    
  return (
    <Sidebar collapsible="icon" >
      <SidebarHeader>
        <h1 className="text-xl font-normal group-data-[state=collapsed]:hidden">bite<span className="font-bold">Speed</span></h1>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup />
        <SidebarGroupLabel className="text-md font-normal pl-2 md:pl-4">Add Node</SidebarGroupLabel>
        <SidebarGroupContent className="mt-4">
            <SidebarMenu className="space-y-2">
                {sideBarOptions.map((item , index)=>(
                    <SidebarMenuButton key = {index}>
                         <p onClick={()=>{addNode(item.type)}} className="text-[1rem] font-normal flex gap-3 items-center" > <item.icon className={item.messageStyle + 'size-6 group-data-[state=collapsed]:size-8'} /> <span> {item.title}</span></p>
                    </SidebarMenuButton>
                ))}
            </SidebarMenu>
        </SidebarGroupContent>
        <SidebarGroup />
        
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
            <SidebarMenuButton onClick={handleSave} disabled = {loaderForSaveFlow} className="text-[1rem] font-normal text-center flex gap-3 items-center bg-blue-400 hover:bg-blue-500 text-white hover:text-white "> { loaderForSaveFlow ? <Loader2Icon className="animate-spin" />  : <Save className="  size-6 group-data-[state=collapsed]:size-8" /> } Save Flow</SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}