import React, { useEffect, useState } from "react";
import { Layout, Text, Card } from "@ui-kitten/components";
import { StackScreenProps } from "@react-navigation/stack";
import { RootStackParams } from "../../navigation/StackNavigator";
import { ScrollView, useWindowDimensions } from "react-native";
import { useOrderStore } from "../../store/useOrderStore";


interface Props extends StackScreenProps<RootStackParams, "OrderScreen"> {}

export const OrderScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();
  const { orders, fetchAllOrders, error } = useOrderStore();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        await fetchAllOrders();
      } catch (e) {
        console.error("Error al cargar las órdenes:", e);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  return (
    <Layout style={{ flex: 1, paddingHorizontal: 16 }}>
      <ScrollView style={{ marginTop: height * 0.10 }}>
        <Layout style={{ marginBottom: 20, alignItems: "center" }}>
          <Text category="h1">Lista de Órdenes</Text>
        </Layout>

        {loading ? (
          <Text category="h5" style={{ textAlign: "center" }}>
            Cargando órdenes...
          </Text>
        ) : error ? (
          <Text category="h5" status="danger" style={{ textAlign: "center" }}>
            {error}
          </Text>
        ) : orders.length === 0 ? (
          <Text category="h5" style={{ textAlign: "center" }}>
            No hay órdenes disponibles.
          </Text>
        ) : (
          orders.map((order) => (
            <Card key={order._id} style={{ marginBottom: 16 }}>
              <Text category="h5">{order.name}</Text>
              <Text category="s1" appearance="hint">
                ${order.price}
              </Text>
              <Text category="p2" appearance="hint">
                Stock: {order.stock}
              </Text>
              <Text category="p2">{order.description}</Text>
            </Card>
          ))
        )}
      </ScrollView>
    </Layout>
  );
};
