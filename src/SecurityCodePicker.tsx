import React, { FunctionComponent } from 'react';

export interface ISecurityCodePickerProps {
  handleOnChange: (event: React.SyntheticEvent) => void;
  security: string;
}

const SecurityCodePicker: FunctionComponent<ISecurityCodePickerProps> = (
  props: ISecurityCodePickerProps
) => {
  const { handleOnChange, security} = props;  

  // hard code some security codes for the time being so we can broadcast out
  return (
    <select value={security} onChange={handleOnChange} className="form-control">
        <option>Select...</option>
        <option value="ANZ.ASX">ANZ.ASX</option>
        <option value="BHP.ASX">BHP.ASX</option>
        <option value="NAB.ASX">NAB.ASX</option>
    </select>
  );
}

export default SecurityCodePicker;