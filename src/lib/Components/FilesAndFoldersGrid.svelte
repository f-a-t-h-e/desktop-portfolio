<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import Selection from "./Selection.svelte";
  import { globalPositionStore } from "$lib/globalPosition.store";
  import type FolderPath from "$lib/system/FolderPath";
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { isFolder } from "$lib/system/Path";
  import type FilePath from "$lib/system/FilePath";
  import { layersStore } from "$lib/layers.store";
  import { iconsMap } from "$lib/constants";
  import { windowsStore } from "$lib/windows.store";
  import { desktopStore } from "$lib/desktop.store";
  import { fileOrFolderNamingStore } from "$lib/fileOrFolderNaming.store";
  import type DesktopPath from "$lib/system/DesktopPath";
  export let target: FolderPath | DesktopPath | undefined | null;
  export let pushToHistory: (fileOrFolder: FolderPath) => unknown;
  export let layerIndex: string;
  export let reposition = "1";
  let oldRep = "1";
  let down = false;
  let boundX: { start: number; end: number } = { start: 0, end: 0 };
  let boundY: { start: number; end: number } = { start: 0, end: 0 };
  let startX: number = 0;
  let startY: number = 0;
  let offsetX: number = 0;
  let offsetY: number = 0;
  let seletionAnchorPath = "";
  let selectedItems: { [key: string]: FilePath | FolderPath } = {};
  let sortType: "modified-date" | "size" | "name" = "name";
  let sortASC = true;
  //
  $: items = Object.values(target?.contents || {})
    .sort((a, b) => {
      // The names won't be the same
      if (sortASC) {
        return a.name > b.name ? 1 : -1;
      }
      return a.name < b.name ? 1 : -1;
    })
    .map((item) => {
      return item;
    });
  $: seletionAnchorIndex = items.findIndex(
    (item) => item.path === seletionAnchorPath
  );
  //
  function onUp() {
    down = false;
  }
  onMount(() => {
    globalPositionStore.addOnUp(onUp);
  });
  onDestroy(() => {
    globalPositionStore.removeOnUp(onUp);
  });
  $: if (reposition !== oldRep) {
    oldRep = reposition;
    setTimeout(() => {
      if (theDiv) {
        const { x, y, width, height } = theDiv.getBoundingClientRect();
        offsetX = x;
        offsetY = y;
        boundX.end = width;
        boundY.end = height;
      }
      // Wait for the transition
    }, 305);
  }
  let theDiv: HTMLDivElement | null = null;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="grow outline-none"
  on:keydown={(e) => {
    console.log(e.key);
  }}
  on:contextmenu={(e) => {
    if (e.target === e.currentTarget && target) {
      e.preventDefault();
      contextMenuStore.open({
        x: e.clientX,
        y: e.clientY,
        isOpen: true,
        action: "folder",
        actions: [
          {
            name: "New Folder",
            fn() {
              fileOrFolderNamingStore.open({
                isNew: true,
                target: target,
                isOpen: true,
                isFile: false,
                settings: {
                  exclude: Object.keys(target?.contents || {}),
                  invalidChars: ["/", "\\", '"', "'", "`", ","],
                },
              });
            },
          },
          {
            name: "Add to Bookmarks",
          },
          "break",
          {
            name: "Paste",
          },
          {
            name: "Select All",
            fn: items.length
              ? () => {
                  selectedItems = items.reduce((prev, item, i) => {
                    if (item) {
                      prev[i] = item;
                    }
                    return prev;
                  }, selectedItems);
                }
              : undefined,
          },
          "break",
          {
            name: "Open in Terminal",
          },
          "break",
          {
            name: "Properties",
          },
        ],
      });
    }
  }}
  on:drop={(e) => {
    // const data = e.dataTransfer?.getData("string")
    if (!e.dataTransfer) {
      return;
    }
    e.preventDefault();
    for (const item of e.dataTransfer.items) {
      if (item.kind === "string" && item.type.match(/^text\/plain/)) {
        // This item is the target node
        item.getAsString((s) => {
          console.log(s);
        });
      }
    }
  }}
