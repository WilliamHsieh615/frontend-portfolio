const { defineStore } = Pinia;

import productsStore from "./productsStore.js";
import statusStore from "./statusStore.js";

export default defineStore('cartStore', {
    // state: 定義資料狀態
    state: () => ({
        cart: []
    }),
    // actions: 定義操作資料的方法
    actions: {
        addToCart(productId, quantity = 1) {

            console.log(productId, quantity);

            const currentCart = this.cart.find((item) => item.productId === productId);
            console.log(currentCart);

            if (currentCart) {
                currentCart.quantity += quantity;
            } else {
                this.cart.push({
                    id: new Date().getTime(),
                    productId,
                    quantity
                })
            }

            const status = statusStore();
            const { products } = productsStore();
            const product = products.find((p) => p.id === productId);
            status.pushMessage({ title: product.title, style: 'success', content: '已加入購物車' })

            console.log("購物車內容:", this.cart);
        },
        setCartQuantity(id, event) {
            console.log(event.target.value);
            console.log(typeof event.target.value);
            console.log(id, event);
            const currentCart = this.cart.find((item) => item.id === id);
            console.log(currentCart);
            if (event.target.value > 1) {
                currentCart.quantity = parseInt(event.target.value);
            } else {
                currentCart.quantity = 1;
            }

        },
        removeCartItem(id) {

            const index = this.cart.findIndex((item) => item.id === id);
            const removedItem = this.cart[index];
            this.cart.splice(index, 1);

            const { products } = productsStore();
            const product = products.find((p) => p.id === removedItem.productId);
            const status = statusStore();
            status.pushMessage({ title: product.title, style: 'danger', content: '已移除購物車' })
        }
    },
    // getters: 可計算或過濾資料
    getters: {
        cartList: ({ cart }) => {

            // 整合購物車產品資訊
            // 計算小計
            const { products } = productsStore();
            console.log(products);

            const carts = cart.map((item) => {
                // 取出單一產品
                const product = products.find((product) => product.id === item.productId);
                return {
                    ...item,
                    product,
                    subtotal: product.price * item.quantity
                }
            });
            console.log(carts);
            // 計算總金額
            const total = carts.reduce((a, b) => a + b.subtotal, 0);
            console.log(total)

            return {
                carts,
                total,
            }
        }
    }
})