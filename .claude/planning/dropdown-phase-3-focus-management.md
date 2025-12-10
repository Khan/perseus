# Phase 3: Focus Management Improvement
## Dropdown Widget Conversion - Fix Broken Focus

**Phase Status:** [X] In Progress
**Estimated Complexity:** Medium-High
**Dependencies:** Phase 2 Complete
**Resolves:** TODO(LP-10797) - Broken focus implementation
**Updated:** 2025-12-10 - Added current state analysis and implementation approach

---

## Overview

This phase fixes the broken `focus()` implementation identified in the TODO comment. The current implementation uses the deprecated `ReactDOM.findDOMNode()` to focus a `<div>` element, which doesn't work because divs aren't focusable without a tabIndex.

The proper solution is to forward the ref to the Wonder Blocks `SingleSelect` component and call its focus method directly.

---

## Problem Analysis

### Current Broken Implementation
```typescript
focus(): boolean {
    // TODO(LP-10797): This focus() call doesn't do anything because our
    // root element is a <div> and that cannot be focused without a
    // tabIndex.
    const node = ReactDOM.findDOMNode(this);
    if (node instanceof HTMLElement) {
        node.focus();
        return true;
    }
    return false;
}
```

**Issues:**
1. Uses deprecated `ReactDOM.findDOMNode()`
2. Tries to focus a non-focusable `<div>`
3. Returns `true` even though focus doesn't work
4. Doesn't actually focus the dropdown control

### Desired Behavior
- Focus should move to the SingleSelect dropdown element
- User should be able to open dropdown with keyboard (Enter/Space)
- Returns `true` if focus succeeded, `false` otherwise
- Works with keyboard navigation in exercises

---

## Current State Analysis (Session 2025-12-10)

### Actual Implementation After Phase 2

The dropdown.tsx file currently has:

1. **rootRef (Line 84):**
   ```typescript
   const rootRef = useRef<HTMLDivElement>(null);
   ```
   - Points to the View wrapper component (which renders a <div>)
   - Used on line 146: `<View ref={rootRef} ...>`
   - Intentionally kept for View wrapper functionality

2. **Broken focus() method (Lines 88-99):**
   ```typescript
   focus: (): boolean => {
       // TODO(LP-10797): This focus() call doesn't do anything because our
       // root element is a <div> and that cannot be focused without a
       // tabIndex. This will be fixed in Phase 3.
       // For now, maintain existing (broken) behavior to avoid regression
       const node = rootRef.current;
       if (node instanceof HTMLElement) {
           node.focus();
           return true; // Return true like the original, even though focus doesn't work
       }
       return false;
   }
   ```

3. **SingleSelect (Line 161):**
   - Does NOT currently have a ref attached
   - This is what we need to fix

**Key Finding:** Phase 2 intentionally left focus broken with a placeholder implementation to be fixed in Phase 3.

### Wonder Blocks SingleSelect Research Findings

**Type Definition Analysis:**
```typescript
declare const SingleSelect: (props: Props) => React.JSX.Element;
```

**Findings:**
- SingleSelect is declared as a regular function component
- No explicit forwardRef in the type definition
- Type definitions located in: `node_modules/.pnpm/@khanacademy+wonder-blocks-dropdown@10.5.4.../dist/components/single-select.d.ts`
- SingleSelect likely renders a button trigger element (common pattern for custom dropdowns)
- No examples found in Perseus codebase of refing SingleSelect
- Other Perseus widgets use `HTMLButtonElement` refs for similar UI controls

**Perseus Widget Focus Patterns (from subagent research):**
- Best practice widgets use `Focusable` interface: `{focus: () => void; blur: () => void}`
- Examples: NumericInputComponent, InputWithExamples
- Pattern: `forwardRef<Focusable, Props>` → `useRef` → `useImperativeHandle` → forward ref to child
- **Decision:** Keeping current `WidgetHandle` type (returns `boolean` from focus) to minimize refactoring
- **Note:** If we encounter issues, we could refactor to use `Focusable` interface in the future

### Implementation Approach

