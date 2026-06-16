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
| 2011-May-09 | `khan-exercises` prototype born | [`Khan/khan-exercises`](https://github.com/Khan/khan-exercises) |
| 2013-Jan-25 | **Perseus** born | [`Khan/perseus`](https://github.com/Khan/perseus) |
| 2018-Jan-04 | Perseus **moves into webapp** | [`Khan/webapp`](https://github.com/Khan/webapp) · `c4cc9587` |
| 2018-Jan-19 | Last commit of old Perseus, tagged **`old-master`** | `Khan/perseus` · `0e82a089` |
| 2018-Dec-04 | `khan-exercises` abandoned (last commit) | `Khan/khan-exercises` · `9cd98eef` |
| 2022-Apr-20 | Perseus **restarts** in its own repo (current `main`) | `Khan/perseus` · `cb841024` "initial commit" |
| 2022-May-25 | Perseus **fully removed from webapp** | `Khan/webapp` · `3a2d65d3` |

Source doc (humans, internal): [Perseus GitHub History](https://khanacademy.atlassian.net/wiki/spaces/LC/pages/4370696155/Perseus+GitHub+History).

### What this means in practice
- The **current repo's history dead-ends** at `cb841024 "initial commit"`.
  `git log`/`git blame` in this checkout will not take you earlier than that.
- The **`old-master` tag** (commit `0e82a08991`) is your gateway to the
  2013–2018 Perseus history. **Start most investigations from here** — most
  patterns were already established before the webapp move, so you can often
  skip the webapp era entirely.
- The **2018–2022 webapp era** is a real gap the current repo can't see. Use
  the local `~/khan/webapp` repo (or `gh`) when the trail runs through those
  years.

## Repo access strategy

Prefer **local clones** at the canonical path `$HOME/khan/<repo>`; fall back to `gh` /
the GitHub API when a repo isn't cloned.

Likely already present locally: `perseus` (this repo) and `webapp`. If `webapp` is missing, stop and ask the user to clone it! The legacy repos like `khan-exercises`, `mathquill`, `ka-perseus-graphie`, and `live-editor` are rarely cloned locally.

When a clone would meaningfully speed up the dig (e.g. deep blame-walking a
sibling repo) and it isn't present, **offer to clone it** to the canonical location and,
if the user agrees, **always use `ka-clone`**:

```bash
ka-clone <repo> ~/khan/<repo>   # bare name → git@github.com:Khan/<repo>.git
```

(`ka-clone` is a `git clone` wrapper that configures the KA repo; it's on PATH.)

## The procedure

Work **newest → oldest**, crossing repo boundaries only as far back as the question needs.

1. **Locate the code in the current repo.** Find the file/symbol/widget. Note
   the current path, e.g. `packages/perseus/src/widgets/<name>/`. Read for
   explicit history signals: `@deprecated`, "legacy", and ticket refs
   (`LEMS-####`, `FEI-####`, `LP-####`).

2. **Walk the current repo** with `git log`/`git blame` until you hit the
   `cb841024 "initial commit"` floor. If you don't have your answer yet,
   look in the webapp git history.
   ```

3. **Walk the webapp era (2018–2022)** if the trail runs through those
   years. In webapp, Perseus lived under `javascript/perseus-all-package/...`
   (and earlier `src/widgets/...`, later also `services/static/javascript/perseus-all-package/...`). Discover the historical path, then log within the
   era:
   ```bash
   git -C ~/khan/webapp log --all --pretty=format: --name-only --diff-filter=AM \
     | grep -iE '<file>\.jsx?$' | sort -u
   git -C ~/khan/webapp log --all --date=short --format='%h %ad | %s' \
     --since=2018-01-01 --until=2022-06-01 -- '<historical-path>'
   ```
   webapp PRs (`#NNNN`) are reachable via `gh pr view <n> --repo Khan/webapp`.

4. **Walk the `old-master` era** for the 2013–2018 Perseus history (the most
   common destination). Files are `.jsx`/`.js` here — **transpose extensions**
   (`.tsx`→`.jsx`, `.ts`→`.js`). Find when the file(s) originated and when
   specific lines changed:
   ```bash
   git log --diff-filter=A --follow --date=short --format='%h %ad %an | %s' \
     old-master -- src/widgets/<name>.jsx        # birth (follows renames)
   git log -S '<exact code string>' --date=short --format='%h %ad %an | %s' \
     old-master -- src/widgets/<name>.jsx        # when a line appeared/changed
   ```
   Watch for **renames** — `--follow` traces through them, and the commit that
   "adds" a file is often a rename ("Rename X to Y", "Create Z (clone of W)").
   Re-run without `--follow` to see the true add vs. a rename.

5. **Check khan-exercises** if the trail points further back (Perseus predates
   React; many concepts came from `khan-exercises`). Look for a similarly named
   file/concept:
   ```bash
   ls ~/khan/khan-exercises/utils/ | grep -i <concept>
   ```

6. **Land on the originating change** and surface its review link (see Phabricator
   below). Extract whatever rationale the commit body / PR / Diff holds.

### Phabricator (pre-GitHub code review)
Commits from roughly 2013–2017 may carry, in the body:
`Differential Revision: http://phabricator.khanacademy.org/D####`, or
`Reviewers:` / `Auditors:` / `Test Plan:` fields. There may also be code
comments that reference these Phabricator diffs in a `D#####` format.
Phabricator is still up at `https://phabricator.khanacademy.org/` but requires
**a login** (new employees likely lack access). **Do not try to fetch it.**
Instead, surface the `D####` URL in the answer and mine the commit body itself
for the Summary / Test Plan / reviewers. Let the user decide whether to open
it.

### Jira / Confluence enrichment (best-effort, internal)
Git/GitHub is the core method and always works. If a commit/PR references a
ticket (`LEMS-####`, `FEI-####`, `LP-####`) and the Atlassian MCP is available,
look it up for the original motivation; otherwise just include the ID/URL in
the answer. Slack rarely helps — most of this history predates KA's Slack use.

## Sibling packages — origin repos

Originally, many packages in the Perseus "ecosystem" were in their own repo. In
2022, these packages were moved into the Perseus repo and it became a monorepo
to ease development and testing. To trace their pre-monorepo history, dig into
the origin repo (clone via `ka-clone` if needed). The origin repos were
archived after they were moved, so their history is frozen today.

| Package | Origin repo | Notes |
| --- | --- | --- |
| `@khanacademy/kas` | [`Khan/KAS`](https://github.com/Khan/KAS) (archived) | Lightweight JS CAS for comparing expressions; Moved into Khan/perseus in `#173` (2022-May-03). |
| `@khanacademy/kmath` | [`Khan/kmath`](https://github.com/Khan/kmath) (archived) | JS numeric math utils; Moved into Khan/perseus in `#126` (2022-Apr-25). |
| `@khanacademy/math-input` | [`Khan/math-input`](https://github.com/Khan/math-input) (archived) | react + redux + mathquill keypad; Imported 2022-Apr-28 at math-input commit `c49d43a1`. |
| `@khanacademy/simple-markdown` | [`Khan/simple-markdown`](https://github.com/Khan/simple-markdown) (public) | Standalone markdown parser; Moved into Khan/perseus in `#180` (2022-May-03). |
| (dep) mathquill | [`Khan/mathquill`](https://github.com/Khan/mathquill) | KA fork of `mathquill/mathquill`; a dependency of `math-input`, not a package. |
| graphie-to-png | [`Khan/internal-services`](https://github.com/Khan/internal-services) (`graphie-to-png/`) | A website for building graphie images (a multi-file image format that combines a base SVG with a JSON data file that defines overlay labels that can be translated). There is a copy of the graphie renderer code in this repo. Earlier graphie drawing code also appears in [`Khan/khan-exercises`](https://github.com/Khan/khan-exercises) (`utils/graphie*.js`). |
| `perseus-core`, `perseus-editor`, `perseus-linter`, `perseus-score`, `perseus-utils`, `pure-markdown`, `keypad-context` | (none) | Split out *within* the monorepo from `perseus`; no pre-monorepo repo. Trace them in this repo. |

**Discovery recipe** for a package not in the table, first ASK for help, then
try:
```bash
gh repo view Khan/<name> --json name,isArchived,createdAt   # try casing variants, e.g. KAS
git log --diff-filter=A --date=short --format='%h %ad | %s' \
  -- packages/<pkg>/package.json | tail -1   # import commit msg often names the source repo/SHA
```

## Output format

Lead with the **answer**, then show the **trail** if it is relevant to the
answer, then any **interpretation**.

1. **Short answer** — the "why", in a sentence or two. State up front if the
   premise is off (e.g. a misremembered widget name).
2. **The trail** — newest → oldest, important commits that impact the answer.
   Give every entry the same shape:
   `<when> · <repo> · <SHA>  <ref> — "<commit msg>" — <synthesis>`
   - `<when>`: an unambiguous date (`2018-Jun-20`, never a 2-digit numeric
     month) or era label (`now`, `khan-exercises`).
   - `<repo>`: name it on *every* line. A repo boundary is then just the line
     where the repo changes — no separate "crossing" entry needed.
   - `<SHA>`: short hash. Omit only on the `now` line, which points at live
     code via `path:line` instead.
   - `<ref>`: `#1234` (PR) or `D####` (Phabricator Diff). If neither exists,
     omit it (and its surrounding separators) — don't leave a dangling dash.
   - `<commit msg>`: the one-line commit subject, verbatim.
   - `<synthesis>`: a short gloss of what this commit actually did *in relation
     to the question* — not a restatement of the message.
   Include an era only if it bears on the answer — never pad with "no change
   during this era". Omission is the signal that nothing relevant happened.
3. **Interpretation (unverified)** — when the record runs cold (a terse commit, a
   token-gated Diff, no rationale), offer a clearly-labeled best interpretation reasoned
   from the code and the era. Keep verified facts and inference visibly separate.

### Skeletal trace (shape, not a script)
```
Answer: <X> does <ABC> because <Y>.

Trail (newest → oldest; one line each; omit eras that don't bear on the answer):
  • now          · Khan/perseus  · path:line — <signal in current code>
  • 2021-Mar-09  · Khan/webapp   · <SHA>  #12345 — "<commit msg>" — <synthesis re: the question>
  • 2018-Jun-20  · Khan/perseus  · <SHA>  D45678 — "<commit msg>" — <synthesis re: the question>
  • 2014-Nov-02  · khan-exercises · <SHA> — "<commit msg>" — <synthesis re: the question>

Interpretation (unverified): <reasoning where evidence ran out>
```
