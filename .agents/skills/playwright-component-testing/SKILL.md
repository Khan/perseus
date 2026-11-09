---
name: playwright-component-testing
description: >
  Write, update, run, and debug Perseus's Playwright component tests: the
  `*.spec.ts` files that mount a Perseus question in a real browser. Use this
  skill whenever creating or changing a `*.spec.ts` file or a `*.story.tsx`
  story, using `renderQuestion()` from `testing/playwright`, adding a fixture
  to `@internal/playwright` (config/playwright), or when a Playwright test or
  the "Playwright" CI job fails. Also trigger when the user mentions
  Playwright, `pnpm pw`, browser tests, component tests, the story gallery,
  or "this needs a real browser". Do NOT trigger for Jest tests
  (`*.test.ts(x)`) or Storybook stories (`*.stories.tsx`).
---

# Playwright component tests

A few Perseus tests run in a real browser with Playwright, for what Jest and
React Testing Library can't check: applied CSS, layout, focus and tab order,
and real mouse, touch and keyboard input (drag-and-drop, say). They're slower
and costlier than Jest tests, so **default to a Jest test** and write a
Playwright test only when the behaviour needs a real browser.

## How the pieces fit

- **Specs** are `*.spec.ts` files beside the code they test (for example
  `packages/perseus/src/widgets/sorter/new/sorter.spec.ts`). They run in Node.
- **Stories** are `*.story.tsx` files whose named exports are components
  written for a test to mount. They run in the browser. Not to be confused
  with Storybook's `*.stories.tsx`.
- **The story gallery** (`config/playwright/gallery`) is the page stories are
  mounted into. Vite builds and serves it while the tests run. It finds every
  `*.story.tsx` under `packages/` by itself. A story's id is its package, its
  path under `src/` without `.story.tsx`, and its export name:
  `perseus/testing/playwright/question/Question`.
- **`mount(storyId, props)`** (a Playwright fixture) loads the gallery in a
  fresh page and renders that story. Props cross from Node to the browser, so
  they must be plain data: no functions, no class instances.
- **`@internal/playwright`** (`config/playwright`) holds the config, the
  gallery and the fixtures. Specs import `test` and `expect` from it, never
  from `@playwright/test` directly (ESLint enforces this), so that its
  fixtures, such as coverage collection, apply to every spec. Its `expect`
  also has the score matchers our Jest tests use, such as
  `toHaveBeenAnsweredCorrectly()`.

## Writing a spec for a Perseus question

Most specs render a question with `renderQuestion()`, which mounts the
`Question` story and waits until the question has finished rendering:

```ts
import {expect, test} from "@internal/playwright";

import renderQuestion from "../../testing/playwright/render-question";
import {scorePerseusItemTesting} from "../../util/scoring.testutils";

import {myQuestion} from "./my-widget.testdata";

test("scores a correct answer as correct", async ({mount, page}) => {
    const question = await renderQuestion(mount, myQuestion);

    const input = question.userInputField;
    const before = await input.inputValue();
    await page.getByRole("button", {name: "Apple"}).click();
    // Wait for the click to reach the question's user input.
    await expect(input).not.toHaveValue(before);

    const score = scorePerseusItemTesting(
        myQuestion,
        await question.getUserInputMap(),
    );
    expect(score).toHaveBeenAnsweredCorrectly();
});
```

`renderQuestion()` returns a `RenderedQuestion` (see
`testing/playwright/types.ts`):

- `component`: the mounted story. Scope locators to it.
- `userInputField`: a hidden field holding the question's user input as JSON.
  Its value changes whenever the question reports new user input.
- `getUserInputMap()`: reads the current user input, to score it in the test.

A story's props must be plain data, so the story records what a test needs to
observe (readiness, user input) in hidden inputs, and the test reads them.
Write a new story only when `Question` can't express the scenario.

### Rules

