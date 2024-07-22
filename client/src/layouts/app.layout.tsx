import ClerkProvider from '@/components/providers/clerk.provider'
import { ThemeProvider } from '@/components/providers/theme.provider'
import { Toaster } from '@/components/ui/toaster'
import { persistor, store } from '@/lib/redux-toolkit/store'
import { Provider } from 'react-redux'
import { Outlet } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
// TODO: lazy loading
export default function AppLayout() {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ThemeProvider defaultTheme='dark' storageKey='ui-theme'>
          <ClerkProvider>
            <Outlet />
            <Toaster />
          </ClerkProvider>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  )
}
