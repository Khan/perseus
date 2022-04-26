// @flow

type JQueryCollection = $FlowFixMe;

export const getLineHeightForNode = (
    $line1: JQueryCollection,
    $line2: JQueryCollection,
): number => {
    return $line2.offset().top - $line1.offset().top;
};
