import 'react-dom/next'
declare global {
  export interface History {
    backPath: string[]
  }
  export interface Window {
    [key: string]: any
    umami?: Umami
  }

  interface Umami {
    (event: string): void
    trackEvent(
      event_value: string,
      event_type: string,
      url?: string,
      website_id?: string,
    ): void

    trackView(url?: string, referrer?: string, website_id?: string): void
  }
}

export { }