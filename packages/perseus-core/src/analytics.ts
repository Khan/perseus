export type VirtualKeypadVersion =
    | "MATH_INPUT_KEYPAD_V2"
    | "REACT_NATIVE_KEYPAD";

/**
 * A type union of all the events that any package in the Perseus ecosystem can
 * send.
 */
export type PerseusAnalyticsEvent =
    | {
          type: "perseus:expression-evaluated";
          payload: {
              virtualKeypadVersion: VirtualKeypadVersion;
              result: "correct" | "incorrect" | "invalid";
          };
      }
    | {
          type: "perseus:expression-focused";
          payload: null;
      }
    | {
          type: "perseus:widget-rendering-error";
          payload: {
              widgetType: string;
              widgetId: string;
          };
      }
    | {
          type: "perseus:label-image:toggle-answers-hidden";
          payload: null;
      }
    | {
          type: "perseus:label-image:marker-interacted-with";
          payload: null;
      }
    | {
          type: "perseus:label-image:choiced-interacted-with";
          payload: null;
      }
    | {
          type: "math-input:keypad-closed";
          payload: {
              virtualKeypadVersion: VirtualKeypadVersion;
          };
      }
    | {
          type: "math-input:keypad-opened";
          payload: {
              virtualKeypadVersion: VirtualKeypadVersion;
          };
      };

// Add more events here as needed. Note that each event should have a `type`
// key and a payload that varies by type.
// | {type: "b"; payload: {name: string}};
//
// Event types should be formatted as "package-name:event-name" (where the
// package name is the name of the package that emits the event without the
// `@khanacademy/` prefix and then the name of the event.)

/** A function that is called when Perseus emits an analytics event. */
export type AnalyticsEventHandlerFn = (
    event: PerseusAnalyticsEvent,
) => Promise<void>;
