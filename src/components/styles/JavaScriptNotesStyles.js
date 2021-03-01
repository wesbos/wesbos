import styled from 'styled-components';

const JavaScriptNotesStyles = styled.div`
  display: grid;
  grid-template-columns: 60ch;
  grid-template-areas: 'post';

  @media (min-width: 1600px) {
    grid-template-columns: minmax(240px, 450px) 60ch;
    position: relative;
    grid-template-areas: 'toc post aside';
    gap: 20rem;
  }
`;

export default JavaScriptNotesStyles;
