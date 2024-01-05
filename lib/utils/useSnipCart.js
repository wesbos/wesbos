/* eslint-disable */
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

const BASE =
  process.env.GATSBY_CONTEXT === 'production'
    ? // Production
      // https://merch-wesbos.vercel.app/api
      process.env.GATSBY_STORE_BASE
    : // Development
      // https://chit-chats-snipcart-integration.wesbos.vercel.app/api
      process.env.GATSBY_STORE_BASE_PREVIEW;

function calculateTotalSales(products) {
  return products.reduce((acc, product) => {
    if (!product.totalStock) return acc;
    return acc + product.totalStock * -1;
  }, 0);
}

export function useSnipCartProducts() {
  const [products, setProducts] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  //
  useEffect(() => {
    function fetchProducts() {
      fetch(`${BASE}/products`)
        .then((x) => x.json())
        .then((response) => {
          setProducts(response);
          setTotalSales(calculateTotalSales(response));
        })
        .catch(console.error);
    }
    fetchProducts();
    // Update the products every 5 seconds
    const interval = setInterval(fetchProducts, 10000);
    // Stop fetching on unmount of component
    return function unsubscribe() {
      clearInterval(interval);
    };
  }, []);
  return { products, totalSales };
}
