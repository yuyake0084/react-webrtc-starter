import * as React from 'react'
import { Route, Switch } from 'react-router-dom'
// import { LoadableHome, LoadableRoom } from './routes'
import { App } from '@client/components'
import { Home, Room, Thanks } from '@client/components/pages'

export const Router = () => (
  <App>
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route exact path="/room/:roomId">
        <Room />
      </Route>
      <Route exact path="/thanks">
        <Thanks />
      </Route>
    </Switch>
  </App>
)
