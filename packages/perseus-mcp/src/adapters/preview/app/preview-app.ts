// The MCP Apps page for preview_item (a spike, to learn whether hosts let an
// app page frame http://localhost). It waits for the tool's result, which
// holds the preview's URL, and frames that page, saying what happened.
import {App} from "@modelcontextprotocol/ext-apps";

const status = document.getElementById("status")!;

function show(text: string) {
    status.textContent = text;
}

function previewUrlFrom(result: {
    content?: ReadonlyArray<{type: string; text?: string}>;
}): string | null {
    const text = result.content?.find((block) => block.type === "text")?.text;
    try {
        return JSON.parse(text ?? "").url ?? null;
    } catch {
        return null;
    }
}

const app = new App({name: "perseus-preview", version: "0.0.1"}, {});

app.ontoolresult = (result) => {
    const url = previewUrlFrom(result);
    if (url == null) {
        show("preview_item returned no URL: there's nothing to show.");
        return;
    }
    const frame = document.createElement("iframe");
    frame.src = url;
    frame.title = "Draft preview";
    frame.addEventListener("load", () =>
        show(
            `Loaded ${url}. If the preview shows below, this host lets the ` +
                "page frame the local server.",
        ),
    );
    document.body.append(frame);
    show(`Framing ${url}…`);
};

app.connect().then(
    () => show("Connected. Waiting for preview_item's result…"),
    (error: unknown) => show(`Couldn't connect to the host: ${String(error)}`),
);
