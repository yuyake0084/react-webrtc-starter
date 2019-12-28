import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { LoadableHome } from './routes'
import { App } from '@client/components'
import { Home } from '@client/components/pages'

export const Router = () => (
  <App>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
    </Switch>
  </App>
)
