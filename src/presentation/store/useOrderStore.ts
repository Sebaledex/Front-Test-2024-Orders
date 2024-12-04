import { create } from "zustand";
import { Order } from "../../domain/entities/order.entity";
import { createOrder, getAllOrders } from "../../actions/order";

interface OrderState {
  orders: Order[];
  error: string | null;
  fetchAllOrders: () => Promise<void>;
  addOrder: (
    name: string,
    price: number,
    stock: number,
    description: string
  ) => Promise<void>;
}

export const useOrderStore = create<OrderState>((set) => ({
  orders: [],
  error: null,

  fetchAllOrders: async () => {
    try {
      const orders = await getAllOrders();
      set({ orders, error: null });
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },

  addOrder: async (name, price, stock, description) => {
    try {
      const newOrder = await createOrder(name, price, stock, description);
      set((state) => ({
        orders: [...state.orders, newOrder],
        error: null,
      }));
    } catch (error) {
      set({ error: (error as Error).message });
    }
  },
}));
