import React from "react";
import Styles from './Styles';
import Header from "./Header";
import Table from "./DataTable";
import "./index.scss";

function MicroFrontend ({ widgetName, columns, data }) {
    const defaultColumns =  [
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
      ]
    
    const defaultData = [{
      accountName: "testing@iress",
      created: "2021-06-11 10:25:02",
      orderNum: 123456,
      status:'created'
    }]

    return (
    <Styles>
        <div>
        <Header widgetName={widgetName || "Order Details Widget"}/>
      </div>
        <Table columns={columns || defaultColumns} data={data || defaultData} />
      </Styles>
    )
}

export default MicroFrontend;