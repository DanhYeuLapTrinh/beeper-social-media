import { Button } from '@/components/ui/button'
import { ROUTES } from '@/router'
import { SignedOut, SignInButton } from '@clerk/clerk-react'

export default function SignIn() {
  return (
    <div>
      <Button>
        <SignedOut>
          <SignInButton forceRedirectUrl={ROUTES.PRIVATE.HOME} />
        </SignedOut>
      </Button>
    </div>
  )
}
