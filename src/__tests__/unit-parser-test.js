var assert = require("assert");
var fs = require("fs");
var jison = require("jison");

var bnf = fs.readFileSync("src/unitvalue.jison", "utf8");
var parser = new jison.Parser(bnf);

describe("unit parser", function() {
    it("natural numbers", function() {
        assert.deepEqual(parser.parse("5 m"), {
            magnitude: 5,
            unit: {
                num: [{ name: "m", pow: 1 }],
                denom: null,
            },
        });
    });

    it("floating point numbers", function() {
        assert.deepEqual(parser.parse("5.5 m"), {
            magnitude: 5.5,
            unit: {
                num: [{ name: "m", pow: 1 }],
                denom: null,
            },
        });
    });

    it("weird units", function() {
        assert.deepEqual(parser.parse("5 Å").unit.num[0].name, "Å");
        assert.deepEqual(parser.parse("5 µÅ").unit.num[0].name, "µÅ");
        assert.deepEqual(parser.parse("5 °f").unit.num[0].name, "°f");
        assert.deepEqual(parser.parse("5 °C").unit.num[0].name, "°C");
        assert.deepEqual(parser.parse("5 ° C").unit.num[0].name, "° C");
        assert.deepEqual(parser.parse("5 ℃").unit.num[0].name, "℃");
        assert.deepEqual(parser.parse("5 ℉").unit.num[0].name, "℉");
        assert.deepEqual(parser.parse("5 BTU").unit.num[0].name, "BTU");
        assert.deepEqual(parser.parse("5 H-e").unit.num[0].name, "H-e");
        assert.deepEqual(parser.parse("5 fl oz").unit.num[0].name, "fl oz");
        assert.deepEqual(parser.parse("5 fl. oz.").unit.num[0].name, "fl. oz.");
    });

    it("invalid units", function() {
        assert.throws(function() { parser.parse("5 mc"); });
        assert.throws(function() { parser.parse("5 kc"); });
        assert.throws(function() { parser.parse("5 mmmHg"); });
        assert.throws(function() { parser.parse("5 ktsp"); });
    });

    it("unit equivalences", function() {
        isEquivalent("1 nmi", "1852 m");
        isEquivalent("1 olympiad", "1852 m");
        isEquivalent("1 ppm", "1 part per million");
        isEquivalent("1 arcminute", "60 arcsec");
        isEquivalent("4 cups", "64 tablespoons");

        // isntEquivalent("
    });

    it("scientific notation", function() {
        var answer = {
            magnitude: 500,
            unit: {
                num: [{ name: "m", pow: 1 }],
                denom: null,
            },
        };

        assert.deepEqual(parser.parse("5x10^2 m"), answer);
        assert.deepEqual(parser.parse("5 x 10 ^ 2 m"), answer);
        assert.deepEqual(parser.parse("5*10^2 m"), answer);
        assert.deepEqual(parser.parse("5×10^2 m"), answer);
        assert.deepEqual(parser.parse("5⋅10^2 m"), answer);
        assert.deepEqual(parser.parse("5·10^2 m"), answer);
    });

    it("exponents", function() {
        assert.deepEqual(parser.parse("5 m^2"), {
            magnitude: 5,
            unit: {
                num: [{ name: "m", pow: 2 }],
                denom: null,
            },
        });
    });

    it("denominators", function() {
        assert.deepEqual(parser.parse("5 m / s"), {
            magnitude: 5,
            unit: {
                num: [{ name: "m", pow: 1 }],
                denom: [{ name: "s", pow: 1 }],
            },
        });
    });

    it("unit multiplication", function() {
        assert.deepEqual(parser.parse("5 kg m / s*L"), {
            magnitude: 5,
            unit: {
                num: [{ name: "kg", pow: 1 }, { name: "m", pow: 1 }],
                denom: [{ name: "s", pow: 1 }, { name: "L", pow: 1 }],
            },
        });
    });
});
