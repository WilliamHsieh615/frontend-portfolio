const { defineStore } = Pinia;

import statusStore from "./statusStore.js";

export default defineStore('productsStore', {
    // state: 定義資料狀態
    state: () => ({
        products: []
    }),
    // actions: 定義操作資料的方法
    actions: {
        async getProducts() {
            const status = statusStore();
            status.isLoading = true;
            try {
                await new Promise(resolve => setTimeout(resolve, 1000));

                const result = await axios.get("./products.json");
                console.log("成功取得資料:", result.data);
                this.products = result.data;
            } catch (error) {
                console.error("載入失敗:", error);
            } finally {
                status.isLoading = false;
            }
        }
    },
    // getters: 可計算或過濾資料
    getters: {
        sortProducts: ({ products }) => {
            return products.sort((a, b) => a.price - b.price);
        }
    }
})