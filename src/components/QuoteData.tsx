import React, { FunctionComponent } from 'react';
import "./QuoteData.scss";

export interface IQuoteDataProps {
  quote: any;
}

const QuoteData: FunctionComponent<IQuoteDataProps> = (
  props: IQuoteDataProps
) => {

  const { quote } = props;

  // copied from SecurityInfoWidget
  const arrowClass = () => {
    if (quote.movement < 0) {
        return "fa fa-caret-down";
    } else if (quote.movement > 0) {
        return "fa fa-caret-up";
    } else {
        return "fa fa-minus";
    }
  };

  const priceClass = () => {
    if (quote.movement < 0) {
      return "movement flex-wrapper last-price-down";
    } else if (quote.movement > 0) {
        return "movement flex-wrapper last-price-up";
    } else {
        return "movement flex-wrapper last-price-neutral";
    }
  };

  // so it appears that quote and securityInformation are munged together
  return (
    <div className="container-ver">
      <div className="desc-movement-wrapper">
        <div className="security-description-fields">
            <div className="security-description truncate-ellipsis">{quote.issuerName}</div>
            <div className="security-type truncate-ellipsis">{quote.quotedSecurityIndicator}</div>
            <div className="sub-industry truncate-ellipsis">{quote.subIndustryDescription}</div>
        </div>
        <div className={priceClass()}>
          <div className="direction-price">
              <i className={arrowClass()}></i>
              <div className="last-price">{quote.lastPrice}</div>
          </div>
          <div className="inline-movement-data">
            <div aria-label="movement price">{quote.movement}</div>
            (
              <div aria-label="movement percent">{quote.movementPercent}</div>
            )
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuoteData;