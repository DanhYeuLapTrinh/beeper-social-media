import PageLoader from '@/components/ui/page-loader'
import { ROUTES } from '@/router'
import { useAuth } from '@clerk/clerk-react'
import { Navigate, Outlet } from 'react-router-dom'

export default function GuardLayout() {
  const { userId, isLoaded } = useAuth()

  if (!isLoaded) {
    return <PageLoader />
  } else if (!userId) {
    return <Navigate to={ROUTES.PUBLIC.AUTH} replace />
  } else {
    return <Outlet />
  }
}
