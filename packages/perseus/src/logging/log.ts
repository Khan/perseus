import {getDependencies} from "../dependencies";

import type {ErrorKind} from "@khanacademy/perseus-core";
import type {Metadata} from "@khanacademy/wonder-stuff-core";

export type LogErrorOptions = {
    // The cause of the error.
    cause?: Error | null | undefined;
    // Extra metadata about the error that is safe and small enough to send to
    // external log systems (think Sentry).
    loggedMetadata?: Metadata | null | undefined;
    // Extra metadata about the error. Any data included in this key is
    // explicitly marked to _not_ be delivered to any configured logging
    // systems.
    metadata?: Metadata | null | undefined;
};

/**
 * Provides logging infrastructure for Perseus
 */
export interface ILogger {
    // Logs a message
    // NOTE: Prefer including any data that varies in the `extra` parameter
    // instead of including it in the message. This makes it easier for error
    // logging platforms to group like errors together.
    log(message: string, extra?: Metadata | null | undefined): void;
    // Logs an error with a message
    // NOTE: Prefer including any data that varies in the `extra` parameter
    // instead of including it in the message. This makes it easier for error
    // logging platforms to group like errors together.
    error(message: string, kind: ErrorKind, extra?: LogErrorOptions): void;
}

export const Log: ILogger = {
    // Logs a message
    log: (message: string, extra?: Metadata | null) => {
        getDependencies().Log.log(message, extra);
    },

    // Logs an error with a message
    error: (
        // NOTE: Prefer including any data that varies in the `extra` parameter
        // instead of including it in the message. This makes it easier for error
        // logging platforms to group like errors together.
        message: string,
        kind: ErrorKind,
        extra?: LogErrorOptions,
    ) => {
        getDependencies().Log.error(message, kind, extra);
    },
};
