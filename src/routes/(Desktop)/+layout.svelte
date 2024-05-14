<script lang="ts">
  import { desktopStore } from "$lib/desktop.store";
  import ContextMenue from "$lib/Components/ContextMenue.svelte";
  import NameFolder from "$lib/Components/NameFolder.svelte";
  import Toolbar from "$lib/Components/Toolbar.svelte";
  import { globalPositionStore } from "$lib/globalPosition.store";
  import { globalWindowDetailsStore } from "$lib/globalWindowDetails.store";
  import DesktopGrid from "$lib/Components/DesktopGrid.svelte";
  import { contextMenuStore } from "$lib/contextMenu.store";

  let w: number;
  let h: number;

  $: if (w) {
    globalWindowDetailsStore.update((p) => ({ ...p, w }));
    $desktopStore.resetGrid(w, h);
  }
  $: if (h) {
    globalWindowDetailsStore.update((p) => ({ ...p, h }));
    $desktopStore.resetGrid(w, h);
  }
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<svelte:document
  on:mousemove={globalPositionStore.docUtilFunctions.onMove}
  on:touchmove={globalPositionStore.docUtilFunctions.onTouchMove}
  on:mouseup={globalPositionStore.docUtilFunctions.onUp}
  on:touchcancel={globalPositionStore.docUtilFunctions.onUp}
  on:touchend={globalPositionStore.docUtilFunctions.onUp}
  on:keydown={e=>{
    if (e.key == "Escape") {
      contextMenuStore.close();
    }
  }}
/>
<svelte:head>
  <title>Ubuntu - Svelte</title>
</svelte:head>
<!-- {@html `<style>:root{--global-x:${$globalPositionStore.x};--global-y:${$globalPositionStore.y}}</style>`} -->
<!-- <svg
  class="block fixed w-[11px] h-[17px] z-[100] pointer-events-none"
  style="left:calc(var(--global-x)*1px);top:calc(var(--global-y)*1px);"
  width="11"
  height="17"
  viewBox="0 0 11 17"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    d="M5.55279 11.2236L7.5 15.118V16.5H5.82494L3.95691 12.2969L3.66123 11.6317L3.14645 12.1464L0.5 14.7929V1.20711L9.79289 10.5H6H5.19098L5.55279 11.2236Z"
    fill="#2F2F2F"
    stroke="white"
  />
</svg> -->
<DesktopGrid>
  <slot />
</DesktopGrid>
<NameFolder />
<Toolbar />
<ContextMenue />
<!-- <style lang="postcss">
  :global(body) {
    background-image: url(/bg0.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    user-select: none;
  }
</style> -->

<style>
  /* :global(*) {
    cursor: none;
  } */
</style>
