

interface Background {
  src: {
    light: string
    dark: string
  }
  position: string
}

interface Header {
  menu: Menu[]
}

interface Menu {
  title: string
  path: string
  icon: string
  subMenu?: Menu[]
}

interface Footer {
  icp: {
    text: string
    link: string
  }
  content: string
  menu: Menu[]
}

enum SidebarOrders {
  "INFO" = "personal-info",
  "PHOTOS" = "photos",
  CATEGORY = "category",
  "MOTTO" = "motto",
  "LIKES" = "likes",
}

interface Sidebar {
  enable: boolean
  alwaysShow: boolean
  photos: {
    src: string
    alt: string
  }[]
  orders: SidebarOrders[]
}


interface Site {
  favicon: string
  logoSvg: string
  subTitle: string
  backgrounds: {
    background: Background
    header: Background
  }
  header: Header
  footer: Footer
  motto: {
    content: string
    author: string
  }
  sidebar: Sidebar
}
interface Function { }

export interface GConfig {
  name: string
  site: Site
  function: Function
}