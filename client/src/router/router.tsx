import ClerkLayout from '@/layouts/clerk.layout'
import DefaultLayout from '@/layouts/default.layout'
import GuardLayout from '@/layouts/guard.layout'
import Home from '@/pages/home'
import SignIn from '@/pages/sign-in'
import AuthLayout from '@/layouts/auth.layout'
import SignUp from '@/pages/sign-up'
import NotFound from '@/pages/not-found'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '.'

const router = createBrowserRouter([
  {
    element: <ClerkLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.PRIVATE.EXPLORE} replace />
      },
      {
        path: ROUTES.PUBLIC.NOT_FOUND,
        element: <NotFound />
      },
      {
        element: <GuardLayout />,
        children: [
          {
            element: <DefaultLayout />,
            children: [
              {
                path: ROUTES.PRIVATE.EXPLORE,
                element: <Home />
              },
              {
                path: ROUTES.PRIVATE.COMMUNITY,
                element: <p>Community</p>
              },
              {
                path: ROUTES.PRIVATE.EVENT,
                element: <p>Event</p>
              },
              {
                path: ROUTES.PRIVATE.WATCH,
                element: <p>Watch</p>
              },
              {
                path: ROUTES.PRIVATE.BY_COMMUNITIES,
                element: <p>By Communities</p>
              },
              {
                path: ROUTES.PRIVATE.BY_FRIENDS,
                element: <p>By Friends</p>
              }
            ]
          }
        ]
      },
      {
        path: ROUTES.PUBLIC.AUTH,
        element: <AuthLayout />,
        children: [
          {
            index: true,
            element: <Navigate to={ROUTES.PUBLIC.SIGN_IN} replace />
          },
          {
            path: ROUTES.PUBLIC.SIGN_IN,
            element: <SignIn />
          },
          {
            path: ROUTES.PUBLIC.SIGN_UP,
            element: <SignUp />
          }
        ]
      }
    ]
  }
])

export default router
