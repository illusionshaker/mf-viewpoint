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

  const localise = (localizationKey: string): string => {
    return global?.IressTraderPlus?.UICore?.CultureInfo?.localize ? global.IressTraderPlus.UICore.CultureInfo.localize(localizationKey): localizationKey;
  };

  const handleBroadcastPaylodChange = (event: React.SyntheticEvent): void => {
    setCurrentBroadcastPayload(JSON.parse(event.target.value));
  }

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    console.log("we need to do something here...", currentBroadcastPayload);
  }

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
        <textarea 
          value={JSON.stringify(currentBroadcastPayload)} 
          onChange={handleBroadcastPaylodChange} 
          style={
            {
              width: "100%",
              height: "10%"
            }
          } 
        />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </>
  );
}

export default MicroFrontend;