import * as KAS from "../index";

describe("Euler's number (e) and Imaginary unit (i) Constants", () => {
    describe("KAS.compare Tests", () => {
        test("should compare expressions with e and i constants", () => {
            expect(
                KAS.compare(KAS.parse("e").expr, KAS.parse("e").expr).equal,
            ).toBe(true);
            expect(
                KAS.compare(KAS.parse("i").expr, KAS.parse("i").expr).equal,
            ).toBe(true);
            expect(
                KAS.compare(
                    KAS.parse("e^(i*pi)").expr,
                    KAS.parse("e^(i*pi)").expr,
                ).equal,
            ).toBe(true);
        });
    });

    describe("Failed Parsing Tests", () => {
        test("should fail parsing incomplete expressions", () => {
            expect(KAS.parse("e^").parsed).toBe(false);
            expect(KAS.parse("i^").parsed).toBe(false);
            expect(KAS.parse("e^(").parsed).toBe(false);
            expect(KAS.parse("i^(").parsed).toBe(false);
            expect(KAS.parse("e^()").parsed).toBe(false);
            expect(KAS.parse("i^()").parsed).toBe(false);
        });
    });
});
