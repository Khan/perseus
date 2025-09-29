import {spawn} from "child_process";

/**
 * @module
 * This file provides thin wrappers around the `gcloud` APIs.
 */

// We export a singleton object for ease of mocking.
export const gcloudStorage = {
    cp,
};

interface CpOptions {
    /**
     * Causes all file transfers to use gzip compression.
     */
    gzipInFlightAll?: boolean;

    /**
     * The Google Cloud project in which to perform the action.
     */
    project?: string;
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
    if (options.gzipInFlightAll) {
        flags.push("--gzip-in-flight-all");
    }
    if (options.project) {
        flags.push("--project", options.project);
    }

    return new Promise((resolve, reject) => {
        const args = ["storage", "cp", ...flags, ...sources, dest];
        const gcloudProcess = spawn("gcloud", args);
        gcloudProcess.stdout.pipe(process.stdout);
        gcloudProcess.stderr.pipe(process.stderr);
        gcloudProcess.on("close", (exitCode, signal) => {
            if (signal != null) {
                reject(
                    Error(`gcloud storage cp: terminated by signal ${signal}`),
                );
            }
            if (exitCode === 0) {
                resolve();
            } else {
                reject(
                    Error(`gcloud storage cp: exited with code ${exitCode}`),
                );
            }
        });
    });
}
