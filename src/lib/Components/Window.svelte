<script lang="ts">
  import Resizable from "$lib/Components/Resizable.svelte";
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { desktopStore } from "$lib/desktop.store";
  import { globalPositionStore } from "$lib/globalPosition.store";
  import { layersStore } from "$lib/layers.store";
  import { isFolder } from "$lib/system/Path";
  import { windowsStore } from "$lib/windows.store";
  import { onDestroy, onMount } from "svelte";
  export let windowData: (typeof $windowsStore)[number];
  let isDown = false;
  const coordinates = {
    moved: false,
    xTrns: 0,
    yTrns: 0,
  };

  let positions = {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    width: 0,
    height: 0,
  };
  $: if (isDown) {
    // positions.right -=  $globalPositionStore.x + coordinates.xTrns - positions.left;
    positions.left = $globalPositionStore.x + coordinates.xTrns;
    // positions.bottom -=  $globalPositionStore.y + coordinates.yTrns - positions.top;
    positions.top = $globalPositionStore.y + coordinates.yTrns;

    if (offFullScreen) {
      fullScreenShow = false;
      offFullScreen = false;
    }
    if (transitionOn) {
      transitionOn = false;
    }
  }
  function handleUp(e: MouseEvent) {
    isDown = false;
    offFullScreen = false;
  }
  function handleMouseDown(
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    if (e.currentTarget !== e.target) {
      return;
    }
    isDown = true;
    // if (transitionOn) {
    //   transitionOn = false;
    // }
    if (!coordinates.moved) {
      coordinates.moved = true;
    }
    if (fullScreenShow) {
      setTimeout(() => {
        offFullScreen = true;
      }, 300);
      const { top, left, width } = e.currentTarget.getBoundingClientRect();
      coordinates.xTrns = ((left - e.clientX) / width) * positions.width;
      coordinates.yTrns = top - e.clientY;
    } else {
      const { top, left } = e.currentTarget.getBoundingClientRect();
      coordinates.xTrns = left - e.clientX;
      coordinates.yTrns = top - e.clientY;
      positions.left = left;
      positions.top = top;
    }
  }
  // $: if (coordinates.moved) {
  //   // positions.bottom = positions.bottom + (coordinates.y + coordinates.yTrns - positions.top);
  //   height = positions.bottom + (coordinates.y + coordinates.yTrns - positions.top);
  //   positions.top = coordinates.y + coordinates.yTrns;
  //   // positions.right = positions.right + (coordinates.x + coordinates.xTrns - positions.left);
  //   width = positions.right + (coordinates.x + coordinates.xTrns - positions.left);
  //   positions.left = coordinates.x + coordinates.xTrns;
  // }
  let fullScreenShow = false;
  let offFullScreen = false;
  let transitionOn = false;
  let windowContainer: HTMLDivElement;
  let lockTransition = true;
  $: if (!lockTransition || windowData.isMinimized) {
    transitionOn = true;
    setTimeout(() => {
      transitionOn = false;
    }, 300);
  }
  const iconsMap = {
    svelte: `<svg stroke="#ff3e00" fill="#ff3e00" stroke-width="0" role="img" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063.02-.207a1.255 1.255 0 0 0-.226-.831 1.337 1.337 0 0 0-1.435-.532 1.231 1.231 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.235 1.235 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.108 4.108 0 0 1 .702 3.108 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.412 6.412 0 0 0-2.896 4.295 6.753 6.753 0 0 0 .666 4.336 6.43 6.43 0 0 0-.96 2.396 6.833 6.833 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295 6.756 6.756 0 0 0-.665-4.336 6.429 6.429 0 0 0 .958-2.396 6.831 6.831 0 0 0-1.167-5.168Z"></path></svg>`,
    next: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM15.9999 8H14.6499V12H15.9999V8ZM9.34609 9.70937L15.405 17.5379L16.4591 16.7293L9.68281 8H8V15.9969H9.34609V9.70937Z"></path></svg>`,
  };

  onMount(() => {
    setTimeout(() => {
      lockTransition = false;
    }, 100);
    globalPositionStore.addOnUp(handleUp);
    const { top, left, bottom, right, width, height } =
      windowContainer.getBoundingClientRect();
    positions = {
      top,
      left,
      bottom: innerHeight - bottom,
      right: innerWidth - right,
      width,
      height,
    };
    coordinates.xTrns = 0;
    coordinates.yTrns = 0;
    coordinates.moved = true;
  });
  onDestroy(() => {
    globalPositionStore.removeOnUp(handleUp);
  });
  const minW = 368;
  const minH = 230;
