import React from 'react'
import { render } from '@testing-library/react'
import { Provider } from 'react-redux'
import { configureStore } from '../store'

export function renderWithRedux (component: JSX.Element, { store = configureStore() } = {}) {
  const utils = {
    dispatch (action: any) {
      return store.dispatch(action)
    },
    getState () {
      return store.getState();
    }
  }

  return {
    ...render(<Provider store={store}>{component}</Provider>),
    ...utils
  }
}