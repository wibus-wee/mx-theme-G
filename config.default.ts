import { GConfig } from "types/theme-config"

const defaultConfig: GConfig = {
  name: "G",
  site: {
    darkMask: true,
    motto: {
      content: "Never stop learning",
      author: "G",
    },
    header: {
      menu: []
    }
  },

}

export default JSON.parse(JSON.stringify(defaultConfig))