<script lang="ts">
  import { desktopStore } from "$lib/desktop.store";
  import type FilePath from "$lib/system/FilePath";
  import type FolderPath from "$lib/system/FolderPath";

  export let i: number;
  export let draggedTarget: number | null;
  export let selectedItems: {
    [key: number]: FilePath | FolderPath;
  };
  export let isDraggingOver: null | number = null;

  function drop(
    e: DragEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    e.preventDefault();
    if (typeof draggedTarget === "number" && typeof isDraggingOver === "number") {
      const items = Object.entries(selectedItems)
      for (let i = 0; i < items.length; i++) {
        // const element = selectedItems[];
        $desktopStore.moveGridItem(+items[i][0], (isDraggingOver + +items[i][0] - draggedTarget));
        selectedItems[(isDraggingOver + +items[i][0] - draggedTarget)] = selectedItems[+items[i][0]];
        delete selectedItems[+items[i][0]];
      }
    }
    draggedTarget = null;
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="w-full h-full {typeof isDraggingOver === 'number' && typeof draggedTarget === 'number' &&
  selectedItems[i - (isDraggingOver - draggedTarget)]
    ? 'bg-drop-area/40 border-drop-area/60 border'
    : ''}"
  on:dragenter={() => {
    isDraggingOver = i;
  }}
  on:dragleave={() => {
    if (isDraggingOver === i) {
      isDraggingOver = null;
    }
  }}
  on:drop={(e) => drop(e)}
  on:dragover|preventDefault
></div>
