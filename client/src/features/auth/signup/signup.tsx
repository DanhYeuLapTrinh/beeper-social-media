import { Button } from '@/components/ui/button'
import { ROUTES } from '@/router'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <div>
      <Link to={ROUTES.PUBLIC.AUTH + '/' + ROUTES.PUBLIC.SIGN_IN}>Login</Link>
    </div>
  )
}
