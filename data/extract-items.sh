#!/bin/bash
# This script combs through Perseus JSON looking for items (exercise questions)
# It writes each item to a separate file in the `items` directory. Each file is
# named after the SHA-256 hash of the item JSON.
#
# Input data on which to run this script can be obtained from GCS:
#
#     mkdir ~/Desktop/content
#     gsutil -m cp -r gs://content-property.khanacademy.org/{Article,Exercise}.{Translated,}PerseusContent ~/Desktop/content
#
# After downloading the content, run this script on each file:
#
# find ~/Desktop/content -type f | xargs ./extract-items.sh

HERE="$(cd "$(dirname $0)" && pwd)"

mkdir -p "${HERE}/items"

for INPUT_FILENAME in "$@"; do
    <"$INPUT_FILENAME" jq -c '
        map(
            select(.item_shape_type == "item")
            | .item_data
        )[]
    ' | while read -r item; do
        HASH="$(shasum -a 256 <<<"$item" | head -c 16)"
        DIR="${HERE}/items/${HASH:0:2}/${HASH:2:2}"
        mkdir -p "$DIR"
        echo "$item" > "${DIR}/${HASH:4}.json"
    done
done
