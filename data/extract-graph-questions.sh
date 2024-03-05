# This script combs through Perseus JSON looking for questions that contain an
# Interactive Graph or Grapher widget. It writes each such question to a
# separate file in the `questions` directory. Each file is named after the
# SHA-256 hash of the question JSON.
#
# Input data on which to run this script can be obtained from GCS:
#
#     mkdir ~/Desktop/content
#     gsutil -m cp -r gs://content-property.khanacademy.org/{Article,Exercise}.{Translated,}PerseusContent ~/Desktop/content
#
# After downloading the content, run this script on each file:
#
# ag -l 'interactive-graph|grapher' ~/Desktop/content | xargs ./extract-graph-questions.sh

HERE="$(cd "$(dirname $0)" && pwd)"

mkdir -p "${HERE}/questions"

for INPUT_FILENAME in "$@"; do
    <"$INPUT_FILENAME" jq -c '
        map(
            select(.item_shape_type == "item")
            | .item_data.question
            | select(.widgets | any(.type == "interactive-graph" or .type == "grapher"))
        )[]
    ' | while read -r question; do
        HASH="$(shasum -a 256 <<<"$question" | head -c 16)"
        DIR="${HERE}/questions/${HASH:0:2}/${HASH:2:2}"
        mkdir -p "$DIR"
        echo "$question" > "${DIR}/${HASH:4}.json"
    done
done
