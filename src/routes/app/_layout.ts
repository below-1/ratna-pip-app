import type { Writable } from "svelte/store";
import { writable } from 'svelte/store';

export interface LayoutStore {
  showNavigation: Writable<boolean>;
}

export const layout: LayoutStore = {
  showNavigation: writable(false)
}
