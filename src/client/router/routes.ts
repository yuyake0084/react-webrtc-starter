import loadable from '@loadable/component'

export const LoadableHome = loadable(() =>
  import(/* webpackPrefetch: true */ '@client/components/pages/Home'),
)
export const LoadableRoom = loadable(() =>
  import(/* webpackPrefetch: true */ '@client/components/pages/Room'),
)
export const LoadableThanks = loadable(() =>
  import(/* webpackPrefetch: true */ '@client/components/pages/Thanks'),
)
