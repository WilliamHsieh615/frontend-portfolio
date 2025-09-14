<template>

  <div class="col-md-4">
    <h2 class="mb-3">購物車</h2>
    <p v-if="cart.length == 0">購物車是空的</p>
    <template v-else>
      <ul class="list-group mb-3">
        <li class="list-group-item d-flex align-items-center gap-3 flex-wrap" v-for="(item, i) in cart" :key="i">
          <img :src="item.productItem.imageUrl" :alt="item.productItem.name"
            style="width:100px; height:auto; object-fit:cover;">
          <div style="width: 50%;" class="d-flex flex-column gap-2">
            <h6 class="my-0">{{ item.productItem.name }}</h6>
            <div class="d-flex gap-2 align-items-center">
              <button class="btn btn-sm btn-outline-success" @click="decrease(item)" :disabled="item.count === 1"><i
                  class="bi bi-dash"></i></button>
              <span>{{ item.count }}</span>
              <button class="btn btn-sm btn-outline-success" @click="increase(item)"><i class="bi bi-plus"></i></button>
            </div>
            <p class="text-muted my-0">$ {{ item.subtotal }}</p>
          </div>
          <div class="ms-auto">
            <button class="btn btn-sm btn-outline-danger" @click="handleRemoveProduct(item, i)"><i
                class="bi bi-trash3-fill"></i></button>
          </div>
        </li>
      </ul>
      <p class="fs-5 text-end">總金額 $ {{ totalPrice }}</p>
      <button type="submit" class="btn btn-success w-100" @click="handleCheckout">結帳</button>
    </template>

  </div>

</template>

<script setup>

const props = defineProps({
  cart: {
    type: Array,
    required: true
  },
  totalPrice: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['remove-product', 'total-price', 'checkout'])
const handleRemoveProduct = (item, i) => {
  emit('remove-product', item, i)
}

const handleCheckout = () => {
  emit('checkout')
}

const increase = (item) => {
  item.count++;
  item.subtotal = item.count * item.productItem.price;
};

const decrease = (item) => {
  if (item.count > 1){
    item.count--;
    item.subtotal = item.count * item.productItem.price;
  }
};

</script>
