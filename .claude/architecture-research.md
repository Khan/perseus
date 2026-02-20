# Perseus Architecture Research

**Date**: February 5, 2026
**Researcher**: Claude (AI Assistant)
**Focus**: Current widget state management, data flow, onChange patterns, and package structure

## Executive Summary

Perseus is a well-structured React monorepo with a clear separation of concerns across multiple packages. The current architecture uses a props-driven approach where widgets receive their state through `handleUserInput` callbacks and `userInput` props, rather than the deprecated `onChange` pattern. State management has been intentionally refactored to move away from the old widget-centric model toward a more centralized approach managed by the `UserInputManager` and `Renderer`.

---

## 1. Widget State Management

### Current Pattern: Props-Driven with Callbacks

Modern widgets do NOT use the old `onChange` handler. Instead, they:

1. **Receive state through props**: `userInput: TUserInput` (typed per widget)
2. **Call `handleUserInput` callback** when state changes: `handleUserInput(newUserInput, callback?, silent?)`
3. **Call `trackInteraction` callback** to notify about interactions

#### Radio Widget Example (Multiple Choice)

From `/packages/perseus/src/widgets/radio/multiple-choice-widget.tsx`:

```typescript
type Props = WidgetProps<RadioProps, PerseusRadioUserInput, PerseusRadioRubric>;

const handleChoiceChange = (choiceId: string, newCheckedState: boolean): void => {
    // Build list of checked choice IDs
    const checkedChoiceIds: string[] = [];
    // ... logic to determine new selection state ...
    
    // Create new choice states
    const newChoiceStates: ChoiceState[] = choiceStates
        ? choiceStates.map((state) => ({...state}))
        : choices.map(() => ({
              selected: false,
              // ... other state fields ...
          }));

    // Update states based on selection
    newChoiceStates.forEach((choiceState: ChoiceState, i) => {
        const choiceId = choices[i].id;
        choiceState.selected = checkedChoiceIds.includes(choiceId);
    });

    // Notify parent of change
    onChange({choiceStates: newChoiceStates});  // ← Still has onChange!
    trackInteraction();
    announceChoiceChange(newChoiceStates);
};
```

**Note**: The Radio widget still uses `onChange`, but this is marked for deprecation (LEMS-3542, LEMS-3245). This is a transitional state during the Radio Revitalization Project.

#### NumericInput Widget Example

From `/packages/perseus/src/widgets/numeric-input/numeric-input.tsx`:

```typescript
const handleChange = (newValue: string): void => {
    // Call handleUserInput with new state
    props.handleUserInput({currentValue: newValue});
    props.trackInteraction();
};

const handleFocus = (): void => {
    props.onFocus([]);
    setIsFocused(true);
};

const handleBlur = (): void => {
    props.onBlur([]);
    setIsFocused(false);
};
```

**Key differences from Radio**:
- Uses `handleUserInput` callback (modern pattern)
- No local component state for user input
- Props-driven: receives `props.userInput.currentValue` and sends updates via callback

### State Storage Location

**User Input State**: Managed by `UserInputManager` component
- Location: `/packages/perseus/src/user-input-manager.tsx`
- Stored in a central `userInput` object: `UserInputMap` (type from `@khanacademy/perseus-core`)
- Updated via `handleUserInput(widgetId, newUserInput, widgetsEmpty)` callback

