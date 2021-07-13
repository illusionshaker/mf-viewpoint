import React from "react";
import MicroFrontend from "./MicroFrontend";
import "./index.scss";

const broadcastPayload = {};
const MF_BROADCAST_RECEIVED = "mf-broadcast-received";

const App = () => {
  const [payload, setPayload] = React.useState(broadcastPayload);
  const [count, setCount] = React.useState(0);

  const handleBroadcastReceived = (event: CustomEvent) => {
    // document.querySelector("#app").dispatchEvent(new CustomEvent("mf-broadcast-received", {detail: {payload: {securityCodes: ["NAB.ASX"]}}}));
    setPayload(event.detail.payload);
    setCount(count + 1);
  };

  // start listening for culture changed
  React.useEffect(() => {
    const elem = document.querySelector("#app");

    if (elem) {
      elem.addEventListener(MF_BROADCAST_RECEIVED, handleBroadcastReceived);

      // cleanup after component has been removed
      return () => {
        elem.removeEventListener(MF_BROADCAST_RECEIVED, handleBroadcastReceived);
      };
    }

    console.log("payload", payload)
  }, [handleBroadcastReceived]);

  return (
    <div id="#app">
      event triggered {count} times
      event payload {JSON.stringify(payload)}
      <MicroFrontend locale="en-au" broadcastPayload={payload} elemSelector={"dummy-selector"}/>
    </div>
  )
}

export default App;
