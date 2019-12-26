import * as types from '../../types/media'
import { Actions } from '../../actions/media'

export interface State {
  error: Error | null
  stream: MediaStream | null
}

export const initialState = {
  error: null,
  stream: null,
}

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case types.GET_USER_MEDIA_SUCCESS:
      return {
        ...state,
        stream: action.payload.stream,
      }
    case types.GET_USER_MEDIA_FAILRE:
      return {
        ...state,
        error: action.payload.error,
      }
    default:
      return state
  }
}
