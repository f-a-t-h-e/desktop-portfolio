import { get, writable } from "svelte/store";
import type Path from "./system/Path";
import type FolderPath from "./system/FolderPath";
import { desktopStore } from "./desktop.store";
import type DesktopPath from "./system/DesktopPath";

type FolderNamingStore =
  | {
      isOpen: true;
      target: Path;
      isNew: false;
    }
  | {
      isOpen: true;
      target: FolderPath|DesktopPath;
      isNew: true;
      isFile: boolean;
    }
  | {
      isOpen: false;
    };
function createFileOrFolderNamingStore() {
  const { subscribe, set, update } = writable<FolderNamingStore>({isOpen:false});

  return {
    subscribe,
    open: (params: FolderNamingStore & { isOpen?: true }) => {
      set({
        ...params,
        isOpen:true
      });
    },
    apply: (value:string)=>{
        update(state=>{
            if (state.isOpen) {
                if (state.isNew) {
                    if (state.isFile) {
                        desktopStore.createFile(state.target, value);
                    }else{
                        desktopStore.createFolder(state.target, value)
                    }
                    get(desktopStore).apply();
                }else{
                    state.target.name = value;
                }
                return {
                    isOpen: false
                }
            }else {
                alert("The naming box was not open!")
                return state
            }
        })
    },
    close: () => set({ isOpen: false }),
  };
}

export const fileOrFolderNamingStore = createFileOrFolderNamingStore();
