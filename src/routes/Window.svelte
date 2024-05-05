<script lang="ts">
  import { layersStore } from "$lib/layers.store";
  import { pagesStore } from "$lib/pages.store";
  import { windowsStore } from "$lib/windows.store";
  export let windowData: IWindow;
  export let windowIndex: number;
  const coordinates = {
    x: 0,
    y: 0,
    moved: false,
    xTrns: 0,
    yTrns: 0,
  };

  function handleMove(e: MouseEvent) {
    coordinates.x = e.clientX;
    coordinates.y = e.clientY;
    if (fullScreenShow) {
      fullScreenShow = false;
    }
    if (transitionOn) {
      transitionOn = false;
    }
  }
  function handleMouseDown(
    e: MouseEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    if (e.currentTarget !== e.target) {
      return;
    }
    coordinates.moved = true;
    const { top, left } = e.currentTarget.getBoundingClientRect();
    //   (e.currentTarget.parentElement as HTMLDivElement).style.transform = ``
    coordinates.xTrns = left - e.clientX;
    coordinates.yTrns = top - e.clientY;
    coordinates.x = e.clientX;
    coordinates.y = e.clientY;
    document.removeEventListener("mousemove", handleMove);
    document.addEventListener("mousemove", handleMove);
    document.addEventListener(
      "mouseup",
      () => {
        document.removeEventListener("mousemove", handleMove);
      },
      { once: true }
    );
  }
  let fullScreenShow = false;
  let transitionOn = false;
  let windowContainer: HTMLDivElement;
  $: if (typeof windowData.isMinimized) {
    transitionOn = true;
    setTimeout(() => {
      transitionOn = false;
    }, 300);
  }
  const iconsMap = {
    svelte: `<svg stroke="#ff3e00" fill="#ff3e00" stroke-width="0" role="img" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.499 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063.02-.207a1.255 1.255 0 0 0-.226-.831 1.337 1.337 0 0 0-1.435-.532 1.231 1.231 0 0 0-.343.15L8.62 9.368a1.162 1.162 0 0 0-.524.778 1.24 1.24 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.235 1.235 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.108 4.108 0 0 1 .702 3.108 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.499m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.412 6.412 0 0 0-2.896 4.295 6.753 6.753 0 0 0 .666 4.336 6.43 6.43 0 0 0-.96 2.396 6.833 6.833 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295 6.756 6.756 0 0 0-.665-4.336 6.429 6.429 0 0 0 .958-2.396 6.831 6.831 0 0 0-1.167-5.168Z"></path></svg>`,
    next: `<svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM15.9999 8H14.6499V12H15.9999V8ZM9.34609 9.70937L15.405 17.5379L16.4591 16.7293L9.68281 8H8V15.9969H9.34609V9.70937Z"></path></svg>`,
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="fixed w-3/4 h-2/4 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 scale-100
  flex flex-col {transitionOn ? 'transition-all duration-300 ease-linear' : ''}
  "
  style={`z-index: ${$layersStore.indexOf(windowData.layerIndex) + 10};
  ${coordinates.moved ? `--tw-translate-x:${coordinates.xTrns}px;--tw-translate-y:${coordinates.yTrns}px;top: ${coordinates.y}px;left: ${coordinates.x}px;` : ``}
  ${fullScreenShow ? `width:100vw;height:100vh;top:0px;left:0px;--tw-translate-x:0px;--tw-translate-y:0px;` : ""}
  ${windowData.isMinimized ? `--tw-scale-x:0;--tw-scale-y:0;top: 100%;left: 50%;--tw-translate-x: -50%;` : ``}`}
  bind:this={windowContainer}
  on:mousedown={() => {
    windowsStore.open(windowData);
  }}
>
  <!-- svelte-ignore a11y-no-static-element-interactions -->
  <div
    class="w-full bg-[#2B2A33] flex items-center p-2 {fullScreenShow
      ? ''
      : 'shadow-[inset_-0.5px_0.5px_1px_white] border rounded-t-lg'} border-black
    "
    on:mousedown={handleMouseDown}
  >
    <input
      class="bg-[#4d4c58] text-white font-bold py-1 px-2 rounded-md"
      type="text"
      value={windowData.path}
    />

    <!-- Minimize -->
    <button
      class="text-lg ms-auto text-white bg-[#4d4c58] rounded-full flex items-center justify-center h-[1.25em] w-[1.25em]"
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
      class="text-lg ms-1 text-white bg-[#4d4c58] rounded-full flex items-center justify-center h-[1.25em] w-[1.25em]"
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
      class="text-lg ms-1 text-white bg-[#4d4c58] rounded-full flex items-center justify-center h-[1.25em] w-[1.25em]"
      on:click={() => {
        windowsStore.close(windowIndex);
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
    class="grow bg-[#4d4c58] {fullScreenShow
      ? ''
      : 'shadow-[inset_-0.5px_-0.5px_1px_white] rounded-b-lg border'} border-black border-t-[#4d4c58] border-t
  w-full flex
  "
  >
    <!-- Nav -->
    <div class="w-56 border-e border-black flex flex-col">
      {#each $pagesStore as page}
        <div
          class="flex hover:bg-white/10 w-full py-2 px-4 cursor-pointer items-center gap-2
        relative
        after:absolute after:py-2 after:text-white after:bg-black/65 after:border after:border-white
        after:content-[attr(data-path-name)] after:z-[1] after:px-3 after:pointer-events-none after:opacity-0
        after:transition-opacity
        after:w-full after:start-0 after:top-full
        hover:after:opacity-100
        "
          data-path-name={page.path}
        >
          <span
            ><svg
              class="w-fit"
              stroke="currentColor"
              fill="currentColor"
              stroke-width="0"
              version="1"
              viewBox="3 7 41.5 35"
              enable-background="new 3 7 41.5 35"
              height="1em"
              xmlns="http://www.w3.org/2000/svg"
              ><path
                fill="#FFA000"
                d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
              ></path><path
                fill="#FFCA28"
                d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
              ></path></svg
            ></span
          >
          <span class=" text-white">
            {page.name}
          </span>
        </div>
      {/each}
    </div>
    <div class="grow flex flex-col overflow-auto m-2">
      {#each windowData.filesAndFolders as fileOrFolder}
        <div class="flex items-center h-fit gap-1 cursor-pointer hover:underline decoration-white min-w-fit">
          {#if fileOrFolder.isFile}
            {@html iconsMap[fileOrFolder.type]}
          {:else}
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
          {/if}
          <span class="text-nowrap text-white">
            {fileOrFolder.name}
          </span>
        </div>
      {/each}
    </div>
  </div>
</div>
