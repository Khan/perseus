import type {SendEventFn} from "@khanacademy/perseus-core";

/** An event sink for analytics events. */
export type Analytics = {
    sendEvent: SendEventFn;
};
