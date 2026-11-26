/// <reference types="vite/types/importMeta.d.ts" />
/**
 * The story gallery our Playwright component tests mount stories into.
 *
 * Playwright's `mount(storyId, props)` fixture loads this page and calls
 * `window.mount({story, props})`, which renders that story into `#root`.
 *
 * A story is a component written for a Playwright test to mount. Stories
 * live in `*.story.tsx` files next to the code they exercise, and each named
 * export is one story. (Not to be confused with Storybook's
 * `*.stories.tsx`.) Following Playwright's convention, a story's id is its
 * package, its file's path under `src/` without the `.story.tsx` extension,
 * and its export name: the `Question` export of
 * `packages/perseus/src/testing/playwright/question.story.tsx` is
 * `perseus/testing/playwright/question/Question`. Any unique suffix of an id
 * works too.
 */
import * as React from "react";
import {flushSync} from "react-dom";
import {createRoot} from "react-dom/client";

import type {Root} from "react-dom/client";

// Defines the --wb-* custom properties that Wonder Blocks design tokens
// compile down to.
import "@khanacademy/wonder-blocks-tokens/styles.css";

declare global {
    interface Window {
        mount: (params: {
            story: string;
            props?: Record<string, unknown>;
        }) => Promise<void>;
        unmount: () => Promise<void>;
    }
}

type StoryModule = Record<string, React.ComponentType<any>>;

// Lazy, so a story's module (and everything it imports) only loads when a
// test mounts it.
const storyFiles = import.meta.glob<StoryModule>(
    "../../../packages/*/src/**/*.story.tsx",
);

// "../../../packages/perseus/src/testing/question.story.tsx" ->
// "perseus/testing/question"
const toStoryPath = (file: string) =>
    file
        .replace(/^(\.\.\/)+packages\//, "")
        .replace("/src/", "/")
        .replace(/\.story\.tsx$/, "");

async function resolveStory(storyId: string): Promise<React.ComponentType> {
    const separator = storyId.lastIndexOf("/");
    const path = storyId.slice(0, separator);
    const name = storyId.slice(separator + 1);

    const files = Object.keys(storyFiles).filter((file) => {
        const storyPath = toStoryPath(file);
        return storyPath === path || storyPath.endsWith("/" + path);
    });
    if (files.length > 1) {
        throw new Error(
            `Story id "${storyId}" matches more than one story file: ${files.join(", ")}`,
        );
    }
    const loadStories = files[0] ? storyFiles[files[0]] : undefined;
    const Story = loadStories ? (await loadStories())[name] : undefined;
    if (!Story) {
        throw new Error(`Unknown story: ${storyId}`);
    }
    return Story;
}

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("The gallery page has no #root element");
}
let root: Root | undefined;

window.mount = async ({story, props}) => {
    const Story = await resolveStory(story);
    // Reuse the root so that `update()` re-renders the story in place.
    root ??= createRoot(rootElement);
    // flushSync so that a render error rejects this promise instead of
    // being swallowed.
    flushSync(() => root?.render(<Story {...props} />));
};

window.unmount = async () => {
    root?.unmount();
    root = undefined;
};
