// @ts-check
// A TypeDoc plugin that emits GitHub Actions annotation commands for warnings
// and errors, making them surface as inline annotations on PRs and in the
// Actions summary UI.
//
// Only intended for use in CI.
//

const {ConsoleLogger, LogLevel} = require("typedoc");

/**
 * @typedef {{fileName: string; line: number; col: number}} SourceLocation
 */

class GitHubActionsLogger extends ConsoleLogger {
    /**
     * Resolve file path and 1-based line/col position.
     * Returns `null` when no location info is available.
     *
     * @overload
     * @param {import("typedoc").MinimalNode} [node]
     * @returns {SourceLocation | null}
     */
    /**
     * @overload
     * @param {number} pos
     * @param {import("typedoc").MinimalSourceFile} file
     * @returns {SourceLocation | null}
     */
    _resolveLocation(nodeOrPos, file) {
        try {
            if (typeof nodeOrPos === "number" && file != null) {
                // pos + file overload
                const {line, character} =
                    file.getLineAndCharacterOfPosition(nodeOrPos);
                return {
                    fileName: file.fileName,
                    line: line + 1,
                    col: character + 1,
                };
            }
            if (nodeOrPos != null && typeof nodeOrPos === "object") {
                // MinimalNode overload
                const pos = nodeOrPos.getStart();
                const srcFile = nodeOrPos.getSourceFile();
                const {line, character} =
                    srcFile.getLineAndCharacterOfPosition(pos);
                return {
                    fileName: srcFile.fileName,
                    line: line + 1,
                    col: character + 1,
                };
            }
        } catch {
            // If location extraction fails for any reason, omit it gracefully.
        }
        return null;
    }

    /**
     * Write a GitHub Actions workflow command to stdout.
     * Format: ::<level> file=<path>,line=<n>,col=<n>::<message>
     *
     * @overload
     * @param {"error" | "warning"} level
     * @param {string} text
     * @param {import("typedoc").MinimalNode} [node]
     * @returns {void}
     */
    /**
     * @overload
     * @param {"error" | "warning"} level
     * @param {string} text
     * @param {number} pos
     * @param {import("typedoc").MinimalSourceFile} file
     * @returns {void}
     */
    _writeAnnotation(level, text, nodeOrPos, file) {
        const loc = this._resolveLocation(nodeOrPos, file);
        const locationParams = loc
            ? ` file=${loc.fileName},line=${loc.line},col=${loc.col}`
            : "";
        process.stdout.write(`::${level}${locationParams}::${text}\n`);
    }

    /** Overloaded */
    warn(text, nodeOrPos, file) {
        this._writeAnnotation("warning", text, nodeOrPos, file);
        super.warn(text, nodeOrPos, file);
    }

    /** Overloaded */
    error(text, nodeOrPos, file) {
        this._writeAnnotation("error", text, nodeOrPos, file);
        super.error(text, nodeOrPos, file);
    }

    /** Overloaded */
    validationWarning(text, nodeOrPos, file) {
        this._writeAnnotation("warning", text, nodeOrPos, file);
        super.validationWarning(text, nodeOrPos, file);
    }

    /**
     * Override: Suppresses the normal `[warning]`/`[error]` console output for
     * levels already emitted as annotations above. Info and verbose still pass
     * through to ConsoleLogger as usual.
     *
     * @param {string} message
     * @param {import("typedoc").LogLevel} level
     */
    log(message, level) {
        if (level !== LogLevel.Warn && level !== LogLevel.Error) {
            super.log(message, level);
        }
    }
}

/** @param {import("typedoc").Application} app */
function load(app) {
    app.logger = new GitHubActionsLogger();
}

module.exports = {load};
