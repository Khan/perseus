# `NewTooltip`: KA tooltip component

Across the Khan Academy webapp, we use a shared "tooltip" UI element, to visually annotate page elements with additional information. This React component, `NewTooltip`, is designed to satisfy all of our tooltip needs! 😄

**Warning: This component is WIP!** We're in the process of rolling out this tooltip to eventually replace the old `Tooltip` component. `NewTooltip` is currently is only used at a select few call sites. [Scroll down for details.](#warning-this-component-is-wip)

## Usage

To point a tooltip at an element, wrap it in a `NewTooltip` component:

```jsx
<NewTooltip content={i18n._("You should click on this!")}>
    <button><$_>Assign to students</$_></button>
</NewTooltip>
```

This will produce a tooltip that says "You should click on this!" when you hover over the wrapped button.

You can also provide more advanced content:

```jsx
const content = <div className={css(styles.tooltipContent)}>
    <p><$_>You should click on this!</$_></p>
    <p><$_>It will help you!</$_></p>
</div>;

<NewTooltip content={content}>
    <button>Assign to students</button>
</NewTooltip>
```

There are also many styling, positioning, and behavioral options for the tooltip! See `types.js` for the list of options, and the [React Sandbox][fixtures] to see them in action.

## Accessibility

Unlike some other tooltip components on the web, this tooltip is a _visual_ element rather than a semantic element. Its use cases are relatively diverse:

* Explaining a UI control
* Illustrating a relationship between two permanent UI elements
* Showing a transient UI element without disrupting the flow of the document
* Prompting the user to take a secondary or blocking action (tooltip) before taking the main action (target)

The key commonality is that the tooltip and its target are somehow _related_… but that's about it.

**So, be sure to add your own ARIA attributes to tooltip targets and content!** Only you know the semantic relationship between your tooltip and target, so it's up to you to express it.

## Package structure

The two most important files in this package are:

* `new-tooltip.jsx`: The entry point to our tooltip code. Manages high-level visibility state. Renders the tooltip's target element inline, and renders a `TooltipPortal` to get the tooltip content outside of any `overflow: hidden` containers.
* `types.js`: Defines the props for `NewTooltip`.

We also have a number of supporting files, as well:

* React components
    * `tooltip-portal.jsx`: Simulates a [React 16 portal][react-portal]. Creates a node near the root of the document, and renders a `TooltipPositioner` there, instead of inline with the target element.
    * `tooltip-positioner.jsx`: Manages the position of the tooltip UI. Computes the position of the target element, and watches for changes. Renders a `TooltipBubble` and `TooltipArrow`, positioned to point at the target element.
    * `tooltip-bubble.jsx`: The main tooltip "bubble" element. Renders the tooltip content.
    * `tooltip-arrow.jsx`: The little triangle that points from the tooltip bubble to the target element.
* Library files:
    * `util.js`: Miscellaneous utility functions.

Note that these components are relatively tightly coupled—for example, rather than specifying their individual data requirements, each tooltip component just forwards the entire set of `tooltipProps` to its child tooltip components. This enables faster iteration, but means that the child components aren't especially reusable.

## Warning: This component is WIP!

This is `NewTooltip`, a fork of the old `Tooltip`, in which we've built a brand new layout algorithm to address some key UX issues. Someday, `NewTooltip` will replace `Tooltip`, hooray! [See ADR #33 for details.][adr-33]

`NewTooltip` is probably _feature-ready_ for most use cases on Khan Academy, but **general usage is not yet advised**. We're still developing our plan for the "Wonder Blocks" shared component rollout, and we want to keep call sites well-constrained until we know more. But, if you _need_ the features of `NewTooltip` today, maybe we can figure something out! Hit up the [#reusable-components][reusable-components] Slack channel.

But, if you need a feature that hasn't been ported yet, maybe you'll want to continue to use `Tooltip`. (Or port the feature into `NewTooltip`? 😍)

Here's the overall behavioral comparison right now. Especially valuable features are marked with a star (⭐️).

| Feature                                      | `NewTooltip` | `Tooltip` |
|----------------------------------------------|--------------|-----------|
| ⭐️ **Basic tooltip functionality**           | ✅            | ✅        |
| ⭐️ **Escape `overflow: hidden` containers**  | ✅            | ✅        |
| ⭐️ **Attach to any side of the target**      | ✅            | ✅        |
| ⭐️ **Configurable colors**                   | ✅            | ✅        |
| ⭐️ **Dismiss on click**                      | ✅            | ✅        |
| ⭐️ **Only show once per user lifetime**      | ✅            | ✅        |
| Tweak position via the `offset` prop         | ✅            | ✅        |
| Arrow center-aligned with bubble             | ✅            | ✅        |
| ⭐️ **Auto-shift position to avoid wrapping** | ✅            | ❌        |
| ⭐️ **Auto-reposition during scrolling**      | ✅            | ❌        |
| ⭐️ **Update content without remounting**     | ✅            | ❌        |
| ⭐️ **Media queries to show/hide tooltip**    | ✅            | ❌        |
| Can specify offset from the _arrow_          | ✅            | ❌        |
| Can specify margin around tooltip            | ✅            | ❌        |
| ⭐️ **Can be used inside a modal**            | ✅            | ✅        |
| Can target `position: fixed` elements        | ❌            | ✅        |
| Auto-choose top or bottom anchoring          | ❌            | ✅        |
| Try to left/right align tooltip with target  | ❌            | ✅        |
| Manual positioning (left/top)                | ❌            | ✅        |
| Dismiss on scroll/interaction/timer          | ❌            | ✅        |
| Show tooltip when target gains focus         | ❌            | ✅        |

> NOTE(mdr): It's possible that some of the old `Tooltip` features are also "especially valuable", and I just don't know about it yet! So far we've only used `NewTooltip` at GTP call sites, and they haven't needed many of these features, so it's not clear to me how broadly they're actually used. (We'll probably have to support most of the missing options eventually, but maybe not all, in case some of their use cases were addressed by the general positioning improvements?)

Eventually, we'll roll out `NewTooltip` to all KA call sites, and upgrade it to support everything that the old `Tooltip` call sites need. So, no worries if you end up adding new `Tooltip` call sites; we'll help upgrade them soon! [For more details, see ADR #33.][adr-33]

  [adr-33]: https://docs.google.com/document/d/1B4pMGWp344e96RmIbnsmUBiTbrizdbOvipe-9I_1iZQ/edit
  [fixtures]: http://localhost:8081/react-sandbox/components/new-tooltip-package/new-tooltip.jsx.fixture.js
  [react-portal]: https://reactjs.org/docs/portals.html
  [reusable-components]: https://khanacademy.slack.com/messages/C4PE1QM5Y/

Code-Owner: Frontend Infrastructure
Crowdin-Category: _other_
