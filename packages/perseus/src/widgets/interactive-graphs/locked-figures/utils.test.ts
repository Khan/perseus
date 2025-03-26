import {clampDomain} from "./utils";

// TODO: Change/handle the last case here
describe("clampDomain", () => {
    test.each`
        domain                   | graphXBounds | expected
        ${[-Infinity, Infinity]} | ${[-10, 10]} | ${[-10, 10]}
        ${[-20, Infinity]}       | ${[-10, 10]} | ${[-10, 10]}
        ${[-10, Infinity]}       | ${[-10, 10]} | ${[-10, 10]}
        ${[-5, Infinity]}        | ${[-10, 10]} | ${[-5, 10]}
        ${[-Infinity, 20]}       | ${[-10, 10]} | ${[-10, 10]}
        ${[-Infinity, 10]}       | ${[-10, 10]} | ${[-10, 10]}
        ${[-Infinity, 5]}        | ${[-10, 10]} | ${[-10, 5]}
        ${[-Infinity, -5]}       | ${[-10, 10]} | ${[-10, -5]}
        ${[-Infinity, -10]}      | ${[-10, 10]} | ${[-10, -10]}
        ${[10, -10]}             | ${[-10, 10]} | ${[-10, 10]}
        ${[-10, -20]}            | ${[-10, 10]} | ${[-10, 10]}
        ${[10, 10]}              | ${[-10, 10]} | ${[10, 10]}
        ${[-10, 10]}             | ${[-10, 10]} | ${[-10, 10]}
        ${[-Infinity, -9]}       | ${[-10, 10]} | ${[-10, -9]}
        ${[-Infinity, -11]}      | ${[-10, 10]} | ${null}
        ${[11, Infinity]}        | ${[-10, 10]} | ${null}
    `(
        "clampedDomain($domain, $graphXBounds) = $expected",
        ({domain, graphXBounds, expected}) => {
            expect(clampDomain(domain, graphXBounds)).toEqual(expected);
        },
    );
});
