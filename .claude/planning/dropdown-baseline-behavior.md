# Dropdown Widget - Current Behavior Baseline
## Document created: 2025-12-09

This document captures the current behavior of the Dropdown widget **before** conversion to a functional component. This baseline will be used to verify that the conversion maintains all functionality.

---

## Component Structure

### Class Component Details
- **Type:** React class component
- **File:** `packages/perseus/src/widgets/dropdown/dropdown.tsx`
- **Lines of code:** ~202 lines
- **Implements:** `Widget` interface from `../../types`
- **Context:** Uses `PerseusI18nContext` via `static contextType`
- **HOC Wrapper:** Wrapped with `withDependencies` HOC for analytics injection

### State Management
- **Local state:** NONE - Component is fully props-driven
- **Props received:** All state comes from parent via props
- **State updates:** Calls `this.props.handleUserInput()` to notify parent

---

## Instance Methods

### Public Methods (Widget Interface)

#### 1. `focus(): boolean`
```typescript
focus: () => boolean = () => {
    // TODO(LP-10797): This focus() call doesn't do anything because our
    // root element is a <div> and that cannot be focused without a
    // tabIndex.
    // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'focus' does not exist on type 'Element | Text'.
    ReactDOM.findDOMNode(this).focus();
    return true;
};
```
- **Purpose:** Attempt to focus the widget
- **Current behavior:** Doesn't work (known issue LP-10797)
- **Implementation:** Uses deprecated `ReactDOM.findDOMNode()`
- **Return value:** Always returns `true` (regardless of actual focus)
- **Issue:** Tries to focus a non-focusable `<div>` element

#### 2. `getPromptJSON(): DropdownPromptJSON`
```typescript
getPromptJSON(): DropdownPromptJSON {
    return _getPromptJSON(this.props);
}
```
- **Purpose:** Generate AI-friendly representation of the dropdown prompt
- **Implementation:** Delegates to utility function from widget-ai-utils
- **Input:** Current props
- **Output:** JSON object representing the dropdown for AI

#### 3. `getSerializedState(): any` (DEPRECATED)
```typescript
getSerializedState(): any {
    const {userInput, choices, ...rest} = this.props;
    return {
        ...rest,
        choices: choices.map((choice) => choice.content),
        selected: userInput.value,
    };
}
```
- **Status:** DEPRECATED (LEMS-3185)
- **Warning:** "likely very broken API" - do not trust serializedState
- **Purpose:** Legacy serialization (being kept for backwards compatibility)
- **Behavior:** Returns object with choices as strings and selected value

### Private Methods (Event Handlers)

#### 4. `_handleChangeEvent(e: React.ChangeEvent<HTMLInputElement>): void`
```typescript
_handleChangeEvent: (arg1: React.ChangeEvent<HTMLInputElement>) => void = (
    e,
) => {
    this._handleChange(parseInt(e.target.value));
};
```
- **Purpose:** Parse DOM change event from input element
- **Current usage:** NOT USED in current implementation
- **Note:** Appears to be leftover code from previous implementation
- **Behavior:** Parses event value to integer and calls `_handleChange`

#### 5. `_handleChange(selected: number): void`
```typescript
_handleChange: (arg1: number) => void = (selected) => {
    this.props.trackInteraction();
    this.props.handleUserInput({value: selected});
};
```
- **Purpose:** Handle dropdown selection change
- **Called by:** SingleSelect's onChange prop (line 149-151)
- **Behavior:**
  1. Calls `trackInteraction()` to record analytics
  2. Calls `handleUserInput()` with new value
- **Input:** Selected choice index (1-based, 0 is placeholder)

---

## Lifecycle Methods

