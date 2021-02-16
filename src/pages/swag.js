import React from 'react';
import { graphql, Link } from 'gatsby';
import { Helmet } from 'react-helmet';
import WelcomeStyles from '../assets/styles/WelcomeStyles';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';
import { useSnipCart, useSnipCartProducts } from '../utils/useSnipCart';
import Product from '../components/store/Product';

export default function SwagPage({ data, path }) {
  const Snipcart = typeof window === 'undefined' ? undefined : window.Snipcart;
  const { store } = useSnipCart({
    cart: {
      items: {
        count: 0,
      },
    },
  });
  const { products } = useSnipCartProducts();
  return (
    <div className="welcome">
      <h2>Test Store. Not real! Hey Folks!</h2>
      <p>
        I need a little help testing out my online store, and more importantly
        the shipping quotes + fulfillment integration around the world.
      </p>
      <p>
        This is a test store. Can you try and buy 1-5 things from the store
        using the address of a local public place? Like a coffee shop? I want to
        record a demo using real data, but addresses I can show on YouTube.
      </p>
      <p>For the credit card, use `4242 4242 4242 4242` and `02/22 22222`. </p>
      <p>This isn't the final design, so don't sweat that please :)</p>
      <button type="button" onClick={Snipcart?.api.theme.cart.open}>
        🛒 Open Cart ({store.cart.items.count} Items —{' '}
        <span className="snipcart-total-price" />)
      </button>

      {/* <button
        type="button"
        className="snipcart-add-item"
        data-item-id="pink-on-pink-tshirt"
        data-item-price="17.00"
        data-item-url={`${process.env.GATSBY_DEPLOY_URL}/swag`}
        data-item-name="Pink on Pink tshirt"
        // grams
        data-item-weight="215"
        // cm
        data-item-length="23"
        data-item-height="5"
        data-item-width="17"
        data-item-shippable="true"
        data-item-max-quantity="49"
        data-item-custom1-name="Size"
        data-item-custom1-options="small|medium|large|XL"
      >
        Add Pink Shirt
      </button> */}
      <hr />
      <Product
        product={products.find(
          (product) => product.userDefinedId === 'pink-on-pink-tshirt'
        )}
        buttonAttrs={{
          'data-item-id': 'pink-on-pink-tshirt',
          'data-item-price': '17.00',
          'data-item-url': `${process.env.GATSBY_DEPLOY_PRIME_URL}/swag`,
          'data-item-name': 'Pink on Pink tshirt',
          // grams
          'data-item-weight': '215',
          // cm
          'data-item-length': '23',
          'data-item-height': '5',
          'data-item-width': '17',
          'data-item-shippable': 'true',
          'data-item-max-quantity': '3',
          'data-item-custom1-name': 'Size',
          'data-item-custom1-options': 'small|medium|large|XL',
        }}
      />
      <hr />
      <Product
        product={products.find(
          (product) => product.userDefinedId === 'black-on-black-tshirt'
        )}
        buttonAttrs={{
          'data-item-id': 'black-on-black-tshirt',
          'data-item-price': '17.00',
          'data-item-url': `${process.env.GATSBY_DEPLOY_PRIME_URL}/swag`,
          'data-item-name': 'Black on Black tshirt',
          // grams
          'data-item-weight': '215',
          // cm
          'data-item-length': '23',
          'data-item-height': '5',
          'data-item-width': '17',
          'data-item-shippable': 'true',
          'data-item-max-quantity': '3',
          'data-item-custom1-name': 'Size',
          'data-item-custom1-options': 'small|medium|large|XL',
        }}
      />
      <hr />
      {/* <button
        type="button"
        className="snipcart-add-item"
        data-item-id="5-pack-stickers"
        data-item-price="6.00"
        data-item-url={`${process.env.GATSBY_DEPLOY_PRIME_URL}/swag`}
        data-item-name="5 Packs of Stickers"
        // grams
        data-item-weight="45"
        // cm
        data-item-length="9"
        data-item-height="14"
        data-item-width="2"
        data-item-shippable="true"
        data-item-max-quantity="49"
      >
        5 Packs of Stickers
      </button> */}
    </div>
  );
}
