<template>

  <div class="col-md-8">
    <h2 class="mb-3">商品列表</h2>
    <div class="row">
      <div class="col-md-4 mb-4" v-for="(product, i) in products" :key="i">
        <div class="card h-100">
          <img :src="product.imageUrl" :alt="product.name" class="card-img-top"
            style="height: 150px; object-fit: cover;">
          <div class="card-body" style="display: flex; flex-direction: column; justify-content: space-between;">
            <h5 class="card-title">{{ product.name }}</h5>
            <p class="card-text">{{ product.decription }}</p>
            <p class="fw-bold text-primary">$ {{ product.price }}</p>
            <button class="btn btn-success w-100" @click="handleAddToCart(product)"> 加入購物車 </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup>

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})

const emit= defineEmits(['add-to-cart'])

const handleAddToCart = (product) => {
  emit('add-to-cart', product)
}

</script>
