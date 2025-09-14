import productsStore from "../store/productsStore.js";
import cartStore from "../store/cartStore.js";
import statusStore from "../store/statusStore.js";

const { computed, onMounted } = Vue;

export default {
    template: `
        <div>
            <div v-if="isLoadingItem" class="text-center my-5">
                <div class="spinner-border" role="status"></div>
            </div>
            <div class="row row-cols-3 my-4 g-4">
                <div class="col" v-for="product in sortProducts" :key="product.id">
                    <div class="card">
                        <img :src="product.imageUrl" class="card-img-top" :alt="product.title" />
                        <div class="card-body">
                            <h6 class="card-title">
                                {{ product.title }}
                                <span class="float-end">$ {{ product.price }}</span>
                            </h6>
                            <a href="#" class="btn btn-outline-secondary w-100" @click.prevent="addToCart(product.id)">加入購物車</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`,
    setup() {

        const products = productsStore();
        const cart = cartStore();
        const status = statusStore();

        onMounted(() => {
            products.getProducts();
        });

        const sortProducts = computed(() => products.sortProducts);

        const isLoadingItem = computed(() => status.isLoading);

        const addToCart = (id) => cart.addToCart(id);

        return { sortProducts, isLoadingItem, addToCart };

    }
}