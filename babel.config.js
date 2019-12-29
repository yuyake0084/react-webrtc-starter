module.exports = api => {
  const web = process.env.BABEL_ENV !== 'node'
  const isBuildServer = process.env.npm_lifecycle_event === 'build:server'
  const pwd = process.cwd()

  api.cache(true)

  console.log('pwd', pwd)
  console.log('__dirname', __dirname)

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
        isBuildServer
          ? [
            ['module-resolver', {
              root: ['./src'],
              alias: {
                '@client': `/${pwd}/dist/server/client`,
                '@server': `/${pwd}/dist/server/server`,
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