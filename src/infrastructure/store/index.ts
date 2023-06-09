import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'
import { loadState, saveState } from './localStorage'
import localStorageMiddleware from './localStorageMiddleware'

const persistedState = loadState()

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(localStorageMiddleware),
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
