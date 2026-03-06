import {describe, it} from "@jest/globals";

import * as number from "../number";

describe("knumber", function () {
    it.each([3, Math.PI, 6.28, 5e10, 1 / 0])("is a number: %s", (num: any) => {
        expect(number.is(num)).toBe(true);
    });

    it.each(["10", 0 / 0, NaN])("is not a number:%s", (num: any) => {
        expect(number.is(num)).toBe(false);
    });

    it("two equal numbers should be equal", function () {
        const result = number.equal(1 / 3, (1 / 90) * 30);
        expect(result).toBe(true);
    });

    it("two different numbers should not be equal", function () {
        const result = number.equal(1 / 3, 1.333333);
        expect(result).toBe(false);
    });

    it("Infinity should equal Infinity", function () {
        const result = number.equal(
            Number.POSITIVE_INFINITY,
            Number.POSITIVE_INFINITY,
        );
        expect(result).toBe(true);
    });

    it("+Infinity should not equal -Infinity", function () {
        const result = number.equal(
            Number.POSITIVE_INFINITY,
            Number.NEGATIVE_INFINITY,
        );
        expect(result).toBe(false);
    });

    it("sign(0) should be 0", function () {
        expect(number.sign(0)).toBe(0);
    });

    it("sign(-0.0) should be 0", function () {
        expect(number.sign(-0.0)).toBe(0);
    });

    it("sign(3.2) should be 1", function () {
        expect(number.sign(3.2)).toBe(1);
    });

    it("sign(-2.8) should be -1", function () {
        expect(number.sign(-2.8)).toBe(-1);
    });

    it("isInteger(-2.8) should be false", function () {
        expect(number.isInteger(-2.8)).toBe(false);
    });

    it("isInteger(-2) should be true", function () {
        expect(number.isInteger(-2)).toBe(true);
    });

    it("isInteger(10.0) should be true", () => {
        expect(number.isInteger(10)).toBe(true);
    });

    it("rounds to correct precision", () => {
        expect(number.round(0.06793, 4)).toBe(0.0679);
        expect(number.round(0.06793, 3)).toBe(0.068);
    });

    it("rounds to correct interval", () => {
        expect(number.roundTo(83, 5)).toBe(85);
        expect(number.roundTo(2.3, 0.5)).toBe(2.5);
    });

    it("floors to the correct interval", () => {
        expect(number.floorTo(83, 5)).toBe(80);
        expect(number.floorTo(2.3, 0.5)).toBe(2);
    });

    it("ceils to the correct interval", () => {
        expect(number.ceilTo(81, 5)).toBe(85);
        expect(number.ceilTo(2.1, 0.5)).toBe(2.5);
    });

    it("toFraction(-2) should be -2/1", function () {
        expect(number.toFraction(-2)).toStrictEqual([-2, 1]);
    });

    it("toFraction(-2.5) should be -5/2", function () {
        expect(number.toFraction(-2.5)).toStrictEqual([-5, 2]);
    });

    it("toFraction(2/3) should be 2/3", function () {
        expect(number.toFraction(2 / 3)).toStrictEqual([2, 3]);
    });

    it("toFraction(283.33...) should be 850/3", function () {
        expect(number.toFraction(283 + 1 / 3)).toStrictEqual([850, 3]);
    });

    it("toFraction(0) should be 0/1", function () {
        expect(number.toFraction(0)).toStrictEqual([0, 1]);
    });

    it("toFraction(pi) should be pi/1", function () {
        expect(number.toFraction(Math.PI)).toStrictEqual([Math.PI, 1]);
    });

    it("toFraction(0.66) should be 33/50", function () {
        expect(number.toFraction(0.66)).toStrictEqual([33, 50]);
    });

    it("toFraction(0.66, 0.01) should be 2/3", function () {
        expect(number.toFraction(0.66, 0.01)).toStrictEqual([2, 3]);
    });

    it("toFraction(1000/3 - 999/3 should be 1/3)", function () {
        expect(number.toFraction(1000 / 3 - 999 / 3)).toStrictEqual([1, 3]);
    });
});
