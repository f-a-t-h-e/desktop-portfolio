<script lang="ts">
  import Resizable from "$lib/Components/Resizable.svelte";
  import { globalPositionStore } from "$lib/globalPosition.store";
  import { layersStore } from "$lib/layers.store";
  import { windowsStore } from "$lib/windows.store";
  import { onDestroy, onMount } from "svelte";
  import { globalWindowDetailsStore } from "$lib/globalWindowDetails.store";
  // Exports
  export let windowData: (typeof $windowsStore)[number];
  // Normal reactive variables
  /**
   * Used to change the local positions only when the user is pressing down the top bar of this window component
   */
  let isDown = false;
  /**
   * Used to detect the current mode of the fullScreen
   */
  let fullScreenShow = false;
  /**
   * Used to disable fullScreen mode on the next move, to make the fullScreen mode applied when the user is pressing down but not moving the cursor
   */
  let offFullScreen = false;
  /**
   * Used to go fullScreen using the grapping
   */
  let goFull = false;
  /**
   * Used to remove the action of disabling the fullScreen to avoid immediate fullScreen disabling
   */
  let offFullScreenTimeout: number;
  /**
   * Used to set the `width` style relatively in the fullScreen mode
   */
  let fullScreenWidthRatio = 0;
  /**
   * Used to set the `left` style relatively in the fullScreen mode
   */
  let fullScreenXRatio = 0;

  /**
   * Used to detect if the transition is enabled
   */
  let transitionOn = false;
  /**
   * Used to make sure that the transition will not be disabled by other normal places
   * > usefull when disabling fullScreen mode by grapping the top bar of the window
   */
  let forceTransition = false;
  /**
   * The top level element in this component to
   * > usefull to access it for its dimentions for the initial setup in the onMount function
   */
  let windowContainer: HTMLDivElement;
  /**
   * Used in the initial setup, when the component is getting mounted its value `isMenemized` on the [`windowData`]() gets changed, and this value has to be accessable from outside the component in the store, so we have to listen to this action and need to do that change only when it's done after the component' mount
   */
  let lockTransition = true;
  /**
   * Used to set relative dimentions between the component position and the cursor position
   */
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

  // Dependent reactive variables
  /**
   * To position properties using something like the resize feature the components need to know their postions to get the cursor positions relative to them.
   */
  $: reposition = `${isDown}${fullScreenShow}`;
  /**
   * Minimum width of this `window` component
   */
  $: minW =
    $globalWindowDetailsStore.w < 640
      ? 345
      : $globalWindowDetailsStore.w < 768
        ? 470
        : 675;
  /**
   * Minimum height of this `window` component
   */
  let minH = 330;

  // Dependent blocks
  $: if (isDown) {
    // The overlay that appears behind this `window` component when going fullScreen using the graping feature
    if (!fullScreenShow) {
      if ($globalPositionStore.x < 20) {
        fullScreenWidthRatio = 0.5;
      } else if ($globalPositionStore.x > innerWidth - 20) {
        fullScreenXRatio = 0.5;
        fullScreenWidthRatio = 0.5;
      } else {
        fullScreenWidthRatio = 1;
        fullScreenXRatio = 0;
      }
    }
    positions.left = $globalPositionStore.x + coordinates.xTrns;
    positions.top = $globalPositionStore.y + coordinates.yTrns;
    if (positions.left < 0) {
      if (positions.left > -50) {
        positions.left = 0;
      }
    } else if (positions.left + positions.width > innerWidth) {
      if (positions.left + positions.width < innerWidth + 50) {
        positions.left = innerWidth - positions.width;
      }
    }
    if (positions.top < 0) {
      goFull = true;
      positions.top = 0;
    } else {
      goFull = false;
      if (
        positions.top + positions.height > innerHeight &&
        positions.top + positions.height < innerHeight + 50
      ) {
        positions.top = innerHeight - positions.height;
      }
    }
    if (offFullScreen) {
      fullScreenShow = false;
      offFullScreen = false;
      clearTimeout(offFullScreenTimeout);
      transitionOn = true;
      forceTransition = true;
      setTimeout(() => {
        transitionOn = false;
        forceTransition = false;
      }, 200);
    }
    if (transitionOn && !forceTransition) {
      transitionOn = false;
    }
  } else if (goFull) {
    transitionOn = true;
    goFull = false;
    fullScreenShow = true;
    setTimeout(() => {
      transitionOn = false;
    }, 300);
  }
  $: if (!lockTransition || windowData.isMinimized) {
    transitionOn = true;
    setTimeout(() => {
      transitionOn = false;
    }, 300);
  }

  // Functions
  function handleUp() {
    isDown = false;
    offFullScreen = false;
    clearTimeout(offFullScreenTimeout);
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
    if (!coordinates.moved) {
      coordinates.moved = true;
    }
    if (fullScreenShow) {
      clearTimeout(offFullScreenTimeout);
      offFullScreenTimeout = setTimeout(() => {
        offFullScreen = true;
      }, 300);
      const { top, left, width } = windowContainer.getBoundingClientRect();
      coordinates.xTrns = ((left - e.clientX) / width) * positions.width;
      coordinates.yTrns = top - e.clientY;
    } else {
      const { top, left } = windowContainer.getBoundingClientRect();
      coordinates.xTrns = left - e.clientX;
      coordinates.yTrns = top - e.clientY;
      positions.left = left;
      positions.top = top;
    }
  }
  function handleTouchStart(
    e: TouchEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    }
  ) {
    if (e.currentTarget !== e.target) {
      return;
    }
    isDown = true;
    if (!coordinates.moved) {
      coordinates.moved = true;
    }
    if (fullScreenShow) {
      clearTimeout(offFullScreenTimeout);
      offFullScreenTimeout = setTimeout(() => {
        offFullScreen = true;
      }, 300);
      const { top, left, width } = windowContainer.getBoundingClientRect();
      coordinates.xTrns =
        ((left - e.targetTouches[0].clientX) / width) * positions.width;
      coordinates.yTrns = top - e.targetTouches[0].clientY;
    } else {
      const { top, left } = windowContainer.getBoundingClientRect();
      coordinates.xTrns = left - e.targetTouches[0].clientX;
      coordinates.yTrns = top - e.targetTouches[0].clientY;
      globalPositionStore.docUtilFunctions.set({
        x: e.targetTouches[0].clientX,
        y: e.targetTouches[0].clientY,
      });
    }
  }

  // Setups
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

    if (innerWidth < 640) {
      minW = 345;
    }
  });
  onDestroy(() => {
    globalPositionStore.removeOnUp(handleUp);
  });
