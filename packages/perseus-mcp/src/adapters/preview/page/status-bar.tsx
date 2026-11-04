// The bar at the bottom of the browser pages: what the page shows on the left,
// and the connection to perseus-mcp on the right.
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import circleNotchSvg from "@phosphor-icons/core/regular/circle-notch.svg?raw";
import wifiHighSvg from "@phosphor-icons/core/regular/wifi-high.svg?raw";
import wifiSlashSvg from "@phosphor-icons/core/regular/wifi-slash.svg?raw";
import * as React from "react";

import styles from "./page-layout.module.css";

export type Connection = "connecting" | "open" | "lost";

/**
 * The icon as a data URL, in the page's script. An icon file is fetched when
 * it's first shown, and the lost connection's icon is first shown once the
 * server is gone. Base64, because PhosphorIcon puts the URL in an unquoted
 * CSS `url()`, which the spaces and quotes of a plain SVG data URL break.
 */
function dataUrl(svg: string): string {
    return `data:image/svg+xml;base64,${btoa(svg)}`;
}

const CONNECTIONS = {
    connecting: {icon: dataUrl(circleNotchSvg), text: "Connecting…"},
    open: {
        icon: dataUrl(wifiHighSvg),
        text: "Live: updates as the draft changes",
    },
    // EventSource reconnects by itself.
    lost: {
        icon: dataUrl(wifiSlashSvg),
        // A restarted server is on another port, so this page can't find it.
        text:
            "Lost the connection to perseus-mcp. Reconnecting… If it " +
            "restarted, ask Claude for a new preview link.",
    },
} as const;

/** The worst of several connections: lost, then connecting, then open. */
export function worstConnection(...connections: Connection[]): Connection {
    return connections.includes("lost")
        ? "lost"
        : connections.includes("connecting")
          ? "connecting"
          : "open";
}

export function StatusBar({
    summary,
    connection,
}: {
    summary: string;
    connection: Connection;
}) {
    const {icon, text} = CONNECTIONS[connection];
    return (
        <footer className={styles.statusBar}>
            <BodyText size="small">{summary}</BodyText>
            <BodyText
                size="small"
                role="status"
                className={`${styles.connection} ${connection === "lost" ? styles.lost : ""}`}
            >
                <PhosphorIcon
                    icon={icon}
                    className={styles.connectionIcon}
                    aria-hidden={true}
                />
                {text}
            </BodyText>
        </footer>
    );
}
