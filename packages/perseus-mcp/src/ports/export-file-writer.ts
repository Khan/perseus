/** Writes exported files where the caller names them. */
export interface ExportFileWriter {
    /** Whether a file already exists at `path`. */
    exists(path: string): boolean;
    /**
     * Writes `contents` to `path`, creating its directory.
     *
     * @returns the file's absolute path.
     * @throws if the file can't be written.
     */
    write(path: string, contents: string): string;
}
