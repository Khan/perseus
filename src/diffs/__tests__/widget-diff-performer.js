/* global beforeEach, expect */

describe("widget-diff-performer", function() {
    let diff;

    beforeEach(function() {
        diff = require("../widget-diff-performer.jsx");
    });

    it("diffs a same single value", function() {
        const sameValue = diff("a", "a");
        expect(sameValue.status).toBe("unchanged");
    });

    it("diffs a different single value", function() {
        const differentValue = diff("a", "b");
        expect(differentValue.status).toBe("changed");
    });

    it("diffs two identical objects", function() {
        const objSame = diff({a: "b"}, {a: "b"});
        expect(objSame.status).toBe("unchanged");

        expect(objSame.children.length).toBe(1);

        const child = objSame.children[0];
        expect(child.status).toBe("unchanged");
    });

    it("diffs two different objects", function() {
        const objDiff = diff({a: "b"}, {a: "c"});
        expect(objDiff.status).toBe("changed");

        expect(objDiff.children.length).toBe(1);

        const diffChild = objDiff.children[0];
        expect(diffChild.status).toBe("changed");
    });

    it("diffs a removed object", function() {
        const removedObj = diff({a: "b"}, {});
        expect(removedObj.children[0].status).toBe("removed");
    });

    it("diffs an added object", function() {
        const addedObj = diff({}, {a: "c"});
        expect(addedObj.children[0].status).toBe("added");
    });
});
