import io from 'socket.io-client'
import moment from 'moment'
import { getStore } from '@client/store/getStore'
import * as connectionsAction from '@client/actions/connections'
import * as types from '@client/utils/connectionTypes'

type ClientId = string

export interface Data {
  roomId?: string
  fromId: ClientId
  sdp: RTCSessionDescription
}

const date = () => moment().format('YYYY-MM-DD HH:mm:ss.SSS')

class PeerConnection {
  private peerConnections: Array<{
    id: ClientId
    pc: RTCPeerConnection
  }>
  private socket: null | SocketIOClient.Socket
  private stream: null | MediaStream
  public roomId: null | string

  constructor() {
    this.peerConnections = []
    this.socket = null
    this.roomId = null
    this.stream = null
  }

  public connectSocket = (stream: MediaStream, roomId: string | null): Promise<string> => {
    return new Promise(resolve => {
      this.socket = io(process.env.DOMAIN as string, {
        transports: ['websocket', 'polling'],
      })
      this.stream = stream

      this.socket.on('connect', () => {
        const type = roomId === null ? types.JOIN : types.CALL

        if (roomId && type === types.CALL) {
          this.roomId = roomId
          resolve(roomId)
        }

        this.socket?.emit(type, { roomId })
      })
      this.socket.on(types.JOIN, (roomId: string) => {
        this.roomId = roomId
        resolve(roomId)
      })
      this.socket.on(types.CALL, this.createOffer)
      this.socket.on(types.OFFER, this.createAnswer)
      this.socket.on(types.ANSWER, this.receivedAnswer)
      this.socket.on(types.CANDIDATE, this.receivedCandidate)
      this.socket.on(types.EXIT, ({ fromId }: Data) => this.disconnect(fromId))
    })
  }