- **Always destructure the fixtures argument**, in `test`, `beforeEach`,
  `afterEach`, `beforeAll`, `afterAll` and fixture definitions:
  `async ({mount, page}) => …`. Playwright reads which fixtures to set up from
  that destructuring, so `async (fixtures) => …` makes the whole file fail to
  load ("First argument must use the object destructuring pattern"), even
  though it typechecks and lints. To pass several fixtures to a helper,
  destructure them and pass an object: `await setUp({mount, page})`.
- **Check a spec still loads after editing it** (including after resolving a
  merge conflict in it): `pnpm pw:ci --list <spec path>`. It takes seconds and
  needs no browser.
- **Wait for a signal, never for time.** No `page.waitForTimeout()`. Use a
  web-first assertion, which retries until it holds
  (`await expect(locator).toBeVisible()`). After an interaction, wait for
  the change it should cause before the next step or before scoring.
  Widgets often update their own UI a render before they report user input,
  so wait for `userInputField` to change rather than reading it straight
  away. Retrying the final assertion with `expect(...).toPass()` instead can
  pass on stale input (an earlier answer can be wrong too), so prefer the
  wait.
- **Assert on correctness with the score matchers**
  (`toHaveBeenAnsweredCorrectly()`, `toHaveBeenAnsweredIncorrectly()`), not
  by comparing whole score objects.
- **Prefer accessible locators**: `getByRole`, `getByLabel`, `getByText`, then
  `getByTestId`. Avoid CSS class selectors; Aphrodite's are hashed.
- **Reading a value doesn't retry** (`inputValue()`, `getAttribute()`,
  `boundingBox()`), so make sure the element is in the state you expect
  first.
- **No Arrange/Act/Assert comments.** A browser test interleaves actions and
  assertions, so they don't fit (see AGENTS.md). Comment a step only to say
  what it's for.
- **Test titles describe the outcome** ("scores a correct answer as
  correct"), not "should …".

Every spec runs twice, in the `mobile` project (a phone-sized, touch-enabled
viewport) and the `desktop` project. A spec that only makes sense in one can
check `test.info().project.name`, but prefer specs that hold in both.

## Running tests

Once, and after Playwright upgrades, install the browser:
`pnpm exec playwright install chromium`. Without it, every test fails as soon
as it launches the browser.

```bash
pnpm pw                                  # UI mode: pick tests, watch them, step through actions
pnpm pw:ci                               # everything, headless, as CI runs it
pnpm pw:ci packages/perseus/src/widgets/sorter  # one folder or spec
pnpm pw:ci -g "scores a correct answer"  # tests whose titles match
pnpm pw:ci --project desktop             # one project
pnpm pw:ci --headed                      # watch the browser
pnpm pw:ci --debug                       # step through with the Playwright Inspector
```

Each run builds the gallery and serves it on port 3100, so that port must be
free. To iterate on a story or component with live reloading, run
`pnpm pw:gallery` (Vite's dev server) in another terminal; `pnpm pw` reuses
it. Each mount is slower that way.

`pnpm coverage` runs Jest, then Playwright with coverage on, and merges the
two into `coverage/final`. Coverage needs the built gallery, so stop
`pnpm pw:gallery` first.

## Debugging a failure

- **Locally:** the failed attempt's screenshot and trace are under
  `genfiles/playwright/test-results/<test>/`. Replay the trace (DOM
  snapshots, actions, console, network) with
  `pnpm exec playwright show-trace genfiles/playwright/test-results/<test>/trace.zip`,
  or rerun the test in `pnpm pw` to watch it.
- **In CI:** failures are annotated on the PR. Each run uploads a
  `playwright-report` artifact with the HTML report and each failed
  attempt's screenshot and trace, including attempts that passed on a
  retry. Download and unzip it, then run
  `pnpm exec playwright show-report <unzipped>/report`.
- **A test that passes only on a retry** is reported as flaky. Find what it
  isn't waiting for and fix that; don't add retries or timeouts.
