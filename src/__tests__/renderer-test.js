describe("Renderer", function() {
    var Renderer;

    beforeEach(function() {
        Renderer = require("../renderer.jsx");
    });

    it("extracts math", function() {
        var extract = Renderer.extractMathAndWidgets;

        expect(extract("Let $x$ be gorillas.")).toEqual(
                ["Let @@0@@ be gorillas.", ["$x$"]]);
        expect(extract("*Let $2 * 3$ be* gorillas.")).toEqual(
                ["*Let @@0@@ be* gorillas.", ["$2 * 3$"]]);
        expect(extract("Trying to @@17@@ confuse $u$.")).toEqual(
                ["Trying to @@0@@ confuse @@1@@.", ["@@17@@", "$u$"]]);

        expect(extract("Escaping money: $\\$3.00$.")).toEqual(
                ["Escaping money: @@0@@.", ["$\\$3.00$"]]);
        expect(extract("Escaping backslashes: $\\\\$3.00.")).toEqual(
                ["Escaping backslashes: @@0@@3.00.", ["$\\\\$"]]);
        expect(extract("Escaping braces: $\\{$ $\\}$.")).toEqual(
                ["Escaping braces: @@0@@ @@1@@.", ["$\\{$", "$\\}$"]]);

        expect(extract("Things in ${$x^2$ cows}$ braces.")).toEqual(
                ["Things in @@0@@ braces.", ["${$x^2$ cows}$"]]);

        // TODO(alpert): Error somehow?
        expect(extract("Unclosed $ math.")).toEqual(
                ["Unclosed $ math.", []]);
        expect(extract("{Unclosed $ math.}")).toEqual(
                ["{Unclosed $ math.}", []]);
        expect(extract("Mismatched ${$ braces.")).toEqual(
                ["Mismatched ${$ braces.", []]);
    });
});
