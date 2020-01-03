import * as types from '@client/types/connections'
import { Actions } from '@client/actions/connections'

export interface State {
  isConnecting: boolean
  error: Error | null
  peerConnection: RTCPeerConnection | null
  stream: MediaStream | null
  streams: MediaStream[]
}

export const initialState = {
  isConnecting: false,
  error: null,
  peerConnection: null,
  stream: null,
  streams: [],
}

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case types.GET_USER_MEDIA_SUCCESS:
      return {
        ...state,
        stream: action.payload.stream,
      }
    case types.CONNECT_SOCKET_SUCCESS:
      return {
        ...state,
        peerConnection: action.payload.peerConnection,
      }
    case types.GET_USER_MEDIA_FAILURE:
    case types.CONNECT_SOCKET_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      }
    case types.ADD_STREAM:
      return {
        ...state,
        streams: [...state.streams, action.payload.stream],
      }
    default:
      return state
  }
}
