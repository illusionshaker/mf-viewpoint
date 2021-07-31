import React, { FunctionComponent } from 'react';
import { localise } from './../services/Localise';

export interface IBroadcastDebugProps {
  broadcastPayload: any;
  locale: string;
}

const BroadcastDebug: FunctionComponent<IBroadcastDebugProps> = (
  props: IBroadcastDebugProps
) => {
  const { broadcastPayload, locale } = props;

  return (
    <table>
        <tbody>
          <tr>
            <th align="left">Broadcast Payload</th>
            <td>{JSON.stringify(broadcastPayload)}</td>
          </tr>
          <tr> 
            <th align="left">Locale</th>
            <td>{locale}</td>
          </tr>
          <tr>
            <th align="left">Translation of "common.control.ok"</th>
            <td>{localise("common.control.ok")}</td>
          </tr>
        </tbody>
      </table>
  );
}

export default BroadcastDebug;