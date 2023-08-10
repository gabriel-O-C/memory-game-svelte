<script lang="ts">
	import { emoji } from './emoji';

	type State = 'start' | 'playing' | 'paused' | 'won' | 'lost';
	let state: State = 'start';
</script>

<h1>Welcome to SvelteKit</h1>
<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
