import { useState, useEffect } from 'react';

export function useSnipCartEvents() {
  const [cart, setCart] = useState([]);
  const Snipcart = typeof window === 'undefined' ? undefined : window.Snipcart;
  useEffect(() => {
    Snipcart?.events.on('item.adding', (parsedCartItem) => {
      // dispatch(updating(item.id));
    });
    return function unsubcribe() {};
  }, []);
  return {
    cart,
  };
}

export function useSnipCart(initialState) {
  const [store, setStore] = useState(initialState);
  useEffect(() => {
    const unsubscribe = window.Snipcart?.store?.subscribe(() => {
      setStore(window.Snipcart?.store?.getState());
    });
    return () => {
      // We could also just return the above subscribe call
      unsubscribe();
    };
  }, []);
  return { store };
}

const BASE = process.env.CONTEXT === 'production'
  ? // Production
  process.env.GATSBY_STORE_BASE
  : // Development
  process.env.GATSBY_STORE_BASE_PREVIEW,

export function useSnipCartProducts() {
  const [products, setProducts] = useState([]);
  //
  useEffect(() => {
    function fetchProducts() {
      fetch(`${BASE}/products`)
        .then((x) => x.json())
        .then((response) => setProducts(response))
        .catch(console.error);
    }
    fetchProducts();
    // Update the products every 5 seconds
    const interval = setInterval(fetchProducts, 10000);
    // Stop fetching on unmount of component
    return () => {
      clearInterval(interval);
    };
  }, []);
  return { products };
}
