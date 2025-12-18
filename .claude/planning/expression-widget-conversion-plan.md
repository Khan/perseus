# Expression Widget Conversion Plan: Class to Functional Component

**Status:** Planning Complete
**Branch:** tb/LEMS-3804/expression-conversion-2
**Date:** 2025-12-18

## Overview

This document outlines the plan to convert the Expression widget from a class component to a functional component using React hooks, while maintaining complete type safety and avoiding the issues encountered in previous conversion attempts.

## File Locations

**Main Widget:**
- `/packages/perseus/src/widgets/expression/expression.tsx` (375 lines)

**Related Files:**
- `/packages/perseus/src/components/math-input.tsx` (MathInput - class component)
- `@khanacademy/math-input` (KeypadInput - class component)
- `/packages/perseus/src/widgets/expression/expression.test.tsx` (620 lines of tests)
- `/packages/perseus/src/widgets/expression/expression.testdata.ts` (test data)

## Current Implementation Analysis

### Class Component Structure

**Line 85:**
```typescript
export class Expression extends React.Component<Props> implements Widget
```

**Key Components:**
- Context: `static contextType = PerseusI18nContext` (line 86)
- Instance Properties:
  - `_textareaId`: Dynamic ID created with timestamp
  - `_isMounted`: Anti-pattern flag to prevent stale state updates

### Widget Interface Methods (9 total)

1. `focus(): boolean` - Focus management
2. `focusInputPath(inputPath)` - Delegate focus to child
3. `blurInputPath(inputPath)` - Delegate blur to child
4. `insert(keyPressed)` - Insert keypad key
5. `getInputPaths()` - Returns `[[]]`
6. `getKeypadConfiguration()` - Returns KeypadConfiguration
7. `getSerializedState()` - DEPRECATED
8. `getUserInput()` - Returns normalized input
9. `getPromptJSON()` - Returns AI-friendly JSON

### Critical Challenges

#### Challenge 1: Imperative DOM Manipulation (lines 119-129)
Uses deprecated `ReactDOM.findDOMNode()` and string refs to imperatively add IDs to textarea/span elements. Must be replaced with `useRef` + `querySelector`.

#### Challenge 2: String Refs
```typescript
<KeypadInput ref="input" ... />
<MathInput ref="input" ... />
```
Causes TypeScript errors. Must convert to object refs.

#### Challenge 3: _isMounted Anti-Pattern
Used to prevent state updates after unmount. Should use `useRef` for mounted flag.

#### Challenge 4: Dual Rendering Paths
- Mobile: KeypadInput component (from @khanacademy/math-input)
- Desktop: MathInput component (from ../components/math-input)
Both are class components without exported ref types.

## Conversion Plan

### Phase 1: Type-Safe Foundation

**1.1 Props Type Definition**

Previous attempts mixed `DependenciesContext` types with `useDependencies()` hook - this caused type conflicts.

**Solution:**
```typescript
type ExternalProps = WidgetProps<
    PerseusExpressionWidgetOptions,
    PerseusExpressionUserInput
>;

type Props = ExternalProps & {
    // Only include props from useDependencies hook
    analytics: PerseusAnalytics;
};
```

**1.2 Component Structure**

Follow the dropdown widget pattern (from `.cursor/claude-docs/widget-class-to-functional-conversion-guide.md` Phase 2.3):

```typescript
const Expression = forwardRef<Widget, Props>(
    function Expression(props, ref) {
        // Use body destructuring since we need props object for helper functions
        const {
            apiOptions,
            buttonSets = defaultButtonSets,
            functions = defaultFunctions,
            times = false,
            linterContext,
            onBlur,
            onFocus,
            onChange,
            trackInteraction,
            keypadElement,
            value,
            visibleLabel,
            ariaLabel,
            widgetId,
            analytics,
        } = props;

        // Hooks
        const {strings, locale} = usePerseusI18n();
        const inputRef = useRef<any>(null); // KeypadInput/MathInput don't export ref types
        const rootRef = useRef<HTMLDivElement>(null);
        const textareaId = useId(); // Modern React 18+ pattern
        const isMountedRef = useRef(false);

        // ... rest of implementation
    }
);
```

### Phase 2: Replace Imperative DOM Manipulation

**2.1 Convert String Refs to useRef**

Replace `this.refs.input` with:
```typescript
const inputRef = useRef<any>(null);
// Note: any is acceptable here because KeypadInput and MathInput are
// class components that don't export their ref types
```

**2.2 Replace ReactDOM.findDOMNode (lines 119-129)**

Current problematic code:
```typescript
// HACK: imperatively add an ID onto the Mathquill input
const container = ReactDOM.findDOMNode(this.refs.input);
const selector = isMobile ? ".mq-textarea > span" : "textarea";
const inputElement = (container as Element).querySelector(selector);
inputElement?.setAttribute("id", this._textareaId);
```

