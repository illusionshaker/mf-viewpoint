import React from "react";
import MicroFrontend from "./MicroFrontend";
import "./index.scss";

const broadcastPayload = {};

const App = () => {
  return (
    <MicroFrontend locale="en-au" broadcastPayload={broadcastPayload}/>
  )
}

export default App;
