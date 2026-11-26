/**
 * Runs once before any Playwright test (see `globalSetup` in
 * playwright.config.ts).
 */
import {chromium} from "@playwright/test";

/** What Playwright's error says when a browser it needs isn't installed. */
const MISSING_EXECUTABLE = "Executable doesn't exist";

/**
 * Explain why Playwright's Chromium couldn't be launched.
 *
 * A missing browser gets its own message, naming the command that installs
 * the build our pinned Playwright expects. Any other failure keeps
 * Playwright's message, which already names its fix (for missing Linux
 * libraries, for example, `playwright install-deps`).
 */
function describeBrowserLaunchFailure(error: unknown): string {
    const message = error instanceof Error ? error.message : String(error);
    if (!message.includes(MISSING_EXECUTABLE)) {
        return `Could not launch Playwright's Chromium: ${message}`;
    }
    return "Playwright's Chromium isn't installed. Install it by running this from the repository root:\n\n    pnpm exec playwright install chromium";
}

/**
 * Check that Playwright's Chromium can be launched.
 *
 * Without the browser build our pinned Playwright expects, every test fails
 * in its `browser` fixture, each with the same error. Launching it once up
 * front stops the run with one message that says how to fix it instead.
 *
 * Following Khan/frontend's `require-playwright-browser`, this explains the
 * fix rather than installing the browser itself, so a test run never starts a
 * large download by surprise.
 *
 * @throws {Error} If the browser can't be launched.
 */
export default async function globalSetup(): Promise<void> {
    let browser;
    try {
        browser = await chromium.launch();
    } catch (error) {
        throw new Error(describeBrowserLaunchFailure(error));
    }
    await browser.close();
}
