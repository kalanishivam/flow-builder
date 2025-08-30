
import { FlowContextProvider } from "@/context/FlowContext"
import { ReactFlowProvider } from "@xyflow/react"

export default function Layout({ children }: { children: React.ReactNode }) {
    return (
        <ReactFlowProvider>
        <FlowContextProvider>
            
            <div className="w-full ">
                {children}
            </div>
        </FlowContextProvider>
        </ReactFlowProvider>
    )
}