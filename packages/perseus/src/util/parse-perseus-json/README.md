# Perseus JSON Parsers

The code in this directory takes raw Perseus JSON and parses it into a
`PerseusItem` object. If the parse succeeds, the resulting object is guaranteed
to conform to the `PerseusItem` TypeScript type.

The parser gracefully handles old data formats that don't conform to the TS
types. It does this by defaulting missing fields and migrating ones that have
been renamed or restructured.

## Regression testing against old data

The tests in the `regression-tests` directory ensure that the parsing code can
handle old data formats. **Understand that if you change existing regression
tests, you risk breaking compatibility with old data.** The regression tests
were generated from a snapshot of Khan Academy content taken in November 2024.

## Exhaustive testing

You can run an exhaustive test of the parser (testing against every single
content item) by following the steps documented in
`exhaustive-test-tool/index.ts`. This test takes about 4 hours to run and
requires downloading many gigabytes of data, so it does not run as part of our
normal CI builds. Run this test only if you suspect that the parser has somehow
drifted out of sync with the production data.

## Architecture

See [ADR #773] for context. [ADR #776] describes why we chose to write our own
runtime typechecking code (in `general-purpose-parsers/`) rather than use
a third-party library.

[ADR #773]: https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/3318349891/ADR+773+Validate+widget+data+on+input+in+Perseus
[ADR #776]: https://khanacademy.atlassian.net/wiki/spaces/ENG/pages/3328147539/ADR+776+Write+our+own+code+to+typecheck+Perseus+data+at+runtime

A good place to start reading this code is `parser-types.ts` and `result.ts`.
Then you should skim the parsers in `general-purpose-parsers/` to get a sense
of what's available. The Perseus-specific parsers are all in `perseus-parsers/`.
The public API is in `index.ts`.
