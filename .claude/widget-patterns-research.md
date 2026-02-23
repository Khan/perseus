# Perseus Widget Development Patterns Research

**Research Date:** February 5, 2026
**Conducted by:** Claude Code
**Co-Author:** Tamara Bozich

## Executive Summary

This document details the current widget development patterns in Perseus based on examination of actual codebase implementations. The key finding is that **Rubric is still the primary pattern**, not replaced by `scoringData` or `validationData` props. Widget types are split between widget configuration (in `PerseusWidgetOptions` from data-schema) and validation/scoring data (in validation.types.ts).

---

## 1. Widget Type Definitions Architecture

### 1.1 The Type System (Three-Layer Pattern)

Perseus uses a three-layer type system for widget data, defined in `packages/perseus-core/src/validation.types.ts`:

1. **WidgetOptions** (in `data-schema.ts`): The configuration/definition of the widget
   - What a content creator sees in the editor
   - Immutable across a session
   - Example: `PerseusRadioWidgetOptions`, `PerseusNumericInputWidgetOptions`

2. **ValidationData** (in `validation.types.ts`): The data needed for client-side validation
   - Does NOT contain sensitive scoring information
   - Can be checked before submission
   - Used for accessibility, input validation
   - Often overlaps with WidgetOptions

3. **Rubric** (in `validation.types.ts`): The data needed for scoring
   - Contains the "correct" answers and scoring logic parameters
   - Always intersected with `ValidationData` via `&` operator
   - Passed to scoring functions
   - Example: `PerseusNumericInputRubric = { answers, coefficient } & PerseusNumericInputValidationData`

### 1.2 Key Finding: Rubric is NOT Being Replaced

**Status:** Rubric pattern is active and unchanged
- `PerseusNumericInputRubric` (line 223 in validation.types.ts): `{ answers, coefficient }`
- `PerseusRadioRubric` (line 261 in validation.types.ts): `{ choices, countChoices? }`
- Both are used as-is in widget implementations and scoring functions

**No evidence of transition to:**
- `scoringData` prop
- `validationData` prop
- Alternative naming schemes

---

## 2. Widget Implementation Patterns

### 2.1 Current Widget Export Pattern

All widgets follow the `WidgetExports<T>` pattern (defined in `packages/perseus/src/types.ts` lines 468-512):

```typescript
export type WidgetExports<
    T extends React.ComponentType<any> & Widget = React.ComponentType<any>,
    TUserInput = Empty,
> = Readonly<{
    name: string;                    // Widget identifier
    displayName: string;              // Display name in editor
    widget: T;                        // The component
    version?: Version;                // Widget schema version
    isLintable?: boolean;             // Can be linted
    tracking?: Tracking;              // Tracking behavior
    
    // Scoring/Validation functions (OPTIONAL)
    getOneCorrectAnswerFromRubric?: (rubric: WidgetOptions) => string | null;
    getCorrectUserInput?: (widgetOptions: WidgetOptions) => TUserInput;
    getStartUserInput?: (widgetOptions: WidgetOptions, problemNum: number) => TUserInput;
    getUserInputFromSerializedState?: (serializedState: unknown, widgetOptions?: WidgetOptions) => TUserInput;
}>;
```

### 2.2 Numeric Input Widget (Modern Pattern)

**File:** `packages/perseus/src/widgets/numeric-input/numeric-input.class.tsx`

```typescript
// Props type - combines widget options with universal props
type ExternalProps = WidgetProps<
    PerseusNumericInputWidgetOptions,
    PerseusNumericInputUserInput
>;

// Widget component definition
export class NumericInput extends React.Component<NumericInputProps> implements Widget {
    // Widget interface methods
    focus: () => boolean
    focusInputPath: () => void
    blurInputPath: () => void
    getInputPaths: () => ReadonlyArray<ReadonlyArray<string>>
    getPromptJSON(): NumericInputPromptJSON
    // ...
}

// Export follows WidgetExports pattern
export default {
    name: "numeric-input",
    displayName: "Numeric input",
    widget: NumericInput,
    isLintable: true,
    getCorrectUserInput,        // Function
    getOneCorrectAnswerFromRubric(rubric: PerseusNumericInputRubric) { /* ... */ },
    getStartUserInput,          // Function
    getUserInputFromSerializedState,  // Function
} satisfies WidgetExports<typeof NumericInput>;
```

