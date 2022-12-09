/*
 * @FilePath: /mog-theme-iucky/types/umami.ts
 * @author: Wibus
 * @Date: 2022-10-30 09:57:39
 * @LastEditors: Wibus
 * @LastEditTime: 2022-10-30 09:57:39
 * Coding With IU
 */

export type TrackerOptions = {
  action: TrackerAction
  label?: string
  category?: string
  value?: number
}

export enum TrackerAction {
  Click = 'click',
  Interaction = 'interaction',
  Impression = 'impression',
}
