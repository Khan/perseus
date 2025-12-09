# Phase 2: Component Conversion
## Dropdown Widget Conversion - Core Conversion Phase

**Phase Status:** [ ] Not Started | [ ] In Progress | [ ] Complete
**Estimated Complexity:** Medium
**Dependencies:** Phase 1 Complete

---

## Overview

This is the core conversion phase where we transform the class component into a functional component. We'll convert the component structure, replace lifecycle methods with hooks, and convert instance methods to function-scoped handlers while maintaining all existing functionality.

**Key Principle:** Make the minimum changes necessary for conversion. Don't add features or optimize prematurely.

---

## Pre-Phase Checklist

Before starting this phase, ensure:
- [ ] Phase 1 is complete
- [ ] Git branch is active (`dropdown-functional-conversion`)
- [ ] Baseline tests pass
- [ ] Current behavior documented
- [ ] **withDependencies ref forwarding verified** (Phase 1 Task 1.7) - CRITICAL

---

## Tasks Checklist

### Task 2.1: Create Backup Reference (Optional)
**Status:** [ ] Complete

Create a reference copy of the original file for easy side-by-side comparison.

**Commands:**
```bash
# Create a backup copy
cp packages/perseus/src/widgets/dropdown/dropdown.tsx \
   .claude/planning/dropdown-original-backup.tsx
```

**Note:** This task is optional. **Prefer using `git diff` for comparisons** as it's more reliable and won't drift. The backup copy is only useful if you want a quick side-by-side reference without switching to git commands.

**Alternative (Recommended):**
```bash
# View original at any time with git
git show HEAD:packages/perseus/src/widgets/dropdown/dropdown.tsx

# Or compare your changes
git diff packages/perseus/src/widgets/dropdown/dropdown.tsx
```

**Success Criteria:**
- Backup file created (optional)
- OR comfortable using git diff for comparisons

---

### Task 2.2: Update Imports
**Status:** [ ] Complete

Add new React imports needed for functional component with hooks.

**Current Imports (Lines 1-21):**
```typescript
import * as React from "react";
import ReactDOM from "react-dom";
// ... other imports
```

**Updated Imports:**
```typescript
import {
    useContext,
    useEffect,
    useRef,
    forwardRef,
    useImperativeHandle,
} from "react";
import ReactDOM from "react-dom"; // Keep only if focus still uses findDOMNode
// ... other imports remain the same
```

**Changes:**
1. Add hooks: `useContext`, `useEffect`, `useRef`
2. Add ref helpers: `forwardRef`, `useImperativeHandle`
3. **Keep `ReactDOM` import only if still used** - If you keep the findDOMNode-based focus in this phase, the import stays. If you switch to a ref-based placeholder focus, drop the import to avoid lint errors.

**IMPORTANT:** Avoid unused imports. If Task 2.7 switches to a placeholder ref-based focus, remove ReactDOM here; otherwise keep it until Phase 3 replaces the focus path.

**File Location:** `packages/perseus/src/widgets/dropdown/dropdown.tsx:1-21`

**Success Criteria:**
- New imports added
- ReactDOM import kept
- No linting errors

---

### Task 2.3: Define Widget Interface Type
**Status:** [ ] Complete

Create a type for the Widget interface methods that will be exposed via ref.

**Add after imports (around line 23):**
```typescript
// Widget interface methods exposed via ref
type WidgetHandle = {
    focus: () => boolean;
    getPromptJSON: () => string;
    getSerializedState: () => any;
};
```

**Rationale:**
- TypeScript needs to know what methods `useImperativeHandle` exposes
- This matches the Widget interface requirements
- Will be used with `forwardRef<WidgetHandle, Props>`

**Success Criteria:**
- Type defined
- No TypeScript errors
- Matches Widget interface

---

### Task 2.4: Convert Component Declaration
**Status:** [ ] Complete

Convert the class component declaration to a functional component with forwardRef.

**Current Code (Lines 39-48):**
```typescript
class Dropdown extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;

    static defaultProps: DefaultProps = {
        choices: [],
        placeholder: "",
        apiOptions: ApiOptions.defaults,
        userInput: {value: 0},
    };
```

