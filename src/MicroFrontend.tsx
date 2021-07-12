import React, { useState, useEffect, FunctionComponent } from 'react';
import Styles from './Styles';
import Header from "./Header";
import Table from "./DataTable";
import "./index.scss";

export interface IMicroFrontendProps {
  locale: string,
  broadcastPayload: any,
}

const MicroFrontend: FunctionComponent<IMicroFrontendProps> = (
  props: IMicroFrontendProps
) => {
  const { locale, broadcastPayload } = props;
  const [ currentBroadcastPayload, setCurrentBroadcastPayload] = useState(broadcastPayload);
  const [ security, setSecurity ] = useState("");
  
  // just use the first security for the time being as our POC
  const currentSecurity = () => {
    let currentSecurity: string = "";
    if(broadcastPayload && broadcastPayload.securities && broadcastPayload.securities.length > 0) {
      currentSecurity =  broadcastPayload.securities[0];
    }
    return currentSecurity;
  };
  
  const localise = (localizationKey: string): string => {
    return global?.IressTraderPlus?.UICore?.CultureInfo?.localize ? global.IressTraderPlus.UICore.CultureInfo.localize(localizationKey): localizationKey;
  };

  const handleBroadcastPaylodChange = (event: React.SyntheticEvent): void => {
    const securities = [
      event.target.value
    ];
    setSecurity(event.target.value);
    const updatedBroadcastPayload = currentBroadcastPayload;
    updatedBroadcastPayload.securities = securities;
    setCurrentBroadcastPayload(updatedBroadcastPayload);
  }

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    console.log("we need to do something here...", currentBroadcastPayload);
  }

  useEffect(() => {
    // Update the document title using the browser API
    setSecurity(currentSecurity());
  });

  return (
    <>
      <p>Broadcast payload: {JSON.stringify(broadcastPayload)}</p>
      <p>Locale in micro frontend: <strong>{locale}</strong></p>
      <p>
        Translate in micro frontend "common.control.ok": <strong>{localise("common.control.ok")}</strong>
      </p>
      <form onSubmit={handleSubmit}>
        <label>Broadcast Payload:</label>
        <br />
        <select value={security} onChange={handleBroadcastPaylodChange}>
          <option>Select...</option>
          <option value="ANZ.ASX">ANZ.ASX</option>
          <option value="BHP.ASX">BHP.ASX</option>
          <option value="NAB.ASX">NAB.ASX</option>
        </select>
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default MicroFrontend;