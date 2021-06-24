import React from "react";
import Styles from './Styles';
import Header from "./Header";
import Table from "./DataTable";
import "./index.scss";


const App = () => {
const columns = React.useMemo(
  () => [
    {
      Header: 'Name',
      columns: [
        {
          Header: 'First Name',
          accessor: 'firstName',
        },
        {
          Header: 'Last Name',
          accessor: 'lastName',
        },
      ],
    },
    {
      Header: 'Info',
      columns: [
        {
          Header: 'Age',
          accessor: 'age',
        },
        {
          Header: 'Visits',
          accessor: 'visits',
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
        {
          Header: 'Profile Progress',
          accessor: 'progress',
        },
      ],
    },
  ],
  []
)

// const data = React.useMemo(() => makeData(20), [])
const data = [{
  firstName: "Sam",
  lastName: "Face",
  age: 30,
  visits: 5,
  progress: 5,
  status:'relationship'
}]

return (
  
  <Styles>
    <div>
    <Header />
    <div>I'm the header app</div>
  </div>
    <Table columns={columns} data={data} />
  </Styles>
)
}

export default App;
