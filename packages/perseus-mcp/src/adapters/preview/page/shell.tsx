// The preview page for one draft (`/drafts/<itemId>/preview`): the draft's
// live preview, which shows its latest state without reloading.
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {DraftPreview} from "./draft-preview";
import styles from "./shell.module.css";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

function Shell({itemId}: {itemId: string}) {
    return (
        <View className={`${styles.root} ${styles.page}`}>
            <View tag="header" className={styles.header}>
                <Heading tag="h1" size="xlarge">
                    {`Preview of draft ${itemId}`}
                </Heading>
            </View>
            <View tag="main">
                <DraftPreview itemId={itemId} />
            </View>
        </View>
    );
}

// The page's path is /drafts/<itemId>/preview.
const itemId = decodeURIComponent(window.location.pathname.split("/")[2]);
createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <Shell itemId={itemId} />
    </RenderStateRoot>,
);
