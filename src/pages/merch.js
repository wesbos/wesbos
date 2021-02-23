import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';
import Product from '../components/store/Product';
import { ProductImages } from '../components/styles/ProductImages';
import useImage from '../hooks/useImage';
import { useSnipCart, useSnipCartProducts } from '../utils/useSnipCart';

// export default function SwagPageNope() {
//   return <p>thanks for the tests. Doing a bit of work and will open it again in a bit.</p>
// }
export default function SwagPage({ data, path }) {
  const mens = `XS|small|medium|large|XL|2XL|3XL`;
  const womens = ['XS', 'small', 'medium', 'large', 'XL']
    .map((size) => `Women's ${size}`)
    .join('|');
  const sizes = `${mens}|${womens}`;
  const Snipcart = typeof window === 'undefined' ? undefined : window.Snipcart;
  const { store } = useSnipCart({
    cart: {
      items: {
        count: 0,
      },
    },
  });
  const { products } = useSnipCartProducts();
  const { getImagePath } = useImage();
  return (
    <div>
      <H as="h2">Merch Store</H>
      <PostMetaTags
        post={{
          frontmatter: {
            slug: path,
            title: 'Merch!',
            image: `${
              process.env.GATSBY_DEPLOY_PRIME_URL || `http://localhost:8888`
            }/assets/images/pink-on-pink-2.jpg`,
          },
        }}
      />

      <p>
        Hey - this is my first small run of basic shirts to get the kinks worked
        out. More designs and cuts will be coming down the road!
      </p>

      <button type="button" onClick={Snipcart?.api.theme.cart.open}>
        🛒 Open Cart ({store.cart.items.count} Items —{' '}
        <span className="snipcart-total-price" />)
      </button>

      <Product
        product={products.find(
          (product) => product.userDefinedId === 'pink-on-pink-tshirt'
        )}
        buttonAttrs={{
          'data-item-id': 'pink-on-pink-tshirt',
          'data-item-price': '22.00',
          'data-item-url': `${process.env.GATSBY_URL}/merch`,
          'data-item-name': 'Tonal Pink Tee',
          // grams
          'data-item-weight': '180',
          // cm
          'data-item-length': '23',
          'data-item-height': '5',
          'data-item-width': '17',
          'data-item-shippable': 'true',
          'data-item-max-quantity': '3',
          'data-item-custom1-name': 'Size',
          'data-item-custom1-options': sizes,
          'data-item-image': getImagePath('pink-on-pink.jpg'),
        }}
      >
        <div>
          <ul className="features">
            <li>Small JS Logo</li>
            <li>100% Cotton</li>
            <li>Super Soft</li>
            <li>Water Based Tonal Ink</li>
            <li>Looks cool</li>
            <li>Wes' Fav</li>
          </ul>
          <ProductImages>
            <StaticImage
              src="../assets/images/pink-on-pink.jpg"
              alt="Black T-Shirt"
              placeholder="blurred"
              layout="constrained"
              width={500}
              height={550}
            />
            <StaticImage
              src="../assets/images/pink-on-pink-2.jpg"
              alt="Black T-Shirt"
              placeholder="blurred"
              layout="constrained"
              width={500}
              height={550}
            />
          </ProductImages>
          <p className="small">
            Printed on AS colour 5051.
            <a
              target="_blank"
              href="https://ascolour.com/mens-basic-tee-5051/"
              rel="noopener noreferrer"
            >
              [size chart]
            </a>
            . Comes with free stickers!
          </p>
        </div>
      </Product>
      <Product
        product={products.find(
          (product) => product.userDefinedId === 'black-on-black-tshirt'
        )}
        image="../../assets/images/black-on-black.jpg"
        buttonAttrs={{
          'data-item-id': 'black-on-black-tshirt',
          'data-item-price': '22.00',
          'data-item-url': `${process.env.GATSBY_URL}/merch`,
          'data-item-name': 'Black on Black Tee',
          // grams
          'data-item-weight': '180',
          // cm
          'data-item-length': '23',
          'data-item-height': '5',
          'data-item-width': '17',
          'data-item-shippable': 'true',
          'data-item-max-quantity': '3',
          'data-item-custom1-name': 'Size',
          'data-item-custom1-options': sizes,
          'data-item-image': getImagePath('black-on-black.jpg'),
        }}
      >
        <div>
          <ul className="features">
            <li>Black Shirt</li>
            <li>Black Waterbased Ink</li>
            <li>Big JS Logo</li>
            <li>100% Cotton</li>
            <li>Subtle Flex</li>
            <li>Makes you a better dev</li>
          </ul>
          <ProductImages>
            <StaticImage
              src="../assets/images/black-on-black.jpg"
              alt="Black T-Shirt"
              placeholder="blurred"
              layout="constrained"
              width={500}
              height={550}
            />
            <StaticImage
              src="../assets/images/black-on-black-2.jpg"
              alt="Black T-Shirt"
              placeholder="blurred"
              layout="constrained"
              width={500}
              height={550}
            />
          </ProductImages>
          <p className="small">
            Printed on AS colour 5051.
            <a
              target="_blank"
              href="https://ascolour.com/mens-basic-tee-5051/"
              rel="noopener noreferrer"
            >
              [size chart]
            </a>
            . Comes with free stickers!
          </p>
        </div>
      </Product>
      {/* <button
        type="button"
        className="snipcart-add-item"
        data-item-id="5-pack-stickers"
        data-item-price="6.00"
        data-item-url={`${process.env.GATSBY_URL}/merch`}
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
      <h3>Things You Should Know</h3>
      <ul>
        <li>Ships Worldwide. Tracking Provided.</li>
        <li>
          <strong>Shipping USA:</strong>Ships USPS, usually pretty quick and
          affordable
        </li>
        <li>
          <strong>Shipping Canada:</strong>Ships Canada Post, usually pretty
          quick and affordable
        </li>
        <li>
          <strong>Shipping Worldwide:</strong> I have opted to allow shipping
          worldwide. Prices and delivery times vary from "eh, not bad" to "wow
          holy smokes". Most of Europe is pretty good! I'm not delivering these
          by hand and these are just the prices and times quoted by the company.
          I unfortunately don't have any control over this.
        </li>
        <li>
          <strong>Duties &amp; Taxes</strong> - Americans and Canadians
          shouldn't expect any additional charges. Other countries may have to
          pay import fees on arrival - please check with your local government
          office for these amounts.
        </li>
        <li>
          <strong>No Refunds</strong>, please check the{' '}
          <a href="https://ascolour.com/mens-basic-tee-5051/">AS Colour 5051</a>{' '}
          size guide before buying. They fit TTS. If you are in between a size,
          size up.
        </li>
      </ul>

      <H as="h3">Free Stuff!</H>
      <p>
        Each Order comes with 1 pack of 18 sticker! I'll sell these stickers on
        their own again soon, but for now they are free with any order.
      </p>
      <ProductImages>
        <StaticImage
          src="../assets/images/stickers.jpg"
          alt="Black T-Shirt"
          placeholder="blurred"
          layout="constrained"
          width={500}
          height={700}
        />
      </ProductImages>
    </div>
  );
}
