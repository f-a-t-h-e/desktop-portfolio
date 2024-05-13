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
  import { isFolder } from "$lib/system/Path";
  import { globalWindowDetailsStore } from "$lib/globalWindowDetails.store";
  import DesktopGrid from "$lib/Components/DesktopGrid.svelte";


  let w: number;
  let h: number;

  $: if (w) {
    globalWindowDetailsStore.update((p) => ({ ...p, w }));
    $desktopStore.resetGrid(w,h)
  }
  $: if (h) {
    globalWindowDetailsStore.update((p) => ({ ...p, h }));
    $desktopStore.resetGrid(w,h)
  }
</script>

<svelte:window
  bind:innerWidth={w}
  bind:innerHeight={h}
/>
<svelte:document
  on:mousemove={globalPositionStore.docUtilFunctions.onMove}
  on:touchmove={globalPositionStore.docUtilFunctions.onTouchMove}
  on:mouseup={globalPositionStore.docUtilFunctions.onUp}
  on:touchcancel={globalPositionStore.docUtilFunctions.onUp}
  on:touchend={globalPositionStore.docUtilFunctions.onUp}
/>

<DesktopGrid>
  <slot />
</DesktopGrid>
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
    user-select: none;
  }
</style>
