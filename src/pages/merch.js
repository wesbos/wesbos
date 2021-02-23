import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import H from '../components/mdxComponents/Headings';
import { PostMetaTags } from '../components/MetaTags';
import Product from '../components/store/Product';
import { ProductImages } from '../components/styles/ProductImages';
import useImage from '../hooks/useImage';
import { useSnipCart, useSnipCartProducts } from '../utils/useSnipCart';

export default function SwagPage({ data, path }) {
  const mens = `XS|small|medium|large|XL|2XL|3XL`;
  const womens = ['XS', 'small', 'medium', 'large', 'XL']
    .map((size) => `Womens ${size}`)
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
  const { products, totalSales } = useSnipCartProducts();
  const freeStickersLeft = totalSales <= 450;
  const freeStickersAttrs = freeStickersLeft
    ? {
        'data-item-custom2-name': 'Free Stickers?',
        'data-item-custom2-options': 'Yes|No',
      }
    : {};
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
        Woah! The first 100 shirts sold out quick, so I'm taking{' '}
        <strong>pre-orders</strong> for the next batch! Orders remain open until{' '}
        <strong>March 3rd</strong>, and then go into production with expected
        shipping happening on or around <strong>March 20th</strong>.
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
          ...freeStickersAttrs,
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
            Men's Printed on AS colour 5051{' '}
            <a
              target="_blank"
              href="https://ascolour.com/mens-basic-tee-5051/"
              rel="noopener noreferrer"
            >
              [size chart]
            </a>
            , Women's on 4051{' '}
            <a
              target="_blank"
              href="https://ascolour.com/wos-basic-tee-4051/"
              rel="noopener noreferrer"
            >
              [size chart]
            </a>
            . {totalSales <= 450 && `Comes with free stickers!`}
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
          ...freeStickersAttrs,
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
            Men's Printed on AS colour 5051{' '}
            <a
              target="_blank"
              href="https://ascolour.com/mens-basic-tee-5051/"
              rel="noopener noreferrer"
            >
              [size chart]
            </a>
            , Women's on 4051{' '}
            <a
              target="_blank"
              href="https://ascolour.com/wos-basic-tee-4051/"
              rel="noopener noreferrer"
            >
              [size chart]
            </a>
            . {totalSales <= 450 && `Comes with free stickers!`}
          </p>
        </div>
      </Product>
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
          <strong>No Refunds</strong> (unless it gets lost, of course!). Please
          check the{' '}
          <a href="https://ascolour.com/mens-basic-tee-5051/">AS Colour 5051</a>{' '}
          and <a href="https://ascolour.com/wos-basic-tee-4051">4051</a> size
          guide before buying. They fit TTS. If you are in between a size, size
          up.
        </li>
      </ul>

      <H as="h3">Free Stuff!</H>
      {totalSales > 450 ? (
        <div>
          <p>
            The Free Stickers are gone! Sorry. There were 450 packs, but they
            have now run out.{' '}
          </p>
        </div>
      ) : (
        <div>
          <p>
            The <strong>next {450 - totalSales} orders</strong> come with 1 pack
            of 18 stickers! I'll sell these stickers on their own again soon,
            but for now they are free with any order. These are first come first
            serve!
          </p>
          <ProductImages>
            <StaticImage
              src="../assets/images/stickers.jpg"
              alt="Stickers"
              placeholder="blurred"
              layout="constrained"
              width={700}
              height={700}
            />
            <StaticImage
              src="../assets/images/stickers-detail.jpg"
              alt="Stickers"
              placeholder="blurred"
              layout="constrained"
              width={700}
              height={700}
            />
          </ProductImages>
        </div>
      )}
    </div>
  );
}