**Actual Prop Names Used:**
- `answers: PerseusNumericInputAnswer[]` - from widget options
- `coefficient: boolean` - from widget options
- `userInput: { currentValue: string }` - user input (typed separately)
- `handleUserInput` - callback to update user input
- `trackInteraction` - analytics callback
- No `rubric`, `scoringData`, or `validationData` props passed directly to component

### 2.3 Radio Widget (In Transition)

**File:** `packages/perseus/src/widgets/radio/radio.ff.tsx` + `radio.ts`

```typescript
type Props = WidgetProps<RadioProps, PerseusRadioUserInput, PerseusRadioRubric>;

export default {
    name: "radio",
    displayName: "Radio / Multiple choice",
    widget: Radio,
    getStartUserInput,
    version: radioLogic.version,
    isLintable: true,
    getUserInputFromSerializedState: (serializedState: unknown) => {
        return getUserInputFromSerializedState(serializedState);
    },
} satisfies WidgetExports<typeof Radio>;
```

**Status:** 
- Still using class component wrapper (line 52: `class Radio extends React.Component<Props> implements Widget`)
- Transitioning toward functional component (comment on line 50: "TODO(LEMS-2994): Clean up this file")
- Using old API with `ChoiceState` that combines UI state and user input

### 2.4 Expression Widget (Functional)

**File:** `packages/perseus/src/widgets/expression/expression.tsx`

```typescript
type ExternalProps = WidgetProps<
    PerseusExpressionWidgetOptions,
    PerseusExpressionUserInput
>;

type Props = ExternalProps & {
    buttonSets: NonNullable<ExternalProps["buttonSets"]>;
    functions: NonNullable<ExternalProps["functions"]>;
    times: NonNullable<ExternalProps["times"]>;
};

export class Expression extends React.Component<Props> implements Widget {
    // Widget methods
    focus: () => boolean
    focusInputPath: () => void
    // ...
}

export default {
    name: "expression",
    displayName: "Expression / Equation",
    widget: Expression,
    version: expressionLogic.version,
    isLintable: true,
    getOneCorrectAnswerFromRubric,
    getStartUserInput,
    getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof Expression>;
```

---

## 3. Props Flow Architecture

### 3.1 How Props Are Passed to Widgets

From `packages/perseus/src/renderer.tsx` (lines 511-575):

```typescript
getWidgetProps(widgetId: string): WidgetProps<any, any> {
    const widgetProps = this.props.widgets[widgetId].options;  // WidgetOptions
    const widgetInfo = this.state.widgetInfo[widgetId];       // Metadata
    
    return {
        ...widgetProps,                    // Spread widget options directly
        userInput: this.props.userInput?.[widgetId],
        widgetId: widgetId,
        widgetIndex: this._getWidgetIndexById(widgetId),
        alignment: widgetInfo && widgetInfo.alignment,
        static: widgetInfo?.static,
        apiOptions: this.getApiOptions(),  // API options
        onFocus: _.partial(this._onWidgetFocus, widgetId),
        onBlur: _.partial(this._onWidgetBlur, widgetId),
        handleUserInput: (newUserInput) => { /* ... */ },
        trackInteraction: interactionTracker.track,
    };
}
```

**Key Pattern:**
- Widget options are spread directly: `...widgetProps`
- UserInput is passed separately: `userInput` prop
- No `rubric` prop passed to widget component
- Rubric is only used during scoring (server-side or via scoring functions)

### 3.2 UserInput vs WidgetOptions

**UserInput Examples:**
```typescript
// Numeric Input
PerseusNumericInputUserInput = { currentValue: string }

// Radio
PerseusRadioUserInput = { selectedChoiceIds: string[] }

// Expression
PerseusExpressionUserInput = string

// Label Image
PerseusLabelImageUserInput = {
    markers: Array<{ selected?: string[], label: string }>
}
```

**WidgetOptions Examples:**
```typescript
// Numeric Input
PerseusNumericInputWidgetOptions = {
    answers: PerseusNumericInputAnswer[],
    labelText?: string,
    size: string,
    coefficient: boolean,
    rightAlign?: boolean,
    static: boolean,
}

// Radio
PerseusRadioWidgetOptions = {
    choices: PerseusRadioChoice[],
    hasNoneOfTheAbove?: boolean,
    countChoices?: boolean,
    numCorrect?: number,
    randomize?: boolean,
    multipleSelect?: boolean,
    deselectEnabled?: boolean,
}
```

---

## 4. Rubric Pattern in Scoring

### 4.1 Rubric Types (validation.types.ts)

