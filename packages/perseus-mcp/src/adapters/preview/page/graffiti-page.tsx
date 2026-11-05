// A Graffiti diagram's page (`/graffiti/<graffitiId>`): the diagram as
// Perseus shows it, labels included, in the preview frame, as article
// content (nothing to answer). It follows the
// diagram's event stream, so a new revision shows without reloading, and a
// picker shows an earlier revision instead.
import {usePreviewController} from "@khanacademy/perseus-preview";
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {graphieUrlFor} from "../../../domain/graffiti/diagram";

import styles from "./page-layout.module.css";
import {useRenderMarkers} from "./render-markers";
import {StatusBar} from "./status-bar";

import type {Connection} from "./status-bar";
import type {DiagramView} from "../../../app/graffiti";
import type {PerseusRenderer} from "@khanacademy/perseus-core";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

function useDiagramEvents(graffitiId: string) {
    const [view, setView] = React.useState<DiagramView | null>(null);
    const [connection, setConnection] =
        React.useState<Connection>("connecting");

    React.useEffect(() => {
        const events = new EventSource(
            `/graffiti/${encodeURIComponent(graffitiId)}/events`,
        );
        events.addEventListener("diagram", (event) => {
            setView(JSON.parse(event.data));
            setConnection("open");
        });
        events.addEventListener("error", () => setConnection("lost"));
        return () => events.close();
    }, [graffitiId]);

    return {view, connection};
}

type Size = {width: number; height: number};

/**
 * A revision's size in pixels, from its SVG. An image widget needs it:
 * without one, Perseus measures the image from its unresolved URL.
 */
function useRevisionSize(graffitiId: string, revision: number | null) {
    const [size, setSize] = React.useState<{
        revision: number;
        size: Size | null;
    } | null>(null);

    React.useEffect(() => {
        if (revision == null) {
            return;
        }
        const image = new Image();
        image.onload = () =>
            setSize({
                revision,
                size: {width: image.naturalWidth, height: image.naturalHeight},
            });
        image.onerror = () => setSize({revision, size: null});
        image.src = `/graffiti/${encodeURIComponent(graffitiId)}.${revision}.svg`;
        return () => {
            image.onload = null;
            image.onerror = null;
        };
    }, [graffitiId, revision]);

    return size?.revision === revision ? size : null;
}

/**
 * Article content showing nothing but the diagram, at one revision: as an
 * article, so Perseus shows no answer to check.
 */
function diagramSection(
    graffitiId: string,
    revision: number,
    {width, height}: Size,
    alt: string,
): PerseusRenderer {
    return {
        content: "[[☃ image 1]]",
        images: {},
        widgets: {
            "image 1": {
                type: "image",
                graded: false,
                static: false,
                version: {major: 0, minor: 0},
                alignment: "default",
                options: {
                    backgroundImage: {
                        url: `${graphieUrlFor(graffitiId)}.${revision}`,
                        width,
                        height,
                    },
                    alt,
                    title: "",
                    caption: "",
                    longDescription: "",
                    decorative: false,
                    labels: [],
                    range: [
                        [0, 10],
                        [0, 10],
                    ],
                    box: [width, height],
                    scale: 1,
                },
            },
        },
    };
}

function RevisionPicker({
    view,
    picked,
    onPick,
}: {
    view: DiagramView;
    picked: number | null;
    onPick: (revision: number | null) => void;
}) {
    const id = React.useId();
    return (
        <BodyText tag="div" size="small" className={styles.headerEnd}>
            <label htmlFor={id}>Revision </label>
            <select
                id={id}
                value={picked ?? "latest"}
                onChange={(event) =>
                    onPick(
                        event.target.value === "latest"
                            ? null
                            : Number(event.target.value),
                    )
                }
            >
                <option value="latest">
                    {`Latest (${view.revision}), follows changes`}
                </option>
                {[...view.revisions].reverse().map(({revision, change}) => (
                    <option key={revision} value={revision}>
                        {change == null
                            ? `${revision}`
                            : `${revision}: ${change}`}
                    </option>
                ))}
            </select>
        </BodyText>
    );
}

function GraffitiPage({graffitiId}: {graffitiId: string}) {
    const {view, connection} = useDiagramEvents(graffitiId);
    // null follows the latest revision.
    const [picked, setPicked] = React.useState<number | null>(null);
    const revision = picked ?? view?.revision ?? null;
    const size = useRevisionSize(graffitiId, revision);

    const iframeRef = React.useRef<HTMLIFrameElement>(null);
    const {sendData, height, renderState} = usePreviewController(iframeRef);
    useRenderMarkers(renderState);

    const alt = view?.notes ?? `Diagram ${graffitiId}`;
    React.useEffect(() => {
        if (revision == null || size?.size == null) {
            return;
        }
        sendData({
            type: "article-section",
            data: {
                article: diagramSection(graffitiId, revision, size.size, alt),
                apiOptions: {},
                linterContext: {contentType: "article", highlightLint: false},
            },
        });
    }, [graffitiId, revision, size, alt, sendData]);

    return (
        <div className={styles.app}>
            <View tag="header" className={styles.header}>
                <Heading tag="h1" size="large">
                    {`Diagram ${graffitiId}`}
                </Heading>
                {view != null && (
                    <RevisionPicker
                        view={view}
                        picked={picked}
                        onPick={setPicked}
                    />
                )}
            </View>
            <main className={styles.main}>
                <div className={styles.pane}>
                    <div className={styles.paneScroll}>
                        {view?.notes != null && (
                            <BodyText>
                                <strong>Notes:</strong>
                                <span>{` ${view.notes}`}</span>
                            </BodyText>
                        )}
                        {size != null && size.size == null && (
                            <BodyText role="alert">
                                {`Revision ${revision} didn't draw.`}
                            </BodyText>
                        )}
                        <iframe
                            ref={iframeRef}
                            src="/preview/frame"
                            title={`Diagram ${graffitiId}`}
                            className={styles.frame}
                            style={{blockSize: height ?? undefined}}
                        />
                    </div>
                </div>
            </main>
            <StatusBar
                summary={
                    revision == null
                        ? `Diagram ${graffitiId}`
                        : `Diagram ${graffitiId}, revision ${revision}` +
                          (picked == null ? "" : " (an earlier revision)")
                }
                connection={connection}
                live="Live: updates as the diagram changes"
            />
        </div>
    );
}

// The page's path is /graffiti/<graffitiId>.
const graffitiId = decodeURIComponent(window.location.pathname.split("/")[2]);
createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <GraffitiPage graffitiId={graffitiId} />
    </RenderStateRoot>,
);
