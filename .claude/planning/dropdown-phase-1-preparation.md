# Phase 1: Preparation
## Dropdown Widget Conversion - Preparation Phase

**Phase Status:** [X] Complete
**Estimated Complexity:** Low
**Dependencies:** None

---

## Overview

This phase establishes a solid foundation for the dropdown widget conversion. We'll review the current implementation, set up version control, establish testing baselines, and gather any additional technical information needed for the conversion.

---

## Tasks Checklist

### Task 1.1: Review Exploration Findings
**Status:** [ ] Complete

Review the comprehensive exploration report to understand:
- Current class component structure
- Props and type definitions
- Instance methods and their purposes
- Dependencies and imports
- Known issues and TODOs

**Files to Review:**
- `packages/perseus/src/widgets/dropdown/dropdown.tsx`
- Exploration findings document

**Success Criteria:**
- Clear understanding of current implementation
- Identified all methods that need conversion
- Noted all lifecycle methods and their purposes

---

### Task 1.2: Verify Git Branch
**Status:** [ ] Complete

Verify we're on the correct git branch for this work.

**Commands:**
```bash
# Verify current branch
git branch --show-current

# Check working directory status
git status
```

**Success Criteria:**
- On branch: `tb/LEMS-378/dropdown-conversion`
- Working directory status verified
- Ready to begin work

---

### Task 1.3: Document Current Behavior Baseline
**Status:** [ ] Complete

Take snapshots of current behavior to ensure conversion maintains functionality.

**Document the following:**

1. **Component Structure:**
   - Class component with no local state
   - Uses PerseusI18nContext
   - Implements Widget interface
   - Wrapped with withDependencies HOC

2. **Instance Methods:**
   ```typescript
   focus(): boolean
   getPromptJSON(): string
   getSerializedState(): any (deprecated)
   ```

3. **Lifecycle Methods:**
   - `componentDidMount()` - Fires analytics event

4. **Event Handlers:**
   - `_handleChangeEvent(e)` - Parses DOM event
   - `_handleChange(value)` - Updates parent state

5. **Props Interface:**
   - Required: choices, placeholder, apiOptions, userInput, dependencies
   - Optional: visibleLabel, ariaLabel, static, widgetId

**Create Baseline Document:**
Create a file: `.claude/planning/dropdown-baseline-behavior.md`

**Success Criteria:**
- Baseline document created with all current behavior documented
- Ready to compare after conversion

---

### Task 1.4: Run Existing Tests (Baseline)
**Status:** [ ] Complete

Run the full test suite for the dropdown widget to establish a baseline.

**Commands:**
```bash
# Run dropdown widget tests
pnpm test packages/perseus/src/widgets/dropdown

# Note: This will run:
# - dropdown.test.ts (main tests)
# - serialize-dropdown.test.ts (legacy serialization tests)
```

**Expected Results:**
```
PASS packages/perseus/src/widgets/dropdown/dropdown.test.ts
PASS packages/perseus/src/widgets/dropdown/serialize-dropdown.test.ts

Test Suites: 2 passed, 2 total
Tests: XX passed, XX total
```

**Document Test Results:**
Record in session log:
- Number of test suites passed
- Number of individual tests passed
- Any warnings or deprecation notices
- Test execution time

**Success Criteria:**
- All tests pass
- No errors or failures
- Baseline numbers documented for comparison

---

### Task 1.5: Review Wonder Blocks Documentation
**Status:** [ ] Complete

Review the Wonder Blocks components used by the dropdown to understand their APIs, especially for ref forwarding.

**Components to Research:**

1. **SingleSelect** (`@khanacademy/wonder-blocks-dropdown`)
   - Props API
   - Ref forwarding capabilities
   - Focus management methods
   - Change event handling

2. **Id HOC** (`@khanacademy/wonder-blocks-core`)
   - How to use with functional components
   - Props it provides
   - Render prop pattern

3. **View** (`@khanacademy/wonder-blocks-core`)
   - Event handling props
   - Ref forwarding

**Research Methods:**
- Check Wonder Blocks Storybook/documentation
- Look at type definitions in node_modules
- Search for usage examples in Perseus codebase
- Check Wonder Blocks GitHub if needed

**Key Questions to Answer:**
1. Can SingleSelect accept a ref for focus management?
2. Does Id HOC work the same with functional components?
3. Are there any breaking changes to be aware of?

**Success Criteria:**
- Documented how to use SingleSelect with refs
- Understand Id HOC usage with functional components
- Identified any potential compatibility issues

---

### Task 1.6: Check for Similar Conversions
**Status:** [ ] Complete

Look for any other widgets that have already been converted to functional components to identify patterns.

**Search Strategy:**
```bash
# Search for functional components with forwardRef
grep -r "forwardRef" packages/perseus/src/widgets/

# Search for useImperativeHandle usage
grep -r "useImperativeHandle" packages/perseus/src/widgets/

# Search for Widget interface implementations with functional components
grep -r "implements Widget" packages/perseus/src/widgets/
```

**Document Findings:**
- List any widgets already using functional components
- Note patterns used (especially for Widget interface)
- Document any useful code snippets to reference

**Success Criteria:**
- Identified existing functional component patterns in codebase
- Documented reusable patterns for our conversion
- Or confirmed this will be the first conversion (pioneering!)

---

### Task 1.7: Verify withDependencies HOC Forwards Refs
**Status:** [ ] Complete

**CRITICAL:** Verify that the `withDependencies` HOC properly forwards refs. Many HOCs don't forward refs unless explicitly coded with `forwardRef`, which would break our `useImperativeHandle` approach.

