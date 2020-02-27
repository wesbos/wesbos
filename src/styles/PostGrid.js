import styled from 'styled-components';

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const PostGridItem = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 3rem;
  border-block-end: 1px solid black;
  padding: 2rem 0;
`;

export { PostGridItem };
export default PostGrid;
