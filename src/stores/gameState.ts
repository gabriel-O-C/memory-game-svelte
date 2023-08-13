import { writable } from 'svelte/store';

type State = 'start' | 'playing' | 'paused' | 'won' | 'lost';


export const state = writable<State>('start');



