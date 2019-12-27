import { resolve } from 'path'
import * as Express from 'express'
import * as React from 'react'
import { Provider } from 'react-redux'
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor } from '@loadable/server'

import { configureStore } from '@client/store/configureStore'

const statsFile = resolve(
  __dirname,
  process.env.NODE_ENV !== 'production' ? '../../../dist/client/loadable-stats.json' : '',
)

export async function get(
  req: Express.Request,
  res: Express.Response,
): Promise<Express.Response | undefined> {
  const { nonce }: { nonce: string } = res.locals
  const { store, rootSaga } = configureStore()
  const sheet = new ServerStyleSheet()

  const App = () => (
    <Provider store={store}>
      <div id="app">
        <p>Hello!</p>
      </div>
    </Provider>
  )

  try {
    const extractor = new ChunkExtractor({ statsFile })
    const tree = extractor.collectChunks(<App />)

    console.log(extractor)
    return res.send()
  } catch (e) {
    return res.status(500).send(e.message)
  }
}
