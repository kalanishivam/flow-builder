import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { FlowNodeContextProvider } from "@/context/FlowNodeContext"
import Navbar from "@/components/Navbar"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <FlowNodeContextProvider>
            <Navbar />
            <div className="w-full container mx-auto">
                {children}
            </div>
        </FlowNodeContextProvider>
    )
}