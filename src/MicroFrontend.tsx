import React, { useState, useEffect, FunctionComponent } from "react";
import { sendBroadcast } from "./services/Broadcast";
import {
  quoteDoRequest,
  requestSecurityInformation,
  requestSecurityValidation,
} from "./services/ViewPointServices";
import SecurityCodePicker from "./components/SecurityCodePicker";
import SecurityInformation from "./components/SecurityInformation";
import QuoteData from './components/QuoteData';

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
  const [securityInformation, setSecurityInformation] = useState({isValid: false});
  const [quotes, setQuotes] = useState([]);

  const handleSecurityChange = async (securityCode: string) => {
    if (await requestSecurityValidation(securityCode)) {
      const securities = [securityCode];
      const updatedBroadcastPayload = currentBroadcastPayload;
      updatedBroadcastPayload.securities = securities;

      // update security
      setSecurity(securityCode);

      // load the security information
      setSecurityInformation(
        // await securityInformationGet(elemSelector, securityCode)
        await requestSecurityInformation(securityCode)
      );

      // load the quote information
      quoteDoRequest(securityCode, setQuotes);

      // update the broadcastPayload
      setCurrentBroadcastPayload(updatedBroadcastPayload);

      // send the broadcast
      sendBroadcast(elemSelector, updatedBroadcastPayload);
    }
  };

  const handleBroadcastChanged = async () => {
    const securityCode = broadcastSecurity();

    if (await requestSecurityValidation(security)) {
      // update the security code
      setSecurity(securityCode);

      // load the quote information
      quoteDoRequest(securityCode, setQuotes);

      // load the security information
      setSecurityInformation(
        await requestSecurityInformation(securityCode)
      );
    }
  };

  // there's some logic that combines security information and quote 
  // munge them together for the timebeing...
  const combinedData = () => ({...securityInformation as any, ...quotes[0] as any});

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
      {quotes && quotes.length > 0 && (
        <QuoteData 
          quote={combinedData()} 
        />
      )}
      {securityInformation && securityInformation.isValid && (
        <SecurityInformation
          className="micro-frontend__list-container"
          securityInformation={combinedData()}
        />
      )}
    </>
  );
};

export default MicroFrontend;
