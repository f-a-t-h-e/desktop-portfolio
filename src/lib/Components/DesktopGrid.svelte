<script lang="ts">
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { desktopStore } from "$lib/desktop.store";
  import { globalPositionStore } from "$lib/globalPosition.store";
  import { onDestroy, onMount } from "svelte";
  import { isFolder } from "$lib/system/Path";
  import { globalWindowDetailsStore } from "$lib/globalWindowDetails.store";
  import Folder from "./Folder.svelte";
  import Selection from "./Selection.svelte";
  import DropArea from "./DropArea.svelte";

  let desktopDimentions = {
    width: 0,
    height: 0,
    boundStartX: 0,
    boundStartY: 0,
    down: false,
    startX: 0,
    startY: 0,
  };
  let isDragging: null | number | number[] = null;
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
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  dir="rtl"
  id="desktop"
  class="w-full h-full p-1 z-0
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
  <!-- {#each Object.values($desktopStore.contents) as path (path.id)}
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
  {/each} -->
  {#each $desktopStore.gridItems as item, i (i)}
    {#if item}
      {#if isFolder(item)}
        <Folder
          folder={{
            name: item.name,
            path: item.path,
            target: item,
          }}
          {i}
          bind:isDragging={isDragging}
        />
      {:else}
        <div>{item}</div>
      {/if}
    {:else if typeof isDragging === "number"}
      <DropArea
      {i}
      />
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
