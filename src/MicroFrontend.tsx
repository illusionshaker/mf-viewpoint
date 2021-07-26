import React, { useState, useEffect, FunctionComponent } from 'react';

export interface IMicroFrontendProps {
  locale: string,
  broadcastPayload: any,
  elemSelector: string,
}

const MicroFrontend: FunctionComponent<IMicroFrontendProps> = (
  props: IMicroFrontendProps
) => {
  const { locale, broadcastPayload, elemSelector } = props;
  const [ currentBroadcastPayload, setCurrentBroadcastPayload] = useState(broadcastPayload);
  
  // just use the first security for the time being as our POC
  const currentSecurity = () => {
    let currentSecurity: string = "";
    if(currentBroadcastPayload && currentBroadcastPayload.securities && currentBroadcastPayload.securities.length > 0) {
      currentSecurity = currentBroadcastPayload.securities[0];
    }
    return currentSecurity;
  };

  const broadcastSecurity = () => {
    let currentSecurity: string = "";
    if(broadcastPayload && broadcastPayload.securities && broadcastPayload.securities.length > 0) {
      currentSecurity = broadcastPayload.securities[0];
    }
    return currentSecurity;
  }

  const [ security, setSecurity ] = useState(currentSecurity());
  
  const localise = (localizationKey: string): string => {
    return global?.IressTraderPlus?.UICore?.CultureInfo?.localize ? global.IressTraderPlus.UICore.CultureInfo.localize(localizationKey): localizationKey;
  };

  const handleBroadcastPaylodChange = (event: React.SyntheticEvent): void => {
    const securities = [
      event.target.value
    ];
    const updatedBroadcastPayload = currentBroadcastPayload;
    updatedBroadcastPayload.securities = securities;

    // update security
    setSecurity(securities[0]);
    // update broadcast payload to be sent
    setCurrentBroadcastPayload(updatedBroadcastPayload);
  }

  const handleSubmit = (event: React.SyntheticEvent): void => {
    event.preventDefault();
    const elem = document.querySelector("#app");
    if(elem) {
      elem.dispatchEvent(
        new CustomEvent("mf-broadcast-send", {
            detail: {
                elemSelector: `${elemSelector}`, // element we want target
                payload: currentBroadcastPayload, // broadcast payload
            },
        }),
      );

      console.log("we need to do something here...", currentBroadcastPayload);
    }
  }

  useEffect(() => {
    // if the broadcast payload has changed update the security value
    setSecurity(broadcastSecurity());
  }, [broadcastPayload]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <p>Hello All</p>
        <label>Security Code:</label>
        <br />
        <select value={security} onChange={handleBroadcastPaylodChange} className="form-control">
          <option>Select...</option>
          <option value="ANZ.ASX">ANZ.ASX</option>
          <option value="BHP.ASX">BHP.ASX</option>
          <option value="NAB.ASX">NAB.ASX</option>
        </select>
        <br />
        <input type="submit" value="Submit" className="form-control" />
      </form>
      <hr />
      <table>
        <tr>
          <th align="left">Broadcast Payload</th>
          <td>{JSON.stringify(broadcastPayload)}</td>
        </tr>
        <tr> 
          <th align="left">Locale</th>
          <td>{locale}</td>
        </tr>
        <tr>
          <th align="left">Translation of "common.control.ok"</th>
          <td>{localise("common.control.ok")}</td>
        </tr>
      </table>
    </>
  );
}

export default MicroFrontend;