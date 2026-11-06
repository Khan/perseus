import * as a11yAddonAnnotations from "@storybook/addon-a11y/preview";
import {setProjectAnnotations} from "@storybook/react-vite";
import {beforeAll} from "vitest";

import * as previewAnnotations from "./preview";

// Applies the Storybook config (decorators, globals, parameters) to stories
// rendered under Vitest.
// See: https://storybook.js.org/docs/api/portable-stories/portable-stories-vitest#setprojectannotations
//
// Because we call `setProjectAnnotations` ourselves, `@storybook/addon-vitest`
// skips auto-loading addon annotations, so every addon whose preview code has
// to run under Vitest is listed here.
const annotations = setProjectAnnotations([
    a11yAddonAnnotations,
    previewAnnotations,
    {
        parameters: {
            // SPIKE (Argos): Perseus doesn't gate on a11y checks under Vitest
            // yet, so report violations as warnings instead of failing the
            // story. That keeps this run focused on screenshots.
            a11y: {test: "todo"},
        },
    },
]);

beforeAll(annotations.beforeAll);
