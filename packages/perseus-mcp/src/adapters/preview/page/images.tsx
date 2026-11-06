// The images page (`/images`): every Graffiti diagram, newest first, each
// with the drafts whose items show it.
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {DraftLine, plural, useJson} from "./overview-parts";
import styles from "./overview.module.css";
import {PageHeader} from "./page-header";
import {linkFromHere} from "./return-path";
import {Ago, useNow} from "./since-now";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

import type {DiagramSummary} from "../../../app/overview";

/** A diagram's name on the page: the first line of its notes, or its id. */
function nameOf(diagram: DiagramSummary): string {
    const line = diagram.notes?.split("\n")[0]?.trim() ?? "";
    return line !== "" ? line : `Diagram ${diagram.graffitiId}`;
}

function Diagram({diagram, now}: {diagram: DiagramSummary; now: Date}) {
    const page = `/graffiti/${encodeURIComponent(diagram.graffitiId)}`;
    return (
        <li className={styles.diagram}>
            {/* The heading's link names the diagram, so the thumbnail is
                an image only, with empty alt text, rather than a second
                link that says the same. The SVG has no labels: Perseus
                lays them over it, as the diagram's page shows. */}
            <img
                className={styles.thumbnail}
                src={`${page}.svg`}
                alt=""
                loading="lazy"
            />
            <div className={styles.section}>
                <Heading tag="h2" size="medium">
                    <a className={styles.link} href={linkFromHere(page)}>
                        {nameOf(diagram)}
                    </a>
                </Heading>
                <BodyText size="small" className={styles.details}>
                    {`${diagram.graffitiId} · revision ${diagram.revision} · changed `}
                    <Ago at={diagram.updatedAt} now={now} />
                </BodyText>
                {diagram.usedIn.length === 0 ? (
                    <BodyText size="small" className={styles.details}>
                        Not in any draft yet.
                    </BodyText>
                ) : (
                    <>
                        <BodyText size="small" weight="semi">
                            {`Used in ${plural(diagram.usedIn.length, "draft", "drafts")}:`}
                        </BodyText>
                        <ul className={styles.usedIn}>
                            {diagram.usedIn.map((draft) => (
                                <li key={draft.itemId}>
                                    <DraftLine draft={draft} now={now} />
                                </li>
                            ))}
                        </ul>
                    </>
                )}
            </div>
        </li>
    );
}

function Images() {
    const now = useNow();
    const images = useJson<{diagrams: DiagramSummary[]}>("/api/images");
    const diagrams =
        images.state === "loaded" ? images.value.diagrams : undefined;
    return (
        <>
            <PageHeader
                title="Images"
                subtitle={
                    diagrams == null
                        ? undefined
                        : plural(
                              diagrams.length,
                              "Graffiti diagram",
                              "Graffiti diagrams",
                          )
                }
                back={{href: "/", label: "Home"}}
            />
            <main className={styles.root}>
                {images.state === "loading" && <BodyText>Loading…</BodyText>}
                {images.state === "failed" && (
                    <BodyText>{`Couldn't load the images: ${images.message}`}</BodyText>
                )}
                {diagrams != null &&
                    (diagrams.length === 0 ? (
                        <BodyText>
                            No diagrams yet. Ask Claude to draw one with
                            create_graffiti.
                        </BodyText>
                    ) : (
                        <ul className={styles.list}>
                            {diagrams.map((diagram) => (
                                <Diagram
                                    key={diagram.graffitiId}
                                    diagram={diagram}
                                    now={now}
                                />
                            ))}
                        </ul>
                    ))}
            </main>
        </>
    );
}

const root = document.getElementById("root");
if (root != null) {
    createRoot(root).render(
        <RenderStateRoot>
            <Images />
        </RenderStateRoot>,
    );
}
