import {spawnSync} from "node:child_process";

import type {Browser} from "../../ports/browser";

/** The command that opens a URL in the default browser, by platform. */
function openCommand(
    platform: typeof process.platform,
    url: string,
): [string, string[]] | null {
    switch (platform) {
        case "darwin":
            return ["open", [url]];
        case "win32":
            // `start`'s first quoted argument is the window's title.
            return ["cmd.exe", ["/c", "start", '""', url]];
        case "linux":
            return ["xdg-open", [url]];
        default:
            return null;
    }
}

/** Opens URLs with the platform's command for the default browser. */
export const systemBrowser: Browser = {
    open(url) {
        const command = openCommand(process.platform, url);
        if (command == null) {
            return false;
        }
        const [program, args] = command;
        // Each command hands the URL to the browser and returns.
        const result = spawnSync(program, args, {
            stdio: "ignore",
            timeout: 10_000,
        });
        return result.error == null && result.status === 0;
    },
};
