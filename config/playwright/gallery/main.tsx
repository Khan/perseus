/**
 * The story gallery our Playwright component tests mount stories into.
 *
 * Playwright's `mount(storyId, props)` fixture loads this page and calls
 * `window.mount({story, props})`, which renders the story registered under
 * that id into `#root`.
 *
 * A "story" here is a component written for a Playwright test to mount. It
 * has nothing to do with Storybook's `*.stories.tsx`.
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

/**
 * Every story a Playwright test can mount, by story id.
 *
 * Each is loaded only when a test mounts it.
 */
const stories: Partial<
    Record<string, () => Promise<React.ComponentType<any>>>
> = {
    "perseus/Question": () =>
        import(
            "../../../packages/perseus/src/testing/playwright/question-story"
        ).then((module) => module.Question),
};

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("The gallery page has no #root element");
}
let root: Root | undefined;

window.mount = async ({story, props}) => {
    const loadStory = stories[story];
    if (!loadStory) {
        throw new Error(`Unknown story: ${story}`);
    }
    const Story = await loadStory();
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
