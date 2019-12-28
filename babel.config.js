module.exports = api => {
  const web = process.env.BABEL_ENV !== 'node'
  const isProd = process.env.NODE_ENV === 'production'

  api.cache(true)

  return {
    presets: [
      [
        '@babel/preset-env',
        {
          useBuiltIns: web ? 'usage' : undefined,
          corejs: web ? 'core-js@3' : false,
          targets: !web ? { node: 'current' } : undefined,
        },
      ],
      '@babel/preset-typescript',
      '@babel/preset-react'
    ],
    plugins: [
      ...(
        isProd
          ? [
            ['module-resolver', {
              root: ['./src'],
              alias: {
                '@client': './dist/server/client',
                '@server': './dist/server/server',
              },
            }]
          ]
          : []
      ),
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@loadable/babel-plugin'
    ]
  }
}