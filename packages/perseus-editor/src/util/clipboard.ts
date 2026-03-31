import {PerseusWidgetsMap} from "@khanacademy/perseus-core";

export interface PerseusClipboardData {
    text: string;
    widgets: PerseusWidgetsMap;
}

export function setPerseusClipboardData({text, widgets}: PerseusClipboardData): Promise<void> {
    const dummyElement = document.createElement("span");
    dummyElement.setAttribute("data-perseus-widgets", JSON.stringify(widgets))

    console.log("set perseus clipboard data")
    return navigator.clipboard.write([
        new ClipboardItem({
            "text/plain": text,
            "text/html": dummyElement.outerHTML,
        })
    ])
}

export async function getPerseusClipboardData(): Promise<PerseusClipboardData> {
    const clipboardItems = await navigator.clipboard.read()

    let widgets: PerseusWidgetsMap = {};
    let text: string = "";
    for (const item of clipboardItems) {
        if (item.types.includes("text/html")) {
            const dummyDiv = document.createElement("span")
            dummyDiv.innerHTML = await item.getType("text/html").then(blob => blob.text())
            const widgetsJson = dummyDiv.querySelector("[data-perseus-widgets]")?.getAttribute("data-perseus-widgets")
            if (widgetsJson) {
                widgets = JSON.parse(widgetsJson);
            }
        }
        if (item.types.includes("text/plain")) {
            text = await item.getType("text/plain").then(blob => blob.text())
        }
    }
    console.log("get perseus clipboard data")

    return {widgets, text}
}
