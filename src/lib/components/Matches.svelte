<script lang="ts">
  export let matches: string[]
</script>
<div class="matches">
  {#each matches as card}
    <div>{card}</div>
  {/each}
</div>

<style>
  	.matches {
		display: flex;
		gap: 1rem;
		margin-block: 2rem;
		font-size: 3rem;
	}
</style>