import type {PerseusWidgetOptions, Version} from "../data-schema";
import type {Alignment} from "../types";
import type getCategorizerPublicWidgetOptions from "./categorizer/categorizer-util";
import type getCSProgramPublicWidgetOptions from "./cs-program/cs-program-util";
import type getDropdownPublicWidgetOptions from "./dropdown/dropdown-util";
import type getExpressionPublicWidgetOptions from "./expression/expression-util";
import type getGrapherPublicWidgetOptions from "./grapher/grapher-util";
import type getIFramePublicWidgetOptions from "./iframe/iframe-util";
import type getInteractiveGraphPublicWidgetOptions from "./interactive-graph/interactive-graph-util";
import type getLabelImagePublicWidgetOptions from "./label-image/label-image-util";
import type getMatcherPublicWidgetOptions from "./matcher/matcher-util";
import type getMatrixPublicWidgetOptions from "./matrix/matrix-util";
import type getNumberLinePublicWidgetOptions from "./number-line/number-line-util";
import type getNumericInputPublicWidgetOptions from "./numeric-input/numeric-input-util";
import type getOrdererPublicWidgetOptions from "./orderer/orderer-util";
import type getPlotterPublicWidgetOptions from "./plotter/plotter-util";
import type getRadioPublicWidgetOptions from "./radio/radio-util";
import type getSorterPublicWidgetOptions from "./sorter/sorter-util";
import type getTablePublicWidgetOptions from "./table/table-util";

export type WidgetOptionsUpgradeMap = {
    // OldProps => NewProps,
    [targetMajorVersion: string]: (arg1: any) => any;
};

/**
 * A union type of all the functions that provide public widget options.
 *
 * TODO(LEMS-2870): figure out how to make this generic so we don't need to be
 * so reliant on a set group of widgets
 */
export type PublicWidgetOptionsFunction =
    | typeof getMatcherPublicWidgetOptions
    | typeof getPlotterPublicWidgetOptions
    | typeof getIFramePublicWidgetOptions
    | typeof getRadioPublicWidgetOptions
    | typeof getNumericInputPublicWidgetOptions
    | typeof getDropdownPublicWidgetOptions
    | typeof getCategorizerPublicWidgetOptions
    | typeof getOrdererPublicWidgetOptions
    | typeof getExpressionPublicWidgetOptions
    | typeof getInteractiveGraphPublicWidgetOptions
    | typeof getLabelImagePublicWidgetOptions
    | typeof getSorterPublicWidgetOptions
    | typeof getCSProgramPublicWidgetOptions
    | typeof getNumberLinePublicWidgetOptions
    | typeof getTablePublicWidgetOptions
    | typeof getGrapherPublicWidgetOptions
    | typeof getMatrixPublicWidgetOptions;

export type WidgetLogic = {
    name: string;
    version?: Version;
    widgetOptionsUpgrades?: WidgetOptionsUpgradeMap;
    defaultWidgetOptions?: any;
    supportedAlignments?: ReadonlyArray<Alignment>;
    defaultAlignment?: Alignment;
    accessible?: boolean | ((options: PerseusWidgetOptions) => boolean);

    /**
     * A function that provides a public version of the widget options that can
     * be shared with the client.
     */
    getPublicWidgetOptions?: PublicWidgetOptionsFunction;
};
