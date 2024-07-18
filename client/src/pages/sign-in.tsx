import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { SignedOut, SignInButton } from '@clerk/clerk-react'

export default function SignIn() {
  return (
    <div>
      <Input placeholder='Email' />
      <Input placeholder='Email' />
      <Button>Sign in</Button>
      <SignedOut>
        <SignInButton />
      </SignedOut>
    </div>
  )
}
