import { ROUTES } from '@/router'
import { ClerkProvider as ClerkAuthProvider } from '@clerk/clerk-react'

const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY

if (!PUBLISHABLE_KEY) {
  throw new Error('Missing Publishable Key')
}

export default function ClerkProvider({ children }: { children: React.ReactNode }) {
  const signOutUrl = ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_IN

  return (
    <ClerkAuthProvider publishableKey={PUBLISHABLE_KEY} afterSignOutUrl={signOutUrl}>
      {children}
    </ClerkAuthProvider>
  )
}
