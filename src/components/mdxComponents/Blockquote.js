import styled from 'styled-components';

const blockquote = styled.blockquote`
  border-left: 3px solid ${props => props.theme.yellow};
  padding-left: 1rem;
`;

export default blockquote;
