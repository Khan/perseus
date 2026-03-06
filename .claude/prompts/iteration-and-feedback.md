# Iteration and Feedback Guidelines

## When to Seek Human Feedback

### Always Ask When:
1. **Architectural decisions** - Choosing between different design patterns
2. **Breaking changes** - Modifications that affect external APIs
3. **Performance trade-offs** - Optimizing for speed vs. memory vs. readability
4. **Business logic ambiguity** - Multiple valid interpretations of requirements
5. **User experience changes** - Altering how users interact with features
6. **Data model changes** - Modifying core types or data structures

### Example Decision Points:
```typescript
// ASK: Which error handling approach?
// Option A: Show inline error
// Option B: Toast notification
// Option C: Modal dialog

// ASK: State management strategy?
// Option A: Local component state
// Option B: Centralized in UserInputManager
// Option C: Context provider
```

## Autonomous Iteration Patterns

### Can Iterate Without Asking:
1. **Fixing clear bugs** - Null pointer, type errors, off-by-one errors
2. **Following established patterns** - Using existing widget patterns
3. **Code formatting** - Prettier, ESLint fixes
4. **Adding missing tests** - Improving coverage for existing code
5. **Refactoring for clarity** - Extracting functions, renaming variables
6. **Performance optimizations** - When metrics clearly show improvement

### Iteration Workflow:
```typescript
// 1. Initial implementation
function calculateScore(answer: string): number {
    return answer === "42" ? 1 : 0;
}

// 2. Identify issue (too simplistic)
// Can iterate autonomously because pattern is clear

// 3. Improved implementation
function calculateScore(
    userInput: UserInput,
    rubric: Rubric,
): PerseusScore {
    const isCorrect = userInput.value === rubric.correctAnswer;
    return {
        type: "points",
        earned: isCorrect ? 1 : 0,
        total: 1,
        message: null,
    };
}
```

## Testing Feedback Loop

### Run Tests → Analyze → Fix → Repeat
```bash
# Autonomous iteration process
pnpm test widget-name

# If test fails with clear error:
# ✅ Fix autonomously

# If test fails with ambiguous requirement:
# ❌ Ask for clarification
```

### Test Failure Decision Tree:
```
Test Failure
├── Type Error → Fix autonomously
├── Assertion Failure
│   ├── Clear expectation → Fix autonomously
│   └── Business logic unclear → Ask human
├── Timeout
│   ├── Missing async/await → Fix autonomously
│   └── Performance issue → Discuss approach
└── Snapshot Mismatch
    ├── Intentional change → Update snapshot
    └── Unexpected change → Investigate cause
```

## Code Review Self-Checklist

### Before Presenting Code:
- [ ] Tests pass (`pnpm test`)
- [ ] Types check (`pnpm tsc`)
- [ ] Linted (`pnpm lint`)
- [ ] Formatted (`pnpm prettier . --write`)
- [ ] Accessibility documented
- [ ] Mobile tested (if applicable)
- [ ] Performance impact considered

### Autonomous Fixes:
```typescript
// These issues should be fixed without asking:

// ❌ Unused import (ESLint)
import {unused} from "./utils";

// ❌ Console statement (ESLint)
console.log("debug");

// ❌ Missing type (TypeScript)
function process(data) { // Should be: data: DataType

// ❌ Formatting (Prettier)
const x={a:1,b:2}; // Should be: const x = {a: 1, b: 2};
```

## Incremental Development

### Build → Test → Refine Cycle
```typescript
// Iteration 1: Basic functionality
function Widget() {
    return <input />;
}

// Iteration 2: Add user input handling (autonomous)
function Widget({userInput, handleUserInput}) {
    return (
        <input
            value={userInput.value}
            onChange={(e) => handleUserInput({value: e.target.value})}
        />
    );
}

// Iteration 3: Add validation (check pattern first)
// If validation rules are clear → implement
// If business rules unclear → ask
```

## Performance Optimization Decisions

### Autonomous Optimizations:
```typescript
// Clear performance win - optimize without asking
// Before: O(n²)
const hasDuplicate = items.some(
    (item, i) => items.slice(i + 1).includes(item)
);

// After: O(n)
const hasDuplicate = items.length !== new Set(items).size;
```

### Needs Discussion:
```typescript
// Performance vs. Readability trade-off
// Option A: Readable but slower
const result = items
    .filter(item => item.active)
    .map(item => item.value)
    .reduce((sum, val) => sum + val, 0);

// Option B: Faster but less readable
let result = 0;
for (let i = 0; i < items.length; i++) {
    if (items[i].active) result += items[i].value;
}
// ASK: Which approach aligns with team preferences?
```

## Error Handling Patterns

### Autonomous Error Handling:
```typescript
// Null checks - add without asking
function process(data?: DataType) {
    if (!data) {
        return defaultValue; // Clear fallback
    }
    // ... process data
}

// Try-catch for parsing - add without asking
try {
    const parsed = JSON.parse(userInput);
    return parsed;
} catch {
    return null; // Safe fallback
}
```

### Needs Human Input:
```typescript
// User-facing error messages
function validateInput(value: string) {
    if (!value) {
        // ASK: What message helps users best?
        // Option A: "This field is required"
        // Option B: "Please enter your answer"
        // Option C: "Answer cannot be empty"
    }
}
```

