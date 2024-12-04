import { serviceAxiosApi } from "../config/api/serviceAxiosApi";
import { Order } from "../domain/entities/order.entity";


// Obtener todas las órdenes
export const getAllOrders = async (): Promise<Order[]> => {
  try {
    const response = await serviceAxiosApi.get("/v2/order");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las órdenes:", error);
    throw error;
  }
};

// Crear una nueva orden
export const createOrder = async (
  name: string,
  price: number,
  stock: number,
  description: string
): Promise<Order> => {
  try {
    const response = await serviceAxiosApi.post("/v2/order", {
      name,
      price,
      stock,
      description,
    });
    return response.data;
  } catch (error) {
    console.error("Error al crear la orden:", error);
    throw error;
  }
};
