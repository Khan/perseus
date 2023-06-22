// Perseus does not have access to all of the data in a CEDAR event, so we
// remove those traits/keys using a utility type. The hosting application is
// expected to fill in the missing pieces of data before dispatching the event
// further.
export type PerseusAnalyticsEvent = {
    type: "perseus:expression-evaluated";
    payload: {
        virtualKeypadVersion: string;
        result: "correct" | "incorrect" | "invalid";
    };
};
// Add more events here as needed. Note that each event should have a `type`
// key and a payload that varies by type.
// | {type: "b"; payload: {name: string}};

/** A function to send analytics events. */
export type SendEventFn = (event: PerseusAnalyticsEvent) => Promise<void>;
