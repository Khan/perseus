import fs from "node:fs/promises";
import path from "node:path";

import libCoverage from "istanbul-lib-coverage";
import v8toIstanbul from "v8-to-istanbul";

import {GALLERY_BUILD_DIR, GALLERY_URL, REPO_ROOT} from "./constants";

import type {CoverageMapData} from "istanbul-lib-coverage";

type JSCoverageEntry = {
    url: string;
    source?: string;
    functions: Parameters<ReturnType<typeof v8toIstanbul>["applyCoverage"]>[0];
};

// The same source files Jest collects coverage from (see
// config/test/test.config.js), so the two reports merge cleanly.
function isCoveredSource(file: string): boolean {
    const relative = path.relative(REPO_ROOT, file);
    return (
        /^packages\/[^/]+\/src\//.test(relative) &&
        !/(^|\/)(node_modules|__tests__|__docs__|__stories__)\//.test(
            relative,
        ) &&
        /\.[jt]sx?$/.test(relative) &&
        !/\.(test|spec|stories|testdata)\.[jt]sx?$/.test(relative) &&
        // The Playwright test harness itself.
        !relative.startsWith("packages/perseus/src/testing/playwright/")
    );
}

/**
 * Convert the V8 coverage Chromium collected while loading the story gallery
 * into Istanbul coverage of our source files.
 *
 * The gallery is a bundle, so each script is mapped back to the files it
 * was built from through its sourcemap.
 *
 * @param entries What `page.coverage.stopJSCoverage()` returned.
 * @returns Istanbul coverage for the source files in `packages/`.
 * @throws {Error} If the page ran scripts but none of them came from the
 * built gallery, which means Playwright reused a Vite dev server
 * (`pnpm pw:gallery`) instead of building the gallery.
 */
export async function toIstanbulCoverage(
    entries: ReadonlyArray<JSCoverageEntry>,
): Promise<CoverageMapData> {
    const coverage = libCoverage.createCoverageMap({});
    const bundleEntries = entries.filter(
        (entry) =>
            entry.url.startsWith(GALLERY_URL) &&
            new URL(entry.url).pathname.endsWith(".js"),
    );
    if (entries.length > 0 && bundleEntries.length === 0) {
        throw new Error(
            "Coverage needs the built story gallery, but the page loaded " +
                "none of it. Stop `pnpm pw:gallery` and run again.",
        );
    }

    for (const entry of bundleEntries) {
        const file = path.join(GALLERY_BUILD_DIR, new URL(entry.url).pathname);
        // v8-to-istanbul finds the bundle's sourcemap through the
        // `sourceMappingURL` comment in it.
        const converter = v8toIstanbul(
            file,
            0,
            {source: entry.source ?? (await fs.readFile(file, "utf8"))},
            // Called with source paths as they appear in the sourcemap
            // (relative to the bundle) as well as absolute ones.
            (source) =>
                !isCoveredSource(path.resolve(path.dirname(file), source)),
        );
        await converter.load();
        converter.applyCoverage(entry.functions);
        coverage.merge(converter.toIstanbul());
    }
    return coverage.toJSON();
}
