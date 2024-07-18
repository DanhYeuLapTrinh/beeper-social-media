import PageLoader from '@/components/page-loader'
import Wrapper from '@/components/wrapper'
import { Card } from '@/components/ui/card'
import { Icons } from '@/components/ui/icons'
import { ROUTES } from '@/router'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
  const navigate = useNavigate()
  const { userId, isLoaded } = useAuth()

  if (!isLoaded) {
    return <PageLoader />
  } else if (isLoaded && !userId) {
    return (
      <Wrapper className='flex items-center justify-center'>
        <Card className='p-4'>
          <Icons.beeper className='w-20 h-20 mb-10 mx-auto' />
          <Outlet />
        </Card>
      </Wrapper>
    )
  } else if (isLoaded && userId) {
    navigate(ROUTES.PRIVATE.HOME, { replace: true })
  }
}
