
 
export default function FlowLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
        
        <div className="w-full">
          
          <div className="">
          <hr />
          {children}
          </div>
        </div>
      </>
  )
}