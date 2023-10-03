import { defineStore } from 'pinia';

export const counter2 = defineStore('counter2', {
  state: () => ({
    counter: 16,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      this.counter * 2;
    },
  },
  persist: true,
});
