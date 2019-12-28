import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { loadableReady } from '@loadable/component'
import { library } from '@fortawesome/fontawesome-svg-core'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { configureStore } from './store/configureStore'

library.add(fas)

const renderMethod = module.hot ? ReactDOM.render : ReactDOM.hydrate
const initialData = JSON.parse(
  document.getElementById('initial-data')!.getAttribute('data-json') || '',
)
const { store } = configureStore(initialData)
const render = async () => {
  const { Router } = await import(/* webpackMode: "eager" */ './router')

  renderMethod(
    <Provider store={store}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </Provider>,
    document.getElementById('app'),
  )
}

loadableReady(() => {
  render()
})

if (module.hot) {
  module.hot.accept('./router', () => {
    render()
  })
}
