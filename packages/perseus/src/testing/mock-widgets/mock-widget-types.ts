import type {WidgetOptions} from "@khanacademy/perseus-core";

export type MockWidget = WidgetOptions<"mock-widget", MockWidgetOptions>;

export type MockWidgetOptions = {
    static?: boolean;
    value: string;
};

// Extend the widget registries for testing
// See @khanacademy/perseus-core's PerseusWidgetTypes for a full explanation.
// Basically, we're extending the interface from that package so that our
// testing code knows of the MockWidget. In production code, there's no
// knowledge of the mock widget.
declare module "@khanacademy/perseus-core" {
    export interface PerseusWidgetTypes {
        "mock-widget": MockWidget;
    }
}
