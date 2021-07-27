import React, { useState, useEffect, FunctionComponent } from 'react';

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
  const initialAccounts: [IAccount] = [] as any;
  const { account, handleOnChange } = props;
  const [ accounts, setAccounts ] = useState(initialAccounts);

  // HACK: POC code - do not do this in any the real implementation
  // we are caling PickerDataProvier.getRetailPickerItems in ViewPoint to retrieve a list of retail accounts
  const getRetailPickerItems = async () => {
    // data takes awhile to come back .. what happens if there are no accounts?
    if(global?.IressTraderPlus?.IocFactory?.container?.resolve && accounts.length === 0) {
      try {
        const items = await global.IressTraderPlus.IocFactory.container.resolve("_pickerDataProvider").getRetailPickerItems();
        setAccounts(items);
      }
      catch(e) {
        console.log("error", e);
      }
    }
  };

  const options = accounts.map(account => (
    <option value={account.accountCode}>{account.accountName}</option>
  ));

  useEffect(() => {
    // we need to wait while the data loads
    getRetailPickerItems();
  }, [accounts]);

  return (
    <select className="form-control" onChange={handleOnChange} value={account}>
      {options}
    </select>
  );
}

export default AccountPicker;