>
  {#if items.length}
    <div
      bind:this={theDiv}
      class="flex flex-col w-full h-full relative z-0 pointer-events-none [&>*]:pointer-events-auto"
      on:mousedown={(e) => {
        if (e.currentTarget === e.target) {
          e.preventDefault();
          down = true;
          startX = e.clientX - offsetX;
          startY = e.clientY - offsetY;
        }
      }}
      on:touchstart={(e) => {
        if (e.currentTarget === e.target && e.targetTouches.length) {
          down = true;
          startX = e.targetTouches[0].clientX - offsetX;
          startY = e.targetTouches[0].clientY - offsetY;
          globalPositionStore.docUtilFunctions.set({
            x: e.targetTouches[0].clientX,
            y: e.targetTouches[0].clientY,
          });
        }
      }}
    >
      {#each items as fileOrFolder, i (fileOrFolder.id)}
        <button
          class="flex items-center px-3 h-fit gap-1 cursor-pointer hover:underline decoration-white min-w-fit focus:bg-primary-light outline-none"
          on:dblclick={(e) => {
            if (isFolder(fileOrFolder)) {
              pushToHistory(fileOrFolder);
            } else {
              windowsStore.open(fileOrFolder);
            }
          }}
          on:contextmenu|preventDefault|stopPropagation={(e) => {
            if (isFolder(fileOrFolder)) {
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
                      pushToHistory(fileOrFolder);
                    },
                  },
                  {
                    name: "Open With Other Application",
                  },
                  "break",
                  {
                    name: "Open In New Tap",
                  },
                  {
                    name: "Open In New Window",
                    fn: () => {
                      windowsStore.openPath({
                        path: fileOrFolder.path,
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
                    name: "Create Link",
                  },

                  "break",
                  {
                    name: "Move To...",
                  },
                  {
                    name: "Copy To...",
                  },
                  "break",
                  {
                    name: "Move To Trash",
                    fn: () => {
                      delete fileOrFolder.parent.contents[fileOrFolder.name];
                      $desktopStore.apply();
                      windowsStore.revalidate();
                    },
                  },
                  "break",
                  {
                    name: "Rename...",
                    fn: () => {
                      fileOrFolderNamingStore.open({
                        isNew: false,
                        // isFile: !isFolder(fileOrFolder),
                        isOpen: true,
                        target: fileOrFolder,
                        settings: {
                          exclude: items
                            .map((item) => item.name)
                            .filter((name) => name !== fileOrFolder.name),
                        },
                      });
                    },
                  },
                  {
                    name: "Compress...",
                  },
                  "break",
                  {
                    name: "Local Network Share",
                  },
                  {
                    name: "Send To...",
                  },
                  "break",
                  {
                    name: "Open in Terminal",
                  },
                  "break",
                  {
                    name: "Star",
                  },
                  "break",
                  {
                    name: "Properties",
                  },
                ],
              });
            }
          }}
          draggable="true"
          on:dragstart={(e) => {
            // e.dataTransfer
            e.dataTransfer?.setData(
              "text/plain",
              JSON.stringify(Object.keys(selectedItems))
            );
          }}
          on:mousedown={(e) => {
            e.currentTarget.focus();
            layersStore.open({ layerIndex: layerIndex });
            if (Object.keys(selectedItems).length) {
              if (e.shiftKey) {
                const start = seletionAnchorIndex > i ? i : seletionAnchorIndex;
                const end =
                  (seletionAnchorIndex < i ? i : seletionAnchorIndex) + 1;
                selectedItems = {};
                for (let j = start; j < end; j++) {
                  const element = items[j];
                  selectedItems[element.path] = element;
                }
              } else if (e.ctrlKey) {
                if (selectedItems[fileOrFolder.path]) {
                  delete selectedItems[fileOrFolder.path];
                  selectedItems = selectedItems;
                } else {
                  selectedItems[fileOrFolder.path] = fileOrFolder;
                }
              }
              if (!selectedItems[fileOrFolder.path]) {
                selectedItems = { [fileOrFolder.path]: fileOrFolder };
              }
            } else {
              selectedItems[fileOrFolder.path] = fileOrFolder;
            }
          }}
          on:click={(e) => {
            if (e.screenX !== 0 && e.screenY !== 0) {
              if (Object.keys(selectedItems).length) {
                if (!e.shiftKey && !e.ctrlKey) {
                  selectedItems = { [fileOrFolder.path]: fileOrFolder };
                }
              }
            }
          }}
        >
          {#if isFolder(fileOrFolder)}
          <span class="text-lg flex items-center justify-center">
            <svg
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
              </svg>
            </span>
          {:else if fileOrFolder.contents.iFrame}
          <span class="text-lg flex items-center justify-center">
            {@html fileOrFolder.contents.icon}
          </span>
          {:else}
            {@html iconsMap[fileOrFolder.fileType]}
          {/if}
          <span class="text-nowrap text-white">
            {fileOrFolder.name}
          </span>
        </button>
      {/each}
      <!-- <Selection
        {down}
        {boundX}
        {boundY}
        {startX}
        {startY}
        {offsetX}
        {offsetY}
      /> -->
    </div>
  {:else}
    <div
      class="pointer-events-none w-full h-full flex flex-col items-center justify-center select-none border-2 border-primary rounded-ee-md"
    >
      <svg
        class="text-base-txt-sec text-[10rem]"
        width="1em"
        height="1em"
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M26.063 12.1713L26.4738 12.5H27H36C39.4686 12.5 41.1526 13.024 42.0643 13.9357C42.976 14.8474 43.5 16.5314 43.5 20V35C43.5 38.4686 42.976 40.1526 42.0643 41.0643C41.1526 41.976 39.4686 42.5 36 42.5H14C10.5314 42.5 8.84736 41.976 7.93566 41.0643C7.02396 40.1526 6.5 38.4686 6.5 35V16C6.5 12.5314 7.02396 10.8474 7.93566 9.93566C8.84736 9.02396 10.5314 8.5 14 8.5H21.4738L26.063 12.1713Z"
          stroke="currentColor"
          stroke-width="3"
        />
        <path
          d="M22 18.5H22.7026L23.1523 17.9603L27.7026 12.5H36C39.4686 12.5 41.1526 13.024 42.0643 13.9357C42.976 14.8474 43.5 16.5314 43.5 20V35C43.5 38.4686 42.976 40.1526 42.0643 41.0643C41.1526 41.976 39.4686 42.5 36 42.5H14C10.5314 42.5 8.84736 41.976 7.93566 41.0643C7.02396 40.1526 6.5 38.4686 6.5 35V26C6.5 22.5314 7.02396 20.8474 7.93566 19.9357C8.84736 19.024 10.5314 18.5 14 18.5H22Z"
          stroke="currentColor"
          stroke-width="3"
        />
      </svg>
      <span class="text-base-txt text-4xl font-light select-none text-center"
        >Folder is Empty</span
      >
    </div>
  {/if}
</div>
