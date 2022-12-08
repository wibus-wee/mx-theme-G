declare global {
  export interface History {
    backPath: string[]
  }
  export interface Window {
    [key: string]: any
  }
}

declare module 'react' {
  export interface HTMLAttributes<T> extends AriaAttributes, DOMAttributes<T> {
    'data-hide-print'?: boolean
    'aria-hidden'?: boolean
  }
}

export {}