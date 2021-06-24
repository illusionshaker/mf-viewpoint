import React from "react";
import Styles from './Styles';
import Header from "./Header";
import Table from "./DataTable";
import "./index.scss";

function MicroFrontend () {
  const widgetName = "Order Details Widget";
  const columns =  [
    {
      Header: 'Account',
      columns: [
        {
          Header: 'Account Name',
          accessor: 'accountName',
        }
      ],
    },
    {
      Header: 'Order Details',
      columns: [
        {
          Header: 'Created',
          accessor: 'created',
        },
        {
          Header: 'Order Number',
          accessor: 'orderNum',
        },
        {
          Header: 'Status',
          accessor: 'status',
        },
      ],
    },
  ];
    
  const data = [{
    accountName: "testing@iress",
    created: "2021-06-11 10:25:02",
    orderNum: 123456,
    status:'created'
  },
  {
    accountName: "testing@iress",
    created: "2021-06-22 08:15:02",
    orderNum: 1000122,
    status:'fully filled'
  }];

  return (
    <Styles>
      <div>
        <Header widgetName={widgetName} />
      </div>
      <Table columns={columns} data={data} />
    </Styles>
  );
}

export default MicroFrontend;