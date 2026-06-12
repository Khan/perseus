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

Widgets must be implemented as **functional components**.

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

### Widget State Management
- Use `useState` or `useReducer` for local UI state that doesn't represent user input
- User input state must not be stored locally — emit changes via `onChange` and receive state via the `userInput` prop
- The props type should be derived from `WidgetProps<...>` and the widget options type in `data-schema.ts`

### Mobile Considerations
- All widgets must work on mobile devices
- Support touch interactions
- Consider on-screen keypad for math inputs
- Test with different screen sizes using Storybook

## Debugging Tips

### Storybook Development
- Use Storybook for isolated component development
- Test different props combinations
- Verify accessibility with Storybook a11y addon
- Check mobile layouts with device frame addon

### Error Boundaries
- Widgets are wrapped in error boundaries by their parent component
- Check browser console for widget-specific errors
