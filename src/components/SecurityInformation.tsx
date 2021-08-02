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
    const rows = Object.keys(securityInformation[0]).map((key) => (
        <tr>
            <th>{localise(localisationKey(key))}</th>
            <td>{securityInformation[0][key]}</td>
        </tr>
    ));
  
    return (
        <table>
            <tbody>
                {rows}
            </tbody>
        </table>
    );
}

export default SecurityInformation;