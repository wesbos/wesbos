import { useState, useEffect } from 'react';

export function useSnipCartEvents() {
  const [cart, setCart] = useState([]);
  const Snipcart = typeof window === 'undefined' ? undefined : window.Snipcart;
  useEffect(function () {
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
