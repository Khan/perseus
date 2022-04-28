const React = require("react");
const PropTypes = require("prop-types");
const ReactDOM = require("react-dom");
const {Provider} = require("react-redux");

const KeypadContainer = require("./keypad-container");
const {
    activateKeypad,
    dismissKeypad,
    configureKeypad,
    setCursor,
    setKeyHandler,
} = require("../actions");
const createStore = require("../store");

class ProvidedKeypad extends React.Component {
    static propTypes = {
        onElementMounted: PropTypes.func,
    };

    componentWillMount() {
        this.store = createStore();
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    activate = () => {
        this.store.dispatch(activateKeypad());
    };

    dismiss = () => {
        this.store.dispatch(dismissKeypad());
    };

    configure = (configuration, cb) => {
        this.store.dispatch(configureKeypad(configuration));

        // HACK(charlie): In Perseus, triggering a focus causes the keypad to
        // animate into view and re-configure. We'd like to provide the option
        // to re-render the re-configured keypad before animating it into view,
        // to avoid jank in the animation. As such, we support passing a
        // callback into `configureKeypad`. However, implementing this properly
        // would require middleware, etc., so we just hack it on with
        // `setTimeout` for now.
        setTimeout(() => cb && cb());
    };

    setCursor = (cursor) => {
        this.store.dispatch(setCursor(cursor));
    };

    setKeyHandler = (keyHandler) => {
        this.store.dispatch(setKeyHandler(keyHandler));
    };

    getDOMNode = () => {
        return ReactDOM.findDOMNode(this);
    };

    render() {
        const {onElementMounted, ...rest} = this.props;

        return (
            <Provider store={this.store}>
                <KeypadContainer
                    onElementMounted={(element) => {
                        // Append the dispatch methods that we want to expose
                        // externally to the returned React element.
                        const elementWithDispatchMethods = {
                            ...element,
                            activate: this.activate,
                            dismiss: this.dismiss,
                            configure: this.configure,
                            setCursor: this.setCursor,
                            setKeyHandler: this.setKeyHandler,
                            getDOMNode: this.getDOMNode,
                        };
                        onElementMounted &&
                            onElementMounted(elementWithDispatchMethods);
                    }}
                    {...rest}
                />
            </Provider>
        );
    }
}

module.exports = ProvidedKeypad;
