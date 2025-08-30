import { SignIn } from '@clerk/nextjs'

export default function SignInPage() {
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
      <SignIn />
    </div>
  )
}   