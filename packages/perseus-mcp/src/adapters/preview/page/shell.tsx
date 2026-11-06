// The preview page for one draft (`/drafts/<itemId>/preview`): the draft's
// live preview, which shows its latest state without reloading.
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {DraftPreview} from "./draft-preview";
import {PageHeader} from "./page-header";
import styles from "./page-layout.module.css";
import {StatusBar} from "./status-bar";

import type {DraftStatus} from "./draft-preview";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

function Shell({itemId}: {itemId: string}) {
    const [status, setStatus] = React.useState<DraftStatus>({
        connection: "connecting",
        revision: null,
    });
    return (
        <div className={styles.app}>
            <PageHeader
                title={`Draft ${itemId}`}
                subtitle="As learners see it"
                back={{href: "/exercises", label: "All exercises"}}
            />
            <main className={styles.main}>
                <DraftPreview itemId={itemId} onStatus={setStatus} />
            </main>
            <StatusBar
                summary={
                    status.revision == null
                        ? `Draft ${itemId}`
                        : `Draft ${itemId}, revision ${status.revision}`
                }
                connection={status.connection}
            />
        </div>
    );
}

// The page's path is /drafts/<itemId>/preview.
const itemId = decodeURIComponent(window.location.pathname.split("/")[2]);
createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <Shell itemId={itemId} />
    </RenderStateRoot>,
);
