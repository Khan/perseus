import {createRequire} from "node:module";
import path from "node:path";

import {withCache} from "../../domain/search/math-speech";

/**
 * Reads TeX aloud with MathJax's speech rule engine (through
 * @khanacademy/mathjax-renderer, which the previews use too), in ClearSpeak
 * English: "the square root of x plus 1", "x is greater than or equal to
 * 4". For indexing, so a search for words finds the math.
 *
 * In Node the engine looks for its locale files beside its own script, not
 * where its package keeps them, unless SRE_JSON_PATH says; it reads that
 * when it's first loaded, so it's set before the import. Setup doesn't wait
 * for the locale either, so this waits on engineReady.
 */
export async function createSreMathSpeech(): Promise<(tex: string) => string> {
    const require = createRequire(import.meta.url);
    const rendererRequire = createRequire(
        require.resolve("@khanacademy/mathjax-renderer"),
    );
    process.env.SRE_JSON_PATH ??= path.join(
        path.dirname(
            rendererRequire.resolve("speech-rule-engine/package.json"),
        ),
        "lib/mathmaps",
    );
    const {SpeechRuleEngine} = await import("@khanacademy/mathjax-renderer");
    // The same engine instance the renderer uses: the one its own
    // dependency resolves to.
    const system: {
        setupEngine(options: object): Promise<unknown>;
        engineReady(): Promise<unknown>;
    } = rendererRequire("speech-rule-engine/js/common/system");
    const engine = await SpeechRuleEngine.setup("en");
    await system.engineReady();
    await system.setupEngine({
        domain: "clearspeak",
        style: "default",
        locale: "en",
    });
    await system.engineReady();
    return withCache((tex) => engine.texToSpeech(tex));
}