### `componentDidMount(): void`
```typescript
componentDidMount(): void {
    this.props.dependencies.analytics.onAnalyticsEvent({
        type: "perseus:widget:rendered:ti",
        payload: {
            widgetSubType: "null",
            widgetType: "dropdown",
            widgetId: this.props.widgetId,
        },
    });
}
```
- **Purpose:** Fire analytics event when widget first renders
- **Event type:** `"perseus:widget:rendered:ti"`
- **Payload:** Widget type, subtype, and ID
- **Dependency:** Requires `dependencies.analytics` from props

---

## Props Interface

### Type Definition
```typescript
type Props = WidgetProps<
    PerseusDropdownWidgetOptions,
    PerseusDropdownUserInput
> & {
    dependencies: PerseusDependenciesV2;
};
```

### Required Props (from WidgetProps)
- `choices: Array<{content: string, correct: boolean}>` - Dropdown options
- `placeholder: string` - Placeholder text shown before selection
- `apiOptions: ApiOptions` - Configuration options
- `userInput: {value: number}` - Current selected value (0 = placeholder)
- `trackInteraction: () => void` - Callback to track user interaction
- `handleUserInput: (input: PerseusDropdownUserInput) => void` - Update state
- `dependencies: PerseusDependenciesV2` - Analytics and other dependencies

### Optional Props
- `visibleLabel?: string` - Label displayed above dropdown
- `ariaLabel?: string` - ARIA label for accessibility
- `static?: boolean` - Whether widget is in static/preview mode
- `widgetId?: string` - Unique identifier for this widget instance

### Default Props
```typescript
static defaultProps: DefaultProps = {
    choices: [],
    placeholder: "",
    apiOptions: ApiOptions.defaults,
    userInput: {value: 0},
};
```

---

## Render Behavior

### JSX Structure
```
<Id>                              // Wonder Blocks HOC for unique IDs
  {(dropdownId) => (
    <View>                        // Container with event handlers
      {visibleLabel && (
        <LabelLarge>              // Optional visible label
      )}
      <SingleSelect>              // Main dropdown component
        <OptionItem>              // Placeholder (value="0", disabled)
        <OptionItem>              // Choice 1 (value="1")
        <OptionItem>              // Choice 2 (value="2")
        ...
      </SingleSelect>
    </View>
  )}
</Id>
```

### Key Rendering Details

1. **ID Generation:** Uses Wonder Blocks `<Id>` component with render prop pattern
2. **Event Propagation:** Stops click and touch events to prevent zoom in tables
3. **Placeholder:** Always first option, disabled, value="0"
4. **Choices:** Mapped from `props.choices` with 1-based indexing (value="1", "2", ...)
5. **Content Rendering:** Uses `<Renderer>` for math/markdown in labels
6. **Label Handling:** Both visual label and text-only labelAsText for accessibility
7. **ARIA Label:** Falls back through: ariaLabel → visibleLabel → i18n "Select an answer"
8. **Disabled State:** Respects `apiOptions.readOnly`

---

## Dependencies

### External Packages
- `@khanacademy/wonder-blocks-core` - View, Id
- `@khanacademy/wonder-blocks-dropdown` - SingleSelect, OptionItem
- `@khanacademy/wonder-blocks-typography` - LabelLarge
- `react` - Core React
- `react-dom` - For findDOMNode (deprecated usage)

### Internal Imports
- `../../components/i18n-context` - PerseusI18nContext
- `../../components/with-dependencies` - withDependencies HOC
- `../../perseus-api` - ApiOptions
- `../../renderer` - Renderer component for content
- `../../widget-ai-utils/dropdown/dropdown-ai-utils` - getPromptJSON utility
- `../../types` - Widget interface, WidgetExports, etc.
- `@khanacademy/perseus-core` - Type definitions

---

## Context Usage

### PerseusI18nContext
```typescript
static contextType = PerseusI18nContext;
declare context: React.ContextType<typeof PerseusI18nContext>;
```
- **Accessed via:** `this.context`
- **Used for:**
  - `this.context.strings` - Passed to Renderer components
  - `this.context.strings.selectAnAnswer` - Default ARIA label

---

## Export Structure

