# Perseus Testing Best Practices

## Test Structure

### Follow the AAA Pattern
```typescript
describe("ComponentName", () => {
    it("does something specific", () => {
        // Arrange
        const props = {...};

        // Act
        const result = doSomething(props);

        // Assert
        expect(result).toBe(expected);
    });

    it("handles user interaction", async () => {
        // Arrange, Act (when single action)
        const {container} = render(<Component />);

        // Assert
        expect(container).toMatchSnapshot();
    });
});
```

## Use Test Data Generators

Located in `packages/perseus-core/src/utils/generators/`:

```typescript
import {radioGenerator} from "@khanacademy/perseus-core";

// Generate complete widget props
const radioProps = radioGenerator.build({
    choices: ["Option A", "Option B"],
    hasNoneOfTheAbove: false,
});

// Generate multiple variants
const testCases = radioGenerator.buildMany(3);
```

## Widget Testing Patterns

### Modern Widget Pattern (with handleUserInput)
```typescript
import {renderWidget} from "../__tests__/test-utils";
import {userEvent} from "@testing-library/user-event";

it("handles user input correctly", async () => {
    // Arrange
    const handleUserInput = jest.fn();
    const user = userEvent.setup();

    renderWidget({
        widgetType: "numeric-input",
        widgetProps: numericInputGenerator.build(),
        handleUserInput,
    });

    // Act
    await user.type(screen.getByRole("textbox"), "42");

    // Assert
    expect(handleUserInput).toHaveBeenCalledWith("42");
});
```

### Legacy Widget Pattern (with onChange - avoid for new tests)
```typescript
// Only for widgets not yet migrated
const onChange = jest.fn();
render(<LegacyWidget {...props} onChange={onChange} />);
```

## Testing Priorities

1. **User interactions** - How users actually use the widget
2. **Accessibility** - Keyboard navigation, screen readers
3. **Edge cases** - Empty states, invalid input, boundaries
4. **Scoring logic** - Correct/incorrect answers
5. **Mobile behavior** - Touch interactions

## Scoring Tests

Located in `packages/perseus-score/src/widgets/[widget]/`:

```typescript
import {score} from "../score-radio";

it("scores correct answer", () => {
    const result = score(userInput, scoringData);
    expect(result).toHaveBeenAnsweredCorrectly();
});

it("validates input", () => {
    const result = validate(userInput);
    expect(result).toHaveInvalidInput("Choose an option");
});
```

## Snapshot Testing

Use sparingly, only for:
- Complex rendered output structure
- Markdown/TeX rendering
- Error messages

```typescript
it("renders complex math correctly", () => {
    const {container} = render(<MathComponent tex="\\frac{1}{2}" />);
    expect(container).toMatchSnapshot();
});
```

## Test Utilities

### Custom Matchers
```typescript
// In test files
expect(result).toHaveBeenAnsweredCorrectly();
expect(result).toHaveInvalidInput("message");
```

### Testing Library Preferences
- Use `screen` queries over container queries
- Prefer `getByRole` over `getByTestId`
- Use `userEvent` over `fireEvent`
- Wait for async operations with `waitFor`

## Common Testing Patterns

### Testing Focus Management
```typescript
it("manages focus correctly", async () => {
    const user = userEvent.setup();
    render(<Widget />);

    await user.tab();
    expect(screen.getByRole("button")).toHaveFocus();
});
```

### Testing Accessibility
```typescript
it("has accessible labels", () => {
    render(<Widget />);
    expect(screen.getByLabelText("Answer")).toBeInTheDocument();
});
```

### Testing Mobile Interactions
```typescript
it("handles touch events", async () => {
    const user = userEvent.setup();
    render(<Widget />);

    await user.pointer({keys: "[TouchA>]", target: element});
    // Assert touch-specific behavior
});
```

## What NOT to Test

- Implementation details (internal state, private methods)
- Third-party library behavior
- Static types (TypeScript handles this)
- Styles and CSS (unless functionally important)

## File Organization

```
widget-name/
├── widget-name.tsx
├── widget-name.test.ts         # Component tests
├── widget-name.testdata.ts     # Test data using generators
└── score-widget-name.test.ts   # Scoring tests (if applicable)
```