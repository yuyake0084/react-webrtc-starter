import { put } from 'redux-saga/effects'
import io from 'socket.io-client'
import * as connectionsAction from '@client/actions/connections'
import * as types from '@client/utils/connectionTypes'

class PeerConnection {
  private socket: any
  private pc: RTCPeerConnection
  private isNegotiationNeeded: boolean

  constructor() {
    this.socket = io(process.env.DOMAIN as string)
    this.pc = new RTCPeerConnection()
    this.isNegotiationNeeded = true
  }

  public connect = (isOffer: boolean): RTCPeerConnection => {
    const config = {
      iceServers: [
        {
          urls: 'stun:stun.l.google.com:19302',
          // urls: 'stun:stun.webrtc.ecl.ntt.com:3478',
        },
      ],
    }

    this.pc = new RTCPeerConnection(config)

    this.pc.addEventListener('track', this.handleTrack)
    this.pc.addEventListener('icecandidate', this.handleIcecandidate)

    if (isOffer) {
      this.pc.addEventListener('negotiationneeded', this.handleNegotiationneeded)
    }
    this.handleSocketMessage()

    return this.pc
  }

  public addTrack = (stream: MediaStream): void => {
    if (this.pc) {
      console.log(stream)
      stream.getTracks().forEach(track => this.pc.addTrack(track, stream))
    }
  }

  private handleSocketMessage = () => {
    this.socket.on(types.OFFER, async (data: string) => {
      const offer = new RTCSessionDescription(JSON.parse(data))

      try {
        console.log('Received offer ...')

        this.connect(false)
        await this.pc.setRemoteDescription(offer)
      } catch (e) {
        console.error(e)
      }
    })

    this.socket.on(types.ANSWER, async (data: string) => {
      const message = JSON.parse(data)
      const answer = new RTCSessionDescription(message)

      try {
        console.log('Received answer ...')
        await this.pc.setRemoteDescription(answer)
      } catch (e) {
        console.log(e)
      }
    })

    this.socket.on(types.CANDIDATE, (data: string) => {
      const { ice, sdp } = JSON.parse(data)
      const candidate = new RTCIceCandidate(ice)

      console.log('Received candidate ...')

      // MEMO: addIceCandidateはsetRemoteDescriptionを実行してからでないと動作しない
      this.pc.addIceCandidate(candidate).catch(() => {
        console.log('unresolved setRemoteDescription')
        this.pc.setRemoteDescription(sdp)
      })
    })
  }

  private handleTrack = (e: RTCTrackEvent): void => {
    console.log('handleTrack')
    const [stream] = e.streams

    console.log(stream)
    const video = document.createElement('video')

    document.body.appendChild(video)

    video.srcObject = stream
    video.play()
  }

  /**
   * localのMediaStreamをaddTrackしたら発火
   */
  private handleNegotiationneeded = async (e: Event) => {
    try {
      if (this.isNegotiationNeeded) {
        const offer = await this.pc.createOffer()

        console.log('negotiationneeded')
        await this.pc.setLocalDescription(offer)
        this.sendSDP(offer)
        this.isNegotiationNeeded = false
      }
    } catch (e) {
      console.log(e)
    }
  }

  /**
   * setLocalDescriptionが実行されると発火
   */
  private handleIcecandidate = (e: RTCPeerConnectionIceEvent): void => {
    console.log('handleIcecandidate')
    if (!!e.candidate) {
      this.sendIceCandidate(e.candidate)
    } else if (this.pc.localDescription) {
      // this.sendSDP(this.pc.localDescription)
    }
  }

  private sendIceCandidate = (candidate: RTCPeerConnectionIceEvent['candidate']) => {
    const data = JSON.stringify({
      type: 'candidate',
      ice: candidate,
    })

    this.socket.emit(types.CANDIDATE, data)
  }

  private sendSDP = (sessionDescription: RTCSessionDescription | RTCSessionDescriptionInit) => {
    const data = JSON.stringify(sessionDescription)
    console.log(sessionDescription.type)
    this.socket.emit(sessionDescription.type, data)
  }

  // public connect = (isOffer: boolean): RTCPeerConnection => {
  //   const config = {
  //     iceServers: [
  //       {
  //         urls: 'stun:stun.l.google.com:19302',
  //         // urls: 'stun:stun.webrtc.ecl.ntt.com:3478',
  //       },
  //     ],
  //   }

  //   this.pc = new RTCPeerConnection(config)

  //   if (isOffer) {
  //     this.pc.addEventListener('negotiationneeded', this.handleNegotiationneeded)
  //   }

  //   this.pc.addEventListener('icecandidate', this.handleIcecandidate)
  //   this.pc.addEventListener('addstream', this.handleAddstream)
  //   this.listenEvent()

  //   return this.pc
  // }

  // private createOffer = async (): Promise<RTCSessionDescriptionInit> => {
  //   const offer = await this.pc.createOffer()

  //   return offer
  // }

  // private createAnswer = async () => {
  //   const answer = await this.pc.createAnswer()

  //   try {
  //     await this.pc.setLocalDescription(answer)
  //     this.sendSDP(answer)
  //   } catch (e) {
  //     console.error(e)
  //   }
  // }

  // /**
  //  * localのMediaStreamをaddTrackしたら発火
  //  */
  // private handleNegotiationneeded = async (e: Event) => {
  //   try {
  //     console.log('negotiationneeded')
  //     const offer = await this.createOffer()

  //     await this.pc.setLocalDescription(offer)
  //   } catch (e) {
  //     console.log(e)
  //   }
  // };

  // /**
  //  * remoteのMediaStreamを取得したら発火
  //  */
  // private *handleAddstream(e: any) {
  //   console.log('addstream', e)
  //   yield put(connectionsAction.addStream(e.stream))
  // }

  // private sendSDP = (sessionDescription: RTCSessionDescription | RTCSessionDescriptionInit) => {
  //   const data = JSON.stringify(sessionDescription)
  //   console.log(sessionDescription.type)
  //   this.socket.emit(sessionDescription.type, data)
  // }

  // private sendIceCandidate = (candidate: RTCPeerConnectionIceEvent['candidate']) => {
  //   const data = JSON.stringify({
  //     type: 'candidate',
  //     ice: candidate,
  //   })

  //   this.socket.emit(types.CANDIDATE, data)
  // }

  // private listenEvent = () => {
  //   this.socket.on(types.OFFER, async (data: string) => {
  //     const offer = new RTCSessionDescription(JSON.parse(data))

  //     try {
  //       console.log('Received offer ...')

  //       this.connect(false)
  //       await this.pc.setRemoteDescription(offer)
  //       await this.createAnswer()
  //     } catch (e) {
  //       console.error(e)
  //     }
  //   })

  //   this.socket.on(types.ANSWER, async (data: string) => {
  //     const message = JSON.parse(data)
  //     const answer = new RTCSessionDescription(message)

  //     try {
  //       console.log('Received answer ...')
  //       await this.pc.setRemoteDescription(answer)
  //     } catch (e) {
  //       console.log(e)
  //     }
  //   })

  //   this.socket.on(types.CANDIDATE, (data: string) => {
  //     const { ice, sdp } = JSON.parse(data)
  //     const candidate = new RTCIceCandidate(ice)

  //     console.log('Received candidate ...')

  //     // MEMO: addIceCandidateはsetRemoteDescriptionを実行してからでないと動作しない
  //     this.pc.addIceCandidate(candidate).catch(() => {
  //       console.log('unresolved setRemoteDescription')
  //       this.pc.setRemoteDescription(sdp)
  //     })
  //   })
  // }
}

export const peerConnection = new PeerConnection()
