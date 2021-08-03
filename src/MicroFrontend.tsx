import React, { useState, useEffect, FunctionComponent } from "react";
import { sendBroadcast } from "./services/Broadcast";
import {
  requestSecurityValidation,
  securityInformationGet,
} from "./services/ViewPointServices";
import SecurityCodePicker from "./components/SecurityCodePicker";
import SecurityInformation from "./components/SecurityInformation";

export interface IMicroFrontendProps {
  locale: string;
  broadcastPayload: any;
  elemSelector: string;
}

const MicroFrontend: FunctionComponent<IMicroFrontendProps> = (
  props: IMicroFrontendProps
) => {
  const { broadcastPayload, elemSelector } = props;
  const [currentBroadcastPayload, setCurrentBroadcastPayload] =
    useState(broadcastPayload);

  // just use the first security for the time being as our POC
  const currentSecurity = () => {
    let currentSecurity: string = "";
    if (
      currentBroadcastPayload &&
      currentBroadcastPayload.securities &&
      currentBroadcastPayload.securities.length > 0
    ) {
      currentSecurity = currentBroadcastPayload.securities[0];
    }
    return currentSecurity;
  };

  const broadcastSecurity = () => {
    let currentSecurity: string = "";
    if (
      broadcastPayload &&
      broadcastPayload.securities &&
      broadcastPayload.securities.length > 0
    ) {
      currentSecurity = broadcastPayload.securities[0];
    }
    return currentSecurity;
  };

  const [security, setSecurity] = useState(currentSecurity());
  const [securityInformation, setSecurityInformation] = useState([]);

  const handleSecurityChange = async (securityCode: string) => {
    if (await requestSecurityValidation(securityCode)) {
      const securities = [securityCode];
      const updatedBroadcastPayload = currentBroadcastPayload;
      updatedBroadcastPayload.securities = securities;

      // update security
      setSecurity(securityCode);

      // load the security information
      setSecurityInformation(
        await securityInformationGet(elemSelector, securityCode)
      );

      // update the broadcastPayload
      setCurrentBroadcastPayload(updatedBroadcastPayload);

      // send the broadcast
      sendBroadcast(elemSelector, updatedBroadcastPayload);
    }
  };

  const handleBroadcastChanged = async () => {
    const security = broadcastSecurity();

    if (await requestSecurityValidation(security)) {
      // update the security code
      setSecurity(security);

      // load the security information
      setSecurityInformation(
        await securityInformationGet(elemSelector, security)
      );
    }
  };

  useEffect(() => {
    // if the broadcast payload has changed update the security value
    handleBroadcastChanged();
  }, [broadcastPayload]);

  return (
    <>
      <SecurityCodePicker
        security={security}
        handleOnChange={handleSecurityChange}
      ></SecurityCodePicker>
      {securityInformation && securityInformation.length > 0 && (
        <SecurityInformation
          className="micro-frontend__list-container"
          securityInformation={securityInformation}
        />
      )}
    </>
  );
};

export default MicroFrontend;
