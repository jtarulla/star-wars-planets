import { combineReducers } from '@reduxjs/toolkit'
import planetSlice from './features/planetSlice'

const rootReducer = combineReducers({
  planets: planetSlice,
})

export default rootReducer
