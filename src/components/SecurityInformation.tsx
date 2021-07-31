import React, { FunctionComponent } from 'react';

export interface ISecurityInformationProps {
    securityInformation: any;
}

const SecurityInformation: FunctionComponent<ISecurityInformationProps> = (
  props: ISecurityInformationProps
) => {
    const { securityInformation } = props;
    
    const rows = Object.keys(securityInformation).map((key) => (
        <tr>
            <th>{key}</th>
            <td>{securityInformation[key]}</td>
        </tr>
    ));
  
    return (
        <table>
            <tbody>
                {console.log(securityInformation)}{rows}
            </tbody>
        </table>
    );
}

export default SecurityInformation;