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

// securityInformationGet API
export const securityInformationGet = async (widget: string, securityCode: string) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        const results = await global?.mfviewpoint[widget]?.securityInformationGetDoRequest(securityCode);

        if(results?.data?.information) {
            return results.data.information;
        }
    }
};

// this is an updating request / listener
export const quoteDoRequest = (widget: string, securityCode: string, quoteCallback: any) => {
    if(isVPServicesAvailable()) {

        const callback = (event: any) => quoteReceivedCallback(event, quoteCallback);

        // @ts-ignore
        global?.mfviewpoint[widget]?.quoteDoRequest(securityCode, callback);
    }
};

// TODO: generating requests for quote results in "Message targetID / controller targetID mismatch" error
export const quoteRequest = (targetID: string, securityCode: string, quoteCallback: any) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        const controller = global.IressTraderPlus.IocFactory.container.resolve("_quoteScreenController");

        // generate the input to make the request
        const input = quoteInput(targetID, securityCode);

        controller.quotesChanged.add((event: any) => quoteReceivedCallback(event, quoteCallback));

        controller.doRequest(input);
    }
};

// generalSearcherController.search()
export const generalSearcherControllerSearch = async (searchText: string) => new Promise((resolve) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        const controller = global.IressTraderPlus.IocFactory.container.resolve("_generalSearcherController");

        // generate the input to make the request
        const input = generalSearcherControllerInput(searchText);

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
const generalSearcherControllerInput = (searchText: string) => {
    if(isVPServicesAvailable()) {
        // @ts-ignore
        const input = new global.IressTraderPlus.BaseActionInput("_mf_viewpoint_");
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