import ClerkLayout from '@/layouts/clerk.layout'
import Home from '@/pages/home'
import AuthLayout from '@/layouts/auth.layout'
import DefaultLayout from '@/layouts/default.layout'
import SignIn from '@/pages/sign-in'
import { createBrowserRouter } from 'react-router-dom'
import { ROUTES } from '.'

const router = createBrowserRouter([
  {
    element: <ClerkLayout />,
    children: [
      {
        path: ROUTES.PRIVATE.HOME,
        element: <AuthLayout />,
        children: [
          {
            element: <DefaultLayout />,
            children: [
              {
                index: true,
                element: <Home />
              }
            ]
          },
          {
            path: ROUTES.PUBLIC.SIGN_IN,
            element: <SignIn />
          }
        ]
      }
    ]
  }
])

export default router
