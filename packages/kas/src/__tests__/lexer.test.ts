import {lex} from "../lexer";

describe("lexer", () => {
    it("should lex simple tokens", () => {
        const tokens = lex("1+2xy");

        expect(tokens).toMatchSnapshot();
    });

    it("should lex LaTeX tokens", () => {
        const tokens = lex("\\left(\\frac{1}{x}\u22121\\right)");

        expect(tokens).toMatchSnapshot();
    });

    it("should lex different numbers", () => {
        const tokens = lex("1+-2+3.14");

        expect(tokens).toMatchSnapshot();
    });

    it("should lex with options", () => {
        const tokens = lex("f(x)=e^x", {functions: ["f"]});

        expect(tokens).toMatchSnapshot();
    });
});
