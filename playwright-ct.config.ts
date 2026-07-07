import path from "node:path";

import {defineConfig, devices} from "@playwright/experimental-ct-react";

import viteConfig from "./vite.config";

// Playwright CT injects its own React Vite plugin. Our root vite.config also
// registers `@vitejs/plugin-react-swc`; running both React plugins produces two
// React module instances, which breaks hooks. So we hand CT everything from the
// root config EXCEPT the React plugin.
const {plugins: _, ...viteConfigWithoutReactPlugin} = viteConfig;

// The CT rollup build doesn't eliminate the `process.env.NODE_ENV` ternary in
// react/react-dom's CJS entry points, so it bundles BOTH the development and
// production copies. That leaves wonder-blocks components (e.g.
// RenderStateRoot) rendering on a different React instance than the renderer,
// and hooks fail with "useState is not a function or its return value is not
// iterable". Aliasing directly to the single development builds (and their
// subpaths) guarantees exactly one React instance for hooks.
const reactRoot = path.resolve(__dirname, "node_modules");
const reactDevAliases = [
    {
        find: /^react$/,
        replacement: path.join(reactRoot, "react/cjs/react.development.js"),
    },
    {
        find: /^react\/jsx-runtime$/,
        replacement: path.join(
            reactRoot,
            "react/cjs/react-jsx-runtime.development.js",
        ),
    },
    {
        find: /^react\/jsx-dev-runtime$/,
        replacement: path.join(
            reactRoot,
            "react/cjs/react-jsx-dev-runtime.development.js",
        ),
    },
    {
        find: /^react-dom$/,
        replacement: path.join(
            reactRoot,
            "react-dom/cjs/react-dom.development.js",
        ),
    },
    {
        // client.js re-exports createRoot and requires the bare "react-dom"
        // specifier, which the alias above collapses to the single instance.
        find: /^react-dom\/client$/,
        replacement: path.join(reactRoot, "react-dom/client.js"),
    },
];

// The base config aliases the monorepo packages as an object; convert those to
// @rollup/plugin-alias array entries so we can prepend the React aliases.
const baseAlias = viteConfigWithoutReactPlugin.resolve?.alias ?? {};
const baseAliasEntries = Object.entries(
    // Vite types `alias` as a union of object/array forms; our root config
    // always uses the object form (see vite.config.ts), so narrowing here is
    // safe at this config boundary.
    // eslint-disable-next-line no-restricted-syntax
    baseAlias as Record<string, string>,
).map(([find, replacement]) => ({find, replacement}));

const ctViteConfig = {
    ...viteConfigWithoutReactPlugin,
    resolve: {
        ...viteConfigWithoutReactPlugin.resolve,
        alias: [...reactDevAliases, ...baseAliasEntries],
        dedupe: ["react", "react-dom"],
    },
    define: {
        ...(viteConfigWithoutReactPlugin.define ?? {}),
        // The React development builds are guarded by
        // `if (process.env.NODE_ENV !== "production")`, so keep NODE_ENV in
        // development for the aliases above to export anything.
        "process.env.NODE_ENV": JSON.stringify("development"),
        // Some components branch on this to detect a Storybook-like
        // (non-production) environment; the Cypress config set it too.
        "process.env.STORYBOOK": "true",
    },
};

/**
 * Playwright Component Testing configuration.
 *
 * These are the component tests that previously ran under Cypress. They render
 * Perseus components in a real browser so we can assert on things that jsdom
 * can't verify: applied CSS (keyboard focus/visibility), pointer drags, and
 * real OS-level key events.
 *
 * Component spec files use the `.pw.tsx` extension so they don't collide with
 * the Jest suite (`*.test.*`).
 */
export default defineConfig({
    testDir: "packages",
    testMatch: "**/*.pw.tsx",
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    // Default to the non-blocking "list" reporter. The HTML reporter is opt-in
    // (and never auto-serves) so local runs don't hang waiting on a report
    // server.
    reporter: process.env.CI ? "list" : [["list"], ["html", {open: "never"}]],
    use: {
        // The React tree is bundled and served by Vite, reusing the same
        // package aliases as the rest of the repo so `@khanacademy/*` imports
        // resolve to TypeScript source.
        ctViteConfig,
        trace: "on-first-retry",
    },
    projects: [
        {
            name: "chromium",
            use: {
                ...devices["Desktop Chrome"],
                // iPhone 14/15 Pro Max — matches the viewport the Cypress
                // config used, so viewport-dependent layout stays consistent.
                viewport: {width: 430, height: 932},
            },
        },
    ],
});
