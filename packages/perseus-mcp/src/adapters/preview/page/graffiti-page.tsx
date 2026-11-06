// A Graffiti diagram's page (`/graffiti/<graffitiId>`): the diagram as
// Perseus shows it, labels included, in the preview frame, as article
// content (nothing to answer). It follows the
// diagram's event stream, so a new revision shows without reloading, and a
// picker shows an earlier revision instead. Under it, the diagram's notes and
// how each draft showing it describes it.
import {usePreviewController} from "@khanacademy/perseus-preview";
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {OptionItem, SingleSelect} from "@khanacademy/wonder-blocks-dropdown";
import {PhosphorIcon} from "@khanacademy/wonder-blocks-icon";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import fileTextIcon from "@phosphor-icons/core/regular/file-text.svg";
import listChecksIcon from "@phosphor-icons/core/regular/list-checks.svg";
import notePencilIcon from "@phosphor-icons/core/regular/note-pencil.svg";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {graphieUrlFor} from "../../../domain/graffiti/diagram";

import styles from "./graffiti-page.module.css";
import {PageHeader} from "./page-header";
import layout from "./page-layout.module.css";
import {useRenderMarkers} from "./render-markers";
import {linkFromHere} from "./return-path";
import {StatusBar} from "./status-bar";

import type {Connection} from "./status-bar";
import type {DiagramView} from "../../../app/graffiti";
import type {DiagramSummary} from "../../../app/overview";
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
        <div className={styles.picker}>
            <label htmlFor={id}>
                <BodyText tag="span" size="small" className={layout.onBar}>
                    Revision
                </BodyText>
            </label>
            <SingleSelect
                id={id}
                placeholder="Choose a revision"
                selectedValue={picked == null ? "latest" : String(picked)}
                alignment="right"
                onChange={(value) =>
                    onPick(value === "latest" ? null : Number(value))
                }
            >
                {[
                    <OptionItem
                        key="latest"
                        value="latest"
                        label={`Latest (${view.revision}), follows changes`}
                    />,
                    ...[...view.revisions]
                        .reverse()
                        .map(({revision, change}) => (
                            <OptionItem
                                key={revision}
                                value={String(revision)}
                                label={
                                    change == null
                                        ? `${revision}`
                                        : `${revision}: ${change}`
                                }
                            />
                        )),
                ]}
            </SingleSelect>
        </div>
    );
}

/**
 * How the drafts showing the diagram describe it, read again when its
 * revision changes; null until read, or when it can't be.
 */
function useUsage(
    graffitiId: string,
    revision: number | undefined,
): DiagramSummary["usedIn"] | null {
    const [usedIn, setUsedIn] = React.useState<DiagramSummary["usedIn"] | null>(
        null,
    );
    React.useEffect(() => {
        let current = true;
        fetch(`/api/images/${encodeURIComponent(graffitiId)}`)
            .then((response) => (response.ok ? response.json() : null))
            .then(
                (diagram: DiagramSummary | null) => {
                    if (current) {
                        setUsedIn(diagram?.usedIn ?? null);
                    }
                },
                () => {},
            );
        return () => {
            current = false;
        };
    }, [graffitiId, revision]);
    return usedIn;
}

function Field({label, value}: {label: string; value: string}) {
    return (
        <div className={styles.field}>
            <dt>
                <BodyText tag="span" size="small" className={styles.label}>
                    {label}
                </BodyText>
            </dt>
            <dd>
                <BodyText
                    tag="span"
                    size="small"
                    className={value === "" ? styles.none : undefined}
                >
                    {value === "" ? "None" : value}
                </BodyText>
            </dd>
        </div>
    );
}