**New Code:**
```typescript
const Dropdown = forwardRef<WidgetHandle, Props>((props, ref) => {
    // Get context with hook instead of static contextType
    const context = useContext(PerseusI18nContext);

    // Destructure props with defaults
    const {
        choices = [],
        placeholder = "",
        apiOptions = ApiOptions.defaults,
        userInput = {value: 0},
        dependencies,
        visibleLabel,
        ariaLabel,
        widgetId,
        onChange,
        onFocus,
        onBlur,
        findExternalWidgets,
        findWidgets,
        linterContext,
        keypadElement,
        reviewMode,
        static: isStatic,
    } = props;
```

**Key Changes:**
1. `class Dropdown` → `const Dropdown = forwardRef<WidgetHandle, Props>`
2. `static contextType` → `const context = useContext(PerseusI18nContext)`
3. `static defaultProps` → default parameter values in destructuring
4. Destructure all props for easier access (removes `this.props.` everywhere)

**File Location:** `packages/perseus/src/widgets/dropdown/dropdown.tsx:39-48`

**Success Criteria:**
- Component is a functional component
- Uses forwardRef for Widget interface
- Context accessed with useContext
- Props destructured with defaults
- No TypeScript errors

---

### Task 2.5: Convert componentDidMount to useEffect
**Status:** [ ] Complete

Convert the componentDidMount lifecycle method to a useEffect hook.

**Current Code (Lines 50-59):**
```typescript
componentDidMount(): void {
    this.props.dependencies.analytics.onAnalyticsEvent({
        type: "perseus:widget:rendered:ti",
        payload: {
            widgetSubType: "null",
            widgetType: "dropdown",
            widgetId: this.props.widgetId,
        },
    });
}
```

**New Code (place after context declaration):**
```typescript
// Fire analytics event on mount
// We intentionally use an empty dependency array here because this analytics
// event should only fire once when the component mounts, not when props change.
// eslint-disable-next-line react-hooks/exhaustive-deps
useEffect(() => {
    dependencies.analytics.onAnalyticsEvent({
        type: "perseus:widget:rendered:ti",
        payload: {
            widgetSubType: "null",
            widgetType: "dropdown",
            widgetId: widgetId,
        },
    });
}, []); // Empty dependency array = run once on mount
```

**Key Changes:**
1. `componentDidMount()` → `useEffect(() => { ... }, [])`
2. `this.props.dependencies` → `dependencies` (from destructuring)
3. `this.props.widgetId` → `widgetId` (from destructuring)
4. Empty dependency array means this runs once on mount
5. **Add eslint-disable comment** - ESLint will warn about missing deps (`dependencies`, `widgetId`), but we intentionally want this to run only once on mount, not when those values change

**Rationale for Empty Deps:**
Analytics "widget rendered" events should fire exactly once per mount. If we included `dependencies.analytics` or `widgetId` in the deps array, the event would fire again if those props changed, resulting in duplicate/incorrect analytics data.

**File Location:** `packages/perseus/src/widgets/dropdown/dropdown.tsx:50-59`

**Success Criteria:**
- useEffect runs only on mount
- Analytics event fires with same payload
- ESLint warning suppressed with justification

---

### Task 2.6: Convert Instance Methods to Functions
**Status:** [ ] Complete

Convert the instance methods (_handleChangeEvent, _handleChange, getPromptJSON) to function-scoped handlers.

**Current Code (Lines 70-83):**
```typescript
_handleChangeEvent(e: React.ChangeEvent<HTMLSelectElement>): void {
    this._handleChange(parseInt(e.target.value));
}

_handleChange(value: number): void {
    this.props.onChange({value});
    this.props.onFocus?.();
}

getPromptJSON(): string {
    return getPromptJSON(this.props);
}
```

**New Code (place after useEffect):**
```typescript
// Handler for change events from the dropdown
const handleChangeEvent = (e: React.ChangeEvent<HTMLSelectElement>): void => {
    handleChange(parseInt(e.target.value));
};

const handleChange = (value: number): void => {
    onChange({value});
    onFocus?.();
};

const getPromptJSONValue = (): string => {
    return getPromptJSON(props);
};
```

