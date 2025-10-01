import {command} from "./command";

/**
 * @module
 * This file provides thin wrappers around the `gcloud` APIs.
 */

// We export a singleton object for ease of mocking.
export const gcloudStorage = {
    cp,
};

/**
 * @see {@linkcode cp}
 */
interface CpOptions {
    /**
     * The Google Cloud project in which to perform the action.
     */
    project?: string;

    /**
     * Causes the contents of directories listed as `sources` to be
     * transferred.
     */
    recursive?: boolean;
}

/**
 * Uploads, downloads, and copies Cloud Storage objects. This is a thin
 * wrapper around the `gcloud storage cp` command.
 *
 * @param sources an array of paths or `gs:` URIs identifying the objects or
 * folders to copy from.
 * @param dest a path or `gs:` URI identifying the object or folder to copy
 * to. If `dest` is a path to a local directory, it is assumed to exist
 * already.
 * @param options
 */
async function cp(
    sources: string[],
    dest: string,
    options: CpOptions = {},
): Promise<void> {
    const flags: string[] = [];
    if (options.project) {
        flags.push("--project", options.project);
    }
    if (options.recursive) {
        flags.push("--recursive");
    }

    await command("gcloud", "storage", "cp", ...flags, ...sources, dest).run();
}
