<script lang="ts">
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { desktopStore } from "$lib/desktop.store";
  import { fileOrFolderNamingStore } from "$lib/fileOrFolderNaming.store";
  import { windowsStore } from "$lib/windows.store";

  let contextmenu: HTMLDivElement;
</script>

<svelte:document
  on:mousedown={(e) => {
    if (e.target != contextmenu && $contextMenuStore.isOpen) {
      contextMenuStore.close();
    }
  }}
/>
{#if $contextMenuStore.isOpen}
  <div
    role="menu"
    tabindex="0"
    bind:this={contextmenu}
    on:mousedown|stopPropagation
    class="fixed bg-base-200 border rounded shadow-md py-[.35rem] px-1
  w-60 border-base-txt/75 z-[100000]"
    style="top: {$contextMenuStore.y}px;left: {$contextMenuStore.x}px;"
  >
    {#if $contextMenuStore.action === "folder"}
      <button
        class="block px-4 py-2 text-base-txt hover:bg-base-txt/20 rounded-md w-full text-start"
        on:click={() => {
          const target = $contextMenuStore.target;
          delete target.parent.contents[target.name];
          $desktopStore.apply();
          windowsStore.revalidate();
          contextMenuStore.close();
        }}>Delete</button
      >
    {:else}
      <button
        class="block px-4 py-2 text-base-txt hover:bg-base-txt/20 rounded-md w-full text-start"
        on:click={() => {
          fileOrFolderNamingStore.open({
            isNew: true,
            target: $contextMenuStore.target,
            isOpen: true,
            isFile: false,
          });
          contextMenuStore.close();
        }}>New Folder</button
      >
    {/if}
  </div>
{/if}
