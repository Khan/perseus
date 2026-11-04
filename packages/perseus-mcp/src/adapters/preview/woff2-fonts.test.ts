import {keepWoff2Fonts} from "./woff2-fonts";

describe("keepWoff2Fonts", () => {
    it("keeps only the woff2 source of a font offered in several formats", () => {
        // Arrange
        const css =
            "@font-face{font-family:Symbola;" +
            "src:url(data:application/vnd.ms-fontobject;base64,AAA=);" +
            "src:local(Symbola),url(data:font/woff2;base64,BBB=)" +
            'format("woff2"),url(data:font/woff;base64,CCC=)format("woff"),' +
            'url(data:font/ttf;base64,DDD=)format("truetype")}';

        // Act
        const result = keepWoff2Fonts(css);

        // Assert
        expect(result).toBe(
            "@font-face{font-family:Symbola;" +
                'src:local(Symbola),url(data:font/woff2;base64,BBB=)format("woff2")}',
        );
    });

    it("leaves a font with no woff2 source unchanged", () => {
        // Arrange
        const css =
            "@font-face{font-family:Old;" +
            'src:url(data:font/woff;base64,CCC=)format("woff")}';

        // Act
        const result = keepWoff2Fonts(css);

        // Assert
        expect(result).toBe(css);
    });

    it("leaves the CSS around the font-face rules unchanged", () => {
        // Arrange
        const css =
            ".a{color:red}@font-face{font-family:Lato;font-weight:700;" +
            'src:url(data:font/woff2;base64,EEE=)format("woff2");' +
            "unicode-range:U+0-FF}.b{color:blue}";

        // Act
        const result = keepWoff2Fonts(css);

        // Assert
        expect(result).toBe(css);
    });
});
