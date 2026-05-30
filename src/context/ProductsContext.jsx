import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { PRODUCTS } from "../data/constants";

const ProductsContext = createContext(null);

const STORAGE_KEY_PRODUCTS = "bebecakes_products_v1";
const STORAGE_KEY_ORDERS   = "bebecakes_orders_v1";
const BC_CHANNEL           = "bebecakes_sync";

/* ─── helpers ─────────────────────────────────────── */
function loadProducts() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_PRODUCTS);
    if (raw) {
      const parsed = JSON.parse(raw);
      // Jika array kosong atau bukan array, pakai data default
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
  } catch {}
  // Simpan data default ke localStorage sekaligus
  try { localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(PRODUCTS)); } catch {}
  return PRODUCTS;
}

function loadOrders() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_ORDERS);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {}
  return [];
}

function saveProducts(data) {
  try { localStorage.setItem(STORAGE_KEY_PRODUCTS, JSON.stringify(data)); } catch {}
}

function saveOrders(data) {
  try { localStorage.setItem(STORAGE_KEY_ORDERS, JSON.stringify(data)); } catch {}
}

/* ─── Provider ────────────────────────────────────── */
export function ProductsProvider({ children }) {
  const [products, setProductsState] = useState(() => loadProducts());
  const [orders,   setOrdersState]   = useState(() => loadOrders());

  /* Sinkron antar tab via storage event + BroadcastChannel */
  useEffect(() => {
    let channel = null;
    try { channel = new BroadcastChannel(BC_CHANNEL); } catch {}

    const onStorage = (e) => {
      if (e.key === STORAGE_KEY_PRODUCTS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed) && parsed.length > 0) setProductsState(parsed);
        } catch {}
      }
      if (e.key === STORAGE_KEY_ORDERS && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          if (Array.isArray(parsed)) setOrdersState(parsed);
        } catch {}
      }
    };

    const onMessage = (e) => {
      if (e.data?.type === "products" && e.data.payload?.length > 0)
        setProductsState(e.data.payload);
      if (e.data?.type === "orders")
        setOrdersState(e.data.payload);
    };

    window.addEventListener("storage", onStorage);
    channel?.addEventListener("message", onMessage);

    return () => {
      window.removeEventListener("storage", onStorage);
      channel?.close();
    };
  }, []);

  /* Wrapper setter: simpan ke localStorage + broadcast ke tab lain */
  const setProducts = useCallback((updater) => {
    setProductsState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveProducts(next);
      try {
        const ch = new BroadcastChannel(BC_CHANNEL);
        ch.postMessage({ type: "products", payload: next });
        ch.close();
      } catch {}
      return next;
    });
  }, []);

  const setOrders = useCallback((updater) => {
    setOrdersState((prev) => {
      const next = typeof updater === "function" ? updater(prev) : updater;
      saveOrders(next);
      try {
        const ch = new BroadcastChannel(BC_CHANNEL);
        ch.postMessage({ type: "orders", payload: next });
        ch.close();
      } catch {}
      return next;
    });
  }, []);

  /* ─── Actions ──────────────────────────────────── */
  const addProduct = useCallback((product) => {
    setProducts((prev) => {
      const newId = prev.length > 0 ? Math.max(...prev.map((p) => p.id)) + 1 : 1;
      return [...prev, { ...product, id: newId }];
    });
  }, [setProducts]);

  const updateProduct = useCallback((id, updates) => {
    setProducts((prev) => prev.map((p) => (p.id === id ? { ...p, ...updates } : p)));
  }, [setProducts]);

  const deleteProduct = useCallback((id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  }, [setProducts]);

  const placeOrder = useCallback(({ cart, orderForm, payMethod, total }) => {
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
      status: "new",
    };
    setOrders((prev) => [newOrder, ...prev]);
    return orderId;
  }, [setOrders]);

  const updateOrderStatus = useCallback((orderId, status) => {
    setOrders((prev) =>
      prev.map((o) => (o.id === orderId ? { ...o, status } : o))
    );
  }, [setOrders]);

  const resetToDefaults = useCallback(() => {
    setProducts(PRODUCTS);
    setOrders([]);
  }, [setProducts, setOrders]);

  return (
    <ProductsContext.Provider
      value={{
        products, addProduct, updateProduct, deleteProduct,
        orders, placeOrder, updateOrderStatus,
        resetToDefaults,
      }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  return useContext(ProductsContext);
}
