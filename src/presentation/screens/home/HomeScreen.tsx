import React, { useState } from 'react';
import { Layout, Text, Card } from '@ui-kitten/components';
import { StackScreenProps } from '@react-navigation/stack';
import { RootStackParams } from '../../navigation/StackNavigator';
import { ScrollView, useWindowDimensions } from 'react-native';

interface Props extends StackScreenProps<RootStackParams, 'HomeScreen'> {}

export const HomeScreen = ({ navigation }: Props) => {
  const { height } = useWindowDimensions();

  // Lista de platos de comida típica de Chile
  const dishes = [
    {
      name: 'Empanada de Pino',
      price: 2000,
      stock: 50,
      description: 'Una empanada rellena con carne, cebolla, huevo y aceitunas.'
    },
    {
      name: 'Pastel de Choclo',
      price: 3500,
      stock: 30,
      description: 'Un pastel hecho con maíz, carne molida y cebolla, cubierto con una capa de maíz molido.'
    },
    {
      name: 'Cazuela',
      price: 4500,
      stock: 20,
      description: 'Sopa tradicional con carne, papas, zapallo, y arroz.'
    },
    {
      name: 'Asado',
      price: 7000,
      stock: 15,
      description: 'Carne a la parrilla acompañada de ensaladas y papas.'
    },
    {
      name: 'Completo',
      price: 1500,
      stock: 100,
      description: 'Hot dog chileno con palta, mayonesa y tomate.'
    },
    {
      name: 'Curanto',
      price: 8000,
      stock: 10,
      description: 'Un plato típico de la isla de Chiloé con mariscos, carne, y papas cocidos en un hoyo.'
    },
    {
      name: 'Mote con Huesillos',
      price: 1000,
      stock: 50,
      description: 'Bebida tradicional de verano hecha con mote de trigo y duraznos deshidratados en jugo.'
    }
  ];

  return (
    <Layout style={{ flex: 1, paddingHorizontal: 16 }}>
      <ScrollView style={{ marginTop: height * 0.10 }}>
        <Layout style={{ marginBottom: 20, alignItems: 'center' }}>
          <Text category="h1">Lista de Platos</Text>
        </Layout>

        {dishes.map((dish, index) => (
          <Card key={index} style={{ marginBottom: 16 }}>
            <Text category="h5">{dish.name}</Text>
            <Text category="s1" appearance="hint">${dish.price}</Text>
            <Text category="p2" appearance="hint">Stock: {dish.stock}</Text>
            <Text category="p2">{dish.description}</Text>
          </Card>
        ))}
      </ScrollView>
    </Layout>
  );
};
