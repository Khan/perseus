// SPIKE (Argos): Serve the MathJax Speech Rule Engine's locale data locally
// when stories run under Vitest.
//
// In a browser, SRE downloads its locale maps from cdn.jsdelivr.net. CI's
// secure network blocks that host, and SRE treats the blocked request
// (status 0) as a success, so it calls `JSON.parse("")` and Vitest reports
// an unhandled "Unexpected end of JSON input" rejection, failing the shard.
// Loading the maps from `config/test/mathjax-sre` (the same data the unit
// tests use, see `config/test/rstest/setup.ts`) keeps story runs offline and
// deterministic.
//
// This must be its own setup file, listed before `vitest.setup.ts`: SRE
// reads `SREfeature` when it initializes, and `vitest.setup.ts` imports the
// Storybook preview, which loads MathJax (and so SRE).
const locales = import.meta.glob<string>("../config/test/mathjax-sre/*.json", {
    query: "?raw",
    import: "default",
});

Object.assign(globalThis, {
    SREfeature: {
        custom(locale: string): Promise<string> {
            const load = locales[`../config/test/mathjax-sre/${locale}.json`];
            if (load == null) {
                return Promise.reject(
                    new Error(`No SRE locale data for "${locale}"`),
                );
            }
            return load();
        },
    },
});
