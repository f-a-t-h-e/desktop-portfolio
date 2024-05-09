import { writable } from "svelte/store";

function createGlobalWindowDetailsStore() {
  const {
    subscribe,
    set: _,
    update,
  } = writable<{ w: number; h: number }>({ w: 640, h: 640 });
  return {
    subscribe,
    update,
  };
}

export const globalWindowDetailsStore = createGlobalWindowDetailsStore();
