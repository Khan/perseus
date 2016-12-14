/**
 * Editor for a multi-item question.
 *
 * TODO(mdr): The UI for managing arrays isn't visually consistent with
 *     HintsEditor. Should we bring them in line with each other?
 */
const {StyleSheet, css} = require("aphrodite");
const React = require("react");
const lens = require("../hubble/index.js");

const ApiOptions = require("./perseus-api.jsx").Options;
const Editor = require("./editor.jsx");
const {HintEditor} = require("./hint-editor.jsx");
const {iconChevronDown, iconPlus, iconTrash} = require("./icon-paths.js");
const InlineIcon = require("./components/inline-icon.jsx");
const JsonEditor = require("./json-editor.jsx");
const SimpleButton = require("./simple-button.jsx");
const {emptyValueForShape, shapePropType} = require("./multirenderer.jsx");

const EDITOR_MODES = ["edit", "preview", "json"];

/**
 * Component that displays the mode dropdown.
 *
 * The mode dropdown is the selector at the top of the editor that lets you
 * switch between edit, preview, and dev-only JSON mode.
 */
const ModeDropdown = React.createClass({
    propTypes: {
        currentMode: React.PropTypes.oneOf(EDITOR_MODES),

        // A function that takes in a string signifying the mode (ex: "edit")
        onChange: React.PropTypes.func,
    },

    _handleSelectMode: function(event) {
        if (this.props.onChange) {
            this.props.onChange(event.target.value);
        }
    },

    render: function() {
        return <label>
            Mode:{" "}
            <select
                value={this.props.currentMode}
                onChange={this._handleSelectMode}
            >
                <option value="edit">Edit</option>
                <option value="preview">Preview</option>
                <option value="json">Dev-only JSON</option>
            </select>
        </label>;
    },
});

/**
 * Convert a camel-cased string to a human-formatted string.
 * "superCoolThings" -> "super cool things"
 */
function camelCaseToHuman(str) {
    // Decapitalize the capital letters, and add a space before each.
    return str.replace(/[A-Z]/g, (s) => " " + s.toLowerCase());
}

/**
 * Capitalize the first letter of the given string.
 * "super cool things" -> "Super cool things"
 */
function capitalize(str) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert the given pluralized word to a singularized word.
 * "super cool things" -> "super cool thing"
 */
function pluralToSingular(str) {
    if (str.charAt(str.length - 1) === "s") {
        // Incredibly weak implementation :P
        return str.slice(0, -1);
    } else {
        // Uh oh, dunno how to singularize anything but the simplest case!
        // Let's just return the plural form, and hope the user forgives the
        // grammatical inconsistency.
        return str;
    }
}

const nodePropTypes = {
    shape: shapePropType,
    data: React.PropTypes.any.isRequired,
    path: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.string.isRequired,
        React.PropTypes.number.isRequired,
    ])).isRequired,
    actions: React.PropTypes.shape({
        addArrayElement: React.PropTypes.func.isRequired,
        handleEditorChange: React.PropTypes.func.isRequired,
        moveArrayElementDown: React.PropTypes.func.isRequired,
        moveArrayElementUp: React.PropTypes.func.isRequired,
        removeArrayElement: React.PropTypes.func.isRequired,
    }).isRequired,
    apiOptions: React.PropTypes.any.isRequired,  // TODO(mdr): real proptype?
};

/**
 * Render a node in the editor tree, given the shape of the target
 * node, the data stored in the target node, the path to the target
 * node, and any UI controls that affect how this node relates to its
 * parent (e.g. remove from parent array).
 *
 * This returns a container element with a pretty title and additional
 * UI controls for this node. Its contents are produced by
 * `NodeContent`. The two functions are mutually recursive.
 *
 * Leaf nodes, like items and hints, render an editor pod around their
 * content. Container nodes, like arrays and objects, render a header above
 * their content.
 */
const NodeContainer = (props) => {
    const {
        shape, data, path, actions, name: givenName, controls: givenControls,
        ...otherProps
    } = props;

    const name = givenName || camelCaseToHuman(path[path.length - 1] || "");

    let controls = givenControls || [];
    if (shape.type === "array") {
        controls = controls.concat(<div
            key="addArrayElement"
            className={css(styles.control)}
        >
            <SimpleButton
                color="green"
                onClick={() =>
                    actions.addArrayElement(path, shape.elementShape)}
                title={`Add a ${pluralToSingular(name)}`}
            >
                <InlineIcon {...iconPlus} />
            </SimpleButton>
        </div>);
    }

    let Container;
    if (shape.type === "array" || shape.type === "object") {
        Container = CollectionContainer;
    } else {
        Container = LeafContainer;
    }

    return <Container
        key={path.join(".")}
        name={name}
        controls={controls}
        path={path}
    >
        <NodeContent
            {...otherProps}
            shape={shape}
            data={data}
            path={path}
            actions={actions}
        />
    </Container>;
};
NodeContainer.propTypes = {
    ...nodePropTypes,
    controls: React.PropTypes.arrayOf(React.PropTypes.node),
};

