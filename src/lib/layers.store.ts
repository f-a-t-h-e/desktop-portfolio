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
    close: (index: number) =>
      update((layers) => {
        layers.splice(index, 1);
        return layers;
      }),
  };
}

export const layersStore = createLayersStore();
