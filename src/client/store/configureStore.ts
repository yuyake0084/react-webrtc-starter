import { createStore, applyMiddleware, Store } from 'redux'
import createSagaMiddleware, { Saga, SagaMiddleware } from 'redux-saga'
// import { createBrowserHistory, createMemoryHistory } from 'history'
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import { rootReducer } from '@client/reducers'
import { rootSaga } from '@client/sagas'

// export const history = process.env.IS_BROWSER ? createMemoryHistory() : createBrowserHistory()

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
  const runSaga = async (saga: Saga = rootSaga): Promise<SagaMiddleware<typeof rootSaga>['run']> =>
    sagaMiddleware.run(saga).toPromise()

  // for client-side
  if (process.env.IS_BROWSER) {
    runSaga()
  }

  if (module.hot) {
    module.hot.accept('@client/reducers', async () => {
      const { rootReducer: reducer } = await import(/* webpackMode: "eager" */ '@client/reducers')

      store.replaceReducer(reducer)
    })

    module.hot.accept('@client/sagas', async () => {
      const { rootSaga: saga } = await import(/* webpackMode: "eager" */ '@client/sagas')

      runSaga(saga)
    })
  }

  return {
    store,
    runSaga,
  }
}
