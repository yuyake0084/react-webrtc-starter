declare interface Window {
  RTCIceCandidate: RTCIceCandidate
}

declare namespace NodeJS {
  interface ProcessEnv {
    readonly npm_package_description: string | undefined
    readonly PORT: string | undefined
    readonly NODE_ENV: 'test' | 'development' | 'production'
    readonly IS_BROWSER: 'true' | undefined
    readonly REDIS_URL: string | undefined
  }
}