**Replacement:**
```typescript
useEffect(() => {
    if (!rootRef.current || !inputRef.current) return;

    const isMobile = apiOptions.customKeypad;
    const selector = isMobile ? ".mq-textarea > span" : "textarea";
    const inputElement = rootRef.current.querySelector(selector);

    if (inputElement instanceof HTMLElement) {
        inputElement.setAttribute("id", textareaId);
    }

    // Fire analytics event (was in componentDidMount line 113)
    analytics.onWidgetRendered({
        widgetType: "expression",
    });

    isMountedRef.current = true;

    return () => {
        isMountedRef.current = false;
    };
}, []); // Empty deps = mount only
// eslint-disable-next-line react-hooks/exhaustive-deps
```

### Phase 3: Implement Widget Interface

Use `useImperativeHandle` following the dropdown pattern (`.cursor/claude-docs/widget-class-to-functional-conversion-guide.md` lines 97-120):

```typescript
useImperativeHandle(
    ref,
    () => ({
        focus: (): boolean => {
            // Try direct focus first
            if (inputRef.current?.focus) {
                inputRef.current.focus();
                return document.activeElement?.id === textareaId;
            }

            // Fallback: querySelector approach (dropdown pattern)
            if (!rootRef.current) return false;

            const isMobile = apiOptions.customKeypad;
            const selector = isMobile ? ".mq-textarea > span" : "textarea";
            const element = rootRef.current.querySelector(selector);

            // Type narrowing (CRITICAL for TypeScript)
            if (!(element instanceof HTMLElement)) return false;

            const previouslyFocused = document.activeElement;
            element.focus();

            return (
                document.activeElement === element &&
                previouslyFocused !== element
            );
        },

        focusInputPath: (inputPath: FocusPath) => {
            // Delegate to child component
            inputRef.current?.focus?.();
        },

        blurInputPath: (inputPath: FocusPath) => {
            // Delegate to child component
            inputRef.current?.blur?.();
        },

        insert: (value: string) => {
            // Delegate to child component
            inputRef.current?.insert?.(value);
        },

        getInputPaths: () => [[]],

        getUserInput: () => {
            const normalized = normalize(value, {
                functions: functions,
                times: times,
            });

            return {
                value: normalized,
            };
        },

        getKeypadConfiguration: (): KeypadConfiguration => {
            return keypadConfigurationForProps(props);
        },

        getPromptJSON: (): WidgetPromptJSON => {
            return getPromptJSON(props);
        },

        // DEPRECATED but keep for compatibility
        getSerializedState: () => ({value}),
    }),
    [props, value, apiOptions, textareaId, functions, times]
);
```

### Phase 4: Convert Event Handlers

Replace class methods with function declarations:

```typescript
// Replace: _handleFocus() method
const handleFocus = () => {
    onFocus?.([]);
    trackInteraction?.();
};

// Replace: changeAndTrack() method (line 254)
const changeAndTrack = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    handleChange(newVal, e.nativeEvent instanceof window.InputEvent);
};

// Replace: _handleChange() method (lines 261-278)
const handleChange = (newVal: string, cb: boolean) => {
    const normalized = normalize(newVal, {
        functions: functions,
        times: times,
    });

    onChange?.({value: normalized}, cb);
};

// Replace: Mobile onFocus callback (lines 252-263)
const mobileHandleFocus = () => {
    keypadElement?.configure(
        keypadConfigurationForProps(props),
        () => {
            // Check mounted state before calling
            if (isMountedRef.current) {
                handleFocus();
            }
        }
    );
};
```

### Phase 5: Convert Render Method

Wrap in div with rootRef and convert both rendering paths:

```typescript
return (
    <div ref={rootRef}>
        {visibleLabel && (
            <LabelSmall>
                {visibleLabel}
            </LabelSmall>
        )}
        {apiOptions.customKeypad ? (
            // Mobile path
            <KeypadInput
                ref={inputRef}
                value={value}
                keypadElement={keypadElement}
                onChange={handleChange}
                onFocus={mobileHandleFocus}
                onBlur={() => onBlur?.([])}
                ariaLabel={ariaLabel}
            />
        ) : (
            // Desktop path
            <MathInput
                ref={inputRef}
                value={value}
                onChange={changeAndTrack}
                onFocus={handleFocus}
                onBlur={() => onBlur?.([])}
                convertDotToTimes={times}
                buttonSets={buttonSets}
                ariaLabel={ariaLabel}
                onAnalyticsEvent={analytics.onAnalyticsEvent}
            />
        )}
    </div>
);
```

### Phase 6: Update withDependencies Wrapper

