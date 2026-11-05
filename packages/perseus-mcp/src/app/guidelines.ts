import {FIXES} from "../domain/fixes/fixes";
import {findSections, splitSections} from "../domain/guidelines/guidelines";

import {GuidelinesUnavailableError} from "./errors";

import type {GuidelinesSource} from "../ports/guidelines-source";

/** A document longer than this is listed by its headings, not returned. */
const MAX_WHOLE = 20_000;

/** What get_server_info says of the guidelines. */
export type GuidelinesStatus =
    | {available: true; path: string; sections: number; characters: number}
    | {available: false; reason: string};

export function createGuidelineUseCases(deps: {source: GuidelinesSource}) {
    async function load() {
        const read = await deps.source.read();
        if (!read.ok) {
            throw new GuidelinesUnavailableError(read.reason);
        }
        return {...read, sections: splitSections(read.text)};
    }

    return {
        async status(): Promise<GuidelinesStatus> {
            const read = await deps.source.read();
            return read.ok
                ? {
                      available: true,
                      path: read.path,
                      sections: splitSections(read.text).length,
                      characters: read.text.length,
                  }
                : {available: false, reason: read.reason};
        },

        /**
         * The guidelines: the sections whose headings contain `section`, or
         * the whole document when it's short enough, else its headings to
         * choose from. Always with the fixes that apply rules by code.
         *
         * @throws GuidelinesUnavailableError
         */
        async getGuidelines(input: {section?: string}) {
            const {path, text, sections} = await load();
            const headings = sections
                .filter((s) => s.heading !== "")
                .map((s) => `${"#".repeat(s.level)} ${s.heading}`);
            const fixes = Object.entries(FIXES).map(([name, does]) => ({
                fix: name,
                does,
            }));
            if (input.section != null) {
                const found = findSections(sections, input.section);
                return found.length > 0
                    ? {path, sections: found.map((s) => s.text), fixes}
                    : {
                          path,
                          notFound: `No heading contains "${input.section}".`,
                          headings,
                          fixes,
                      };
            }
            if (text.length <= MAX_WHOLE) {
                return {path, text, fixes};
            }
            return {
                path,
                tooLong:
                    `The guidelines are ${text.length} characters; ask for ` +
                    "the sections the task needs by heading.",
                headings,
                fixes,
            };
        },
    };
}

export type GuidelineUseCases = ReturnType<typeof createGuidelineUseCases>;