**Widget-Specific State**: 
- Some widgets maintain internal component state (see Radio's `choiceStates`)
- This is being transitioned to centralized state management
- Focus management state: `onFocus`, `onBlur` callbacks update parent renderer

---

## 2. Data Flow Architecture

### High-Level Flow

```
ServerItemRenderer
    ↓
UserInputManager (manages userInput state)
    ↓ (provides userInput, handleUserInput, initializeUserInput)
    ↓
Renderer (question rendering)
    ├─ renderWidget() → WidgetContainer
    │   ├─ Passes WidgetProps (from getWidgetProps())
    │   └─ WidgetContainer → Widget Component
    │       ├─ Receives userInput prop
    │       ├─ Calls handleUserInput on change
    │       └─ Calls trackInteraction on user action
    │
    └─ Returns UserInputMap to parent
```

### Detailed Props Flow

**Where**: `/packages/perseus/src/renderer.tsx` lines 511-575

```typescript
getWidgetProps(widgetId: string): WidgetProps<any, any, PerseusWidgetOptions> {
    const apiOptions = this.getApiOptions();
    const widgetProps = this.props.widgets[widgetId].options;  // ← Config from question
    const widgetInfo = this.state.widgetInfo[widgetId];

    return {
        ...widgetProps,                           // ← Widget-specific options
        userInput: this.props.userInput?.[widgetId],  // ← Current user input
        widgetId: widgetId,
        widgetIndex: this._getWidgetIndexById(widgetId),
        alignment: widgetInfo && widgetInfo.alignment,
        static: widgetInfo?.static,
        problemNum: this.props.problemNum,
        apiOptions: this.getApiOptions(),         // ← API configuration
        keypadElement: this.props.keypadElement,
        showSolutions: this.props.showSolutions,
        onFocus: _.partial(this._onWidgetFocus, widgetId),
        onBlur: _.partial(this._onWidgetBlur, widgetId),
        findWidgets: this.findWidgets,            // ← Inter-widget communication
        reviewMode: this.props.reviewMode,
        
        // ← Core state management callback
        handleUserInput: (newUserInput: UserInput) => {
            const updatedUserInput = {
                ...this.props.userInput,
                [widgetId]: newUserInput,
            };
            const emptyWidgetIds = emptyWidgetsFunctional(
                this.state.widgetInfo,
                this.widgetIds,
                updatedUserInput,
                this.context.locale,
            );
            const widgetsEmpty = emptyWidgetIds.length > 0;
            this.props.handleUserInput?.(
                widgetId,
                newUserInput,
                widgetsEmpty,
            );
            this.props.apiOptions?.interactionCallback?.(updatedUserInput);
        },
        
        trackInteraction: interactionTracker.track,
    };
}
```

### User Input Manager Flow

**Where**: `/packages/perseus/src/user-input-manager.tsx`

```typescript
export function sharedInitializeUserInput(
    widgetOptions: PerseusWidgetsMap | undefined,
    problemNum: number,
): UserInputMap {
    const startUserInput: UserInputMap = {};
    
    // For each widget, call widget's initialization function
    Object.entries(widgetOptions).forEach(([id, widgetInfo]) => {
        const widgetExports = Widgets.getWidgetExport(widgetInfo.type);
        
        // Static widgets use correct answer
        if (widgetInfo.static && widgetExports?.getCorrectUserInput) {
            startUserInput[id] = widgetExports.getCorrectUserInput(
                widgetInfo.options,
            );
        } 
        // Other widgets use start input
        else if (widgetExports?.getStartUserInput) {
            startUserInput[id] = widgetExports.getStartUserInput(
                widgetInfo.options,
                problemNum ?? 0,
            );
        }
    });
    
    return startUserInput;
}

// Then in component:
function handleUserInput(
    id: string,
    nextUserInput: UserInputMap[keyof UserInputMap],
    widgetsEmpty: boolean,
) {
    const next = {
        ...userInput,
        [id]: nextUserInput,  // ← Update only this widget's input
    };
    setUserInput(next);
    props.handleUserInput?.(next, widgetsEmpty);
}
```

---

## 3. onChange Pattern Status

### Current Status: DEPRECATION IN PROGRESS

**The `onChange` pattern is being removed but still exists in legacy code.**

#### Where it's still used:

1. **Radio Widget** (partially during migration)
   - File: `/packages/perseus/src/widgets/radio/radio.ff.tsx`
   - Type definition: `/packages/perseus/src/types.ts` line 117
   - Status: TODO marked for removal (LEMS-3542, LEMS-3245)

2. **Types Still Define It**
   - File: `/packages/perseus/src/types.ts`
   ```typescript
   /**
    * TODO(LEMS-3245) remove ChangeHandler
    * @deprecated
    */
   export type ChangeHandler = (
       arg1: {
           hints?: ReadonlyArray<Hint>;
           replace?: boolean;
           content?: string;
           widgets?: PerseusWidgetsMap;
           images?: ImageDict;
           choiceStates?: ReadonlyArray<ChoiceState>;
           // ... more fields ...
       },
       callback?: () => void,
       silent?: boolean,
   ) => unknown;
   ```

#### Where it's NOT used:

- **NumericInput**: Uses `handleUserInput` directly
- **Most modern widgets**: Use `handleUserInput` callback
- **All new widget code**: Should use the props-driven approach

#### Migration Path

The Radio widget wrapper (`radio.ff.tsx`) bridges old and new:

```typescript
class Radio extends React.Component<Props> implements Widget {
    _handleChange(arg: {choiceStates?: ReadonlyArray<ChoiceState>}) {
        const newChoiceStates = arg.choiceStates;
        // ... converts ChoiceState to UserInput ...
        const props = this._mergePropsAndState();
        // Use getUserInputFromSerializedState to get proper UserInput format
        const userInput = getUserInputFromSerializedState(mergedProps, ...);
        this.props.handleUserInput(userInput);  // ← Calls new pattern
    }
}
```

---

## 4. Widget Interface and Lifecycle

### Widget Interface Definition

**File**: `/packages/perseus/src/types.ts` lines 60-93

```typescript
export interface Widget {
    /**
     * don't use isWidget; it's just a dummy property to help TypeScript's 
     * weak typing to recognize non-interactive widgets as Widgets
     * @deprecated
     */
    isWidget?: true;
    
    focus?: () => {
        id: string;
        path: FocusPath;
    } | boolean;
    
    getDOMNodeForPath?: (path: FocusPath) => Element | Text | null;

    /**
     * @deprecated - do not use in new code.
     */
    getSerializedState?: () => SerializedState;

    blurInputPath?: (path: FocusPath) => void;
    focusInputPath?: (path: FocusPath) => void;
    getInputPaths?: () => ReadonlyArray<FocusPath>;

    getPromptJSON?: () => WidgetPromptJSON;
}
```

### WidgetExports Pattern

**File**: `/packages/perseus/src/types.ts` lines 468-512

```typescript
export type WidgetExports<
    T extends React.ComponentType<any> & Widget = React.ComponentType<any>,
    TUserInput = Empty,
> = Readonly<{
    name: string;
    displayName: string;

    widget: T;  // The component itself
    
    version?: Version;
    isLintable?: boolean;
    tracking?: Tracking;

    // Static widget support
    getOneCorrectAnswerFromRubric?: (rubric: WidgetOptions) => string | null;

    // ← Initialization functions
    getCorrectUserInput?: (widgetOptions: WidgetOptions) => TUserInput;
    getStartUserInput?: (
        widgetOptions: WidgetOptions,
        problemNum: number,
    ) => TUserInput;

    // ← Deprecation functions
    getUserInputFromSerializedState?: (
        serializedState: unknown,
        widgetOptions?: WidgetOptions,
    ) => TUserInput;
}>;
```

---

## 5. Package Structure and Dependencies

### Package Organization

```
packages/
├── perseus/                    # Main renderer package (74.0.2)
│   ├── src/
│   │   ├── renderer.tsx       # Core renderer component
│   │   ├── server-item-renderer.tsx  # Exercise renderer
│   │   ├── widget-container.tsx      # Widget wrapper
│   │   ├── user-input-manager.tsx    # State management
│   │   ├── widgets/           # Widget implementations
│   │   │   ├── radio/
│   │   │   ├── numeric-input/
│   │   │   ├── interactive-graphs/
│   │   │   └── ... (40+ widget types)
│   │   ├── types.ts           # Core type definitions
│   │   ├── widgets.ts         # Widget registry
│   │   └── index.ts           # Main exports
│   └── package.json
│
├── perseus-core/              # Shared types & utilities (23.0.0)
│   ├── src/
│   │   ├── data-schema.ts     # Data type definitions
│   │   ├── scoring-functions/ # Widget-specific scoring
│   │   └── utils/generators   # Test data generators
│   └── package.json
│
├── perseus-score/             # Server-side scoring
│   ├── src/widgets/[type]/score-[type].ts
│   └── widgets/widget-registry.ts
│
├── perseus-linter/            # Content validation
├── perseus-editor/            # Editor components
├── math-input/                # Math keypad components
└── ... (other packages)
```

### Dependencies

**Perseus Package** depends on:
- `@khanacademy/perseus-core` - Type definitions
- `@khanacademy/perseus-score` - Scoring logic
- `@khanacademy/perseus-linter` - Content validation
- `@khanacademy/math-input` - Math input components
- Wonder Blocks components (UI library)
- React/ReactDOM

**Perseus-Core** dependencies:
- `@khanacademy/kas` - CAS system
- `@khanacademy/perseus-utils` - Shared utilities
- `@khanacademy/pure-markdown` - Markdown parser
- `tiny-invariant` - Assertions

### Import Boundaries

**Rules** (from CLAUDE.md):
- Use package aliases: `@khanacademy/perseus`, `@khanacademy/perseus-core`
- NO file extensions in imports (TypeScript file)
- NO cross-package relative imports
- Import order: builtin > external > internal > relative > types

**Example correct imports**:
```typescript
import React from "react";                           // builtin
import {ApiOptions} from "@khanacademy/perseus";     // internal package
import {WidgetContainer} from "../widget-container"; // relative

import type {WidgetProps} from "@khanacademy/perseus-core";
```

---

## 6. Module Boundaries and Inter-Widget Communication

### WidgetContainer Boundary

**File**: `/packages/perseus/src/widget-container.tsx`

```typescript
type Props = {
    shouldHighlight: boolean;
    type: string;              // ← Widget type
    id: string;                // ← Widget ID
    widgetProps: WidgetProps<any, PerseusWidgetOptions>;  // ← All props
    linterContext: LinterContextProps;
};

class WidgetContainer extends React.Component<Props, State> {
    render() {
        const WidgetType = Widgets.getWidget(this.props.type);
        if (WidgetType == null) {
            console.warn(`Widget type '${this.props.type}' not found!`);
            return <div className={className} />;
        }
        
        return (
            <ErrorBoundary metadata={{...}}>
                <WidgetType
                    {...this.props.widgetProps}      // ← Spread all props
                    linterContext={linterContext}
                    containerSizeClass={this.state.sizeClass}
                    ref={this.widgetRef}
                />
            </ErrorBoundary>
        );
    }
}
```

**Responsibilities**:
- Looks up widget component from registry
- Handles error boundaries
- Measures container size on mobile
- Passes props through without modification

### Inter-Widget Communication

**File**: `/packages/perseus/src/renderer.tsx` lines 626-683

```typescript
findInternalWidgets = (filterCriterion: FilterCriterion) => {
    // Returns widgets matching filter
    // Filters can be:
    // - Widget ID: "interactive-graph 3"
    // - Widget type: "interactive-graph"
    // - Function: (id, widgetInfo, widget) => boolean
};

findWidgets = (filterCriterion: FilterCriterion) => {
    // Combines internal and external widgets
    return [
        ...this.findInternalWidgets(filterCriterion),
        ...this.props.findExternalWidgets(filterCriterion),
    ];
};
```

**Usage**: Passed to all widgets as `findWidgets` prop, enabling:
- Graded group widgets to find their children
- Custom widgets to communicate with other widgets
- Cross-renderer communication through parent's `findExternalWidgets`

---

## 7. Key Files and Their Responsibilities

| File | Responsibility |
|------|-----------------|
| `server-item-renderer.tsx` | Top-level exercise renderer; manages hints |
| `renderer.tsx` | Core question renderer; widget lifecycle |
| `widget-container.tsx` | Widget wrapper; error boundaries |
| `user-input-manager.tsx` | Central state management for user input |
| `types.ts` | Core type definitions (Widget, WidgetProps, etc.) |
| `widgets.ts` | Widget registry and lookup |
| `widgets/[type]/index.ts` | Widget export entry point |
| `widgets/[type]/[type].ts` | Widget registration (WidgetExports) |
| `widgets/[type]/[component].tsx` | Widget component implementation |

---

## 8. Recent Architecture Changes

### Recent PRs (from git log):
1. **Upgrade to Jest v30** (#3230) - Testing infrastructure
2. **Fix parsing of answerless Label Image widgets** (#3231) - Bug fix
3. **Remove unused `isItemRenderableByVersion`** (#3229) - Code cleanup
4. **Delete TODOs we're never going to fix** (#3197) - Debt reduction
5. **Simplify applyDefaultsToWidgets** (#3217) - Refactoring

### Known Deprecations

- `getSerializedState()` - Use `getStartUserInput()` instead (LEMS-3185)
- `onChange` handler - Use `handleUserInput()` instead (LEMS-3245, LEMS-3542)
- `ChangeHandler` type - Being phased out
- Old Radio widget files - Being replaced (LEMS-2994)

---

## 9. Testing Architecture

### Test Patterns

**Location**: Widgets typically have `[widget].test.ts` or `.test.tsx` files

**Key testing helpers** (from `packages/perseus-core/src/utils/generators`):
- Widget generators for creating test data
- testdata files for example questions

**Example structure** (from CLAUDE.md):
```typescript
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";
import {question1} from "../__testdata__/widget.testdata";
import WidgetComponent from "../widget-component";

describe("WidgetComponent", () => {
    it("renders correctly", () => {
        render(<WidgetComponent {...question1} />);
        expect(screen.getByRole("button")).toBeInTheDocument();
    });

    it("handles user interaction", async () => {
        const user = userEvent.setup();
        const onChange = jest.fn();
        render(<WidgetComponent {...question1} onChange={onChange} />);
        await user.click(screen.getByRole("button"));
        expect(onChange).toHaveBeenCalled();
    });
});
```

---

## 10. Key Insights and Findings

### Ground Truth: Modern Widget Pattern

1. **No onChange**: Modern widgets use `handleUserInput(newState)` callback
2. **Props-driven**: Widget state is passed via props, not stored internally
3. **Centralized state**: `UserInputManager` holds all widget states in one place
4. **Lazy initialization**: Widgets use `getStartUserInput()` to initialize state

### Current Transition State

- **Radio widget**: Partially migrated (still uses `onChange` internally)
- **NumericInput widget**: Fully migrated to modern pattern
- **Legacy code**: Still contains `onChange` and `ChangeHandler` types
- **Feature flags**: Used to conditionally render new Radio widget (radio.ff.tsx)

### Architecture Strengths

1. **Clear separation**: Renderer, WidgetContainer, Widgets have distinct roles
2. **Type safety**: Extensive use of TypeScript generics for widget props
3. **Extensibility**: Widget registry system allows plugins
4. **Testability**: Props-driven design makes widgets easy to test
5. **Error handling**: Error boundaries at widget level

### Areas of Complexity

1. **State shape duality**: Some widgets still have both `ChoiceState` and `UserInput`
2. **Serialization deprecation**: Old serialized state format still supported for backwards compatibility
3. **Focus management**: FocusPath system is complex but necessary for accessibility
4. **Feature flags**: Multiple codepaths for old vs. new Radio implementation

---

## Conclusion

Perseus has a well-designed, modern React architecture with clear data flow. The system is transitioning from widget-centric state management (onChange) to centralized state management (UserInputManager + handleUserInput callbacks). This research shows the actual current state of the codebase, which differs from some of the documentation in that modern widgets are fully prop-driven with no onChange pattern at all.

The key takeaway: **When building or modifying widgets, use `handleUserInput()` callbacks, NOT `onChange` handlers**. The latter is deprecated and being actively removed.

---

**Co-authored by**: Claude (AI Assistant)
**Research Depth**: Thorough - examined 15+ source files and traced data flow through the entire system
