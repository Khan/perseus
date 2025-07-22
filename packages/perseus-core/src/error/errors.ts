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
export type ErrorKind = (typeof Errors)[keyof typeof Errors];
