<script lang="ts">
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { desktopStore } from "$lib/desktop.store";
  import { globalPositionStore } from "$lib/globalPosition.store";
  import { onDestroy, onMount } from "svelte";
  import { isFolder } from "$lib/system/Path";
  import FolderItem from "./FolderItem.svelte";
  import Selection from "./Selection.svelte";
  import DropArea from "./DropArea.svelte";
  import FileItem from "./FileItem.svelte";
  import type FolderPath from "$lib/system/FolderPath";
  import type FilePath from "$lib/system/FilePath";

  let desktopDimentions = {
    width: 0,
    height: 0,
    boundStartX: 0,
    boundStartY: 0,
    down: false,
    startX: 0,
    startY: 0,
  };
  /**
   * The current anchor item index getting dragged, this index is the same as the key in `selectedItems` & `$desktopStore.gridItems`
   */
  let isDragging: null | number = null;
  /**
   * The current `DropArea` the drag is over
   */
  let isDraggingOver: null | number = null;
  let selectedItems: { [key: number]: FilePath | FolderPath } = {};
  let selectableItems:{
    item: FilePath | FolderPath;
    i: number;
    spans?: HTMLSpanElement[] | undefined;
  }[] = [];
  $: if ($desktopStore.gridItems) {
    selectableItems = $desktopStore.gridItems.reduce(
    (prev, item, i) => {
      if (item) {
        const savdItem = selectableItems.find(v=>v.i===i);
        if (savdItem && savdItem.item === item) {
          prev.push(savdItem);
        }else{
          prev.push({
            item,
            i,
          });
        }
      }
      return prev;
    },
    [] as {
      item: FilePath | FolderPath;
      i: number;
      spans?: HTMLSpanElement[];
    }[]
  );
  }
  
  // let contextmenu: HTMLDivElement;
  function onUp() {
    desktopDimentions.down = false;
  }
  function getTheObjDetails(i: number): {
    item: FilePath | FolderPath;
    i: number;
    spans?: HTMLSpanElement[] | undefined;
  } {
    return selectableItems.find((val) => val.i === i)!;
  }
  $: if (typeof isDraggingOver == "number") {
    // draggingElements
  } else {
  }
  onMount(() => {
    globalPositionStore.addOnUp(onUp);
  });
  onDestroy(() => {
    globalPositionStore.removeOnUp(onUp);
  });
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<!-- @todo : Use `ResizeObserver` instead of binding to the width and height like this -->
<div
  dir="rtl"
  id="desktop"
  class="w-full h-full p-0 z-0
  grid grid-cols-[repeat(auto-fill,minmax(6.125rem,1fr))] grid-rows-[repeat(auto-fill,minmax(6.125rem,1fr))]
  items-center justify-items-center"
  bind:clientWidth={desktopDimentions.width}
  bind:clientHeight={desktopDimentions.height}
  on:mousedown={(e) => {
    if (e.currentTarget === e.target) {
      desktopDimentions.startX = e.clientX;
      desktopDimentions.startY = e.clientY;
      desktopDimentions.down = true;
      if (
        $globalPositionStore.x !== e.clientX ||
        $globalPositionStore.y !== e.clientY
      ) {
        globalPositionStore.docUtilFunctions.set({
          x: e.clientX,
          y: e.clientY,
        });
      }
    }
  }}
  on:touchstart={(e) => {
    if (e.currentTarget === e.target && e.targetTouches.length) {
      desktopDimentions.startX = e.targetTouches[0].clientX;
      desktopDimentions.startY = e.targetTouches[0].clientY;
      desktopDimentions.down = true;
    }
    if (
      $globalPositionStore.x !== e.targetTouches[0].clientX ||
      $globalPositionStore.y !== e.targetTouches[0].clientY
    ) {
      globalPositionStore.docUtilFunctions.set({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    }
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
  {#each $desktopStore.gridItems as item, i}
    {#if item}
      {#if isFolder(item)}
        <FolderItem
          bind:selectableItems
          targetFolder={{
            name: item.name,
            path: item.path,
            target: item,
          }}
          {i}
          bind:isDragging
          bind:selectedItems
        />
      {:else}
        <FileItem
          bind:selectableItems
          targetFile={{
            name: item.name,
            path: item.path,
            target: item,
          }}
          {i}
          bind:isDragging
          bind:selectedItems
        />
      {/if}
    {:else if typeof isDragging === "number"}
      <!-- {:else} -->
      <DropArea
        {i}
        bind:draggedTarget={isDragging}
        bind:isDraggingOver
        bind:selectedItems
      />
      <!-- You have to use this for now so the elements are placed in the correct place -->
      <!-- @todo : get the number of columns and rows so you don't need this additional elements -->
    {:else}
      <span></span>
    {/if}
  {/each}
  <slot />
  <!-- {#if  desktopDimentions.down} -->

  <Selection
    {selectableItems}
    bind:selectedItems
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
  <!-- {/if} -->
</div>
