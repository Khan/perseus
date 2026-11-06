// Pieces the homepage and the images page share.
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";

import styles from "./overview.module.css";
import {linkFromHere} from "./return-path";
import {Ago} from "./since-now";

import type {DraftSummary} from "../../../app/overview";

type Loading<T> =
    | {state: "loading"}
    | {state: "loaded"; value: T}
    | {state: "failed"; message: string};

/** Fetches JSON once, for a page's data. */
export function useJson<T>(url: string): Loading<T> {
    const [loading, setLoading] = React.useState<Loading<T>>({
        state: "loading",
    });
    React.useEffect(() => {
        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`perseus-mcp answered ${response.status}`);
                }
                return response.json();
            })
            .then(
                (value: T) => setLoading({state: "loaded", value}),
                (e) => setLoading({state: "failed", message: String(e)}),
            );
    }, [url]);
    return loading;
}

export function plural(count: number, one: string, many: string): string {
    return `${count} ${count === 1 ? one : many}`;
}

/** A draft as a line in a list: its question's first line, linking to it. */
export function DraftLine({draft, now}: {draft: DraftSummary; now: Date}) {
    return (
        <>
            <BodyText>
                <a
                    className={styles.link}
                    href={linkFromHere(
                        `/drafts/${encodeURIComponent(draft.itemId)}/preview`,
                    )}
                >
                    {draft.firstLine !== ""
                        ? draft.firstLine
                        : `Draft ${draft.itemId}`}
                </a>
            </BodyText>
            <BodyText size="small" className={styles.details}>
                {`Revision ${draft.revision} · changed `}
                <Ago at={draft.updatedAt} now={now} />
                {draft.exercises.length > 0 && " · in "}
                {draft.exercises.map((exercise, i) => (
                    <React.Fragment key={exercise.exerciseId}>
                        {i > 0 && ", "}
                        <a
                            className={styles.link}
                            href={linkFromHere(
                                `/exercises/${encodeURIComponent(exercise.exerciseId)}`,
                            )}
                        >
                            {exercise.name}
                        </a>
                    </React.Fragment>
                ))}
            </BodyText>
        </>
    );
}
