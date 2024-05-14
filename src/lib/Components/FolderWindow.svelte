<script lang="ts">
  import type DesktopPath from "$lib/system/DesktopPath";
  import type FilePath from "$lib/system/FilePath";
  import type FolderPath from "$lib/system/FolderPath";
  import { isFolder } from "$lib/system/Path";
  import { getPathFromStringAndDesktop } from "$lib/utils/getPathUtils";
  import { windowsStore } from "$lib/windows.store";
  import AsideNav from "./AsideNav.svelte";
  import FilesAndFoldersGrid from "./FilesAndFoldersGrid.svelte";
  import Window from "./Window.svelte";

  export let windowData: (typeof $windowsStore)[number] & {
    target: FolderPath | DesktopPath;
  };

  function pushToHistory(fileOrFolder: FolderPath) {
    if (fileOrFolder === windowData.target) {
      return;
    }
    if (
      fileOrFolder.path === windowData.history[windowData.historyPointer - 1]
    ) {
      navigateInHistory(-1);
      return;
    }
    windowData.history.length = 1 + windowData.historyPointer;
    windowData.history.push(fileOrFolder.path);
    ++windowData.historyPointer;
    windowData.target = fileOrFolder;

    windowsStore.refresh();
  }
  function navigateInHistory(n: number) {
    const newPath = getPathFromStringAndDesktop(
      windowData.history[windowData.historyPointer + n],
      windowData.target.desktop
    );
    if (newPath) {
      if (isFolder(newPath)) {
        windowData.historyPointer += n;
        windowData.target = newPath;
      } else {
        windowsStore.open(newPath);
      }
    } else {
      // @todo I don't know what to dow here, maybe set the historyPointer to 0 and re-check or something
    }
    windowsStore.refresh();
  }
  
</script>

<Window bind:windowData>
  <svelte:fragment slot="header">
    <!-- History navigators -->
    <div class="flex items-center me-2">
      <button
        class="w-fit py-1 px-1 text-2xl btn rounded-s border border-brdr border-e-0"
        disabled={windowData.historyPointer === 0}
        on:click={() => {
          navigateInHistory(-1);
        }}
      >
        <svg
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 5L9 12L14 19" stroke-linecap="round" />
        </svg>
      </button>
      <button
        class="w-fit py-1 px-1 text-2xl btn rounded-e border border-brdr"
        disabled={windowData.historyPointer >= windowData.history.length - 1}
        on:click={() => {
          navigateInHistory(1);
        }}
        ><svg
          width="1em"
          height="1em"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
          ><path d="M10 5L14.5 12L10 19" stroke-linecap="round" />
        </svg></button
      >
    </div>
    <input
      class="bg-base-txt/5 text-base-txt border border-brdr font-bold py-1 px-2 rounded-md sm:me-10 w-20 me-4 sm:w-40 md:w-[20rem]"
      type="text"
      value={windowData.target.path}
    />
  </svelte:fragment>
  <svelte:fragment slot="window-content" let:reposition>
    <!-- Nav -->
    <AsideNav
      {reposition}
      target={windowData.target}
      {pushToHistory}
      layerIndex={windowData.layerIndex}
    />
    <!-- Files & Folders -->
    <FilesAndFoldersGrid
      {reposition}
      target={windowData.target}
      {pushToHistory}
      layerIndex={windowData.layerIndex}
    />
  </svelte:fragment>
</Window>
