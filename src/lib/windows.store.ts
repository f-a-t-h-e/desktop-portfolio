import { writable } from "svelte/store";
import { layersStore } from "./layers.store";
import DesktopPath from "./system/DesktopPath";
import type Path from "./system/Path";
import { isFolder } from "./system/Path";
import type FilePath from "./system/FilePath";
import type FolderPath from "./system/FolderPath";

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
  function getToPath(pathNames: string[], path: Path) {
    debugger
    
    if (pathNames.length) {
      const currentPathName = pathNames[0].trim();
      if (isFolder(path)) {
        const [_, ...newPathNames] = pathNames;
        if (path.contents[currentPathName]) {
          if (path.contents[currentPathName].isFile) {
            return path.contents[currentPathName];
          }
          return getToPath(newPathNames, path.contents[currentPathName]);
        } else {
          return null;
        }
      } else {
        if (path.name === currentPathName) {
          return path;
        } else {
          return null;
        }
      }
    }
    return null;
  }
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
      const pathArr = path
        .split("/")
        .filter((v) => v != "" && !/^\s*$/.test(v));
      if (pathArr.length > 1) {
        const [_, ...newPathNames] = pathArr;
        const currentPathName = pathArr[0].trim();
        if (desktop.contents[currentPathName]) {
          if (desktop.contents[currentPathName].isFile) {
            alert("Opening files is not implemented yet!");
          }
          const targetPath = getToPath(
            newPathNames,
            desktop.contents[currentPathName]
          );
          if (targetPath) {
            // open
            if (isFolder(targetPath)) {
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
            } else {
              alert("Opening files is not implemented yet!");
            }
          } else {
            alert("Path not found!");
          }
        } else {
          alert("Path not found!");
        }
      } else if (pathArr.length === 1) {
        const targetPath = desktop.contents[pathArr[0]];
        if (targetPath) {
          // open
          if (isFolder(targetPath)) {
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
          } else {
            alert("Opening files is not implemented yet!");
          }
        } else {
          alert("Path not found!");
        }
      } else {
        alert("Invalid path name");
      }
      // const newWindow = get(pathsStore).find((p) => p.path === path);
      // if (!newWindow) {
      //   alert("This path was not found!");
      //   return;
      // } else if (newWindow.isFile) {
      //   // Do something else like opening a specific window
      //   alert("Openning files is not implemented yet!");
      //   return;
      // }
      // update((windows) => {
      //   let saved = windows.find((w) => {
      //     if (w.path === newWindow.path) {
      //       return true;
      //     }
      //     return false;
      //   });
      //   if (saved) {
      //     saved.isMinimized = false;
      //     layersStore.open({ layerIndex: saved.layerIndex });
      //     return windows;
      //   }
      //   layersStore.open({ layerIndex: "w_" + windowsIndex });
      //   return [
      //     ...windows,
      //     {
      //       // ...newWindow,
      //       ID: windowsIndex,
      //       history: [newWindow.path],
      //       historyPointer: 0,
      //       layerIndex: "w_" + windowsIndex++,
      //       isMinimized: false,
      //       path: newWindow.path,
      //       // filesAndFolders: newWindow.contents,
      //       // title: newWindow.name,
      //     },
      //   ];
      // });
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
            return true
          }
          layersStore.close(w.layerIndex);
          return false;
        });
      });
    },
  };
}
function getToDesktop(path:Path) {
  if (path.parent.contents[path.name]) {
    if (path.parent instanceof DesktopPath) {
      return true;
    }
    return getToDesktop(path.parent)
  }
  return false;
}
export const windowsStore = createWindowsStore();
