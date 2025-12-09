# Phase 4: Testing & Validation
## Dropdown Widget Conversion - Comprehensive Testing

**Phase Status:** [ ] Not Started | [ ] In Progress | [ ] Complete
**Estimated Complexity:** Medium
**Dependencies:** Phases 1-3 Complete

---

## Overview

This phase performs thorough testing of the converted dropdown widget to ensure it works identically to the class component version. We'll run automated tests, perform manual testing in Storybook, verify accessibility, and test edge cases.

**Testing Philosophy:** The conversion should be invisible to users. All functionality, behavior, and interactions should remain exactly the same.

---

## Pre-Phase Checklist

Before starting this phase, ensure:
- [ ] Phase 3 is complete
- [ ] Focus management is fixed
- [ ] Basic tests pass
- [ ] Component compiles without errors

---

## Tasks Checklist

### Task 4.1: Run Complete Test Suite
**Status:** [ ] Complete

Run all dropdown widget tests and verify they pass.

**Commands:**
```bash
# Run all dropdown tests with verbose output
pnpm test packages/perseus/src/widgets/dropdown --verbose

# Run with coverage to see test coverage
pnpm test packages/perseus/src/widgets/dropdown --coverage
```

**Expected Results:**
```
PASS packages/perseus/src/widgets/dropdown/dropdown.test.ts
  ✓ Test 1
  ✓ Test 2
  ...

PASS packages/perseus/src/widgets/dropdown/serialize-dropdown.test.ts
  ✓ Test 1
  ...

Test Suites: 2 passed, 2 total
Tests: XX passed, XX total
Snapshots: X passed, X total
Coverage: [should be similar to baseline]
```

**What to Check:**
- All test suites pass
- Test count matches baseline from Phase 1
- No new failures introduced
- Coverage percentage maintained or improved

**If Tests Fail:**
For each failure:
1. Document test name and error message
2. Investigate root cause
3. Fix the issue
4. Re-run tests
5. Update session notes

**Success Criteria:**
- All tests pass
- Test count matches baseline
- Coverage maintained

---

### Task 4.2: Analyze Test Coverage
**Status:** [ ] Complete

Review test coverage to ensure conversion didn't miss anything.

**Review Coverage Report:**
Look at coverage output from Task 4.1, focusing on:
- Statement coverage: Should be ~90%+
- Branch coverage: Check all conditionals tested
- Function coverage: All functions called in tests
- Line coverage: Most lines executed

**Key Areas to Verify Covered:**
- [ ] useContext hook (i18n strings used)
- [ ] useEffect hook (analytics fired)
- [ ] handleChange function
- [ ] handleChangeEvent function
- [ ] focus() method via useImperativeHandle
- [ ] getPromptJSON() method
- [ ] getSerializedState() method
- [ ] Render with placeholder
- [ ] Render with choices
- [ ] Render with visibleLabel
- [ ] Render with math in choices
- [ ] Disabled state
- [ ] Selected state

**Success Criteria:**
- Coverage similar to or better than baseline
- No major gaps in coverage
- All new code paths tested

---

### Task 4.3: Test in Storybook - Basic Functionality
**Status:** [ ] Complete

Manually test basic dropdown functionality in Storybook.

**Start Storybook:**
```bash
pnpm storybook
```

**Navigate to:** Widgets > Dropdown

**Test Cases:**

#### Story 1: Basic Dropdown
- [ ] Dropdown renders with placeholder
- [ ] Can click to open dropdown
- [ ] Options display correctly
- [ ] Can select an option
- [ ] Selected option displays in dropdown
- [ ] Dropdown closes after selection

#### Story 2: Dropdown with Math
- [ ] Math expressions render correctly in options
- [ ] LaTeX formatting displays properly
- [ ] Can select math option
- [ ] No rendering errors in console

#### Story 3: Dropdown with Visible Label
- [ ] Label displays above dropdown
- [ ] Label text is correct
- [ ] Label is associated with dropdown (htmlFor)
- [ ] Clicking label doesn't trigger dropdown

#### Story 4: Inline Dropdown
- [ ] Dropdown renders inline in article
- [ ] Styling looks correct
- [ ] Interaction works in article context

**Success Criteria:**
- All stories render correctly
- No console errors
- Interactions work as expected
- Visual appearance unchanged

---

### Task 4.4: Test in Storybook - Edge Cases
**Status:** [ ] Complete

Test edge cases and unusual scenarios.

**Test Cases:**

#### Empty/Invalid States
- [ ] Empty choices array - component doesn't crash
- [ ] Empty placeholder - uses default or shows blank
- [ ] No selected value - shows placeholder
- [ ] Invalid selected value (e.g., -1, 999) - handles gracefully

