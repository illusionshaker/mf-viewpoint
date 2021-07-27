import React, { useState, useEffect, FunctionComponent } from 'react';
import AccountPicker from "./AccountPicker";
import BroadcastDebug from "./BroadcastDebug";
import SecurityCodePicker from './SecurityCodePicker';

export interface IMicroFrontendProps {
  locale: string,
  broadcastPayload: any,
  elemSelector: string,
}

const MicroFrontend: FunctionComponent<IMicroFrontendProps> = (
  props: IMicroFrontendProps
) => {
  const { locale, broadcastPayload, elemSelector } = props;
  const [ account, setAccount ] = useState()
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
  };

  const [ security, setSecurity ] = useState(currentSecurity());
  
  const handleAccountChange = (event: React.SyntheticEvent): void => {
    const account = event.target.value;
    setAccount(account);

    // do something with the account 
    console.log("account", account);
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
  };

  const handleBroadcastSubmit = (event: React.SyntheticEvent): void => {
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
  };

  useEffect(() => {
    // if the broadcast payload has changed update the security value
    setSecurity(broadcastSecurity());
  }, [broadcastPayload]);

  return (
    <>
      <p><strong>Account Picker Example</strong></p>
      <label>Account:</label>
      <AccountPicker account={account} handleOnChange={handleAccountChange}></AccountPicker>
      <hr />
      <p><strong>Broadcast Security Code Example</strong></p>
      <form onSubmit={handleBroadcastSubmit}>
        <label>Security Code:</label>
        <SecurityCodePicker security={security} handleOnChange={handleBroadcastPaylodChange}></SecurityCodePicker>
        <br />
        <input type="submit" value="Submit" className="form-control" />
      </form>
      <BroadcastDebug locale={locale} broadcastPayload={broadcastPayload} />
    </>
  );
}

export default MicroFrontend;