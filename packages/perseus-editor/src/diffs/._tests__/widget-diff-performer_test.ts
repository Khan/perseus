import diff from "../widget-diff-performer";

describe("widget-diff-performer", function () {
    it("diffs a same single value", function () {
        const sameValue = diff("a", "a");
        expect(sameValue.status).toEqual("unchanged");
    });

    it("diffs a different single value", function () {
        const differentValue = diff("a", "b");
        expect(differentValue.status).toEqual("changed");
    });

    it("diffs two identical objects", function () {
        const objSame = diff({a: "b"}, {a: "b"});
        expect(objSame.status).toEqual("unchanged");

        expect(objSame.children).toHaveLength(1);

        const child = objSame.children[0];
        expect(child.status).toEqual("unchanged");
    });

    it("diffs two different objects", function () {
        const objDiff = diff({a: "b"}, {a: "c"});
        expect(objDiff.status).toEqual("changed");

        expect(objDiff.children).toHaveLength(1);

        const diffChild = objDiff.children[0];
        expect(diffChild.status).toEqual("changed");
    });

    it("diffs a removed object", function () {
        const removedObj = diff({a: "b"}, {});
        expect(removedObj.children[0].status).toEqual("removed");
    });

    it("diffs an added object", function () {
        const addedObj = diff({}, {a: "c"});
        expect(addedObj.children[0].status).toEqual("added");
    });
});
