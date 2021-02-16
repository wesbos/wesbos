import { useState, useEffect } from 'react';

export function useSnipCartEvents() {
  const [cart, setCart] = useState([]);
  const Snipcart = typeof window === 'undefined' ? undefined : window.Snipcart;
  useEffect(() => {
    Snipcart?.events.on('item.adding', (parsedCartItem) => {
      console.log('item.adding');
      console.log(parsedCartItem);
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
      console.log('Store updated!');
      setStore(window.Snipcart?.store?.getState());
    });
    return () => {
      // We could also just return the above subscribe call
      unsubscribe();
    };
  }, []);
  return { store };
}

export function useSnipCartProducts() {
  const [products, setProducts] = useState([]);
  //
  useEffect(() => {
    function fetchProducts() {
      console.log('Fetching Latest Products');
      fetch(`${process.env.GATSBY_STORE_BASE}/products`)
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
