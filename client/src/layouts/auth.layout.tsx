import Wrapper from '@/components/wrapper'
import { Card } from '@/components/ui/card'
import { ROUTES } from '@/router'
import { useAuth } from '@clerk/clerk-react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function AuthLayout() {
  const navigate = useNavigate()
  const { userId } = useAuth()

  if (!userId) {
    return (
      <Wrapper className='flex items-center justify-center'>
        <Card className='px-4 py-8'>
          <Outlet />
        </Card>
      </Wrapper>
    )
  } else {
    navigate(ROUTES.PRIVATE.HOME, { replace: true })
  }
}
