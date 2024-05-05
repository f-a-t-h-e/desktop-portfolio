import { writable } from "svelte/store";
import { layersStore } from "./layers.store";

// const system = {}

function createWindowsStore() {
  const { subscribe, set, update } = writable<IWindow[]>([]);
  let windowsIndex = 0;
  return {
    subscribe,
    open: (
      newWindow: Omit<IWindow, "history" | "historyPointer" | "layerIndex"|"isMinimized">
    ) =>
      update((windows) => {
        let saved = windows.find((w) => {
          if (w.path === newWindow.path) {
            return true;
          }
          return false;
        });
        if (saved) {
          saved.isMinimized = false;
          layersStore.open({layerIndex: saved.layerIndex})
          return windows;
        }
        layersStore.open({layerIndex: "w_" + windowsIndex})
        return [
          ...windows,
          {
            ...newWindow,
            history: [newWindow.path],
            historyPointer: 0,
            layerIndex: "w_" + windowsIndex++,
            isMinimized: false,
          },
        ];
      }),
    close: (index: number) =>
      update((windows) => {
        windows.splice(index, 1);
        return windows;
      }),
    closeAllWindows: () => set([]),
  };
}

export const windowsStore = createWindowsStore();
