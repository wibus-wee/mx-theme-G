import { AppStore as AppUIStore } from "./app"
import { ConfigStore } from "./config"

export interface RootStore {
  appUIStore: AppUIStore
  configStore: ConfigStore
}

export class RootStore {
  constructor() {
    this.appUIStore = new AppUIStore()
    this.configStore = new ConfigStore()
  }
}