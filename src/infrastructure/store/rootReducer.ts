import { combineReducers } from '@reduxjs/toolkit'
import planetSlice from '@/infrastructure/store/features/planetSlice'
import residentSlice from '@/infrastructure/store/features/residentSlice'

const rootReducer = combineReducers({
  planets: planetSlice,
  residents: residentSlice,
})

export default rootReducer
