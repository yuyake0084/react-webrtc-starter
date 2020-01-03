import * as types from '@client/types/connections'

export type Actions =
  | ReturnType<typeof getUserMediaSuccess>
  | ReturnType<typeof getUserMediaFailure>
  | ReturnType<typeof connectSocketSuccess>
  | ReturnType<typeof connectSocketFailure>
  | ReturnType<typeof addStream>

export const getUserMedia = (constraints: MediaStreamConstraints) =>
  ({
    type: types.GET_USER_MEDIA,
    payload: {
      constraints,
    },
  } as const)

export const getUserMediaSuccess = (stream: MediaStream) =>
  ({
    type: types.GET_USER_MEDIA_SUCCESS,
    payload: {
      stream,
    },
  } as const)

export const getUserMediaFailure = (error: Error) =>
  ({
    type: types.GET_USER_MEDIA_FAILURE,
    payload: {
      error,
    },
  } as const)

export const connectSocket = () =>
  ({
    type: types.CONNECT_SOCKET,
  } as const)

export const connectSocketSuccess = (peerConnection: RTCPeerConnection) =>
  ({
    type: types.CONNECT_SOCKET_SUCCESS,
    payload: {
      peerConnection,
    },
  } as const)

export const connectSocketFailure = (error: Error) =>
  ({
    type: types.CONNECT_SOCKET_FAILURE,
    payload: {
      error,
    },
  } as const)

export const addStream = (stream: MediaStream) =>
  ({
    type: types.ADD_STREAM,
    payload: {
      stream,
    },
  } as const)
