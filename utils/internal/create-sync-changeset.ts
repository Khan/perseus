import {randomInt} from "node:crypto";
import fs from "node:fs";
import path from "node:path";

/**
 * The directory (relative to the repo root) where changeset files live.
 */
const CHANGESET_DIR = ".changeset";

/**
 * A small pool of friendly words used to name changeset files.
 *
 * Changesets are conventionally named as three random words joined by dashes
 * (e.g. `sour-turkeys-complain.md`). We generate that name ourselves rather
 * than depending on the changeset CLI, both to avoid a new dependency and to
 * avoid the CLI's auto-commit behaviour.
 */
const WORDS = [
    "amber",
    "ancient",
    "bashful",
    "bold",
    "brave",
    "breezy",
    "bright",
    "calm",
    "clever",
    "cozy",
    "crisp",
    "curly",
    "dapper",
    "eager",
    "early",
    "fancy",
    "fluffy",
    "fuzzy",
    "gentle",
    "giant",
    "happy",
    "honest",
    "jolly",
    "kind",
    "lazy",
    "lively",
    "lucky",
    "mellow",
    "merry",
    "mighty",
    "nimble",
    "polite",
    "proud",
    "quick",
    "quiet",
    "rapid",
    "shiny",
    "silly",
    "smooth",
    "sour",
    "spicy",
    "swift",
    "tame",
    "tidy",
    "violet",
    "warm",
    "witty",
    "zany",
    "apples",
    "badgers",
    "beans",
    "bears",
    "birds",
    "boats",
    "books",
    "buttons",
    "carrots",
    "cats",
    "clouds",
    "coats",
    "comics",
    "crabs",
    "ducks",
    "foxes",
    "frogs",
    "geese",
    "hornets",
    "lemons",
    "lions",
    "moose",
    "olives",
    "otters",
    "owls",
    "pandas",
    "pears",
    "rivers",
    "robots",
    "rockets",
    "shoes",
    "spoons",
    "tigers",
    "trains",
    "turkeys",
    "turtles",
    "waffles",
    "whales",
    "agree",
    "argue",
    "bake",
    "bounce",
    "cheer",
    "complain",
    "dance",
    "dream",
    "explode",
    "fly",
    "giggle",
    "grow",
    "jump",
    "kneel",
    "laugh",
    "leap",
    "march",
    "obey",
    "relax",
    "shout",
    "sing",
    "sleep",
    "sneeze",
    "sniff",
    "travel",
    "wave",
    "whisper",
    "wink",
    "yawn",
];

/**
 * Pick `count` distinct random words from the pool and join them with dashes.
 */
function pickRandomWords(count: number): string {
    const pool = [...WORDS];
    const chosen: string[] = [];
    for (let i = 0; i < count; i++) {
        const index = randomInt(pool.length);
        chosen.push(pool[index]);
        pool.splice(index, 1);
    }
    return chosen.join("-");
}

/**
 * Generate a changeset file name (without extension) that doesn't collide with
 * an existing changeset in `changesetDir`. Re-rolls on collision.
 */
function generateChangesetName(changesetDir: string): string {
    for (let attempt = 0; attempt < 100; attempt++) {
        const name = pickRandomWords(3);
        if (!fs.existsSync(path.join(changesetDir, `${name}.md`))) {
            return name;
        }
    }
    throw new Error(
        "Could not generate a unique changeset name after 100 attempts",
    );
}

/**
 * Create a changeset describing a dependency sync.
 *
 * Writes a changeset file that bumps each affected package by a `patch`, with a
 * summary that references the frontend commit the dependencies were synced from.
 *
 * @param packageNames The names of the published packages affected by the sync
 * (typically the return value of `updateCatalogHashes`). If empty, no changeset
 * is created.
 * @param frontendCommit The frontend git commit SHA the dependencies were synced
 * from. Included in the changeset summary.
 * @returns The path to the changeset file that was created, or `null` if no
 * packages were affected.
 */
export function createSyncChangeset(
    packageNames: string[],
    frontendCommit: string,
): string | null {
    if (packageNames.length === 0) {
        console.log(
            "ℹ️  No packages were affected by the sync; skipping changeset.",
        );
        return null;
    }

    const name = generateChangesetName(CHANGESET_DIR);
    const filePath = path.join(CHANGESET_DIR, `${name}.md`);

    const frontmatter = [...packageNames]
        .sort((a, b) => a.localeCompare(b))
        .map((pkg) => `"${pkg}": patch`)
        .join("\n");

    const content = `---\n${frontmatter}\n---\n\nSync dependencies with frontend commit ${frontendCommit}\n`;

    fs.writeFileSync(filePath, content, "utf-8");

    console.log(`📝 Created changeset ${filePath}`);
    return filePath;
}
