/**
 * The story gallery our Playwright component tests mount stories into.
 *
 * Playwright's `mount(storyId, props)` fixture loads this page and calls
 * `window.mount({story, props})`, which renders the named story into
 * `#root`. A story id is the story file's path under `packages/`, without
 * the `.story.tsx` extension, plus the name of the exported story; any
 * unique suffix of it works too. For example, the `Question` story in
 * `packages/perseus/src/testing/perseus-question.story.tsx` is
 * `perseus/src/testing/perseus-question/Question`.
 */
import * as React from "react";
import {flushSync} from "react-dom";
import {createRoot} from "react-dom/client";

import type {Root} from "react-dom/client";

// Defines the --wb-* custom properties that Wonder Blocks design tokens
// compile down to.
import "@khanacademy/wonder-blocks-tokens/styles.css";

declare global {
    // Vite's `import.meta.glob()`, as we call it below. We don't reference
    // `vite/client` for this: it also redeclares asset imports (e.g.
    // `*.svg`) for the whole program, which conflicts with our own
    // declarations.
    interface ImportMeta {
        glob<Module>(pattern: string): Record<string, () => Promise<Module>>;
    }
    interface Window {
        mount: (params: {
            story: string;
            props?: Record<string, unknown>;
        }) => Promise<void>;
        unmount: () => Promise<void>;
    }
}

const storyFiles = import.meta.glob<Record<string, React.ComponentType>>(
    "../../../packages/*/src/**/*.story.tsx",
);

const storyPath = (file: string) =>
    file.replace(/^(\.\.\/)+packages\//, "").replace(/\.story\.tsx$/, "");

async function resolveStory(
    storyId: string,
): Promise<React.ComponentType | undefined> {
    const separator = storyId.lastIndexOf("/");
    const path = storyId.slice(0, separator);
    const name = storyId.slice(separator + 1);
    const file = Object.keys(storyFiles).find(
        (f) => storyPath(f) === path || storyPath(f).endsWith("/" + path),
    );
    const stories = file ? await storyFiles[file]() : undefined;
    return stories?.[name];
}

const rootElement = document.getElementById("root");
if (!rootElement) {
    throw new Error("The gallery page has no #root element");
}
let root: Root | undefined;

window.mount = async ({story, props}) => {
    const Story = await resolveStory(story);
    if (!Story) {
        throw new Error(`Unknown story: ${story}`);
    }
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
