// The list of exercises (`/exercises`), each linking to its page, with an
// import for an exercise's export.
import {RenderStateRoot, View} from "@khanacademy/wonder-blocks-core";
import {BodyText, Heading} from "@khanacademy/wonder-blocks-typography";
import * as React from "react";
import {createRoot} from "react-dom/client";

import shellStyles from "./exercise-list.module.css";
import styles from "./exercise-pages.module.css";
import {ImportArea} from "./import-area";

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

function ExerciseList() {
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
        <View className={`${shellStyles.root} ${shellStyles.page}`}>
            <View tag="header" className={shellStyles.header}>
                <Heading tag="h1" size="xlarge">
                    Exercises
                </Heading>
            </View>
            <View tag="main" className={shellStyles.page}>
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
                                <li key={exercise.exerciseId}>
                                    <BodyText weight="semi">
                                        <a
                                            className={styles.link}
                                            href={`/exercises/${encodeURIComponent(exercise.exerciseId)}`}
                                        >
                                            {exercise.name}
                                        </a>
                                    </BodyText>
                                    <BodyText size="small">
                                        {`${exercise.items} ${exercise.items === 1 ? "item" : "items"}, ` +
                                            `changed ${new Date(exercise.updatedAt).toLocaleString()}`}
                                    </BodyText>
                                    {exercise.notes != null && (
                                        <BodyText size="small">
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
