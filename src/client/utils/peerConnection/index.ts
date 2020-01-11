import io from 'socket.io-client'
import * as types from '@client/utils/connectionTypes'

type ClientId = string

export interface SessionDescription {
  fromId: ClientId
  sdp: RTCSessionDescription
}

class PeerConnection {
  private peerConnections: Array<{
    id: ClientId
    pc: RTCPeerConnection
  }>
  private socket: null | SocketIOClient.Socket
  private roomId: null | string
  private stream: null | MediaStream

  constructor() {
    this.peerConnections = []
    this.socket = null
    this.roomId = null
    this.stream = null
  }

  public connectSocket = (
    stream: MediaStream,
    roomId: string,
    isRoomCreator: boolean = false,
  ): void => {
    this.socket = io(process.env.DOMAIN as string)
    this.roomId = roomId
    this.stream = stream

    this.socket.on('connect', () => {
      this.socket?.emit(types.JOIN, { roomId })

      if (!isRoomCreator) {
        this.socket?.emit(types.CALL, { roomId })
      }
    })
    this.socket.on(types.ROOM_NOT_FOUND, () => {
      console.log('部屋ないよーーーーー')
    })
    this.socket.on(types.CALL, this.createOffer)
    this.socket.on(types.OFFER, this.receivedOffer)
    this.socket.on(types.ANSWER, this.receivedAnswer)
    this.socket.on(types.CANDIDATE, this.receivedCandidate)
  }

  private prepareConnection = (clientId: ClientId): RTCPeerConnection => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
          // urls: 'stun:stun.webrtc.ecl.ntt.com:3478',
        },
      ],
    }

    const pc = new RTCPeerConnection(config)

    this.setPeerConnection(clientId, pc)

    // pc.addEventListener('negotiationneeded', this.handleNegotiationneeded)
    pc.addEventListener('icecandidate', (e: RTCPeerConnectionIceEvent) =>
      this.handleIcecandidate(e, clientId),
    )
    pc.addEventListener('track', (e: RTCTrackEvent) => this.handleTrack(e, clientId))

    this.stream?.getTracks().forEach(track => {
      if (this.stream !== null) {
        pc.addTrack(track, this.stream)
      }
    })

    return pc
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

  private getPeerConnection = (clientId: ClientId) => {
    const peerConnection = this.peerConnections.find(({ id }) => id === clientId)

    return peerConnection?.pc
  }

  /**
   * types.CALL受信時に実行
   */
  private createOffer = async ({ fromId }: Record<string, any>): Promise<void> => {
    console.log('====> createOffer')
    const pc = this.prepareConnection(fromId)
    const sessionDescription = await pc.createOffer()

    await pc.setLocalDescription(sessionDescription)

    this.sendSDP(fromId, sessionDescription)
  }

  /**
   * types.OFFER受信時に実行
   */
  public receivedOffer = async ({ fromId, sdp }: SessionDescription): Promise<void> => {
    console.log('====> createAnswer')
    const receivedOffer = new RTCSessionDescription(sdp)
    const pc = this.prepareConnection(fromId)

    try {
      await pc.setRemoteDescription(receivedOffer)
      const sessionDescription = await pc.createAnswer()

      await pc.setLocalDescription(sessionDescription)

      // 送り元に送り返す
      this.sendSDP(fromId, sessionDescription)
      console.log(sessionDescription)
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * types.ANSWER受信時に実行
   */
  public receivedAnswer = async ({ fromId, sdp }: SessionDescription): Promise<void> => {
    console.log('====> received answer')
    const receivedAnswer = new RTCSessionDescription(sdp)
    const pc = this.getPeerConnection(fromId)

    if (!pc) {
      console.log('Cound not find RTCPeerConnection.')
      return
    }

    try {
      await pc.setRemoteDescription(receivedAnswer)
    } catch (e) {
      console.log(e)
    }
  }

  public receivedCandidate = ({ fromId, sdp }: Record<string, any>) => {
    const candidate = new RTCIceCandidate(sdp.ice)
    const pc = this.getPeerConnection(fromId)

    console.log('====> receivedCandidate')

    if (pc) {
      // MEMO: addIceCandidateはsetRemoteDescriptionを実行してからでないと動作しない
      pc.addIceCandidate(candidate).catch(() => {
        console.log('unresolved setRemoteDescription')
        pc.setRemoteDescription(sdp)
      })
    }
  }

  private handleTrack = (e: RTCTrackEvent, clientId: string): void => {
    const [stream] = e.streams

    console.log(stream)
  }

  /**
   * setLocalDescriptionが実行されると発火
   */
  private handleIcecandidate = (e: RTCPeerConnectionIceEvent, clientId: ClientId): void => {
    console.log('====> handleIcecandidate')

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

  private sendSDP = (
    clientId: ClientId,
    sessionDescription: RTCSessionDescription | RTCSessionDescriptionInit,
  ) => {
    const data = {
      toId: clientId,
      roomId: this.roomId,
      sdp: sessionDescription,
    }

    this.socket?.emit(sessionDescription.type, data)
  }
}

export const peerConnection = new PeerConnection()
