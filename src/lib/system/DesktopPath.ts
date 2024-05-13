import { windowsStore } from "$lib/windows.store";
import FilePath from "./FilePath";
import type FolderPath from "./FolderPath";

export default class DesktopPath {
  private readonly set: (value: DesktopPath) => void;
  constructor(set: (value: DesktopPath) => void) {
    this.set = set;
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://kanban-task-management-web-app.pages.dev/`,
        icon: `<svg stroke="#635fc7" fill="#635fc7" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1"></path></svg>`,
      },
      desktop: this,
      name: `kan`,
      parent: this,
      fileType: "svelte",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://kanban-task-management-web-app.pages.dev/`,
        icon: `<svg stroke="#635fc7" fill="#635fc7" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1"></path></svg>`,
      },
      desktop: this,
      name: `kanban-task-management-web-app1`,
      parent: this,
      fileType: "svelte",
    });
    new FilePath({
      contents: {
        iFrame: true,
        url: `https://kanban-task-management-web-app.pages.dev/`,
        icon: `<svg stroke="#635fc7" fill="#635fc7" stroke-width="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M2.5 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h11a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm5 2h1a1 1 0 0 1 1 1v3a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1m-5 1a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v7a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1zm9-1h1a1 1 0 0 1 1 1v10a1 1 0 0 1-1 1h-1a1 1 0 0 1-1-1V3a1 1 0 0 1 1-1"></path></svg>`,
      },
      desktop: this,
      name: `ban`,
      parent: this,
      fileType: "svelte",
    });
  }
  name: "Desktop" = "Desktop";
  path: "/" = "/";
  contents: { [key: string]: FolderPath | FilePath } = {};
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
        if (this.gridItems[j] === currentItems[i]) {
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
  moveGridItem(from:number,to:number) {
    if (this.gridItems[to]) {
      alert("Moving to a target is not implemented yet");
      return;
    }
    this.gridItems[to] = this.gridItems[from];
    delete this.gridItems[from];
    this.apply();
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
