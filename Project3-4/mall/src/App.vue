<template>
  <div id="app" class="container py-4">
    <div class="row">
      <!-- 商品列表區 -->
      <ProductList :products="products" @add-to-cart="addToCart" />

      <!-- 購物車區 -->
      <Cart :cart="cart" :total-price="totalPrice" @remove-product="removeProduct" @checkout="checkout" />
    </div>

    <!-- 通知元件 -->
    <Notification :toasts="toasts" />
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from "vue";
import axios from 'axios';
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'
import Notification from './components/Notification.vue'

const products = ref([]);
const cart = ref([]);
const toasts = ref([]);

onMounted(() => {

  axios.get("/data/product.json")
    .then(result => {
      console.log(result.data);
      products.value = result.data;
    }).catch(error => {
      console.log("no data", error);
    });

});

const addToCart = (product) => {
  let found = false;

  cart.value.forEach(item => {
    if (item.productItem === product) {
      item.count++;
        item.subtotal = item.count * item.productItem.price;
        found = true;
    }
  });

  if (!found) {
    cart.value.push({
      productItem: product,
      count: 1,
      subtotal: product.price
    });
  }

  const message = `您已將 ${product.name} 加入購物車`;
  toasts.value.push(message);

  setTimeout(() => {
    toasts.value.shift();
  }, 3000);

}

const removeProduct = (item, i) => {
  cart.value.splice(i, 1);

  const message = `您已將 ${item.productItem.name} 移除購物車`;
  toasts.value.push(message);

  setTimeout(() => {
    toasts.value.shift();
  }, 3000);
}

const totalPrice = computed(() => {

  let total = 0

  cart.value.forEach(item => {
    total += item.subtotal
  })

  return total
});

const checkout = () => {
  alert("結帳成功！！");
  cart.value = [];
}

</script>
