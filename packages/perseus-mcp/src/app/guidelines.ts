import {FIXES} from "../domain/fixes/fixes";
import {
    findSections,
    parseTopic,
    splitSections,
} from "../domain/guidelines/guidelines";

import {GuidelinesUnavailableError} from "./errors";

import type {GuidelineTopic} from "../domain/guidelines/guidelines";
import type {GuidelinesSource} from "../ports/guidelines-source";

/** A document longer than this is listed by its headings, not returned. */
const MAX_WHOLE = 20_000;

/** What get_server_info says of the guidelines. */
export type GuidelinesStatus =
    | {available: true; dir: string; topics: string[]; characters: number}
    | {available: false; reason: string};

function headingsOf(text: string): string[] {
    return splitSections(text)
        .filter((s) => s.heading !== "")
        .map((s) => `${"#".repeat(s.level)} ${s.heading}`);
}

export function createGuidelineUseCases(deps: {source: GuidelinesSource}) {
    async function load(): Promise<{dir: string; topics: GuidelineTopic[]}> {
        const read = await deps.source.read();
        if (!read.ok) {
            throw new GuidelinesUnavailableError(read.reason);
        }
        return {
            dir: read.dir,
            topics: read.files.map(({name, text}) =>
                parseTopic(name.replace(/\.md$/, ""), text),
            ),
        };
    }

    const fixes = () =>
        Object.entries(FIXES).map(([name, does]) => ({fix: name, does}));

    return {
        async status(): Promise<GuidelinesStatus> {
            const read = await deps.source.read();
            if (!read.ok) {
                return {available: false, reason: read.reason};
            }
            return {
                available: true,
                dir: read.dir,
                topics: read.files.map(({name}) => name.replace(/\.md$/, "")),
                characters: read.files.reduce((n, f) => n + f.text.length, 0),
            };
        },

        /**
         * The guidelines, a topic at a time. With no topic, the topics to
         * choose from (what each covers and when to read it), or, with
         * `section`, the sections of any topic whose headings contain it.
         * With a topic, that document: its sections matching `section`, or
         * the whole of it when it's short enough, else its headings to
         * choose from. Always with the fixes that apply rules by code.
         *
         * @throws GuidelinesUnavailableError
         */
        async getGuidelines(input: {topic?: string; section?: string}) {
            const {topics} = await load();
            if (input.topic == null) {
                if (input.section != null) {
                    const found = topics.flatMap((t) =>
                        findSections(splitSections(t.text), input.section!).map(
                            (s) => ({topic: t.topic, text: s.text}),
                        ),
                    );
                    return found.length > 0
                        ? {sections: found, fixes: fixes()}
                        : {
                              notFound: `No topic has a heading containing "${input.section}".`,
                              topics: topics.map(describeTopic),
                              fixes: fixes(),
                          };
                }
                return {
                    topics: topics.map(describeTopic),
                    howToRead:
                        "Read the topics whose readWhen fits the task, and " +
                        "their seeAlso topics, with get_guidelines({topic}); " +
                        "the more specific topic wins where they differ.",
                    fixes: fixes(),
                };
            }

            const topic = topics.find((t) => t.topic === input.topic);
            if (topic == null) {
                return {
                    notFound: `There's no topic "${input.topic}".`,
                    topics: topics.map(describeTopic),
                };
            }
            const about = {
                topic: topic.topic,
                title: topic.title,
                seeAlso: topic.seeAlso,
            };
            if (input.section != null) {
                const found = findSections(
                    splitSections(topic.text),
                    input.section,
                );
                return found.length > 0
                    ? {
                          ...about,
                          sections: found.map((s) => s.text),
                          fixes: fixes(),
                      }
                    : {
                          ...about,
                          notFound: `No heading contains "${input.section}".`,
                          headings: headingsOf(topic.text),
                          fixes: fixes(),
                      };
            }
            if (topic.text.length <= MAX_WHOLE) {
                return {...about, text: topic.text, fixes: fixes()};
            }
            return {
                ...about,
                tooLong:
                    `This topic is ${topic.text.length} characters; ask for ` +
                    "the sections the task needs by heading.",
                headings: headingsOf(topic.text),
                fixes: fixes(),
            };
        },
    };
}

function describeTopic(topic: GuidelineTopic) {
    return {
        topic: topic.topic,
        title: topic.title,
        summary: topic.summary,
        readWhen: topic.readWhen,
        seeAlso: topic.seeAlso,
        characters: topic.text.length,
    };
}

export type GuidelineUseCases = ReturnType<typeof createGuidelineUseCases>;