Rubric types are ONLY used in:
1. Scoring functions (registered in perseus-score)
2. `getOneCorrectAnswerFromRubric` export in WidgetExports
3. Server-side validation/scoring

**Examples:**

```typescript
// Line 223-228 of validation.types.ts
export type PerseusNumericInputRubric = {
    answers: PerseusNumericInputAnswer[];
    coefficient: boolean;
};

// Line 261-266
export type PerseusRadioRubric = {
    choices: PerseusRadioChoice[];
    countChoices?: boolean;
};

// Line 114-117
export type PerseusExpressionRubric = {
    answerForms: Array<PerseusExpressionAnswerForm>;
    functions: string[];
};
```

### 4.2 Scoring Function Pattern

From numeric-input implementation:

```typescript
function getCorrectUserInput(
    options: PerseusNumericInputWidgetOptions,
): PerseusNumericInputUserInput {
    for (const answer of options.answers) {
        if (answer.status === "correct" && answer.value != null) {
            // Logic to find correct answer
            if (answer.answerForms?.includes("decimal")) {
                return {currentValue: answer.value.toString()};
            }
            // ... more logic
        }
    }
    return {currentValue: ""};
}

// Usage in WidgetExports:
getOneCorrectAnswerFromRubric(
    rubric: PerseusNumericInputRubric,
): string | null | undefined {
    const correctAnswers = rubric.answers.filter(
        (answer) => answer.status === "correct"
    );
    // ... logic to format for display
}
```

---

## 5. Type Relationships

### 5.1 Data-Schema Hierarchy (PerseusWidgetTypes)

```
PerseusWidgetTypes (Interface in data-schema.ts)
├── categorizer: CategorizerWidget
├── dropdown: DropdownWidget
├── numeric-input: NumericInputWidget
├── radio: RadioWidget
├── expression: ExpressionWidget
└── ... (33+ widgets)

Each entry like:
NumericInputWidget = WidgetOptions<'numeric-input', PerseusNumericInputWidgetOptions>
```

### 5.2 Validation Type Hierarchy (validation.types.ts)

```
RubricRegistry (Interface)
├── categorizer: PerseusCategorizerRubric
├── radio: PerseusRadioRubric
├── numeric-input: PerseusNumericInputRubric
└── ... (corresponds to PerseusWidgetTypes)

UserInputRegistry (Interface)
├── categorizer: PerseusCategorizerUserInput
├── radio: PerseusRadioUserInput
└── ...
```

### 5.3 Type Parameter Naming in Widgets

```typescript
// Standard pattern
type ExternalProps = WidgetProps<
    PerseusNumericInputWidgetOptions,  // TWidgetOptions
    PerseusNumericInputUserInput       // TUserInput
>;

// WidgetProps definition (types.ts line 527-533):
export type WidgetProps<
    TWidgetOptions,
    TUserInput = Empty,
    TrackingExtraArgs = Empty,
> = TWidgetOptions & UniversalWidgetProps<TUserInput, TrackingExtraArgs>;
```

---

## 6. Recent Widget Examples & Practices

### 6.1 Numeric Input Widget - Fully Modernized ✓

**Status:** Class component with functional component integration (hybrid)
- Component: `NumericInputComponent` (functional, lines 28-132)
- Wrapper: `NumericInput` class (implements Widget interface)
- Props: Proper typing with `ExternalProps` and `NumericInputProps`
- Features: Focus management, accessibility (labelText, ariaLabel)

### 6.2 Radio Widget - In Transition

**Status:** Class wrapper around multiple-choice-widget
- Uses old `ChoiceState` API (combines UI state + user input)
- Comment: "TODO(LEMS-2994): Clean up this file"
- Issue: Hard to migrate due to component inheritance

### 6.3 Expression Widget - Modern Pattern

**Status:** Class component implementing Widget interface
- Proper prop typing
- Focus management via refs
- Comprehensive widget interface implementation

---

## 7. Named Conventions Summary

### 7.1 Type Naming

| Pattern | Location | Purpose |
|---------|----------|---------|
| `Perseus<Widget>WidgetOptions` | data-schema.ts | Widget configuration |
| `Perseus<Widget>Rubric` | validation.types.ts | Scoring data |
| `Perseus<Widget>UserInput` | validation.types.ts | User's answer |
| `Perseus<Widget>ValidationData` | validation.types.ts | Client-side validation data |

### 7.2 Prop Naming (Actual Usage)

