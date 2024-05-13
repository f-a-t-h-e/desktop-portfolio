<script lang="ts">
  export let i: number;
  // Inspired by https://svelte.dev/repl/810b0f1e16ac4bbd8af8ba25d5e0deff?version=3.4.2.
  import { flip } from "svelte/animate";

  let baskets = [
    {
      name: "Basket 1",
      items: ["Orange", "Pineapple"],
    },
    {
      name: "Basket 2",
      items: ["Banana", "Apple"],
    },
    {
      name: "Basket 3",
      items: ["GrapeFruit"],
    },
  ];



  function drop(
    event: DragEvent & {
      currentTarget: EventTarget & HTMLDivElement;
    },
    basketIndex: number
  ) {
    console.log("Got");
    
    event.preventDefault();
    const json = event.dataTransfer?.getData("text/plain");
    const data = JSON.parse(json || "");

    // Remove the item from one basket.
    // Splice returns an array of the deleted elements, just one in this case.
    const [item] = baskets[data.basketIndex].items.splice(data.itemIndex, 1);

    // Add the item to the drop target basket.
    baskets[basketIndex].items.push(item);
    baskets = baskets;

  }
  let isDraggingOver = false;
</script>

<!-- svelte-ignore a11y-no-static-element-interactions -->
<div
class="bg-slate-950/10 w-full h-full hover:bg-slate-950/50"
  on:dragenter={() => {
    isDraggingOver = true;
  }}
  on:dragleave={() => {
    isDraggingOver = false;
  }}
  on:drop={(event) => drop(event, i)}
></div>
<!-- ondragover="return false" -->
