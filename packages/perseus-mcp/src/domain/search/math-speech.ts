// Khan Academy's color macros (\blue{5}, \redD{x}, \kaGreen{y}, \color{red}),
// which the speech engine doesn't know: it reads them as "backslash blue".
// The argument is kept; the color only says how it looks.
const COLOR_MACRO =
    /\\(?:ka)?(?:blue|red|green|gold|purple|pink|orange|teal|maroon|gray|grey|mint)[A-E]?(?=\s*\{)/g;
const COLOR_COMMAND = /\\color\s*\{[^}]*\}/g;

/** TeX as the speech engine can read it: without color macros. */
export function speakableTex(tex: string): string {
    return tex.replace(COLOR_COMMAND, "").replace(COLOR_MACRO, "");
}

// A number (12, -3.5, 1,000) or a single letter: read aloud, it says what
// its TeX does, so reading it adds nothing to search.
const READS_AS_ITSELF = /^\s*(-?[\d.,]+|[a-zA-Z])\s*$/;

/** Whether reading the formula aloud would only repeat its TeX. */
export function readsAsItself(tex: string): boolean {
    return READS_AS_ITSELF.test(tex);
}

/**
 * The reader, keeping each formula's reading: the same formulas recur across
 * items and exercises. Past `max` readings, the cache starts over.
 */
export function withCache(
    speak: (tex: string) => string,
    max = 200_000,
): (tex: string) => string {
    let cache = new Map<string, string>();
    return (tex) => {
        let reading = cache.get(tex);
        if (reading == null) {
            if (cache.size >= max) {
                cache = new Map();
            }
            reading = speak(tex);
            cache.set(tex, reading);
        }
        return reading;
    };
}

/**
 * Each formula read as words, each reading once, leaving out formulas that
 * read as themselves and those the reader couldn't read (it returns "" or
 * throws).
 */
export function speakAll(
    math: ReadonlyArray<string>,
    speak: (tex: string) => string,
): string[] {
    const readings = new Set<string>();
    for (const tex of math) {
        if (readsAsItself(tex)) {
            continue;
        }
        let reading = "";
        try {
            reading = speak(speakableTex(tex)).trim();
        } catch {
            // A formula the reader can't parse is left unread.
        }
        if (reading !== "") {
            readings.add(reading);
        }
    }
    return [...readings];
}
