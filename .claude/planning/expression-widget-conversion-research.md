# Expression Widget Conversion Research

**Research Date:** 2025-12-18
**Branch:** tb/LEMS-3804/expression-conversion-2
**Researchers:** Claude Sonnet 4.5 (Subagent: Explore)

## Executive Summary

This document captures the research conducted to plan the conversion of the Expression widget from a class component to a functional component. It includes analysis of the current implementation, investigation into whether KeypadInput and MathInput should be converted first, and lessons learned from previous conversion attempts.

## Research Questions

1. What is the current structure of the Expression widget?
2. What are the key technical challenges for conversion?
3. What type issues did previous attempts encounter?
4. Should we convert KeypadInput and MathInput first?
5. What patterns from successful conversions should we follow?

## Current Expression Widget Analysis

### File Structure

**Main Widget:** `/packages/perseus/src/widgets/expression/expression.tsx`
- **Size:** 375 lines
- **Type:** Class component implementing Widget interface
- **Context:** Uses PerseusI18nContext via static contextType

### Component Architecture

**Class Declaration (line 85):**
```typescript
export class Expression extends React.Component<Props> implements Widget
```

**Props Type Structure:**
```typescript
type ExternalProps = WidgetProps<
    PerseusExpressionWidgetOptions,
    PerseusExpressionUserInput
>;

type Props = ExternalProps &
    Partial<DependenciesContext> &
    NonNullProps; // 8 props with NonNull requirement
```

### Instance Properties

1. **`_textareaId: string`**
   - Generated with timestamp: `"expression-input-" + Date.now()`
   - Used for accessibility (aria-labelledby)
   - **Issue:** Should use React 18's `useId()` instead

2. **`_isMounted: boolean`**
   - Anti-pattern to prevent state updates after unmount
   - Set in componentDidMount, checked in callbacks
   - **Issue:** Indicates stale closure problems in class component

### Lifecycle Methods

**componentDidMount (lines 105-130):**
```typescript
componentDidMount() {
    // 1. Fire analytics event
    this.props.analytics.onWidgetRendered({widgetType: "expression"});

    // 2. Set mounted flag (anti-pattern)
    this._isMounted = true;

    // 3. IMPERATIVE DOM MANIPULATION (problematic)
    if (this.refs.input) {
        const isMobile = this.props.apiOptions.customKeypad;
        const container = ReactDOM.findDOMNode(this.refs.input);
        const selector = isMobile ? ".mq-textarea > span" : "textarea";
        const inputElement = (container as Element).querySelector(selector);
        inputElement?.setAttribute("id", this._textareaId);
    }
}
```

**Key Issues:**
- Uses deprecated `ReactDOM.findDOMNode()`
- Uses deprecated string refs (`this.refs.input`)
- Imperative DOM manipulation
- ESLint warning: `@typescript-eslint/strict-boolean-expressions` (line 123)

**componentWillUnmount (lines 132-134):**
```typescript
componentWillUnmount() {
    this._isMounted = false;
}
```

### Widget Interface Implementation

The Expression widget implements 9 methods from the Widget interface:

| Method | Line | Purpose | Conversion Challenge |
|--------|------|---------|---------------------|
| `focus()` | 168-181 | Focus input, return success | Uses string ref, needs type narrowing |
| `focusInputPath()` | 183-195 | Focus at specific path | Delegates to `this.refs.input.focus()` |
| `blurInputPath()` | 197-206 | Blur at specific path | Delegates to `this.refs.input.blur()` |
| `insert()` | 208-216 | Insert keypad key | Delegates to `this.refs.input.insert()` |
| `getInputPaths()` | 218-220 | Return focus paths | Simple, returns `[[]]` |
| `getKeypadConfiguration()` | 222-224 | Get keypad config | Calls helper function |
| `getSerializedState()` | 226-229 | DEPRECATED | Simple, returns `{value}` |
| `getUserInput()` | 280-288 | Get normalized input | Calls normalize function |
| `getPromptJSON()` | 290-302 | Get AI prompt JSON | Calls helper function |

**TypeScript Error on line 170:**
```typescript
// @ts-expect-error - TS2339 - Property 'focus' does not exist on type 'ReactInstance'
if (this.refs.input.focus) {
```

This error exists because:
- String refs have type `ReactInstance | null`
- TypeScript doesn't know that KeypadInput/MathInput have `.focus()` methods
- Neither component exports their public API types

