import styled from 'styled-components';

const Styles = styled.div`
  padding: 2rem;

  table {
    border-spacing: 0;
    border: 3px solid gray;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1.5px solid gray;
      border-right: 1.5px solid gray;

      :last-child {
        border-right: 0;
      }
    }
  }
`

export default Styles