import type {
    NumberLineWidget,
    PerseusNumberLineWidgetOptions,
} from "../../data-schema";

export function generateNumberLineOptions(
    options?: Partial<PerseusNumberLineWidgetOptions>,
): PerseusNumberLineWidgetOptions {
    const defaultNumberLineOptions: PerseusNumberLineWidgetOptions = {
        range: [-4, 4],
        labelRange: [null, null],
        labelStyle: "decimal",
        labelTicks: true,
        isInequality: false,
        isTickCtrl: false,
        divisionRange: [1, 10],
        numDivisions: null,
        snapDivisions: 2,
        tickStep: 1,
        correctRel: "eq",
        correctX: null,
        initialX: null,
        showTooltips: false,
    };

    return {
        ...defaultNumberLineOptions,
        ...options,
    };
}

export function generateNumberLineWidget(
    numberLineWidgetProperties?: Partial<Omit<NumberLineWidget, "type">>,
): NumberLineWidget {
    return {
        type: "number-line",
        graded: true,
        version: {major: 0, minor: 0},
        static: false,
        alignment: "default",
        ...numberLineWidgetProperties,
        options: generateNumberLineOptions(numberLineWidgetProperties?.options),
    };
}