#### Disabled States
- [ ] `readOnly` prop - dropdown is disabled
- [ ] `static` prop - dropdown is disabled
- [ ] Disabled dropdown shows current selection
- [ ] Cannot open disabled dropdown
- [ ] Proper visual styling for disabled state

#### Long Content
- [ ] Long choice text - wraps or truncates properly
- [ ] Many choices (20+) - scrollable dropdown
- [ ] Long placeholder text - fits in dropdown width

#### Special Characters
- [ ] Choices with special HTML characters (&, <, >, etc.)
- [ ] Choices with emoji - renders correctly
- [ ] Choices with unicode - no mojibake

**Success Criteria:**
- No crashes or errors
- Edge cases handled gracefully
- Consistent with class component behavior

---

### Task 4.5: Test Analytics Events
**Status:** [ ] Complete

Verify analytics events fire correctly.

**Test Method:**
Open browser DevTools console and monitor analytics events.

**Setup:**
1. Open Storybook
2. Open browser DevTools (F12)
3. Go to Console tab
4. Add console log in analytics handler (if needed) or use existing logging

**Events to Verify:**

#### Render Event (componentDidMount)
- [ ] Event fires on initial render
- [ ] Event type: `"perseus:widget:rendered:ti"`
- [ ] Payload includes:
  - `widgetType: "dropdown"`
  - `widgetSubType: "null"`
  - `widgetId: [correct ID]`
- [ ] Event fires only once per mount
- [ ] Does NOT fire on re-renders

#### Change Event (if tracked)
Check if change events are tracked (might be in onChange handler):
- [ ] Event fires on selection change
- [ ] Event includes correct data

**Success Criteria:**
- Analytics events fire at correct times
- Event payloads are correct
- No duplicate events
- No missing events

---

### Task 4.6: Test Accessibility - Keyboard Navigation
**Status:** [ ] Complete

Thoroughly test keyboard navigation and interaction.

**Keyboard Test Flow:**

#### Focus and Open
1. Tab to dropdown
   - [ ] Focus visible (outline/ring)
   - [ ] Screen reader announces dropdown
2. Press Enter
   - [ ] Dropdown opens
   - [ ] Options visible
3. Press Space (if dropdown closed)
   - [ ] Dropdown opens

#### Navigate Options
4. Arrow Down
   - [ ] Moves to next option
   - [ ] Visual highlight follows
   - [ ] Screen reader announces option
5. Arrow Up
   - [ ] Moves to previous option
   - [ ] Works correctly at boundaries
6. Home key (if supported)
   - [ ] Jumps to first option
7. End key (if supported)
   - [ ] Jumps to last option

#### Select and Close
8. Press Enter on option
   - [ ] Selects option
   - [ ] Dropdown closes
   - [ ] Focus returns to dropdown
9. Press Escape
   - [ ] Dropdown closes without selection
   - [ ] Focus returns to dropdown

#### Tab Navigation
10. Tab away from dropdown
    - [ ] Dropdown closes (if open)
    - [ ] Focus moves to next element
11. Shift+Tab back
    - [ ] Focus returns to dropdown

**Success Criteria:**
- All keyboard interactions work
- No keyboard traps
- Focus always visible
- Matches standard dropdown UX

---

### Task 4.7: Test Accessibility - Screen Reader
**Status:** [ ] Complete

Test with a screen reader to ensure proper announcements.

**Screen Readers:**
- macOS: VoiceOver (Cmd+F5)
- Windows: NVDA (free) or JAWS
- Chrome: ChromeVox extension

**Test Flow:**

#### Initial Render
- [ ] Screen reader announces "dropdown" or "combobox"
- [ ] Announces current selection or placeholder
- [ ] Announces label if present

#### Navigating To Dropdown
- [ ] Tab to dropdown
- [ ] Announces role (dropdown/combobox)
- [ ] Announces label or aria-label
- [ ] Announces current value

#### Opening Dropdown
- [ ] Press Enter/Space to open
- [ ] Announces "expanded" or similar
- [ ] May announce number of options

#### Navigating Options
- [ ] Arrow keys move through options
- [ ] Each option is announced
- [ ] Option content read correctly (including math text)
- [ ] Current position announced (e.g., "3 of 5")

#### Selecting Option
- [ ] Press Enter on option
- [ ] Announces selection made
- [ ] Announces new value

**ARIA Attributes to Verify:**
- [ ] `role="combobox"` or appropriate role
- [ ] `aria-label` present and meaningful
- [ ] `aria-expanded` changes with dropdown state
- [ ] `aria-selected` on selected option
- [ ] `aria-activedescendant` for current option (if used)

**Success Criteria:**
- All content accessible to screen reader
- Announces state changes
- No missing or incorrect announcements
- Math content has text alternative

---

