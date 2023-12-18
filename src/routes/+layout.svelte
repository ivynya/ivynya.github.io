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
	<main>
		<slot />
	</main>
</div>

<style lang="scss">
	:global(body) {
		overflow: hidden;
	}

	.app {
		box-sizing: border-box;

		display: flex;
		flex-direction: row;
		align-items: center;

		height: 100vh;
		width: 100%;
		max-width: 1600px;
		margin: auto;

		opacity: 0;
		overflow: scroll;
		scroll-snap-type: x mandatory;

		scrollbar-width: none;
		&::-webkit-scrollbar {
			display: none;
		}
	}

	main {
		box-sizing: border-box;

		display: grid;
		grid-template-columns: 1;
		grid-template-rows: 1;

		flex: 1 1;
		height: 100%;
		min-width: 100%;
		padding: 4vh 0;

		overflow: auto;
		transition: all 0.5s, min-width 1s;

		position: relative;
	}
</style>
