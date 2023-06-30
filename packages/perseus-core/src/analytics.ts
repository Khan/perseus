// A type union of all the events that any package in the Perseus ecosystem can
// send.
export type PerseusAnalyticsEvent =
    | {
          type: "perseus:expression-evaluated";
          payload: {
              virtualKeypadVersion: string;
              result: "correct" | "incorrect" | "invalid";
          };
      }
    | {
          type: "math-input:keypad-closed";
          payload: {
              virtualKeypadVersion: string;
          };
      }
    | {
          type: "math-input:keypad-opened";
          payload: {
              virtualKeypadVersion: string;
          };
      };
// Add more events here as needed. Note that each event should have a `type`
// key and a payload that varies by type.
// | {type: "b"; payload: {name: string}};

/** A function to send analytics events. */
export type SendEventFn = (event: PerseusAnalyticsEvent) => Promise<void>;
