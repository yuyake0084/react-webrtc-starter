import { Store } from 'redux'

export const getStore = async (): Promise<Store | void> => {
  if (process.env.IS_BROWSER) {
    const { store } = await import(/* webpackMode: "eager" */ '../index')

    return store
  }
}
