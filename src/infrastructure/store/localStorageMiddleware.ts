import { Middleware } from '@reduxjs/toolkit'

import { saveState } from '@/infrastructure/store/localStorage'
import { addPlanet } from '@/infrastructure/store/features/planetSlice'
import { RootState } from '@/infrastructure/store'

const localStorageMiddleware: Middleware = (store) => (next) => (action) => {
  const result = next(action)

  if (addPlanet.match(action)) {
    const currentState: RootState = store.getState()
    saveState({
      planets: currentState.planets,
    })
  }

  return result
}

export default localStorageMiddleware
