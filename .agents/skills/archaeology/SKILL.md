---
name: archaeology
description: >
  Investigates *why* Perseus code is the way it is by tracing its history across the
  several GitHub repos Perseus has lived in over its lifetime (khan-exercises →
  Khan/perseus → Khan/webapp → Khan/perseus). Use this skill whenever someone asks a
  code-archaeology or "why is it like this" question about Perseus — e.g. "why do we
  have both X and Y widgets?", "why is this implemented this way?", "when/why was this
  added?", "what's the history behind this file/function?", or hands you a commit, PR,
  or file and wants its origins explained. Also triggers on the explicit /archaeology
  command. This matters because Perseus's history bridges multiple repo moves (and
  predates React), so an ordinary `git blame` in the current checkout dead-ends at the
  2022 "initial commit" squash — this skill knows how to bridge those gaps. Do NOT use
  it for general web research (use deep-research) or for understanding what current
  code *does* (just read the code).
---

# Perseus code archaeology

Perseus code is older than the repo it lives in. To answer "why is this the way it is?"
you almost always have to cross one or more repo boundaries, because Perseus has moved
homes several times and the current repo's history is squashed at the 2022 restart.

This skill is realistically **internal-only** (the repo is public, but Perseus does not
accept external contributions — see `README.md`), so referencing Khan/webapp,
Phabricator, and Jira here is fine.

## The timeline (embedded reference data)

