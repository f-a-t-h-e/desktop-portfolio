import { writable } from "svelte/store";

// const system = {}

function createLayersStore() {
  const { subscribe, set, update } = writable<string[]>([]);

  return {
    subscribe,
    open: (newLayer: {layerIndex:string}) =>
      update((layers) => {
        let saved = null as string | null;
        layers = layers.filter((id) => {
          if (id !== newLayer.layerIndex) {
            return true;
          }
          saved = id;
          return false;
        });
        if (saved) {
            return [...layers, saved];
        }
        
        return [...layers, newLayer.layerIndex];
      }),
    close: (index: number|string) =>
      update((layers) => {
        if (typeof index === "number") {
          layers.splice(index, 1);
          return layers;
        }
        return layers.filter(l=> l !== index);
      }),
  };
}

export const layersStore = createLayersStore();
