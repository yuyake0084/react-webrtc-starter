import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { rootReducer } from '../reducers'
import { rootSaga } from '../sagas'

export const history = process.env.IS_SERVER ? createMemoryHistory() : createBrowserHistory()

const createEnhancer = (sagaMiddleware: ReturnType<typeof createSagaMiddleware>) => {
  const composeEnhancer = composeWithDevTools({})

  return composeEnhancer(applyMiddleware(sagaMiddleware))
}

export const configureStore = (
  preloadedState: Record<string, any> = {},
): {
  store: Store
  runSaga: () => Promise<SagaMiddleware<typeof rootSaga>['run']>
} => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = createEnhancer(sagaMiddleware)
  const store = createStore(rootReducer, preloadedState, enhancer)
  const runSaga = async () => sagaMiddleware.run(rootSaga).toPromise()

  // for client-side
  if (!process.env.IS_SERVER) {
    runSaga()
  }

  if (module.hot) {
    module.hot.accept('../reducers', async () => {
      const { rootReducer } = await import(/* webpackMode: "eager" */ '../reducers')

      store.replaceReducer(rootReducer)
    })
  }

  return {
    // @ts-ignore
    store,
    runSaga,
  }
}
