import {SpeechRuleEngine} from "@khanacademy/mathjax-renderer";

import {mathOnlyParser} from "../widgets/interactive-graphs/utils";

/**
 * Given a string that may contain math within TeX represented by $...$,
 * returns the spoken math equivalent using the SpeechRuleEngine.
 *
 * Example: "Circle with radius $\frac{1}{2}$" ==> "Circle with radius one half"
 *
 * NOTE(LEMS): This is duplicated from perseus-editor's
 * `interactive-graph-editor/locked-figures/util.ts` so it can run in the
 * renderer (perseus can't import from perseus-editor). A follow-up will
 * migrate the editor to import this copy and delete its own.
 */
export async function generateSpokenMathDetails(
    mathString: string,
): Promise<string> {
    const engine = await SpeechRuleEngine.setup("en");
    let convertedSpeech = "";

    // All the information we need is in the first section,
    // whether it's typed as "blockmath" or "paragraph"
    const parsedContent = mathOnlyParser(mathString);

    // If it's a paragraph, we need to iterate through the sections
    // to look for individual math blocks.
    for (const piece of parsedContent) {
        switch (piece.type) {
            case "math":
                convertedSpeech += engine.texToSpeech(piece.content);
                break;
            case "specialCharacter":
                // We don't want the backslash from special character
                // to show up in the generated aria label.
                convertedSpeech +=
                    piece.content.length > 1
                        ? piece.content.slice(1)
                        : piece.content;
                break;
            default:
                convertedSpeech += piece.content;
                break;
        }
    }

    return convertedSpeech;
}
