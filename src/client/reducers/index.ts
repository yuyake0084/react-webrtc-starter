import { combineReducers } from 'redux'

import { reducer as mediaReducer, State as MediaState } from './media'

export type State = {
  media: MediaState
}

export const initialState = {
  media: mediaReducer,
}

export const rootReducer = combineReducers({
  media: mediaReducer,
})
