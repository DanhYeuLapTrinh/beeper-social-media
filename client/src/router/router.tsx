import WorkspaceDesc from '@/components/workspace/workspace-desc'
import WorkspaceEditoral from '@/components/workspace/workspace-editoral'
import WorkspaceRedirect from '@/components/workspace/workspace-redirect'
import WorkspaceSolutions from '@/components/workspace/workspace-solutions'
import WorkspaceSubmissions from '@/components/workspace/workspace-submissions'
import AppLayout from '@/layouts/app.layout'
import DefaultLayout from '@/layouts/default.layout'
import GuardLayout from '@/layouts/guard.layout'
import WorkspaceLayout from '@/layouts/workspace.layout'
import Home from '@/pages/home'
import SSOCallback from '@/pages/sso-callback'
import ErrorPage from '@/pages/error'
import ErrorProvider from '@/components/providers/error.provider'
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
        element: <ErrorPage text='back' />
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
        element: (
          <ErrorProvider>
            <WorkspaceLayout />
          </ErrorProvider>
        ),
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
        path: ROUTES.PUBLIC.SSO_CALLBACK,
        element: <SSOCallback />
      }
    ]
  }
])

export default router
