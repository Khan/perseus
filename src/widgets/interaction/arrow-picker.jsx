/* eslint-disable react/sort-comp */
/* TODO(csilvers): fix these lint errors (http://eslint.org/docs/rules): */
/* To fix, remove an entry above, run ka-lint, and fix errors. */
// @flow

const ButtonGroup = require("react-components/button-group.jsx");
const React = require("react");

const {ChangeableProps} = require('../../mixins/changeable.jsx');

class ArrowPicker extends React.Component {
    static defaultProps = {
        value: "",
    }

    props: ChangeableProps & {
        value?: string,
    }

    render() {
        return <ButtonGroup value={this.props.value}
            allowEmpty={false}
            buttons={[
                {value: "", content: <span>&mdash;</span>},
                {value: "->", content: <span>&#x2192;</span>},
                /*
                TODO(eater): fix khan-exercises so these are supported
                {value: "<-", content: <span>&#x2190;</span>},
                {value: "<->", content: <span>&#x2194;</span>}
                */
            ]}
            onChange={this.props.onChange}
        />;
    }
}

module.exports = ArrowPicker;
