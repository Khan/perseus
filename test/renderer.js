asyncTest("extractMath", 10, function() {
    var extract = Perseus.Renderer.extractMathAndWidgets;

    deepEqual(extract("Let $x$ be gorillas."),
            ["Let @@0@@ be gorillas.", ["$x$"]]);
    deepEqual(extract("*Let $2 * 3$ be* gorillas."),
            ["*Let @@0@@ be* gorillas.", ["$2 * 3$"]]);
    deepEqual(extract("Trying to @@17@@ confuse $u$."),
            ["Trying to @@0@@ confuse @@1@@.", ["@@17@@", "$u$"]]);

    deepEqual(extract("Escaping money: $\\$3.00$."),
            ["Escaping money: @@0@@.", ["$\\$3.00$"]]);
    deepEqual(extract("Escaping backslashes: $\\\\$3.00."),
            ["Escaping backslashes: @@0@@3.00.", ["$\\\\$"]]);
    deepEqual(extract("Escaping braces: $\\{$ $\\}$."),
            ["Escaping braces: @@0@@ @@1@@.", ["$\\{$", "$\\}$"]]);

    deepEqual(extract("Things in ${$x^2$ cows}$ braces."),
            ["Things in @@0@@ braces.", ["${$x^2$ cows}$"]]);

    // TODO(alpert): Error somehow?
    deepEqual(extract("Unclosed $ math."),
            ["Unclosed $ math.", []]);
    deepEqual(extract("{Unclosed $ math.}"),
            ["{Unclosed $ math.}", []]);
    deepEqual(extract("Mismatched ${$ braces."),
            ["Mismatched ${$ braces.", []]);

    start();
});
