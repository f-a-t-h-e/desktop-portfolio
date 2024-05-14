<script lang="ts">
  import { contextMenuStore } from "$lib/contextMenu.store";
  import { desktopStore } from "$lib/desktop.store";
  import { fileOrFolderNamingStore } from "$lib/fileOrFolderNaming.store";
  import { globalWindowDetailsStore } from "$lib/globalWindowDetails.store";
  import { windowsStore } from "$lib/windows.store";

  let contextmenu: HTMLDivElement;
  $: estH = $contextMenuStore.isOpen ? $contextMenuStore.estH || ($contextMenuStore.actions.reduce((prev,a)=>(a === "break" ? 9 : 28)+prev,0) + 10) : 100;
  
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
    class="fixed bg-base-300 border rounded-md shadow-md py-[.25rem]
  w-60 border-base-txt/20 z-[1000]
  
  {$contextMenuStore.x + 240 > $globalWindowDetailsStore.w
      ? '-translate-x-full'
      : ''}
  {$contextMenuStore.action === 'desktop' ? 'px-1' : ''}"
    style="{
    $contextMenuStore.y +
      estH >
    $globalWindowDetailsStore.h ?
    $contextMenuStore.y -
      estH <
    0 ? `top:0px;`:
    `top:${$contextMenuStore.y}px;--tw-translate-y:-100%;`:`top:${$contextMenuStore.y}px`
    };left: {$contextMenuStore.x}px;"
  >
    <!-- {#if $contextMenuStore.action === "folder"} -->
    <!-- {#if $contextMenuStore.actions} -->
    {#each $contextMenuStore.actions as action, i}
      {#if action === "break"}
        <span
          class="{$contextMenuStore.action === 'desktop'
            ? 'mx-3'
            : 'w-full'} h-[1px] my-1 bg-base-txt/20 block"
        ></span>
      {:else if action.subActions}
        <div
          class="ps-6 py-1 text-base-txt hover:bg-base-txt/15 w-full text-sm text-start disabled:text-base-txt/50 disabled:pointer-events-none
      {$contextMenuStore.action === 'desktop'
            ? 'rounded-md'
            : ''} relative [&:hover>div]:block"
        >
          {action.name}
          <div
            role="menu"
            class="bg-base-300 border rounded-md shadow-md py-[.25rem] hidden
      w-60 border-base-txt/20 absolute
      before:absolute before:block before:w-8 before:opacity-0 before:h-7 before:z-[-1]
      {$contextMenuStore.y +
              (action.estH || action.subActions.length * 28 + 10) +
              i * 28 >
            $globalWindowDetailsStore.h
              ? 'bottom-0 before:bottom-0'
              : 'top-0 before:top-0'}
      {$contextMenuStore.x > 240
              ? $contextMenuStore.action === 'desktop'
                ? 'right-[calc(100%+0.25rem)] before:right-0 before:translate-x-1/2'
                : 'right-full before:right-0 before:translate-x-1/2'
              : $contextMenuStore.action === 'desktop'
                ? 'left-[calc(100%+0.25rem)] before:left-0 before:-translate-x-1/2'
                : 'left-full before:left-0 before:-translate-x-1/2'}"
            tabindex="0"
          >
            {#each action.subActions as subAction}
              {#if subAction === "break"}
                <span
                  class="{$contextMenuStore.action === 'desktop'
                    ? 'mx-3'
                    : 'w-full'} h-[1px] my-1 bg-base-txt/20 block"
                ></span>
              {:else}
                <button
                  class="block ps-6 py-1 text-base-txt hover:bg-base-txt/15 w-full text-sm text-start disabled:text-base-txt/50 disabled:pointer-events-none
      {$contextMenuStore.action === 'desktop' ? 'rounded-md' : ''}"
                  on:click={() => {
                    if (subAction.fn) {
                      subAction.fn();
                      contextMenuStore.close();
                    }
                  }}
                  disabled={!subAction.fn}>{subAction.name}</button
                >
              {/if}
            {/each}
          </div>
        </div>
      {:else}
        <button
          class="block ps-6 py-1 text-base-txt hover:bg-base-txt/15 w-full text-sm text-start disabled:text-base-txt/50 disabled:pointer-events-none
          {$contextMenuStore.action === 'desktop' ? 'rounded-md' : ''}"
          on:click={() => {
            if (action.fn) {
              action.fn();
              contextMenuStore.close();
            }
          }}
          disabled={!action.fn}>{action.name}</button
        >
      {/if}
    {/each}
    <!-- {:else}
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
      {/if} -->
    <!-- {:else}
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
    {/if} -->
  </div>
{/if}