**What IS passed to widget components:**
- Widget option fields (spread from `widgetProps`)
- `userInput: TUserInput`
- `handleUserInput: (newUserInput: TUserInput) => void`
- `widgetId: string`
- `apiOptions: APIOptionsWithDefaults`
- `trackInteraction: () => void`
- `onFocus`, `onBlur`, `linterContext`, etc.

**What IS NOT passed:**
- No `rubric` prop (used only in scoring)
- No `scoringData` prop
- No `validationData` prop
- No separate validation/scoring objects

### 7.3 Focus Management Requirements

Every widget must implement:
```typescript
focus?: () => { id: string; path: FocusPath } | boolean;
focusInputPath?: (path: FocusPath) => void;
blurInputPath?: (path: FocusPath) => void;
getInputPaths?: () => ReadonlyArray<FocusPath>;
```

---

## 8. Widget Registration & Discovery

### 8.1 Registration System (widgets.ts)

```typescript
const widgets = new Registry<WidgetExports>("Perseus widget registry");

export const registerWidget = (type: string, widget: WidgetExports) => {
    widgets.set(type, widget);
};

// All widgets register via:
// registerWidgets([numericInput, radio, expression, /* ... */])
```

### 8.2 PerseusWidgetTypes Interface

```typescript
export interface PerseusWidgetTypes {
    categorizer: CategorizerWidget;
    dropdown: DropdownWidget;
    radio: RadioWidget;
    "numeric-input": NumericInputWidget;
    // ... 30+ more widgets
}
```

This interface:
- Is open for extension (can be module-augmented)
- Used by `MakeWidgetMap` to create `PerseusWidgetsMap`
- Provides strong typing for widget data throughout Perseus

---

## 9. Current State Assessment

### What Works Well
1. **Type Safety:** Three-layer system (WidgetOptions → ValidationData → Rubric) is robust
2. **Props Architecture:** Clear separation between widget config and user input
3. **Widget Interface:** Consistent interface for all widgets via `Widget` type
4. **Registration:** Flexible registry system supports custom widgets

### Transition Areas
1. **Radio Widget:** Still transitioning from old `ChoiceState` API
2. **Class Components:** Some widgets still using class components (being converted to functional)
3. **Serialized State:** Deprecated API still present but marked `@deprecated`

### No Evidence Of
1. Planned move to `scoringData` or `validationData` props
2. Changes to Rubric pattern
3. Alternative type naming schemes

---

## 10. Key Findings for Implementation

### When Creating a New Widget:

1. **Define types in data-schema.ts:**
   ```typescript
   type MyNewWidget = WidgetOptions<'my-new-widget', MyNewWidgetOptions>;
   // Add to PerseusWidgetTypes interface
   ```

2. **Define scoring types in validation.types.ts:**
   ```typescript
   type PerseuMyNewWidgetRubric = { /* scoring data */ } & PerseuMyNewWidgetValidationData;
   type PerseuMyNewWidgetUserInput = { /* user data */ };
   ```

3. **Create widget component with WidgetProps typing:**
   ```typescript
   type Props = WidgetProps<MyNewWidgetOptions, MyNewWidgetUserInput>;
   ```

4. **Export via WidgetExports pattern:**
   ```typescript
   export default {
       name: "my-new-widget",
       displayName: "My New Widget",
       widget: MyNewWidget,
       isLintable: true,
       getStartUserInput,
       getCorrectUserInput,
       // ... scoring functions
   } satisfies WidgetExports<typeof MyNewWidget>;
   ```

5. **Implement Widget interface methods:**
   - `focus(): boolean`
   - `focusInputPath(path: FocusPath): void`
   - `blurInputPath(path: FocusPath): void`
   - `getInputPaths(): ReadonlyArray<FocusPath>`
   - `getPromptJSON?(): WidgetPromptJSON`

---

## Files Examined

- `/packages/perseus-core/src/data-schema.ts` - Widget type definitions
- `/packages/perseus-core/src/validation.types.ts` - Scoring/validation types
- `/packages/perseus/src/types.ts` - Widget interface definitions
- `/packages/perseus/src/widgets/numeric-input/numeric-input.class.tsx` - Example widget
- `/packages/perseus/src/widgets/radio/radio.ff.tsx` - Example widget (in transition)
- `/packages/perseus/src/widgets/expression/expression.tsx` - Example widget
- `/packages/perseus/src/renderer.tsx` - Props passing mechanism
- `/packages/perseus/src/widgets.ts` - Widget registration

---

**End of Research Document**
