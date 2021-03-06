import React, { useState, useEffect, FunctionComponent } from 'react';
import { getRetailPickerItems } from "./../services/ViewPointServices";

export interface IAccountPickerProps {
  account?: string;
  handleOnChange: (event: React.SyntheticEvent) => void;
}

// taken from IPickerDataProvider.d.ts
export interface IAccount {
  isSelectAllItem: boolean;
  iosName: string;
  accountCode: string;
  accountName: string;
  accountDesignation: string;
  hasPortfolio: boolean;
  /** Will be undefined if `hasPortfolio === false`. */
  portfolioCode: string;
  /** Will be undefined if `hasPortfolio === false`. */
  portfolioName: string;
}

const AccountPicker: FunctionComponent<IAccountPickerProps> = (
  props: IAccountPickerProps
) => {
  const loadingTime = 1000; // accounts take while to load - see RootReducer.ts
  const initialAccounts: [IAccount] = [] as any;
  const { account, handleOnChange } = props;
  const [ accounts, setAccounts ] = useState(initialAccounts);

  // HACK: POC code - do not do this in any real implementation
  // we are caling PickerDataProvier.getRetailPickerItems in ViewPoint to retrieve a list of retail accounts
  const getPickerItems = async () => {
      if(accounts.length as Number === 0) {
        const items = await getRetailPickerItems();
        if(items) {
          setAccounts(items);
        }
      }
  };

  const options = accounts.map(account => (
    <option value={account.accountCode}>{account.accountName}</option>
  ));

  useEffect(() => {
    // we need to wait while the data loads
    setTimeout(getPickerItems, loadingTime);
  }, [accounts]);

  return (
    <select className="form-control" onChange={handleOnChange} value={account}>
      {options}
    </select>
  );
}

export default AccountPicker;