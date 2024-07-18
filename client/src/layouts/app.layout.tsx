import ClerkProvider from '@/components/providers/clerk.provider'
import { Toaster } from '@/components/ui/toaster'
import { store } from '@/lib/redux-toolkit/store'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'

export default function AppLayout() {
  return (
    <Provider store={store}>
      <ClerkProvider>
        <Outlet />
        <Toaster />
      </ClerkProvider>
    </Provider>
  )
}
