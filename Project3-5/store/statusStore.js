const { defineStore } = Pinia;

export default defineStore('statusStore', {
    // state: 定義資料狀態
    state: () => ({
        isLoading: false,
        messages: []
    }),
    // actions: 定義操作資料的方法
    actions: {
        pushMessage(data) {
            const { title, content, style } = data;
            this.messages.push({ style, title, content });

            setTimeout(() => {
                this.messages.shift();
            }, 3000);
        }
    }
})