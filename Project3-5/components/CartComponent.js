import cartStore from "../store/cartStore.js";

const { computed } = Vue;

export default {
    template: `
        <div class="bg-light my-4 p-4">
            <div v-if="cartList.carts.length === 0">購物車沒有任何品項</div>
            <template v-else>
                <table class="table align-middle">
                    <tbody>
                        <tr v-for="item in cartList.carts" :key="item.id">
                            <td width="100" class="px-4">
                                <img :src="item.product.imageUrl" class="table-image" :alt="item.product.title" />
                            </td>
                            <td width="200">{{ item.product.title }}</td>
                            <td width="50">
                                <input type="number" :value="item.quantity" min="1" @change="(e) => setCartQuantity(item.id, e)">
                            </td>
                            <td width="200" class="text-center">
                                $ {{ item.subtotal }}
                            </td>
                            <td width="50" class="text-end px-4">
                                <a href="#" class="text-dark" @click.prevent="removeCartItem(item.id)"><i class="fa-solid fa-trash"></i></a>
                            </td>
                        </tr>
                    </tbody>
                    <tfoot>
                        <tr>
                            <td colspan="5" class="text-end">總金額 NT$ {{ cartList.total }}</td>
                        </tr>
                    </tfoot>
                </table>
                <button type="button" class="btn btn-outline-success w-25 d-block ms-auto" @click.prevent="checkout()">結帳</button>
            </template>
        </div>`,
    setup() {

        const cart = cartStore();
        const cartList = computed(() => cart.cartList);

        const removeCartItem = (id) => cart.removeCartItem(id);
        const setCartQuantity = (id, event) => cart.setCartQuantity(id, event);
        const checkout = () => {
            alert("結帳完成");
            cart.cart = [];
        }

        return { cartList, removeCartItem, setCartQuantity, checkout };

    }
}