/* eslint-disable react/no-unsafe */
// @flow
import * as KAS from "@khanacademy/kas";
import {
    components,
    displaySigFigs,
    icons,
    Changeable,
    EditorJsonify,
} from "@khanacademy/perseus";
import PropTypes from "prop-types";
import * as React from "react";
import _ from "underscore";

const {InlineIcon, NumberInput} = components;
const {iconOk, iconRemove} = icons;

// TODO(joel): teach KAS how to accept an answer only if it's expressed in
// terms of a certain type.
// TODO(joel): Allow sigfigs within a range rather than an exact expected
// value?

const ALL = ("all": "all");
const SOME = ("some": "some");
const MAX_SIGFIGS = 10;

const sigfigPrint = function (num, sigfigs) {
    return displaySigFigs(num, sigfigs, -MAX_SIGFIGS, false);
};

// Extract the primitive units from a unit expression. This first simplifies
// `expr` to a `Mul` like "5 kg m / s^2" then removes the first term.
const primUnits = function (expr) {
    return expr.simplify().asMul().partition()[1].flatten().simplify();
};

type UnitExampleProps = $FlowFixMe;
type UnitExampleState = $FlowFixMe;

// Show the name of a unit and whether it's recognized by KAS.
//
// In the future I plan for this to show an example of a thing that would be
// accepted in that unit.
class UnitExample extends React.Component<UnitExampleProps, UnitExampleState> {
    // TODO(jangmi, CP-3288): Remove usage of `UNSAFE_componentWillMount`
    UNSAFE_componentWillMount() {
        this._checkValidity(this.props);
    }

    UNSAFE_componentWillReceiveProps(nextProps) {
        this._checkValidity(nextProps);
    }

    _checkValidity = ({name, original, sigfigs}) => {
        const parseResult = KAS.unitParse(name);
        let solvedExample = "";

        // A unit is valid if it parses and is equivalent to the original.
        let valid = true;

        if (parseResult.parsed && original) {
            const x = new KAS.Var("x");
            const {unit} = parseResult;
            const equality = new KAS.Eq(original, "=", new KAS.Mul(x, unit));
            try {
                const answer = equality.solveLinearEquationForVariable(x);

                // The third parameter is the least significant decimal place.
                // I.e. the index of the last place you care about
                // (543210.(-1)(-2)(-3) etc). We use -10 because that should
                // always be safe since we only care up to maximum 10 decimal
                // places.
                solvedExample = sigfigPrint(answer.eval(), sigfigs);

                valid = KAS.compare(primUnits(original), primUnits(unit)).equal;
            } catch (e) {
                valid = false;
            }
        } else {
            valid = false;
        }

        this.setState({
            valid,
            solvedExample,
        });
    };

    render(): React.Node {
        let icon;
        if (this.state.valid) {
            icon = (
                <span>
                    <span className="unit-example-okay">
                        <InlineIcon {...iconOk} />
                    </span>
                    {this.state.solvedExample}
                </span>
            );
        } else {
            icon = (
                <span className="unit-example-not-okay">
                    <InlineIcon {...iconRemove} />
                </span>
            );
        }

        return (
            <div>
                {icon} {this.props.name}
            </div>
        );
    }
}

type UnitInputEditorProps = $FlowFixMe;

class UnitInputEditor extends React.Component<UnitInputEditorProps> {
    parsed: ?boolean;
    groupId: string;
    original: ?$FlowFixMe;

    static propTypes = {
        ...Changeable.propTypes,
        value: PropTypes.string,
        acceptingUnits: PropTypes.arrayOf(PropTypes.string),
        accepting: PropTypes.oneOf([ALL, SOME]),
        sigfigs: PropTypes.number,
    };

    static widgetName: "unit-input" = "unit-input";

    static defaultProps: UnitInputEditorProps = {
        value: "5x10^5 kg m / s^2",
        accepting: ALL,
        sigfigs: 3,
    };

    constructor(props: UnitExampleProps) {
        super(props);

        this.groupId = _.uniqueId("accepting");
        this._doOriginal(props);
    }

