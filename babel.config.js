const { resolve } = require('path')

module.exports = api => {
  const { npm_lifecycle_event, BABEL_ENV, PWD } = process.env
  const web = BABEL_ENV !== 'node'

  api.cache(true)

  console.log(__dirname)

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
      ['module-resolver', {
        root: ['./src'],
        alias: {
          // heroku's path
          '@client': resolve(__dirname, 'dist/server/client'),
          '@server': resolve(__dirname, 'dist/server/server'),
        },
      }],
      '@babel/plugin-syntax-dynamic-import',
      '@babel/plugin-proposal-class-properties',
      '@babel/plugin-proposal-object-rest-spread',
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      '@loadable/babel-plugin'
    ]
  }
}