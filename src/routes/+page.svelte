<script lang="ts">
	import { emoji } from './emoji';

	type State = 'start' | 'playing' | 'paused' | 'won' | 'lost';
	let state: State = 'start';

	let size = 20;
	let grid = createGrid() ?? [];
	let maxMatches = grid.length / 2;
	let selected: number[] = [];
	let matches: string[] = [];

	let timerId: NodeJS.Timer | null = null;

	let time = 60;
	function startGameTimer() {
		function countdown() {
			state !== 'paused' ? (time -= 1) : null;
		}
		timerId = setInterval(countdown, 1000);
	}
	function gameLost() {
		state = 'lost';
	}
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

	$: selected.length === 2 && matchCards();

	function selectCard(cardIndex: number) {
		selected = selected.concat(cardIndex);
	}
	function matchCards() {
		const [first, second] = selected;

		if (grid[first] === grid[second]) {
			matches = matches.concat(grid[first]);
		}
		setTimeout(() => {
			selected = [];
		}, 500);
	}
	function handlePlayAgain() {
		state = 'playing';
		createGrid();
		timerId && clearInterval(timerId);
		grid = createGrid();
		maxMatches = grid.length / 2;
		selected = [];
		matches = [];
		timerId = null;
		time = 60;
	}
	function gameWon() {
		state = 'won';
	}
	$: if (state === 'playing') {
		!timerId && startGameTimer();
	}

	$: time === 0 && gameLost();
	$: maxMatches === matches.length && gameWon();
</script>

{#if state === 'start'}
	<h1>Matching game</h1>
	<button on:click={() => (state = 'playing')}>Play</button>
{/if}

{#if state === 'playing'}
	<div class="menu">
		<h1 class="timer" class:pulse={time <= 10} style="margin-top: 35px">
			{time}
		</h1>

		<button on:click={() => (state = 'paused')}> Pause </button>
	</div>
	<div class="matches">
		{#each matches as card}
			<div>{card}</div>
		{/each}
	</div>
	<div class="cards">
		{#each grid as card, index}
			{@const isSelected = selected.includes(index)}
			{@const isSelectedOrMatched = selected.includes(index) || matches.includes(card)}
			{@const match = matches.includes(card)}
			<button
				class="card"
				on:click={() => selectCard(index)}
				class:selected={isSelected}
				disabled={isSelectedOrMatched}
				class:flip={isSelectedOrMatched}
			>
				<div class:match class="back">
					{card}
				</div>
			</button>
		{/each}
	</div>
{/if}

{#if state === 'lost'}
	<h1>You Lost! 💩</h1>
	<button on:click={() => handlePlayAgain()}>Play Again!</button>
{/if}

{#if state === 'won'}
	<h1>You Won! 🎉</h1>
	<button on:click={() => handlePlayAgain()}>Play Again!</button>
{/if}

{#if state === 'paused'}
	<button on:click={() => (state = 'playing')}> resume </button>
{/if}

<style>
	.cards {
		display: grid;
		grid-template-columns: repeat(5, 1fr);
		gap: 0.4rem;
	}

	.card {
		height: 140px;
		width: 140px;
		font-size: 4rem;
		background-color: var(--bg-2);
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 12px;
		cursor: pointer;
		transition: rotate 0.3s ease-out;
		transform-style: preserve-3d;

		&.flip {
			rotate: y 180deg;
			pointer-events: none;
		}

		& .back {
			position: absolute;
			inset: 0;
			display: grid;
			place-content: center;
			backface-visibility: hidden;
			rotate: y 180deg;
		}

		&.selected {
			border: 4px solid var(--border);
		}
		& .match {
			transition: opacity 0.3s ease-out;
			opacity: 0.4;
		}
	}
	.matches {
		display: flex;
		gap: 1rem;
		margin-block: 2rem;
		font-size: 3rem;
	}
	.timer {
		transition: color 0.3s ease;
	}
	.menu {
		display: flex;
		align-items: center;
		justify-items: center;
	}

	.pulse {
		color: var(--pulse);
		animation: pulse 1s infinite ease;
	}

	@keyframes pulse {
		to {
			scale: 1.4;
		}
	}
</style>
