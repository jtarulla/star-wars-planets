import { configureStore } from '@reduxjs/toolkit'

import rootReducer from './rootReducer'
import { loadState, saveState } from './localStorage'

const persistedState = loadState()

const store = configureStore({
  reducer: rootReducer,
  preloadedState: persistedState,
})

store.subscribe(() => {
  saveState(store.getState())
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