**Key Changes:**
1. `_handleChangeEvent` → `handleChangeEvent` (remove underscore prefix)
2. `_handleChange` → `handleChange` (remove underscore prefix)
3. `getPromptJSON` → `getPromptJSONValue` (avoid name conflict with imported function)
4. `this.props.X` → `X` (from destructuring) or `props` for getPromptJSON
5. Methods are now const arrow functions

**Note:** We're keeping these as separate functions for clarity, even though they could be inlined.

**File Location:** `packages/perseus/src/widgets/dropdown/dropdown.tsx:70-83`

**Success Criteria:**
- Functions work identically to methods
- No `this` references
- Proper TypeScript types
- ESLint happy with function definitions

---

### Task 2.7: Implement Widget Interface with useImperativeHandle
**Status:** [ ] Complete

Expose Widget interface methods via useImperativeHandle for parent components to call.

**Current Code (Lines 61-68, 85-96):**
```typescript
focus(): boolean {
    // TODO(LP-10797): This focus() call doesn't do anything...
    const node = ReactDOM.findDOMNode(this);
    if (node instanceof HTMLElement) {
        node.focus();
        return true;
    }
    return false;
}

getSerializedState(): any {
    // ... deprecated method
}
```

**New Code (place after handler functions):**
```typescript
// Create a ref to the component root for focus() method
// This will be replaced with proper ref forwarding in Phase 3
const rootRef = useRef<HTMLDivElement>(null);

// Expose Widget interface methods via ref
useImperativeHandle(ref, () => ({
    focus: (): boolean => {
        // TODO(LP-10797): This focus() call doesn't do anything because our
        // root element is a <div> and that cannot be focused without a
        // tabIndex. This will be fixed in Phase 3.
        // For now, maintain existing (broken) behavior to avoid regression
        // Choose one:
        // 1) Keep findDOMNode parity (leave ReactDOM import):
        // const node = ReactDOM.findDOMNode(rootRef.current);
        // 2) Or use the rootRef directly and drop ReactDOM:
        const node = rootRef.current;
        if (node instanceof HTMLElement) {
            node.focus();
            return true; // Return true like the original, even though focus doesn't work
        }
        return false;
    },
    getPromptJSON: (): string => {
        return getPromptJSONValue();
    },
    getSerializedState: (): any => {
        /**
         * @deprecated and likely very broken API
         * [LEMS-3185] do not trust serializedState
         */
        return {
            value: userInput.value,
        };
    },
}));
```

**IMPORTANT:** Don't forget to attach `rootRef` to the root View component in the render section:
```typescript
<View
    ref={rootRef}  // Add this line
    style={{position: "relative"}}
    onClick={(e) => { e.stopPropagation(); }}
    onTouchStart={(e) => { e.stopPropagation(); }}
>
```

