// The serializer under test is registered globally in `setupFilesAfterEnv`
// (see test.config.js), so these tests exercise it through `expect()` just as
// any other snapshot test would.
import {StyleSheet, css} from "aphrodite";

function elementWithClass(className) {
    const element = document.createElement("div");
    element.setAttribute("class", className);
    return element;
}

describe("aphrodite-snapshot-serializer", () => {
    it("replaces an Aphrodite class with its declarations", () => {
        // Arrange
        const styles = StyleSheet.create({
            box: {display: "flex", color: "red"},
        });

        // Act
        const element = elementWithClass(css(styles.box));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="display: flex; color: red;"
            />
        `);
    });

    it("keeps classes that Aphrodite did not generate", () => {
        // Arrange
        const styles = StyleSheet.create({box: {color: "red"}});

        // Act
        const element = elementWithClass(`perseus-widget ${css(styles.box)}`);

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              class="perseus-widget"
              style="color: red;"
            />
        `);
    });

    it("leaves elements without Aphrodite classes unchanged", () => {
        // Arrange, Act
        const element = elementWithClass("perseus-widget");

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              class="perseus-widget"
            />
        `);
    });

    it("adds px to numeric values only for properties Aphrodite treats as lengths", () => {
        // Arrange
        const styles = StyleSheet.create({
            box: {width: 40, lineHeight: 1.5, zIndex: 2, WebkitLineClamp: 3},
        });

        // Act
        const element = elementWithClass(css(styles.box));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="width: 40px; line-height: 1.5; z-index: 2; -webkit-line-clamp: 3;"
            />
        `);
    });

    it("kebab-cases property names, including vendor prefixes", () => {
        // Arrange
        const styles = StyleSheet.create({
            box: {
                backgroundColor: "red",
                WebkitFontSmoothing: "antialiased",
                msOverflowStyle: "none",
            },
        });

        // Act
        const element = elementWithClass(css(styles.box));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="background-color: red; -webkit-font-smoothing: antialiased; -ms-overflow-style: none;"
            />
        `);
    });

    it("prints CSS custom properties as written", () => {
        // Arrange
        const styles = StyleSheet.create({box: {"--myColor": "red"}});

        // Act
        const element = elementWithClass(css(styles.box));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="--myColor: red;"
            />
        `);
    });

    it("omits empty values left behind by conditional styles", () => {
        // Arrange
        const styles = StyleSheet.create({
            box: {
                color: "red",
                outline: undefined,
                border: null,
                margin: "",
                padding: false,
            },
        });

        // Act
        const element = elementWithClass(css(styles.box));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="color: red;"
            />
        `);
    });

    it("prints one declaration per value when a property has fallbacks", () => {
        // Arrange
        const styles = StyleSheet.create({
            box: {display: ["-webkit-box", "flex"]},
        });

        // Act
        const element = elementWithClass(css(styles.box));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="display: -webkit-box; display: flex;"
            />
        `);
    });

    it("uses the value from the later style when two styles set the same property", () => {
        // Arrange
        const styles = StyleSheet.create({
            base: {color: "red", display: "flex"},
            override: {color: "blue"},
        });

        // Act
        const element = elementWithClass(css(styles.base, styles.override));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="color: blue; display: flex;"
            />
        `);
    });

    it("ignores falsy entries passed to css()", () => {
        // Arrange
        const styles = StyleSheet.create({box: {color: "red"}});

        // Act
        const element = elementWithClass(css(false, styles.box, null));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="color: red;"
            />
        `);
    });

    it("prints pseudo-class and media query blocks as data-style attributes", () => {
        // Arrange
        const styles = StyleSheet.create({
            box: {
                color: "red",
                ":hover": {color: "blue"},
                "@media (max-width: 100px)": {
                    color: "green",
                    ":focus": {color: "purple"},
                },
            },
        });

        // Act
        const element = elementWithClass(css(styles.box));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              data-style-hover="color: blue;"
              data-style-media-max-width-100px="color: green;"
              data-style-media-max-width-100px-focus="color: purple;"
              style="color: red;"
            />
        `);
    });

    it("merges nested blocks from multiple styles rather than replacing them", () => {
        // Arrange
        const styles = StyleSheet.create({
            base: {":hover": {color: "blue", display: "flex"}},
            // The nested ":focus" inside "@media" exists only in this style,
            // so merging has to create both levels from nothing.
            override: {
                ":hover": {color: "green"},
                "@media (max-width: 100px)": {":focus": {color: "purple"}},
            },
        });

        // Act
        const element = elementWithClass(css(styles.base, styles.override));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              data-style-hover="color: green; display: flex;"
              data-style-media-max-width-100px-focus="color: purple;"
            />
        `);
    });

    it("prints keyframes as a data-keyframes attribute", () => {
        // Arrange
        const styles = StyleSheet.create({
            box: {
                animationName: {
                    "0%": {opacity: 0},
                    "100%": {opacity: 1},
                },
                animationDuration: "1s",
            },
        });

        // Act
        const element = elementWithClass(css(styles.box));

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              data-keyframes-animation-name="0% { opacity: 0; } 100% { opacity: 1; }"
              style="animation-duration: 1s;"
            />
        `);
    });

    it("prints existing inline styles after Aphrodite declarations", () => {
        // Arrange
        const styles = StyleSheet.create({box: {color: "red"}});
        const element = elementWithClass(css(styles.box));

        // Act
        element.setAttribute("style", "color: blue;");

        // Assert
        expect(element).toMatchInlineSnapshot(`
            <div
              style="color: red; color: blue;"
            />
        `);
    });

    it("expands Aphrodite classes on descendants", () => {
        // Arrange
        const styles = StyleSheet.create({
            outer: {display: "flex"},
            inner: {color: "red"},
        });
        const outer = elementWithClass(css(styles.outer));

        // Act
        outer.appendChild(elementWithClass(css(styles.inner)));

        // Assert
        expect(outer).toMatchInlineSnapshot(`
            <div
              style="display: flex;"
            >
              <div
                style="color: red;"
              />
            </div>
        `);
    });

    it("does not modify the live DOM", () => {
        // Arrange
        const styles = StyleSheet.create({box: {color: "red"}});
        const className = css(styles.box);
        const element = elementWithClass(className);

        // Act
        expect(element).toMatchInlineSnapshot(`
            <div
              style="color: red;"
            />
        `);

        // Assert
        expect(element.getAttribute("class")).toBe(className);
        expect(element.hasAttribute("style")).toBe(false);
    });
});
