import { useEffect } from 'react';
import Package from '../package.json';

const version = `v${Package.version}` || ''

const motto = `
This Personal Space Powered By Mix Space. G.
Written by TypeScript, Coding with Love.
--------
Don't worry, be happy. --Bob Marley
`

function printToConsole() {
  try {
    if (document.firstChild?.nodeType !== Node.COMMENT_NODE) {
      document.prepend(document.createComment(motto))
    }
    console.log(
      `%c Mix Space %c https://innei.ren `,
      'color: #fff; margin: 1em 0; padding: 5px 0; background: #2980b9;',
      'margin: 1em 0; padding: 5px 0; background: #efefef;',
    )
    console.log(
      `%c G. ${version} %c https://github.com/wibus-wee/mx-theme-G `,
      'color: #fff; margin: 1em 0; padding: 5px 0; background: #39C5BB;',
      'margin: 1em 0; padding: 5px 0; background: #efefef;',
    )

    // eslint-disable-next-line no-empty
  } catch { }
}

export function useConsole() {
  printToConsole()
}