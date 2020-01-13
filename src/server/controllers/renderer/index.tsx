import { resolve } from 'path'
import * as Express from 'express'
import * as React from 'react'
import { Provider } from 'react-redux'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Helmet from 'react-helmet'
import { ServerStyleSheet } from 'styled-components'
import { ChunkExtractor } from '@loadable/server'

import { renderFullPage } from '@server/renderFullPage'
import { configureStore } from '@client/store/configureStore'
import { Router } from '@client/router'

const statsFile = resolve(
  __dirname,
  process.env.NODE_ENV !== 'production'
    ? '../../../../dist/client/loadable-stats.json'
    : '../../../../client/loadable-stats.json',
)

export async function get(
  req: Express.Request,
  res: Express.Response,
): Promise<Express.Response | undefined> {
  const { nonce }: { nonce: string } = res.locals
  const { store, runSaga } = configureStore()
  const sheet = new ServerStyleSheet()
  const context = {}

  const AppComponent = () => (
    <Provider store={store}>
      <StaticRouter location={req.url} context={context}>
        <div id="app">
          <Router />
        </div>
      </StaticRouter>
    </Provider>
  )

  try {
    const extractor = new ChunkExtractor({ statsFile })
    const tree = extractor.collectChunks(<AppComponent />)

    // await Promise.all([
    //   runSaga()
    // ])

    const body = renderToString(tree)
    const preloadedState = JSON.stringify(store.getState())
    const helmetContent = Helmet.renderStatic()
    const meta = `
      ${helmetContent.meta.toString()}
      ${helmetContent.title.toString()}
    `.trim()
    const style = sheet.getStyleTags()
    const scripts = extractor.getScriptTags({ nonce })

    return res.send(renderFullPage({ meta, body, style, preloadedState, scripts, nonce }))
  } catch (e) {
    console.error(e)
    return res.status(500).send(e.message)
  }
}
