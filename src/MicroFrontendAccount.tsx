import React, { useState, FunctionComponent } from 'react';
import AccountPicker from "./components/AccountPicker";

export interface IMicroFrontendAccountProps {
  locale: string,
  broadcastPayload: any,
  elemSelector: string,
}

const MicroFrontendAccount: FunctionComponent<IMicroFrontendAccountProps> = (
  props: IMicroFrontendAccountProps
) => {
  const { locale, broadcastPayload, elemSelector } = props;
  const [ account, setAccount ] = useState();
  
  const handleAccountChange = (event: React.SyntheticEvent): void => {
    const account = event.target.value;
    setAccount(account);

    // do something with the account 
    console.log("account", account);
  };

  return (
    <>
      <label>Account:</label>
      <AccountPicker account={account} handleOnChange={handleAccountChange}></AccountPicker>
    </>
  );
}

export default MicroFrontendAccount;