</script>

<!-- You do need `active:transition-none` or you will find the toggle of the transition making the window swings on mouse down -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="absolute w-3/4 h-2/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100
  flex flex-col {transitionOn ? 'transition-all duration-300 ease-linear' : ''}
  active:transition-none rounded-lg shadow shadow-black focus:opacity-30
  "
  style={`z-index: ${$layersStore.indexOf(windowData.layerIndex) + 10};
  ${coordinates.moved ? `top: ${positions.top}px;left: ${positions.left}px;--tw-translate-x: 0px;--tw-translate-y: 0px;width:${positions.width}px;height:${positions.height}px;` : ``}
  ${fullScreenShow ? `top:0px;left:0px;width:100vw;height:100vh;--tw-translate-x:0px;--tw-translate-y:0px;` : ""}
  ${windowData.isMinimized ? `--tw-scale-x:0;--tw-scale-y:0;top: 100%;left: 50%;--tw-translate-x: -50%;` : ``}
  `}
  bind:this={windowContainer}
  on:mousedown={(e) => {
    e.currentTarget.focus();
    layersStore.open({ layerIndex: windowData.layerIndex });
  }}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="w-full bg-base-200 flex items-center p-2 {fullScreenShow
      ? ''
      : 'shadow-[inset_-0.5px_0.5px_1px_white] border rounded-t-lg'} border-black
      active:cursor-grabbing select-none
    "
    on:mousedown={handleMouseDown}
    on:contextmenu={(e) => {
      if (e.target === e.currentTarget) {
        e.preventDefault();
      }
    }}
  >
    <input
      class="bg-base-100 text-white font-bold py-1 px-2 rounded-md"
      type="text"
      value={windowData.target.path}
    />

    <!-- Minimize -->
    <button
      class="text-lg ms-auto text-white bg-base-100 rounded-full flex items-center justify-center h-[1.25em] w-[1.25em]"
      on:click={() => {
        windowData.isMinimized = true;
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 448 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M432 256c0 17.7-14.3 32-32 32L48 288c-17.7 0-32-14.3-32-32s14.3-32 32-32l352 0c17.7 0 32 14.3 32 32z"
        ></path></svg
      >
    </button>
    <!-- ZoomToggle -->
    <button
      class="text-lg ms-1 text-white bg-base-100 rounded-full flex items-center justify-center h-[1.25em] w-[1.25em]"
      on:click={() => {
        transitionOn = true;
        fullScreenShow = !fullScreenShow;
        setTimeout(() => {
          transitionOn = false;
        }, 300);
      }}
    >
      <svg
        width=".5em"
        height=".5em"
        viewBox="0 0 1196 1196"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g class:hidden={!fullScreenShow} filter="url(#filter0_d_730_13)">
          <rect
            x="425"
            y="89"
            width="682"
            height="682"
            stroke="#EAEAEA"
            stroke-width="168"
            shape-rendering="crispEdges"
          />
        </g>
        <rect
          class:hidden={!fullScreenShow}
          x="338.5"
          y="2.5"
          width="855"
          height="855"
          stroke="black"
          stroke-width="5"
        />
        <g filter="url(#filter1_d_730_13)">
          <path d="M263 855V263H855" stroke="black" stroke-width="160" />
        </g>
        <path d="M855 341H341V855H855V341Z" stroke="black" stroke-width="4" />
        <g filter="url(#filter2_d_730_13)">
          <rect
            x="257"
            y="257"
            width="682"
            height="682"
            stroke="white"
            stroke-width="168"
            shape-rendering="crispEdges"
          />
        </g>
        <rect
          x="170.5"
          y="170.5"
          width="855"
          height="855"
          stroke="black"
          stroke-width="5"
        />
        <defs>
          <filter
            id="filter0_d_730_13"
            x="341"
            y="3"
            width="864"
            height="858"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="10" dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_730_13"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_730_13"
              result="shape"
            />
          </filter>
          <filter
            id="filter1_d_730_13"
            x="183"
            y="183"
            width="697"
            height="691"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="20" dy="14" />
            <feGaussianBlur stdDeviation="2.5" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0.454902 0 0 0 0 0.454902 0 0 0 0 0.454902 0 0 0 1 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_730_13"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_730_13"
              result="shape"
            />
          </filter>
          <filter
            id="filter2_d_730_13"
            x="173"
            y="171"
            width="864"
            height="858"
            filterUnits="userSpaceOnUse"
            color-interpolation-filters="sRGB"
          >
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feColorMatrix
              in="SourceAlpha"
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
              result="hardAlpha"
            />
            <feOffset dx="10" dy="2" />
            <feGaussianBlur stdDeviation="2" />
            <feComposite in2="hardAlpha" operator="out" />
            <feColorMatrix
              type="matrix"
              values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.75 0"
            />
            <feBlend
              mode="normal"
              in2="BackgroundImageFix"
              result="effect1_dropShadow_730_13"
            />
            <feBlend
              mode="normal"
              in="SourceGraphic"
              in2="effect1_dropShadow_730_13"
              result="shape"
            />
          </filter>
        </defs>
      </svg>
    </button>
    <!-- Close -->
    <button
      class="text-lg ms-1 text-white bg-base-100 rounded-full flex items-center justify-center h-[1.25em] w-[1.25em]"
      on:click={() => {
        windowsStore.close(windowData.ID);
      }}
    >
      <svg
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        viewBox="0 0 512 512"
        height="1em"
        width="1em"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          d="M278.6 256l68.2-68.2c6.2-6.2 6.2-16.4 0-22.6-6.2-6.2-16.4-6.2-22.6 0L256 233.4l-68.2-68.2c-6.2-6.2-16.4-6.2-22.6 0-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3l68.2 68.2-68.2 68.2c-3.1 3.1-4.7 7.2-4.7 11.3 0 4.1 1.6 8.2 4.7 11.3 6.2 6.2 16.4 6.2 22.6 0l68.2-68.2 68.2 68.2c6.2 6.2 16.4 6.2 22.6 0 6.2-6.2 6.2-16.4 0-22.6L278.6 256z"
        ></path></svg
      >
    </button>
  </div>

  <!-- Content -->
  <div
    class="grow bg-base-100 {fullScreenShow
      ? ''
      : 'shadow-[inset_-0.5px_-0.5px_1px_white] rounded-b-lg border'} border-black border-t-base-100 border-t
  w-full flex
  "
  >
    <!-- Nav -->
    <div
      class="w-56 border-e border-black flex flex-col"
      on:contextmenu={(e) => {
        if (e.target === e.currentTarget) {
          e.preventDefault();
        }
      }}
    >
      {#each Object.values($desktopStore.contents) as fileOrFolder}
        <button
          class="flex hover:bg-white/10 w-full py-2 px-4 cursor-pointer items-center gap-2
        relative hover:after:delay-500
        after:absolute after:py-2 after:text-white after:bg-black/65 after:border after:border-white
        after:content-[attr(data-path-name)] after:z-[1] after:px-3 after:pointer-events-none after:opacity-0
        after:transition-opacity
        after:w-full after:start-0 after:top-full
        hover:after:opacity-100
        "
          data-path-name={fileOrFolder.path}
          on:click|preventDefault|stopPropagation={(e) => {
            if (fileOrFolder === windowData.target) {
              windowsStore.refresh();
              return;
            }
            if (isFolder(fileOrFolder)) {
              windowData.history.push(fileOrFolder.path);
              ++windowData.historyPointer;
              windowData.target = fileOrFolder;
              windowsStore.refresh();
            } else {
              console.log("Openning files is not implemented yet!");
              alert("Openning files is not implemented yet!");
            }
          }}
          on:mousedown|stopPropagation|preventDefault={() => {
            layersStore.open({ layerIndex: windowData.layerIndex });
          }}
        >
          {#if isFolder(fileOrFolder)}
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 50 50"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                class="fill-primary stroke-primary-txt"
                d="M22.9 9.075L22.9375 9.125H23H41C42.4931 9.125 43.4487 9.37546 44.0366 9.96339C44.6245 10.5513 44.875 11.5069 44.875 13V41C44.875 42.4931 44.6245 43.4487 44.0366 44.0366C43.4487 44.6245 42.4931 44.875 41 44.875H9C7.50692 44.875 6.55132 44.6245 5.96339 44.0366C5.37546 43.4487 5.125 42.4931 5.125 41V9C5.125 7.50692 5.37546 6.55132 5.96339 5.96339C6.55132 5.37546 7.50692 5.125 9 5.125H19.9375L22.9 9.075Z"
                stroke-width="0.25"
              />
              <path
                class="fill-base-300 stroke-base-txt"
                d="M20 17.625H20.0742L20.1097 17.5599L23.0742 12.125H41C42.4907 12.125 43.4423 12.3996 44.0302 13.0833C44.6234 13.7731 44.875 14.9102 44.875 16.7143V42C44.875 42.9453 44.402 43.6591 43.6805 44.1415C42.9555 44.6264 41.9812 44.875 41 44.875H9C8.01883 44.875 7.0445 44.6264 6.31948 44.1415C5.59799 43.6591 5.125 42.9453 5.125 42V21.1143C5.125 19.2071 6.85681 17.625 9 17.625H20Z"
                stroke-width="0.25"
              />
            </svg>
          {:else}
            {@html iconsMap[fileOrFolder.fileType]}
          {/if}
          <span class="text-nowrap text-white">
            {fileOrFolder.name}
          </span>
        </button>
      {/each}
    </div>
    <!-- Files & Folders -->
    <div
      class="grow flex flex-col overflow-auto m-2"
      on:contextmenu={(e) => {
        if (e.target === e.currentTarget && isFolder(windowData.target)) {
          e.preventDefault();
          contextMenuStore.open({
            target: windowData.target,
            x: e.clientX,
            y: e.clientY,
            isOpen: true,
          });
        }
      }}
    >
      {#if isFolder(windowData.target)}
        {#each Object.values(windowData.target.contents) as fileOrFolder}
          <button
            class="flex items-center h-fit gap-1 cursor-pointer hover:underline decoration-white min-w-fit"
            on:click|stopPropagation={(e) => {
              if (isFolder(fileOrFolder)) {
                windowData.history.push(fileOrFolder.path);
                ++windowData.historyPointer;
                windowData.target = fileOrFolder;
                windowsStore.refresh();
              } else {
                console.log("Openning files is not implemented yet!");
                alert("Openning files is not implemented yet!");
              }
            }}
            on:mousedown|stopPropagation|preventDefault={() => {
              layersStore.open({ layerIndex: windowData.layerIndex });
            }}
            on:contextmenu|preventDefault|stopPropagation={(e) => {
              if (isFolder(fileOrFolder)) {
                contextMenuStore.open({
                  target: fileOrFolder,
                  x: e.clientX,
                  y: e.clientY,
                  action: "folder",
                  isOpen: true,
                });
              }
            }}
          >
            {#if isFolder(fileOrFolder)}
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 50 50"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  class="fill-primary stroke-primary-txt"
                  d="M22.9 9.075L22.9375 9.125H23H41C42.4931 9.125 43.4487 9.37546 44.0366 9.96339C44.6245 10.5513 44.875 11.5069 44.875 13V41C44.875 42.4931 44.6245 43.4487 44.0366 44.0366C43.4487 44.6245 42.4931 44.875 41 44.875H9C7.50692 44.875 6.55132 44.6245 5.96339 44.0366C5.37546 43.4487 5.125 42.4931 5.125 41V9C5.125 7.50692 5.37546 6.55132 5.96339 5.96339C6.55132 5.37546 7.50692 5.125 9 5.125H19.9375L22.9 9.075Z"
                  stroke-width="0.25"
                />
                <path
                  class="fill-base-300 stroke-base-txt"
                  d="M20 17.625H20.0742L20.1097 17.5599L23.0742 12.125H41C42.4907 12.125 43.4423 12.3996 44.0302 13.0833C44.6234 13.7731 44.875 14.9102 44.875 16.7143V42C44.875 42.9453 44.402 43.6591 43.6805 44.1415C42.9555 44.6264 41.9812 44.875 41 44.875H9C8.01883 44.875 7.0445 44.6264 6.31948 44.1415C5.59799 43.6591 5.125 42.9453 5.125 42V21.1143C5.125 19.2071 6.85681 17.625 9 17.625H20Z"
                  stroke-width="0.25"
                />
              </svg>
            {:else}
              {@html iconsMap[fileOrFolder.fileType]}
            {/if}
            <span class="text-nowrap text-white">
              {fileOrFolder.name}
            </span>
          </button>
        {/each}
      {/if}
    </div>
  </div>
  <Resizable bind:positions {minH} {minW} />
</div>
