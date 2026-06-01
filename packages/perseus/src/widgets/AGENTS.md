# Widget Development Guide

## Creating a New Widget

1. **Create widget directory**: `packages/perseus/src/widgets/[widget-name]/`
2. **Implement widget files**:
   - `[widget-name].tsx` - Main component
   - `[widget-name].test.ts` - Tests
   - `index.ts` - Exports
   - `__docs__/[widget-name].stories.tsx` - Storybook story
   - `__docs__/a11y.mdx` - Accessibility documentation
3. **Register widget** in `packages/perseus/src/widgets.ts`
4. **If scorable, add scoring functions** in `packages/perseus-score/src/widgets/[widget-name]/`:
   - `score-[widget-name].ts` - Scoring logic
   - `score-[widget-name].test.ts` - Scoring tests
   - `validate-[widget-name].ts` - Input validation (optional)
   - `validate-[widget-name].test.ts` - Validation tests (optional)
5. **Register scoring** in `packages/perseus-score/src/widgets/widget-registry.ts`
6. **Add types** to `packages/perseus-core/src/data-schema.ts`

## Widget Implementation Pattern

```typescript
// Export interface following WidgetExports<T> pattern
export default {
    name: "widget-name",
    displayName: "Widget Display Name",
    widget: WidgetComponent,
    isLintable: true, // For use by the editor
} as WidgetExports<typeof WidgetComponent>;
```

## Focus Management

All widgets must implement proper focus management for accessibility.

## Common Issues & Solutions

### Math Rendering (TeX)
- Use `$...$` for inline math, `$$...$$` for display math
- For complex expressions, use `\dfrac` instead of `\frac`
- Test math rendering in different contexts (articles, exercises, hints)

### Widget State Management
- Use `useState` for local component state
- Props flow down from parent renderer
- Call `onChange` to notify parent of state changes
- Implement proper serialization for persistent state

### Mobile Considerations
- All widgets must work on mobile devices
- Support touch interactions
- Consider on-screen keypad for math inputs
- Test with different screen sizes using Storybook

### Performance Optimization
- Use `React.memo()` for expensive components
- Implement `useMemo()` for complex calculations
- Avoid unnecessary re-renders in widget hierarchies
- Profile performance with React DevTools

## Debugging Tips

### Storybook Development
- Use Storybook for isolated component development
- Test different props combinations
- Verify accessibility with Storybook a11y addon
- Check mobile layouts with device frame addon

### Console Debugging
```typescript
// Temporary debugging (remove before commit)
console.log("Widget state:", this.state);
console.log("Props received:", this.props);
```

### Error Boundaries
- Widgets are wrapped in error boundaries
- Check browser console for widget-specific errors
- Implement graceful fallbacks for failed widgets
