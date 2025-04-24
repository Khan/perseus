# Perseus JSON Parsers

The code in this directory takes raw Perseus JSON and parses it into a
`PerseusItem` object. If the parse succeeds, the resulting object is guaranteed
to conform to the `PerseusItem` TypeScript type.

The parser gracefully handles old data formats that don't conform to the TS
types. It does this by defaulting missing fields and migrating ones that have
been renamed or restructured.

## What to do if your change introduces type errors in `perseus-parsers/`

Each `.ts` file in `perseus-parsers/` has an associated typetest file. These
type tests verify that the parsers actually return the types defined in
`data-schema.ts`. If you change the data-schema types, you will see type
errors in these typetest files. The fix is to update the corresponding parser.

Parsers' return types are intentionally NOT defined in terms of the data-schema
types. If they were, certain kinds of type errors could sneak in.

<details>
<summary>Details</summary>

Consider the case of a data-schema type like:

```ts
export type CoolWidgetOptions = {
    text: string;
    color: "green" | "blue";
}
```

The parser looks like the following. Note the explicit type declaration! This
is not the way to do it, and we'll see why in a moment.

```ts
import {CoolWidgetOptions} from "../../data-schema";

// Don't follow this example! There shouldn't be a type declaration on
// `parseCoolWidgetOptions`.
const parseCoolWidgetOptions: Parser<CoolWidgetOptions> = object({
    text: string,
    color: enumeration("green", "blue"),
});
```

Now suppose we want to add a new field to our widget's options,
`title?: string`.

```ts
export type CoolWidgetOptions = {
    text: string;
    color: "green" | "blue";
    title?: string;
}
```

Now, the parser will not parse `title`, because it is not defined in the
`object({})` schema. But typechecking passes! That's because the result of the
parser is in fact assignable to `CoolWidgetOptions`. `CoolWidgetOptions`
doesn't require `title` to be present, and the parser doesn't either.

This is bad because we might forget to update the parser when we add `title` to
the data-schema types. The solution is to remove the type declaration from
`parseCoolWidgetOptions`, letting TypeScript infer the return type instead. Then
we can use typetests to check that the parser's result is equal to the
data-schema types. That way, we will be informed of any mismatches in the types.

Here is another case where explicit type declarations fall short. Suppose we
add a new `color` to `CoolWidgetOptions`:

```diff
  export type CoolWidgetOptions = {
      text: string;
-     color: "green" | "blue";
+     color: "green" | "blue" | "red";
      title?: string;
  }
```

As before, typechecking passes! That's because the parser's result,
`"green" | "blue"`, is assignable to `"green" | "blue" | "red"`. The only
problem is, the parser will reject widgets that have a `color` of `"red"`!

Again, the solution is to let TS infer the result types of parsers and use
typetests to keep the parsers in sync with data-schema.

</details>


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

### Default values

One architectural question that arose during the creation of these parsers was
"where should defaults be applied? In the parser, or in the widget's
`defaultProps`?"

Our answer, for the time being, is "both." These defaults serve different
purposes.

The `defaultProps` of a widget are used during content editing to initialize
the widget options. They represent our _current version_ of the initial widget
configuration that content creators should see when they add a widget to an
exercise. (Actually, the situation is slightly more complicated than this,
because widget editors can have default props as well.)

The defaults in the parsers represent the values that should be used for
_old content_, created before the associated prop was added to the widget.
**The default values in the parser should not change over time**, because any
changes might cause old exercises to become unsolvable or otherwise
misconfigured. The snapshot regression tests in this folder are designed to
ensure that we don't accidentally change the defaults.
