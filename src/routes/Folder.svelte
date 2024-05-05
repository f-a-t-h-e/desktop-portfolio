<script lang="ts">
  import { windowsStore } from "$lib/windows.store";

  export let folder: IFolder;
  let isSelected = false;
</script>

<button
  class="[&:hover>:first-child]:hidden [&:not(:hover)>:nth-child(2)]:hidden text-6xl cursor-pointer active:scale-95
  flex flex-col gap-1 items-center
  relative drop-shadow-[0_6px_3px_rgb(0_0_0_/_0.65)]
  {isSelected
    ? '[&>*]:bg-green-600/60 [&>*]:border [&>*]:border-green-800'
    : '[&:focus>*]:bg-green-600/60 [&:focus>*]:border [&:focus>*]:border-green-800'}"
  on:mousedown={(e) => {
    e.stopPropagation();
    // isSelected = true;
  }}
  on:click={(e)=>{
    e.stopPropagation();
    windowsStore.open({
        title: folder.name,
        path: folder.path,
        filesAndFolders: folder.contents,
        viewType: "folder"
    });
  }}
>
  <svg
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
  >
  <svg
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
      d="M38,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h31c1.7,0,3-1.3,3-3V16C42,13.8,40.2,12,38,12z"
    ></path><path
      fill="#FFCA28"
      d="M42.2,18H15.3c-1.9,0-3.6,1.4-3.9,3.3L8,40h31.7c1.9,0,3.6-1.4,3.9-3.3l2.5-14C46.6,20.3,44.7,18,42.2,18z"
    ></path></svg
  >
  <span class="text-base/3 text-white select-none block">{folder.name}</span>
</button>
