import PageLoader from '@/components/page-loader'
import { ROUTES } from '@/router'
import { useAuth } from '@clerk/clerk-react'
import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
  const navigate = useNavigate()
  const location = useLocation()
  const { userId, isLoaded } = useAuth()

  useEffect(() => {
    if (isLoaded && !userId) {
      navigate(ROUTES.PUBLIC.SIGN_IN, { replace: true })
    } else if (isLoaded && userId && location.pathname === ROUTES.PUBLIC.SIGN_IN) {
      navigate(ROUTES.PRIVATE.HOME, { replace: true })
    }
  }, [isLoaded])

  if (!isLoaded) return <PageLoader />

  return <Outlet />
}
