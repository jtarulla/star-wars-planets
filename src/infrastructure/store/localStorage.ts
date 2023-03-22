import { PlanetsState } from '@/domain/models/Planet'
import { CombinedState } from '@reduxjs/toolkit'

export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('reduxState')
    if (serializedState === null) {
      return undefined
    }
    return JSON.parse(serializedState)
  } catch (err) {
    throw `Failed to load state from localStorage: ${err}`
    return undefined
  }
}

export const saveState = (
  state: CombinedState<{ planets: PlanetsState }>
): void => {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem('reduxState', serializedState)
  } catch (err) {
    throw `Failed to save state from localStorage: ${err}`
  }
}
