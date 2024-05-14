import { get, writable } from "svelte/store";
import type FolderPath from "./system/FolderPath";
import { desktopStore } from "./desktop.store";
import type DesktopPath from "./system/DesktopPath";

type ContextMenuStore =
  | ({
      isOpen: true;
      x: number;
      y: number;
      estH?: number;
    } & (
      | {
          action: "desktop";
          actions: (
            | (
                | { name: string; fn?: () => unknown; subActions?: never }
                | {
                    name: string;
                    fn?: never;
                    subActions: (
                      | { name: string; fn?: () => unknown }
                      | "break"
                    )[];
                    estH?: number;
                    estY?: number;
                  }
              )
            | "break"
          )[];
        }
      | {
          action: "folder";
          actions: (
            | (
                | { name: string; fn?: () => unknown; subActions?: never }
                | {
                    name: string;
                    fn?: never;
                    subActions: (
                      | { name: string; fn?: () => unknown }
                      | "break"
                    )[];
                    estH?: number;
                    estY?: number;
                  }
              )
            | "break"
          )[];
        }
    ))
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
      set({ isOpen: false });
    },
  };
}

export const contextMenuStore = createContextMenuStore();
