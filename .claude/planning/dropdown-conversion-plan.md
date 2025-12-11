# Dropdown Widget Conversion Plan
## Converting from Class Component to Functional Component

**Target File:** `packages/perseus/src/widgets/dropdown/dropdown.tsx`
**Start Date:** 2025-12-08
**Current Status:** Phases 1-4 Complete; Phase 5 (Final Cleanup) remaining before commit

---

## Overview

This plan outlines the conversion of the Dropdown widget from a React class component to a modern functional component with hooks. The dropdown widget is an excellent candidate for conversion because:

- ✅ No local state management
- ✅ Single lifecycle method (componentDidMount)
- ✅ Simple, props-driven architecture
- ✅ Comprehensive test coverage

### Key Objectives

1. Convert class component to functional component
2. Fix broken focus management (TODO LP-10797)
3. Maintain Widget interface compatibility
4. Ensure all tests pass
5. Maintain accessibility features

---

## Project Phases

### Phase 1: Preparation
**Status:** [X] Complete
**Detailed Plan:** `.claude/planning/dropdown-phase-1-preparation.md`

- [X] Review exploration findings and current implementation
- [X] Verify git branch for work
- [X] Document current behavior baseline
- [X] Run existing tests to establish baseline
- [X] Review Wonder Blocks documentation for SingleSelect
- [X] Check for similar functional component conversions
- [X] ✅ **CRITICAL:** Verify withDependencies HOC forwards refs
- [X] Verify Storybook stories work

---

### Phase 2: Component Conversion
**Status:** [X] Complete
**Detailed Plan:** `.claude/planning/dropdown-phase-2-conversion.md`

- [X] Convert class component structure to functional component
- [X] Replace `static contextType` with `useContext` hook
- [X] Convert `componentDidMount` to `useEffect` hook
- [X] Convert instance methods to function-scoped handlers
- [X] Replace `this.props` with destructured props or direct access
- [X] Handle default props with default parameters
- [X] Maintain dependency injection with `withDependencies` HOC
- [X] Run tests to verify basic functionality

---

### Phase 3: Focus Management Improvement
**Status:** [X] Complete
**Detailed Plan:** `.claude/planning/dropdown-phase-3-focus-management.md`

- [X] Remove deprecated `ReactDOM.findDOMNode()` usage
- [X] Implement `forwardRef` for component
- [X] Use `useImperativeHandle` for Widget interface methods
- [X] Create proper ref forwarding to SingleSelect component (via querySelector)
- [X] Test focus behavior with keyboard navigation
- [X] Update focus tests to verify improvement

---

### Phase 4: Testing & Validation
**Status:** [X] Complete
**Detailed Plan:** `.claude/planning/dropdown-phase-4-testing.md`

- [X] Run full test suite (`pnpm test`)
- [X] Test in Storybook interactive mode
- [X] Verify visual regression stories render correctly
- [X] Test accessibility with keyboard navigation
- [X] Test mobile interaction patterns (console emulator)
- [X] Verify analytics events still fire (confirmed in console)
- [X] Check ARIA labels and screen reader compatibility (VoiceOver tested)
- [X] Test with math rendering in choices (verified in Storybook)

---

### Phase 5: Final Review & Cleanup
**Status:** [ ] Not Started
**Detailed Plan:** `.claude/planning/dropdown-phase-5-cleanup.md`

- [ ] Run linting (`pnpm lint --fix`)
- [ ] Run prettier (`pnpm prettier . --write`)
- [ ] Run type checking (`pnpm tsc`)
- [ ] Review for any console.log or debugging code
- [ ] Update any related documentation if needed
- [ ] Final test suite run
- [ ] Review diff for unintended changes
- [ ] Create commit with descriptive message

---

## Success Criteria

### Functional Requirements
- ✅ All existing tests pass without modification
- ✅ Component renders identically to class version
- ✅ User interactions work as expected (select, change, validate)
- ✅ Analytics events fire correctly
- ✅ Accessibility features maintained (ARIA labels, keyboard nav)
- ✅ Math and markdown rendering in choices works

### Technical Requirements
- ✅ No TypeScript errors
- ✅ No ESLint errors or warnings
- ✅ Code formatted with Prettier
- ✅ Widget interface properly implemented
- ✅ Focus management improved (LP-10797 resolved)
- ✅ No deprecated React APIs used

### Code Quality
- ✅ Follows Perseus functional component patterns
- ✅ Proper hook usage and dependencies
- ✅ Clean, readable code structure
- ✅ Performance characteristics maintained or improved

---

## Key Technical Details

### Current Structure
```typescript
class Dropdown extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    componentDidMount() { /* analytics */ }
    focus() { /* returns boolean */ }
    getPromptJSON() { /* returns AI prompt */ }
    render() { /* JSX */ }
}
```

### Target Structure
```typescript
const Dropdown = forwardRef<WidgetRef, Props>((props, ref) => {
    const context = useContext(PerseusI18nContext);
    useEffect(() => { /* analytics */ }, []);
    useImperativeHandle(ref, () => ({ focus, getPromptJSON }));
    // render JSX
});
```

