<script lang="ts">
  import "../app.css";
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { desktopStore } from "$lib/desktop.store";
  import ContextMenue from "../lib/Components/ContextMenue.svelte";
  import Folder from "../lib/Components/Folder.svelte";
  import NameFolder from "../lib/Components/NameFolder.svelte";
  import Toolbar from "../lib/Components/Toolbar.svelte";
  import Selection from "../lib/Components/Selection.svelte";
  import { globalPositionStore } from "$lib/globalPosition.store";
  import { onDestroy, onMount } from "svelte";
  import { isFolder } from "$lib/system/Path";
  import { globalWindowDetailsStore } from "$lib/globalWindowDetails.store";

  let desktopDimentions = {
    width: 0,
    height: 0,
    boundStartX: 0,
    boundStartY: 0,
    down: false,
    startX: 0,
    startY: 0,
  };
  // let contextmenu: HTMLDivElement;
  function onUp() {
    desktopDimentions.down = false;
  }
  onMount(() => {
    globalPositionStore.addOnUp(onUp);
  });
  onDestroy(() => {
    globalPositionStore.removeOnUp(onUp);
  });
  let w: number;
  let h: number;

  $: if (w) {
    globalWindowDetailsStore.update(p=>({...p,w}));
  }
  $: if (h) {
    globalWindowDetailsStore.update(p=>({...p,h}));
  }
</script>

<svelte:window bind:innerWidth={w} bind:innerHeight={h} />
<svelte:document
  on:mousemove={globalPositionStore.docUtilFunctions.onMove}
  on:touchmove={globalPositionStore.docUtilFunctions.onTouchMove}
  on:mouseup={globalPositionStore.docUtilFunctions.onUp}
  on:touchcancel={globalPositionStore.docUtilFunctions.onUp}
  on:touchend={globalPositionStore.docUtilFunctions.onUp}
/>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  dir="rtl"
  id="desktop"
  class="w-full h-full p-1
  grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] grid-rows-[repeat(auto-fill,minmax(4.5rem,1fr))]
  items-center justify-items-center"
  bind:clientWidth={desktopDimentions.width}
  bind:clientHeight={desktopDimentions.height}
  on:mousedown={(e) => {
    if (e.currentTarget === e.target) {
      desktopDimentions.down = true;
      desktopDimentions.startX = e.clientX;
      desktopDimentions.startY = e.clientY;
    }
  }}
  on:touchstart={(e) => {
    if (e.currentTarget === e.target && e.targetTouches.length) {
      desktopDimentions.down = true;
      desktopDimentions.startX = e.targetTouches[0].clientX;
      desktopDimentions.startY = e.targetTouches[0].clientY;
    }
    globalPositionStore.docUtilFunctions.set({
      x: e.targetTouches[0].clientX,
      y: e.targetTouches[0].clientY,
    });
  }}
  on:contextmenu={(e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
      contextMenuStore.open({
        target: $desktopStore,
        x: e.clientX,
        y: e.clientY,
        isOpen: true,
      });
      desktopDimentions.down = false;
    }
  }}
>
  {#each Object.values($desktopStore.contents) as path (path.id)}
    {#if isFolder(path)}
      <Folder
        folder={{
          name: path.name,
          path: path.path,
          target: path,
        }}
      />
    {:else}
      <div>{path}</div>
    {/if}
  {/each}
  <slot />
  <Selection
    boundY={{
      start: desktopDimentions.boundStartY,
      end: desktopDimentions.height,
    }}
    boundX={{
      start: desktopDimentions.boundStartX,
      end: desktopDimentions.width,
    }}
    bind:startX={desktopDimentions.startX}
    bind:startY={desktopDimentions.startY}
    bind:down={desktopDimentions.down}
    offsetX={0}
    offsetY={0}
  />
</div>
<NameFolder />
<Toolbar />
<ContextMenue />

<style lang="postcss">
  :global(body) {
    background-image: url(/bg0.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
</style>
