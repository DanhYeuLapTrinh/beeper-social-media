import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ROUTES } from '@/router'
import { SignedOut, SignInButton } from '@clerk/clerk-react'
import { Link } from 'react-router-dom'

export default function Signin() {
  return (
    <div className='flex flex-col items-center gap-2 w-96 min-h-72'>
      <Input placeholder='Email' />
      <Input placeholder='Email' />
      <Button>Sign in</Button>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <Link to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_UP}>Create an account</Link>
    </div>
  )
}
