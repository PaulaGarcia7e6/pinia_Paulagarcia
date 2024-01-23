import { defineStore, acceptHMRUpdate } from "pinia";
import { groupBy, sortBy } from "lodash";
import { useAuthUserStore } from "./AuthUserStore";
import { useLocalStorage } from "@vueuse/core"

export const useCartStore = defineStore("CartStore", {
    historyEnabled: true,
    state: () => {
        return {
            //items: []
            items: useLocalStorage("CartStore:items", []),
        }
    },
    actions: {
        addItems(count, items) {
            //throw new Error("example error");
            count = parseInt(count);
            for (let index = 0; index < count; index++) {
                this.items.push({ ...items });
                //this.items.push(item);
            }

        },
        clearItem(itemName) {
            this.items = this.items.filter(item => item.name != itemName)
        },
        setItemCount(item, count) {
            this.clearItem(item.name)
            this.addItems(count, item)
        },
        checkout() {
            const authUserStore = useAuthUserStore();
            alert(`${authUserStore.username} just bought ${this.count} items at a total of $${this.reduce}`)
        },
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
if (import.meta.hot) {
    import.meta.hot.accept(acceptHMRUpdate(useCartStore, import.meta.hot));
}
