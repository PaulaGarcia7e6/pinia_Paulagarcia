import { defineStore } from "pinia";
import { groupBy, sortBy } from "lodash";

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
        },
        clearItem(itemName) {
            this.items = this.items.filter(item => item.name != itemName)
        },
        setItemCount(item, count) {
            this.clearItem(item.name)
            this.addItems(count, item)
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
        grouped: state => {
            const groupedItems = groupBy(state.items, item => item.name);
            // Unir todos los elementos en un solo array
            const allItems = Object.values(groupedItems).flat();

            // Ordenar el array completo
            const sortedItems = sortBy(allItems, item => item.name);

            // Volver a agrupar por nombre después de ordenar
            const sortedGroupedItems = groupBy(sortedItems, item => item.name);

            return sortedGroupedItems;
        },
        groupCount: (state) => (name) => state.grouped[name].length,
        //La meva funcio de reduce primer extraeix un array de preus amb la funcio .map() 
        //y finalment fa la funcio .reduce() per obtenir el total.
        reduce: (state) => state.items.map((item) => item.price).reduce((a, b) => a + b, 0)
    }
});