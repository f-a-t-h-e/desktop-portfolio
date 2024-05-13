<script lang="ts">
  import type FilePath from "$lib/system/FilePath";
  import type FolderPath from "$lib/system/FolderPath";

  export let selectableItems: {
    item: FilePath | FolderPath;
    i: number;
    spans?: HTMLSpanElement[] | undefined;
  }[] = [];
  export let i: number;

  export let isDragging: number | number[] | null = null;
  export let targetFile: {
    path: string;
    name: string;
    target: FilePath;
  };
  export let selectedItems: { [key: number]: FilePath | FolderPath } = {};

  $: if (spans.length === 2) {
    selectableItems.find((item, j) => {
      if (item.i === i) {
        item.spans = spans;
        return true;
      }
    });    
    // selectableItems = {...selectableItems};
  }
  
  function dragStart(
    e: DragEvent & {
      currentTarget: EventTarget & HTMLButtonElement;
    },
    isFile: boolean,
    itemIndex: number
  ) {
    isDragging = i;
  }
  let spans: HTMLSpanElement[] = [];
</script>

{#if targetFile.target.contents.iFrame}
  <button
    class="text-6xl cursor-pointer active:scale-95
flex flex-col items-center
relative
{selectedItems[i] ? '[&>*]:bg-primary/60' : ''}
"
    draggable={true}
    on:dragstart={(event) => dragStart(event, false, i)}
    on:dragend={(e) => {
      isDragging = null;
    }}
    on:mousedown={(e) => {
      if (Object.keys(selectedItems).length > 1) {
        if (e.shiftKey) {
          if (selectedItems[i]) {
            delete selectedItems[i];
            selectedItems = selectedItems;
          } else {
            selectedItems[i] = targetFile.target;
          }
        } else if (e.ctrlKey) {
          if (selectedItems[i]) {
            delete selectedItems[i];
            selectedItems = selectedItems;
          } else {
            selectedItems[i] = targetFile.target;
          }
        } else {
          if (!selectedItems[i]) {
            selectedItems = { [i]: targetFile.target };
          }
        }
      } else if (Object.keys(selectedItems).length) {
        if (e.shiftKey) {
          if (selectedItems[i]) {
            delete selectedItems[i];
            selectedItems = selectedItems;
          } else {
            selectedItems[i] = targetFile.target;
          }
        } else if (e.ctrlKey) {
          if (selectedItems[i]) {
            delete selectedItems[i];
            selectedItems = selectedItems;
          } else {
            selectedItems[i] = targetFile.target;
          }
        } else {
          if (!selectedItems[i]) {
            selectedItems = { [i]: targetFile.target };
          }
        }
      } else {
        selectedItems[i] = targetFile.target;
      }
    }}
    on:click={(e) => {
      if (e.screenX !== 0 && e.screenY !== 0) {
        if (e.screenX !== 0 && e.screenY !== 0) {
          if (Object.keys(selectedItems).length) {
            if (!e.shiftKey && !e.ctrlKey) {
              selectedItems = { [i]: targetFile.target };
            }
          }
        }
      }
    }}
  >
    <span class="text-6xl rounded-md py-1 px-[.125rem]" bind:this={spans[0]}>
      {@html targetFile.target.contents.icon}
    </span>
    <span
      class="text-base/3 text-white select-none block p-1 rounded-md absolute top-full w-fit max-w-[4.5rem] left-1/2 -translate-x-1/2"
      bind:this={spans[1]}>{targetFile.name}</span
    >
  </button>
{:else}
  <button> File </button>
{/if}
