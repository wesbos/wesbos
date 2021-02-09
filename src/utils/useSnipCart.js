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
  console.log(store);

  useEffect(() => {
    Snipcart.store.subscribe(() => {
      console.log('Store updated!');
      setStore(Snipcart.store.getState());
    });
    return () => {
      console.log('Clean up subscribe');
    };
  }, []);
  return { store };
}

export function useSnipCartProducts() {
  const [products, setProducts] = useState([]);
  //
  useEffect(() => {
    console.log('Fetching Products');
    fetch(`${process.env.GATSBY_STORE_BASE}/products`)
      .then((x) => x.json())
      .then((response) => setProducts(response))
      .catch(console.error);
  }, []);
  return { products };
}
