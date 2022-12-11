import { makeAutoObservable } from "mobx";

export class ActionsStore {
  constructor() {
    makeAutoObservable(this)
  }

  isShowTocs = false;
  tocs: {
    element: React.ReactNode;
  } = {
    element: null,
  };

  setTocs = (element: React.ReactNode) => {
    this.tocs.element = element;
    this.isShowTocs = true;
  }

  toggleTocs = () => {
    this.isShowTocs = !this.isShowTocs;
  }

  resetTocs = () => {
    this.tocs.element = null;
    this.isShowTocs = false;
  }
}