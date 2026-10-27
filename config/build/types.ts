/**
 * Options for building packages, set from `build-packages.ts`'s command-line
 * flags.
 */
export type BuildOptions = {
    /**
     * The value to inline for `process.env.NODE_ENV` (e.g. `"production"`).
     * When it's `"production"`, `process.env.STORYBOOK` is also inlined as
     * `false`. When omitted, both are left for the consumer's bundler to
     * replace.
     */
    environment?: string;
    /** Rebuild packages whenever their source files change. */
    watch?: boolean;
};

/**
 * The parts of a package's `package.json` that the build reads, as validated
 * by `parsePackageJson`.
 */
export type PackageJson = {
    /** `.version`: the package's version, injected into the build output. */
    version: string;
    /**
     * `.dependencies`: package names mapped to version ranges. These are left
     * external (not bundled). `{}` when the field is missing.
     */
    dependencies: Record<string, string>;
    /**
     * `.peerDependencies`: package names mapped to version ranges. These are
     * left external (not bundled). `{}` when the field is missing.
     */
    peerDependencies: Record<string, string>;
    /**
     * `.exports`: sub-path exports (e.g. `"."`, `"./strings"`) which must be
     * mapped to package-relative source files (e.g. `"./src/index.ts"`).
     */
    exports: Record<string, string>;
    /**
     * `.publishConfig.exports`: sub-path exports mapped to package-relative
     * files as they appear in the published package (e.g.
     * `"./dist/index.js"`).
     */
    publishedExports: Record<string, string>;
};
