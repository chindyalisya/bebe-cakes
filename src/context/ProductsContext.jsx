import { createContext, useContext, useState } from "react";
import { PRODUCTS } from "../data/constants";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState(PRODUCTS);
  const [orders, setOrders] = useState([]);

  const addProduct = (product) => {
    const newId = Math.max(...products.map((p) => p.id), 0) + 1;
    setProducts((prev) => [...prev, { ...product, id: newId }]);
  };

  const updateProduct = (id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  };

  const deleteProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  const placeOrder = ({ cart, orderForm, payMethod, total }) => {
    const orderId = "FC" + Date.now().toString().slice(-6);
    const newOrder = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: { ...orderForm },
      items: cart.map((item) => ({
        id: item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        emoji: item.emoji,
        subtotal: parseInt(item.price.replace(/\D/g, "")) * item.qty,
      })),
      total,
      payMethod,
      status: "new", // new | processing | ready | done | cancelled
    };
    setOrders((prev) => [newOrder, ...prev]);
    return orderId;
  };

  const updateOrderStatus = (orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  };

  return (
    <ProductsContext.Provider
      value={{ products, addProduct, updateProduct, deleteProduct, orders, placeOrder, updateOrderStatus }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
