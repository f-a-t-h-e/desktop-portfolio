<script lang="ts">
  import "../app.css";
  import Folder from "./Folder.svelte";
  import Toolbar from "./Toolbar.svelte";
  import Selection from "./selection.svelte";

  const folders: IFolder[] = [
    {
      name: "about",
      contents: [],
      path: "/about",
    },
    {
      name: "projects",
      contents: [
        { name: "kanban-task-management-web-app", path: "/projects", type: "svelte", isFile: true },
        { name: "kanban-task-management-web-app", path: "/projects", type: "svelte", isFile: true },
        { name: "kanban-task-management-web-app", path: "/projects", type: "svelte", isFile: true },
        { name: "kanban-task-management-web-app", path: "/projects", type: "svelte", isFile: true },
      ],
      path: "/projects",
    },
  ];

  let desktopDimentions = {
    width: 0,
    height: 0,
    boundStartX: 0,
    boundStartY: 0,
    down: false,
    startX: 0,
    startY: 0,
  };
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
  id="desktop"
  class="w-full h-full p-1
  grid grid-cols-[repeat(auto-fill,minmax(5rem,1fr))] grid-rows-[repeat(auto-fill,minmax(4.5rem,1fr))]
  items-center justify-items-center"
  bind:clientWidth={desktopDimentions.width}
  bind:clientHeight={desktopDimentions.height}
  on:mousedown={(e) => {
    desktopDimentions.down = true;
    desktopDimentions.startX = e.clientX;
    desktopDimentions.startY = e.clientY;
  }}
  on:touchstart={(e) => {
    if (e.targetTouches.length) {
      desktopDimentions.down = true;
      desktopDimentions.startX = e.targetTouches[0].clientX;
      desktopDimentions.startY = e.targetTouches[0].clientY;
    }
  }}
>
  {#each folders as folder}
    <Folder {folder} />
  {/each}
  <slot />
  <Selection
    boundY={{
      start: desktopDimentions.boundStartY,
      end: desktopDimentions.height,
    }}
    boundX={{
      start: desktopDimentions.boundStartX,
      end: desktopDimentions.width,
    }}
    bind:startX={desktopDimentions.startX}
    bind:startY={desktopDimentions.startY}
    bind:down={desktopDimentions.down}
  />
</div>
<Toolbar />

<style lang="postcss">
  :global(body) {
    background-image: url(bg0.jpg);
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
  }
</style>
