import {describe, it, expect} from "@jest/globals";

import {parseSnapshot} from "./parse-snapshot";
import {array, string} from "zod";

describe("parseSnapshot", () => {
    it("rejects an empty object", () => {
        expect(() => parseSnapshot({})).toThrowError();
    });

    it("accepts a snapshot with no exercises", () => {
        const data = {
            domains: [],
            courses: [],
            units: [],
            lessons: [],
            exercises: [],
        };
        expect(parseSnapshot(data)).toEqual(data);
    });

    it("parses JSON from a string", () => {
        const json = `{
            "domains": [],
            "courses": [],
            "units": [],
            "lessons": [],
            "exercises": []
        }`
        expect(parseSnapshot(json)).toEqual({
            domains: [],
            courses: [],
            units: [],
            lessons: [],
            exercises: []
        });
    });

    it("defaults listedAncestorIds to an empty array", () => {
        // listedAncestorIds can be `null` in the JSON snapshot.
        const data = {
            domains: [],
            courses: [
                {
                    id: "course-1",
                    slug: "course-1-slug",
                    listedAncestorIds: null,
                }
            ],
            units: [
                {
                    id: "unit-1",
                    slug: "unit-1-slug",
                    listedAncestorIds: null,
                }
            ],
            lessons: [
                {
                    id: "lesson-1",
                    slug: "lesson-1-slug",
                    listedAncestorIds: null,
                }
            ],
            exercises: [
                {
                    id: "exercise-1",
                    exerciseLength: 7,
                    problemTypes: [],
                    translatedPerseusContentSha: "",
                    listedAncestorIds: null,
                }
            ],
        };

        const parsed = parseSnapshot(data);

        expect(parsed.courses[0].listedAncestorIds).toEqual([])
        expect(parsed.units[0].listedAncestorIds).toEqual([])
        expect(parsed.lessons[0].listedAncestorIds).toEqual([])
        expect(parsed.exercises[0].listedAncestorIds).toEqual([])
    })
});
