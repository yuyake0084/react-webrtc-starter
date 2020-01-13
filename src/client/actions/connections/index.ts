import * as types from '@client/types/connections'
import { State } from '@client/reducers/connections'

export type Actions =
  | ReturnType<typeof setRoomId>
  | ReturnType<typeof getUserMedia>
  | ReturnType<typeof getUserMediaSuccess>
  | ReturnType<typeof getUserMediaFailure>
  | ReturnType<typeof connectSocket>
  | ReturnType<typeof connectSocketSuccess>
  | ReturnType<typeof connectSocketFailure>
  | ReturnType<typeof callRoom>
  | ReturnType<typeof exitRoom>
  | ReturnType<typeof exitRoomSuccess>
  | ReturnType<typeof exitRoomFailure>
  | ReturnType<typeof addStream>
  | ReturnType<typeof removeStream>
  | ReturnType<typeof leaveRoom>
  | ReturnType<typeof resetState>

export const setRoomId = (roomId: State['roomId']) =>
  ({
    type: types.SET_ROOM_ID,
    payload: {
      roomId,
    },
  } as const)

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

export const exitRoom = () =>
  ({
    type: types.EXIT_ROOM,
  } as const)

export const exitRoomSuccess = () =>
  ({
    type: types.EXIT_ROOM_SUCCESS,
  } as const)

export const exitRoomFailure = (error: Error) =>
  ({
    type: types.EXIT_ROOM_FAILURE,
    payload: {
      error,
    },
  } as const)

export const callRoomFailure = (error: Error) =>
  ({
    type: types.CALL_ROOM_FAILURE,
    payload: {
      error,
    },
  } as const)

export const addStream = (clientId: string, stream: MediaStream) =>
  ({
    type: types.ADD_STREAM,
    payload: {
      clientId,
      stream,
    },
  } as const)

export const removeStream = (clientId: MediaStream['id']) =>
  ({
    type: types.REMOVE_STREAM,
    payload: {
      clientId,
    },
  } as const)

export const leaveRoom = () =>
  ({
    type: types.LEAVE_ROOM,
  } as const)

export const resetState = () =>
  ({
    type: types.RESET_STATE,
  } as const)
