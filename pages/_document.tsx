/*
 * @FilePath: /nx-theme-tiny/pages/_document.tsx
 * @author: Wibus
 * @Date: 2022-08-07 21:00:31
 * @LastEditors: Wibus
 * @LastEditTime: 2022-08-10 23:33:16
 * Coding With IU
 */

import Document, { Head, Html, Main, NextScript } from "next/document";


export default class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head lang={"zh-cn"}>
          <meta charSet="UTF-8" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta name="msapplication-starturl" content="/" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#ffffff" />
        </Head>


        <body id="app" className="loading">
          <Main />
          <NextScript />
        </body>
      </Html >
    )
  }
}