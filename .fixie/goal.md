# Refactor renderQuestion options into an object

## Task

> Refactor the `renderQuestion()` helper function (in `packages/perseus/src/widgets/__testutils__/renderQuestion.tsx:28`) take only two parameters:
>
> 1. The `question: PerseusRenderer`
> 2. An options object that contains all of the remaining current options

## Code analysis

- `renderQuestion` is the shared React Testing Library fixture for widget and renderer tests. It prepares test dependencies and widget registration, then mounts `Perseus.Renderer` beneath render-state, i18n, dependency, and user-input providers.
- Its positional parameters currently configure renderer API options, extra renderer props, initial user input, injected V2 dependencies, and locale; defaults provide empty API options, test dependencies, and English.
- `RendererWrapper` bridges `UserInputManager` and dependency context into the renderer, while the helper returns the DOM container, renderer instance, unmount callback, and a rerender adapter.
- The helper is imported by widget tests, renderer tests, and widget AI utility tests throughout `packages/perseus/src`. Most calls use only a question or API options; a smaller set skips earlier positional arguments to inject dependencies or extra props.
- `renderQuestion.new.tsx` is a separate temporary fixture for renderer-upgrade tests and retains an analogous positional API; it is not the file named in this task.

## Examples to follow

- `packages/perseus/src/widgets/__testutils__/renderQuestion.tsx` for the complete set of existing configurable inputs and their defaults.
- `packages/perseus/src/widgets/graded-group/graded-group.test.ts:61` for ordinary API option overrides, and `:80` for the dependency override currently obscured by placeholder arguments.
- `packages/perseus/src/__tests__/server-item-renderer.test.tsx:658` for an `extraProps` override currently passed as the third argument.
- Convert calls to named properties, preserving the existing option names and values. For example:

  ```tsx
  renderQuestion(question, {apiOptions});
  renderQuestion(question, {dependencies: depsV2});
  renderQuestion(question, {extraProps});
  ```

## Behavioral requirements

- `renderQuestion` must expose exactly the question and one options-object argument; callers must not rely on positional configuration arguments.
- The options object must represent every current configurable input: `apiOptions`, `extraProps`, `initialUserInput`, `dependencies`, and `locale`.
- Omitting an option must preserve the current fixture behavior, including its default API options, test dependencies, and English locale.
- Existing tests must retain their rendering behavior, injected dependencies, renderer prop overrides, and initial user input after migration.
- Update every call site importing `__testutils__/renderQuestion` so the repository typechecks without legacy positional calls.

## Open questions

- Should the options object itself be optional (to preserve the existing
  one-argument calls), or should all callers explicitly pass an empty object?
  - YES!
- Should the options-object type be exported for reuse by tests, or remain an
  implementation detail of the helper?
  - NO!
- Should the renderQuestion.new.tsx component also be refactored?
  - YES!
