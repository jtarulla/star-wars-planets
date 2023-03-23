import { CombinedState } from '@reduxjs/toolkit'

import { PlanetsState } from '@/domain/models/Planet'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('planets')
    if (serializedState === null) {
      return undefined
    }
    return { planets: JSON.parse(serializedState) }
  } catch (err) {
    throw `Failed to load state from localStorage: ${err}`
  }
}

export const saveState = (
  state: CombinedState<{ planets: PlanetsState }>
): void => {
  try {
    const serializedState = JSON.stringify(state.planets)
    localStorage.setItem('planets', serializedState)
  } catch (err) {
    throw `Failed to save state from localStorage: ${err}`
  }
}
