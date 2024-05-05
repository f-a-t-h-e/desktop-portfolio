import { readable } from "svelte/store";

// const system = {}

function createPagesStore() {
  const { subscribe, } = readable<{name:string;path:TPath}[]>([
    {name: "Desktop", path: "/"},
    {name: "About", path: "/about"},
    {name: "Projects", path: "/projects"},
  ]);

  return {
    subscribe,
  };
}

export const pagesStore = createPagesStore();
