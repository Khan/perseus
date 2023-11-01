function sendToPerseusExt(messageType, payload) {
    console.log("sendToPerseusExt");
    window.postMessage(
        {
            source: "perseus-ext",
            messageType,
            payload,
        },
        "*",
    );
}

export function reportRendererItem(item) {
    sendToPerseusExt("renderer-item", item);
}

export function reportPerseusVersions(versions) {
    sendToPerseusExt("perseus-versions", versions);
}
