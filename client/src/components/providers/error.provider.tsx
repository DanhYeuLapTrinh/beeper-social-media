import PageLoader from '../ui/page-loader'
import ErrorPage from '@/pages/error'
import { QueryErrorResetBoundary } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { Suspense } from 'react'

export default function ErrorProvider({ children }: { children: React.ReactNode }) {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorPage message={error.message} callbackFunc={resetErrorBoundary} text='try_again' />
          )}
          onReset={reset}
        >
          <Suspense fallback={<PageLoader />}>{children}</Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  )
}
