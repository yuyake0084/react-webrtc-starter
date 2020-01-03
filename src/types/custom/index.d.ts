declare interface Window {
  RTCIceCandidate: RTCIceCandidate
}

declare interface Process extends NodeJS.Process {
  env: {
    DOMAIN: string
  }
}
