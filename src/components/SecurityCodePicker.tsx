import React, { FunctionComponent, useEffect, useState } from 'react';
import AsyncSelect from "react-select/async";
import { generalSearcherSearch } from './../services/ViewPointServices';

export interface ISecurityCodePickerProps {
  handleOnChange: (event: React.SyntheticEvent) => void;
  security: string;
}

const SecurityCodePicker: FunctionComponent<ISecurityCodePickerProps> = (
  props: ISecurityCodePickerProps
) => {
  const { handleOnChange, security} = props;
  const [ searchText, setSearchText ] = useState(security);

  const handleOnSearchTextChange = (searchText: string) => {
    setSearchText(searchText);
  };

  const handleLoadOptions = async () => {
    const results: any = await generalSearcherSearch(searchText);
    const categories = results.map((categories: any) => categories.results);
    const options = categories.map((category: any) => category.map((result: any) => (
      { value: result.watchlistCode, label: result.watchlistCode }
    )));
    return options[0];
  };

  const handleOnSelectChange = (selectedOption: any) => {
    if(selectedOption) {
      handleOnChange(selectedOption.value)
    }
  }

  const handleOnSuggestionSelected = (event: React.SyntheticEvent) => {
    event.preventDefault();

    // update the search text
    setSearchText( event.target.value);

    // event handler in parent
    handleOnChange(event);
  };

  useEffect(() => {
    setSearchText(security);
  }, [security])

  return (
    <>
      <AsyncSelect
        cacheOptions
        loadOptions={handleLoadOptions}
        inputValue={searchText}
        isClearable={true}
        onChange={handleOnSelectChange}
        onInputChange={handleOnSearchTextChange}
      />
    </>
  );
}

export default SecurityCodePicker;