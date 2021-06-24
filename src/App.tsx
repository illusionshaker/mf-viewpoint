import React from "react";
import MicroFrontend from "./MicroFrontend";
import "./index.scss";

const App = () => {
const columns = [
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
    }
]

const data = [{
  firstName: "Sam",
  lastName: "Face",
  age: 30,
  visits: 5,
  progress: 5,
  status:'relationship'
}]

return (
  <MicroFrontend widgetName = {"Person"} columns={columns} data={data}/>
)
}

export default App;
