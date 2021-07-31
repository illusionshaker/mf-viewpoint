export const sendBroadcast = (elemSelector: string, broadcastPayload: any) => {
    const elem = document.querySelector("#app");
    if(elem) {
        elem.dispatchEvent(
            new CustomEvent("mf-broadcast-send", {
                detail: {
                    elemSelector: `${elemSelector}`, // element we want target
                    payload: broadcastPayload, // broadcast payload
                },
            }),
        );
    }
};