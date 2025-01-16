import type {WidgetOptions} from "@khanacademy/perseus-core";

export type MockWidget = WidgetOptions<"mock-widget", MockWidgetOptions>;

export type MockWidgetOptions = {
    static?: boolean;
    value: string;
};

export type PerseusMockWidgetRubric = {
    value: string;
};

export type PerseusMockWidgetUserInput = {
    currentValue: string;
};

// Extend the widget registries for testing
declare module "@khanacademy/perseus-core" {
    export interface PerseusWidgetTypes {
        "mock-widget": MockWidget;
    }
}
