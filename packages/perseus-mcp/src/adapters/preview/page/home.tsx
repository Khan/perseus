// The homepage (`/`): what this server holds, links to the exercises and
// the images, and the latest exercises and drafts.
import {RenderStateRoot} from "@khanacademy/wonder-blocks-core";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {createRoot} from "react-dom/client";

import {DraftLine, plural, useJson} from "./overview-parts";
import styles from "./overview.module.css";
import {PageHeader} from "./page-header";
import {Ago, useNow} from "./since-now";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

import type {Overview} from "../../../app/overview";

function Home() {
    const now = useNow();
    const overview = useJson<Overview>("/api/home");

    if (overview.state !== "loaded") {
        return (
            <>
                <PageHeader title="perseus-mcp" />
                <main className={styles.root}>
                    <BodyText>
                        {overview.state === "loading"
                            ? "Loading…"
                            : `Couldn't load this page: ${overview.message}`}
                    </BodyText>
                </main>
            </>
        );
    }
    const {value} = overview;
    return (
        <>
            <PageHeader
                title="perseus-mcp"
                subtitle={`${plural(value.drafts, "draft", "drafts")}, ${plural(value.exercises, "exercise", "exercises")} and ${plural(value.diagrams, "diagram", "diagrams")}`}
            />
            <main className={styles.root}>
                <nav aria-label="Pages">
                    <ul className={styles.places}>
                        <li className={styles.place}>
                            <Heading tag="h2" size="medium">
                                <a className={styles.link} href="/exercises">
                                    Exercises
                                </a>
                            </Heading>
                            <BodyText size="small" className={styles.details}>
                                {`${plural(value.exercises, "exercise", "exercises")}: their items, previews, and the export for the exercise editor.`}
                            </BodyText>
                        </li>
                        <li className={styles.place}>
                            <Heading tag="h2" size="medium">
                                <a className={styles.link} href="/images">
                                    Images
                                </a>
                            </Heading>
                            <BodyText size="small" className={styles.details}>
                                {`${plural(value.diagrams, "Graffiti diagram", "Graffiti diagrams")}, and the drafts that show them.`}
                            </BodyText>
                        </li>
                    </ul>
                </nav>

                <section
                    className={styles.section}
                    aria-labelledby="recent-exercises"
                >
                    <Heading tag="h2" size="medium" id="recent-exercises">
                        Recent exercises
                    </Heading>
                    {value.recentExercises.length === 0 ? (
                        <BodyText>No exercises yet.</BodyText>
                    ) : (
                        <ul className={styles.list}>
                            {value.recentExercises.map((exercise) => (
                                <li
                                    key={exercise.exerciseId}
                                    className={styles.row}
                                >
                                    <BodyText weight="semi">
                                        <a
                                            className={styles.link}
                                            href={`/exercises/${encodeURIComponent(exercise.exerciseId)}`}
                                        >
                                            {exercise.name}
                                        </a>
                                    </BodyText>
                                    <BodyText
                                        size="small"
                                        className={styles.details}
                                    >
                                        {`${plural(exercise.items, "item", "items")} · changed `}
                                        <Ago
                                            at={exercise.updatedAt}
                                            now={now}
                                        />
                                    </BodyText>
                                </li>
                            ))}
                        </ul>
                    )}
                </section>

                <section
                    className={styles.section}
                    aria-labelledby="recent-drafts"
                >
                    <Heading tag="h2" size="medium" id="recent-drafts">
                        Recent drafts
                    </Heading>
                    {value.recentDrafts.length === 0 ? (
                        <BodyText>No drafts yet.</BodyText>
                    ) : (
                        <ul className={styles.list}>
                            {value.recentDrafts.map((draft) => (
                                <li key={draft.itemId} className={styles.row}>
                                    <DraftLine draft={draft} now={now} />
                                </li>
                            ))}
                        </ul>
                    )}
                </section>
            </main>
        </>
    );
}

const root = document.getElementById("root");
if (root != null) {
    createRoot(root).render(
        <RenderStateRoot>
            <Home />
        </RenderStateRoot>,
    );
}
