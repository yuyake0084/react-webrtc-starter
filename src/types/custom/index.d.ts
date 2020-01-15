declare interface Window {
  RTCIceCandidate: RTCIceCandidate
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly PORT: number | undefined
    readonly NODE_ENV: 'development' | 'production'
    readonly IS_BROWSER: 'true' | undefined
    readonly REDIS_PORT: string | undefined
  }
}
