<script lang="ts">
  import { desktopStore } from "$lib/desktop.store";
  import type DesktopPath from "$lib/system/DesktopPath";
  import type FolderPath from "$lib/system/FolderPath";
  import type Path from "$lib/system/Path";
  import { windowsStore } from "$lib/windows.store";

  export let folder: {
    path: string;
    name: string;
    target: FolderPath | DesktopPath;
  };
  let isSelected = false;
</script>

<button
  class="[&:hover>svg>:nth-child(2)]:hidden [&:not(:hover)>svg>:nth-child(3)]:hidden text-6xl cursor-pointer active:scale-95
  flex flex-col items-center
  relative drop-shadow-[0_6px_3px_rgb(0_0_0_/_0.65)]
  {isSelected
    ? '[&>*]:bg-green-600/60 [&>*]:border [&>*]:border-green-800'
    : '[&:focus>*]:bg-primary-light/35 [&:focus>*]:border [&:focus>*]:border-green-800 focus:drop-shadow-none'}"
  on:mousedown|stopPropagation
  on:click|stopPropagation={(e) => {
    windowsStore.openPath({
      path: folder.path,
      desktop: $desktopStore,
    });
  }}
>
  <svg
  class="rounded-lg"
    width="1em"
    height="1em"
    viewBox="0 0 50 50"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      class="fill-primary-dark stroke-primary-txt"
      d="M22.9 9.075L22.9375 9.125H23H41C42.4931 9.125 43.4487 9.37546 44.0366 9.96339C44.6245 10.5513 44.875 11.5069 44.875 13V41C44.875 42.4931 44.6245 43.4487 44.0366 44.0366C43.4487 44.6245 42.4931 44.875 41 44.875H9C7.50692 44.875 6.55132 44.6245 5.96339 44.0366C5.37546 43.4487 5.125 42.4931 5.125 41V9C5.125 7.50692 5.37546 6.55132 5.96339 5.96339C6.55132 5.37546 7.50692 5.125 9 5.125H19.9375L22.9 9.075Z"
      stroke-width="0.25"
    />
    <path
      class="fill-ico stroke-base-txt"
      d="M20 17.625H20.0742L20.1097 17.5599L23.0742 12.125H41C42.4907 12.125 43.4423 12.3996 44.0302 13.0833C44.6234 13.7731 44.875 14.9102 44.875 16.7143V42C44.875 42.9453 44.402 43.6591 43.6805 44.1415C42.9555 44.6264 41.9812 44.875 41 44.875H9C8.01883 44.875 7.0445 44.6264 6.31948 44.1415C5.59799 43.6591 5.125 42.9453 5.125 42V21.1143C5.125 19.2071 6.85681 17.625 9 17.625H20Z"
      stroke-width="0.25"
    />
    <path
      class="fill-ico stroke-base-txt"
      d="M24.9998 19.125H25.0623L25.0998 19.075L28.0623 15.125H45.9998C47.4929 15.125 48.4485 15.3755 49.0364 15.9634C49.6228 16.5498 49.8735 17.5021 49.8748 18.9888L45.8784 40.9689C45.3803 42.4613 44.8896 43.4291 44.1698 44.029C43.4528 44.6264 42.4881 44.875 40.9998 44.875H8.99979C7.52976 44.875 6.70868 44.3882 6.2992 43.5691C5.88075 42.7321 5.87391 41.5169 6.1233 40.0205C6.37361 38.5187 6.87394 35.0167 7.37382 31.5177L7.37451 31.5129C7.87445 28.0135 8.37382 24.518 8.6233 23.0205C8.86877 21.5471 9.47873 20.581 10.3817 19.979C11.2896 19.3737 12.5109 19.125 13.9998 19.125H24.9998Z"
      stroke-width="0.25"
    />
  </svg>
  <span class="text-base/3 text-white select-none block p-1 rounded-md">{folder.name}</span>
</button>
