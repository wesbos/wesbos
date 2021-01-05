import React from 'react';
import styled from 'styled-components';

const ProductStyles = styled.div`
  border: 1px solid var(--dark);
  padding: 20px;
`;

export default function Product({ product, buttonAttrs }) {
  if (!product) return '';
  return (
    <ProductStyles>
      <button type="button" className="snipcart-add-item" {...buttonAttrs}>
        Buy it!
      </button>
      <p>Product: {product.id}</p>
      <p>ID: {product.userDefinedId}</p>
      <div className="variations">
        {product.variants.map((variant) => (
          <div>
            <button
              type="button"
              className="snipcart-add-item"
              {...buttonAttrs}
              data-item-custom1-value={variant.variation[0].option}
            >
              <span className="variantName">
                {variant.variation
                  .map((singleVariant) => `${singleVariant.option}`)
                  .join(' x ')}
              </span>
            </button>
            <span className="stock">{variant.stock} left</span>
          </div>
        ))}
      </div>
    </ProductStyles>
  );
}
