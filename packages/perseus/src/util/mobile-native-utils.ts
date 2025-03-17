/**
 * Helps us detect that we are running in a mobile native environment for
 * any js that is bundled in the mobile app (e.g. Perseus).
 *
 * @param {*} protocol protocol portion of a URL. Generally: window.location.protocol
 */
export const isFileProtocol = (protocol?: string | null): boolean => {
    // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
    if (protocol && protocol.toLowerCase() === "file:") {
        return true;
    }
    return false;
};
