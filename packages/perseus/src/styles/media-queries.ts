/**
 * A default set of media queries to use for different screen sizes. Based on
 * the breakpoints from purecss.
 *
 * Use like:
 *   StyleSheet.create({
 *       blah: {
 *           [mediaQueries.xs]: {
 *
 *           },
 *       },
 *   });
 */

import * as constants from "./constants";

const {
    pureXsMax,
    pureSmMin,
    pureSmMax,
    pureMdMin,
    pureMdMax,
    pureLgMin,
    pureLgMax,
    pureXlMin,
} = constants;

export default {
    xs: `@media screen and (max-width: ${pureXsMax})`,
    // eslint-disable-next-line no-restricted-syntax
    sm: (`@media screen and (min-width: ${pureSmMin}) and ` +
        `(max-width: ${pureSmMax})`) as string,
    // eslint-disable-next-line no-restricted-syntax
    md: (`@media screen and (min-width: ${pureMdMin}) and ` +
        `(max-width: ${pureMdMax})`) as string,
    // eslint-disable-next-line no-restricted-syntax
    lg: (`@media screen and (min-width: ${pureLgMin}) and ` +
        `(max-width: ${pureLgMax})`) as string,
    xl: `@media screen and (min-width: ${pureXlMin})`,

    xsOrSmaller: `@media screen and (max-width: ${pureXsMax})`,
    smOrSmaller: `@media screen and (max-width: ${pureSmMax})`,
    mdOrSmaller: `@media screen and (max-width: ${pureMdMax})`,
    lgOrSmaller: `@media screen and (max-width: ${pureLgMax})`,

    smOrLarger: `@media screen and (min-width: ${pureSmMin})`,
    mdOrLarger: `@media screen and (min-width: ${pureMdMin})`,
    lgOrLarger: `@media screen and (min-width: ${pureLgMin})`,
    xlOrLarger: `@media screen and (min-width: ${pureXlMin})`,
};
