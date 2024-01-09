import { defineStore } from 'pinia';
//import products from '@/data/products.json'

export const useProductStore = defineStore('ProductStore', {
    state: () => {
        return {
            products: [],
        };
    },
    actions: {
        async fill() {
            //Asignamos el estado de los productos dados por el json. 
            this.products = (await import('@/data/products.json')).default;
        }
    },
});
