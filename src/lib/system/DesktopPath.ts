import { windowsStore } from "$lib/windows.store";
import type FilePath from "./FilePath";
import type FolderPath from "./FolderPath";


export default class DesktopPath {
  private readonly set:(value: DesktopPath) => void;
  constructor(set:(value: DesktopPath) => void) {
    this.set = set;
  }
  name:"Desktop" = "Desktop"
  path: "/" = "/";
  contents: { [key: string]: FolderPath|FilePath } = {};
  apply(){
    this.set(this);
    windowsStore.refresh();
  }
}
