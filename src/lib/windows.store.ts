import { writable } from "svelte/store";
import { layersStore } from "./layers.store";
import DesktopPath from "./system/DesktopPath";
import type Path from "./system/Path";
import { isFolder } from "./system/Path";
import type FilePath from "./system/FilePath";
import type FolderPath from "./system/FolderPath";
import { getPathFromStringAndDesktop, getToPath } from "./utils/getPathUtils";

// const system = {}
interface IWindow {
  // title: string;
  // filesAndFolders: TSystemPath[];
  // path: string;
  // viewType: "folder";
  history: string[];
  historyPointer: number;
  layerIndex: string;
  isMinimized: boolean;
  target: FilePath | FolderPath;
  ID: number;
}
function createWindowsStore() {
  const { subscribe, set, update } = writable<IWindow[]>([]);
  let windowsIndex = 0;
  return {
    subscribe,
    open: (targetPath: FilePath | FolderPath) =>
      update((windows) => {
        let saved = windows.find((w) => {
          if (w.target === targetPath) {
            return true;
          }
          return false;
        });
        if (saved) {
          saved.isMinimized = false;
          layersStore.open({ layerIndex: saved.layerIndex });
          return windows;
        }
        layersStore.open({ layerIndex: "w_" + windowsIndex });
        return [
          ...windows,
          {
            ID: windowsIndex,
            history: [targetPath.path],
            historyPointer: 0,
            layerIndex: "w_" + windowsIndex++,
            isMinimized: false,
            target: targetPath,
          },
        ];
      }),
    openPath: ({ path, desktop }: { desktop: DesktopPath; path: string }) => {
      const targetPath = getPathFromStringAndDesktop(path, desktop);
      if (targetPath) {
        // open
        // if (isFolder(targetPath)) {
        update((windows) => {
          let saved = windows.find((w) => {
            if (w.target === targetPath) {
              return true;
            }
            return false;
          });
          if (saved) {
            saved.isMinimized = false;
            layersStore.open({ layerIndex: saved.layerIndex });
            return windows;
          }
          layersStore.open({ layerIndex: "w_" + windowsIndex });
          return [
            ...windows,
            {
              // ...newWindow,
              ID: windowsIndex,
              history: [targetPath.path],
              historyPointer: 0,
              layerIndex: "w_" + windowsIndex++,
              isMinimized: false,
              // path: targetPath.path,
              target: targetPath,
              // filesAndFolders: newWindow.contents,
              // title: newWindow.name,
            },
          ];
        });
        return;
        // } else {
        //   alert("Opening files is not implemented yet!");
        // }
      } else {
        return;
      }
    },
    close: (ID: number) =>
      update((windows) => {
        windows = windows.filter((w) => w.ID !== ID);
        return windows;
      }),
    refresh: () => {
      update((w) => w);
    },
    closeAllWindows: () => set([]),
    maximize: (ID: number) => {
      update((windows) => {
        windows.find((v) => {
          if (v.ID === ID) {
            v.isMinimized = false;
            layersStore.open({ layerIndex: v.layerIndex });
            return true;
          }
          return false;
        });
        return windows;
      });
    },
    revalidate: () => {
      update((windows) => {
        return windows.filter((w) => {
          // if (w.target.parent.contents[w.target.name]) {
          //   const [_firstPath, ...restPaths] = w.target.path.split("/").filter((v) => v != "" && !/^\s*$/.test(v));
          //   if (restPaths.length) {
          //     if (isFolder(w.target)) {
          //       if (getToPath(restPaths, w.target)) {
          //         return true;
          //       }
          //     }
          //   } else {
          //     return true;
          //   }
          // }
          if (w.target instanceof DesktopPath) {
            return true;
          }
          if (getToDesktop(w.target)) {
            return true;
          }
          layersStore.close(w.layerIndex);
          return false;
        });
      });
    },
  };
}
function getToDesktop(path: Path) {
  if (path.parent.contents[path.name]) {
    if (path.parent instanceof DesktopPath) {
      return true;
    }
    return getToDesktop(path.parent);
  }
  return false;
}
export const windowsStore = createWindowsStore();
