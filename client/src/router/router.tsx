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
import WorkspaceDesc from '@/components/workspace/workspace-desc'
import WorkspaceRedirect from '@/components/workspace/workspace-redirect'
import WorkspaceEditoral from '@/components/workspace/workspace-editoral'
import WorkspaceSolutions from '@/components/workspace/workspace-solutions'
import WorkspaceSubmissions from '@/components/workspace/workspace-submissions'
import { createBrowserRouter, Navigate } from 'react-router-dom'
import { ROUTES } from '.'

const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to={ROUTES.PRIVATE.PROBLEM_SET} replace />
      },
      {
        path: ROUTES.PUBLIC.NOT_FOUND,
        element: <NotFound />
      },
      {
        element: <GuardLayout />,
        children: []
      },
      {
        element: <DefaultLayout />,
        children: [
          {
            path: ROUTES.PRIVATE.PROBLEM_SET,
            element: <Home />
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
