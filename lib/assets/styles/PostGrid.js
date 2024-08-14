'use client';

import { styled } from '@/styled-system/jsx';

const PostGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
`;

const PostGridItem = styled.div`
  display: grid;
  grid-template-columns: 30% 1fr;
  grid-gap: 3rem;
  border-block-end: 1px solid var(--yellow);
  padding: 4rem 0;
  ${(props) =>
    !props.hasImage &&
    `
    grid-template-columns: 1fr;
  `}
  @media (max-width: 800px) {
    grid-template-columns: 1fr;
  }
  h3 {
    margin-top: 0;
    margin-bottom: 0;
  }
  .postMeta {
    font-size: 1.1rem;
    display: grid;
    time {
      padding: 0.2rem 0;
    }
    ul {
      margin: 0;
      list-style: none;
      padding: 0;
      display: flex;
      li {
        background: var(--dark);
        display: inline;
        color: var(--light);
        padding: 2px;
        margin-right: 4px;
      }
    }
  }
`;

export { PostGridItem };
export default PostGrid;
