/** A guidelines document's file: its name, and its Markdown. */
export type GuidelineFile = {name: string; text: string};

/**
 * Where the content guidelines come from: a local folder of Markdown files,
 * one per topic, when there is one.
 */
export interface GuidelinesSource {
    /** The guidelines' files and the folder they're in, or why there are none. */
    read(): Promise<
        | {ok: true; dir: string; files: GuidelineFile[]}
        | {ok: false; reason: string}
    >;
}
