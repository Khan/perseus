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

// Marks all properties of an object optional.
//
// We use this instead of $Shape<T> because spreading $Shape<$Exact<T>> ends up
// spreading $Exact<T> instead, losing the optionality of keys.
// https://github.com/facebook/flow/issues/6906#issuecomment-453439922
declare type Partial<T> = $ReadOnly<$Rest<T, {...}>>;

// TODO(jeff, WEB-616): Remove this in favour of real React type for refs when
// it is available.
declare type RefObject<T> = {current: null | React$ElementRef<T>, ...};
