<script lang="ts">
  import { globalPositionStore } from "$lib/globalPosition.store";
  import detectCollision from "$lib/utils/detectCollision";
  import type FilePath from "$lib/system/FilePath";
  import type FolderPath from "$lib/system/FolderPath";
  export let abs = true;
  export let down: boolean;
  export let boundX: { start: number; end: number };
  export let boundY: { start: number; end: number };
  export let startX: number;
  export let startY: number;
  export let offsetX: number;
  export let offsetY: number;
  export let selectedItems:
    | { [key: number]: FilePath | FolderPath }
    | undefined = undefined;
  export let selectableItems:
    | {
        item: FilePath | FolderPath;
        i: number;
        spans?: HTMLSpanElement[] | undefined;
      }[]
    | undefined = undefined;
  let logit = false;
  setInterval(() => {
    logit = true;
  }, 1000);

  $: if (down) {
    coordinates.xStart = startX;
    coordinates.yStart = startY;
    coordinates.x = $globalPositionStore.x - offsetX;
    coordinates.y = $globalPositionStore.y - offsetY;

    if (selectedItems && selectableItems?.length) {
      let react = false;
      let collied = false;
      for (let i = 0; i < selectableItems.length; i++) {
        const item = selectableItems[i];
        collied = false;
        if (item.spans) {
          for (let j = 0; j < item.spans.length; j++) {
            const span = item.spans[j];
            if (
              detectCollision(span.getBoundingClientRect(), {
                x: coordinates.xStart,
                y: coordinates.yStart,
                width: coordinates.x - coordinates.xStart,
                height: coordinates.y - coordinates.yStart,
              })
            ) {
              collied = true;
              if (!selectedItems[item.i]) {
                selectedItems[item.i] = item.item;
                react = true;
              }
            }
          }
        }else{
          // console.log("NO SPANS");
          
        }
        if (!collied && selectedItems[item.i]) {
          delete selectedItems[item.i];
          react = true;
        }
      }

      // if (react) {
      selectedItems = selectedItems;
      // }
    }
  }
  const coordinates = {
    _x: 0,
    get x() {
      if (this._x > this._xStart) {
        return this._x;
      } else {
        return this._xStart;
      }
    },
    set x(val: number) {
      if (val > boundX.end) {
        val = boundX.end;
      } else if (val < boundX.start) {
        val = boundX.start;
      }
      this._x = val;
    },
    _y: 0,
    get y() {
      if (this._y > this._yStart) {
        return this._y;
      } else {
        return this._yStart;
      }
    },
    set y(val: number) {
      if (val > boundY.end) {
        val = boundY.end;
      } else if (val < boundY.start) {
        val = boundY.start;
      }
      this._y = val;
    },
    _xStart: 0,
    get xStart() {
      if (this._x > this._xStart) {
        return this._xStart;
      } else {
        return this._x;
      }
    },
    set xStart(val: number) {
      if (val > boundX.end) {
        val = boundX.end;
      } else if (val < boundX.start) {
        val = boundX.start;
      }
      this._xStart = val;
      this._x = val;
    },
    _yStart: 0,
    get yStart() {
      if (this._y > this._yStart) {
        return this._yStart;
      } else {
        return this._y;
      }
    },
    set yStart(val: number) {
      if (val > boundX.end) {
        val = boundX.end;
      } else if (val < boundX.start) {
        val = boundX.start;
      }
      this._yStart = val;
      this._y = val;
    },
  };

  $: coordinates.xStart = startX;
  $: coordinates.yStart = startY;
  // $: console.log(coordinates, startX);
</script>

<!-- @todo : Remove these and enable it from the layout (it's enables from the window) -->

<div
  class="{down
    ? 'bg-primary/60 border'
    : ''} pointer-events-none border-primary {abs
    ? 'absolute'
    : 'fixed'} z-[-1]"
  style="top: {coordinates.yStart}px;left: {coordinates.xStart}px;height: {coordinates.y -
    coordinates.yStart}px; width: {coordinates.x - coordinates.xStart}px;"
></div>
