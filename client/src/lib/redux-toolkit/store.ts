import authSlice from './slices/auth.slice'
import emailSlice from './slices/email.slice'
import storage from 'redux-persist/lib/storage'
import loadingSlice from './slices/loading.slice'
import panelSlice from './slices/panel.slice'
import passwordSlice from './slices/password.slice'
import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist'

// NOTE: https://redux-toolkit.js.org/usage/usage-guide#use-with-redux-persist

const persitConfig = {
  key: 'root',
  storage,
  version: 1
}

const persitEmailSlice = persistReducer(persitConfig, emailSlice)

export const store = configureStore({
  reducer: {
    auth: authSlice,
    password: passwordSlice,
    email: persitEmailSlice,
    loading: loadingSlice,
    panel: panelSlice
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
      }
    })
})

export const persistor = persistStore(store)
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
