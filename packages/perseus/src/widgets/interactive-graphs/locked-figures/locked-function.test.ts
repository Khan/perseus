import {clampedDomain} from "./locked-function";

describe("clampedDomain", () => {
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
    `(
        "clampedDomain($domain, $graphXBounds) = $expected",
        ({domain, graphXBounds, expected}) => {
            expect(clampedDomain(domain, graphXBounds)).toEqual(expected);
        },
    );
});