function DescribedIn({usedIn}: {usedIn: DiagramSummary["usedIn"]}) {
    return (
        <section className={styles.card} aria-labelledby="described-in">
            <Heading tag="h2" size="small" id="described-in">
                Described in
            </Heading>
            {usedIn.length === 0 ? (
                <BodyText size="small" className={styles.none}>
                    No draft shows this diagram yet.
                </BodyText>
            ) : (
                <ul className={styles.uses}>
                    {usedIn.map((draft) => (
                        <li key={draft.itemId} className={styles.use}>
                            <div className={styles.useHeader}>
                                <Heading
                                    tag="h3"
                                    size="small"
                                    className={styles.heading}
                                >
                                    <PhosphorIcon
                                        icon={
                                            draft.exercises.length === 0
                                                ? fileTextIcon
                                                : listChecksIcon
                                        }
                                        size="small"
                                        aria-hidden={true}
                                    />
                                    <span>
                                        {draft.exercises.length === 0 ? (
                                            <a
                                                href={linkFromHere(
                                                    `/drafts/${encodeURIComponent(draft.itemId)}/preview`,
                                                )}
                                            >
                                                {`Draft ${draft.itemId}`}
                                            </a>
                                        ) : (
                                            draft.exercises.map(
                                                (exercise, index) => (
                                                    <React.Fragment
                                                        key={
                                                            exercise.exerciseId
                                                        }
                                                    >
                                                        {index > 0 && ", "}
                                                        <a
                                                            href={linkFromHere(
                                                                `/exercises/${encodeURIComponent(exercise.exerciseId)}?item=${encodeURIComponent(draft.itemId)}`,
                                                            )}
                                                        >
                                                            {exercise.name}
                                                        </a>
                                                    </React.Fragment>
                                                ),
                                            )
                                        )}
                                    </span>
                                </Heading>
                                <BodyText
                                    tag="span"
                                    size="xsmall"
                                    className={styles.none}
                                >
                                    {draft.exercises.length === 0 ? (
                                        <span>Not in an exercise</span>
                                    ) : (
                                        <a
                                            href={linkFromHere(
                                                `/drafts/${encodeURIComponent(draft.itemId)}/preview`,
                                            )}
                                        >
                                            {`Item ${draft.itemId}`}
                                        </a>
                                    )}
                                    {` \u00b7 revision ${draft.revision}`}
                                </BodyText>
                            </div>
                            {draft.images.map((image, index) => (
                                <dl key={index} className={styles.fields}>
                                    <Field label="Alt text" value={image.alt} />
                                    <Field
                                        label="Caption"
                                        value={image.caption}
                                    />
                                    <Field
                                        label="Long description"
                                        value={image.longDescription}
                                    />
                                </dl>
                            ))}
                        </li>
                    ))}
                </ul>
            )}
        </section>
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

    const usedIn = useUsage(graffitiId, view?.revision);
    // What a draft's image widget gives as its alt text; notes are the
    // author's, not a description.
    const alt =
        usedIn?.flatMap((draft) => draft.images).find((i) => i.alt !== "")
            ?.alt ?? `Diagram ${graffitiId}`;
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
        <div className={layout.app}>
            <PageHeader
                title={`Diagram ${graffitiId}`}
                subtitle="As Perseus shows it, labels included"
                back={{href: "/images", label: "All images"}}
                end={
                    view != null && (
                        <RevisionPicker
                            view={view}
                            picked={picked}
                            onPick={setPicked}
                        />
                    )
                }
            />
            <main className={layout.main}>
                <div className={layout.pane}>
                    <div className={layout.paneScroll}>
                        <div className={styles.layout}>
                            <div className={styles.figure}>
                                {size != null && size.size == null && (
                                    <BodyText role="alert">
                                        {`Revision ${revision} didn't draw.`}
                                    </BodyText>
                                )}
                                <iframe
                                    ref={iframeRef}
                                    src="/preview/frame"
                                    title={`Diagram ${graffitiId}`}
                                    className={layout.frame}
                                    style={{blockSize: height ?? undefined}}
                                />
                            </div>
                            <div className={styles.side}>
                                {view?.notes != null && (
                                    <section
                                        className={styles.card}
                                        aria-labelledby="notes"
                                    >
                                        <Heading
                                            tag="h2"
                                            size="small"
                                            id="notes"
                                            className={styles.heading}
                                        >
                                            <PhosphorIcon
                                                icon={notePencilIcon}
                                                size="small"
                                                aria-hidden={true}
                                            />
                                            Notes
                                        </Heading>
                                        <BodyText
                                            size="small"
                                            className={styles.notes}
                                        >
                                            {view.notes}
                                        </BodyText>
                                    </section>
                                )}
                                {usedIn != null && (
                                    <DescribedIn usedIn={usedIn} />
                                )}
                            </div>
                        </div>
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
