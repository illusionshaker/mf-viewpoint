import React, { FunctionComponent } from "react";
import { localise } from "../services/Localise";

export interface ISecurityInformationProps {
  securityInformation: any;
  className: string;
}

const SecurityInformation: FunctionComponent<ISecurityInformationProps> = (
  props: ISecurityInformationProps
) => {
  const { securityInformation, className } = props;

  const localisationKey = (key: string) => `column.${key}`;

  // TODO: there's a bunch of rows not rendered - figure out which ones to exclude see SecurityInfoGridRows.ts
  const {
    securityTypeCode,
    firstListedDate,
    quotedSharesOnIssue,
    marketCapitalisation,
    earningsPerShare,
    yearlyDividend,
    priceToEarnings,
    priceToAsset,
    currencyDenomination,
    currencyCode,
    isin,
    lastListedDate,
    suspensionDate,
    liquidityFactor,
    gicsCode,
    gicsSector,
    gicsIndustryGroup,
    gicsIndustry,
    gicsSubIndustry,
    lotSize,
  } = securityInformation[0];
  const securityYeild = securityInformation[0].yeild;
  return (
    <div className={className}>
      <dl>
        <div className="data-list-group">
          <dt>{localise(localisationKey("securityTypeCode"))}</dt>
          <dd>{securityTypeCode}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("firstListedDate"))}</dt>
          <dd>{firstListedDate}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("quotedSharesOnIssue"))}</dt>
          <dd>{quotedSharesOnIssue}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("marketCapitalisation"))}</dt>
          <dd>{marketCapitalisation}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("earningsPerShare"))}</dt>
          <dd>{earningsPerShare}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("yearlyDividend"))}</dt>
          <dd>{yearlyDividend}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("priceToEarnings"))}</dt>
          <dd>{priceToEarnings}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("priceToAsset"))}</dt>
          <dd>{priceToAsset}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("yield"))}</dt>
          <dd>{securityYeild}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("currencyDenomination"))}</dt>
          <dd>{currencyDenomination}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("currencyCode"))}</dt>
          <dd>{currencyCode}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("isin"))}</dt>
          <dd>{isin}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("lastListedDate"))}</dt>
          <dd>{lastListedDate}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("lastListedDate"))}</dt>
          <dd>{lastListedDate ? lastListedDate : "-"}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("suspensionDate"))}</dt>
          <dd>{suspensionDate ? suspensionDate : "-"}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("liquidityFactor"))}</dt>
          <dd>{liquidityFactor}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("gicsCode"))}</dt>
          <dd>{gicsCode}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("gicsSector"))}</dt>
          <dd>{gicsSector}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("gicsIndustryGroup"))}</dt>
          <dd>{gicsIndustryGroup}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("gicsIndustry"))}</dt>
          <dd>{gicsIndustry}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("gicsSubIndustry"))}</dt>
          <dd>{gicsSubIndustry}</dd>
        </div>
        <div className="data-list-group">
          <dt>{localise(localisationKey("lotSize"))}</dt>
          <dd>{lotSize ? lotSize : "-"}</dd>
        </div>
      </dl>
    </div>
  );
};

export default SecurityInformation;
