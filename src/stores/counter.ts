import { defineStore } from 'pinia'

export const useCounterStore = defineStore('myCounters', {
    state: () => {
        return {
            thisCounter: 1120
        }
    },
    getters: {
        doubleCounter(state) {
            return state.thisCounter * 2;
        }
    },
    actions: {
        addCounters () {
            this.thisCounter++;
        }
    }
})
