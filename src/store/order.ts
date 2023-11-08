import { defineStore } from 'pinia';

export const useOrderStore = defineStore({
    id: 'order',
    state: () => ({
        orderList: [], // 订单列表
    }),
    actions: {
        // 添加订单到订单列表
        addOrder(order) {
            this.orderList.push(order);
        },
        // 移除订单
        removeOrder(orderId) {
            this.orderList = this.orderList.filter(order => order.id !== orderId);
        },
    },
});
