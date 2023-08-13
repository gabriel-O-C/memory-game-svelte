/* eslint-disable @typescript-eslint/no-unused-vars */
import { writable } from 'svelte/store';

type State = 'start' | 'playing' | 'paused' | 'won' | 'lost';


export const state = writable<State>('start');



export function gameWon() {
  state.update((state) => state = 'won');
}

export function gameLost() {
  state.update((state) => state = 'lost')
}