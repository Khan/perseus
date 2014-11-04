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
