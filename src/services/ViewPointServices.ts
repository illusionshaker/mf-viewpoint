// HACK: POC code - do not do this in any real implementation
const isVPServicesAvailable = () => {
    // @ts-ignore
    return global?.IressTraderPlus ? true : false;
}


// we are caling PickerDataProvier.getRetailPickerItems in ViewPoint to retrieve a list of retail accounts
export const getRetailPickerItems = async () => {
    // data takes awhile to come back .. what happens if there are no accounts?
    if(isVPServicesAvailable()) {
        // @ts-ignore
        return await global.IressTraderPlus.IocFactory.container.resolve("_pickerDataProvider").getRetailPickerItems();
    }
};

// validate the security
export const requestSecurityValidation = async (securityCode: string) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        return await global.IressTraderPlus.IocFactory.container.resolve("_securityValidationHelper").requestSecurityValidation(securityCode);
    }
};

// request information for a security
export const requestSecurityInformation = async (securityCode: string) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        return await global.IressTraderPlus.IocFactory.container.resolve("_securityInformationHelper").requestSecurityInformation(securityCode);
    }
};

export const generalSearcherSearch = async (searchText: string) => new Promise((resolve) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        let gsc = global.IressTraderPlus.IocFactory.container.resolve("_generalSearcherController");
        
        // generate the input to make the request
        const input = requestInput(searchText);

        gsc.resultReceived.add((event: any) => {

            // match the request and the results category
            // first response seems to come back with a large list of empty results
            if(
                input.header.targetID === event.header.targetID &&
                input.header.requestID === event.header.requestID &&
                input.data.categories[0] === event.data.dataRows[0].category
            ) {
                resolve(event.data.dataRows);
            }
        });

        gsc.search(input);
    }
});

// generated the input data for the search request
const requestInput = (searchText: string) => {
    if(isVPServicesAvailable()) {
      // @ts-ignore
      const input = new global.IressTraderPlus.BaseActionInput("_mf_viewpoint");
      input.data = {
        categories: [4],
        deferMode: true,
        maxRowCount: 15,
        searchOnEmpty: false,
        text: searchText,
      };

      return input;
    }
};