### Dual Rendering Paths

**Mobile Path (lines 238-262):**
```tsx
<KeypadInput
    ref="input"
    value={this.props.value}
    keypadElement={this.props.keypadElement}
    onChange={this._handleChange}
    onFocus={() => {
        this.props.keypadElement?.configure(
            keypadConfiguration,
            () => {
                if (this._isMounted) {
                    this._handleFocus();
                }
            },
        );
    }}
    onBlur={this._handleBlur}
/>
```

**Desktop Path (lines 264-299):**
```tsx
<MathInput
    ref="input"
    value={this.props.value}
    onChange={this.changeAndTrack}
    onFocus={this._handleFocus}
    onBlur={this._handleBlur}
    convertDotToTimes={this.props.times}
    buttonSets={this.props.buttonSets}
    onAnalyticsEvent={this.props.analytics.onAnalyticsEvent}
/>
```

**Key Observations:**
- Both use string refs (`ref="input"`)
- Mobile path has complex callback with closure over `this._isMounted`
- Both delegate to same handler methods
- Both are class components (not yet converted)

### Event Handlers

**Instance Methods:**
- `_handleFocus()` (lines 136-138) - Calls onFocus, trackInteraction
- `_handleChange()` (lines 140-157) - Normalizes value, calls onChange
- `_handleBlur()` (lines 159-161) - Calls onBlur
- `changeAndTrack()` (lines 163-166) - Desktop change handler

### Helper Functions

**Static/Pure Functions (keep as-is):**
- `keypadConfigurationForProps()` (lines 304-312) - Returns KeypadConfiguration
- `getPromptJSON()` (not shown, but referenced) - Returns WidgetPromptJSON
- `normalize()` (external import) - Normalizes math expression

### Count of `this` References

According to grep: **108 occurrences** of `this.props`, `this.state`, or `this.refs`

This is a moderate amount - manageable but requires careful conversion.

## Previous Conversion Attempts Analysis

### Git History

Branch: `tb/LEMS-3804/expression-conversion-2`

**Relevant Commits:**
- `84d06bece0` - Initial conversion attempt by Gemini
- `dbce1b92b2` - Fix TypeScript errors attempt
- `31d95e3c34` - Gemini fix for TS errors and add tests
- `432d5c2d41` - Latest conversion attempt

### Type Issues Identified

#### Issue 1: Mixed DependenciesContext Types

**Problem:**
```typescript
// Previous attempt mixed these two patterns
type Props = ExternalProps &
    Partial<React.ContextType<typeof DependenciesContext>> &  // Class pattern
    { analytics: PerseusDependenciesV2['analytics'] };        // Hook pattern
```

**Why it failed:**
- `DependenciesContext` is for class components using `static contextType`
- `useDependencies()` hook returns `PerseusDependenciesV2` type
- These types don't align - mixing them caused type conflicts
- The wrapper already uses `useDependencies()`, so component should only receive those types

**Solution:**
```typescript
type Props = ExternalProps & {
    analytics: PerseusAnalytics;  // Only what comes from useDependencies()
};
```

#### Issue 2: Complex Ref Type Wrappers

**Problem:**
Previous attempt tried to create interface types for KeypadInput:
```typescript
type Input = {
    focus: (cb?: () => void) => void;
    blur: () => void;
    insert: (val: any) => void;
};

type KeypadInputWithInterface = React.ComponentClass<any> & {
    prototype: Input;
};
```

**Why it failed:**
- KeypadInput is imported from `@khanacademy/math-input` package
- It doesn't export its public API interface
- Creating fake interfaces causes type mismatches when assigning refs
- TypeScript can't verify these methods actually exist

**Solution:**
```typescript
const inputRef = useRef<any>(null);
// Explicit comment explaining why `any` is necessary
// KeypadInput and MathInput are class components without exported ref types
```

#### Issue 3: Widget Interface Implementation

**Problem:**
The Widget interface has many optional methods with specific type signatures:
```typescript
interface Widget {
    focus?: () => boolean | {id: string; path: FocusPath};
    getDOMNodeForPath?: (path: FocusPath) => Element | Text | null;
    // ... 7 more optional methods
}
```

**Why it's challenging:**
- Must implement these through `useImperativeHandle`
- Return types must match exactly
- Some methods return union types
- Dependency array must include all referenced props

**Solution:**
Follow dropdown pattern with explicit dependency array and progressive type narrowing.

