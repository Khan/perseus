import {SpeechRuleEngine} from "@khanacademy/mathjax-renderer";
import {useEffect, useState} from "react";

import {mathOnlyParser} from "../../widgets/interactive-graphs/utils";
import {usePerseusI18n} from "../i18n-context";

function containsTex(content: string): boolean {
    return mathOnlyParser(content).some((piece) => piece.type === "math");
}

function keepTex(tex: string): string {
    return tex;
}

export function toSpokenText(
    content: string,
    texToSpeech: (tex: string) => string,
): string {
    return mathOnlyParser(content)
        .map((piece) => {
            switch (piece.type) {
                case "math":
                    return texToSpeech(piece.content);
                case "specialCharacter":
                    return piece.content.length > 1
                        ? piece.content.slice(1)
                        : piece.content;
                default:
                    return piece.content;
            }
        })
        .join("");
}

/**
 * Hook that transforms strings that might contain TeX
 * into screen reader friendly strings by pulling out TeX
 * and using SpeechRuleEngine to convert it to plan language
 */
export function useSpokenLabels(contents: string[]): string[] {
    const {locale} = usePerseusI18n();
    const [engine, setEngine] = useState<SpeechRuleEngine | null>(null);
    const needsEngine = contents.some(containsTex);

    useEffect(() => {
        if (!needsEngine) {
            return;
        }
        let cancelled = false;
        SpeechRuleEngine.setup(locale)
            .then((nextEngine) => {
                if (!cancelled) {
                    setEngine(nextEngine);
                }
            })
            .catch(() => {});
        return () => {
            cancelled = true;
        };
    }, [locale, needsEngine]);

    const texToSpeech = engine?.texToSpeech ?? keepTex;
    return contents.map((content) => toSpokenText(content, texToSpeech));
}
