import {spawnSync} from "node:child_process";

import type {Clipboard} from "../../ports/clipboard";

/**
 * The command that copies its standard input to the clipboard, by platform.
 * On Windows, PowerShell rather than `clip`, which garbles UTF-8 (and every
 * Perseus item has a "☃" in its widget placeholders).
 */
function copyCommand(
    platform: typeof process.platform,
): [string, string[]] | null {
    switch (platform) {
        case "darwin":
            return ["pbcopy", []];
        case "win32":
            return [
                "powershell.exe",
                [
                    "-NoProfile",
                    "-Command",
                    "[Console]::InputEncoding = [Text.Encoding]::UTF8; " +
                        "Set-Clipboard -Value ([Console]::In.ReadToEnd())",
                ],
            ];
        case "linux":
            return ["xclip", ["-selection", "clipboard"]];
        default:
            return null;
    }
}

/** Copies with the platform's clipboard command. */
export const systemClipboard: Clipboard = {
    copy(text) {
        const command = copyCommand(process.platform);
        if (command == null) {
            return false;
        }
        const [program, args] = command;
        const result = spawnSync(program, args, {input: text});
        return result.error == null && result.status === 0;
    },
};
