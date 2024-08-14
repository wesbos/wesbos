import { styled } from '@/styled-system/jsx';

const PostHeaderStyles = styled.header`
  h1 {
    margin-bottom: 0;
  }
  .postMeta {
    font-size: 1.4rem;
    font-style: italic;
    display: grid;
    grid-gap: 1rem;
    grid-auto-flow: column;
    justify-content: start;
    & > * {
      :not(:last-child):after {
        content: '×';
        margin-left: 1rem;
        color: var(--yellow);
        font-weight: 600;
        font-style: normal;
      }
    }
  }
`;

export default PostHeaderStyles;
