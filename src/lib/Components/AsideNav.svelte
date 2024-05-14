<script lang="ts">
  import { iconsMap } from "$lib/constants";
  import { desktopStore } from "$lib/desktop.store";
  import { globalPositionStore } from "$lib/globalPosition.store";
  import { layersStore } from "$lib/layers.store";
  import type FilePath from "$lib/system/FilePath";
  import type FolderPath from "$lib/system/FolderPath";
  import { isFolder } from "$lib/system/Path";
  import { onDestroy, onMount } from "svelte";
  import Resizable from "./Resizable.svelte";
  export let target: FolderPath | undefined | null;
  export let pushToHistory: (fileOrFolder: FilePath | FolderPath) => unknown;
  export let layerIndex: string;
  export let reposition = "1";
  let oldRep = "1";
  let positions = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 162,
    height: 0,
  };
  function onUp() {
    // down = false;
  }
  let theDiv: HTMLDivElement | null = null;
  $: if (oldRep !== reposition) {
    oldRep = reposition;
    setTimeout(() => {
      if (theDiv) {
        positions.left = theDiv.getBoundingClientRect().x;
      }
      // Wait for the transition
    }, 305);
  }
  onMount(() => {
    globalPositionStore.addOnUp(onUp);
    if (theDiv) {
      const { top, left, bottom, right, width, height } =
        theDiv.getBoundingClientRect();
      positions = {
        top,
        left,
        bottom: innerHeight - bottom,
        right: innerWidth - right,
        width,
        height,
      };
    }
  });
  onDestroy(() => {
    globalPositionStore.removeOnUp(onUp);
  });
  $: if (reposition !== oldRep) {
    oldRep = reposition;
    setTimeout(() => {
      if (theDiv) {
      }
      // Wait for the transition
    }, 305);
  }
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  bind:this={theDiv}
  class="w-[10.1rem] border-e border-black flex flex-col relative"
  on:contextmenu={(e) => {
    if (e.target === e.currentTarget) {
      e.preventDefault();
    }
  }}
  style="width: {positions.width}px;--x: calc(var(--global-x) * 1px - {positions.left}px);"
>
  {#each Object.values($desktopStore.contents) as fileOrFolder (fileOrFolder.id)}
    <button
      class="flex w-full py-2 px-4 cursor-default items-center gap-2
  relative hover:after:delay-500
  after:absolute after:py-2 after:text-white after:bg-black/65 after:border after:border-white
  after:content-[attr(data-path-name)] after:z-[1] after:px-3 after:pointer-events-none after:opacity-0
  after:transition-opacity after:-translate-x-1/2
  after:w-fit after:left-[var(--x,0px)] after:top-[calc(100%+4px)]
  hover:after:opacity-100
  {fileOrFolder === target ? 'bg-hvr/50' : 'hover:bg-hvr/20'}
  "
      data-path-name={fileOrFolder.path}
      on:click|preventDefault|stopPropagation={(e) => {
        pushToHistory(fileOrFolder);
      }}
      on:mousedown|stopPropagation|preventDefault={() => {
        layersStore.open({ layerIndex: layerIndex });
      }}
    >
      <span class="text-base-txt-sec w-[1em] h-[1em]">
        {#if isFolder(fileOrFolder)}
          <svg
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
        {:else}
          {@html iconsMap[fileOrFolder.fileType]}
        {/if}
      </span>
      <span
        class="text-nowrap text-white text-ellipsis block max-w-full overflow-clip"
      >
        {fileOrFolder.name}
      </span>
    </button>
  {/each}
  <Resizable bind:positions minW={162} trunOnFor={{ e: true }} />
</div>
