import type {WidgetOptions} from "@khanacademy/perseus-core";

// Extend the widget registries for testing
export interface PerseusWidgetTypes {
    "mock-widget": MockWidget;
}

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