    UNSAFE_componentWillReceiveProps(nextProps: UnitInputEditorProps) {
        this._doOriginal(nextProps);
    }

    change: ($FlowFixMe, $FlowFixMe, $FlowFixMe) => $FlowFixMe = (...args) => {
        return Changeable.change.apply(this, args);
    };

    handleAcceptingUnitsChange: (SyntheticInputEvent<>) => void = (event) => {
        const acceptingUnits = event.target.value
            .split(",")
            .map((str) => str.trim())
            .filter((str) => str !== "");
        this.change({acceptingUnits});
    };

    handleSigfigChange: (number) => void = (sigfigs) => {
        this.change({sigfigs});
    };

    _checkSigfigValidity: (number) => boolean = (sigfigs) => {
        return sigfigs > 0 && sigfigs <= MAX_SIGFIGS;
    };

    _setAccepting: (typeof SOME | typeof ALL) => void = (val) => {
        this.change({accepting: val});
    };

    _doOriginal: (UnitExampleProps) => void = (props) => {
        const tryParse = KAS.unitParse(props.value);
        this.parsed = false;

        // Only update this state if the unit parsed *and* it has a magnitude
        // attached to it. KAS can also parse units without magnitudes ("1.2
        // g" vs "g").
        if (tryParse.parsed && tryParse.type === "unitMagnitude") {
            this.original = tryParse.expr;
            this.parsed = true;
        }
    };

    onChange: (SyntheticInputEvent<>) => void = (event) => {
        this.props.onChange({value: event.target.value});
    };

    getSaveWarnings: () => $ReadOnlyArray<string> = () => {
        const {value, accepting, acceptingUnits} = this.props;
        const warnings = [];

        const tryParse = KAS.unitParse(value);
        if (!tryParse.parsed) {
            warnings.push("Answer did not parse");
        }

        if (accepting === SOME && acceptingUnits.length === 0) {
            warnings.push("There are no accepted units");
        }

        return warnings;
    };

    serialize: () => $FlowFixMe = () => {
        return EditorJsonify.serialize.call(this);
    };

    render(): React.Node {
        const {acceptingUnits = [], accepting} = this.props;
        let acceptingElem = null;
        if (accepting === SOME) {
            const unitsArr = acceptingUnits.map((name, i) => (
                <UnitExample
                    name={name}
                    original={this.original || null}
                    sigfigs={this.props.sigfigs}
                    key={i}
                />
            ));

            acceptingElem = (
                <div>
                    <input
                        type="text"
                        defaultValue={acceptingUnits.join(", ")}
                        onChange={this.handleAcceptingUnitsChange}
                    />{" "}
                    (comma-separated)
                    {unitsArr}
                </div>
            );
        }

        return (
            <div className="unit-editor">
                <div>
                    <input
                        value={this.props.value}
                        className="unit-editor-canonical"
                        onChange={this.onChange}
                    />{" "}
                    {this.parsed ? (
                        <span className="unit-example-okay">
                            <InlineIcon {...iconOk} />
                        </span>
                    ) : (
                        <span className="unit-example-not-okay">
                            <InlineIcon {...iconRemove} />
                        </span>
                    )}
                </div>

                <div>
                    Significant Figures:{" "}
                    <NumberInput
                        value={this.props.sigfigs}
                        onChange={this.handleSigfigChange}
                        checkValidity={this._checkSigfigValidity}
                        useArrowKeys
                    />
                </div>

                <div>
                    <label>
                        <input
                            type="radio"
                            name={this.groupId}
                            onChange={() => this._setAccepting(ALL)}
                            checked={this.props.accepting === ALL}
                        />
                        {" Any equivalent unit "}
                    </label>
                    <label>
                        <input
                            type="radio"
                            name={this.groupId}
                            onChange={() => this._setAccepting(SOME)}
                            checked={this.props.accepting === SOME}
                        />
                        {" Only these units "}
                    </label>
                </div>

                {acceptingElem}
            </div>
        );
    }
}

export default UnitInputEditor;
