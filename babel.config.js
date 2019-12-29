const { resolve } = require('path')

module.exports = api => {
  const { npm_lifecycle_event, BABEL_ENV, PWD } = process.env
  const web = BABEL_ENV !== 'node'
  const isBuild = npm_lifecycle_event === 'build:server'

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
        isBuild
          ? [
            ['module-resolver', {
              root: ['./src'],
              alias: {
                '@client': resolve(PWD, 'dist/server/client'),
                '@server': resolve(PWD, 'dist/server/server'),
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