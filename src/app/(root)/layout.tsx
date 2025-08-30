import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { FlowNodeContextProvider } from "@/context/FlowNodeContext"
 
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full">
        <FlowNodeContextProvider>
        {children}
        </FlowNodeContextProvider>
    </div>
  )
}