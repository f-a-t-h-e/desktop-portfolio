<script lang="ts">
  import { windowsStore } from "$lib/windows.store";
  import Window from "./Window.svelte";
</script>

<div
  class="fixed bottom-4 left-1/2 -translate-x-1/2 bg-black border-white z-[99999]
  rounded-2xl {$windowsStore.length
    ? 'py-1 px-4 border'
    : 'p-0 pointer-events-none'}
  transition-all duration-200"
>
  <div
    class="w-fit h-fit relative [&:hover>div]:opacity-100 [&:hover>div]:pointer-events-auto [&:hover>div]:-translate-y-2"
  >
    <button
      class="{$windowsStore.length
        ? 'text-xl h-[2em] w-[1.85em]'
        : 'text-[0px]'}
      transition-all duration-200
  cursor-pointer active:scale-95
  flex items-center justify-center rounded-2xl
  relative hover:bg-[#ffffff4d]"
    >
      <svg
        class="w-fit absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        stroke="currentColor"
        fill="currentColor"
        stroke-width="0"
        version="1"
        viewBox="3 7 43 35"
        enable-background="new 3 7 43 35"
        height="1em"
        xmlns="http://www.w3.org/2000/svg"
        ><path
          fill="#FFA000"
          d="M40,12H22l-4-4H8c-2.2,0-4,1.8-4,4v8h40v-4C44,13.8,42.2,12,40,12z"
        ></path><path
          fill="#FFCA28"
          d="M40,12H8c-2.2,0-4,1.8-4,4v20c0,2.2,1.8,4,4,4h32c2.2,0,4-1.8,4-4V16C44,13.8,42.2,12,40,12z"
        ></path></svg
      >
      <div
        class="flex h-1 items-center gap-[.125rem] mt-auto {$windowsStore.length
          ? 'max-w-[1.85em]'
          : 'max-w-0'} overflow-hidden flex-wrap"
      >
        {#each $windowsStore as _}
          <span class="h-1 w-1 bg-green-500 block rounded-full"></span>
        {/each}
      </div>
    </button>
    <div
      class="absolute bottom-full translate-y-2 opacity-0 pointer-events-none left-1/2 -translate-x-1/2 flex gap-2 transition duration-300
    before:top-full before:h-4 before:w-full before:block before:bg-transparent before:absolute before:left-0
    bg-black border border-white p-2 rounded-lg"
    >
      {#each $windowsStore as folderWindow}
        <div
          class="w-48 h-40 rounded-md hover:bg-[#dcdcdc66] flex items-center justify-center relative"
        >
          <button
            class="h-36 aspect-[48/40] bg-base-100 flex items-center justify-center cursor-pointer"
            on:click={() => {
              windowsStore.maximize(folderWindow.ID);
            }}
          >
            <span
              class="text-base-txt font-bold max-w-full text-center overflow-hidden"
              >{folderWindow.target.name}</span
            >
          </button>
          <button
            class="absolute end-2 top-2 text-3xl ms-1 text-base-txt bg-base-100 hover:bg-[#09090a72] rounded-full flex items-center justify-center h-[1.25em] w-[1.25em]
            border border-white/35"
            on:click={() => {
              windowsStore.close(folderWindow.ID);
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
      {/each}
    </div>
  </div>
</div>
<!-- You need to track the items with `(windowData.ID)` to avoid the item being used by the HTMLElement before it after a deletion/revalidation -->
{#each $windowsStore as windowData (windowData.ID)}
  <Window {windowData} />
{/each}
