import {getDependencies} from "../dependencies";

import type {Metadata} from "@khanacademy/wonder-stuff-core";

// TODO(LP-11481): Change the primary API we use for logging in Perseus to use
// getDependencies() internally... simplify usage to just using a "singleton"
// which get's the injected logger.

/**
 * @typedef {Object} Errors utility for referencing the Perseus error taxonomy.
 */
export const Errors = Object.freeze({
    /**
     * @property {ErrorKind} Unknown The kind of error is not known.
     */
    Unknown: "Unknown",
    /**
     * @property {ErrorKind} Internal The error is internal to the executing code.
     */
    Internal: "Internal",
    /**
     * @property {ErrorKind} InvalidInput There was a problem with the provided
     * input, such as the wrong format or a null value.
     */
    InvalidInput: "InvalidInput",
    /**
     * @property {ErrorKind} NotAllowed There was a problem due to the state of
     * the system not matching the requested operation or input. For example,
     * trying to create a username that is valid, but is already taken by
     * another user. Use {@link InvalidInput} instead when the input isn't
     * valid regardless of the state of the system. Use {@link NotFound} when
     * the failure is due to not being able to find a resource.
     */
    NotAllowed: "NotAllowed",
    /**
     * @property {ErrorKind} TransientService There was a problem when making a
     * request to a service.
     */
    TransientService: "TransientService",
    /**
     * @property {ErrorKind} Service There was a non-transient problem when
     * making a request to service.
     */
    Service: "Service",
});

/**
 * @type {ErrorKind} The kind of error being reported
 */
export type ErrorKind = typeof Errors[keyof typeof Errors];

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
