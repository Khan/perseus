/** Reads item JSON files that the caller names by path. */
export interface ItemFileReader {
    /**
     * @returns the file's text.
     * @throws if the file can't be read.
     */
    read(path: string): Promise<string>;
}
