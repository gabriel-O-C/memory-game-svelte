<script lang="ts">
  export let grid: string[]
  export let selected: number[];
  export let selectCard: (index: number) => void;
  export let matches: string[]

</script>
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
</style>