# Widget Class-to-Functional Component Conversion Guide

This guide provides comprehensive guidelines for converting Perseus widgets from React class components to functional components with hooks. It's based on the successful dropdown widget conversion (tb/LEMS-378/dropdown-conversion).

## Executive Summary

Widget conversions from class to functional components should:
- Fix issues (like broken focus) while maintaining backward compatibility
- Use the `forwardRef` + `useImperativeHandle` pattern for Widget interface
- Pass all existing tests without modification (gold standard)
- Follow the 5-phase conversion process outlined below

---

## Table of Contents

1. [Key Conversion Mappings](#key-conversion-mappings)
2. [5-Phase Conversion Process](#5-phase-conversion-process)
3. [Common Pitfalls & Solutions](#common-pitfalls--solutions)
4. [Testing Considerations](#testing-considerations)
5. [Patterns & Best Practices](#patterns--best-practices)
6. [Conversion Checklist Template](#conversion-checklist-template)

---

## Key Conversion Mappings

| Class Component | Functional Component | Pattern |
|-----------------|----------------------|---------|
| `static contextType` | `useContext()` hook | Access context directly in function body |
| `static defaultProps` | Destructuring with defaults | `const { prop = default } = props` |
| `componentDidMount()` | `useEffect(() => {}, [])` | Empty dependency array = run once on mount |
| Instance methods | Function-scoped handlers | `const handleChange = (...)` |
| `this.props` | Destructured props or parameter | Direct variable access |
| `this.context` | `context` variable | From useContext hook |
| Widget interface methods | `useImperativeHandle()` hook | Expose methods via ref |
| `render()` method | Direct `return` statement | JSX at end of component |

---

## 5-Phase Conversion Process

### Phase 1: Preparation (Critical Foundation)

#### 1.1 Verify withDependencies HOC forwards refs
```bash
# Check if HOC wrapping the widget uses forwardRef internally
grep -A 5 "withDependencies" packages/perseus/src/components/with-dependencies.tsx
```
- **Critical:** If HOC doesn't forward refs, your entire approach will fail
- Expected: Should see `forwardRef` and `ref={ref}` in implementation

#### 1.2 Document current behavior baseline
- Run existing tests and note passing count and coverage
- Take screenshots of Storybook stories if converting UI
- Document all instance methods and their purposes
- Check for lifecycle methods beyond componentDidMount (mounting, updates, unmounting)

#### 1.3 Verify the Widget interface requirements
- Identify all public methods (Widget interface)
- Identify static methods and defaultProps
- List all instance properties and how they're used
- Check if context is accessed and how

#### 1.4 Research similar conversions
- Check if other widgets in the codebase use functional components with `forwardRef`
- Look for `useImperativeHandle` patterns
- Document reusable patterns found

---

### Phase 2: Core Conversion

#### 2.1 Update imports strategically
```typescript
// OLD: class-based React
import * as React from "react";
import ReactDOM from "react-dom";

// NEW: hooks-based React
import React, {
    forwardRef,
    useContext,
    useEffect,
    useRef,
    useImperativeHandle,
    // ... other hooks used
} from "react";
// Remove ReactDOM if not using findDOMNode (will remove in Phase 3)
```

#### 2.2 Define WidgetHandle type
```typescript
type WidgetHandle = {
    focus: () => boolean;
    getPromptJSON: () => DropdownPromptJSON;
    getDOMNodeForPath: (path: FocusPath) => Element | null;
    getSerializedState: () => any;
    // ... any other Widget methods
};
```

#### 2.3 Convert component declaration
```typescript
// OLD
class Dropdown extends React.Component<Props> implements Widget {
    static contextType = PerseusI18nContext;
    declare context: React.ContextType<typeof PerseusI18nContext>;
    static defaultProps: DefaultProps = { ... };

// NEW
const Dropdown = forwardRef<WidgetHandle, Props>((props, ref) => {
    const context = useContext(PerseusI18nContext);
    const {
        choices = [],
        placeholder = "",
        apiOptions = ApiOptions.defaults,
        // ... destructure all props with defaults matching old defaultProps
    } = props;
```

#### 2.4 Convert lifecycle methods
```typescript
// OLD: componentDidMount
componentDidMount(): void {
    this.props.dependencies.analytics.onAnalyticsEvent({
        type: "perseus:widget:rendered:ti",
        payload: { widgetSubType: "null", widgetType: "dropdown", widgetId: this.props.widgetId },
    });
}

// NEW: useEffect with empty deps
useEffect(() => {
    dependencies.analytics.onAnalyticsEvent({
        type: "perseus:widget:rendered:ti",
        payload: { widgetSubType: "null", widgetType: "dropdown", widgetId },
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []); // Empty array = run only once on mount
```

**Important:** If lifecycle does side effects that depend on props that might change, you may need:
- `useEffect` for initialization-only (empty deps) - mount phase
- `useEffect` for prop changes (deps array) - update phase
- Return cleanup function for unmount

#### 2.5 Convert instance methods to functions
```typescript
// OLD
_handleChange: (arg1: number) => void = (selected) => {
    this.props.trackInteraction();
    this.props.handleUserInput({value: selected});
};

// NEW
const handleChange = (selected: number): void => {
    trackInteraction();
    handleUserInput({value: selected});
};
```

**Note:** Remove underscore prefix (it's a JavaScript convention for "private" in classes, not needed in functions).

#### 2.6 Implement Widget interface via useImperativeHandle
```typescript
const rootRef = useRef<HTMLDivElement>(null);

useImperativeHandle(ref, () => ({
    focus: (): boolean => {
        // Implementation (see Phase 3)
    },
    getPromptJSON: (): DropdownPromptJSON => {
        return _getPromptJSON(props);
    },
    getDOMNodeForPath: (path: FocusPath): Element | null => {
        if (path.length === 0) {
            return rootRef.current;
        }
        return null;
    },
    getSerializedState: (): any => {
        // Keep deprecated methods for backwards compatibility
    },
}));
```

#### 2.7 Convert render method to return statement
- Move `children` array calculation before return
- Replace all `this.props.X` with destructured variables
- Replace all `this.context.X` with `context.X`
- Add `ref={rootRef}` to root component

#### 2.8 Add displayName for debugging
```typescript
Dropdown.displayName = "Dropdown";
```

#### 2.9 Verify exports still work
```typescript
const WrappedDropdown = withDependencies(Dropdown);

export default {
    name: "dropdown",
    displayName: "Drop down",
    widget: WrappedDropdown,
    // ... helper functions
} satisfies WidgetExports<typeof WrappedDropdown>;
```

---

### Phase 3: Focus Management Improvements

#### 3.1 Research child component ref support
- Check if child components (like SingleSelect) accept refs
- If no direct ref support, plan querySelector fallback
- Test what element type is actually focusable (button, div, etc.)

#### 3.2 Implement better focus handling

**Pattern 1: Child accepts refs directly**
```typescript
const selectRef = useRef<HTMLSelectElement>(null);

focus: (): boolean => {
    if (selectRef.current) {
        selectRef.current.focus();
        return true;
    }
    return false;
}

// In JSX:
<SingleSelect ref={selectRef} ... />
```

**Pattern 2: Child doesn't accept refs (use querySelector)**
```typescript
const rootRef = useRef<HTMLDivElement>(null);

focus: (): boolean => {
    // Don't attempt to focus when interactions are disabled
    if (apiOptions.readOnly || isStatic) {
        return false;
    }

    if (!rootRef.current) {
        return false;
    }

    // Find the actual focusable element
    const button = rootRef.current.querySelector("[role='combobox']");
    if (!(button instanceof HTMLElement)) {
        return false;
    }

    // Skip focusing if the button is disabled
    if (
        (button instanceof HTMLButtonElement && button.disabled) ||
        button.getAttribute("aria-disabled") === "true"
    ) {
        return false;
    }

    const previouslyFocused = document.activeElement;
    button.focus();
    // Return true only when focus actually moved onto the element
    return (
        document.activeElement === button &&
        previouslyFocused !== button
    );
}

// In JSX:
<View ref={rootRef}>
    <SingleSelect role="combobox" ... />
</View>
```

#### 3.3 Add edge case handling
- ✅ Check if element is disabled (both `disabled` attribute and `aria-disabled`)
- ✅ Check if widget is in read-only or static mode
- ✅ Return accurate boolean (only true if focus actually moved)

#### 3.4 Update tests to verify actual behavior
```typescript
it("should focus correctly", async () => {
    const {renderer} = renderQuestion(testData);
    const result = renderer.focus();

    expect(result).toBe(true);
    // Verify actual DOM focus, not just return value
    const button = screen.getByRole("combobox");
    expect(button).toHaveFocus();
});
```

---

### Phase 4: Comprehensive Testing

#### 4.1 Automated test updates
- Modify existing tests minimally (ideally not at all)
- Use widget generator functions: `generateDropdownWidget()`, `generateDropdownOptions()`
- Add tests for new edge cases (disabled state, read-only, aria-disabled)

**Example using generators:**
```typescript
const basicDropdown = generateTestPerseusRenderer({
    content: "[[☃ dropdown 1]]",
    widgets: {
        "dropdown 1": generateDropdownWidget({
            options: generateDropdownOptions({
                placeholder: "Choose an answer",
                choices: [
                    {content: "True", correct: true},
                    {content: "False", correct: false},
                ],
            }),
        }),
    },
});
```

#### 4.2 Manual testing checklist
- [ ] Storybook stories render correctly
- [ ] Keyboard navigation works (Tab, Arrow keys, Enter, Escape)
- [ ] Mobile/touch interactions work
- [ ] Analytics events fire
- [ ] Math rendering works (if widget supports it)
- [ ] Accessibility with screen reader
- [ ] Focus behavior in different states

#### 4.3 Accessibility verification
- Test with keyboard only
- Test with screen reader (VoiceOver, NVDA)
- Verify ARIA labels and role announcements
- Check focus indicators are visible

---

### Phase 5: Final Review & Cleanup

#### 5.1 Code review checklist
- [ ] No `this` references remain
- [ ] No ReactDOM.findDOMNode usage (unless intentional)
- [ ] All hooks have correct dependency arrays
- [ ] No unused imports
- [ ] Comments updated (removed deprecated TODOs that were fixed)

#### 5.2 Run quality checks
```bash
pnpm lint --fix packages/perseus/src/widgets/[widget-name]
pnpm prettier packages/perseus/src/widgets/[widget-name] --write
pnpm tsc --noEmit
pnpm test packages/perseus/src/widgets/[widget-name]
```

#### 5.3 Snapshot updates
- Only update snapshots if component structure changed
- Don't update if only CSS class hashes changed (merge from main may cause this)

#### 5.4 Commit message format
```
Convert [widget name] widget to functional component

Convert the [widget] widget from a React class component to a functional
component using hooks, improving code maintainability and [fixing specific issues].

Changes:
- Convert class component to functional component with forwardRef
- Replace static contextType with useContext hook
- Replace componentDidMount with useEffect hook
- Replace instance methods with function-scoped handlers
- Expose Widget interface methods via useImperativeHandle
- Fix [specific issue if applicable, e.g., LP-10797]

Testing:
- All existing tests pass without modification
- Verified [specific interactions]

Resolves: [ticket number]
```

---

## Common Pitfalls & Solutions

### 1. Ref Forwarding Issues

**Pitfall:** Assuming child components forward refs automatically

**Why it fails:** Not all components support refs; Wonder Blocks components often don't

**Solution:** Test with actual component first; if it fails, use querySelector pattern

```typescript
// This likely won't work
const childRef = useRef<HTMLElement>(null);
<SingleSelect ref={childRef} />  // TypeScript error

// This will work
const rootRef = useRef<HTMLDivElement>(null);
<View ref={rootRef}>
    <SingleSelect />  // Find it via querySelector
</View>
```

### 2. Dependency Array Mistakes

**Pitfall:** Adding variables to useEffect deps array when you don't want the effect to re-run

**Example:** Analytics event that should fire only once on mount, but you add `dependencies.analytics` to the deps array

**Result:** Event fires every time that dependency changes (usually on every render)

**Solution:** Use empty deps array `[]` and suppress ESLint warning with comment
```typescript
useEffect(() => {
    // This should only run once on mount
    analytics.onEvent(...);
    // eslint-disable-next-line react-hooks/exhaustive-deps
}, []);
```

### 3. Focus Method Return Value Accuracy

**Pitfall:** Always returning `true` from focus() even when focus fails

**Why it matters:** Parent code uses the boolean to know if focus succeeded

**Solution:** Check actual DOM state before returning
```typescript
const previouslyFocused = document.activeElement;
button.focus();
return (
    document.activeElement === button &&
    previouslyFocused !== button
);
```

### 4. Default Props Handling

**Pitfall:** Forgetting to set defaults when destructuring

**Impact:** Undefined values cause bugs

**Solution:** Use destructuring defaults matching old `defaultProps`
```typescript
// OLD
static defaultProps = {
    choices: [],
    placeholder: "",
};

// NEW
const { choices = [], placeholder = "" } = props;
```

### 5. Missing getDOMNodeForPath

**Pitfall:** Not implementing getDOMNodeForPath method in Widget interface

**Why it matters:** Renderer uses findDOMNode as fallback, which doesn't work with functional components using useImperativeHandle

**Solution:** Add getDOMNodeForPath to WidgetHandle type
```typescript
getDOMNodeForPath: (path: FocusPath): Element | null => {
    if (path.length === 0) {
        return rootRef.current;  // For simple widgets
    }
    return null;
}
```

---

## Testing Considerations

### Gold Standard: No Test File Changes Required

**Key insight:** Tests should NOT need modification when converting from class to functional. This is the gold standard.

Why this works:
- Tests interact through the public Widget interface
- Widget interface is unchanged (same methods, same return types)
- Implementation is internal to component

### New Test Pattern: Widget Generators

**Old pattern (manual test data):**
```typescript
const basicDropdown = {
    choices: [{content: "Option 1", correct: true}],
    placeholder: "Select...",
    // ... all properties
};
```

**New pattern (generators):**
```typescript
const basicDropdown = generateTestPerseusRenderer({
    content: "[[☃ dropdown 1]]",
    widgets: {
        "dropdown 1": generateDropdownWidget({
            options: generateDropdownOptions({
                placeholder: "Choose an answer",
                choices: [
                    {content: "True", correct: true},
                    {content: "False", correct: false},
                ],
            }),
        }),
    },
});
```

**Benefits:**
- Type-safe
- Self-documenting
- Automatically sets all required properties with sensible defaults
- Easier to read and maintain

### Essential Test Coverage for Focus

1. Basic focus works - returns true and moves focus
2. Focus with read-only - returns false, no focus
3. Focus with static - returns false, no focus
4. Focus with aria-disabled - returns false, no focus
5. Keyboard navigation - Tab, arrows work
6. Screen reader - announcements correct

---

## Patterns & Best Practices

### Functional Component Structure in Perseus

```typescript
// 1. Imports
import React, {
    forwardRef,
    useContext,
    useEffect,
    useImperativeHandle,
    useRef
} from "react";

// 2. Type definitions
type WidgetHandle = { /* methods */ };
type Props = WidgetProps<...>;

// 3. Component definition
const MyWidget = forwardRef<WidgetHandle, Props>((props, ref) => {
    // 3a. Context hooks
    const context = useContext(PerseusI18nContext);

    // 3b. Prop destructuring
    const { prop1 = default1, prop2 = default2, ... } = props;

    // 3c. Refs
    const rootRef = useRef<HTMLDivElement>(null);

    // 3d. Effects
    useEffect(() => { /* mount */ }, []);
    useEffect(() => { /* updates */ }, [dependencies]);

    // 3e. Event handlers
    const handleChange = (value) => { ... };
    const handleClick = () => { ... };

    // 3f. Imperative handle
    useImperativeHandle(ref, () => ({ /* methods */ }));

    // 3g. Computed values
    const children = [ /* arrays */ ];

    // 3h. Render
    return ( /* JSX */ );
});

// 4. Display name
MyWidget.displayName = "MyWidget";

// 5. Helper functions
function helperFunction() { ... }

// 6. Export with HOC wrapper
const Wrapped = withDependencies(MyWidget);
export default { /* exports */ } satisfies WidgetExports<typeof Wrapped>;
```

### What NOT to Do

- ❌ Use `ReactDOM.findDOMNode()` - deprecated in React 18+
- ❌ Always return `true` from focus() - check actual focus state
- ❌ Skip getDOMNodeForPath method - causes renderer compatibility issues
- ❌ Modify test files when not necessary - indicates refactoring issue
- ❌ Add all props to useEffect deps array - causes unnecessary re-runs
- ❌ Use `any` types (except for deprecated methods) - defeats TypeScript benefits
- ❌ Forget disabled state checks in focus() - breaks accessibility
- ❌ Assume child components forward refs - test first, use querySelector fallback

### What TO Do

- ✅ Use `forwardRef` for Widget interface compatibility
- ✅ Use `useImperativeHandle` to expose Widget methods
- ✅ Verify actual DOM state before returning boolean
- ✅ Check disabled/aria-disabled attributes
- ✅ Use querySelector pattern when child doesn't support refs
- ✅ Keep tests unchanged (interface compatibility)
- ✅ Use widget generators in tests
- ✅ Destructure props with defaults at component top
- ✅ Add displayName for React DevTools debugging
- ✅ Document reason for eslint-disable comments

---

## Conversion Checklist Template

### Phase 1: Preparation
- [ ] Verify withDependencies HOC forwards refs
- [ ] Run baseline tests and note counts
- [ ] Document all methods (public and private)
- [ ] Check lifecycle methods beyond mount
- [ ] Document static properties and defaults

### Phase 2: Core Conversion
- [ ] Update imports (add hooks, remove what's not needed)
- [ ] Define WidgetHandle type
- [ ] Convert class declaration to forwardRef
- [ ] Add useContext for any contextType usage
- [ ] Destructure props with defaults
- [ ] Convert all lifecycle methods to hooks
- [ ] Convert instance methods to functions
- [ ] Implement useImperativeHandle with Widget methods
- [ ] Convert render to return statement
- [ ] Add displayName
- [ ] Verify exports work

### Phase 3: Focus/DOM Improvements
- [ ] Test if child components support refs
- [ ] Implement focus() with proper checks
- [ ] Add getDOMNodeForPath to WidgetHandle
- [ ] Handle disabled states
- [ ] Return accurate focus success boolean

### Phase 4: Testing
- [ ] Run existing tests (should pass unchanged)
- [ ] Update tests if edge cases found
- [ ] Add focus state verification tests
- [ ] Manual Storybook testing
- [ ] Keyboard navigation testing
- [ ] Accessibility testing

### Phase 5: Cleanup
- [ ] ESLint --fix
- [ ] Prettier formatting
- [ ] TypeScript check
- [ ] All tests pass
- [ ] Review diff for unintended changes
- [ ] Update snapshots if needed
- [ ] Create git commit

---

## Conclusion

The dropdown widget conversion demonstrates that class-to-functional conversions are straightforward when:

1. **Component structure is simple** - No local state, minimal lifecycle methods
2. **Careful attention to Widget interface** - Use forwardRef + useImperativeHandle
3. **Proper focus management** - querySelector pattern when refs aren't supported
4. **Test-driven approach** - Verify behavior through tests, not assumptions
5. **Incremental testing** - Test after each phase, not just at the end

The conversion also fixed LP-10797 (broken focus) as a bonus improvement, demonstrating that modernizing code often uncovers and fixes previously intractable bugs.

**Use this as the template for converting the remaining class component widgets in Perseus.**

---

*Based on the dropdown widget conversion (tb/LEMS-378/dropdown-conversion)*
*Last updated: 2025-12-11*