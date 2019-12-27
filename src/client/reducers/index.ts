import { combineReducers } from 'redux'

import { reducer as connectionsReducer, State as ConnectionsState } from './connections'

export type State = {
  connections: ConnectionsState
}

export const initialState = {
  connections: connectionsReducer,
}

export const rootReducer = combineReducers({
  connections: connectionsReducer,
})
