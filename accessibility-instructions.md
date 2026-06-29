# Instructions for Accessibility Topics

## Rules that MUST Be Followed
- Responses and generated code must align with the Web Content Accessibility Guidelines (WCAG) 2.2 AA.
- Strongly favor semantic HTML over adding ARIA attributes.
  - Default styling is not a valid reason to avoid semantic HTML.
  - "Easier to style" is not a valid reason to avoid semantic HTML.
  - The order of preference is: native element → modified native element → ARIA last resort
  - Before implementing any HTML structure, ask yourself:
      - Is there a native HTML element whose default semantics match what I need?
      - What assumptions am I making about this element's allowed content or usage?
      - State explicitly what the spec says about this element's permitted content before proceeding.
  - Always reason from element definitions, not from common usage patterns.
    - Ask: "What is this element defined to represent, and what content does the spec permit?" — not "What have I seen used here?"
  - If a semantic equivalent doesn't exist, try using an existing element and modifying it.
    - For instance, when trying to create something similar to a radio button but which has differences,
      instead of using a `<div with role="radio">` to approximate a radio button,
      consider using a `<button aria-pressed="true|false">` to create a toggle button that can function similarly to a radio button but is more semantically appropriate and accessible.
  - When choosing between modified native elements, favor the element that more closely accomplishes the requested behavior.
    - Elements with native semantics and behaviors that align with assumed usage patterns (i.e. not called out in the instructions)
      should have the reasoning associated with those semantics and behaviors weighted less when compared to other elements.
  - Using a `<div>` tag should be a last resort when all other options have failed to accomplish the desired accessibility.
- When modifying existing code, it's OK to recommend a different HTML structure if it makes implementing accessibility easier or more maintainable.
   - When standard HTML elements do not meet design requirements, build custom interactive elements using the instructions in this document.
   - Meticulously apply ARIA attributes (e.g., aria-pressed, aria-disabled, aria-labelledby) to ensure custom elements are fully accessible to assistive technologies.
   - Include detailed comments to explain the rationale behind specific ARIA implementations and accessibility decisions.

## Anti-Patterns: NEVER Use These
- Using `<div>` tag with `role` attribute set when a more appropriate semantic HTML element exists.
- Implementing keyboard event handlers for native interactive elements (e.g., adding onKeyDown handlers to a `<button>` instead of using the inherent keyboard accessibility).
