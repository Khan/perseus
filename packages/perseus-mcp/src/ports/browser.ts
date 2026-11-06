/** The web browser of the machine perseus-mcp runs on. */
export interface Browser {
    /** Opens `url`; false if this machine's browser can't be started. */
    open(url: string): boolean;
}
