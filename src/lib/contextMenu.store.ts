import { get, writable } from "svelte/store";
import type FolderPath from "./system/FolderPath";
import { desktopStore } from "./desktop.store";
import type DesktopPath from "./system/DesktopPath";

type ContextMenuStore =
  | ({
      isOpen: true;
      x: number;
      y: number;
    } &({
      action?: "";
      target: FolderPath|DesktopPath;
    }|{
      action: "folder";
      target: FolderPath;
    }))
  | {
      isOpen: false;
    };
function createContextMenuStore() {
  const { subscribe, set, update } = writable<ContextMenuStore>({
    isOpen: false,
  });
  return {
    subscribe,
    open: (params: ContextMenuStore) => {    
      set({
        ...params,
      });
    },
    close: () => {
      set({ isOpen: false })
    },
  };
}

export const contextMenuStore = createContextMenuStore();
