type Params = {
  meta: string
  body: string
  style: string
  preloadedState: string
  nonce: string
  scripts: string
}

const escape = (str: string) => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

export const renderFullPage = ({ meta, body, style, preloadedState, nonce, scripts }: Params) =>
  `<!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="description" content="React applicatin connecting to WebRTC" />
      <meta property="csp-nonce" content="${nonce}" />
      ${meta}
      <link rel="manifest" href="/manifest.webmanifest" />
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/reset-css@5.0.1/reset.min.css" />
      <link href="https://fonts.googleapis.com/css?family=Nunito&display=swap" rel="stylesheet">
      ${style}
    </head>
    <body>
      ${body}
      <script nonce="${nonce}" id="initial-data" data-json="${escape(preloadedState)}"></script>
      ${scripts}
    </body>
  </html>
`
