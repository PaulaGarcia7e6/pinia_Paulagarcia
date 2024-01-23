<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";
import { ref, reactive, createApp } from "vue";
import { storeToRefs } from "pinia";

//const { products } = storeToRefs(useProductStore());
const productStore = useProductStore();
const cartStore = useCartStore();

//UNDO Y REDO Ejercicio 13
// const future = reactive([])
// const history = reactive([])
// const doingHistory = ref(false)
// history.push(JSON.stringify(cartStore.$state));

// const redo = () => {
//   const latestState = future.pop()
//   if (!latestState) return;
//   doingHistory.value = true;
//   history.push(latestState)
//   cartStore.$state = JSON.parse(latestState)
//   doingHistory.value = false;
// }

// const undo = () => {
//   if (history.length === 1) return
//   doingHistory.value = true
//   future.push(history.pop());
//   cartStore.$state = JSON.parse(history.at(-1))
//   doingHistory.value = false
// }

//Ara hem de netejar l’array future si ja no tenim més redos que fer:
// cartStore.$subscribe((mutation, state) => {
//   if (!doingHistory.value) {
//     history.push(JSON.stringify(state));
//     future.splice(0, future.length)
//   }
// })


productStore.fill()
const addToCart = (count, product) => {
  count = parseInt(count)
  cartStore.$patch(state => {
    for (let index = 0; index < count; index++) {
      state.items.push(product);
    }
  })
}

//ON ACTION
cartStore.$onAction(({
  name,
  store,
  args,
  after,
  onError
}) => {
  if (name === 'addItems') {
    after(() => {
      console.log(args[0])
    });
    onError((error) => {
      console.log("Hello error:", error.message);
    });
  }
})


</script>

<template>
  <div class="container">
    <TheHeader />
    <div class="mb-5 flex justify-end">
      <AppButton @click="cartStore.undo">Undo</AppButton>
      <AppButton class="ml-2" @click="cartStore.redo">Redo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event, product)" />
    </ul>
  </div>
</template>