## Documentation Decisions

### Auto-document:
- Public APIs (JSDoc for complex functions)
- Accessibility requirements
- Component props
- Test scenarios

### Ask Before Documenting:
- Architecture decisions (ADRs)
- Migration guides
- Public-facing documentation
- API breaking changes

## Useful Feedback Prompts

When uncertain, use these prompts:

1. **"I see two approaches here..."** - Present options with trade-offs
2. **"The tests suggest X but the code does Y..."** - Highlight inconsistencies
3. **"This would be cleaner if..."** - Propose refactoring
4. **"I'm assuming X because..."** - Make assumptions explicit
5. **"Would you prefer..."** - Get style/pattern preferences

## Continuous Improvement

### Track Patterns:
```typescript
// When you make the same fix repeatedly, suggest:
"I notice we're frequently fixing X. Should we add a linting rule?"
"This pattern appears often. Should we create a utility function?"
"Multiple widgets need this. Should we move it to shared code?"
```

### Learn from Feedback:
- Note preference corrections
- Update approach based on feedback
- Suggest codifying patterns in documentation

## Debugging Practices

### Console Debugging
```typescript
// Temporary debugging (remove before commit)
console.log("Widget state:", state);
console.log("Props received:", props);
console.log("Calculated value:", result);

// Better: Use descriptive messages
console.log("[WidgetName] Handling user input:", userInput);
console.log("[WidgetName] Validation result:", isValid);
```

### Remember to Clean Up
- Remove ALL console statements before commit
- ESLint will catch these in pre-commit
- Use debugger statements sparingly
- Clean up TODO comments

### Error Boundaries
Perseus widgets are wrapped in error boundaries. When debugging:

1. **Check browser console** for widget-specific errors
2. **Look for error boundary messages** in the UI
3. **Implement graceful fallbacks**:
```typescript
function WidgetComponent({data}: Props) {
    if (!data || !data.required) {
        // Graceful fallback
        return <View>Unable to load widget content</View>;
    }

    try {
        return <ComplexWidget data={data} />;
    } catch (error) {
        // Log for debugging but show user-friendly message
        console.error("[WidgetName] Render error:", error);
        return <View>This content is temporarily unavailable</View>;
    }
}
```

### Storybook Development & Debugging
Use Storybook for isolated development:

1. **Test different prop combinations** - Create stories for edge cases
2. **Verify accessibility** - Use the a11y addon to catch issues
3. **Check mobile layouts** - Use device frame addon
4. **Debug interactions** - Use actions addon to log callbacks
5. **Visual debugging** - Compare component states side-by-side

```typescript
// Useful Storybook patterns for debugging
export const DebugStory = {
    args: {
        // Test with extreme values
        value: "Very long text that might break layout...",
        options: Array(100).fill("Option"),
    },
    play: async ({canvasElement}) => {
        // Automated interaction testing
        const canvas = within(canvasElement);
        const input = canvas.getByRole("textbox");
        await userEvent.type(input, "test");
    },
};
```

## Deployment & Pre-Submit Checklist

### Before Submitting PR

#### Required Checks
```bash
# 1. Run full test suite
pnpm test

# 2. Type checking
pnpm tsc
# or
pnpm build:types

# 3. Linting (with auto-fix)
pnpm lint --fix

# 4. Format code
pnpm prettier . --write

# 5. Build packages to ensure no build errors
pnpm build

# 6. Test in Storybook
pnpm storybook
```

#### Manual Verification
- [ ] Accessibility documented (new widgets need a11y.mdx)
- [ ] Mobile tested (touch interactions work)
- [ ] Performance impact assessed (no unnecessary re-renders)
- [ ] Error cases handled gracefully
- [ ] Console clear of debug statements

### Common Pre-commit Failures & Fixes

#### ESLint Failures
```typescript
// ❌ Unused imports
import {unused} from "./utils";  // Remove

// ❌ Console statements
console.log("debug");  // Remove or use proper logging

// ❌ Missing dependencies in hooks
useEffect(() => {
    doSomething(value);
}, []); // Add 'value' to dependency array

// ❌ Prefer const
let unchangedVar = 5;  // Change to const
```

#### Prettier Failures
```typescript
// Auto-fix with: pnpm prettier . --write

// Common issues:
// - Inconsistent quotes (use double quotes)
// - Missing semicolons
// - Incorrect indentation (4 spaces)
// - Line length > 80 characters
```

#### TypeScript Failures
```typescript
// ❌ Implicit any
function process(data) {}  // Add type: data: DataType

// ❌ Missing return type
function calculate(x: number) {  // Add : number
    return x * 2;
}

// ❌ Type mismatch
const value: string = 42;  // Fix type or value
```

#### Test Failures
```bash
# Run specific test to debug
pnpm test path/to/test.test.ts

# Update snapshots if changes are intentional
pnpm test -u

# Run with coverage
pnpm test --coverage
```

### Post-Submit Monitoring

After PR is merged:
1. Monitor for any reverted changes
2. Check for related bug reports
3. Watch performance metrics
4. Respond to code review feedback

### Rollback Preparation

Be prepared to revert if issues arise:
```bash
# Create revert PR if needed
git revert <commit-hash>
git push origin revert-branch
# Create PR with explanation of issue
```