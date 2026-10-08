# Flexible grading for Perseus: research doc

**Status:** Research / pre-exploration · **Branch:** `jg-frontend-only-exploration` · **Date:** 2026-10-07

## TL;DR

Perseus already separates **rendering** from **scoring**. `ServerItemRenderer` has no `score()` method. It hands the host a `UserInputMap` through `getUserInput()`, and the host decides how to grade it. The scoring library (`@khanacademy/perseus-score`) is pure, isomorphic TypeScript that already ships in the browser bundle. Storybook's debug harness already does fully frontend-only grading:

1. render the answerless item;
2. score it locally;
3. re-render with solutions.

So the question isn't "can Perseus grade on the frontend?" It already can. The question is **how to package that capability so experiences can pick a grading mode and switch modes without rewrites.** This doc proposes:

- a **`Grader` contract**, with three peer implementations:
  - `LocalGrader` (mode A, frontend);
  - `RemoteGrader` (mode B, lightweight custom backend);
  - `KABackendGrader` (mode C, today's backend).
- an **ingestion pipeline** (`prepareGeneratedItem`) that turns untrusted, LLM-generated JSON into a safe, accessible, renderable item;
- a **`GradedItemExperience` wrapper** that owns the check, feedback and next flow, a11y announcements, and an `onResult` outlet. Mastery is an explicit opt-in (`countsTowardMastery`), never implied by the mode.

All of it is **additive**. Existing exports and `ServerItemRenderer` stay untouched, so current `frontend` integrations don't change. Mobile keypad, i18n and the renderer upgrade come free because the wrapper uses `ServerItemRenderer` as-is.

The biggest real gaps aren't in scoring:

1. **Feedback UX.** Only a few widgets visually render correctness.
2. **Untrusted-content hardening.** There are a few HTML-injection and URL surfaces.
3. **No machine-readable schema** to hand an LLM.

---

## 1. How Perseus works today

```
 Full PerseusItem (with answers)
        │
        │  splitPerseusItem()             ← strips answers via each widget's getPublicWidgetOptions
        ▼
 Answerless PerseusItem ──► <ServerItemRenderer showSolutions="none" reviewMode={false}>
                                   │  UserInputManager seeds input; widgets call handleUserInput
                                   │  apiOptions.interactionCallback / answerableCallback fire to host
                                   ▼
                          ref.getUserInput()  →  UserInputMap
                                   │
                                   ▼   (host-side today; on KA, the backend)
                 scorePerseusItem(fullItem.question, userInput, locale)
                                   │  validator ?? scorer, per widget → flattenScores
                                   ▼
                 PerseusScore & {widgetScores}
                                   │
                                   ▼
 Host re-renders with the full item + showSolutions="all"|"selected" / reviewMode / hintsVisible
```

### Key facts, with citations (paths relative to `packages/`)

**Scoring and the score contract**

| Fact | Where |
|---|---|
| `ServerItemRenderer` exposes `getUserInput(): UserInputMap` and has no `score()` | `perseus/src/server-item-renderer.tsx:286` |
| `scorePerseusItem(renderer, userInputMap, locale) → PerseusScore & {widgetScores}` | `perseus-score/src/score.ts:75` |
| Per widget, the validator runs first; if it returns nothing, the scorer runs (`validator ?? scorer`) | `perseus-score/src/score.ts:94-129` |
| `validateUserInput` is the client-side, answerless validation path | `perseus-score/src/validate.ts:24` |
| `PerseusScore` is either `{type:"invalid", message?}` or `{type:"points", earned, total, message?}` | `perseus-core/src/validation.types.ts:87` |
| `WidgetScorerFunction(userInput, rubric /* = full widget options */, locale)` | `perseus-core/src/validation.types.ts:70` |
| An invalid score hides the correctness of the other widgets | `perseus-score/src/score.ts:43-58` |
| `perseus-score` runtime deps are kas, kmath, perseus-core, perseus-utils, tiny-invariant and underscore (peer). No Node built-ins, so it is **isomorphic** | `perseus-score/package.json` |

**Answer stripping**

| Fact | Where |
|---|---|
| Answers are stripped by `splitPerseusItem` (hints become placeholders) | `perseus-core/src/utils/split-perseus-item.ts:14` |
| A widget with no `getPublicWidgetOptions` falls back to **identity**, so its answers are not stripped | `perseus-core/src/widgets/core-widget-registry.ts:66-70` |

**Feedback display**

| Fact | Where |
|---|---|
| `ShowSolutions = "all" \| "selected" \| "none"` | `perseus-core/src/data-schema.ts:42` |
| Only radio, label-image, group and graded-group read `showSolutions` or `reviewMode` | `perseus/src/widgets/{radio,label-image,group,graded-group}` |

**Existing frontend-grading precedents**

| Fact | Where |
|---|---|
| Frontend-only grading precedent: answerless render → local `scorePerseusItem` → `showSolutions:"selected"` | `perseus/src/testing/item-renderer-hooks.tsx:35-41, 91-108` |
| graded-group already scores on the client (deprecated `Renderer.score()`) | `perseus/src/widgets/graded-group/graded-group.tsx:164` |

**Host-facing hooks**

| Fact | Where |
|---|---|
| The host already has an analytics outlet: `PerseusDependenciesV2.analytics.onAnalyticsEvent` | `perseus/src/types.ts:349-371` |

---

## 2. The goals, mapped to the evidence

### Goal 1: Perseus keeps working as-is

**Feasible, low risk.** Nothing proposed here changes an existing export, prop or behavior. The wrapper composes `ServerItemRenderer` and `perseus-score` from the outside. The only possible changes inside Perseus are optional:

- a security hardening pass, which would also benefit existing content;
- possibly a per-widget feedback indicator.

Both can be feature-flagged through `apiOptions.flags`.

### Goal 2: Keep high a11y standards

**Feasible.** Perseus widgets already carry the a11y work:

- `wonder-blocks-announcer`, `srOnly` text, keyboard handlers in interactive-graph and math-input;
- per-widget `accessible` flags.

The new risks are:

- **generated content** with missing alt text or labels, or inaccessible widgets;
- **the new feedback UI**, which needs to announce results.

Both have mitigations (§6).

### Goal 3: Render an LLM-generated question with normal interactivity and graded feedback

**Feasible.** The pieces:

- **Parse:** `parseAndMigratePerseusItem` is headless and returns a `Result`.
- **Lint:** `lintPerseusItem` is headless.
- **Check accessibility:** `isItemAccessible`.
- **Strip answers:** `splitPerseusItem`.
- **Render and grade:** any `Grader`.

**Gaps:**

1. There is no structured-output schema to give the LLM (§5).
2. The parser **accepts unknown widget types** and some risky widgets, so we need an allowlist (§4.3).
3. Visual correctness feedback exists only for a few widgets (§7).

### Goal 4: A lightweight Perseus experience with graded feedback that can notify a backend

**Feasible, small effort.** `LocalGrader` plus an `onAttempt` / `onResult` callback. "Notify a backend" can be a fire-and-forget POST, or it can reuse the host's `onAnalyticsEvent`.

### Goal 5: Frontend grading, with a simple path to the next phase

**Feasible.** Make the Grader contract the only seam. Moving on from mode A then means swapping `LocalGrader` for `RemoteGrader` or `KABackendGrader` (§4.1, §3.2).

### Goal 6: Point Perseus at a new backend with custom grading

**Feasible.** `RemoteGrader` POSTs `{itemId | item, userInput}` to a configurable URL. That backend can run the same `perseus-score` in Node, because it's isomorphic, or it can run custom logic. Whether B's wire format must match C's is an **open question** (§8).

### Goal 7: Use the existing backend for content-library content

**Already true.** `KABackendGrader` is a thin adapter over whatever `frontend` does today. Mode C stays the default and the only mastery-eligible path, unless an explicit decision says otherwise.

### Goal 8: Modify Perseus, or wrap it?

**Recommendation: wrap it, in a new additive package in this monorepo** (§4.5). The Perseus core needs no changes for modes A, B or C. The only Perseus-internal work worth considering is:

- security hardening (good for everyone);
- optionally, richer per-widget feedback.

### Goal 9: Open questions

See §8.

---

## 3. Grading modes and paths

### 3.1 The three modes

| | **A: Frontend** | **B: Custom backend** | **C: KA backend** |
|---|---|---|---|
| Where answers live | In the browser (full item sent to the client) | Server (client gets the answerless item) | Server |
| Who scores | `scorePerseusItem` in the browser | Custom service (may run `perseus-score` in Node) | Existing KA pipeline |
| Latency | ~0 ms | One network round trip | One network round trip |
| Cheat resistance | **None.** Answers are inspectable in devtools | Good | Good |
| Mastery eligible? | No (recommended hard line) | Only by explicit decision | Yes |
| Effort to stand up | Small (days) | Medium (a service and an endpoint) | Large (content pipeline and progress integration) |
| How the backend hears about it | `onAttempt` → fire-and-forget POST or analytics event | The grade request *is* the notification | Existing |

**Mode A's security posture:** the full item, answers included, has to reach the client. Splitting can still keep answers out of the *rendered* item until Check is pressed, but anyone looking at the JS heap or the network can see them. That's acceptable for experiments and tutor-mode checks. It is not acceptable for anything that writes mastery.

### 3.2 Paths between modes

The modes are entry points, not a fixed sequence:

| Path | When | What changes | What stays the same |
|---|---|---|---|
| **A → B → C** | Uncertain experiment that may need custom grading before full investment | Grader config twice. B adds server-side item storage | Ingestion, wrapper UI, `onResult` contract, a11y |
| **A → C** | Experiment validated; content fits standard widgets | Grader config; item moves into the content pipeline | Same as above |
| **B → C** | Needs server-side answers from day one (e.g. integrity matters) | Grader config | Same as above |
| **C only** | Content-library items (today) | Nothing | Everything |

**Design rule:** *a path transition must only change the `grader` value passed to the wrapper.* Anything else that has to change is a sign that the abstraction is leaking.

### 3.3 Use-case walkthroughs

**(a) Khanmigo tutor-mode check (correctness only, never mastery)**

1. Khanmigo generates an item, with its answer key, mid-conversation.
2. The host calls `prepareGeneratedItem(json)`. On failure, it falls back to a plain-text question.
3. The host renders `<GradedItemExperience item={…} grader={localGrader} countsTowardMastery={false} onResult={sendToKhanmigoContext}>`.
4. The student interacts normally: keypad, graph, screen reader, the same feedback visuals and announcements as practice.
5. `onResult({correct, earned, total, widgetScores, userInput})` gives Khanmigo the correctness signal it needs to continue tutoring.

Mode A works when the conversation itself is the "backend." Mode B works if Khanmigo's service should do the grading, or keep the answer away from the client. **Mastery is never touched**, because `countsTowardMastery` is false. That's independent of the mode.

**(b) New experience that graduates to mastery**

1. Launch with `LocalGrader` behind a feature flag (A). `onAttempt` posts to a lightweight logging endpoint to validate engagement.
2. If grading needs to be custom, for example rubric-based or multi-step, move to `RemoteGrader` (B).
3. Once the experience is invested in, move it to `KABackendGrader` with `countsTowardMastery={true}` (C).

The wrapper, the ingestion and the UI don't change at any step.

---

## 4. Proposed architecture: a wrapper, not a fork

### 4.1 Grader contract (sketch)

```ts
import type {PerseusItem, PerseusScore, UserInputMap} from "@khanacademy/perseus-core";

type WidgetScores = Record<string, PerseusScore>;

export type GradeResult = {
    score: PerseusScore;              // the existing shape, unchanged
    widgetScores: WidgetScores;       // per-widget, for richer feedback
    correct: boolean;                 // convenience: points && earned === total
    feedback?: {                      // optional grader-supplied extras (mode B may use this)
        message?: string;             // e.g. an LLM explanation
        perWidget?: Record<string, string>;
    };
};

export type GradeContext = {
    locale: string;
    attempt: number;
    experienceId: string;             // which experiment / surface
    itemId?: string;                  // stable id or content hash, if any
};

export interface Grader {
    /** Mode identifier for logging/telemetry. */
    readonly mode: "local" | "remote" | "ka-backend";
    /** Whether this grader needs the full (answerful) item on the client. */
    readonly requiresAnswersOnClient: boolean;
    grade(
        item: PerseusItem,            // answerless for remote modes; full for local
        userInput: UserInputMap,
        ctx: GradeContext,
    ): Promise<GradeResult>;
    /**
     * Optional: lets a grader return the full item for the post-check
     * "show solutions" re-render (remote modes return it after grading).
     */
    revealSolutions?(ctx: GradeContext): Promise<PerseusItem>;
}
```

**Implementations**

```ts
// Mode A: wraps the existing pure scorer; reuses item-renderer-hooks.tsx logic.
export function createLocalGrader(fullItem: PerseusItem): Grader;

// Mode B: POSTs to a configurable endpoint.
export function createRemoteGrader(opts: {
    url: string;
    fetch?: typeof fetch;
    headers?: () => Record<string, string>;
}): Grader;

// Mode C: thin adapter over what `frontend` does today (lives in, or is injected by, frontend).
export function createKABackendGrader(adapter: (req: unknown) => Promise<GradeResult>): Grader;
```

`grade()` is async **even for `LocalGrader`**. That keeps the contract identical across modes, so the UI is built for the network case from day one.

### 4.2 The wrapper: `GradedItemExperience` / `useGradedItem` (sketch)

This makes `perseus/src/testing/item-renderer-hooks.tsx` and `debug-check-answer-footer.tsx` production-ready.

```ts
export type GradedItemExperienceProps = {
    item: PerseusItem;                       // already through prepareGeneratedItem
    grader: Grader;                          // ← the only thing that changes between modes
    countsTowardMastery: boolean;            // explicit; never inferred from mode
    experienceId: string;
    dependencies: PerseusDependenciesV2;     // passed straight through
    apiOptions?: APIOptions;                 // passed straight through
    maxAttempts?: number;
    showHints?: boolean;
    /** Fired after every graded attempt. Khanmigo hooks in here. */
    onResult?: (result: GradeResult & {userInput: UserInputMap; attempt: number}) => void;
    /** Fire-and-forget backend notification (mode A's "notify a backend"). */
    onAttempt?: (event: AttemptEvent) => void;
    onNext?: () => void;
};
```

**What the wrapper owns:**

- **Answerless vs. answerful rendering.** It renders `splitPerseusItem(item)` until grading, then re-renders the full item with `showSolutions` and `reviewMode`. This mirrors `item-renderer-hooks.tsx:35-41`.
- **Check / Try again / Next** buttons (Wonder Blocks), with `answerableCallback` gating Check.
- **Invalid-input messages** through `mapErrorToString`, as in `debug-check-answer-footer.tsx`.
- **The a11y result announcement** (§6).
- **Hints:** a placeholder count while answerless, real hints after reveal.

**What the wrapper does not own:** the keypad, i18n, the renderer flag, mobile. Those are inherited from `ServerItemRenderer` and the host's existing providers.

### 4.3 Ingestion pipeline: `prepareGeneratedItem` (sketch)

```ts
export type PrepareOptions = {
    allowedWidgets: ReadonlyArray<PerseusWidgetTypes>; // e.g. ["radio","numeric-input","expression","dropdown"]
    allowedUrlHosts: ReadonlyArray<string>;            // images/video/links
    blockOnLintSeverity?: 1 | 2;                       // ERROR only, or ERROR+WARNING (default 2)
};

export type PrepareFailure =
    | {kind: "invalid-json"; message: string}
    | {kind: "parse"; message: string}
    | {kind: "disallowed-widget"; widgetIds: string[]}
    | {kind: "disallowed-url"; urls: string[]}
    | {kind: "inaccessible"; reasons: string[]}
    | {kind: "lint"; warnings: LinterWarning[]};

export function prepareGeneratedItem(
    raw: string | unknown,
    opts: PrepareOptions,
): Result<{fullItem: PerseusItem; answerlessItem: PerseusItem}, PrepareFailure>;
```

**Steps, all of which reuse existing headless utilities:**

1. **Parse JSON.** `JSON.parse`, in a try/catch: `parseAndMigratePerseusItem` throws `SyntaxError` on a bad string.
2. **Parse and migrate.** `parseAndMigratePerseusItem` (`perseus-core/src/parse-perseus-json/index.ts:39`) returns a `Result`. It stops at the first bad widget.
3. **Widget allowlist.** The parser **accepts unknown and deprecated widget types**, so reject anything that isn't on the list. Check nested renderers (group, radio choices) too.
4. **URL and host allowlist** for images, video, links and `web+graphie://`, using the `makeSafeUrl` pattern (`perseus-core/src/utils/make-safe-url.ts`; precedent: phet-simulation).
5. **Remove orphaned widgets.** `removeOrphanedWidgetsFromPerseusItem` (`perseus-core/src/utils/remove-orphaned-widgets.ts:14`).
6. **Accessibility gate.** `isItemAccessible` (`perseus-core/src/accessibility.ts:18`).
7. **Lint gate.** `lintPerseusItem` (`perseus-linter/src/lint-content.ts:23`). Block on ERROR (1) and WARNING (2).
8. **Split.** `splitPerseusItem` produces the answerless copy.

On failure the host shows a graceful fallback, and the failure `kind` goes to telemetry, which gives a direct quality signal on the generator.

### 4.4 Security hardening list (needed before untrusted content)

These were found during exploration. Hardening them in Perseus would also benefit existing content.

| Surface | Risk | Where | Mitigation |
|---|---|---|---|
| Plotter axis labels | **HTML injection.** Labels go to `graphie.label(..., latex=false)` and on to jQuery `.html()` | `perseus/src/widgets/plotter/plotter.tsx:387-404`; `perseus/src/util/graphie.ts:1027` | Exclude plotter from the allowlist; long-term, set the text with `.text()` |
| `web+graphie://` images | Fetches `-data.json` from **any host**; labels can reach `.html()` | `perseus-core/src/utils/util.graphie.ts:28-40`; `perseus/src/components/svg-image.tsx` | Host allowlist in ingestion |
| iframe widget | `allow-scripts allow-same-origin allow-top-navigation`; postMessage handler **doesn't check `e.origin`**, so any frame can post `{testsPassed:true}` and get marked correct | `perseus/src/widgets/iframe/iframe.tsx:35-56, 88` | Exclude it; long-term, check the origin |
| cs-program / python-program | Same unchecked postMessage handler | `perseus/src/widgets/cs-program/cs-program.tsx:64-83` | Exclude |
| video / image / markdown links | Any `http(s)` host (tracking, hot-linking, inappropriate content) | `perseus/src/widgets/video/video.tsx`, `image/image.tsx:102` | Host allowlist |
| Markdown | **Safe**: no raw-HTML rule; `sanitizeUrl` blocks `javascript:`, `vbscript:` and `data:` | `simple-markdown/src/index.ts:519-538` | None needed |

### 4.5 Where the wrapper lives

| Option | Pros | Cons |
|---|---|---|
| **New package in this monorepo** (e.g. `@khanacademy/perseus-experience`) | Next to the APIs it composes; Storybook and tests run against real widgets; versioned with Perseus through changesets; reusable by `frontend`, Khanmigo and any other host | Another package to own and release |
| In `frontend` | Closer to product code and the KA backend adapter | Duplicates harness logic; harder to test against all widgets; not reusable outside `frontend` |
| Inside `@khanacademy/perseus` | No new package | Grows a core package's API; blurs "renderer" and "experience" |

**Recommendation: a new additive package in this monorepo.** Put the `Grader` contract, `LocalGrader`, `RemoteGrader`, `prepareGeneratedItem` and `GradedItemExperience` there. `KABackendGrader`'s adapter is *injected* by `frontend`, so backend specifics never enter Perseus. That keeps goal 1 safe: the package depends on `perseus`, `perseus-core`, `perseus-score` and `perseus-linter`, and none of them depend on it.

---

## 5. LLM content specifics

- **Start with a small widget subset:** `radio`, `numeric-input`, `expression`, `dropdown`, and maybe `interactive-graph` later. All have scorers and public-options stripping, and all are `accessible`.
- **Structured-output schema.** None exists: there is no JSON Schema or zod in the repo. Two options:
  1. **Hand-write a JSON Schema** for the allowlisted subset. This is quick, constrained and easy for an LLM to follow.
  2. **Generate one from `data-schema.ts`** (e.g. ts-json-schema-generator). It's broader, but the output is large and permissive.

  **Recommendation:** start with option 1. Either way, the parser stays the source of truth: the schema guides the LLM, and `prepareGeneratedItem` validates the result.
- **Few-shot templates:** use the generators in `perseus-core/src/utils/generators`, e.g. `generateRadioOptions` and `generateSimpleRadioQuestion`, to produce canonical examples.
- **Widget IDs:** the content must reference widgets as `[[☃ <type> <n>]]`, and the key's type must match `widget.type`. LLMs often get this wrong, so the schema and prompt should state it explicitly. The parser catches mismatches.
- **Answer keys:** assume every generated item arrives with a correct key. Verifying keys is out of scope.

---

## 6. a11y plan

1. **Ingestion gates.** `isItemAccessible` plus the a11y lint rules: `image-alt-text`, `image-widget-alt-text`, `inaccessible-widget`, `numeric-input-missing-label`, and the heading rules. A failing item never renders.
2. **Schema requirements.** Make `alt` and widget labels **required** fields in the LLM schema, so the generator can't leave them out.
3. **Announcing the result.** Use a polite status region for the grade result, following graded-group's pattern (`graded-group.tsx:301, 310`). Put the result text in a native `<output>`, or in a `role="status"` region if the element choice makes that necessary. After grading, move focus predictably to the result or to the next action.
4. **Feedback must not depend on color alone.** Pair icons and text with the color, as radio already does with its `choiceCorrect` screen-reader string.
5. **Automated checks.** Storybook `addon-a11y` is already on. Add jest-axe, or an axe-based Storybook test runner, for the wrapper. The repo has no jest-axe today.
6. **Manual QA matrix.** VoiceOver and NVDA, plus keyboard only, for each allowlisted widget, in the wrapper's Check, Try again and Reveal states.

---

## 7. Feedback UX gaps (the real work for goal 3)

- **Few widgets render correctness.** Only radio, label-image, group and graded-group read `showSolutions` or `reviewMode`. Numeric-input, expression and dropdown show **no visual right or wrong state** after grading.
- **`showSolutions="selected"` does nothing.** The renderer documents it, but no widget handles it specially; radio only checks for `"all"`.
- **Hints are placeholders while answerless.** Real hints appear only after the full item is revealed.

**Options, cheapest first:**

1. **Item-level feedback outside the renderer.** Wrapper UI shows "Correct!" or "Not quite", plus an optional grader `feedback.message`. **No Perseus changes.**
2. **Per-widget feedback in the wrapper** using `widgetScores`. A list or summary under the item ("Blank 1: correct, Blank 2: try again"). **No Perseus changes.**
3. **Per-widget visual correctness inside widgets.** A new opt-in prop or flag, e.g. a `widgetFeedback` map. This is a **Perseus change** and needs design. It would also benefit standard practice, so it's worth raising with the Perseus team.

---

## 8. Open questions (goal 9)

### Product

- In a correctness-only context, is a multi-widget item **all-or-nothing** or **per widget**? Does Khanmigo need `widgetScores`, or just `correct`?
- Should tutor-mode questions look **identical** to practice (same feedback visuals, attempts, hints), or lighter?
- What is the **minimal `onResult` payload** Khanmigo needs: `correct` only, or also `userInput` so it can talk about the student's answer?
- Attempts policy: unlimited retries? Reveal after N attempts?

### Integrity and security

- Is "**no mastery from mode A**" a hard rule? (Recommended: yes.)
- Who owns and maintains the **widget and URL allowlists**?
- Should the hardening items in §4.4 be fixed in Perseus now? They affect existing content too.

### Contract (left open on purpose)

- **Must mode B's request and response match mode C's** so that B → C is a pure swap?

  | | Match C | B free-form |
  |---|---|---|
  | B → C transition | Pure config swap | Needs an adapter |
  | Freedom in B | Constrained to `PerseusScore` | Richer feedback (LLM explanations, rubric scoring) |
  | Risk | B can't express what experiments need | Hidden coupling at the transition |

  A middle path: B must return `PerseusScore & {widgetScores}` and may add **optional** extras under `feedback`. C simply never sets `feedback`.
- How is the grader chosen: per experience, by feature flag, or by a host prop? Who flips it?
- In mode B, does the client send the **whole item** or an **item ID**? An ID means server-side item storage.

### Org

- Who owns the new package, and who reviews changes to it (Perseus team vs. the experiments team)?
- How does `frontend` consume it: a new dependency, or re-exported from `@khanacademy/perseus`?
- What **success criteria** move an experience from one mode to another?

---

## 9. Proposed spikes

1. **Local end to end (Storybook).** Hard-code three or four "LLM-shaped" JSON items, including deliberately broken ones. Run them through `prepareGeneratedItem` and render them in `GradedItemExperience` with `LocalGrader`. Check the `onResult` output and the a11y announcements. *Proves goals 2–5.*
2. **Remote grader against a stub.** A tiny endpoint (or MSW mock) that runs `scorePerseusItem` in Node and returns `GradeResult`. *Proves goal 6 and that switching modes is a config swap.*
3. **Security hardening.** Fix or exclude the §4.4 surfaces, and add tests. *Required before any untrusted content ships.*
4. **Feedback UX design pass.** Pick between options 1–3 in §7 with design. *Needed for goal 3 to "feel like a normal question."*

---

## 10. Spike results (2026-10-08)

> **Update:** the spike package has moved to the `spike/perseus-experience` branch (commit `902d1503b0`) and is superseded by the much smaller `PerseusQuestion` component in `@khanacademy/perseus` plus the "Using Perseus in a New Experience" recipe page.

Spikes 1 and 2 are built in `packages/perseus-experience` (private, additive; no other package changed). Spike 3 is covered by exclusion only. Spike 4 needs design and was not started.

| Spike | Status | Evidence |
|---|---|---|
| 1. Local end to end | ✅ Done | Storybook: *Experience / Graded Item Experience* (`LocalGrader`, `PerWidgetFeedback`, `IngestionFailure`); `graded-item-experience.test.tsx` |
| 2. Remote grader against a stub | ✅ Done | `createGradingHandler` + `createInProcessFetch` (600 ms simulated latency) in the `RemoteGrader` story; `graders.test.ts` |
| 3. Security hardening | ◐ Exclusion only | Widget allowlist (deep, including unregistered types) and URL host allowlist in `prepareGeneratedItem`. The in-Perseus fixes in §4.4 are still open (§8) |
| 4. Feedback UX design pass | ⏸ Not started | Option 2 from §7 (per-widget summary list) is implemented as a placeholder for design to react to |

### What the spikes confirmed

- **Switching modes really is a config swap.** The same test suite runs unchanged against local, remote and KA-backend graders (`describe.each` in `graders.test.ts`, and both local and remote in the component tests), and they return identical `GradeResult`s. The design rule in §3.2 holds.
- **`perseus-score` runs fine behind a JSON boundary.** The in-process transport round-trips request and response through `JSON.stringify`/`parse`. Nothing in `PerseusScore`/`widgetScores` breaks.
- **Answers stay off the wire in mode B until reveal.** The client sends `{userInput, ctx}` (plus the *answerless* item only when there's no `itemId`). The full item is fetched only once the learner is correct or out of attempts (tested).
- **Swapping `item` without remounting keeps the learner's input**, as the debug harness relies on. Reveal is therefore a prop change, not a reset.
- **"No mastery from mode A" can be enforced in code.** `useGradedItem` throws if `countsTowardMastery` is paired with a grader whose `requiresAnswersOnClient` is true.

### New findings

1. **Blocking on lint WARNING rejects every Markdown image.** The `image-markdown` rule (severity 2) flags all `![alt](url)` content in favor of the image widget. With §4.3's default (`blockOnLintSeverity: 2`), generated items can't contain images unless the `image` widget is allowlisted. Options: allowlist `image` (needs host allowlist and alt text, both already enforced), or block on ERROR plus a curated list of WARNING rules.
2. **Allowlists must run before parse/migrate**, on the raw object. Otherwise a migration could, in principle, rewrite a disallowed widget or URL into an allowed shape. `prepareGeneratedItem` does it in that order.
3. **A deep, schema-agnostic widget scan is needed.** Perseus's `traverse` only descends into widgets that are registered and declare `traverseChildWidgets`. The ingestion scan instead walks every `widgets` map at any depth, which catches unknown types inside `group`.
4. **Check isn't gated yet.** The spike keeps Check enabled and relies on `invalid` scores ("Keep trying" plus the mapped error). Invalid input doesn't count as an attempt and fires no callbacks. Both renderers do call `apiOptions.answerableCallback` (`renderer.new.tsx:332, 392`), so gating Check on it is a cheap follow-up. It is a UX choice for design, since a disabled Check with no explanation can confuse learners.
5. **WB `Button`'s `disabled` uses `aria-disabled`,** so focus isn't lost while grading. Focus moves to Next only when Check disappears (item finished).
6. **i18n gap.** The wrapper reuses `PerseusStrings` where they exist (`check`, `correctExcited`, `incorrect`, `tryAgain`, `keepTrying`, `nextQuestion`). Three strings are English-only TODOs: the grader-error message, "Here's the answer.", and the per-answer summary.

### Not yet verified

- Mobile keypad inside the wrapper (it is wired through `KeypadContext.Consumer` but untested).
- Manual screen-reader QA (§6.6). Automated coverage is only RTL role/name queries plus Storybook's a11y addon; there is still no jest-axe.
- A real network backend (Node/HTTP) for mode B; only the in-process stub was exercised.

---

## Appendix A: key files and APIs

| API | File |
|---|---|
| `ServerItemRenderer` (`getUserInput`, `showSolutions`, `reviewMode`, `hintsVisible`) | `perseus/src/server-item-renderer.tsx` |
| `APIOptions` (`interactionCallback`, `answerableCallback`, `flags`, …) | `perseus/src/types.ts:159-233` |
| `PerseusDependenciesV2` (`analytics.onAnalyticsEvent`, `useVideo`, `generateUrl`) | `perseus/src/types.ts:349-371` |
| `scorePerseusItem`, `scoreWidgetsFunctional` | `perseus-score/src/score.ts:75, 94` |
| `validateUserInput`, `emptyWidgetsFunctional` | `perseus-score/src/validate.ts:24, 59` |
| `PerseusScore`, `UserInputMap`, `WidgetScorerFunction` | `perseus-core/src/validation.types.ts` |
| `splitPerseusItem` | `perseus-core/src/utils/split-perseus-item.ts:14` |
| `parseAndMigratePerseusItem` | `perseus-core/src/parse-perseus-json/index.ts:39` |
| `removeOrphanedWidgetsFromPerseusItem` | `perseus-core/src/utils/remove-orphaned-widgets.ts:14` |
| `isItemAccessible` | `perseus-core/src/accessibility.ts:18` |
| `lintPerseusItem`, `lintPerseusRenderer` | `perseus-linter/src/lint-content.ts:23, 69` |
| `makeSafeUrl` | `perseus-core/src/utils/make-safe-url.ts` |
| Test-data generators | `perseus-core/src/utils/generators/` |
| Local-grading precedent | `perseus/src/testing/item-renderer-hooks.tsx`, `server-item-renderer-with-debug-ui.tsx`, `debug-check-answer-footer.tsx` |

## Appendix B: widgets for untrusted content

| Widget | Scorer | Strips answers | `accessible` | Safe for generated content? |
|---|---|---|---|---|
| radio | ✅ | ✅ | ✅ | ✅ **Start here** (renders correctness) |
| numeric-input | ✅ | ✅ | ✅ | ✅ (no visual correctness) |
| expression | ✅ | ✅ | ✅ | ✅ (no visual correctness) |
| dropdown | ✅ | ✅ | ✅ | ✅ (no visual correctness) |
| interactive-graph | ✅ | ✅ | ✅ (varies by graph type) | ⚠️ Later; complex options |
| label-image | ✅ | ✅ | computed | ⚠️ Needs an image-host allowlist |
| group | ✅ (recursive) | ✅ (recursive) | ❌ | ⚠️ Only if nested widgets are allowlisted |
| image (static) | — | — | computed | ⚠️ Needs a host allowlist and alt text |
| plotter | ✅ | ✅ | ❌ | ❌ HTML-injection via labels |
| grapher | ✅ | ✅ | computed | ❌ graphie label surface |
| iframe / cs-program / python-program | ✅ / ✅ / — | — | ❌ | ❌ Weak sandbox, spoofable postMessage |
| graded-group | — (scores itself) | ❌ **No stripping** | ✅ | ❌ Answers always on the client |
| unknown / deprecated types | — | — | — | ❌ The parser accepts them; reject at ingestion |
