# Widget Development Guide

## Three-Layer Type Architecture

Perseus widgets use a three-layer type system:

1. **WidgetOptions** - Widget configuration/display settings (in data-schema.ts)
2. **ValidationData** - Client-side validation data, no sensitive info (in validation.types.ts)
3. **Rubric** - Full scoring data: `ValidationData & WidgetOptions` (in validation.types.ts)

## Creating a New Widget

### 1. Directory Structure
```
packages/perseus/src/widgets/[widget-name]/
├── index.ts                           # Exports
├── [widget-name].tsx                  # Main component
├── [widget-name].test.ts              # Tests
├── [widget-name].testdata.ts          # Test data using generators
└── __docs__/
    ├── [widget-name].stories.tsx      # Storybook stories
    └── a11y.mdx                       # Accessibility docs
```

### 2. Modern Widget Implementation

```typescript
// [widget-name].tsx
import React from "react";
import type {PerseusWidgetNameUserInput} from "@khanacademy/perseus-core";

// Props are just the widget options spread directly, plus system props
type Props = {
    // Widget-specific options (from WidgetOptions)
    correctAnswer?: string;
    placeholder?: string;
    // System props
    userInput: PerseusWidgetNameUserInput;
    handleUserInput: (input: PerseusWidgetNameUserInput) => void;
    trackInteraction: () => void;
    onFocus: () => void;
    onBlur: () => void;
};

function WidgetName(props: Props) {
    const {userInput, handleUserInput} = props;

    const handleChange = (newValue: string) => {
        handleUserInput({value: newValue});
        props.trackInteraction();
    };

    return (
        <div>
            <input
                value={userInput?.value || ""}
                onChange={(e) => handleChange(e.target.value)}
                onFocus={props.onFocus}
                onBlur={props.onBlur}
                placeholder={props.placeholder}
            />
        </div>
    );
}

// IMPORTANT: Set displayName for debugging
WidgetName.displayName = "WidgetName";

// Export with WidgetExports interface
export default {
    name: "widget-name" as const,
    displayName: "Widget Display Name",
    widget: WidgetName,
    isLintable: true,

    // Optional scoring helpers (Rubric only used here, not in props!)
    getOneCorrectAnswerFromRubric: (rubric: PerseusWidgetNameRubric) => {
        return rubric.correctAnswer || null;
    },
} as WidgetExports<typeof WidgetName>;
```

### 3. Define Types in perseus-core

```typescript
// packages/perseus-core/src/data-schema.ts

// Widget configuration (what content creators set)
export type PerseusWidgetNameOptions = {
    correctAnswer?: string;
    placeholder?: string;
    static?: boolean;  // Common option for most widgets
};

// User's input
export type PerseusWidgetNameUserInput = {
    value: string;
};

// packages/perseus-core/src/validation.types.ts

// Client-side validation data (subset of options, no answers)
export type PerseusWidgetNameValidationData = {
    placeholder?: string;
};

// Full scoring data (intersection type)
export type PerseusWidgetNameRubric =
    PerseusWidgetNameValidationData &
    PerseusWidgetNameOptions;
```

### 4. Register the Widget

```typescript
// packages/perseus/src/widgets.ts
import widgetNameWidget from "./widgets/widget-name";

export const widgets = {
    // ... existing widgets
    "widget-name": widgetNameWidget,
};
```

### 5. Add Scoring Function (if scorable)

```typescript
// packages/perseus-score/src/widgets/widget-name/score-widget-name.ts
import type {
    PerseusWidgetNameUserInput,
    PerseusWidgetNameRubric,
} from "@khanacademy/perseus-core";

export function scoreWidgetName(
    userInput: PerseusWidgetNameUserInput,
    rubric: PerseusWidgetNameRubric,
): PerseusScore {
    if (userInput.value === rubric.correctAnswer) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null,
        };
    }
    return {
        type: "points",
        earned: 0,
        total: 1,
        message: null,
    };
}

// Register in widget-registry.ts
import {scoreWidgetName} from "./widget-name/score-widget-name";

widgets["widget-name"] = {
    score: scoreWidgetName,
};
```

## Important: Props Pattern

**What widgets receive as props:**
- Widget options spread directly (NOT wrapped in `options` or `rubric`)
- `userInput` - Current user state
- `handleUserInput` - State update callback
- System props (`trackInteraction`, `onFocus`, `onBlur`, etc.)

**What widgets DON'T receive:**
- `rubric` prop (only used in scoring functions)
- `scoringData` or `validationData` props
- `onChange` prop (deprecated)

## Widget State Management

### Modern Pattern (Required for new widgets)
```typescript
// Receive state via userInput
const currentValue = props.userInput?.value || "";

// Update state via handleUserInput
const handleChange = (newValue: string) => {
    props.handleUserInput({value: newValue});
    props.trackInteraction(); // Track user interaction
};
```

### NO Local State for Answers
- User answers must be stored in UserInputManager
- Local React state only for UI concerns (hover, focus, etc.)

## Testing Your Widget

### Use Test Generators
```typescript
// [widget-name].testdata.ts
import {widgetNameGenerator} from "@khanacademy/perseus-core";

export const question1 = widgetNameGenerator.build({
    correctAnswer: "42",
    placeholder: "Enter your answer",
});
```

### Test Pattern
```typescript
import {renderQuestion} from "../__tests__/renderQuestion";
import {question1} from "./widget-name.testdata";

describe("WidgetName", () => {
    it("accepts user input", async () => {
        // Arrange
        const {renderer} = renderQuestion(question1);

        // Act
        await renderer.setInputValue({
            widgetId: "widget-name 1",
            value: "42",
        });

        // Assert
        const score = renderer.score();
        expect(score).toHaveBeenAnsweredCorrectly();
    });
});
```

## Common Widget Patterns

### Multiple Inputs
```typescript
type UserInput = {
    numerator: string;
    denominator: string;
};

const handleNumeratorChange = (value: string) => {
    handleUserInput({
        ...userInput,
        numerator: value,
    });
};
```

### Validation (Optional)
```typescript
// packages/perseus-score/src/widgets/widget-name/validate-widget-name.ts
export function validateWidgetName(
    userInput: PerseusWidgetNameUserInput,
): ValidationResult {
    if (!userInput.value) {
        return {
            type: "invalid",
            message: "Please enter an answer",
        };
    }
    return {type: "valid"};
}
```

### Focus Management
```typescript
const inputRef = React.useRef<HTMLInputElement>(null);

React.useImperativeHandle(props.widgetRef, () => ({
    focus: () => inputRef.current?.focus(),
    blur: () => inputRef.current?.blur(),
}));
```

## Migration Notes

- Radio widget is transitioning (TODO(LEMS-2994))
- Numeric-input is fully modernized (good reference)
- Expression uses class component pattern (older style)
- New widgets should follow functional component pattern

## Common Pitfalls

1. **Don't expect rubric in props** - It's only for scoring
2. **Don't use onChange** - Use handleUserInput
3. **Don't forget displayName** - Required for debugging
4. **Don't store answers in local state** - Use UserInputManager
5. **Don't skip trackInteraction** - Needed for analytics
6. **Don't use cross-package relative imports** - Use @khanacademy/* aliases