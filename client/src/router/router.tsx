import ForgotPassword from '@/features/auth/forgot-password/forgot-password-form.provider'
import Signin from '@/features/auth/signin/signin-form.provider'
import Signup from '@/features/auth/signup/signup-form.provider'
import AppLayout from '@/layouts/app.layout'
import AuthLayout from '@/layouts/auth.layout'
import DefaultLayout from '@/layouts/default.layout'
import GuardLayout from '@/layouts/guard.layout'
import Home from '@/pages/home'
import NotFound from '@/pages/not-found'
import SSOCallback from '@/pages/sso-callback'
import ResetPassword from '@/features/auth/reset-password/reset-password-form.provider'
import OTPForm from '@/features/auth/otp/otp-form.provider'
import WorkspaceLayout from '@/layouts/workspace.layout'
import WorkspaceDesc from '@/pages/workspace/workspace-desc'
import WorkspaceRedirect from '@/pages/workspace/workspace-redirect'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '.'
import WorkspaceEditoral from '@/pages/workspace/workspace-editoral'
import WorkspaceSolutions from '@/pages/workspace/workspace-solutions'
import WorkspaceSubmissions from '@/pages/workspace/workspace-submissions'

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
                path: ROUTES.PRIVATE.MARKETPLACE,
                element: <p>Marketplace</p>
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
          },
          {
            element: <WorkspaceLayout />,
            children: [
              {
                path: ROUTES.PRIVATE.WORKSPACE_ID,
                element: <WorkspaceRedirect />
              },
              {
                path: ROUTES.PRIVATE.WORKSPACE_ID_DESC,
                element: <WorkspaceDesc />
              },
              {
                path: ROUTES.PRIVATE.WORKSPACE_ID_EDITORIAL,
                element: <WorkspaceEditoral />
              },
              {
                path: ROUTES.PRIVATE.WORKSPACE_ID_SOLUTIONS,
                element: <WorkspaceSolutions />
              },
              {
                path: ROUTES.PRIVATE.WORKSPACE_ID_SUBMISSIONS,
                element: <WorkspaceSubmissions />
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
          },
          {
            path: ROUTES.PUBLIC.FORGOT_PASSWORD,
            element: <ForgotPassword />
          },
          {
            path: ROUTES.PUBLIC.OTP_VERIFICATION,
            element: <OTPForm />
          },
          {
            path: ROUTES.PUBLIC.RESET_PASSWORD,
            element: <ResetPassword />
          }
        ]
      },
      {
        path: ROUTES.PUBLIC.SSO_CALLBACK,
        element: <SSOCallback />
      }
    ]
  }
])

export default router
