<script lang="ts">
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { desktopStore } from "$lib/desktop.store";
  import { fileOrFolderNamingStore } from "$lib/fileOrFolderNaming.store";
  import type DesktopPath from "$lib/system/DesktopPath";
  import type FilePath from "$lib/system/FilePath";
  import type FolderPath from "$lib/system/FolderPath";
  import type Path from "$lib/system/Path";
  import { windowsStore } from "$lib/windows.store";

  export let selectableItems: {
    item: FilePath | FolderPath;
    i: number;
    spans?: HTMLSpanElement[] | undefined;
  }[] = [];
  export let i: number;
  export let isDragging: number | number[] | null = null;
  export let targetFolder: {
    path: string;
    name: string;
    target: FolderPath;
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

<button
  class="[&:hover_svg>:nth-child(2)]:hidden [&:not(:hover)_svg>:nth-child(3)]:hidden text-6xl cursor-pointer active:scale-95
  flex flex-col items-center
  relative
  {selectedItems[i] ? '[&>*]:bg-primary/60' : ''}"
  on:dblclick={(e) => {
    windowsStore.openPath({
      path: targetFolder.path,
      desktop: $desktopStore,
    });
  }}
  draggable={true}
  on:dragstart={(event) => dragStart(event, false, i)}
  on:dragend={(e) => {
    isDragging = null;
  }}
  on:contextmenu|preventDefault|stopPropagation={(e) => {
    contextMenuStore.open({
      x: e.clientX,
      y: e.clientY,
      action: "folder",
      isOpen: true,
      estH: 567,
      actions: [
        {
          name: "Open",
          fn: () => {
            windowsStore.openPath({
              path: targetFolder.path,
              desktop: $desktopStore,
            });
          },
        },
        "break",
        {
          name: "Cut",
        },
        {
          name: "Copy",
        },
        {
          name: "Rename...",
          fn: () => {
            fileOrFolderNamingStore.open({
              isNew: false,
              // isFile: !isFolder(fileOrFolder),
              isOpen: true,
              target: targetFolder.target,
              settings: {
                exclude: Object.keys(
                  targetFolder.target.parent.contents
                ).filter((name) => name !== targetFolder.name),
              },
            });
          },
        },
        "break",
        {
          name: "Move To Trash",
          fn: () => {
            delete targetFolder.target.parent.contents[targetFolder.name];
            $desktopStore.apply();
            windowsStore.revalidate();
          },
        },
        "break",
        {
          name: `Compress ${Object.keys(selectedItems).length || 1} file${Object.keys(selectedItems).length > 1 ? "s" : ""}`,
        },
        {
          name: `New Folder with ${Object.keys(selectedItems).length || 1} item${Object.keys(selectedItems).length > 1 ? "s" : ""}`,
        },
        "break",
        {
          name: "Properties",
        },
        "break",
        {
          name: "Show in Files",
        },
        {
          name: "Open in Terminal",
        },
      ],
    });
  }}
  on:mousedown={(e) => {
    if (Object.keys(selectedItems).length) {
      if (e.shiftKey || e.ctrlKey) {
        if (selectedItems[i]) {
          delete selectedItems[i];
          selectedItems = selectedItems;
        } else {
          selectedItems[i] = targetFolder.target;
        }
      } else {
        if (!selectedItems[i]) {
          selectedItems = { [i]: targetFolder.target };
        }
      }
    } else {
      selectedItems[i] = targetFolder.target;
    }
  }}
  on:click={(e) => {
    if (e.screenX !== 0 && e.screenY !== 0) {
      if (Object.keys(selectedItems).length) {
        if (!e.shiftKey && !e.ctrlKey) {
          selectedItems = { [i]: targetFolder.target };
        }
      }
    }
  }}
>
  <span class="rounded-md" bind:this={spans[0]}>
    <svg
      class=""
      width="1em"
      height="1em"
      viewBox="0 0 50 50"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        class="fill-primary-dark stroke-primary-txt"
        d="M22.9 9.075L22.9375 9.125H23H41C42.4931 9.125 43.4487 9.37546 44.0366 9.96339C44.6245 10.5513 44.875 11.5069 44.875 13V41C44.875 42.4931 44.6245 43.4487 44.0366 44.0366C43.4487 44.6245 42.4931 44.875 41 44.875H9C7.50692 44.875 6.55132 44.6245 5.96339 44.0366C5.37546 43.4487 5.125 42.4931 5.125 41V9C5.125 7.50692 5.37546 6.55132 5.96339 5.96339C6.55132 5.37546 7.50692 5.125 9 5.125H19.9375L22.9 9.075Z"
        stroke-width="0.25"
      />
      <path
        class="fill-ico stroke-base-txt"
        d="M20 17.625H20.0742L20.1097 17.5599L23.0742 12.125H41C42.4907 12.125 43.4423 12.3996 44.0302 13.0833C44.6234 13.7731 44.875 14.9102 44.875 16.7143V42C44.875 42.9453 44.402 43.6591 43.6805 44.1415C42.9555 44.6264 41.9812 44.875 41 44.875H9C8.01883 44.875 7.0445 44.6264 6.31948 44.1415C5.59799 43.6591 5.125 42.9453 5.125 42V21.1143C5.125 19.2071 6.85681 17.625 9 17.625H20Z"
        stroke-width="0.25"
      />
      <path
        class="fill-ico stroke-base-txt"
        d="M24.9998 19.125H25.0623L25.0998 19.075L28.0623 15.125H45.9998C47.4929 15.125 48.4485 15.3755 49.0364 15.9634C49.6228 16.5498 49.8735 17.5021 49.8748 18.9888L45.8784 40.9689C45.3803 42.4613 44.8896 43.4291 44.1698 44.029C43.4528 44.6264 42.4881 44.875 40.9998 44.875H8.99979C7.52976 44.875 6.70868 44.3882 6.2992 43.5691C5.88075 42.7321 5.87391 41.5169 6.1233 40.0205C6.37361 38.5187 6.87394 35.0167 7.37382 31.5177L7.37451 31.5129C7.87445 28.0135 8.37382 24.518 8.6233 23.0205C8.86877 21.5471 9.47873 20.581 10.3817 19.979C11.2896 19.3737 12.5109 19.125 13.9998 19.125H24.9998Z"
        stroke-width="0.25"
      />
    </svg>
  </span>
  <span
    class="text-base/3 text-white select-none block p-1 rounded-md absolute top-full w-fit max-w-[4.5rem] left-1/2 -translate-x-1/2"
    bind:this={spans[1]}>{targetFolder.name}</span
  >
</button>
