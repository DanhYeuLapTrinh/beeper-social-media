import PageLoader from '@/components/page-loader'
import { Card } from '@/components/ui/card'
import Wrapper from '@/components/wrapper'
import { Icons } from '@/components/ui/icons'
import { ROUTES } from '@/router'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
  const navigate = useNavigate()
  const { userId, isLoaded } = useAuth()

  if (!isLoaded) {
    return <PageLoader />
  } else if (!userId) {
    return (
      <Wrapper className='flex items-center justify-center'>
        <Card className='p-4'>
          <Icons.beeper className='w-20 h-20 mb-10' />
          <Outlet />
        </Card>
      </Wrapper>
    )
  } else {
    navigate(ROUTES.PRIVATE.HOME, { replace: true })
  }
}
