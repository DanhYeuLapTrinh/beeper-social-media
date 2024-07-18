import AppLayout from '@/layouts/app.layout'
import AuthLayout from '@/layouts/auth.layout'
import DefaultLayout from '@/layouts/default.layout'
import GuardLayout from '@/layouts/guard.layout'
import Home from '@/pages/home'
import NotFound from '@/pages/not-found'
import Signin from '@/features/auth/signin/signin'
import Signup from '@/features/auth/signup/signup'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '.'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
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
            element: <Signin />
          },
          {
            path: ROUTES.PUBLIC.SIGN_UP,
            element: <Signup />
          }
        ]
      }
    ]
  }
])

export default router
