import { windowsStore } from "$lib/windows.store";
import { get } from "svelte/store";
import type FilePath from "./FilePath";
import type FolderPath from "./FolderPath";
import { globalWindowDetailsStore } from "$lib/globalWindowDetails.store";

export default class DesktopPath {
  private readonly set: (value: DesktopPath) => void;
  constructor(set: (value: DesktopPath) => void) {
    this.set = set;
  }
  name: "Desktop" = "Desktop";
  path: "/" = "/";
  contents: { [key: string]: FolderPath|FilePath } = {};
  // _contents: any = {};
  // get contents() {
  //   return this._contents;
  // }
  // set contents(val: { [key: string]: FolderPath | FilePath }) {
  //   this._contents = val;
  //   console.log("sett");
    
  // }
  gridItems: (FolderPath | FilePath | undefined)[] = [];
  apply() {
    const currentItems = Object.values(this.contents);
    // let newLoc = 0;
    for (let i = 0; i < currentItems.length; i++) {
      let found = false;
      for (let j = 0; j < this.gridItems.length; j++) {
        if (this.gridItems[j] === currentItems[i]){
          // j = this.gridItems.length;
          found = true;
          break;
        }
      }
      if (found) {
        continue;
      }
      for (let j = 0; j < this.gridItems.length; j++) {
        if (this.gridItems[j]) continue;
        this.gridItems[j] = currentItems[i];
        found = true;
        break;
      }
      if (found) {
        continue;
      }
      alert("Couldn't find a space for the extra file/folder");
    }
    
    this.set(this);
    windowsStore.refresh();
  }
  resetGrid(w: number, h: number) {
    const numOfRows = Math.ceil((h - 8) / 87.975);
    const numOfCols = Math.ceil((w - 8) / 87.975);
    if (numOfRows * numOfCols > this.gridItems.length) {
      this.gridItems = this.gridItems.filter((val) => !!val);
      this.gridItems.length = numOfRows * numOfCols;
      this.apply();
    }
  }
}
