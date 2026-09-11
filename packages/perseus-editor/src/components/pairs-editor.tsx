import * as React from "react";

import BlurInput from "./blur-input";

interface Pair {
    name: string;
    value: string;
}

interface Props {
    pairs: Pair[];
    onChange: (pairs: Pair[]) => void;
}

export class PairsEditor extends React.Component<Props> {
    handlePairChange = (pairIndex: number, pair: Pair) => {
        const pairsCopy = [...this.props.pairs];
        pairsCopy[pairIndex] = pair;

        // If the last pair has both name and value set, add a new one.
        const lastPair = pairsCopy[pairsCopy.length - 1];
        if (lastPair.name && lastPair.value) {
            pairsCopy.push({name: "", value: ""});
        }
        this.props.onChange(pairsCopy);
    };

    render(): React.ReactNode {
        return (
            <div>
                {this.props.pairs.map((pair, i) => (
                    <PairEditor
                        key={i}
                        pair={pair}
                        onChange={(pair) => this.handlePairChange(i, pair)}
                    />
                ))}
            </div>
        );
    }
}

interface PairEditorProps {
    pair: Pair;
    onChange: (pair: Pair) => void;
}

class PairEditor extends React.Component<PairEditorProps> {
    render(): React.ReactNode {
        const {onChange} = this.props;
        const {name, value} = this.props.pair;

        return (
            <fieldset className="pair-editor">
                <label>
                    Name:{" "}
                    <BlurInput
                        value={name}
                        onChange={(newName) => onChange({name: newName, value})}
                    />
                </label>
                <label>
                    {" "}
                    Value:{" "}
                    <BlurInput
                        value={value}
                        onChange={(newVal) => onChange({name, value: newVal})}
                    />
                </label>
            </fieldset>
        );
    }
}
