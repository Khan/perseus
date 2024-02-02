import InteractiveUtil from "./interactive-util";

describe("normalizeOptions", () => {
    it("wraps single functions in arrays", () => {
        const options = {
            add: () => {},
            modify: () => {},
            draw: () => {},
            remove: () => {},
            constraints: () => {},
            onMoveStart: () => {},
            onMove: () => {},
            onMoveEnd: () => {},
            onClick: () => {},
        };
        expect(InteractiveUtil.normalizeOptions(options)).toEqual({
            add: [options.add],
            modify: [options.modify],
            draw: [options.draw],
            remove: [options.remove],
            constraints: [options.constraints],
            onMoveStart: [options.onMoveStart],
            onMove: [options.onMove],
            onMoveEnd: [options.onMoveEnd],
            onClick: [options.onClick],
        });
    });

    it("tolerates missing properties", () => {
        const options = {
            add: () => {},
        };
        expect(InteractiveUtil.normalizeOptions(options)).toEqual({
            add: [options.add],
        });
    });

    it("ignores extra properties", () => {
        const options = {
            foo: () => {},
        };
        expect(InteractiveUtil.normalizeOptions(options)).toEqual({
            foo: options.foo,
        });
    });

    it("does not modify its argument", () => {
        const options = {
            add: () => {},
        };
        const optionsCopy = {...options};
        InteractiveUtil.normalizeOptions(options);
        expect(options).toEqual(optionsCopy);
    });

    it("leaves existing arrays of functions alone", () => {
        const options = {
            add: [() => {}],
            modify: [() => {}],
            draw: [() => {}],
            remove: [() => {}],
            onMoveStart: [() => {}],
            onMove: [() => {}],
            onMoveEnd: [() => {}],
            onClick: [() => {}],
        };
        expect(InteractiveUtil.normalizeOptions(options)).toEqual(options);
    });

    it("flattens arrays", () => {
        const dummyFunction = () => {};
        const options = {
            add: [[dummyFunction]],
            modify: [[dummyFunction]],
            draw: [[dummyFunction]],
            remove: [[dummyFunction]],
            onMoveStart: [[dummyFunction]],
            onMove: [[dummyFunction]],
            onMoveEnd: [[dummyFunction]],
            onClick: [[dummyFunction]],
        };
        expect(InteractiveUtil.normalizeOptions(options)).toEqual({
            add: [dummyFunction],
            modify: [dummyFunction],
            draw: [dummyFunction],
            remove: [dummyFunction],
            onMoveStart: [dummyFunction],
            onMove: [dummyFunction],
            onMoveEnd: [dummyFunction],
            onClick: [dummyFunction],
        });
    });
});