### Task 4.8: Test Mobile Interactions
**Status:** [ ] Complete

Test touch interactions and mobile-specific behavior.

**Testing Methods:**
1. **Browser DevTools Device Emulation:**
   - Open DevTools (F12)
   - Click device toolbar icon
   - Select mobile device (e.g., iPhone 12)

2. **Real Device (if available):**
   - Access Storybook on mobile device
   - Test with actual touch

**Mobile Test Cases:**

#### Touch Interactions
- [ ] Tap to open dropdown
- [ ] Tap option to select
- [ ] Tap outside to close
- [ ] Touch event propagation prevented (zoomable tables)

#### Visual Layout
- [ ] Dropdown width appropriate for mobile
- [ ] Text readable on small screen
- [ ] Options visible and tappable
- [ ] No horizontal scrolling

#### Mobile Safari Specific
- [ ] Dropdown works on iOS
- [ ] No double-tap issues
- [ ] Virtual keyboard behaves correctly

#### Event Handlers
- [ ] `onTouchStart` handler works
- [ ] `e.stopPropagation()` prevents zoom

**Success Criteria:**
- All touch interactions work
- Layout responsive
- No mobile-specific bugs
- Matches class component behavior

---

### Task 4.9: Test Visual Regression Stories
**Status:** [ ] Complete

Verify visual regression test stories render correctly.

**Navigate to:** Dropdown > Initial State Stories

**Stories to Check:**

#### Initial State Renders
- [ ] Dropdown in initial state - looks correct
- [ ] Placeholder visible
- [ ] Styling matches baseline
- [ ] No visual glitches

#### With Selection
- [ ] Dropdown with pre-selected value
- [ ] Selection displays correctly
- [ ] No layout shifts

#### Different Contexts
- [ ] In article
- [ ] In exercise
- [ ] With visible label
- [ ] Without label

**Visual Comparison:**
If you have baseline screenshots from Phase 1, compare:
- Layout unchanged
- Spacing identical
- Colors/styling same
- Font rendering consistent

**Success Criteria:**
- Visual appearance unchanged
- No layout regressions
- Matches baseline screenshots

---

### Task 4.10: Test Interaction Stories
**Status:** [ ] Complete

Test the interaction-based Storybook stories.

**Navigate to:** Dropdown > Interaction Stories

**Test Flow Stories:**

#### User Selection Flow
- [ ] Story shows dropdown interaction
- [ ] User can open dropdown
- [ ] User can select option
- [ ] Selection is saved/displayed
- [ ] onChange handler called correctly

#### Multiple Interactions
- [ ] Can change selection multiple times
- [ ] Each change is captured
- [ ] No state issues or bugs

**Success Criteria:**
- All interaction stories work
- User flows complete successfully
- onChange events fire correctly

---

### Task 4.11: Test Math Rendering
**Status:** [ ] Complete

Specifically test LaTeX/MathJax rendering in choices.

**Test with Math Content:**
```javascript
// Example math choices
{
    content: "$x^2 + 2x + 1$",  // Inline math
    correct: true
},
{
    content: "$$\\frac{a}{b}$$",  // Display math
    correct: false
}
```

**Test Cases:**
- [ ] Inline math ($...$) renders correctly
- [ ] Display math ($$...$$) renders correctly
- [ ] Complex expressions (fractions, square roots, etc.)
- [ ] Math in placeholder (if supported)
- [ ] Math in visible label (if supported)

**Visual Checks:**
- [ ] Math is properly formatted
- [ ] Font size appropriate
- [ ] Alignment correct
- [ ] No rendering errors or placeholders visible

**Interaction:**
- [ ] Can select option with math
- [ ] Selected math displays correctly in closed dropdown
- [ ] Math renders quickly (no flash of LaTeX code)

**Success Criteria:**
- All math renders correctly
- No rendering errors
- Performance acceptable
- Matches class component rendering

---

### Task 4.12: Test Widget Integration
**Status:** [ ] Complete

Test that the dropdown works correctly when integrated with Perseus renderers.

**Integration Points:**

#### ServerItemRenderer
- [ ] Dropdown renders in exercise context
- [ ] Scoring works correctly
- [ ] Validation messages appear
- [ ] Multiple widgets on page don't conflict

#### ArticleRenderer
- [ ] Dropdown renders in article
- [ ] Inline display works
- [ ] Article styling applied correctly

#### With Other Widgets
- [ ] Multiple dropdowns on same page
- [ ] Dropdown + other widgets (radio, input, etc.)
- [ ] Focus management works between widgets

**Test Scoring:**
If test environment supports scoring:
- [ ] Correct answer scores correctly
- [ ] Incorrect answer shows as wrong
- [ ] Validation works (empty answer marked invalid)
- [ ] Score is tracked properly

