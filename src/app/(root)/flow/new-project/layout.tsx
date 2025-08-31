import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
 
export default function CreateFlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
        <AppSidebar />
        <div className="w-full flex flex-col">
          <SidebarTrigger />
          <div className="mt-3 md:mt-6">
          <hr />
          {children}
          </div>
        </div>
      </SidebarProvider>
  )
}