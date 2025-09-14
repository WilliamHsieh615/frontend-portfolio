import cartStore from "../store/cartStore.js";

const { computed } = Vue;

export default {
    template: `
        <nav class="navbar bg-body-tertiary">
            <div class="container-fluid p-4">
                <span class="navbar-brand mb-0 h1">香香餅乾店</span>
                <button type="button" class="btn">
                    購物車
                    <span class="badge rounded-pill text-bg-danger">{{ cartItems.length }}</span>
                </button>
            </div>
        </nav>`,
    setup() {

        const cart = cartStore();
        const cartItems = computed(() => cart.cart);

        return { cartItems };

    }
}