**Key Changes:**
1. Methods exposed through `useImperativeHandle` instead of class methods
2. **Maintain original focus() behavior** - Create rootRef and use it instead of ReactDOM.findDOMNode
3. **Return true on success** - Keeps same return value as original (even though focus doesn't work)
4. getSerializedState kept for compatibility (still deprecated)
5. TODO comments preserved

**Why This Approach:**
- Avoids functionality regression by keeping same behavior as class component
- Tests or consumers expecting `true` return value won't break
- Still broken, but broken in the same way as before
- Phase 3 will fix it properly with ref forwarding to SingleSelect

**File Location:** Various lines in original class

**Success Criteria:**
- Widget interface methods callable from parent
- Type errors resolved
- Deprecated warnings preserved
- TODO comments maintained

---

### Task 2.8: Convert Render Method to Return Statement
**Status:** [ ] Complete

Convert the render() method to a direct return statement (or JSX assigned to a variable).

**Current Code (Lines 98-167):**
```typescript
render(): React.ReactElement {
    const children = [
        <OptionItem
            key={0}
            value={0}
            disabled={true}
            label={this.props.placeholder}
        />,
        ...this.props.choices.map((choice, i) => (
            <OptionItem
                key={i + 1}
                value={i + 1}
                label={
                    <Renderer
                        content={choice.content}
                        inline={true}
                        linterContext={this.props.linterContext}
                        findWidgets={this.props.findWidgets}
                        findExternalWidgets={
                            this.props.findExternalWidgets
                        }
                        dependencies={this.props.dependencies}
                    />
                }
            />
        )),
    ];

    return (
        <Id>
            {(uniqueId) => (
                <View
                    style={{position: "relative"}}
                    onClick={(e) => {
                        e.stopPropagation();
                    }}
                    onTouchStart={(e) => {
                        e.stopPropagation();
                    }}
                >
                    {this.props.visibleLabel && (
                        <LabelLarge
                            htmlFor={uniqueId}
                            style={{display: "block"}}
                        >
                            {this.props.visibleLabel}
                        </LabelLarge>
                    )}
                    <SingleSelect
                        id={uniqueId}
                        disabled={
                            this.props.apiOptions.readOnly ||
                            this.props.static
                        }
                        onChange={this._handleChangeEvent}
                        placeholder=""
                        aria-label={
                            this.props.ariaLabel ||
                            this.props.visibleLabel ||
                            this.context.strings.selectAnAnswer
                        }
                        selectedValue={this.props.userInput.value}
                    >
                        {children}
                    </SingleSelect>
                </View>
            )}
        </Id>
    );
}
```

**New Code (place at end of component, before closing brace):**
```typescript
// Build dropdown options
const children = [
    <OptionItem
        key={0}
        value={0}
        disabled={true}
        label={placeholder}
    />,
    ...choices.map((choice, i) => (
        <OptionItem
            key={i + 1}
            value={i + 1}
            label={
                <Renderer
                    content={choice.content}
                    inline={true}
                    linterContext={linterContext}
                    findWidgets={findWidgets}
                    findExternalWidgets={findExternalWidgets}
                    dependencies={dependencies}
                />
            }
        />
    )),
];

// Render dropdown UI
return (
    <Id>
        {(uniqueId) => (
            <View
                style={{position: "relative"}}
                onClick={(e) => {
                    e.stopPropagation();
                }}
                onTouchStart={(e) => {
                    e.stopPropagation();
                }}
            >
                {visibleLabel && (
                    <LabelLarge
                        htmlFor={uniqueId}
                        style={{display: "block"}}
                    >
                        {visibleLabel}
                    </LabelLarge>
                )}
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
            </View>
        )}
    </Id>
);
```

**Key Changes:**
1. `render(): React.ReactElement {` → direct `return` statement
2. All `this.props.X` → `X` (from destructuring)
3. `this.props.static` → `isStatic` (static is a reserved word)
4. `this._handleChangeEvent` → `handleChangeEvent`
5. `this.context.strings` → `context.strings`
6. Logic and structure remain identical

**File Location:** `packages/perseus/src/widgets/dropdown/dropdown.tsx:98-167`

**Success Criteria:**
- JSX renders identically
- All props referenced correctly
- No `this` references remain
- Event handlers wired correctly
- TypeScript types correct

---

### Task 2.9: Add Closing Brace and DisplayName
**Status:** [ ] Complete

Close the forwardRef function and add a displayName for debugging.

**Add at the end:**
```typescript
}); // Close forwardRef

// Set display name for debugging
Dropdown.displayName = "Dropdown";
```

**Success Criteria:**
- Component properly closed
- DisplayName set for React DevTools

---

### Task 2.10: Verify Export Statement
**Status:** [ ] Complete

Ensure the export wrapping with `withDependencies` HOC still works correctly.

**Current Export (Lines 169-end):**
```typescript
const WrappedDropdown = withDependencies(Dropdown);

export default {
    name: "dropdown",
    displayName: "Drop down",
    widget: WrappedDropdown,
    getStartUserInput,
    getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof WrappedDropdown>;
```

**This should remain the same!** The `withDependencies` HOC should work with functional components.

**Verify:**
- Export structure unchanged
- withDependencies wraps the functional component
- All helper functions exported
- TypeScript `satisfies` check passes

**File Location:** `packages/perseus/src/widgets/dropdown/dropdown.tsx:169-end`

**Success Criteria:**
- Export works correctly
- No TypeScript errors
- Widget registry can find the widget

---

### Task 2.11: Initial Test Run
**Status:** [ ] Complete

Run tests to see if the basic conversion works.

**Commands:**
```bash
# Type check first
pnpm tsc --noEmit

# Run dropdown tests
pnpm test packages/perseus/src/widgets/dropdown
```

**Expected Results:**
- Type checking passes
- Most or all tests pass
- Any failures are minor and documented

**If Tests Fail:**
Document each failure:
1. Test name
2. Error message
3. Suspected cause
4. Fix applied

**Success Criteria:**
- TypeScript compiles without errors
- Majority of tests pass
- Any failures understood and documented

---

### Task 2.12: Fix Any Type Errors
**Status:** [ ] Complete

Address any TypeScript errors that arise from the conversion.

**Common Issues to Check:**

1. **Props type in getPromptJSON:**
   - May need to pass full props object or restructure

2. **Ref type forwarding:**
   - Ensure WidgetHandle type matches expectations

3. **Optional prop handling:**
   - Ensure optional props like `onFocus?.()` work correctly

4. **Static vs isStatic:**
   - Verify the rename doesn't cause issues

**Process:**
1. Run `pnpm tsc --noEmit`
2. Fix each error one by one
3. Re-run type checking
4. Document any non-obvious fixes

**Success Criteria:**
- No TypeScript errors
- All types resolve correctly
- Code compiles successfully

---

### Task 2.13: Run Linter
**Status:** [ ] Complete

Run ESLint to catch any code style or potential issues.

**Commands:**
```bash
# Run linter on dropdown file
pnpm lint packages/perseus/src/widgets/dropdown/dropdown.tsx

# Auto-fix if possible
pnpm lint --fix packages/perseus/src/widgets/dropdown/dropdown.tsx
```

**Common Issues:**
- Unused imports
- Missing dependencies in useEffect
- Prefer const over function declarations
- Spacing and formatting

**Success Criteria:**
- No ESLint errors
- No ESLint warnings
- Code follows project conventions

---

### Task 2.14: Final Test Run for Phase 2
**Status:** [ ] Complete

Run complete test suite one more time before moving to Phase 3.

**Commands:**
```bash
# Run all dropdown tests
pnpm test packages/perseus/src/widgets/dropdown

# Run with coverage to see what's tested
pnpm test packages/perseus/src/widgets/dropdown --coverage
```

**Verify:**
- All existing tests pass
- No new failures introduced
- Coverage remains similar to baseline

**Success Criteria:**
- All tests pass (same as baseline from Phase 1)
- No regressions
- Ready for Phase 3

---

## Phase Completion Checklist

Before moving to Phase 3, verify:

- [ ] All tasks (2.1 - 2.14) marked complete
- [ ] Component is a functional component with forwardRef
- [ ] All lifecycle methods converted to hooks
- [ ] All instance methods converted to functions
- [ ] Widget interface exposed via useImperativeHandle
- [ ] All tests pass
- [ ] No TypeScript errors
- [ ] No ESLint errors
- [ ] Code compiles and runs

---

## Conversion Summary

**Lines of Code Changed:** ~[estimate]
**New React Features Used:**
- useContext
- useEffect
- forwardRef
- useImperativeHandle

**Removed:**
- Class component structure
- static contextType
- static defaultProps
- componentDidMount lifecycle
- this references
- ReactDOM.findDOMNode (scheduled for Phase 3 when focus is fixed)

---

## Notes & Issues Encountered

**Document any challenges or learnings:**

-
-
-

---

## Ready for Phase 3?

If all tasks are complete and tests pass, you're ready to proceed to:
**Phase 3: Focus Management Improvement** (`.claude/planning/dropdown-phase-3-focus-management.md`)

This phase will fix the broken focus() implementation and properly forward refs to the SingleSelect component.

---

**Phase Started:** [Date]
**Phase Completed:** [Date]
**Time Spent:** [Duration]
