import { defineStore } from "pinia";
import { groupBy } from "lodash";

export const useCartStore = defineStore("CartStore", {
    state: () => {
        return {
            items: []
        }
    },
    actions: {
        addItems(count, items) {
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push({ ...items });
            }
        }
    },
    getters: {
        // count() {
        //     return this.items.length;
        // },
        // isEmpty() {
        //     return this.count === 0;
        // }
        //getters en versio arrow
        count: (state) => state.items.length,
        isEmpty: (state) => state.count === 0,
        grouped: state => groupBy(state.items, item => item.name)
    }
});