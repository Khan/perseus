# Widget Development Guide

To create a new widget, read `new-widget.md` in this directory.

## Widget Implementation Pattern

Widgets are defined by creating an object that conforms to the `WidgetExports<T>` interface. The widget component (`widget` key in the export) must be implemented as a **functional component**.

```typescript
// Export interface following WidgetExports<T> pattern
export default {
    name: "widget-name",
    displayName: "Widget Display Name",
    widget: WidgetComponent,
    isLintable: true, // For use by the editor
} satisfies WidgetExports<typeof WidgetComponent>;
```

## Common Issues & Solutions

### Widget State Management
- Use `useState` or `useReducer` for local UI state that doesn't represent user input
- User input state must not be stored locally — emit changes via `handleUserInput` and receive state via the `userInput` prop
- The props type should be derived from `WidgetProps<...>` and the widget options type in `data-schema.ts`
- `getSerializedState` is deprecated

### Mobile Considerations
- All widgets must work on mobile devices
- Support touch interactions
- Consider on-screen keypad for math inputs
- Test with different screen sizes using Storybook

## Development Tips

### Storybook Development
- Use Storybook for isolated component development
- Test different props combinations
- Verify accessibility with Storybook a11y addon
- Check mobile layouts with device frame addon
- Create visual regression stories (`*-initial-state-regression.stories.tsx`
  and `*-interactions-regression.stories.tsx`) with `"!autodocs"` and `"!manifest"` tags for Chromatic

### Error Boundaries
- Widgets are wrapped in error boundaries by their parent component (`WidgetContainer`)
- Check browser console for widget-specific errors
