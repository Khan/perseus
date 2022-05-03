import * as KAS from "../index.js";

describe("KAS", () => {
    it("should parse", () => {
        const {expr} = KAS.parse("3x \\frac{42}{42} sin^2y");

        const result = expr.print();

        expect(result).toEqual("3*x*42/42*sin(y)^(2)");
    });

    it("should evaluate expressions", () => {
        const {expr} = KAS.parse("(x^2+y^2)^.5");

        const result = expr.eval({x: 3, y: 4});

        expect(result).toEqual(5);
    });

    it("should compare expressions", () => {
        const expr1 = KAS.parse("(1-x)(-1-6x)").expr;
        const expr2 = KAS.parse("(6x+1)(x-1)").expr;

        const {equal} = KAS.compare(expr1, expr2);

        expect(equal).toBeTrue();
    });

    it("should compare equations", () => {
        const eq1 = KAS.parse("2w+50/w=25").expr;
        const eq2 = KAS.parse("w(12.5-w)=25").expr;

        const {equal} = KAS.compare(eq1, eq2);

        expect(equal).toBeTrue();
    });

    it("can collect like terms", () => {
        const {expr} = KAS.parse("1+1+x+x+x+y");

        const result = expr.collect().print();

        expect(result).toEqual("2+3*x+y");
    });

    it("can simplify exp/log expressions", () => {
        const {expr} = KAS.parse("b^(2*y*log_b x)");

        const result = expr.collect().print();

        expect(result).toEqual("x^(2*y)");
    });

    it("can expand expressions", () => {
        const {expr} = KAS.parse("ab(c+d)e^f");

        const expansion = expr.expand().print();

        expect(expansion).toEqual("a*b*e^(f)*c+a*b*e^(f)*d");
    });

    it("can expand and factor expressions", () => {
        const {expr} = KAS.parse("ab(c+d)e^f");

        const factored = expr.expand().factor().print();

        expect(factored).toEqual("a*b*e^(f)*(c+d)");
    });

    it("can simplify complex expressions", () => {
        const {expr} = KAS.parse("((nx^5)^5)/(n^-2x^2)^-3");

        const simplified = expr.simplify().print();

        expect(simplified).toEqual("n^(-1)*x^(31)");
    });

    it("can simplify if more complex expressions", () => {
        const {expr} = KAS.parse("(15np-25mp)/(15p^2-5p)+(20mp+10p^2)/(15p^2-5p)");

        const simplified = expr.simplify().print();

        expect(simplified).toEqual("(-1+3*p)^(-1)*(3*n+-1*m+2*p)");
    });
});
