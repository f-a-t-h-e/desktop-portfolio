import { readable } from "svelte/store";

function createGlobalPositionStore() {
  const onUps: (() => unknown | Promise<unknown>)[] = [];
  async function onUp() {
    for (let i = 0; i < onUps.length; i++) {
      await onUps[i]();
    }
  }
  const docUtilFunctions = {
    onUp,
    onMove: (e: MouseEvent) => {},
    onTouchMove: (e: TouchEvent) => {},
    set: (params: { x: number; y: number }) => {},
  };
  const { subscribe } = readable<{ x: number; y: number }>(
    { x: 0, y: 0 },
    function start(set) {
      docUtilFunctions.onMove = function onMove(e: MouseEvent) {
        set({
          x: e.clientX,
          y: e.clientY,
        });
      };
      docUtilFunctions.onTouchMove = function onTouchMove(e: TouchEvent) {
        if (e.targetTouches.length) {
          // e.preventDefault();
          set({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
          });
        }
      };
      docUtilFunctions.set = set;
      return function stop() {};
    }
  );

  return {
    subscribe,
    addOnUp: (fn: () => unknown) => {
      if (onUps.includes(fn)) {
        return;
      }
      onUps.push(fn);
    },
    removeOnUp: (fn: () => unknown) => {
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
    docUtilFunctions,
  };
}

export const globalPositionStore = createGlobalPositionStore();
