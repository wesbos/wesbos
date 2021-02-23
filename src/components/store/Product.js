import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import H from '../mdxComponents/Headings';

const ProductStyles = styled.div`
  border: 1px solid var(--dark);
  padding: 4rem;
  text-align: center;
  margin: 4rem 0;
  @media (max-width: 600px) {
    border-width: 0;
    padding: 0;
  }
  .variations {
    margin-top: 2rem;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    @media (max-width: 500px) {
      grid-template-columns: repeat(2, 1fr);
    }
  }
  .variant {
    display: grid;
    grid-auto-flow: row;
    text-align: center;
  }
  .stock {
    font-size: 1.5rem;
  }
  ul.features {
    display: flex;
    flex-wrap: wrap;
    margin: 0;
    padding: 0;
    li {
      flex: 1 0 auto;
      display: block;
      margin-bottom: 2rem;
      display: grid;
      grid-template-columns: 1fr auto;
      &:after {
        content: '×';
        flex: 1 1 auto;
        display: inline-block;
        color: var(--yellow);
        margin: 0 2rem;
        @media (max-width: 700px) {
          display: none;
        }
      }
      &:last-child:after {
        display: none;
      }
    }
  }
  button {
    &[disabled] {
      text-decoration: line-through;
      color: rgba(0, 0, 0, 0.7);
    }
  }
`;

export default function Product({ product, buttonAttrs, children }) {
  const button = (
    <button type="button" className="snipcart-add-item" {...buttonAttrs}>
      Buy {buttonAttrs['data-item-name']} - ${buttonAttrs['data-item-price']}
    </button>
  );
  if (!product) return button;
  return (
    <ProductStyles>
      <H as="h3">
        {buttonAttrs['data-item-name']} - ${product.price}
      </H>
      {children}
      {/* If there are no variants, just show a regular ass button */}
      {!product.variants.length && button}
      <div className="variations">
        {product.variants.map((variant, index) => {
          if (variant.stock === null) return null;
          return (
            <div className="variant" key={`variant${index}`}>
              <button
                type="button"
                className="snipcart-add-item"
                {...buttonAttrs}
                data-item-custom1-value={variant.variation[0].option}
                disabled={
                  variant.stock <= 0 && !variant.allowOutOfStockPurchases
                }
              >
                <span className="variantName">
                  {variant.variation
                    .map((singleVariant) => `${singleVariant.option}`)
                    .join(' ')
                    .replace('Womens', `Women's`)}
                </span>
              </button>
              <span className="stock">
                {/* Some left */}
                {variant.stock > 0 && `${variant.stock} left`}
                {/* None left, we can't oversell */}
                {variant.stock <= 0 &&
                  !variant.allowOutOfStockPurchases &&
                  'SOLD OUT'}
                {/* None left, we can oversell. Show how many */}
                {variant.stock <= 0 &&
                  variant.allowOutOfStockPurchases &&
                  `${variant.stock * -1} SOLD`}
              </span>
            </div>
          );
        })}
      </div>
    </ProductStyles>
  );
}
