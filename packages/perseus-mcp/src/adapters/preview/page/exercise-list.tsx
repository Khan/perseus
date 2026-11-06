// The list of exercises (`/exercises`), each linking to its page, with an
// import for an exercise's export.
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {BodyText} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {createRoot} from "react-dom/client";

import styles from "./exercise-list.module.css";
import {ImportArea} from "./import-area";
import {PageHeader} from "./page-header";

// The page setup Wonder Blocks expects: its tokens, fonts and base styles.
import "@internal/perseus-environment/styles.css";
import "@internal/perseus-environment/lato.css";

type ExerciseSummary = {
    exerciseId: string;
    name: string;
    notes?: string;
    updatedAt: string;
    items: number;
};

type Listing =
    | {state: "loading"}
    | {state: "loaded"; exercises: ExerciseSummary[]}
    | {state: "failed"; message: string};

/**
 * An exercise's name as the list shows it: a name that's the path of the
 * file it was imported from shows the file's name alone.
 */
function displayName(name: string): string {
    return /^(\/|[A-Za-z]:\\|~\/)/.test(name) && /\.(json|zip)$/i.test(name)
        ? name.split(/[\\/]/).pop()!
        : name;
}

const UNITS: Array<[Intl.RelativeTimeFormatUnit, number]> = [
    ["year", 365 * 24 * 60 * 60],
    ["month", 30 * 24 * 60 * 60],
    ["week", 7 * 24 * 60 * 60],
    ["day", 24 * 60 * 60],
    ["hour", 60 * 60],
    ["minute", 60],
];

/** How long ago `date` was, such as "2 hours ago" or "yesterday". */
function sinceNow(date: Date, now: Date): string {
    const seconds = (date.getTime() - now.getTime()) / 1000;
    const format = new Intl.RelativeTimeFormat(undefined, {numeric: "auto"});
    for (const [unit, size] of UNITS) {
        if (Math.abs(seconds) >= size) {
            return format.format(Math.round(seconds / size), unit);
        }
    }
    return "just now";
}

/** The time, again every minute, so "changed 2 minutes ago" stays right. */
function useNow(): Date {
    const [now, setNow] = React.useState(() => new Date());
    React.useEffect(() => {
        const timer = setInterval(() => setNow(new Date()), 60_000);
        return () => clearInterval(timer);
    }, []);
    return now;
}

function ExerciseList() {
    const now = useNow();
    const [listing, setListing] = React.useState<Listing>({state: "loading"});
    // Bumped after an import, to list the new exercises.
    const [version, setVersion] = React.useState(0);
    React.useEffect(() => {
        fetch("/api/exercises")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`perseus-mcp answered ${response.status}`);
                }
                return response.json();
            })
            .then(
                ({exercises}) => setListing({state: "loaded", exercises}),
                (e) => setListing({state: "failed", message: String(e)}),
            );
    }, [version]);

    return (
        <View>
            <PageHeader
                title="Exercises"
                subtitle={
                    listing.state === "loaded"
                        ? `${listing.exercises.length} ${listing.exercises.length === 1 ? "exercise" : "exercises"}`
                        : undefined
                }
            />
            <View tag="main" className={`${styles.root} ${styles.page}`}>
                <ImportArea onImported={() => setVersion((v) => v + 1)} />
                {listing.state === "loading" && <BodyText>Loading…</BodyText>}
                {listing.state === "failed" && (
                    <BodyText>{`Couldn't load the exercises: ${listing.message}`}</BodyText>
                )}
                {listing.state === "loaded" &&
                    (listing.exercises.length === 0 ? (
                        <BodyText>
                            No exercises yet. Import one above, or ask Claude to
                            import one from a file.
                        </BodyText>
                    ) : (
                        <ul className={styles.list}>
                            {listing.exercises.map((exercise) => (
                                <li
                                    key={exercise.exerciseId}
                                    className={styles.row}
                                >
                                    <BodyText weight="semi">
                                        <a
                                            className={styles.link}
                                            href={`/exercises/${encodeURIComponent(exercise.exerciseId)}`}
                                        >
                                            {displayName(exercise.name)}
                                        </a>
                                    </BodyText>
                                    <BodyText
                                        size="small"
                                        className={styles.details}
                                    >
                                        {`${exercise.items} ${exercise.items === 1 ? "item" : "items"} · changed `}
                                        <time
                                            dateTime={exercise.updatedAt}
                                            title={new Date(
                                                exercise.updatedAt,
                                            ).toLocaleString()}
                                        >
                                            {sinceNow(
                                                new Date(exercise.updatedAt),
                                                now,
                                            )}
                                        </time>
                                    </BodyText>
                                    {exercise.notes != null && (
                                        <BodyText
                                            size="small"
                                            className={styles.notes}
                                            title={exercise.notes}
                                        >
                                            {exercise.notes}
                                        </BodyText>
                                    )}
                                </li>
                            ))}
                        </ul>
                    ))}
            </View>
        </View>
    );
}

createRoot(document.getElementById("root")!).render(
    <RenderStateRoot>
        <ExerciseList />
    </RenderStateRoot>,
);
