<script lang="ts">
  import { fileOrFolderNamingStore } from "$lib/fileOrFolderNaming.store";

  $: value = $fileOrFolderNamingStore.isOpen
    ? $fileOrFolderNamingStore.isNew
      ? ""
      : String($fileOrFolderNamingStore.target.name)
    : "";
  let updatingValue = "";
  let isValid = false;
  // export let targetToRename: Path | undefined;
  let targetInput: HTMLInputElement;
  let targetForm: HTMLFormElement;

  $: if ($fileOrFolderNamingStore.isOpen && targetInput) {
    targetInput.focus();
  }
  $: if (typeof updatingValue === "string" && $fileOrFolderNamingStore.isOpen) {
    let passed = true;
    if (updatingValue.trim() === "") {
      passed = false;
    }
    if ($fileOrFolderNamingStore.settings) {
      if (
        $fileOrFolderNamingStore.settings.exclude &&
        $fileOrFolderNamingStore.settings.exclude.includes(
          updatingValue
        )
      ) {
        passed = false;
      } else if ($fileOrFolderNamingStore.settings.invalidChars) {
        for (
          let i = 0;
          i < $fileOrFolderNamingStore.settings.invalidChars.length;
          i++
        ) {
          if (
            updatingValue.includes(
              $fileOrFolderNamingStore.settings.invalidChars[i]
            )
          ) {
            passed = false;
          }
        }
      }
    }
    if (passed) {
      isValid = true;
    } else {
      isValid = false;
    }
  }
</script>

<svelte:document
  on:mousedown={(e) => {
    if (e.target != targetForm && $fileOrFolderNamingStore.isOpen) {
      fileOrFolderNamingStore.close();
    }
  }}
/>
{#if $fileOrFolderNamingStore.isOpen}
  <!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
  <form
    bind:this={targetForm}
    class="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 bg-neutral border border-ico
rounded-lg flex flex-col px-3 py-3 gap-2 z-[10000]
"
    on:mousedown|stopPropagation
    on:submit|preventDefault
  >
    <span class="text-base-txt text-start">Folder name</span>
    <div class="grid grid-cols-4 gap-2">
      <input
        type="text"
        class="rounded text-base px-3 py-1 max-w-full bg-base-200 text-base-txt col-span-3 invalid:text-red-600
        [&:invalid~button]:pointer-events-none [&:invalid~button]:opacity-25 outline-primary focus:outline focus:outline-2
        "
        bind:this={targetInput}
        {value}
        minlength="1"
        aria-invalid={!isValid}
        required
        on:input={(e) => {
          updatingValue = e.currentTarget.value.trim();
        }}
      />
      {#if $fileOrFolderNamingStore.isNew}
        <button
          class="bg-primary w-full rounded-md disabled:opacity-25 text-primary-txt disabled:pointer-events-none"
          on:click|preventDefault={() => {
            if (isValid) {
              fileOrFolderNamingStore.apply(targetInput.value.trim());
            }
          }}
          disabled={!isValid}
        >
          <!-- disabled={!value || value.includes("/")} -->
          Ok
        </button>
      {:else}
        <button
          class="bg-primary w-full rounded-md disabled:opacity-25 text-primary-txt disabled:pointer-events-none"
          on:click|preventDefault={() => {
            if (isValid) {
              fileOrFolderNamingStore.apply(targetInput.value);
            }
          }}
          disabled={!isValid}
        >
          <!-- disabled={!value || value.includes("/")} -->
          Rename
        </button>
      {/if}
    </div>
  </form>
{/if}
