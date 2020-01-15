import * as types from '@client/types/connections'
import { Actions } from '@client/actions/connections'

export interface State {
  isConnecting: boolean
  isEnded: boolean
  error: Error | null
  pc: RTCPeerConnection | null
  socket: SocketIOClient.Socket | null
  roomId: string | null
  stream: MediaStream | null
  streams: Array<{
    clientId: string
    stream: MediaStream
  }>
}

export const initialState = {
  isConnecting: false,
  isEnded: false,
  error: null,
  pc: null,
  socket: null,
  roomId: null,
  stream: null,
  streams: [],
}

export const reducer = (state: State = initialState, action: Actions): State => {
  switch (action.type) {
    case types.SET_ROOM_ID:
      return {
        ...state,
        roomId: action.payload.roomId,
      }

    case types.GET_USER_MEDIA_SUCCESS:
      return {
        ...state,
        stream: action.payload.stream,
      }

    case types.CONNECT_SOCKET_SUCCESS:
      return {
        ...state,
        ...action.payload,
        isConnecting: true,
      }

    case types.EXIT_ROOM_SUCCESS:
      return {
        ...initialState,
        isEnded: true,
      }

    case types.GET_USER_MEDIA_FAILURE:
    case types.CONNECT_SOCKET_FAILURE:
    case types.EXIT_ROOM_FAILURE:
      return {
        ...state,
        error: action.payload.error,
      }

    case types.ADD_STREAM:
      if (state.streams.find(({ stream }) => stream.id === action.payload.stream.id)) {
        return state
      }

      return {
        ...state,
        streams: [...state.streams, action.payload],
      }

    case types.REMOVE_STREAM:
      return {
        ...state,
        streams: state.streams.filter(({ clientId }) => clientId !== action.payload.clientId),
      }

    case types.LEAVE_ROOM:
      return {
        ...state,
        isConnecting: false,
      }

    case types.RESET_STATE:
      return initialState

    default:
      return state
  }
}
