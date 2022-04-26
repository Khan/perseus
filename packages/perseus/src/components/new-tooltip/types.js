// @flow
type AriaLabelledBy = {|
    // The unique identifier of a DOM node to use as a label.
    // See aria-labelledby
    id: string,
|};

type AriaSupport = {|
    // The title of the tooltip.
    // See documentation for aria-label and aria-labelledby.
    title?: string | AriaLabelledBy,

    // How assertive should the tooltip content be?
    // Default is to not provide an aria-live attribute.
    // See documentation for aria-live.
    assertiveness?: "polite" | "assertive",
|};

export type NewTooltipSide = "top" | "bottom" | "left" | "right";

export type OffsetAnchor = "bubble" | "arrow";

export type NewTooltipProps = {|
    // The content of the tooltip bubble.
    content: React$Node,

    // Which side of the target element to attach the tooltip to.
    //
    // This field is optional. In `defaultProps`, its value is "top".
    side: NewTooltipSide,

    // How much space to put between the tooltip bubble and the target element.
    // (Or, if `offsetFrom` is "arrow", how much space to put between the
    // tooltip _arrow_ and the target element.)
    //
    // Increasing this value moves the tooltip further away from the target
    // element. Decreasing this value moves the tooltip closer to the target
    // element, perhaps to the point of overlapping!
    //
    // This field is optional. In `defaultProps`, its value is 0.
    offset: number,

    // Whether the `offset` prop measures the distance between the tooltip
    // _bubble_ and the target element, or the tooltip _arrow_ and the target
    // element.
    //
    // If `offsetFrom` is "bubble", and `offset` is 0, then the edge of the
    // tooltip bubble will exactly touch the edge of the target element, and
    // the tooltip arrow will overlap the _inside_ of the target element.
    //
    // If `offsetFrom` is "arrow", and `offset` is 0, then the tip of the
    // tooltip arrow will exactly touch the edge of the target element, and the
    // target bubble won't overlap the target element at all.
    //
    // This field is optional. In `defaultProps`, its value is "bubble".
    offsetFrom: OffsetAnchor,

    // An invisible margin around the tooltip bubble, preventing it from
    // touching the edges of the screen.
    //
    // This field is optional. In `defaultProps`, its value is 0.
    tooltipMargin: number,

    // Whether to have no padding between the tooltip content and the edge of
    // the tooltip bubble.
    //
    // This field is optional. In `defaultProps`, its value is `false`.
    noPadding: boolean,

    // The tooltip's text color - or, if `inverted` is set, the tooltip's
    // background color.
    //
    // This field is optional. In `defaultProps`, its value is gray17.
    color: string,

    // Whether to "invert" the colors of the tooltip - that is, swap the text
    // color to white, and background color to gray17 (or the value of the
    // `color` prop).
    //
    // This field is optional. In `defaultProps`, its value is `false`.
    inverted: boolean,

    // Whether the tooltip is dismissed. Optional.
    //
    // If provided, this becomes a "controlled component": the caller is
    // responsible for managing dismissal state, and using the `onDismiss`
    // callback to listen to changes. But the caller also has the option to
    // change dismissal state themselves, in case they want to dismiss or
    // undismiss the tooltip in response to another action at the call site.
    //
    // If not provided, this is an "uncontrolled component": dismissal state is
    // managed by NewTooltip automatically. Most callers will want this default
    // uncontrolled behavior :)
    dismissed?: boolean,

    // Whether to show a close button to dismiss the tooltip.
    //
    // This field is optional. In `defaultProps`, its value is `false`.
    dismissOnClickClose: boolean,

    // This callback is called when the tooltip is dismissed. Optional.
    onDismiss?: () => mixed,

    // A value passed to the data-test-id attribute of the tooltip bubble
    testId?: string,

    // Whether to show the tooltip on hover.
    //
    // This field is optional. In `defaultProps`, its value is `true`.
    toggleOnHover: boolean,

    // Whether to show the tooltip immediately on mount. If this flag is set,
    // then the tooltip will remain open until it is dismissed, regardless of
    // other state (like hover).
    //
    // This field is optional. In `defaultProps`, its value is `false`.
    showOnMount: boolean,

    // A media query to restrict this tooltip's visibility. If provided, this
    // tooltip will only be visible when the media query is satisfied.
    //
    // This field is optional. If omitted, the tooltip's visibility will not
    // depend on any media query.
    //
    // TODO(mdr): We're trying to solve a general styling API problem for
    //     shared components. I wonder how conditioning the tooltip on media
    //     query might fit into that long-term solution!
    //
    //     For now, though, we're sticking this onto the NewTooltip API in a
    //     simplistic form, instead of waiting for a general solution to exist.
    //     Otherwise, the way to get media-conditioned tooltips is to render
    //     multiple copies of NewTooltip _and_ its children, which causes perf,
    //     a11y, and window-resize-consistency problems.
    media?: string,

    // This callback is called when the tooltip is clicked. Optional.
    //
    // The clickable area includes the tooltip bubble, the tooltip bubble's
    // contents, and the tooltip arrow. If a callback is provided, these areas
    // will additionally be styled as clickable, i.e., `cursor: pointer`.
    onClick?: () => mixed,

    // This callback is called when the cursor enters the tooltip. Optional.
    //
    // The hoverable area includes the tooltip bubble, the tooltip bubble's
    // contents, and the tooltip arrow. If a callback is provided, these areas
    // will additionally be styled as clickable, i.e., `cursor: pointer`.
    //
    // If the cursor moves from the tooltip bubble to the tooltip arrow, or
    // vice-versa, you may receive a pair of `onMouseLeave` and `onMouseEnter`
    // calls. Beware! (Thankfully, if all you do is call `setState`, React's
    // `setState` batching should protect you from unnecessary updates.)
    onMouseEnter?: () => mixed,

    // This callback is called when the cursor enters the tooltip. Optional.
    //
    // The hoverable area includes the tooltip bubble, the tooltip bubble's
    // contents, and the tooltip arrow. If a callback is provided, these areas
    // will additionally be styled as clickable, i.e., `cursor: pointer`.
    //
    // If the cursor moves from the tooltip bubble to the tooltip arrow, or
    // vice-versa, you may receive a pair of `onMouseLeave` and `onMouseEnter`
    // calls. Beware! (Thankfully, if all you do is call `setState`, React's
    // `setState` batching should protect you from unnecessary updates.)
    onMouseLeave?: () => mixed,

    // Provide various ARIA values to support accessibility of this tooltip.
    // All tooltips should probably provide a header label (string or id of
    // a node).
    //
    // If no title or title node id is provided, the tooltip contents are
    // specified as the label.
    //
    // This property can also be used to specify the aria-live assertiveness.
    // Permanently visible tooltips that don't change their contents
    // may not want this as it will call attention to the tooltip on first
    // display, which isn't necessarily valuable.
    //
    // If the content DOES change but you don't want an initial
    // assert on first display, consider using some custom aria-live within the
    // content of the tooltip rather than this setting.
    a11y?: AriaSupport,
|};
