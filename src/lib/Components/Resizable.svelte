<script lang="ts">
  import { globalPositionStore } from "$lib/globalPosition.store";
  import { onDestroy, onMount } from "svelte";
  export let positions = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  export let relativePositions = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  export let trunOnFor: {
    n?: boolean;
    s?: boolean;
    e?: boolean;
    w?: boolean;
    ne?: boolean;
    nw?: boolean;
    se?: boolean;
    sw?: boolean;
  } = {
    n: true,
    s: true,
    e: true,
    w: true,
    ne: true,
    nw: true,
    se: true,
    sw: true,
  };
  export let minW: number;
  export let minH: number;
  let x: number;
  let y: number;

  let isOn = false;
  let nOn = false;
  let sOn = false;
  let eOn = false;
  let wOn = false;
  let neOn = false;
  let seOn = false;
  let swOn = false;
  let nwOn = false;
  function onUp(e: MouseEvent) {
    isOn = false;
    nOn = false;
    sOn = false;
    eOn = false;
    wOn = false;
    neOn = false;
    seOn = false;
    swOn = false;
    nwOn = false;
    cursor = "";
  }

  $: if (isOn) {
    x = $globalPositionStore.x - relativePositions.left;
    y = $globalPositionStore.y - relativePositions.top;
    if (x > innerWidth) {
      x = innerWidth;
    } else if (x < 0) {
      x = 0;
    }
    if (y > innerHeight) {
      y = innerHeight;
    } else if (y < 0) {
      y = 0;
    }
  }
  $: if (nOn) {
    if (positions.height + (positions.top - y) > minH) {
      positions.height += positions.top - y;
      positions.top = y;
    }
  }
  $: if (sOn) {
    if (y - positions.top > minH) {
      positions.bottom = innerHeight - y;
      positions.height = y - positions.top;
    }
  }
  $: if (eOn) {
    if (x - positions.left > minW) {
      positions.right = innerWidth - x;
      positions.width = x - positions.left;
    }
  }
  $: if (wOn) {
    if (positions.left - x + positions.width > minW) {
      positions.width += positions.left - x;
      positions.left = x;
    }
  }
  $: if (neOn) {
    if (positions.height + (positions.top - y) > minH) {
      positions.height += positions.top - y;
      positions.top = y;
    }

    if (x - positions.left > minW) {
      positions.right = innerWidth - x;
      positions.width = x - positions.left;
    }
  }
  $: if (seOn) {
    if (y - positions.top > minH) {
      positions.bottom = innerHeight - y;
      positions.height = y - positions.top;
    }

    if (x - positions.left > minW) {
      positions.right = innerWidth - x;
      positions.width = x - positions.left;
    }
  }
  $: if (swOn) {
    if (y - positions.top > minH) {
      positions.bottom = innerHeight - y;
      positions.height = y - positions.top;
    }

    if (positions.left - x + positions.width > minW) {
      positions.width += positions.left - x;
      positions.left = x;
    }
  }
  $: if (nwOn) {
    if (positions.height + (positions.top - y) > minH) {
      positions.height += positions.top - y;
      positions.top = y;
    }

    if (positions.left - x + positions.width > minW) {
      positions.width += positions.left - x;
      positions.left = x;
    }
  }

  onMount(() => {
    globalPositionStore.addOnUp(onUp);
  });
  onDestroy(() => {
    globalPositionStore.removeOnUp(onUp);
  });
  let cursor = "";
</script>

{#if isOn}
  <div
    class="opacity-0 fixed w-screen h-screen z-[100]"
    style="cursor: {cursor};top:-{positions.top}px;left:-{positions.left}px;"
  ></div>
{/if}

<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if trunOnFor.w}
  <span
    on:mousedown={(e) => {
      e.preventDefault();
      isOn = true;
      wOn = true;
      cursor = "ew-resize";
    }}
    class="block cursor-ew-resize absolute w-1 h-[calc(100%-.5rem)] top-1 left-0 opacity-0"
  ></span>
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if trunOnFor.e}
  <span
    on:mousedown={(e) => {
      e.preventDefault();
      isOn = true;
      eOn = true;
      cursor = "ew-resize";
    }}
    class="block cursor-ew-resize absolute w-1 h-[calc(100%-.5rem)] top-1 right-0 opacity-0"
  ></span>
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if trunOnFor.n}
  <span
    on:mousedown={(e) => {
      e.preventDefault();
      isOn = true;
      nOn = true;
      cursor = "ns-resize";
    }}
    class="block cursor-ns-resize absolute w-[calc(100%-.5rem)] h-1 top-0 left-1 opacity-0"
  ></span>
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if trunOnFor.s}
  <span
    on:mousedown={(e) => {
      e.preventDefault();
      isOn = true;
      sOn = true;
      cursor = "ns-resize";
    }}
    class="block cursor-ns-resize absolute w-[calc(100%-.5rem)] h-1 bottom-0 left-1 opacity-0"
  ></span>
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if trunOnFor.nw}
  <span
    on:mousedown={(e) => {
      e.preventDefault();
      isOn = true;
      nwOn = true;
      cursor = "nwse-resize";
    }}
    class="block cursor-nwse-resize absolute w-1 h-1 top-0 left-0 opacity-0"
  ></span>
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if trunOnFor.ne}
  <span
    on:mousedown={(e) => {
      e.preventDefault();
      isOn = true;
      neOn = true;
      cursor = "nesw-resize";
    }}
    class="block cursor-nesw-resize absolute w-1 h-1 top-0 right-0 opacity-0"
  ></span>
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if trunOnFor.sw}
  <span
    on:mousedown={(e) => {
      e.preventDefault();
      isOn = true;
      swOn = true;
      cursor = "nesw-resize";
    }}
    class="block cursor-nesw-resize absolute w-1 h-1 bottom-0 left-0 opacity-0"
  ></span>
{/if}
<!-- svelte-ignore a11y-no-static-element-interactions -->
{#if trunOnFor.se}
  <span
    on:mousedown={(e) => {
      e.preventDefault();
      isOn = true;
      seOn = true;
      cursor = "nwse-resize";
    }}
    class="block cursor-nwse-resize absolute w-1 h-1 bottom-0 right-0 opacity-0"
  ></span>
{/if}
