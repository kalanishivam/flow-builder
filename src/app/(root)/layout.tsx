
import { FlowContextProvider } from "@/context/FlowContext"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <FlowContextProvider>
            
            <div className="w-full ">
                {children}
            </div>
        </FlowContextProvider>
    )
}