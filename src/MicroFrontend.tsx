import React from "react";
import Styles from './Styles';
import Header from "./Header";
import Table from "./DataTable";
import "./index.scss";

function MicroFrontend ({ widgetName, columns, data }) {
    return (
    <Styles>
        <div>
        <Header widgetName={widgetName}/>
      </div>
        <Table columns={columns} data={data} />
      </Styles>
    )
}

export default MicroFrontend;