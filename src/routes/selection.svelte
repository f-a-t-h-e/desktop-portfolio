<script lang="ts">
  export let down = false;
  export let boundX:{start:number;end:number};
  export let boundY:{start:number;end:number};
  export let startX:number;
  export let startY:number;

  $: mouseMove = down
    ? function (
        e: MouseEvent & {
          currentTarget: EventTarget & Document;
        }
      ) {
        coordinates.x = e.clientX;
        coordinates.y = e.clientY;
      }
    : function (..._: any) {};
  $: touchMove = down
    ? function (
        e: TouchEvent & {
          currentTarget: EventTarget & Document;
        }
      ) {
        if (e.targetTouches.length) {
          coordinates.x = e.targetTouches[0].clientX;
          coordinates.y = e.targetTouches[0].clientY;
        }
      }
    : function (..._: any) {};

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
      }else if (val < boundX.start) {
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
      }else if (val < boundY.start) {
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
      }else if (val < boundX.start) {
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
      }else if (val < boundX.start) {
        val = boundX.start;
      }
      this._yStart = val;
      this._y = val;
    },
  };

  $: coordinates.xStart = startX;
  $: coordinates.yStart = startY;
</script>

<svelte:document
  on:mouseup={() => {
    down = false;
    coordinates.xStart = 0;
    coordinates.yStart = 0;
  }}
  on:mousemove={mouseMove}
  on:touchmove={touchMove}
  on:touchcancel={() => {
    down = false;
    coordinates.xStart = 0;
    coordinates.yStart = 0;
  }}
  on:touchend={() => {
    coordinates.xStart = 0;
    coordinates.yStart = 0;
    down = false;
  }}
/>

<div
  class="{down
    ? 'bg-green-600/60 border'
    : ''} pointer-events-none border-green-800 fixed hidden sm:block"
  style="top: {coordinates.yStart}px;left: {coordinates.xStart}px;height: {coordinates.y -
    coordinates.yStart}px; width: {coordinates.x - coordinates.xStart}px;"
></div>
