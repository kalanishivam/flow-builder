import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
 
export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="w-full">
          <SidebarTrigger />
          <div className="mt-3 md:mt-6">
          <hr />
          {children}
          </div>
        </div>
      </SidebarProvider>
  )
}