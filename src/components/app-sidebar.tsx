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
import { Home } from "lucide-react";
import DialogSaveFlow from "./DialogSaveFlow";
import Link from "next/link";

export function AppSidebar() {
  const { addNode, } = useFlowContext();
  

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
            {sideBarOptions.map((item, index) => (
              <SidebarMenuButton key={index}>
                <p onClick={() => { addNode(item.type) }} className="text-[1rem] font-normal flex gap-3 items-center" > <item.icon className={item.messageStyle + 'size-6 group-data-[state=collapsed]:size-8'} /> <span> {item.title}</span></p>
              </SidebarMenuButton>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
          
        <SidebarGroupLabel className="text-md font-normal pl-2 md:pl-4">Tabs</SidebarGroupLabel>
        <SidebarGroupContent className="mt-4">
          <SidebarMenu className="space-y-2">
            <SidebarMenuButton>
                 <Link href = "/" className="text-[1rem] font-normal flex gap-3 items-center"> <Home className="size-6 group-data-[state=collapsed]:size-6" /> <span>Home</span></Link>
            </SidebarMenuButton>
          </SidebarMenu>
        </SidebarGroupContent>
       
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <SidebarGroup>
          <SidebarMenu>
           <DialogSaveFlow />
          </SidebarMenu>
        </SidebarGroup>
      </SidebarFooter>
    </Sidebar>
  )
}