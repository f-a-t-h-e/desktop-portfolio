<script lang="ts">
  import { globalPositionStore } from "$lib/globalPosition.store";
  export let abs = true;
  export let down: boolean;
  export let boundX: { start: number; end: number };
  export let boundY: { start: number; end: number };
  export let startX: number;
  export let startY: number;
  export let offsetX: number;
  export let offsetY: number;

  $: if (down) {
    // console.log(
    //   `x:${$globalPositionStore.x}, offX:${offsetX}, y:${$globalPositionStore.y}, offY:${offsetY}`
    // );

    coordinates.x = $globalPositionStore.x - offsetX;
    coordinates.y = $globalPositionStore.y - offsetY;
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
      // val

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
</script>

<!-- @todo : Remove these and enable it from the layout (it's enables from the window) -->

<div
  class="{down
    ? 'bg-green-600/30 border'
    : ''} pointer-events-none border-green-800 {abs ? 'absolute' : 'fixed'} z-[-1]"
  style="top: {coordinates.yStart}px;left: {coordinates.xStart}px;height: {coordinates.y -
    coordinates.yStart}px; width: {coordinates.x - coordinates.xStart}px;"
></div>