| When | Event | Repo / pointer |
| --- | --- | --- |
| 2011-05-09 | `khan-exercises` prototype born | [`Khan/khan-exercises`](https://github.com/Khan/khan-exercises) · first commit `b40264c4` |
| 2013-01-25 | **Perseus** born | [`Khan/perseus`](https://github.com/Khan/perseus) · first commit `651b5e94` |
| 2018-01-04 | Perseus **moves into webapp** | [`Khan/webapp`](https://github.com/Khan/webapp) · `c4cc9587` |
| 2018-01-19 | Last commit of old Perseus, tagged **`old-master`** | `Khan/perseus` · `0e82a089` |
| 2018-12-04 | `khan-exercises` abandoned (last commit) | `Khan/khan-exercises` · `9cd98eef` |
| 2022-04-20 | Perseus **restarts** in its own repo (current `main`) | `Khan/perseus` · `cb841024` "initial commit" |
| 2022-05-25 | Perseus **fully removed from webapp** | `Khan/webapp` · `3a2d65d3` |

Source doc (humans, internal): [Perseus GitHub History](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4370696155/Perseus+GitHub+History).

### What this means in practice
- The **current repo's history dead-ends** at `cb841024 "initial commit"` (2022 squash).
  `git log`/`git blame` in this checkout will not take you earlier than that.
- The **`old-master` tag** (already present in this checkout) is your gateway to the
  2013–2018 Perseus history. **Start most digs from here** — most patterns were already
  established before the webapp move, so you can often skip the webapp era entirely.
- The **2018–2022 webapp era** is a real gap the current repo can't see. Cover it with a
  local `~/khan/webapp` checkout (or `gh`) when the trail runs through those years.

## Repo access strategy

Prefer **local clones** at the canonical path `$HOME/khan/<repo>`; fall back to `gh` /
the GitHub API when a repo isn't cloned.

Likely already present locally: `perseus` (this repo, has the `old-master` tag),
`webapp`, `khan-exercises`, `mathquill`, `ka-perseus-graphie`, `live-editor`.

When a clone would meaningfully speed up the dig (e.g. deep blame-walking webapp or a
sibling repo) and it isn't present, **offer to clone it** to the canonical location and,
if the user agrees, **always use `ka-clone`**:

```bash
ka-clone <repo> ~/khan/<repo>   # bare name → git@github.com:Khan/<repo>.git
```

(`ka-clone` is a `git clone` wrapper that configures the KA repo; it's on PATH.)

## The procedure

Work **newest → oldest**, crossing repo boundaries only as far back as the question needs.

1. **Locate the code in the current repo.** Find the file/symbol/widget. Note the
   current path, e.g. `packages/perseus/src/widgets/<name>/`. Read for explicit history
   signals: `@deprecated`, "legacy", and ticket refs
   (`LEMS-####`, `FEI-####`, `LP-####`).

2. **Walk the current repo** with `git log`/`git blame` until you hit the
   `cb841024 "initial commit"` floor. Confirm the trail genuinely predates the restart:
   ```bash
   git log --oneline --reverse | head -3   # shows cb841024 "initial commit"
   ```

3. **Hop the webapp era (2018–2022)** if the trail runs through those years. In webapp,
   Perseus lived under `javascript/perseus-all-package/...` (and earlier
   `src/widgets/...`, later also `services/static/javascript/perseus-all-package/...`).
   Discover the historical path, then log within the era:
   ```bash
   git -C ~/khan/webapp log --all --pretty=format: --name-only --diff-filter=AM \
     | grep -iE '<file>\.jsx?$' | sort -u
   git -C ~/khan/webapp log --all --date=short --format='%h %ad | %s' \
     --since=2018-01-01 --until=2022-06-01 -- '<historical-path>'
   ```
   webapp PRs (`#NNNN`) are reachable via `gh pr view <n> --repo Khan/webapp`.

4. **Jump to `old-master`** for the 2013–2018 Perseus history (the most common
   destination). Files are `.jsx`/`.js` here — **transpose extensions** (`.tsx`→`.jsx`,
   `.ts`→`.js`). Find births and when specific lines changed:
   ```bash
   git log --diff-filter=A --follow --date=short --format='%h %ad %an | %s' \
     old-master -- src/widgets/<name>.jsx        # birth (follows renames)
   git log -S '<exact code string>' --date=short --format='%h %ad %an | %s' \
     old-master -- src/widgets/<name>.jsx        # when a line appeared/changed
   ```
   Watch for **renames** — `--follow` traces through them, and the commit that "adds" a
   file is often a rename ("Rename X to Y", "Create Z (clone of W)"). Re-run without
   `--follow` to see the true add vs. a rename.

5. **Check khan-exercises** if the trail points further back (Perseus predates React;
   many concepts came from `khan-exercises`). Look for a similarly named file/concept:
   ```bash
   ls ~/khan/khan-exercises/utils/ | grep -i <concept>
   ```

6. **Land on the originating change** and surface its review link (see Phabricator
   below). Extract whatever rationale the commit body / PR / Diff holds.

### Phabricator (pre-GitHub code review)
Commits from roughly 2013–2017 may carry, in the body:
`Differential Revision: http://phabricator.khanacademy.org/D####`, or `Reviewers:` /
`Auditors:` / `Test Plan:` fields. Phabricator is still up at
`https://phabricator.khanacademy.org/` but is **token-gated** (new employees likely lack
access). **Do not try to fetch it.** Instead, surface the `D####` URL in the answer and
mine the commit body itself for the Summary / Test Plan / reviewers. Let the user decide
whether to open it.

### Jira / Confluence enrichment (best-effort, internal)
Git/GitHub is the core method and always works. If a commit/PR references a ticket
(`LEMS-####`, `FEI-####`, `LP-####`) and the Atlassian MCP is available, look it up for
the original motivation; otherwise just include the ID/URL in the answer. Slack rarely
helps — most of this history predates KA's Slack use.

## Sibling packages — origin repos

Several monorepo packages had their own repos before being absorbed in 2022. To trace
their pre-monorepo history, dig in the origin repo (clone via `ka-clone` if needed).

| Package | Origin repo | Notes |
| --- | --- | --- |
| `@khanacademy/kas` | [`Khan/KAS`](https://github.com/Khan/KAS) (archived) | Lightweight JS CAS for comparing expressions; born 2013-08. Into monorepo `#173` (2022-05-03). |
| `@khanacademy/kmath` | [`Khan/kmath`](https://github.com/Khan/kmath) (archived) | JS numeric math utils; born 2014-10. Into monorepo `#126` (2022-04-25). |
| `@khanacademy/math-input` | [`Khan/math-input`](https://github.com/Khan/math-input) (archived) | react + redux + mathquill keypad; born 2016-04. Imported 2022-04-28 at math-input commit `c49d43a1`. |
| `@khanacademy/simple-markdown` | [`Khan/simple-markdown`](https://github.com/Khan/simple-markdown) (public) | Standalone markdown parser; born 2014-10. Moved in `#180` (2022-05-03). |
| (dep) mathquill | [`Khan/mathquill`](https://github.com/Khan/mathquill) | KA fork of `mathquill/mathquill`; a dependency of `math-input`, not a package. |
| graphie / ka-perseus-graphie | [`Khan/internal-services`](https://github.com/Khan/internal-services) (`graphie-to-png/`) | The graphie renderer lives here. Earlier graphie drawing code also appears in [`Khan/khan-exercises`](https://github.com/Khan/khan-exercises) (`utils/graphie*.js`). The local `~/khan/ka-perseus-graphie` is an image-**data** store, not the library. |
| `perseus-core`, `perseus-editor`, `perseus-linter`, `perseus-score`, `perseus-utils`, `pure-markdown`, `keypad-context` | (none) | Split out *within* the monorepo from `perseus`; no pre-monorepo repo. Trace them in this repo. |

**Discovery recipe** for a package not in the table:
```bash
gh repo view Khan/<name> --json name,isArchived,createdAt   # try casing variants, e.g. KAS
git log --diff-filter=A --date=short --format='%h %ad | %s' \
  -- packages/<pkg>/package.json | tail -1   # import commit msg often names the source repo/SHA
```

## Output format

Lead with the **answer**, then show the **trail**, then any **interpretation**.

1. **Short answer** — the "why", in a sentence or two. State up front if the premise is
   off (e.g. a misremembered widget name).
2. **The trail** — newest → oldest, one step per repo/era you crossed, each with the
   commit (`SHA`), date, one-line message, and a link (commit/PR/Diff). Make the repo
   boundaries visible.
3. **Interpretation (unverified)** — when the record runs cold (a terse commit, a
   token-gated Diff, no rationale), offer a clearly-labeled best interpretation reasoned
   from the code and the era. Keep verified facts and inference visibly separate.

### Skeletal trace (shape, not a script)
```
Answer: <X> exists because <Y>; it survives because <Z>.

Trail:
  • now (Khan/perseus): <signal in current code> — path:line
  • 2018–2022 (Khan/webapp): <commit> <date> "<msg>" (#PR)   ← era I must not skip
  • old-master (Khan/perseus, 2018): <state at the move>
  • 2013–2018 (Khan/perseus): <birth/rename commit> <date> "<msg>" → Phabricator D####
  • khan-exercises: <ancestral concept>, if the trail reaches that far

Interpretation (unverified): <reasoning where evidence ran out>
```
