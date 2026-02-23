# Component Development Best Practices

## Component Structure

### Prefer Functional Components
```typescript
// ✅ Good - Named function
function ComponentName(props: Props) {
    return <div>{props.content}</div>;
}
ComponentName.displayName = "ComponentName"; // Explicit for debugging

// ❌ Avoid - Arrow function requires displayName
const ComponentName = (props: Props) => {
    return <div>{props.content}</div>;
};
ComponentName.displayName = "ComponentName"; // Extra step
```

### Type Definitions
```typescript
// Place types at the top of the file
type Props = {
    content: string;
    onAction: () => void;
    optional?: boolean;
};

// For complex props, use intersection types
type Props = BaseProps & {
    specificProp: string;
};
```

## Wonder Blocks Integration

Perseus uses Khan Academy's Wonder Blocks design system:

```typescript
import {View} from "@khanacademy/wonder-blocks-core";
import {Button} from "@khanacademy/wonder-blocks-button";
import {TextField} from "@khanacademy/wonder-blocks-form";
import {LabelMedium} from "@khanacademy/wonder-blocks-typography";

function MyComponent() {
    return (
        <View>
            <LabelMedium>Label text</LabelMedium>
            <TextField
                value={value}
                onChange={handleChange}
                placeholder="Enter text"
            />
            <Button onClick={handleClick}>
                Submit
            </Button>
        </View>
    );
}
```

## State Management Patterns

### Component State (UI only)
```typescript
// Local state for UI concerns only
function Component() {
    const [isExpanded, setIsExpanded] = React.useState(false);
    const [hoveredIndex, setHoveredIndex] = React.useState<number | null>(null);

    // User answer state goes through handleUserInput, not local state!
}
```

### Derived State
```typescript
// Calculate values instead of storing them
function Component({items, filter}: Props) {
    // ✅ Good - Derived from props
    const filteredItems = React.useMemo(
        () => items.filter(item => item.matches(filter)),
        [items, filter]
    );

    // ❌ Bad - Duplicating prop data in state
    const [filteredItems, setFilteredItems] = React.useState([]);
    React.useEffect(() => {
        setFilteredItems(items.filter(...));
    }, [items, filter]);
}
```

## Performance Optimization

### Memoization
```typescript
// Memoize expensive calculations
const expensiveValue = React.useMemo(() => {
    return computeExpensiveValue(data);
}, [data]);

// Memoize callbacks passed to children
const handleClick = React.useCallback(() => {
    doSomething(value);
}, [value]);

// Memoize component when props comparison is cheaper than re-render
const MemoizedChild = React.memo(ChildComponent);
```

### Avoid Inline Objects/Functions
```typescript
// ❌ Bad - Creates new object every render
<Component style={{margin: 10}} />

// ✅ Good - Stable reference
const style = {margin: 10};
<Component style={style} />

// Or use Wonder Blocks styling
<View marginTop={10}>
```

## Accessibility

### ARIA Labels
```typescript
<input
    aria-label="Answer"
    aria-describedby="hint-text"
    aria-invalid={hasError}
/>
```

### Focus Management
```typescript
function Component() {
    const inputRef = React.useRef<HTMLInputElement>(null);

    // Auto-focus on mount when appropriate
    React.useEffect(() => {
        if (shouldAutoFocus) {
            inputRef.current?.focus();
        }
    }, [shouldAutoFocus]);

    return <input ref={inputRef} />;
}
```

### Keyboard Navigation
```typescript
function handleKeyDown(e: React.KeyboardEvent) {
    switch (e.key) {
        case "Enter":
            submitAnswer();
            break;
        case "Escape":
            clearInput();
            break;
        case "ArrowUp":
            selectPrevious();
            e.preventDefault(); // Prevent scroll
            break;
    }
}
```

## Error Handling

### Error Boundaries
```typescript
// Components are wrapped by error boundaries
// Provide meaningful error states
function Component({data}: Props) {
    if (!data) {
        return <View>No data available</View>;
    }

    try {
        return <ComplexComponent data={data} />;
    } catch (error) {
        return <View>Failed to render content</View>;
    }
}
```

## Mobile Support

### Touch-Friendly Interfaces
```typescript
// Use Wonder Blocks components (mobile-optimized)
import {Button} from "@khanacademy/wonder-blocks-button";

// Ensure touch targets are at least 44x44px
<Button size="large" onClick={handleClick}>
    Tap me
</Button>
```

### Responsive Layout
```typescript
import {useIsMobile} from "../hooks/use-is-mobile";

function Component() {
    const isMobile = useIsMobile();

    return (
        <View flexDirection={isMobile ? "column" : "row"}>
            {/* Content adapts to screen size */}
        </View>
    );
}
```

## Component Organization

### File Structure
```typescript
// component-name.tsx

// 1. Imports
import React from "react";
import {View} from "@khanacademy/wonder-blocks-core";

// 2. Type definitions
type Props = {
    // ...
};

// 3. Constants
const DEFAULT_VALUE = "";

// 4. Main component
function ComponentName(props: Props) {
    // ...
}

// 5. Display name
ComponentName.displayName = "ComponentName";

// 6. Sub-components (if needed)
function SubComponent() {
    // ...
}

// 7. Export
export default ComponentName;
```

### Props Patterns
```typescript
// Destructure common props
function Component({
    userInput,
    handleUserInput,
    trackInteraction,
    ...restProps
}: Props) {
    // Use restProps for pass-through
    return <InnerComponent {...restProps} />;
}
```

## Testing Components

### Render Testing
```typescript
import {render, screen} from "@testing-library/react";
import {userEvent} from "@testing-library/user-event";

it("handles interaction", async () => {
    const user = userEvent.setup();
    const onClick = jest.fn();

    render(<Component onClick={onClick} />);
    await user.click(screen.getByRole("button"));

    expect(onClick).toHaveBeenCalled();
});
```

### Snapshot Testing (use sparingly)
```typescript
it("renders complex structure", () => {
    const {container} = render(<ComplexComponent {...props} />);
    expect(container).toMatchSnapshot();
});
```

## Common Patterns

### Conditional Rendering
```typescript
// Simple conditions
{showHint && <HintComponent />}

// Multiple conditions
{(() => {
    if (loading) return <Spinner />;
    if (error) return <ErrorMessage />;
    return <Content />;
})()}
```

### Lists and Keys
```typescript
{items.map((item, index) => (
    <ItemComponent
        key={item.id || `item-${index}`}  // Prefer stable IDs
        item={item}
        onSelect={() => handleSelect(item.id)}
    />
))}
```

## Anti-Patterns to Avoid

1. **Don't mutate props or state directly**
2. **Don't use array index as key when list can reorder**
3. **Don't put business logic in components** - Keep in utilities
4. **Don't use inline styles** - Use Wonder Blocks or CSS modules
5. **Don't forget React.memo for expensive child components**
6. **Don't use useEffect for derived state** - Use useMemo instead