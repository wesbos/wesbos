import styled from 'styled-components';

const TipStyles = styled.div`
  border-bottom: 2px solid ${props => props.theme.yellow};
  padding-bottom: 2rem;
  margin-bottom: 2rem;
  display: grid;
  grid-template-columns: 400px 1fr;
  align-items: center;
  .tipContent {
    padding: 2rem;
  }
  p {
    font-size: 2rem;
    line-height: 1.2;
  }
`;

export default TipStyles;
