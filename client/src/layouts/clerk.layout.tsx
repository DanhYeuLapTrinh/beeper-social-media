import ClerkProvider from '@/components/providers/clerk.provider'
import { Outlet } from 'react-router-dom'

export default function ClerkLayout() {
  return (
    <ClerkProvider>
      <Outlet />
    </ClerkProvider>
  )
}