  /**
   * 新しくRTCPeerConnectionとの接続を行う処理
   */
  private prepareConnection = (clientId: ClientId): RTCPeerConnection => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
        },
      ],
    }
    const pc = new RTCPeerConnection(config)

    // pc.addEventListener('negotiationneeded', this.handleNegotiationneeded)
    pc.onicecandidate = (e: RTCPeerConnectionIceEvent) => this.handleIceCandidate(e, clientId)
    pc.ontrack = (e: RTCTrackEvent) => this.handleTrack(e, clientId)
    pc.oniceconnectionstatechange = () => this.handleIceConnectionStateChange(clientId)

    this.stream?.getTracks().forEach(track => {
      if (this.stream !== null) {
        pc.addTrack(track, this.stream)
        this.setPeerConnection(clientId, pc)
      }
    })

    return pc
  }

  /**
   * 対象となるclientIdを保持するユーザーを切断
   */
  private disconnect = async (clientId: ClientId): Promise<void> => {
    const pc = this.getPeerConnection(clientId)
    const store = await getStore()

    if (pc && store) {
      pc.close()
      pc.oniceconnectionstatechange = null
      pc.ontrack = null
      pc.oniceconnectionstatechange = null
      this.peerConnections = this.peerConnections.filter(({ id }) => id !== clientId)

      store.dispatch(connectionsAction.removeStream(clientId))

      if (this.peerConnections.length) {
        this.socket?.emit(types.LEAVE, { roomId: this.roomId })
      }
    }
  }

  private getPeerConnection = (clientId: ClientId) => {
    const peerConnection = this.peerConnections.find(({ id }) => id === clientId)

    return peerConnection?.pc
  }

  private setPeerConnection = (clientId: ClientId, pc: RTCPeerConnection) => {
    const index = this.peerConnections.findIndex(({ id }) => id === clientId)
    const peerConnection = {
      id: clientId,
      pc,
    }

    if (index < 0) {
      this.peerConnections = [...this.peerConnections, peerConnection]
    } else {
      this.peerConnections = [
        ...this.peerConnections.slice(0, index),
        peerConnection,
        ...this.peerConnections.slice(index + 1),
      ]
    }
  }

  /**
   * RemoteからMediaStreamを受け取った時の処理
   */
  private handleTrack = async (e: RTCTrackEvent, clientId: ClientId): Promise<void> => {
    const store = await getStore()
    const [stream] = e.streams

    if (store) {
      const {
        connections: { streams },
      } = store.getState()

      if (!streams.find((item: any) => item.stream.id === stream.id)) {
        console.log(`[${date()}][addStream]`)
        store.dispatch(connectionsAction.addStream(clientId, stream))
      }
    }
  }

  /**
   * setLocalDescriptionが実行されると発火
   */
  private handleIceCandidate = (e: RTCPeerConnectionIceEvent, clientId: ClientId): void => {
    // console.log('====> handleIcecandidate')

    // for Tricle ICE
    if (!!e.candidate) {
      const data = {
        toId: clientId,
        roomId: this.roomId,
        sdp: {
          type: 'candidate',
          ice: e.candidate,
        },
      }

      this.socket?.emit(types.CANDIDATE, data)
    }

    // for Vanilla ICE
    // if (this.pc?.localDescription) {
    //   this.sendSDP(this.pc.localDescription)
    // }
  }

  private handleIceConnectionStateChange = (clientId: ClientId): void => {
    const pc = this.getPeerConnection(clientId)

    if (pc) {
      switch (pc.iceConnectionState) {
        case 'disconnected':
          this.disconnect(clientId)
          return
        default:
          return
      }
    }
  }

  /**
   * types.CALL受信時に実行
   */
  private createOffer = async ({ fromId }: Data): Promise<void> => {
    console.log(`[${date()}] createOffer`, {
      fromId,
    })

    if (this.getPeerConnection(fromId)) {
      console.log('[createOffer]: this RTCPeerConnection has already')
      return
    }

    const pc = this.prepareConnection(fromId)
    const sessionDescription = await pc.createOffer()

    await pc.setLocalDescription(sessionDescription)

    this.sendSDP(fromId, sessionDescription)
  }

  /**
   * types.OFFER受信時に実行
   */
  public createAnswer = async ({ fromId, sdp }: Data): Promise<void> => {
    console.log(`[${date()}][createAnswer]`, {
      fromId,
      sdp,
    })
    const receivedOffer = new RTCSessionDescription(sdp)
    const pc = this.prepareConnection(fromId)

    if (!pc) {
      console.log('[createAnswer]: hasnt this RTCPeerConnection anymore')
      return
    }

    try {
      await pc.setRemoteDescription(receivedOffer)
      const sessionDescription = await pc.createAnswer()

      await pc.setLocalDescription(sessionDescription)

      // 送り元に送り返す
      this.sendSDP(fromId, sessionDescription)
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * types.ANSWER受信時に実行
   */
  public receivedAnswer = async ({ fromId, sdp }: Data): Promise<void> => {
    console.log(`[${date()}][receivedAnswer]`, {
      fromId,
      sdp,
    })
    const receivedAnswer = new RTCSessionDescription(sdp)
    const pc = this.getPeerConnection(fromId)

    if (!pc) {
      console.log('[receivedAnswer]: Cound not find RTCPeerConnection')
      return
    }

    try {
      await pc.setRemoteDescription(receivedAnswer)
      console.log('setRemoteDescription complete!')
    } catch (e) {
      console.log(e)
    }
  }

  public receivedCandidate = ({ fromId, sdp }: Record<string, any>) => {
    const candidate = new RTCIceCandidate(sdp.ice)
    const pc = this.getPeerConnection(fromId)

    // console.log('====> receivedCandidate')

    if (pc) {
      // MEMO: addIceCandidateはsetRemoteDescriptionを実行してからでないと動作しない
      pc.addIceCandidate(candidate).catch(() => {
        console.log('unresolved setRemoteDescription')
        pc.setRemoteDescription(sdp)
      })
    }
  }

  /**
   * シグナリングサーバーにsdpを送る処理
   */
  private sendSDP = (
    clientId: ClientId,
    sessionDescription: RTCSessionDescription | RTCSessionDescriptionInit,
  ) => {
    const data = {
      toId: clientId,
      roomId: this.roomId,
      sdp: sessionDescription,
    }

    console.log(`[${date()}][sendSDP]`, data)
    this.socket?.emit(sessionDescription.type, data)
  }

  /**
   * 退室処理
   */
  public exit = () => {
    this.socket?.emit(types.EXIT, { roomId: this.roomId })
  }
}

export const peerConnection = new PeerConnection()
