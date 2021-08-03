import React, { FunctionComponent } from 'react';

export interface IQuoteDataProps {
  quote: any;
}

const QuoteData: FunctionComponent<IQuoteDataProps> = (
  props: IQuoteDataProps
) => {

  const { quote } = props;

  // so it appears that quote and securityInformation are munged together
  return (
      <>
        <div>
          <div>{quote.issuerName}</div>
          <div>{quote.quotedSecurityIndicator}</div>
          <div>{quote.subIndustryDescription}</div>
        </div>
        <div>
          <div>{quote.lastPrice}</div>
          <div>{quote.movement} ({quote.movementPercent})</div>
        </div>
      </>
  );
}

export default QuoteData;