const LeafContainer = ({name, controls, children}) => {
    return <div className={css(styles.container)}>
        <div className="perseus-widget-editor">
            <div className="perseus-widget-editor-title">
                {/* TODO(emily): allow specifying a custom editor title */}
                <div className="perseus-widget-editor-title-id">
                    {capitalize(name)}
                </div>
                <div className={css(styles.controls)}>
                    {controls}
                </div>
            </div>
            {children}
        </div>
    </div>;
};
LeafContainer.propTypes = {
    name: React.PropTypes.node,
    controls: React.PropTypes.node,
    children: React.PropTypes.node,
};

const CollectionContainer = ({name, controls, children, path}) => {
    const headerLevel = Math.min(path.length, 5) + 1;
    const HeaderTag = `h${headerLevel}`;

    return <div className={css(styles.container)}>
        <div className={css(styles.collectionHeader)}>
            <HeaderTag className={css(styles.collectionName)}>
                {capitalize(name)}
            </HeaderTag>
            <div className={css(styles.controls)}>
                {controls}
            </div>
        </div>
        <div>{children}</div>
    </div>;
};
CollectionContainer.propTypes = {
    name: React.PropTypes.node,
    controls: React.PropTypes.node,
    children: React.PropTypes.node,
    path: React.PropTypes.arrayOf(React.PropTypes.any).isRequired,
};

/**
 * Render the content of node in the editor tree, given the shape of
 * the target node, the data stored in the target node, and the path to
 * the target node.
 *
 * If the target node is a leaf, this returns an editor. Otherwise, it
 * iterates over the child nodes, and outputs `NodeContainer` for
 * each of them. The two functions are mutually recursive.
 */
const NodeContent = (props) => {
    const {shape} = props;

    if (shape.type === "item") {
        return <ItemNodeContent {...props} />;
    } else if (shape.type === "hint") {
        return <HintNodeContent {...props} />;
    } else if (shape.type === "array") {
        return <ArrayNodeContent {...props} />;
    } else if (shape.type === "object") {
        return <ObjectNodeContent {...props} />;
    }
};
NodeContent.propTypes = nodePropTypes;

const ItemNodeContent = (props) => {
    const {data, path, actions, apiOptions} = props;

    // TODO(mdr): there's some extra border around the Editor
    return <Editor
        {...data}
        onChange={
            newVal => actions.handleEditorChange(path, newVal)}
        apiOptions={apiOptions}
    />;
};
ItemNodeContent.propTypes = nodePropTypes;

const HintNodeContent = (props) => {
    const {data, path, actions, apiOptions} = props;

    return <HintEditor
        {...data}
        onChange={
            newVal => actions.handleEditorChange(path, newVal)}
        apiOptions={apiOptions}
        showTitle={false}
        showRemoveButton={false}
        showMoveButtons={false}
    />;
};
HintNodeContent.propTypes = nodePropTypes;

const ArrayNodeContent = (props) => {
    const {shape, data, path, actions, ...otherProps} = props;

    const collectionName = camelCaseToHuman(path[path.length - 1]);
    const elementName = pluralToSingular(collectionName);

    const children = data.map((subdata, i) => {
        const subpath = path.concat(i);
        const controls = [
            i > 0 && <div
                key="moveArrayElementUp"
                className={css(styles.control)}
            >
                <SimpleButton
                    color="orange"
                    title="Move up"
                    onClick={() =>
                        actions.moveArrayElementUp(subpath)}
                >
                    <div className={css(styles.verticalFlip)}>
                        <InlineIcon {...iconChevronDown} />
                    </div>
                </SimpleButton>
            </div>,
            i < data.length - 1 && <div
                key="moveArrayElementDown"
                className={css(styles.control)}
            >
                <SimpleButton
                    color="orange"
                    title="Move down"
                    onClick={() =>
                        actions.moveArrayElementDown(subpath)}
                >
                    <InlineIcon {...iconChevronDown} />
                </SimpleButton>
            </div>,
            <div
                key="removeArrayElement"
                className={css(styles.control)}
            >
                <SimpleButton
                    color="orange"
                    title="Delete"
                    onClick={() =>
                        actions.removeArrayElement(subpath)}
                >
                    <InlineIcon {...iconTrash} />
                </SimpleButton>
            </div>,
        ];
        return <NodeContainer
            {...otherProps}
            key={i}
            shape={shape.elementShape}
            data={subdata}
            path={subpath}
            actions={actions}
            name={`${elementName} ${i + 1}`}
            controls={controls}
        />;
    });

    return <div>{children}</div>;
};
ArrayNodeContent.propTypes = nodePropTypes;

