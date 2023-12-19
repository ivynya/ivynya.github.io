<script lang="ts">
	import { onDestroy, onMount } from "svelte";
	import { isLight, stylesheet } from "$lib/style";
	import { updateCurrentDayPercentage } from "$lib/time";

	let int: any;
	onMount(() => {
		stylesheet.subscribe(sheet => {
			document.body.setAttribute("style", sheet);
			document.body.setAttribute("data-dark", $isLight ? "false" : "true");
		});

		// Recalculate page color + angles value every 15 seconds
		int = setInterval(updateCurrentDayPercentage, 15000);
	});
	onDestroy(() => clearInterval(int));
</script>

<div class="app">
  <header>
    <h1>Directory</h1>
  </header>
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	:global(body) {
		overflow: hidden;
	}

  h1 {
    color: var(--text-accent);
    margin: 3rem 0;
    line-height: 1;
    font-size: 5rem;
    font-weight: 700;
    text-transform: uppercase;
    width: fit-content;
  }

	.app {
		box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: center;
		max-width: 1600px;
    margin: auto;
    width: fit-content;
		scrollbar-width: none;

		&::-webkit-scrollbar {
			display: none;
		}
	}

	main {
		box-sizing: border-box;
		display: grid;
    //grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
    //grid-template-rows: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1rem;
		flex: 1 1;
		min-width: 100%;
		transition: all 0.5s, min-width 1s;
	}
</style>
