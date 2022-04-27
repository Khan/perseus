// @flow
/**
 * This is the best way to specify an empty exact type in Flow.
 *
 * When a component has empty props, use this type like this:
 *     type Props = Empty;
 *
 * Then, when adding props to the component:
 *     type Props = {| myComponentProp: string |};
 *
 * See https://github.com/facebook/flow/issues/2977 for details.
 */
declare type Empty = $Shape<{||}>;

declare var globalThis: any;
