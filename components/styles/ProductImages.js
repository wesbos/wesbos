import styled from 'styled-components';

const ProductImages = styled.div`
  display: grid;
  grid-gap: 2rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  & > div {
    width: 100%;
  }
`;

export { ProductImages };
