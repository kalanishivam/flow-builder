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
import { useFlowNodeContext } from "@/context/FlowNodeContext"

export function AppSidebar() {
    const {addNode} = useFlowNodeContext();
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
      <SidebarFooter />
    </Sidebar>
  )
}