**Investigation:**

1. **Find withDependencies source:**
```bash
# Search for withDependencies definition
grep -r "withDependencies" packages/perseus/src --include="*.tsx" --include="*.ts" -A 10 | grep -E "(export|function|const withDependencies)"
```

2. **Check if it uses forwardRef:**
Look for patterns like:
```typescript
export const withDependencies = forwardRef((props, ref) => {
    // or
export function withDependencies<T>(Component: ComponentType<T>) {
    return forwardRef((props, ref) => {
```

3. **Test with a simple example:**
If unclear from code, create a minimal test in the browser console or temp file to verify ref forwarding works.

**Expected Findings:**

**If withDependencies forwards refs:**
✅ Proceed with plan as-is - our forwardRef + useImperativeHandle approach will work

**If withDependencies does NOT forward refs:**
⚠️ **BLOCKER** - We have four options:
1. Modify withDependencies to forward refs (may affect other widgets)
2. Wrap the export with an explicit forwardRef wrapper around withDependencies
3. Apply withDependencies inside the component instead of wrapping it
4. Use a different dependency injection pattern

**Document Findings:**
Record in "Notes & Observations" section:
- Does withDependencies forward refs? (Yes/No)
- Source file location
- If No: Which option above should we pursue?

**Success Criteria:**
- Confirmed whether withDependencies forwards refs
- If it doesn't, documented plan to address this
- No unknown blockers

---

### Task 1.8: Verify Storybook Stories Work
**Status:** [ ] Complete

Ensure the dropdown Storybook stories render correctly before making changes.

**Commands:**
```bash
# Start Storybook
pnpm storybook
```

**Stories to Verify:**
1. **Main Stories** (`dropdown.stories.tsx`)
   - Basic dropdown
   - Dropdown with math
   - Dropdown with visible label
   - Inline dropdown

2. **Visual Regression Tests** (`dropdown.initial-state.stories.tsx`)
   - Initial render snapshots

3. **Interaction Tests** (`dropdown.interactions.stories.tsx`)
   - User interaction flows

**Manual Testing:**
- [ ] All stories render without errors
- [ ] Can open dropdown and select options
- [ ] Math rendering works in choices
- [ ] Visible label displays correctly
- [ ] Placeholder shows before selection
- [ ] Analytics events fire (check console)

**Success Criteria:**
- All stories render successfully
- No console errors in Storybook
- Interactive features work as expected
- Screenshots/notes taken for comparison after conversion

---

## Phase Completion Checklist

Before moving to Phase 2, verify:

- [ ] All tasks (1.1 - 1.8) marked complete
- [ ] Git branch created and active
- [ ] Baseline test results documented
- [ ] Current behavior documented
- [ ] Wonder Blocks APIs understood
- [ ] **withDependencies ref forwarding verified** (CRITICAL)
- [ ] Storybook stories verified working
- [ ] No blockers identified

---

## Notes & Observations

**Add notes here as you work through this phase:**

- **2025-12-09**: Git branch confirmed as `tb/LEMS-378/dropdown-conversion`
- **2025-12-09**: Baseline behavior document created at `.claude/planning/dropdown-baseline-behavior.md`
- **2025-12-09**: Test baseline run shows 2 snapshot failures (CSS class hash changes in Wonder Blocks):
  - `menuWrapper_j210b4` → `menuWrapper_wvrnr4`
  - These are non-functional failures (just hashed class names)
  - Tests: 10 passed, 2 failed (snapshots), 12 total
  - Test suites: 1 passed (serialize-dropdown), 1 failed (dropdown), 2 total
  - **Action taken:** Updated snapshots with `pnpm test -u`, all tests now pass
- **2025-12-09**: Wonder Blocks documentation reviewed:
  - SingleSelect is a functional component, no explicit ref forwarding visible in types
  - Id component uses render prop pattern, works with functional components
  - View component supports event handlers and is straightforward
- **2025-12-09**: Similar conversions checked:
  - Found `numeric-input` widget using `forwardRef` + `useImperativeHandle`
  - Pattern: Hybrid approach with class wrapper + functional component for rendering
  - **Our approach:** Full functional conversion (not hybrid like numeric-input)
- **2025-12-09**: ✅ **CRITICAL FINDING** - withDependencies DOES forward refs:
  - File: `packages/perseus/src/components/with-dependencies.tsx`
  - Uses `React.forwardRef` internally (line 18)
  - Passes `ref={ref}` to wrapped component (line 28)
  - Return type: `React.ForwardRefExoticComponent<...RefAttributes<any>>`
  - **Conclusion:** Our `forwardRef` + `useImperativeHandle` plan will work! ✅
- **2025-12-09**: Storybook verification (manual testing):
  - ✅ Dropdown renders with correct styling
  - ✅ Opens/closes properly, options selectable
  - ✅ Math content renders correctly in options
  - ✅ Visible label displays properly
  - ✅ Keyboard navigation works (tab, arrow keys, enter, escape)
  - ✅ ARIA label present: "Select an answer"
  - **All stories working as expected**

---

## Potential Issues Identified

**Document any concerns found during preparation:**

-
-
-

---

## Ready for Phase 2?

If all tasks are complete and no blockers exist, you're ready to proceed to:
**Phase 2: Component Conversion** (`.claude/planning/dropdown-phase-2-conversion.md`)

---

**Phase Started:** 2025-12-09
**Phase Completed:** 2025-12-09
**Time Spent:** ~1 hour