import * as types from '@client/types/connections'
import { State } from '@client/reducers/connections'

export type Actions =
  | ReturnType<typeof getUserMedia>
  | ReturnType<typeof getUserMediaSuccess>
  | ReturnType<typeof getUserMediaFailure>
  | ReturnType<typeof connectSocket>
  | ReturnType<typeof connectSocketSuccess>
  | ReturnType<typeof connectSocketFailure>
  | ReturnType<typeof connectRoom>
  | ReturnType<typeof connectRoomSuccess>
  | ReturnType<typeof connectRoomFailure>
  | ReturnType<typeof callRoom>
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

export const connectSocket = (roomId: string) =>
  ({
    type: types.CONNECT_SOCKET,
    payload: {
      roomId,
    },
  } as const)

export const connectSocketSuccess = (roomId: State['roomId']) =>
  ({
    type: types.CONNECT_SOCKET_SUCCESS,
    payload: {
      roomId,
    },
  } as const)

export const connectSocketFailure = (error: Error) =>
  ({
    type: types.CONNECT_SOCKET_FAILURE,
    payload: {
      error,
    },
  } as const)

export const connectRoom = () =>
  ({
    type: types.CONNECT_ROOM,
  } as const)

export const connectRoomSuccess = (pc: RTCPeerConnection) =>
  ({
    type: types.CONNECT_ROOM_SUCCESS,
    payload: {
      pc,
    },
  } as const)

export const connectRoomFailure = (error: Error) =>
  ({
    type: types.CONNECT_ROOM_FAILURE,
    payload: {
      error,
    },
  } as const)

export const callRoom = (roomId: string) =>
  ({
    type: types.CALL_ROOM,
    payload: {
      roomId,
    },
  } as const)

export const callRoomSuccess = () =>
  ({
    type: types.CALL_ROOM_SUCCESS,
    payload: {},
  } as const)

export const callRoomFailure = (error: Error) =>
  ({
    type: types.CALL_ROOM_FAILURE,
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
