import React from 'react'
import { render as rtlRender, RenderOptions } from '@testing-library/react'
import { Provider } from 'react-redux'
import { Store } from 'redux'
import { configureStore, AnyAction } from '@reduxjs/toolkit'
import { MemoryRouter } from 'react-router-dom'

import { RootState } from '@/infrastructure/store'
import rootReducer from '@/infrastructure/store/rootReducer'

interface CustomRenderOptions {
  preloadedState?: RootState
  store?: Store<RootState, AnyAction>
  route?: string
  renderOptions?: Omit<RenderOptions, 'queries'>
}

function customRender(
  ui: React.ReactElement,
  {
    preloadedState = {} as RootState,
    store = configureStore({ reducer: rootReducer, preloadedState }),
    route = '/',
    ...renderOptions
  }: CustomRenderOptions = {}
) {
  function Wrapper({ children }: { children?: React.ReactNode }) {
    return (
      <Provider store={store}>
        <MemoryRouter initialEntries={[route]}>{children}</MemoryRouter>
      </Provider>
    )
  }

  return rtlRender(ui, { wrapper: Wrapper, ...renderOptions })
}

export * from '@testing-library/react'
export { customRender as render }