</script>

<div
  class="{goFull
    ? 'bg-green-600/30 border w-screen h-screen'
    : ''} pointer-events-none border-green-800 fixed transition-all duration-300 ease-linear"
  style={goFull
    ? `top:0px;left:${100 * fullScreenXRatio}%;height:100vh;width:${100 * fullScreenWidthRatio}vw;z-index: ${$layersStore.indexOf(windowData.layerIndex) + 10};`
    : `top: ${positions.top + positions.height * 0.5}px;left: ${positions.left + positions.width * 0.5}px;height:0px;width:0px;`}
></div>
<!-- -------------------------------------------------------------------------- -->

<!-- You do need `active:transition-none` or you will find the toggle of the transition making the window swings on mouse down -->
<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  class="fixed w-11/12 md:w-3/4 h-2/4 top-1/2 left-1/2 md -translate-x-1/2 -translate-y-1/2 scale-100
  flex flex-col {transitionOn ? 'transition-all duration-300 ease-linear' : ''}
  {forceTransition
    ? 'duration-100'
    : 'active:transition-none'} rounded-lg shadow shadow-black focus:opacity-30
  min-w-fit
  "
  style={`z-index: ${$layersStore.indexOf(windowData.layerIndex) + 10};
  ${coordinates.moved ? `top: ${positions.top}px;left: ${positions.left}px;--tw-translate-x: 0px;--tw-translate-y: 0px;width:${positions.width}px;height:${positions.height}px;min-width: unset;` : ``}
  ${fullScreenShow ? `top:0px;left:${100 * fullScreenXRatio}%;width:${100 * fullScreenWidthRatio}vw;height:100vh;--tw-translate-x:0px;--tw-translate-y:0px;` : ""}
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
    class="w-full bg-neutral flex items-center py-[.45rem] px-3 {fullScreenShow
      ? ''
      : 'shadow-[inset_-0.5px_0.5px_1px_white] border rounded-t-lg'} border-black
      active:cursor-grabbing select-none
    "
    on:mousedown|preventDefault={handleMouseDown}
    on:contextmenu={(e) => {
      if (e.target === e.currentTarget) {
        e.preventDefault();
      }
    }}
    on:touchstart={handleTouchStart}
  >
    <slot name="header" />
    <!-- Actions bottons -->
    <div class="ms-auto flex items-center text-base-txt gap-1 sm:gap-3">
      <!-- Minimize -->
      <button
        class="text-2xl ms-1 sm:ms-2 rounded-full flex items-center justify-center min-h-[1em] min-w-[1em] h-[1em] w-[1em] btn"
        on:click={() => {
          windowData.isMinimized = true;
        }}
      >
        <svg
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
          ><circle cx="12" cy="12" r="12" class="fill-base-200" stroke="none" />
          <path d="M8 14.5H16" stroke="currentColor" /></svg
        >
      </button>
      <!-- ZoomToggle -->
      <button
        class="text-2xl ms-1 sm:ms-2 rounded-full flex items-center justify-center min-h-[1em] min-w-[1em] h-[1em] w-[1em] btn"
        on:click={() => {
          transitionOn = true;
          fullScreenShow = !fullScreenShow;
          fullScreenWidthRatio = 1;
          fullScreenXRatio = 0;
          setTimeout(() => {
            transitionOn = false;
          }, 300);
        }}
      >
        <svg
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" class="stroke-none" />
          <path d="M10 8.5H15.5V14" class="stroke-base-200-dis-txt" />
          <rect
            class="transition-all duration-300"
            x="8.5"
            y={fullScreenShow ? 10.5 : 8.5}
            width={fullScreenShow ? 5 : 7}
            height={fullScreenShow ? 5 : 7}
            stroke="currentColor"
            fill="none"
          />
        </svg>
      </button>
      <!-- Close -->
      <button
        class="text-2xl ms-1 sm:ms-2 rounded-full flex items-center justify-center min-h-[1em] min-w-[1em] h-[1em] w-[1em] btn"
        on:click={() => {
          windowsStore.close(windowData.ID);
        }}
      >
        <svg
          viewBox="0 0 24 24"
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle cx="12" cy="12" r="12" class="fill-base-200" />
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill="currentColor"
            d="M8.35355 7.64645C8.15829 7.45118 7.84171 7.45118 7.64645 7.64645C7.45118 7.84171 7.45118 8.15829 7.64645 8.35355L8.35355 7.64645ZM15.6464 16.3536C15.8417 16.5488 16.1583 16.5488 16.3536 16.3536C16.5488 16.1583 16.5488 15.8417 16.3536 15.6464L15.6464 16.3536ZM7.64645 15.6464C7.45118 15.8417 7.45118 16.1583 7.64645 16.3536C7.84171 16.5488 8.15829 16.5488 8.35355 16.3536L7.64645 15.6464ZM16.3536 8.35355C16.5488 8.15829 16.5488 7.84171 16.3536 7.64645C16.1583 7.45118 15.8417 7.45118 15.6464 7.64645L16.3536 8.35355ZM7.64645 8.35355L11.6464 12.3536L12.3536 11.6464L8.35355 7.64645L7.64645 8.35355ZM11.6464 12.3536L15.6464 16.3536L16.3536 15.6464L12.3536 11.6464L11.6464 12.3536ZM11.6464 11.6464L7.64645 15.6464L8.35355 16.3536L12.3536 12.3536L11.6464 11.6464ZM8.35355 16.3536L16.3536 8.35355L15.6464 7.64645L7.64645 15.6464L8.35355 16.3536Z"
          />
        </svg>
      </button>
    </div>
  </div>

  <!-- Content -->
  <div
    class="grow bg-base-100
{fullScreenShow
      ? ''
      : 'shadow-[inset_-0.5px_-0.5px_1px_white] rounded-b-lg border'}
      border-black border-t-base-100 border-t w-full flex"
  >
    <slot name="window-content" {reposition} />
  </div>
  {#if !fullScreenShow}
    <Resizable bind:positions {minH} {minW} />
  {/if}
</div>
