import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PRODUCTS } from "../data/constants";
import { db } from "../firebase";
import {
  collection, doc, onSnapshot,
  addDoc, updateDoc, deleteDoc, setDoc,
  query, orderBy, serverTimestamp,
} from "firebase/firestore";

const ProductsContext = createContext(null);

export function ProductsProvider({ children }) {
  const [products, setProducts] = useState([]);
  const [orders,   setOrders]   = useState([]);
  const [loading,  setLoading]  = useState(true);

  // ── Dengarkan perubahan produk secara real-time ──────────
  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snap) => {
      const data = snap.docs.map((d) => ({ firestoreId: d.id, ...d.data() }));

      if (data.length === 0) {
        // Firestore kosong → isi dengan data default
        Promise.all(
          PRODUCTS.map((p) => {
            const { id, ...rest } = p;
            return setDoc(doc(db, "products", String(id)), rest);
          })
        );
        // loading tetap true, tunggu onSnapshot terpanggil lagi setelah data masuk
      } else {
        setProducts(data);
        setLoading(false);
      }
    });
    return () => unsub();
  }, []);

  // ── Dengarkan perubahan pesanan secara real-time ─────────
  useEffect(() => {
    const q = query(collection(db, "orders"), orderBy("createdAt", "desc"));
    const unsub = onSnapshot(q, (snap) => {
      const data = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
      setOrders(data);
    });
    return () => unsub();
  }, []);

  // ── Tambah produk ────────────────────────────────────────
  const addProduct = useCallback(async (product) => {
    await addDoc(collection(db, "products"), product);
  }, []);

  // ── Update produk ────────────────────────────────────────
  const updateProduct = useCallback(async (firestoreId, updates) => {
    await updateDoc(doc(db, "products", String(firestoreId)), updates);
  }, []);

  // ── Hapus produk ─────────────────────────────────────────
  const deleteProduct = useCallback(async (firestoreId) => {
    await deleteDoc(doc(db, "products", String(firestoreId)));
  }, []);

  // ── Buat pesanan baru ────────────────────────────────────
  const placeOrder = useCallback(async ({ cart, orderForm, payMethod, total }) => {
    const orderId = "FC" + Date.now().toString().slice(-6);
    await setDoc(doc(db, "orders", orderId), {
      createdAt: serverTimestamp(),
      customer: { ...orderForm },
      items: cart.map((item) => ({
        id: item.firestoreId || item.id,
        name: item.name,
        price: item.price,
        qty: item.qty,
        emoji: item.emoji,
        subtotal: parseInt(item.price.replace(/\D/g, "")) * item.qty,
      })),
      total,
      payMethod,
      status: "new",
    });
    return orderId;
  }, []);

  // ── Update status pesanan ────────────────────────────────
  const updateOrderStatus = useCallback(async (orderId, status) => {
    await updateDoc(doc(db, "orders", orderId), { status });
  }, []);

  return (
    <ProductsContext.Provider value={{
      products, orders, loading,
      addProduct, updateProduct, deleteProduct,
      placeOrder, updateOrderStatus,
    }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
