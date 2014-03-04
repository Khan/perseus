var diff = require("../src/diffs/widget-diff-performer.jsx");

test("same single value", function() {
    var sameValue = diff("a", "a");
    strictEqual(sameValue.status, "unchanged");
});

test("different single value", function() {
    var differentValue = diff("a", "b");
    strictEqual(differentValue.status, "changed");
});

test("two identical objects", function() {
    var objSame = diff({a: "b"}, {a: "b"});
    strictEqual(objSame.status, "unchanged");

    strictEqual(objSame.children.length, 1);

    var child = objSame.children[0];
    strictEqual(child.status, "unchanged");
});

test("two different objects", function() {
    var objDiff = diff({a: "b"}, {a: "c"});
    strictEqual(objDiff.status, "changed");

    strictEqual(objDiff.children.length, 1);

    var diffChild = objDiff.children[0];
    strictEqual(diffChild.status, "changed");
});

test("a removed object", function() {
    var removedObj = diff({a: "b"}, {});
    strictEqual(removedObj.children[0].status, "removed");
});

test("an added object", function() {
    var addedObj = diff({}, {a: "c"});
    strictEqual(addedObj.children[0].status, "added");
});