## Should We Convert KeypadInput and MathInput First?

### Investigation Results

#### KeypadInput Analysis

**Location:** `packages/math-input/src/components/input/math-input.tsx`

**Complexity:**
- **Size:** 1,080 lines (nearly 3x the Expression widget!)
- **Lifecycle Methods:**
  - `componentDidMount` (line 91)
  - `componentDidUpdate` (line 238)
  - `componentWillUnmount` (line 248)
- **Instance Properties:** ~10+ properties
  - `didTouchOutside`, `didScroll`, `mathField`, `dragListener`
  - `_isMounted`, `_mathContainer`, `_container`, `_root`, `_containerBounds`
- **Features:**
  - Cursor handle management (drag and drop)
  - Touch event handling
  - Scroll behavior
  - MathQuill field management
  - Complex state management

**Key Finding:** This is a VERY complex component with imperative APIs, drag listeners, and complex lifecycle logic.

#### MathInput Analysis

**Location:** `packages/perseus/src/components/math-input.tsx`

**Complexity:**
- **Size:** 579 lines
- **Structure:** TWO class components
  1. `InnerMathInput` (line 96) - Main implementation
  2. `MathInput` (line 439) - Wrapper for MathInputI18nContext
- **Lifecycle Methods:**
  - `componentDidMount`
  - `componentDidUpdate`
  - No `componentWillUnmount`
- **Features:**
  - Desktop keypad (DesktopKeypad component)
  - Popover management
  - MathQuill integration
  - Analytics tracking
  - State: focused, keypadOpen, cursorContext

**Usage Analysis:**
```bash
$ grep -r "from.*components/math-input" packages/perseus/src --include="*.tsx" | wc -l
3
```

Only **3 imports** of MathInput in the entire perseus package. One of them is the Expression widget.

### Decision Matrix

| Factor | Convert First | Convert Later |
|--------|---------------|---------------|
| **Lines of code** | 1,659 lines (KeypadInput + MathInput) | 375 lines (Expression only) |
| **Complexity** | High (drag handling, cursor, touch) | Moderate (imperative DOM, refs) |
| **Risk** | High (affects multiple consumers) | Low (isolated to one widget) |
| **Type benefit** | Proper ref types | Use `useRef<any>` workaround |
| **Effort** | ~4-5x more work | Baseline effort |
| **Dependencies** | Must understand MathQuill integration | Can work around with any |
| **Testing surface** | Large (math-input package + perseus) | Focused (expression tests only) |
| **Immediate value** | Marginal type improvement | Complete widget conversion |

### Recommendation: DON'T Convert KeypadInput/MathInput First

**Reasoning:**

1. **Effort vs. Benefit:** Converting 1,659 lines of complex code to save one `useRef<any>` is poor ROI

2. **Risk Profile:** KeypadInput has complex drag/touch handling that could easily break. Expression is more isolated.

3. **Acceptable Workaround:** Using `useRef<any>` is a documented pattern for interacting with unconverted class components. The conversion guide acknowledges this.

4. **Incremental Progress:** Convert Expression first, prove the pattern works, then decide if KeypadInput/MathInput are worth separate efforts.

5. **Low Usage:** MathInput only used in 3 places - doesn't justify priority.

6. **Type Safety:** We can still be fully type-safe in Expression. The `any` is contained to the ref, and we handle it carefully with optional chaining (`inputRef.current?.focus?.()`).

**Pattern to Use:**
```typescript
const inputRef = useRef<any>(null);
// Note: KeypadInput and MathInput are class components that don't export
// their ref types. Using `any` here is acceptable until those components
// are converted to functional components.

// Access methods safely with optional chaining
inputRef.current?.focus?.();
inputRef.current?.blur?.();
inputRef.current?.insert?.(value);
```

**Future Work:**
If multiple widgets need conversion and all use these components, revisit this decision. For now, keep it simple.

## Successful Conversion Patterns

### Primary Reference: Dropdown Widget

**Commit:** `bcdd6c49ec`
**File:** `/packages/perseus/src/widgets/dropdown/dropdown.tsx`

**Key Patterns Identified:**

1. **Named Function Expression (lines 86-88):**
```typescript
const Dropdown = forwardRef<Widget, Props>(
    function Dropdown(props, ref) {
```
**Why:** Better debugging in React DevTools (shows function name)

