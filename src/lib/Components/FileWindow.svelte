<script lang="ts">
  import type FilePath from "$lib/system/FilePath";
  import type { windowsStore } from "$lib/windows.store";

  import Window from "./Window.svelte";
  export let windowData: (typeof $windowsStore)[number] & {
    target: FilePath;
  };
</script>

<Window bind:windowData>
  <svelte:fragment slot="header">
    <h2 class="text-base-txt font-bold">{windowData.target.name}</h2>
  </svelte:fragment>
  <svelte:fragment slot="window-content" let:reposition>
    {#if windowData.target.contents.iFrame}
      <iframe
        title={windowData.target.name}
        class="w-full h-full rounded-b-md"
        src={windowData.target.contents.url}
      >
      </iframe>
    {/if}
  </svelte:fragment>
</Window>
