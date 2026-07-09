/**
 * Widget types that have been migrated to the `WidgetPropsV2` props shape, in
 * which the widget's options are nested under a single `options` prop instead
 * of being spread into the top level of the props.
 *
 * `Renderer.getWidgetProps` consults this list to decide which props shape to
 * build for a given widget, so migrated and un-migrated widgets can coexist
 * while the migration is in progress. This list — and the branch that reads
 * it — will be removed once every widget has been migrated.
 */
// TODO(LEMS-4354): delete post-migration.
export const MIGRATED_WIDGETS: ReadonlyArray<string> = [
    "dropdown",
    "radio",
    "phet-simulation",
    "iframe",
];
