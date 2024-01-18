<script setup>
import TheHeader from "@/components/TheHeader.vue";
import ProductCard from "@/components/ProductCard.vue";
import { useProductStore } from "./stores/ProductStore";
import { useCartStore } from "./stores/CartStore";
import { ref, reactive } from "vue";
import { storeToRefs } from "pinia";
//const { products } = storeToRefs(useProductStore());
const productStore = useProductStore();
const cartStore = useCartStore();

//UNDO Y REDO
const history = reactive([])
const doingHistory = ref(false)
history.push(JSON.stringify(cartStore.$state));
cartStore.$subscribe((mutation, state) => {
  history.push(JSON.stringify(state));
})
const undo = () => {
  if (history.length === 1) return
  doingHistory.value = true
  history.pop()
  cartStore.$state = JSON.parse(history.at(-1))
  doingHistory.value = false
}
cartStore.$subscribe((mutation, state) => {
  if (!doingHistory.value) {
    history.push(JSON.stringify(state));
  }
})


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
      <AppButton @click="undo">Undo</AppButton>
    </div>
    <ul class="sm:flex flex-wrap lg:flex-nowrap gap-5">
      <ProductCard v-for="product in productStore.products" :key="product.name" :product="product"
        @addToCart="cartStore.addItems($event, product)" />
    </ul>
  </div>
</template>
