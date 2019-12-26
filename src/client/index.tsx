import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { loadableReady } from '@loadable/component'

import { configureStore } from './store/configureStore'

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
const initialData = JSON.parse(
  document.getElementById('initial-data')!.getAttribute('data-json') || '',
)
const { store } = configureStore(initialData)
const render = async () => {
  renderMethod(
    <Provider store={store}>
      <div>Hello!</div>
    </Provider>,
    document.getElementById('app'),
  )
}

loadableReady(() => {
  render()
})
