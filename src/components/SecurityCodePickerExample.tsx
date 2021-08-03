import React, { FunctionComponent, useEffect, useState } from 'react';
import { generalSearcherControllerSearch } from '../services/ViewPointServices';

export interface ISecurityCodePickerProps {
  handleOnChange: (event: React.SyntheticEvent) => void;
  security: string;
}

const SecurityCodePickerExample: FunctionComponent<ISecurityCodePickerProps> = (
  props: ISecurityCodePickerProps
) => {
  const initialResults: [any] = [] as any;
  const { handleOnChange, security} = props;
  const [ results, setResults ] = useState(initialResults);
  const [ searchText, setSearchText ] = useState(security);

  const categories = results.map((categories) => categories.results);

  const options = categories.map((category) => category.map((result: any) => 
    <option value={result.watchlistCode}>{result.watchlistCode}</option>
  ));

  const handleOnSearchTextChange = async (event: React.SyntheticEvent) => {
    event.preventDefault();
    const searchText = event.target.value;
    setSearchText(searchText);

    // auto complete search based on the text
    const searchResult = await generalSearcherControllerSearch(searchText) as any;
    setResults(searchResult);
  };

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
      <input value={searchText} type="text" onChange={handleOnSearchTextChange} className="form-control" />
      <select onChange={handleOnSuggestionSelected} className="form-control">
        <option>Select...</option>
        {options}
      </select>
    </>
  );
}

export default SecurityCodePickerExample;