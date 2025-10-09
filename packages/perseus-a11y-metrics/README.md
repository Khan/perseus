# @khanacademy/perseus-a11y-metrics

This package contains scripts that collect analytics data. It doesn't export
anything, and is not intended for release on NPM.

## Dependencies

To run the scripts in this package, you must have installed:

- [gcloud]
- [jq]

[gcloud]: https://cloud.google.com/sdk/docs/install
[jq]: https://jqlang.org/manual/

We use `gcloud` to transfer data to and from Google Cloud Storage. We use `jq`
to parse JSON files that are too large to be loaded into a JavaScript string.

## Running scripts

```bash
packages/perseus-a11y-metrics/src/main.ts
```

This analyzes the accessibility of Perseus exercise content on
khanacademy.org, and uploads the results to Google Cloud Storage.

## Code organization

- `domain/` is for the core domain/business logic.
- `platform/` knows about NodeJS and CLI stuff.
- `lib/` is for application- and platform-agnostic code.
- `main.ts` and its siblings are the glue holding the other parts together.

## Future work

We'd really like to avoid depending on `jq` and `gcloud` CLIs. To break these
dependencies, we'd have to:

- find or write a JSON stream parsing library, to replace `jq`.
- install the [`@google-cloud/storage`] package from NPM. This is more
  complicated than it sounds, because the library depends on a version of
  `uuid` that's incompatible with our Jest setup — installing it causes the
  test runner to crash.

[`@google-cloud/storage`]: https://www.npmjs.com/package/@google-cloud/storage
