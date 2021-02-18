import { StaticImage } from 'gatsby-plugin-image';
import React from 'react';
import styled from 'styled-components';
import H from '../mdxComponents/Headings';

const ProductStyles = styled.div`
  border: 1px solid var(--dark);
  padding: 4rem;
  text-align: center;
  margin: 4rem 0;
  .variations {
    margin-top: 2rem;
    display: grid;
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
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
      <H as="h3">{buttonAttrs['data-item-name']}</H>
      {children}
      {/* If there are no variants, just show a regular ass button */}
      {!product.variants.length && button}
      <div className="variations">
        {product.variants.map((variant, index) => (
          <div className="variant" key={`variant${index}`}>
            <button
              type="button"
              className="snipcart-add-item"
              {...buttonAttrs}
              data-item-custom1-value={variant.variation[0].option}
              disabled={variant.stock <= 0}
            >
              <span className="variantName">
                {variant.variation
                  .map((singleVariant) => `${singleVariant.option}`)
                  .join(' x ')}
              </span>
              {' - '}
              <span className="variantPrice">${product.price}</span>
            </button>
            <span className="stock">
              {variant.stock <= 0 ? 'SOLD OUT' : `${variant.stock} left`}
            </span>
          </div>
        ))}
      </div>
    </ProductStyles>
  );
}
