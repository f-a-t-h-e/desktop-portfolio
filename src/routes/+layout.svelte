<script lang="ts">
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { desktopStore } from "$lib/desktop.store";
  import { fileOrFolderNamingStore } from "$lib/fileOrFolderNaming.store";
  import "../app.css";
  import ContextMenue from "./ContextMenue.svelte";
  import Folder from "./Folder.svelte";
  import NameFolder from "./NameFolder.svelte";
  import Toolbar from "./Toolbar.svelte";
  import Selection from "./selection.svelte";

  let desktopDimentions = {
    width: 0,
    height: 0,
    boundStartX: 0,
    boundStartY: 0,
    down: false,
    startX: 0,
    startY: 0,
  };
  let contextmenu: HTMLDivElement;
</script>


<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
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
    }
  }}
>
  {#each Object.values($desktopStore.contents) as folder}
    <Folder folder={{
      name: folder.name,
      path: folder.path,
      target: folder
    }} />
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
