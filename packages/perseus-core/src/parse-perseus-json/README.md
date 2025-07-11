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

The regression tests are data-driven: we have a bunch of real Perseus items and
articles taken from production, and we run those through the parser and make
sure they all parse correctly. The data files live in
`regression-tests/item-data` and `regression-tests/article-data`.

When you add new widget fields or versions, please also add regression test
data for the _current_ (i.e. soon-to-be-outdated) version of the widget. This
will help ensure that future developers don't accidentally break your parser.

<details>
<summary>Regression test example</summary>

Suppose you're going to add a new option `brewStrength` to the (fictional)
`CoffeeMakerWidget`. You'd first create a file
`regression-tests/item-data/coffee-maker-without-brewStrength.json` and paste
in an assessment item copied from production:

```json
{
  "question": {
    "content": "[[☃ coffee-maker 1]]",
    "images": {},
    "widgets": {
      "coffee-maker 1": {
        "type": "coffee-maker",
        "version": {"major": 0, "minor": 0},
        "options": {
          "capacityCups": 6
        }
      }
    }
  }
}
```

Run the regression tests. You should see some new snapshots get written.

Now, update the parser and data-schema to add your new field. Here is what the
parser change might look like:

```diff
  const parseCoffeeMakerWidget = parseWidget(
      constant("coffee-maker"),
      object({
          capacityCups: number,
+         brewStrength: defaulted(
+             enumeration("weak", "average", "strong"),
+             () => "average" as const,
+         ),
      }),
  );
```

Re-run the regression tests. The snapshots will fail, reflecting the fact that
you added a new widget option. Update the snapshots (`pnpm test -u`), make sure
they reflect the desired output (in this case, the default value of `average`
should be set for `brewStrength`), and commit the changes.

</details>

## Adding a new widget version

The purpose of the parser is to make it easy (or at least, easier) to change
our data schema. The parser's job is to migrate old data formats to the new
schema, letting us pretend that the latest format is the only one that exists.

Often this migration process is as simple as adding a default value for new
fields:

```ts
const parseMyWidgetOptions = object({
    // ...
    title: defaulted(string, () => "Untitled")
});
```

Sometimes, though, the migration needs to be more involved. For example, if we
want to rename a field, we need some way to get the data from the old field and
copy it to the new one. The tool for doing that is the `versionedWidgetOptions`
function. For usage instructions, see the source code,
`versioned-widget-options.ts`.

Note that the `minor` version is not really used for anything. It's speculative
complexity added over a decade ago, and it's now too entrenched to remove.

## Changing existing parsers

It's completely fine to change an existing parser — even for an older version
of a widget! You just need to make sure that the published parser functions
(`parseAndMigratePerseusItem` and `parseAndMigratePerseusArticle`) still
accept old data formats and correctly migrate them to the latest schema. The
regression tests (`parse-perseus-json/regression-tests`) are designed to verify
that these properties are preserved. [See the section on regression
testing](#regression-testing-against-old-data) for more detail.

Essentially, all the parser functions, including widget migrations, are just
a fancy way of writing a really big function `parseAndMigratePerseusItem` that
exhibits some desired behavior. As long as that behavior is preserved, anything
goes with respect to code changes.

## Dealing with bugs

At times, we might release a buggy parser. No worries, it happens. Since we
parse existing data on read, and (as of 2025) do not write the parsed data back
to datastore, you can simply release a new version of Perseus with the fix and
all will be well.

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
