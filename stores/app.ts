/*
 * @FilePath: /mog-theme-iucky/store/app.ts
 * @author: Wibus
 * @Date: 2022-10-28 17:24:06
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-30 14:10:45
 * Coding With IU
 */


import { makeAutoObservable } from "mobx";
import { ViewportRecord } from "../types/view";
import { isClientSide } from "../utils/ssr.util";



export class AppStore {
  constructor() {
    makeAutoObservable(this); // makeAutoObservable 是 mobx 提供的一个工具函数，可以自动将类中的所有属性转换为可观察的
  }

  viewport: ViewportRecord = {} as any
  headerSubTitle = null as string | null
  private position = 0
  scrollDirection: 'up' | 'down' | null = null

  setHeaderSubTitle(title: string) {
    this.headerSubTitle = title
  }

  updatePosition(direction: 'up' | 'down' | null, y: number) {
    if (typeof document !== 'undefined') {
      this.position = y
      this.scrollDirection = direction
    }
  }

  /**
   * @description: 更新 viewport
   */
  updateViewport = () => {
    const innerHeight = window.innerHeight
    const width = document.documentElement.getBoundingClientRect().width
    const { hpad, pad, mobile } = this.viewport

    // 忽略移动端浏览器 上下滚动 导致的视图大小变化
    if (
      this.viewport.h &&
      // chrome mobile delta == 56
      Math.abs(innerHeight - this.viewport.h) < 80 &&
      width === this.viewport.w &&
      (hpad || pad || mobile)
    ) {
      return
    }
    this.viewport = {
      w: width, // 视图宽度 
      h: innerHeight, // 视图高度
      mobile: window.screen.width <= 568 || window.innerWidth <= 568, // 是否为手机
      pad: window.innerWidth <= 768 && window.innerWidth > 568,  // 是否为平板
      hpad: window.innerWidth <= 1100 && window.innerWidth > 768, // 是否为横向平板
      wider: window.innerWidth > 1100 && window.innerWidth < 1920, // 是否为宽屏
      widest: window.innerWidth >= 1920, // 是否为超宽屏
    }
  }

  /**
   * @description: 用于判断是否为移动端
   */
  get isMobile() {
    return this.viewport.mobile || this.viewport.pad || this.viewport.hpad
  }

  /**
   * @description: 用于判断是否为 < 1100 的宽度
   */
  get isNarrowThanLaptop() {
    return this.isMobile || this.viewport.hpad
  }

  get isOverPostTitleHeight() { // 是否超过了文章标题的高度
    if (!isClientSide()) {
      return
    }
    return this.position > 126 || this.position > screen.height / 3
  }
}