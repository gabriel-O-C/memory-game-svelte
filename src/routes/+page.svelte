<script lang="ts">
	import { emoji } from './emoji';

	type State = 'start' | 'playing' | 'paused' | 'won' | 'lost';
	let state: State = 'start';

	let size = 20;
	let grid = createGrid() ?? [];
	let maxMatches = grid.length / 2;
	let selected: number[] = [];
	let matches: string[] = [];

	function createGrid() {
		const cards = new Set<string>();
		const maxSize = size / 2;

		while (cards.size < maxSize) {
			const randomIndex = Math.floor(Math.random() * emoji.length);

			cards.add(emoji[randomIndex]);
		}
		return shuffle([...cards, ...cards]);
	}
	function shuffle<T>(items: T[]) {
		return items.sort(() => Math.random() - 0.5);
	}
</script>

{#if state === 'start'}
	<h1>Matching game</h1>
	<button on:click={() => (state = 'playing')}>Play</button>
{/if}

{#if state === 'playing'}
	<div class="cards">
		{#each grid as card, index}
			<button>
				<div class="card">
					{card}
				</div>
			</button>
		{/each}
	</div>
{/if}
