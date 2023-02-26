import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <title>{"EFSP Dashboard"}</title>

      <meta name="description" content="The Emergency Food and Shelter Program is a federal grant that provides funds to agencies for emergency financial assistance for individuals and families in crisis. United Way of Greater Atlanta administers this grant in eight metro counties. This application tracks the recipients of funds for grant administers and to provide an interface for logging distributions and providing analytics about previous funding records."></meta>
      <meta name="application-name" content="EFSP Dashboard" />
      <meta name="theme-color" content="#000000" />

      <link rel="manifest" href="/manifest.json" />
      <link rel="apple-touch-icon" href="/icons/icon-512x512.png"></link>
      
      <Head />
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
