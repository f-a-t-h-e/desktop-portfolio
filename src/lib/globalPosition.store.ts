import { readable } from "svelte/store";

function createGlobalPositionStore() {
  const onUps: ((e: MouseEvent) => unknown | Promise<unknown>)[] = [];
  async function onUp(e: MouseEvent) {
    for (let i = 0; i < onUps.length; i++) {
      await onUps[i](e);
    }
  }
  const { subscribe } = readable<{ x: number; y: number }>(
    { x: 0, y: 0 },
    function start(set) {
      function onMove(e: MouseEvent) {
        set({
          x: e.clientX,
          y: e.clientY,
        });
      }
      document.addEventListener("mousemove", onMove);
      document.addEventListener("mouseup", onUp);
      return function stop() {
        document.removeEventListener("mousemove", onMove);
        document.removeEventListener("mouseup", onUp);
      };
    }
  );

  return {
    subscribe,
    addOnUp: (fn: (e: MouseEvent) => unknown) => {
      if (onUps.includes(fn)) {
        return;
      }
      onUps.push(fn);
    },
    removeOnUp: (fn: (e: MouseEvent) => unknown) => {
      let added = false;
      for (let i = 0; i < onUps.length; i++) {
        const savedFn = onUps[i];
        if (added) {
          onUps[i - 1] = savedFn;
          continue;
        }
        if (savedFn === fn) {
          added = true;
        }
      }
      if (added) {
        onUps.pop();
      }
    },
  };
}

export const globalPositionStore = createGlobalPositionStore();
