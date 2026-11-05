import {placeContent, placeInTree} from "./content-document";

import type {ContentTree, TreeNode} from "./content-document";

function nodes(...list: TreeNode[]): Map<string, TreeNode> {
    return new Map(list.map((node) => [node.id, node]));
}

const TREE: ContentTree = {
    domains: nodes({id: "d", slug: "math", title: "Math", listed: true}),
    courses: nodes(
        {id: "c1", slug: "algebra", title: "Algebra", listed: true},
        {id: "c2", slug: "pre-algebra", title: "Pre-algebra", listed: true},
        {id: "cx", slug: "staging", title: "Staging", listed: false},
    ),
    units: nodes(
        {id: "u1", slug: "equations", title: "Equations", listed: true},
        {id: "u2", slug: "intro", title: "Equations", listed: true},
    ),
    lessons: nodes({
        id: "l",
        slug: "one-step",
        title: "One-step",
        listed: true,
    }),
};

const ALGEBRA = {path: [{id: "d"}, {id: "c1"}, {id: "u1"}, {id: "l"}]};
const PRE_ALGEBRA = {path: [{id: "d"}, {id: "c2"}, {id: "u2"}, {id: "l"}]};
const STAGING = {path: [{id: "d"}, {id: "cx"}, {id: "u1"}, {id: "l"}]};

describe("placeInTree", () => {
    it("places content at each level of each of its paths, once", () => {
        // Arrange, Act
        const placement = placeInTree(TREE, [ALGEBRA, PRE_ALGEBRA]);

        // Assert
        expect(placement).toEqual({
            domain: ["math"],
            domainTitle: ["Math"],
            course: ["algebra", "pre-algebra"],
            courseTitle: ["Algebra", "Pre-algebra"],
            unit: ["equations", "intro"],
            unitTitle: ["Equations"],
            lesson: ["one-step"],
            lessonTitle: ["One-step"],
        });
    });

    it("leaves out ids that aren't in the tree", () => {
        // Arrange, Act
        const placement = placeInTree(TREE, [
            {path: [{id: "d"}, {id: "unknown"}]},
        ]);

        // Assert
        expect(placement).toMatchObject({domain: ["math"], course: []});
    });
});

describe("placeContent", () => {
    it("places listed content only on its listed paths", () => {
        // Arrange, Act
        const placement = placeContent(TREE, [
            {listed: true, topicPaths: [ALGEBRA, STAGING]},
        ]);

        // Assert
        expect(placement).toMatchObject({listed: true, course: ["algebra"]});
    });

    it("takes listed paths only from listed exercises", () => {
        // Arrange, Act
        const placement = placeContent(TREE, [
            {listed: false, topicPaths: [PRE_ALGEBRA]},
            {listed: true, topicPaths: [ALGEBRA]},
        ]);

        // Assert
        expect(placement).toMatchObject({listed: true, course: ["algebra"]});
    });

    it("places content with no listed path on all its paths, unlisted", () => {
        // Arrange, Act
        const placement = placeContent(TREE, [
            {listed: false, topicPaths: [ALGEBRA]},
            {listed: true, topicPaths: [STAGING]},
        ]);

        // Assert
        expect(placement).toMatchObject({
            listed: false,
            course: ["algebra", "staging"],
        });
    });
});