### Default Export (WidgetExports)
```typescript
export default {
    name: "dropdown",
    displayName: "Drop down",
    widget: WrappedDropdown,
    getStartUserInput,
    getCorrectUserInput,
    getUserInputFromSerializedState,
} satisfies WidgetExports<typeof WrappedDropdown>;
```

### Helper Functions

#### `getStartUserInput(): PerseusDropdownUserInput`
- Returns: `{value: 0}` (placeholder selected)
- Purpose: Initial state when dropdown is first created

#### `getCorrectUserInput(options): PerseusDropdownUserInput`
- Returns: `{value: index + 1}` where index is first correct choice
- Purpose: Get the correct answer for validation

#### `getUserInputFromSerializedState(serializedState): PerseusDropdownUserInput` (DEPRECATED)
- Returns: `{value: serializedState.selected}`
- Purpose: Deserialize legacy state (LEMS-3185 - don't trust)

---

## Known Issues

### LP-10797: Focus doesn't work
- **Location:** `focus()` method (lines 61-68)
- **Issue:** Uses deprecated `ReactDOM.findDOMNode()` on non-focusable div
- **Impact:** Widget cannot receive programmatic focus
- **To be fixed:** In Phase 3 of conversion plan

### LEMS-3185: Deprecated serialization
- **Location:** `getSerializedState()` method (lines 89-96)
- **Issue:** Serialization API is broken and unreliable
- **Status:** Marked deprecated, keeping for backwards compatibility
- **Plan:** Keep as-is in functional conversion

---

## Accessibility Features

### Current Accessibility Support
- ✅ ARIA label with fallback chain
- ✅ Proper label association via htmlFor
- ✅ Text-only labels for screen readers (labelAsText)
- ✅ Disabled state properly conveyed
- ✅ Keyboard navigation (via SingleSelect)
- ❌ Programmatic focus (broken - LP-10797)

---

## Analytics Events

### Widget Rendered Event
- **Trigger:** componentDidMount
- **Event type:** `"perseus:widget:rendered:ti"`
- **Payload:**
  ```typescript
  {
      widgetSubType: "null",
      widgetType: "dropdown",
      widgetId: this.props.widgetId,
  }
  ```

### User Interaction Tracking
- **Trigger:** `_handleChange()` calls `trackInteraction()`
- **When:** Every time user selects a different option

---

## Test Coverage

### Test Files
1. `packages/perseus/src/widgets/dropdown/dropdown.test.ts` - Main unit tests
2. `packages/perseus/src/widgets/dropdown/serialize-dropdown.test.ts` - Legacy serialization tests

### Test Status
- **To be run:** Task 1.4 will establish baseline pass/fail counts

---

## CSS Classes

### Applied Classes
- `.perseus-dropdown` - Main dropdown component class

### CSS File
- `packages/perseus/src/styles/widgets/dropdown.css`

---

## Conversion Notes

### What Must Be Preserved
1. ✅ All props handling (including defaults)
2. ✅ Analytics event on mount
3. ✅ Change handler behavior
4. ✅ ARIA label fallback logic
5. ✅ Event propagation stopping for table zoom
6. ✅ Renderer usage for math/markdown
7. ✅ Widget interface methods (focus, getPromptJSON)
8. ✅ Deprecated methods (for backwards compatibility)
9. ✅ withDependencies wrapper for analytics

### What Will Change
1. 🔄 Class → Functional component
2. 🔄 `static contextType` → `useContext` hook
3. 🔄 `componentDidMount` → `useEffect` hook
4. 🔄 Instance methods → Function-scoped handlers
5. 🔄 `this.props` → Direct props or destructured
6. 🔄 `this.context` → context from useContext
7. 🔄 Widget interface → `forwardRef` + `useImperativeHandle`
8. 🔄 Deprecated `findDOMNode` → Proper ref forwarding

---

**Baseline established:** 2025-12-09
**Ready for conversion:** After completing Phase 1 tasks