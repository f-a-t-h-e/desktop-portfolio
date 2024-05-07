import { readable } from "svelte/store";
import DesktopPath from "./system/DesktopPath";
import FolderPath from "./system/FolderPath";
import FilePath from "./system/FilePath";


function createDesktopStore() {
  const { subscribe } = readable<DesktopPath>(undefined, function start(set) {
    set(new DesktopPath(set))
    return function stop() {};
  });
  function createFolder(base: DesktopPath|FolderPath,folderName: string|string[]) {
    if (Array.isArray(folderName)) {
      const targetName = folderName.shift();
      if (!targetName || /^\s*$/.test(targetName)) {
        return;
      }else if (targetName.includes("/")) {
        return createFolder(base, targetName.split("/"));
      }
      const newFolder = new FolderPath({
        desktop: base instanceof DesktopPath ? base : base.desktop,
        name: targetName,
        parent: base,
        contents: [],
      });
      return createFolder(newFolder, folderName);
    }else{
      new FolderPath({
        desktop: base instanceof DesktopPath ? base : base.desktop,
        name: folderName,
        parent: base,
        contents: [],
      });
      return;
    }
  }
  function createFile(base: DesktopPath|FolderPath,folderName: string|string[]) {
    if (Array.isArray(folderName)) {
      const targetName = folderName.shift();
      if (!targetName || /^\s*$/.test(targetName)) {
        return;
      }else if (targetName.includes("/")) {
        return createFile(base, targetName.split("/"));
      }
      const newFolder = new FolderPath({
        desktop: base instanceof DesktopPath ? base : base.desktop,
        name: targetName,
        parent: base,
        contents: [],
      });
      return createFile(newFolder, folderName);
    }else{
      new FilePath({
        desktop: base instanceof DesktopPath ? base : base.desktop,
        name: folderName,
        parent: base,
        contents: {},
      });
      return;
    }
  }
  return {
    subscribe,
    createFolder,
    createFile,
  };
}

export const desktopStore = createDesktopStore();