**Success Criteria:**
- Integration works as expected
- No conflicts with other widgets
- Scoring works correctly
- Widget interface methods work

---

### Task 4.13: Test Props Edge Cases
**Status:** [ ] Complete

Test various prop combinations and edge cases.

**Prop Combinations:**

#### Required Props Only
```typescript
<Dropdown
    choices={basicChoices}
    placeholder="Select..."
    apiOptions={ApiOptions.defaults}
    userInput={{value: 0}}
    dependencies={mockDependencies}
/>
```
- [ ] Renders correctly
- [ ] No errors

#### All Props
- [ ] With visibleLabel
- [ ] With ariaLabel
- [ ] With custom widgetId
- [ ] With all handlers (onChange, onFocus, onBlur)
- [ ] With static=true
- [ ] With readOnly=true

#### Prop Updates
- [ ] Update choices - re-renders correctly
- [ ] Update userInput - selection changes
- [ ] Update apiOptions - behavior changes
- [ ] Update readOnly - enables/disables

**Success Criteria:**
- All prop combinations work
- Props updates handled correctly
- No crashes with minimal props

---

### Task 4.14: Performance Check
**Status:** [ ] Complete

Verify the functional component doesn't have performance regressions.

**Performance Tests:**

#### Render Time
- [ ] Initial render is fast (< 100ms)
- [ ] Re-renders are fast
- [ ] No noticeable lag

#### Memory Usage
- [ ] No memory leaks
- [ ] Component cleans up properly on unmount
- [ ] No growing memory usage with multiple renders

#### Re-render Behavior
Test that component doesn't re-render unnecessarily:
- [ ] Doesn't re-render when parent updates unrelated props
- [ ] Only re-renders when relevant props change

**Tools:**
- React DevTools Profiler
- Browser Performance tab
- Memory profiler

**Optional Optimizations (if needed):**
- Add `useMemo` for children array
- Add `useCallback` for event handlers
- Only if profiling shows significant issues

**Success Criteria:**
- Performance similar to or better than class version
- No memory leaks
- Reasonable re-render behavior

---

### Task 4.15: Cross-Browser Testing
**Status:** [ ] Complete

Test in different browsers to ensure compatibility.

**Browsers to Test:**
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (if on macOS)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

**Test in Each Browser:**
- [ ] Component renders correctly
- [ ] All interactions work
- [ ] Keyboard navigation works
- [ ] No console errors
- [ ] Styling correct

**Known Issues:**
Document any browser-specific issues found:
- Issue: [description]
- Browser: [name/version]
- Impact: [severity]
- Fix: [solution or workaround]

**Success Criteria:**
- Works in all major browsers
- No critical browser-specific bugs
- Consistent behavior across browsers

---

### Task 4.16: Final Test Run
**Status:** [ ] Complete

Run complete test suite one final time before Phase 5.

**Commands:**
```bash
# Full test suite
pnpm test packages/perseus/src/widgets/dropdown

# Type checking
pnpm tsc --noEmit

# Linting
pnpm lint packages/perseus/src/widgets/dropdown
```

**Verify:**
- [ ] All tests pass
- [ ] No type errors
- [ ] No lint errors
- [ ] No console warnings

**Success Criteria:**
- Perfect test run
- Ready for final review and cleanup

---

## Phase Completion Checklist

Before moving to Phase 5, verify:

- [ ] All tasks (4.1 - 4.16) marked complete
- [ ] All automated tests pass
- [ ] Manual testing complete
- [ ] Accessibility verified
- [ ] Mobile testing done
- [ ] Performance acceptable
- [ ] Cross-browser compatible
- [ ] No regressions found

---

## Testing Summary

**Tests Run:**
- Automated test suites: [ ] Pass
- Storybook stories: [ ] Pass
- Keyboard navigation: [ ] Pass
- Screen reader: [ ] Pass
- Mobile interactions: [ ] Pass
- Visual regression: [ ] Pass
- Math rendering: [ ] Pass
- Cross-browser: [ ] Pass

**Issues Found:** [Number]
**Issues Fixed:** [Number]
**Outstanding Issues:** [Number]

---

## Known Issues

**Document any issues not fixed in this phase:**

| Issue | Severity | Status | Notes |
|-------|----------|--------|-------|
| Example | Low | Deferred | Will fix in future PR |

---

## Notes & Observations

**Document any interesting findings:**

-
-
-

---

## Ready for Phase 5?

If all testing is complete and passing, you're ready to proceed to:
**Phase 5: Final Review & Cleanup** (`.claude/planning/dropdown-phase-5-cleanup.md`)

This final phase will polish the code and prepare it for commit.

---

**Phase Started:** [Date]
**Phase Completed:** [Date]
**Time Spent:** [Duration]