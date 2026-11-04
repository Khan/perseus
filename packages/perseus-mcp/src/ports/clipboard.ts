/** The clipboard of the machine perseus-mcp runs on. */
export interface Clipboard {
    /** Copies `text`; false if this machine's clipboard can't be reached. */
    copy(text: string): boolean;
}
