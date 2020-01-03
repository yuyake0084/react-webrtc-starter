import { put, call, select } from 'redux-saga/effects'
import { State } from '@client/reducers'
import * as connectionsAction from '@client/actions/connections'
import { connectionsSelector } from '@client/selectors'
// import { peerConnection } from '@client/utils/peerConnection'
import io from 'socket.io-client'
import * as types from '@client/utils/connectionTypes'

export function* connectSocket() {
  try {
    const peerConnection = new PeerConnection()
    const { stream }: State['connections'] = yield select(connectionsSelector)
    const peer = yield call(peerConnection.connect, stream)

    // if (stream) {
    //   stream.getTracks().forEach(track => peer.addTrack(track, stream))

    //   yield put(connectionsAction.connectSocketSuccess(peer))
    // } else {
    //   throw new Error('Could not find MediaStream')
    // }
  } catch (e) {
    yield put(connectionsAction.connectSocketFailure(e))
  }
}

class PeerConnection {
  private socket: any
  private pc: RTCPeerConnection

  constructor() {
    this.socket = io(process.env.DOMAIN as string)
    this.pc = new RTCPeerConnection()
  }

  public connect = async (stream: MediaStream | null, isOffer: boolean = true) => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
          // urls: 'stun:stun.webrtc.ecl.ntt.com:3478',
        },
      ],
    }

    this.pc = new RTCPeerConnection(config)

    stream?.getTracks().forEach(track => this.pc.addTrack(track, stream))

    if (isOffer) {
      this.pc.addEventListener('negotiationneeded', this.handleNegotiationneeded)
    }

    this.pc.addEventListener('icecandidate', this.handleIcecandidate)
    this.pc.addEventListener('addstream', this.handleAddstream)
    this.listenEvent()
  }

  private createOffer = async (): Promise<RTCSessionDescriptionInit> => {
    const offer = await this.pc.createOffer()

    return offer
  }

  private createAnswer = async () => {
    const answer = await this.pc.createAnswer()

    try {
      await this.pc.setLocalDescription(answer)
      this.sendSDP(answer)
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * setLocalDescriptionが実行されると発火
   */
  private handleIcecandidate = (e: RTCPeerConnectionIceEvent): void => {
    // console.log('handleIcecandidate', e)
    if (!!e.candidate) {
      this.sendIceCandidate(e.candidate)
    } else if (this.pc.localDescription) {
      this.sendSDP(this.pc.localDescription)
    }
  }

  /**
   * localのMediaStreamをaddTrackしたら発火
   */
  private handleNegotiationneeded = async (e: Event) => {
    try {
      console.log(this.pc.signalingState)
      const offer = await this.createOffer()

      await this.pc.setLocalDescription(offer)
    } catch (e) {
      console.log(e)
    }
  };

  /**
   * remoteのMediaStreamを取得したら発火
   */
  *handleAddstream(e: any) {
    console.log('addstream', e)
    yield put(connectionsAction.addStream(e.stream))
  }

  private sendSDP = (sdp: RTCSessionDescription | RTCSessionDescriptionInit) => {
    const data = JSON.stringify(sdp)
    this.socket.emit(sdp.type, data)
  }

  private sendIceCandidate = (candidate: RTCPeerConnectionIceEvent['candidate']) => {
    const data = JSON.stringify({
      type: 'candidate',
      ice: candidate,
    })

    this.socket.emit(types.CANDIDATE, data)
  }

  private setOffer = (sessionDescription: RTCSessionDescription) => {
    // if () {
    // }
  }

  private listenEvent = () => {
    this.socket.on(types.OFFER, async (data: string) => {
      const offer = new RTCSessionDescription(JSON.parse(data))

      try {
        console.log('Received offer ...')

        // await this.pc.setRemoteDescription(offer)
        // await this.createAnswer()
      } catch (e) {
        console.error(e)
      }
    })

    this.socket.on(types.ANSWER, async (data: string) => {
      const message = JSON.parse(data)
      const answer = new RTCSessionDescription(message)

      try {
        await this.pc.setRemoteDescription(answer)
      } catch (e) {
        console.log(e)
      }
    })

    this.socket.on(types.CANDIDATE, (data: string) => {
      const { ice } = JSON.parse(data)
      const candidate = new RTCIceCandidate(ice)

      // MEMO: addIceCandidateはsetRemoteDescriptionを実行してからでないと動作しない
      this.pc.addIceCandidate(candidate).catch(() => {
        console.log('unresolved setRemoteDescription')
      })
    })
  }
}
