/**
 * @jest-environment node
 */
// What TeX's color commands render as, in item text.
import {texInputConfig} from "@khanacademy/mathjax-renderer/dist/tex-input-config";

import {wonderBlocksTokensCss} from "../../runtime-paths";

import {readKhanStyle} from "./khan-style-source";

const css = wonderBlocksTokensCss();

function texColor(command: string): string {
    const [definition] = texInputConfig.macros[command];
    if (typeof definition !== "string") {
        throw new Error(`${command} isn't a color command.`);
    }
    return `#${/##([0-9A-Fa-f]{6})/.exec(definition)![1]}`.toUpperCase();
}

describe("readKhanStyle", () => {
    it("gives the math colors TeX's color commands render as", () => {
        // Arrange, Act
        const {colors} = readKhanStyle(css);

        // Assert
        expect(
            [
                colors.blue,
                colors.green,
                colors.gold,
                colors.red,
                colors.pink,
            ].map((c) => c.toUpperCase()),
        ).toEqual(
            ["blueD", "greenD", "goldD", "redD", "maroonD"].map(texColor),
        );
    });

    it("gives every color as a hex value", () => {
        // Arrange, Act
        const {colors, ui, tints} = readKhanStyle(css);

        // Assert
        expect(
            [
                ...Object.values(colors),
                ...Object.values(ui),
                ...Object.values(tints),
            ].filter((c) => !/^#[0-9a-fA-F]{6}$/.test(c)),
        ).toEqual([]);
    });
});