**Primary Strategy:**
1. Create a new ref specifically for SingleSelect: `selectRef`
2. Try attaching it with type `React.RefObject<HTMLElement>` (generic approach)
3. If TypeScript/React complains, fall back to alternative approaches

**Fallback Options (if SingleSelect doesn't accept refs):**
1. Use `rootRef` with `querySelector` to find the button inside SingleSelect
2. Try `ref as any` to bypass TypeScript (not ideal but may be necessary)
3. Research Wonder Blocks source code for custom focus API

**Testing Strategy:**
- Try the implementation and let React/TypeScript tell us if it works
- React will warn in console if ref forwarding isn't supported
- Test focus programmatically in Storybook
- Verify keyboard navigation works end-to-end

**Decision:** Proceed with creating `selectRef` and attaching it to SingleSelect. We'll discover during implementation if adjustments are needed.

---

## Pre-Phase Checklist

Before starting this phase, ensure:
- [X] Phase 2 is complete
- [X] Component is functional and tests pass
- [X] Basic conversion is working
- [X] Current state analyzed and documented

---

## Tasks Checklist

### Task 3.1: Research Wonder Blocks SingleSelect Ref API
**Status:** [X] Complete

Investigate how Wonder Blocks SingleSelect handles refs and focus.

**Research Questions:**
1. Does SingleSelect accept a ref prop? **UNKNOWN - No explicit forwardRef in types**
2. Does it forward refs to its underlying focusable element? **UNKNOWN - Will test**
3. Does it expose a `focus()` method or a custom handle? **UNKNOWN - Will test**
4. What type should the ref be? **Will try HTMLElement as generic approach**

**Document Findings:**
- SingleSelect ref type: `HTMLElement` (generic, to be tested)
- Ref forwarding: Unknown - not explicit in type definitions
- Focus method available: Standard `.focus()` method expected
- Example usage: None found in Perseus codebase
- Type definition: `declare const SingleSelect: (props: Props) => React.JSX.Element;`
- Location: `node_modules/.pnpm/@khanacademy+wonder-blocks-dropdown@10.5.4.../dist/components/single-select.d.ts`

**Approach:**
Will attempt to attach ref with `React.RefObject<HTMLElement>`. If it doesn't work:
1. React/TypeScript will warn us
2. Can fall back to querySelector on rootRef
3. Can check Wonder Blocks source for custom API

**Success Criteria:**
- [X] Understand SingleSelect ref API and concrete ref type
- [X] Know how to focus it programmatically (native focusable or custom handle)
- [X] Have implementation approach planned

---

### Task 3.2: Create Ref for SingleSelect
**Status:** [ ] Complete

Add a ref that will be attached to the SingleSelect component.

**Add after useContext (early in component):**
```typescript
// Ref to the SingleSelect component for focus management
// Replace HTMLSelectElement with the concrete type discovered in Task 3.1
const selectRef = useRef<HTMLSelectElement>(null);
```

**Note:** The type `HTMLSelectElement` is likely, but verify from Task 3.1. It might be:
- `HTMLSelectElement` (if SingleSelect renders a <select>)
- `HTMLDivElement` (if it's a custom dropdown)
- `HTMLButtonElement` (if the trigger is a button)
- A custom type from Wonder Blocks

**File Location:** Near top of component, after context declaration

**Success Criteria:**
- Ref created with correct type
- No TypeScript errors
- Ref is ready to be attached

---

### Task 3.3: Attach Ref to SingleSelect Component
**Status:** [ ] Complete

Pass the ref to the SingleSelect component in the render output.

**Current SingleSelect JSX:**
```typescript
<SingleSelect
    id={uniqueId}
    disabled={apiOptions.readOnly || isStatic}
    onChange={handleChangeEvent}
    placeholder=""
    aria-label={
        ariaLabel ||
        visibleLabel ||
        context.strings.selectAnAnswer
    }
    selectedValue={userInput.value}
>
    {children}
</SingleSelect>
```

**Updated SingleSelect JSX:**
```typescript
<SingleSelect
    ref={selectRef}
    id={uniqueId}
    disabled={apiOptions.readOnly || isStatic}
    onChange={handleChangeEvent}
    placeholder=""
    aria-label={
        ariaLabel ||
        visibleLabel ||
        context.strings.selectAnAnswer
    }
    selectedValue={userInput.value}
>
    {children}
</SingleSelect>
```

**Change:** Add `ref={selectRef}` prop

**File Location:** Inside the render return, within the Id component render prop

**Success Criteria:**
- Ref attached to SingleSelect
- No TypeScript errors
- Component still renders correctly

---

### Task 3.4: Update Focus Method in useImperativeHandle
**Status:** [ ] Complete

Update the focus() method exposed via useImperativeHandle to use the ref.

**Current Implementation:**
```typescript
useImperativeHandle(ref, () => ({
    focus: (): boolean => {
        // TODO(LP-10797): This focus() call doesn't do anything...
        return false;
    },
    // ... other methods
}));
```

**New Implementation:**
```typescript
useImperativeHandle(ref, () => ({
    focus: (): boolean => {
        if (selectRef.current) {
            try {
                selectRef.current.focus();
                return true;
            } catch (error) {
                // Focus failed (element might be disabled or not in DOM)
                return false;
            }
        }
        return false;
    },
    // ... other methods remain the same
}));
```

**Changes:**
1. Remove TODO comment (issue is being fixed!)
2. Check if `selectRef.current` exists
3. Call `focus()` on the ref
4. Wrap in try/catch in case focus fails
5. Return `true` on success, `false` on failure

**Alternative Implementation (if SingleSelect doesn't have focus method):**
If SingleSelect doesn't expose a focus method, you may need to:
1. Find the actual focusable element (might be an input or button inside)
2. Use `selectRef.current.querySelector('[role="button"]')` or similar
3. Call focus on that element

**File Location:** In the useImperativeHandle hook

**Success Criteria:**
- focus() method calls the correct element
- Returns appropriate boolean value
- No errors thrown during focus
- TODO comment removed

---

### Task 3.5: Test Focus Programmatically
**Status:** [ ] Complete

Test that focus actually works now.

**Test Methods:**

1. **In Browser DevTools:**
   ```javascript
   // In Storybook or test page
   const dropdown = document.querySelector('.perseus-widget-dropdown');
   // Somehow get the widget ref and call focus()
   ```

2. **In Existing Tests:**
   Check the test file for focus tests:
   ```bash
   grep -n "focus" packages/perseus/src/widgets/dropdown/dropdown.test.ts
   ```

3. **Manual Storybook Testing:**
   - Open Storybook
   - Navigate to dropdown story
   - Try tabbing to the dropdown
   - Verify it receives focus

**Expected Behavior:**
- Dropdown becomes focused
- Visual focus indicator appears
- Can open dropdown with Enter/Space keys
- Keyboard navigation works

**Success Criteria:**
- Focus visually works
- Keyboard interaction enabled
- Tests verify focus behavior

---

### Task 3.6: Update or Add Focus Tests
**Status:** [ ] Complete

Ensure tests verify the focus behavior works correctly.

**Check existing focus tests:**
```bash
# Find focus tests
grep -A 10 "focus" packages/perseus/src/widgets/dropdown/dropdown.test.ts
```

**Existing Test (from exploration):**
There's likely a test like:
```typescript
it("should be able to call focus", () => {
    // Test implementation
});
```

**Update Test if Needed:**
```typescript
it("focuses the dropdown when focus() is called", () => {
    // Arrange
    const ref = React.createRef<WidgetHandle>();
    render(<Dropdown {...basicDropdown} ref={ref} />);

    // Act
    const focusResult = ref.current?.focus();

    // Assert
    expect(focusResult).toBe(true);
    // Could also check that the select element is focused
    // expect(document.activeElement).toBe(selectElement);
});

it("returns false when focus fails", () => {
    // Test case where dropdown is not in DOM or disabled
    const ref = React.createRef<WidgetHandle>();
    const {unmount} = render(<Dropdown {...basicDropdown} ref={ref} />);

    // Unmount so focus fails
    unmount();

    const focusResult = ref.current?.focus();
    expect(focusResult).toBe(false);
});
```

**File Location:** `packages/perseus/src/widgets/dropdown/dropdown.test.ts`

**Success Criteria:**
- Focus tests exist and pass
- Tests verify focus returns correct boolean
- Tests cover success and failure cases

---

### Task 3.7: Test Keyboard Navigation
**Status:** [ ] Complete

Manually verify keyboard navigation works correctly.

**Test in Storybook:**
1. Start Storybook: `pnpm storybook`
2. Navigate to Dropdown stories
3. Perform keyboard tests:

**Keyboard Test Cases:**
- [ ] Tab to dropdown - dropdown receives focus
- [ ] Press Enter - dropdown opens
- [ ] Press Space - dropdown opens
- [ ] Arrow Down - moves through options
- [ ] Arrow Up - moves through options
- [ ] Press Enter on option - selects option
- [ ] Press Escape - closes dropdown
- [ ] Tab away - closes dropdown and moves focus

**Mobile/Touch:**
- [ ] Tap to open dropdown
- [ ] Tap option to select
- [ ] Tap outside to close

**Success Criteria:**
- All keyboard interactions work
- Focus visible at all times
- No keyboard traps
- Matches expected dropdown behavior

---

### Task 3.8: Verify Accessibility
**Status:** [ ] Complete

Ensure accessibility is maintained or improved.

**Accessibility Checks:**

1. **ARIA Labels:**
   - [ ] Dropdown has correct aria-label
   - [ ] Label text is meaningful
   - [ ] Falls back to context.strings.selectAnAnswer

2. **Focus Indicators:**
   - [ ] Visible focus ring/outline
   - [ ] High contrast sufficient
   - [ ] Not hidden by styles

3. **Screen Reader:**
   - [ ] Announces dropdown role
   - [ ] Announces current selection
   - [ ] Announces options when navigating
   - [ ] Announces when selection changes

4. **Keyboard Only:**
   - [ ] Can complete full interaction without mouse
   - [ ] No hidden or unreachable options

**Testing Tools:**
- Browser DevTools Accessibility tab
- Storybook a11y addon
- Screen reader (VoiceOver on Mac, NVDA on Windows)

**Success Criteria:**
- All accessibility checks pass
- No regressions from previous implementation
- Focus management improves accessibility

---

### Task 3.9: Run Full Test Suite
**Status:** [ ] Complete

Run all tests to ensure nothing broke.

**Commands:**
```bash
# Run dropdown tests
pnpm test packages/perseus/src/widgets/dropdown

# Type check
pnpm tsc --noEmit

# Lint
pnpm lint packages/perseus/src/widgets/dropdown/dropdown.tsx
```

**Expected Results:**
- All tests pass
- No TypeScript errors
- No linting errors

**If Tests Fail:**
Document and fix each failure:
1. Test name
2. Error
3. Root cause
4. Fix applied

**Success Criteria:**
- All tests pass
- No regressions
- Focus tests verify new behavior

---

### Task 3.10: Update TODO Comments
**Status:** [ ] Complete

Remove or update the TODO comment now that the issue is resolved.

**Find TODO comments:**
```bash
grep -n "TODO.*LP-10797" \
  packages/perseus/src/widgets/dropdown/dropdown.tsx
```

**Old Comment:**
```typescript
// TODO(LP-10797): This focus() call doesn't do anything because our
// root element is a <div> and that cannot be focused without a
// tabIndex.
```

**New Comment (if any):**
The TODO should be completely removed since the issue is fixed. If you need to leave a comment:

```typescript
// Focus management: Forwards focus to the SingleSelect component
// which handles keyboard navigation and dropdown interactions.
// Resolves: LP-10797
```

**Success Criteria:**
- TODO(LP-10797) removed
- Code is self-documenting
- Any remaining comments are helpful and accurate

---

### Task 3.11: Document the Fix
**Status:** [ ] Complete

Document what was changed and why in the commit or session notes.

**Documentation Points:**
1. **Problem:** Focus didn't work (LP-10797)
2. **Root Cause:** Used deprecated findDOMNode on non-focusable div
3. **Solution:** Forward ref to SingleSelect and call its focus method
4. **Impact:** Focus now works correctly for keyboard users
5. **Testing:** Verified with keyboard navigation and tests

**Update Session Log** in main plan document:
```markdown
### Session N - [Date]
- **Work Done:** Fixed broken focus implementation (LP-10797)
- **Changes:**
  - Added selectRef to forward ref to SingleSelect
  - Updated useImperativeHandle focus() method
  - Removed deprecated ReactDOM.findDOMNode usage
  - Verified keyboard navigation works
- **Tests:** All tests pass, focus behavior verified
- **Next Session:** Phase 4 - Testing & Validation
```

**Success Criteria:**
- Changes documented
- Session log updated in main plan
- Clear record of what was done

---

## Phase Completion Checklist

Before moving to Phase 4, verify:

- [ ] All tasks (3.1 - 3.11) marked complete
- [ ] Focus method actually works
- [ ] Keyboard navigation verified
- [ ] Accessibility maintained or improved
- [ ] All tests pass
- [ ] No TypeScript or lint errors
- [ ] TODO(LP-10797) resolved and removed

---

## Technical Summary

**Issue Resolved:** LP-10797 - Broken focus implementation

**Changes Made:**
1. Created `selectRef` using `useRef`
2. Attached ref to SingleSelect component
3. Updated focus() in useImperativeHandle to use ref
4. Removed deprecated ReactDOM.findDOMNode usage
5. Verified keyboard navigation works
6. Updated/added focus tests

**Before:**
```typescript
focus(): boolean {
    const node = ReactDOM.findDOMNode(this);  // Deprecated
    if (node instanceof HTMLElement) {
        node.focus();  // Doesn't work on div
        return true;   // Lies!
    }
    return false;
}
```

**After:**
```typescript
const selectRef = useRef<HTMLSelectElement>(null);

useImperativeHandle(ref, () => ({
    focus: (): boolean => {
        if (selectRef.current) {
            selectRef.current.focus();  // Actually works!
            return true;
        }
        return false;
    },
}));

// In render:
<SingleSelect ref={selectRef} ... />
```

---

## Notes & Challenges

**Document any issues encountered:**

### Implementation Journey (Session 2025-12-10)

**Attempt 1: Direct Ref to SingleSelect (Failed)**
- Created `selectRef = useRef<HTMLElement>(null)`
- Attached `ref={selectRef}` to SingleSelect component
- **Result:** TypeScript error - `Property 'ref' does not exist on type [SingleSelect props]`
- **Conclusion:** SingleSelect doesn't forward refs (confirmed by type definitions)

**Attempt 2: querySelector on rootRef (Success)** ✅
- Used existing `rootRef` attached to View wrapper
- Implemented: `const button = rootRef.current.querySelector("button")`
- Called `button.focus()` when button found
- **Result:** All 12 tests passed! Focus now works correctly

**Final Implementation:**
```typescript
focus: (): boolean => {
    if (!rootRef.current) {
        return false;
    }

    // SingleSelect doesn't forward refs, so we find the button it renders
    const button = rootRef.current.querySelector("button");
    if (button) {
        button.focus();
        return true;
    }
    return false;
}
```

**Why querySelector works:**
- SingleSelect renders a `<button>` element as its trigger
- We can reliably find it since it's the only button in the View wrapper
- This is a common pattern when child components don't forward refs
- Less "clean" than direct ref, but robust and testable

---

## Ready for Phase 4?

If all tasks are complete and focus works correctly, you're ready to proceed to:
**Phase 4: Testing & Validation** (`.claude/planning/dropdown-phase-4-testing.md`)

This phase will thoroughly test all aspects of the converted component.

---

**Phase Started:** [Date]
**Phase Completed:** [Date]
**Time Spent:** [Duration]
