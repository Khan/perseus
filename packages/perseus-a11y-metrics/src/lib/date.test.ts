import {urlSafeDate} from "./date";

describe("urlSafeDate", () => {
    it("includes the year, month, date, hours, minutes, and seconds", () => {
        const date = new Date("1999-12-21T10:11:12.999Z");
        expect(urlSafeDate(date)).toEqual("1999-12-21-101112");
    });

    it("always formats the month, date, hours, minutes, and seconds as two digits", () => {
        const date = new Date("2001-01-02T03:04:05.000Z");
        expect(urlSafeDate(date)).toEqual("2001-01-02-030405");
    });
});
