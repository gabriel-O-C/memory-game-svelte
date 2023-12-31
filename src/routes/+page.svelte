<script lang="ts">
	import Cards from "$lib/components/Cards.svelte";
	import Matches from "$lib/components/Matches.svelte";
	import { emoji } from "$lib/emoji";
	import { gameLost, gameWon, state } from '../stores/gameState';

	let size = 20;
	let grid = createGrid() ?? [];
	let maxMatches = grid.length / 2;
	let selected: number[] = [];
	let matches: string[] = [];
	let timerId: NodeJS.Timer | null = null;
	let time = 60;

	function startGameTimer() {
		function countdown() {
			$state !== 'paused' ? (time -= 1) : null;
		}
		timerId = setInterval(countdown, 1000);
	}

	function shuffle<T>(items: T[]) {
		return items.sort(() => Math.random() - 0.5);
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
		}, 300);
	}

	function handlePlayAgain() {
		$state = 'playing';
		createGrid();
		timerId && clearInterval(timerId);
		grid = createGrid();
		maxMatches = grid.length / 2;
		selected = [];
		matches = [];
		timerId = null;
		time = 60;
	}

	$: if ($state === 'playing') {
		!timerId && startGameTimer();
	}
	$: selected.length === 2 && matchCards();
	$: time === 0 && gameLost();
	$: maxMatches === matches.length && gameWon();
</script>

{#if $state === 'start'}
	<h1>Matching game</h1>
	<button on:click={() => ($state = 'playing')}>Play</button>
{/if}

{#if $state === 'playing'}
	<div class="menu">
		<h1 class="timer" class:pulse={time <= 10} style="margin-top: 35px">
			{time}
		</h1>

		<button on:click={() => ($state = 'paused')}> Pause </button>
	</div>
	
	<Matches {matches} />
	<Cards {grid} {selected} {matches} {selectCard} />

{/if}

{#if $state === 'lost' || $state === 'won'}
	<h1>You {$state}! {$state === 'lost' ? '💩' : '🎉'}</h1>
	<button on:click={() => handlePlayAgain()}>Play Again!</button>
{/if}


{#if $state === 'paused'}
	<button on:click={() => ($state = 'playing')}> resume </button>
{/if}

<style>


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
