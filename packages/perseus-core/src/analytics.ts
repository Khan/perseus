import type {AnalyticsEvent} from "@khanacademy/event-schemas";

// Magic based on:
//   * https://echobind.com/post/slicing-typescript-literal-strings
//   * https://www.typescriptlang.org/docs/handbook/utility-types.html
//
// This type removes keys that Perseus cannot fill in. It is expected that the
// hosting application will populate these missing values. We represent this as
// a type so taht the host can easily detect which fields in the type are
// missing at "compile time".
type RemoveUnsupportedKeys<T> = {
    [P in keyof T as P extends `contentPath_${string}`
        ? never
        : P extends `currentPageURL` // STOPSHIP: To be removed from schema!
        ? never
        : P /* he he */]: T[P];
};

// Perseus does not have access to all of the data in a CEDAR event, so we
// remove those traits/keys using a utility type. The hosting application is
// expected to fill in the missing pieces of data before dispatching the event
// further.
export type PerseusAnalyticsEvent = RemoveUnsupportedKeys<AnalyticsEvent>;

/** A function to send analytics events. */
export type SendEvent = (event: PerseusAnalyticsEvent) => Promise<void>;
