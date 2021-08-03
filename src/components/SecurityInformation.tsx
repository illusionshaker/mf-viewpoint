import React, { FunctionComponent } from 'react';
import { localise } from '../services/Localise';

export interface ISecurityInformationProps {
    securityInformation: any;
}

const SecurityInformation: FunctionComponent<ISecurityInformationProps> = (
  props: ISecurityInformationProps
) => {
    const { securityInformation } = props;

    const localisationKey = (key: string) => `column.${key}`;
    
    // TODO: there's a bunch of rows not rendered - figure out which ones to exclude see SecurityInfoGridRows.ts
    const  {
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
        <table>
            <tbody>
            <tr>
                <th>{localise(localisationKey('securityTypeCode'))}</th>
                <td>{securityTypeCode}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('firstListedDate'))}</th>
                <td>{firstListedDate}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('quotedSharesOnIssue'))}</th>
                <td>{quotedSharesOnIssue}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('marketCapitalisation'))}</th>
                <td>{marketCapitalisation}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('earningsPerShare'))}</th>
                <td>{earningsPerShare}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('yearlyDividend'))}</th>
                <td>{yearlyDividend}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('priceToEarnings'))}</th>
                <td>{priceToEarnings}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('priceToAsset'))}</th>
                <td>{priceToAsset}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('yield'))}</th>
                <td>{securityYeild}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('currencyDenomination'))}</th>
                <td>{currencyDenomination}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('currencyCode'))}</th>
                <td>{currencyCode}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('isin'))}</th>
                <td>{isin}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('lastListedDate'))}</th>
                <td>{lastListedDate}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('lastListedDate'))}</th>
                <td>{lastListedDate ? lastListedDate : '-'}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('suspensionDate'))}</th>
                <td>{suspensionDate? suspensionDate : '-'}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('liquidityFactor'))}</th>
                <td>{liquidityFactor}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('gicsCode'))}</th>
                <td>{gicsCode}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('gicsSector'))}</th>
                <td>{gicsSector}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('gicsIndustryGroup'))}</th>
                <td>{gicsIndustryGroup}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('gicsIndustry'))}</th>
                <td>{gicsIndustry}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('gicsSubIndustry'))}</th>
                <td>{gicsSubIndustry}</td>
            </tr>
            <tr>
                <th>{localise(localisationKey('lotSize'))}</th>
                <td>{lotSize ? lotSize : '-'}</td>
            </tr>
            </tbody>
        </table>
    );
}

export default SecurityInformation;