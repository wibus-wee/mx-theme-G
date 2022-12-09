import { makeAutoObservable } from "mobx";

export class ConfigStore {
  constructor() {
    makeAutoObservable(this); // makeAutoObservable 是 mobx 提供的一个工具函数，可以自动将类中的所有属性转换为可观察的
  }

  config: any = {}

  /**
   * @description: 更新 config
   */
  updateConfig = (config: any) => {
    this.config = config
  }

  /**
   * @description: 获取 config
   */
  getConfig = (key?: "aggregateData" | "config") => {
    return key ? this.config[key] : this.config
  }

  /**
   * @description: 获取 theme 的某一项
   */
  getThemeItem = (key: string) => {
    return this.config.theme[key]
  }
}