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

export const quoteDoRequest = (securityCode: string, quoteCallback: any, targetID: string) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        const controller = global.IressTraderPlus.IocFactory.container.resolve("_quoteScreenController");

        // @ts-ignore
        controller.clear(new global.IressTraderPlus.BaseActionInput(targetID !== "" ? targetID : controller.targetID));

        // generate the input to make the request
        const input = quoteInput(controller.targetID, securityCode);

        controller.quotesChanged.add((event: any) => quoteReceivedCallback(event, quoteCallback));

        controller.doRequest(input);

        return controller.targetID;
    }
};

// generalSearcherController.search()
export const generalSearcherControllerSearch = async (searchText: string) => new Promise((resolve) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        const controller = global.IressTraderPlus.IocFactory.container.resolve("_generalSearcherController");

        // generate the input to make the request
        const input = generalSearcherControllerInput(controller.targetID, searchText);

        controller.resultReceived.add((event: any) => {

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

        controller.search(input);
    }
});

// generated the input data for the search request
const generalSearcherControllerInput = (targetID: string, searchText: string) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        const input = new global.IressTraderPlus.BaseActionInput(targetID);
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

const quoteInput = (targetID: string, securityFullCode: string) => {
    const columns = [
        "securityCode",
        "exchange",
        "issuerName",
        "quotedSecurityIndicator",
        "subIndustryDescription",
        "securityType",
        "industryGroupDescription",
        "firstListedDate",
        "quotedSharesOnIssue",
        "marketCapitalisation",
        "earningsPerShare",
        "yearlyDividend",
        "netAssetBacking",
        "earningsPerShare",
        "currencyCode",
        "isin",
        "lastListedDate",
        "suspensionDate",
        "movement",
        "movementPercent",
        "lastPrice",
        "calcDivYearly",
    ];

    if(isVPServicesAvailable()) {
        // @ts-ignore
        const input = new global.IressTraderPlus.Market.QuoteScreenActionMessages.DoRequestInput(
            // @ts-ignore
            new global.IressTraderPlus.BaseActionInputHeader(targetID),
            {
                securityFullCode: [securityFullCode],
                columns: columns,
            },
        );

        return input;
    }
}

const quoteReceivedCallback = (event: any, quoteCallback: any) => {
    if(event?.data?.quotes) {
        quoteCallback(event.data.quotes); 
    }
};