Update the wrapper to work with functional component:

```typescript
const ExpressionWithDependencies = forwardRef<Widget, ExternalProps>(
    (props, ref) => {
        const deps = useDependencies();
        return <Expression ref={ref} analytics={deps.analytics} {...props} />;
    }
);

ExpressionWithDependencies.displayName = "ExpressionWithDependencies";

export default ExpressionWithDependencies;
```

## Type Safety Checklist

### Critical Type Pitfalls to AVOID

Based on previous failed attempts:

❌ **Don't mix DependenciesContext with useDependencies hook**
```typescript
// WRONG - Previous Gemini attempt
type Props = ExternalProps & Partial<React.ContextType<typeof DependenciesContext>>;
```

✅ **Do use only the hook**
```typescript
// CORRECT
type Props = ExternalProps & {
    analytics: PerseusAnalytics;
};
```

❌ **Don't create wrapper types for child refs**
```typescript
// WRONG - Previous attempt created KeypadInputWithInterface
type Input = {
    focus: (cb?: () => void) => void;
    // ...
};
```

✅ **Do use any with explanatory comment**
```typescript
// CORRECT
const inputRef = useRef<any>(null); // KeypadInput/MathInput don't export ref types
```

❌ **Don't skip type narrowing**
```typescript
// WRONG
element.focus();
```

✅ **Do progressive type narrowing**
```typescript
// CORRECT
if (!(element instanceof HTMLElement)) return false;
element.focus();
```

### Type Narrowing Pattern for Focus

From dropdown widget (lines 97-120):

```typescript
// 1. Check element exists and is HTMLElement
if (!(element instanceof HTMLElement)) return false;

// 2. If checking disabled state, narrow to specific element type
if (element instanceof HTMLButtonElement) {
    if (element.disabled) return false;
}

// 3. Then perform operations
const previouslyFocused = document.activeElement;
element.focus();

// 4. Verify focus succeeded
return (
    document.activeElement === element &&
    previouslyFocused !== element
);
```

## Implementation Order

1. ✅ **Read current implementation** - Understand all methods and lifecycle
2. ⬜ **Set up type definitions** - Props, ExternalProps (avoid previous mistakes)
3. ⬜ **Create component skeleton** - forwardRef, hooks, refs
4. ⬜ **Convert helper functions** - Keep existing pure functions as-is
5. ⬜ **Convert event handlers** - Methods → functions
6. ⬜ **Implement useEffect** - Replace componentDidMount/Unmount
7. ⬜ **Implement useImperativeHandle** - All 9 Widget interface methods
8. ⬜ **Convert render method** - JSX stays mostly the same
9. ⬜ **Update wrapper component** - Fix withDependencies
10. ⬜ **Run tests** - All 620 lines should pass unchanged
11. ⬜ **Manual testing** - Both mobile and desktop paths
12. ⬜ **Type check** - `pnpm tsc`
13. ⬜ **Lint** - `pnpm lint --fix`

## Success Criteria

- ✅ All existing tests pass without modification
- ✅ No TypeScript errors
- ✅ No ESLint errors
- ✅ Both mobile and desktop rendering paths work
- ✅ All 9 Widget interface methods function correctly
- ✅ Focus management works (focus, blur, focusInputPath, blurInputPath)
- ✅ Insert functionality works
- ✅ Analytics event fires on mount
- ✅ No ReactDOM.findDOMNode usage
- ✅ No string refs
- ✅ Proper cleanup on unmount

## Reference Patterns

### Primary Reference: Dropdown Widget
Location: `/packages/perseus/src/widgets/dropdown/dropdown.tsx`
Commit: `bcdd6c49ec`

Key patterns:
- Named function expression with forwardRef
- usePerseusI18n() for context
- useId() for accessibility IDs
- useImperativeHandle with all Widget methods
- querySelector pattern for focus management
- Progressive type narrowing

### Secondary References
- **Radio Widget** (`multiple-choice-widget.new.tsx`) - Shows useOnMountEffect pattern
- **Numeric Input Widget** - Shows child ref delegation
- **Conversion Guide** (`.cursor/claude-docs/widget-class-to-functional-conversion-guide.md`)

## Notes

- KeypadInput and MathInput remain class components (separate effort if needed)
- Using `useRef<any>` for child refs is acceptable and documented pattern
- The `isMountedRef` pattern replaces the `_isMounted` anti-pattern
- useId() replaces timestamp-based ID generation
- Tests should pass without changes - this validates the conversion

## Timeline

This is an incremental conversion. No time estimates provided per project guidelines.

## Related Issues

- Previous attempt commits: 84d06bece0, dbce1b92b2, 31d95e3c34, 432d5c2d41
- See `expression-widget-conversion-research.md` for detailed analysis of previous issues