2. **Hook Usage:**
```typescript
const {strings} = usePerseusI18n();  // Replace static contextType
const selectId = useId();             // Replace manual ID generation
const rootRef = useRef<HTMLDivElement>(null);
```

3. **Body Destructuring (when you need props object):**
```typescript
function Dropdown(props, ref) {
    const { choices, placeholder, apiOptions, ... } = props;
    // Can still reference `props` for helper functions
}
```

4. **Focus Implementation with Type Narrowing (lines 97-120):**
```typescript
focus: (): boolean => {
    if (!rootRef.current) return false;

    const button = rootRef.current.querySelector("button");

    // Progressive type narrowing (CRITICAL)
    if (!(button instanceof HTMLElement)) return false;
    if (button instanceof HTMLButtonElement) {
        if (button.disabled) return false;
    }

    const previouslyFocused = document.activeElement;
    button.focus();

    // Verify focus succeeded
    return (
        document.activeElement === button &&
        previouslyFocused !== button
    );
}
```

**Why this pattern:**
- TypeScript requires progressive narrowing
- First check `instanceof HTMLElement` (base type)
- Then check `instanceof HTMLButtonElement` (for `.disabled` property)
- Verify focus actually succeeded (don't trust blindly)

5. **useImperativeHandle with Dependencies:**
```typescript
useImperativeHandle(
    ref,
    () => ({
        focus: (): boolean => { /* ... */ },
        // ... other methods
    }),
    [props, choices, apiOptions] // Include ALL referenced props/state
);
```

6. **Mount-only useEffect:**
```typescript
useEffect(() => {
    // Analytics or one-time setup
    analytics.onWidgetRendered({widgetType: "dropdown"});
}, []);
// Empty deps with comment:
// eslint-disable-next-line react-hooks/exhaustive-deps
```

### Secondary References

**Radio Widget:** `packages/perseus/src/widgets/radio/multiple-choice-widget.new.tsx`
- Shows `useOnMountEffect()` from wonder-blocks (alternative to empty deps useEffect)
- Demonstrates destructuring only needed props

**Numeric Input:** `packages/perseus/src/widgets/numeric-input/numeric-input.tsx`
- Shows how to wrap child component refs
- Uses `useRef<Focusable>` with proper type
- Demonstrates ref delegation in `useImperativeHandle`

## Type Safety Patterns from Conversion Guide

**Source:** `.cursor/claude-docs/widget-class-to-functional-conversion-guide.md`

### Modern Imports (Phase 2.1)

```typescript
import React, {
    forwardRef,
    useEffect,
    useId,        // NEW in React 18 - replaces <Id> component
    useRef,
    useImperativeHandle,
} from "react";
```

### Component Declaration (Phase 2.3 - 86% of widgets)

**Preferred Pattern:**
```typescript
const Widget = forwardRef<WidgetHandle, Props>(
    function Widget(props, ref) {
        // Implementation
    }
);
```

**Why:** Named function expression provides better debugging than arrow functions.

### Props Pattern (Phase 2.3 - split 43%/43%)

Two valid approaches:

**Body Destructuring (Expression should use this):**
```typescript
function Widget(props, ref) {
    const {value, onChange, apiOptions, ...rest} = props;
    // Can still pass `props` to helper functions
}
```

**When to use:** Need to pass entire `props` object to helper functions (like `getPromptJSON(props)`)

**Parameter Destructuring:**
```typescript
function Widget({value, onChange, apiOptions}: Props, ref) {
    // Cleaner but can't access props object
}
```

**When to use:** Simple components, don't need to pass props around

### Focus Management Pattern (Phase 3)

**querySelector approach when child doesn't forward refs:**
```typescript
const rootRef = useRef<HTMLDivElement>(null);

focus: (): boolean => {
    if (!rootRef.current) return false;

    const element = rootRef.current.querySelector("[data-test-id='input']");

    // Type narrowing - REQUIRED for TypeScript
    if (!(element instanceof HTMLElement)) return false;

    // Additional type-specific checks if needed
    if (element instanceof HTMLButtonElement && element.disabled) {
        return false;
    }

    const previouslyFocused = document.activeElement;
    element.focus();

    return (
        document.activeElement === element &&
        previouslyFocused !== element
    );
}
```

## Technical Recommendations

### 1. Use useId() Instead of Timestamp

**Current (Expression line ~88):**
```typescript
_textareaId = "expression-input-" + Date.now();
```

**Recommended:**
```typescript
const textareaId = useId();
```

**Benefits:**
- React 18+ built-in
- SSR-safe
- No collision risk
- No need to store in instance property

### 2. Replace _isMounted with useRef

**Current Pattern:**
```typescript
class Expression {
    _isMounted = false;

    componentDidMount() {
        this._isMounted = true;
    }

    componentWillUnmount() {
        this._isMounted = false;
    }

    someCallback() {
        if (this._isMounted) {
            this.setState({...});
        }
    }
}
```

**Recommended Pattern:**
```typescript
function Expression(props, ref) {
    const isMountedRef = useRef(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        };
    }, []);

    const someCallback = () => {
        if (isMountedRef.current) {
            // Safe to update state
        }
    };
}
```

**Why:** This is the functional component equivalent. Using cleanup functions is more idiomatic than flags, but flags work when needed.

### 3. Avoid ReactDOM.findDOMNode Completely

**Never:**
```typescript
const container = ReactDOM.findDOMNode(this.refs.input);
```

**Always:**
```typescript
const element = rootRef.current.querySelector(".selector");
```

**Why:** `findDOMNode` is deprecated and will be removed from React 18+. querySelector is more explicit and type-safe.

### 4. Progressive Type Narrowing

**Required Pattern:**
```typescript
// Step 1: Check element exists
if (!element) return false;

// Step 2: Check it's HTMLElement
if (!(element instanceof HTMLElement)) return false;

// Step 3: Check specific element type if needed
if (element instanceof HTMLButtonElement) {
    if (element.disabled) return false;
}

// Now safe to use element-specific methods
element.focus();
```

**Why:** TypeScript requires proof at each level. Can't skip steps.

### 5. Dependency Arrays

**Mount Only:**
```typescript
useEffect(() => {
    // One-time setup
}, []);
// eslint-disable-next-line react-hooks/exhaustive-deps
```

**With Dependencies:**
```typescript
useImperativeHandle(
    ref,
    () => ({ /* methods */ }),
    [props, value, apiOptions, specific, props] // Be explicit
);
```

**Why:** Empty array needs comment to explain intentional exhaustive-deps violation. Otherwise include all referenced values.

## Lessons Learned

### From Previous Attempts

1. **Don't Over-Engineer:** Creating wrapper types and complex type hierarchies caused more problems than they solved

2. **Trust the Guide:** The conversion guide patterns (especially dropdown) are battle-tested and work

3. **Simple is Better:** `useRef<any>` with a comment is better than complex type gymnastics

4. **Progressive Narrowing is Non-Negotiable:** TypeScript won't let you skip type checking steps

5. **Test Constantly:** Run tests after each phase to catch issues early

### From Successful Conversions

1. **Follow One Reference Closely:** Pick one widget (dropdown) and mirror its patterns exactly

2. **Named Functions Matter:** Better debugging is worth the extra syntax

3. **useId() is Better:** Don't generate IDs manually anymore

4. **Context → Hooks:** Always replace static contextType with hooks

5. **Tests Should Pass Unchanged:** If tests need updates, conversion might have bugs

## Open Questions

1. **Should we convert other widgets that use MathInput at the same time?**
   - Current answer: No, only Expression uses it in widgets

2. **What if we want to add new methods to KeypadInput/MathInput?**
   - Current answer: Extend the components as class components, conversion is separate concern

3. **Performance implications of useImperativeHandle?**
   - Current answer: Negligible, it's a standard React pattern

## Conclusion

The Expression widget conversion is feasible and should follow the dropdown pattern closely. The key challenges are:
1. Imperative DOM manipulation (solvable with useRef + querySelector)
2. String refs (solvable with useRef<any>)
3. Type safety for child refs (solvable with any + optional chaining)

Converting KeypadInput and MathInput first would be 4-5x more work for marginal benefit. The recommended approach is to convert Expression using `useRef<any>` for child refs, then decide if those components warrant conversion later.

Previous attempts failed primarily due to:
1. Mixing DependenciesContext types with useDependencies hook
2. Over-engineering ref types
3. Not following the established patterns from successful conversions

Following the plan in `expression-widget-conversion-plan.md` should result in a successful, type-safe conversion.

## Next Steps

1. Implement conversion following the detailed plan
2. Run tests continuously during development
3. Verify both mobile and desktop paths work
4. Type check with `pnpm tsc`
5. Document any new findings or adjustments needed

---

**Research complete.** Ready to proceed with implementation.