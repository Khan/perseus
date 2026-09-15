import * as React from "react";

import {registerEditors} from "../editor-registry";

import type {EditorRegistration} from "../editor-registration";
import type {Decorator} from "@storybook/react-vite";

export const registerWidgetEditorDecorator = (
    registrations: ReadonlyArray<EditorRegistration>,
): Decorator => {
    return function RegisterWidgetEditorDecorator(Story) {
        registerEditors(registrations);

        return <Story />;
    };
};
