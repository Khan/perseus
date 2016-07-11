/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* eslint-disable no-undef, no-var */
/* To fix, remove an entry above, run ka-lint, and fix errors. */



describe("widget-diff-performer", function() {
    var diff;

    beforeEach(function() {
        diff = require("../widget-diff-performer.jsx");
    });

    it("diffs a same single value", function() {
        var sameValue = diff("a", "a");
        expect(sameValue.status).toBe("unchanged");
    });

    it("diffs a different single value", function() {
        var differentValue = diff("a", "b");
        expect(differentValue.status).toBe("changed");
    });

    it("diffs two identical objects", function() {
        var objSame = diff({a: "b"}, {a: "b"});
        expect(objSame.status).toBe("unchanged");

        expect(objSame.children.length).toBe(1);

        var child = objSame.children[0];
        expect(child.status).toBe("unchanged");
    });

    it("diffs two different objects", function() {
        var objDiff = diff({a: "b"}, {a: "c"});
        expect(objDiff.status).toBe("changed");

        expect(objDiff.children.length).toBe(1);

        var diffChild = objDiff.children[0];
        expect(diffChild.status).toBe("changed");
    });

    it("diffs a removed object", function() {
        var removedObj = diff({a: "b"}, {});
        expect(removedObj.children[0].status).toBe("removed");
    });

    it("diffs an added object", function() {
        var addedObj = diff({}, {a: "c"});
        expect(addedObj.children[0].status).toBe("added");
    });
});
