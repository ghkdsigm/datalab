import { defineStore } from 'pinia';

export const useExampleStore = defineStore('example', {
  state: () => ({
    message: 'Hello, Pinia!',
  }),
  actions: {
    updateMessage(newMessage) {
      this.message = newMessage;
    },
  },
});
