import type {SendEvent} from "@khanacademy/perseus-core";

/** An event sink for analytics events. */
export type AnalyticsSink = {
    sendEvent: SendEvent;
};
