import styled from 'styled-components';

const Table = styled.table`
  border: 1px solid ${(props) => props.theme.grey};
  border-radius: 3px;
  padding: 1rem;
  border-collapse: collapse;
  td,
  th {
    border: 1px solid ${(props) => props.theme.grey};
    padding: 10px;
  }
`;

export default Table;
