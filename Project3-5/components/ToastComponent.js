import statusStore from "../store/statusStore.js";

const { storeToRefs } = Pinia;

export default {
    template: `
        <div class="position-fixed top-0 end-0 p-3" style="z-index: 1050">
            <div class="toast show align-items-center text-white border-0" style="opacity: 0.9;" :class="['bg-' + message.style]" v-for="(message, i) in messages" :key="i">
                <div class="d-flex mb-2">
                    <div class="toast-body">{{ message.title }} {{ message.content }}</div>
                    <button type="button" class="btn-close btn-close-white me-2 m-auto" @click="messages.splice(i, 1)"></button>
                </div>
            </div>
        </div>`,
    setup() {

        const status = statusStore();
        const { messages } = storeToRefs(status);

        return { messages };
        
    }
}