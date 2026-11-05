/** Where the content guidelines come from: a local file, when there is one. */
export interface GuidelinesSource {
    /**
     * The guidelines' text and where it was read from, or why there are
     * none.
     */
    read(): Promise<
        {ok: true; path: string; text: string} | {ok: false; reason: string}
    >;
}
