# Math and Content Rendering

## Math Rendering (TeX)

### Basic Syntax
- **Inline math**: Use `$...$` for math within text
  - Example: `The answer is $x = 42$`
- **Display math**: Use `$$...$$` for centered, standalone equations
  - Example: `$$\int_0^\infty e^{-x^2} dx = \frac{\sqrt{\pi}}{2}$$`

### Complex Expressions

#### Fractions
```latex
// ✅ Good - Use \dfrac for display-style fractions
$$\dfrac{a+b}{c+d}$$

// ❌ Avoid - \frac can be too small in complex expressions
$$\frac{a+b}{c+d}$$

// For inline, \frac is acceptable
The fraction $\frac{1}{2}$ is equivalent to 0.5
```

#### Common Patterns
```latex
// Aligned equations
\begin{align}
x + y &= 10 \\
2x - y &= 5
\end{align}

// Matrices
\begin{bmatrix}
a & b \\
c & d
\end{bmatrix}

// Cases
f(x) = \begin{cases}
x^2 & \text{if } x > 0 \\
0 & \text{otherwise}
\end{cases}
```

### Testing Math Rendering

Test math in different contexts:
1. **Articles** - Both inline and display math
2. **Exercise questions** - Main problem statement
3. **Hints** - Step-by-step solutions
4. **Answer choices** - In radio/multiple choice widgets
5. **Feedback messages** - Correct/incorrect explanations

### MathJax Configuration

Perseus uses MathJax for rendering. Key points:
- Automatic equation numbering disabled
- Custom macros available (check `math-input` package)
- Accessibility features enabled (screen reader support)

### Common Math Issues

#### Issue: Math not rendering
```typescript
// ❌ Problem: Unescaped backslashes
const tex = "The answer is $\frac{1}{2}$";

// ✅ Solution: Escape or use raw strings
const tex = "The answer is $\\frac{1}{2}$";
const tex = String.raw`The answer is $\frac{1}{2}$`;
```

#### Issue: Spacing problems
```latex
// Add manual spacing when needed
$x\,\text{cm}$     // Thin space
$x\ \text{units}$  // Normal space
$x\quad\text{m}$   // Quad space
```

## Content Structure

### Perseus Content Format
```json
{
    "question": {
        "content": "What is $2 + 2$?",
        "widgets": {
            "numeric-input 1": {
                "type": "numeric-input",
                "options": {
                    "answers": [{
                        "value": 4,
                        "status": "correct"
                    }]
                }
            }
        }
    },
    "hints": [
        {"content": "Think about counting on your fingers."},
        {"content": "The answer is $4$."}
    ]
}
```

### Widget References

Widgets are referenced in content using special syntax:
```markdown
Enter your answer: [[☃ numeric-input 1]]

Choose the correct option: [[☃ radio 1]]
```

The snowman character (☃) is used as a unique delimiter.

### Markdown Extensions

Perseus extends standard Markdown:

#### Columns
```markdown
::: columns
::: column
Left column content
:::
::: column
Right column content
:::
:::
```

#### Callout Boxes
```markdown
::: callout
**Important:** This is a callout box.
:::
```

#### Images with Alignment
```markdown
![Description](url.png){: .align-right}
```

## Content Validation

### Linting Rules

The `perseus-linter` package enforces:
- Valid widget references
- Proper math syntax
- Accessible image alt text
- No broken links
- Consistent formatting

### Running the Linter
```bash
pnpm --filter perseus-linter lint-content content.json
```

## Accessibility in Content

### Math Accessibility
- All math automatically gets ARIA labels
- MathJax provides screen reader support
- Test with screen readers for complex expressions

### Image Guidelines
```markdown
// ✅ Good - Descriptive alt text
![Graph showing linear growth from 0 to 100 over 10 years](graph.png)

// ❌ Bad - Generic or missing alt text
![Graph](graph.png)
![](graph.png)
```

### Widget Labels
```typescript
// Ensure widgets have proper labels
<TextField
    aria-label="Enter the x-coordinate"
    placeholder="x-coordinate"
/>
```

## Performance Considerations

### Math Rendering Performance
- Initial render can be slow for many expressions
- Use `React.memo` for components with static math
- Consider pagination for content with 50+ expressions

### Content Loading
- Large exercises should lazy-load hints
- Images should have width/height to prevent reflow
- Preload critical assets

## Testing Content Rendering

### Unit Tests
```typescript
it("renders math expressions correctly", () => {
    const {container} = render(
        <Renderer content="The answer is $x = 42$" />
    );

    // MathJax adds specific classes
    expect(container.querySelector(".katex")).toBeInTheDocument();
});
```

### Visual Regression Tests
- Use Storybook for visual testing
- Snapshot complex math layouts
- Test responsive behavior

### Manual Testing Checklist
- [ ] Math renders correctly
- [ ] Widgets display properly
- [ ] Images load and align correctly
- [ ] Content is responsive on mobile
- [ ] Screen reader announces math properly
- [ ] Print view works correctly

## Common Content Patterns

### Exercise with Multiple Parts
```json
{
    "question": {
        "content": "Solve the system of equations:\n\n$$\\begin{align}x + y &= 10\\\\2x - y &= 5\\end{align}$$\n\nWhat is $x$? [[☃ numeric-input 1]]\n\nWhat is $y$? [[☃ numeric-input 2]]"
    }
}
```

### Article with Interactive Elements
```markdown
# Understanding Quadratics

The standard form of a quadratic equation is $ax^2 + bx + c = 0$.

Try adjusting the parameters below:

[[☃ interactive-graph 1]]

Notice how changing $a$ affects the parabola's shape.
```

## Debugging Tips

### Math Not Rendering
1. Check browser console for MathJax errors
2. Verify TeX syntax is valid
3. Ensure proper escaping in strings
4. Check for conflicting CSS

### Widget Not Appearing
1. Verify widget ID matches reference
2. Check widget is registered
3. Ensure widget data is valid
4. Look for error boundaries in console

### Content Layout Issues
1. Inspect element for CSS conflicts
2. Check responsive breakpoints
3. Verify image dimensions
4. Test with different viewport sizes