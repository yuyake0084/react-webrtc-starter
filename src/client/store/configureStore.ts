import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware, { SagaMiddleware } from 'redux-saga'
import { createBrowserHistory, createMemoryHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { rootReducer } from '@client/reducers'
import { rootSaga } from '@client/sagas'

export const history = process.env.IS_SERVER ? createMemoryHistory() : createBrowserHistory()

const createEnhancer = <T extends ReturnType<typeof createSagaMiddleware>>(
  sagaMiddleware: T,
): any => {
  const composeEnhancer = composeWithDevTools({})

  return composeEnhancer(applyMiddleware(sagaMiddleware))
}

export const configureStore = (preloadedState: Record<string, any> = {}): any => {
  const sagaMiddleware = createSagaMiddleware()
  const enhancer = createEnhancer(sagaMiddleware)
  const store = createStore(rootReducer, preloadedState, enhancer)
  const runSaga = async (): Promise<SagaMiddleware<typeof rootSaga>['run']> =>
    sagaMiddleware.run(rootSaga).toPromise()

  // for client-side
  if (!process.env.IS_SERVER) {
    runSaga()
  }

  if (module.hot) {
    module.hot.accept('../reducers', async () => {
      const { rootReducer: reducer } = await import(/* webpackMode: "eager" */ '../reducers')

      store.replaceReducer(reducer)
    })
  }

  return {
    store,
    runSaga,
  }
}