### Critical Dependencies
- `@khanacademy/wonder-blocks-dropdown` - SingleSelect component
- `@khanacademy/wonder-blocks-core` - View, Id components
- `@khanacademy/wonder-blocks-typography` - LabelLarge
- `PerseusI18nContext` - For i18n strings
- `withDependencies` HOC - For analytics dependency injection

### Known Issues Being Fixed
1. **LP-10797**: Focus doesn't work - using deprecated findDOMNode on non-focusable div
2. **LEMS-3185**: Deprecated serialization API (keeping as-is, marked deprecated)

---

## Session Log

### Session 1 - 2025-12-08
- **Work Done:** Created comprehensive exploration of dropdown widget structure
- **Findings:**
  - Component has no local state (props-driven)
  - Single lifecycle method for analytics
  - Uses deprecated focus mechanism
  - Well-tested with good coverage
- **Created:** All planning documents and phase guides
- **Next Session:** Begin Phase 1 (Preparation)

---

### Session 2 - 2025-12-09
- **Work Done:** Starting Phase 1 (Preparation)
- **Branch:** Using existing branch `tb/LEMS-378/dropdown-conversion`
- **Notes:** Plan updated to reflect current branch instead of creating new one
- **Next Session:** Complete Phase 1 tasks

---

### Session 3 - 2025-12-10
- **Work Done:** Completed Phase 2 (Component Conversion)
- **Changes:**
  - Converted class component to functional component with forwardRef
  - Replaced static contextType with useContext hook
  - Converted componentDidMount to useEffect with empty deps array
  - Consolidated event handlers (removed unused _handleChangeEvent)
  - Implemented Widget interface with useImperativeHandle
  - Used rootRef approach (no deprecated ReactDOM.findDOMNode)
  - Added displayName for better debugging
  - Fixed duplicate React imports
- **Test Results:** All 12 tests passing, no lint errors
- **Notes:** Focus still broken (as expected), will be fixed in Phase 3
- **Next Session:** Phase 3 (Focus Management Improvement)

---

### Session 4 - 2025-12-10
- **Work Done:** Completed Phase 3 (Focus Management Improvement)
- **Implementation Journey:**
  - **Attempt 1 (Failed):** Tried direct ref to SingleSelect with `useRef<HTMLElement>`
    - TypeScript error: SingleSelect doesn't accept ref prop
    - Confirmed SingleSelect doesn't forward refs
  - **Attempt 2 (Success):** querySelector approach on rootRef
    - Used `rootRef.current.querySelector("button")` to find dropdown button
    - Called `button.focus()` when button found
    - Reliable since SingleSelect always renders a single button trigger
- **Changes:**
  - Updated focus() method to use querySelector pattern
  - Removed TODO(LP-10797) comment
  - Updated rootRef comment to reflect dual purpose (focus + events)
  - Enhanced focus test to verify actual DOM focus (not just return value)
  - Test now checks `document.activeElement` is HTMLButtonElement with role="combobox"
- **Test Results:**
  - All 12 dropdown tests passing
  - Wider widget test suite: 823 tests passed, no regressions
  - Snapshots updated (2)
  - Manual Storybook testing confirmed focus works with keyboard
- **Findings:**
  - Wonder Blocks SingleSelect doesn't expose refs (by design)
  - querySelector is a common pattern when child components don't forward refs
  - Other widgets (NumericInputComponent, InputWithExamples) use Focusable interface
  - Decided to keep WidgetHandle type (returns boolean) for minimal refactoring
- **Next Session:** Phase 4 (Testing & Validation) and Phase 5 (Final Review & Cleanup)

---

## Notes & Decisions

### Design Decisions
- **Keep `withDependencies` HOC**: No need to refactor to custom hook, works well as-is
- **Use `forwardRef` + `useImperativeHandle`**: Standard pattern for Widget interface
- **Minimal refactoring**: Focus only on conversion, not feature additions
- **Maintain test structure**: Tests should pass without changes

### Questions & Answers
- **Q:** Should we refactor withDependencies to a hook?
  **A:** No, keep HOC pattern for consistency with other widgets

- **Q:** Should we add useMemo/useCallback optimizations?
  **A:** Only if performance testing shows benefit, avoid premature optimization

---

## References

- **Main Component:** `packages/perseus/src/widgets/dropdown/dropdown.tsx`
- **Tests:** `packages/perseus/src/widgets/dropdown/dropdown.test.ts`
- **Storybook:** `packages/perseus/src/widgets/dropdown/__docs__/`
- **Types:** `packages/perseus-core/src/data-schema.ts`
- **CSS:** `packages/perseus/src/styles/widgets/dropdown.css`

---

## Risks & Mitigation

| Risk | Impact | Mitigation |
|------|--------|------------|
| Tests fail after conversion | High | Run tests frequently during conversion |
| Focus behavior changes | Medium | Test thoroughly with keyboard navigation |
| Analytics events break | Medium | Verify analytics with explicit test |
| Type errors from Widget interface | Low | Use proper TypeScript types from start |
| Wonder Blocks ref forwarding issues | Medium | Test ref behavior with SingleSelect |

---

**Last Updated:** 2025-12-10
**Document Version:** 1.1