const ObjectNodeContent = (props) => {
    const {shape, data, path, ...otherProps} = props;

    // Object iteration order should automatically match the order in which the
    // keys were defined in the object literal. So, whatever order semantically
    // made sense to the shape's author is the order in which we'll iterate :)
    const children = Object.keys(shape.shape).map(subkey =>
        <NodeContainer
            {...otherProps}
            key={subkey}
            shape={shape.shape[subkey]}
            data={data[subkey]}
            path={path.concat(subkey)}
        />
    );

    return <div>{children}</div>;
};
ObjectNodeContent.propTypes = nodePropTypes;

const MultiRendererEditor = React.createClass({
    propTypes: {
        Layout: React.PropTypes.func,
        // TODO(emily): use ApiOptions.propTypes
        apiOptions: React.PropTypes.any.isRequired,

        content: React.PropTypes.any.isRequired,
        editorMode: React.PropTypes.oneOf(EDITOR_MODES).isRequired,

        onChange: React.PropTypes.func.isRequired,
    },

    _renderLayout() {
        const {Layout, apiOptions, content} = this.props;

        return <Layout
            ref={e => this.layout = e}
            content={content}
            apiOptions={apiOptions}
        />;
    },

    _renderJson() {
        return <div>
            <ModeDropdown
                currentMode={this.props.editorMode}
                onChange={editorMode => this.props.onChange({editorMode})}
            />
            <JsonEditor
                multiLine
                value={this.props.content}
                onChange={content => this.props.onChange({content})}
            />
        </div>;
    },

    _renderPreview() {
        return <div>
            <ModeDropdown
                currentMode={this.props.editorMode}
                onChange={editorMode => this.props.onChange({editorMode})}
            />
            {this._renderLayout()}
        </div>;
    },

    handleEditorChange(path, newValue) {
        this.props.onChange({
            content: lens(this.props.content).merge(path, newValue).freeze(),
        });
    },

    addArrayElement(path, shape) {
        const currentLength = lens(this.props.content).get(path).length;
        const newElementPath = path.concat(currentLength);
        const newValue = emptyValueForShape(shape);
        this.props.onChange({
            content: lens(this.props.content).set(newElementPath, newValue)
                .freeze(),
        });
    },

    removeArrayElement(path) {
        this.props.onChange({
            content: lens(this.props.content).del(path).freeze(),
        });
    },

    moveArrayElementDown(path) {
        // Moving an element down can also be expressed as swapping it with the
        // following element.
        const index = path[path.length - 1];
        const nextElementIndex = index + 1;
        const nextElementPath = path.slice(0, -1).concat(nextElementIndex);

        const element = lens(this.props.content).get(path);
        const nextElement = lens(this.props.content).get(nextElementPath);

        this.props.onChange({
            content: lens(this.props.content)
                .set(path, nextElement)
                .set(nextElementPath, element)
                .freeze(),
        });
    },

    moveArrayElementUp(path) {
        // Moving an element up can also be expressed as moving the previous
        // element down.
        const index = path[path.length - 1];
        const previousElementPath = path.slice(0, -1).concat(index - 1);
        this.moveArrayElementDown(previousElementPath);
    },

    _renderEdit() {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        };

        const content = this.props.content;
        const itemShape = this.props.Layout.shape;

        const editor = <NodeContainer
            shape={itemShape}
            data={content}
            path={[]}
            actions={this}
            apiOptions={apiOptions}
        />;

        return <div>
            <ModeDropdown
                currentMode={this.props.editorMode}
                onChange={editorMode => this.props.onChange({editorMode})}
            />
            <div className={"perseus-editor-table " + css(styles.editor)}>
                <div className="perseus-editor-row">
                    <div className="perseus-editor-left-cell">
                        {editor}
                    </div>
                    <div className="perseus-editor-right-cell">
                        {this._renderLayout()}
                    </div>
                </div>
            </div>
        </div>;
    },

    score() {
        if (this.layout) {
            return this.layout.score();
        }
    },

    getSerializedState() {
        if (this.layout) {
            return this.layout.getSerializedState();
        }
    },

    restoreSerializedState(state) {
        if (this.layout) {
            this.layout.restoreSerializedState(state);
        }
    },

    _renderContent() {
        switch (this.props.editorMode) {
            case "json": return this._renderJson();
            case "preview": return this._renderPreview();
            case "edit": return this._renderEdit();
            default:
                return <ModeDropdown
                    currentMode={this.props.editorMode}
                    onChange={editorMode => this.props.onChange({
                        editorMode,
                    })}
                />;
        }
    },

    render() {
        return <div id="perseus">
            {this._renderContent()}
        </div>;
    },
});

const styles = StyleSheet.create({
    editor: {
        width: "100%",
    },

    verticalFlip: {
        transform: "scaleY(-1)",
    },

    container: {
        marginBottom: 16,
    },

    controls: {
        display: "flex",
    },

    control: {
        marginLeft: 12,
    },

    collectionHeader: {
        display: "flex",
        flexDirection: "row",
    },

    collectionName: {
        flexGrow: 1,
        margin: 0,
    },
});

module.exports = MultiRendererEditor;
