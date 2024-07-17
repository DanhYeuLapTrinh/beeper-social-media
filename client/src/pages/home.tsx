import { SignedIn, UserButton } from '@clerk/clerk-react'

export default function Home() {
  return (
    <header>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}
