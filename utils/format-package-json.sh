#!/usr/bin/env bash

## This script re-formats each `package.json` in the `packages` directory and
## orders the top-level keys by a consistent order. It also forces a few values
## to be standardized (such as 'author' always being 'Khan Academy').
##
## `exports` only maps sub-paths to TypeScript source files. Exports that the
## build produces some other way (such as CSS) belong only in
## `publishConfig.exports`, which pnpm swaps in at publish time, so any other
## entries are dropped.

if ! command -v jq &> /dev/null
then
    echo "jq not be found in PATH (you can install using 'brew install jq')"
    exit
fi

SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

pushd "$SCRIPT_DIR/.." > /dev/null 2>&1 || exit

# We loop over all packages and re-order them (and re-indent)
# writing to a temp file and then overwriting the original file to avoid
# truncation errors (especially in the face of failures in the processing
# pipeline).
for pkg in ./packages/*/package.json; do
    dir="$(dirname "$pkg")"
    echo "$dir"

    jq --indent 4 ". | {
        name: .name,
        description: .description,
        author: \"Khan Academy\",
        license: \"MIT\",
        version: .version,
        publishConfig: {
            access: \"public\",
            exports: .publishConfig.exports
        },
        repository: {
            type: \"git\",
            url: \"https://github.com/Khan/perseus.git\",
            directory: \"${dir#./}\",
        },
        bugs: {
            url: \"https://github.com/Khan/perseus/issues\",
        },
        type: \"module\",
        exports: (.exports | if . == null then . else with_entries(
            select(.value | type == \"string\" and test(\"\\\\.tsx?$\"))
        ) end),
        files: .files,
        scripts: (.scripts // {}),
        dependencies: (.dependencies // {}),
        devDependencies: .devDependencies,
        peerDependencies: .peerDependencies,
        keywords: .keywords,
        khan: .khan
    } | with_entries(select(.value != null))" "$dir/package.json" > "$dir/package.out.json"
    mv "$dir/package.out.json" "$dir/package.json"
done
