/**
 * Editor for a multi-item question.
 *
 * TODO(mdr): The UI for managing arrays isn't visually consistent with
 *     HintsEditor. Should we bring them in line with each other?
 */
import {
    ApiOptions,
    buildEmptyItemTreeForShape,
    components,
    icons,
    itemToTree,
    MultiItems,
} from "@khanacademy/perseus";
import {StyleSheet, css} from "aphrodite";
// eslint-disable-next-line import/no-extraneous-dependencies
import lens from "hubble";
import * as React from "react";
import ReactDOM from "react-dom";

import JsonEditor from "./components/json-editor";
import SimpleButton from "./components/simple-button";
import Editor from "./editor";
import {HintEditor} from "./hint-editor";

import type {
    APIOptions,
    ChangeHandler,
    EditorMode,
    // Multi-item item types
    Item,
    // ItemTree is used below, the linter is confused.
    ItemTree, // eslint-disable-line @typescript-eslint/no-unused-vars
    ItemObjectNode,
    ItemArrayNode,
    ContentNode,
    HintNode,
    TagsNode,
    // Multi-item shape types
    Shape,
    ArrayShape,
    ObjectShape,
    ContentShape,
    HintShape,
    TagsShape,
} from "@khanacademy/perseus";

const {InlineIcon} = components;
const {iconChevronDown, iconTrash} = icons;
const {MultiRenderer} = MultiItems;

// TODO(CP-4849): figure out when $ReadOnlyArray<number> vs $ReadOnlyArray<string> should be used
type Path = ReadonlyArray<any>;

type ModeDropdownProps = {
    currentMode: EditorMode;
    // A function that takes in a string signifying the mode (ex: "edit")
    onChange: (mode: EditorMode) => unknown;
};

/**
 * Component that displays the mode dropdown.
 *
 * The mode dropdown is the selector at the top of the editor that lets you
 * switch between edit, preview, and dev-only JSON mode.
 */
class ModeDropdown extends React.Component<ModeDropdownProps> {
    _handleSelectMode = (event: React.ChangeEvent<HTMLSelectElement>) => {
        if (this.props.onChange) {
            // event.target.value corresponds to the options' values below which
            // are limited to EditorMode, but TypeScript doesn't know that so we have
            // to cast through any here.
            const value = event.target.value as EditorMode;
            this.props.onChange(value);
        }
    };

    render(): React.ReactNode {
        return (
            <label>
                Mode:{" "}
                <select
                    value={this.props.currentMode}
                    onChange={this._handleSelectMode}
                >
                    <option value="edit">Edit</option>
                    <option value="preview">Preview</option>
                    <option value="json">Dev-only JSON</option>
                </select>
            </label>
        );
    }
}

/**
 * Convert a camel-cased string to a human-formatted string.
 * "superCoolThings" -> "super cool things"
 */
function camelCaseToHuman(str: string) {
    // Decapitalize the capital letters, and add a space before each.
    return str.replace(/[A-Z]/g, (s) => " " + s.toLowerCase());
}

/**
 * Capitalize the first letter of the given string.
 * "super cool things" -> "Super cool things"
 */
function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

/**
 * Convert the given pluralized word to a singularized word.
 * "super cool things" -> "super cool thing"
 */
function pluralToSingular(str: string) {
    if (str.charAt(str.length - 1) === "s") {
        // Incredibly weak implementation :P
        return str.slice(0, -1);
    }
    // Uh oh, dunno how to singularize anything but the simplest case!
    // Let's just return the plural form, and hope the user forgives the
    // grammatical inconsistency.
    return str;
}

/**
 * When iterating through the editors, we don't keep track of the extra
 * `_multi` part at the beginning. This is a helper function which takes a path
 * and prepends that key.
 */
function multiPath(path: Path | Array<any>) {
    return ["_multi", ...path];
}

// Return an h1 if depth=0, h2 if depth=1, etc.
// NOTE: This component accepts pass-through props.
type HeaderProps = {
    depth: number;
};

const Header = ({depth, ...props}: HeaderProps): React.ReactElement => {
    const headerLevel = Math.min(depth, 5) + 1;
    const HeaderTag = `h${headerLevel}`;
    return <HeaderTag {...props} />;
};

// Actions is inexact so that we can pass an instance MultiRendererEditor.
interface Actions {
    addArrayElement: (path: Path, shape: Shape) => void;
    mergeValueAtPath: (path: Path, newValue?: any) => void;
    setValueAtPath: (path: Path, newValue?: any) => void;
    moveArrayElementDown: (path: Path) => void;
    moveArrayElementUp: (path: Path) => void;
    removeArrayElement: (path: Path) => void;
}

// This type is used to define prop types for various nodes.  The S and D type
// params should match when used, e.g. the prop types for `HintNodeContent` is
// `NodePropTypes<HintShape, HintNode>`.
type NodePropTypes<S = Shape, D = ItemTree> = {
    shape: S;
    data: D;
    path: Path;
    actions: Actions;
    apiOptions: APIOptions;
    // For the left-hand column, we use edit mode and leave renderers empty.
    // For the right-hand column, we use preview mode and provide renderers
    // via a MultiRenderer.
    // TODO(CP-4850): figure out how to type this, it appears to be a tree where the
    // leaf nodes could be typed using RendererInterface.
    renderers?: any;
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
const NodeContainer = (
    props: NodePropTypes & {
        controls?: ReadonlyArray<React.ReactNode>;
        name?: string;
    },
) => {
    const {
        shape,
        data,
        path,
        actions,
        name: givenName,
        controls,
        ...otherProps
    } = props;

    const name = givenName || camelCaseToHuman(path[path.length - 1] || "");

    const children = (
        <NodeContent
            {...otherProps}
            shape={shape}
            data={data}
            path={path}
            actions={actions}
        />
    );

    const key = path.join(".");

    if (shape.type === "array") {
        return (
            <ArrayContainer
                key={key}
                name={name}
                controls={controls}
                path={path}
                shape={shape}
                actions={actions}
            >
                {children}
            </ArrayContainer>
        );
    }
    if (shape.type === "object") {
        return (
            <ObjectContainer
                key={key}
                name={name}
                controls={controls}
                path={path}
            >
                {children}
            </ObjectContainer>
        );
    }
    return (
        <LeafContainer
            key={key}
            name={name}
            controls={controls}
            path={path}
            shape={shape}
        >
            {children}
        </LeafContainer>
    );
};

type LeafContainerProps = {
    name: string;
    controls?: React.ReactNode;
    children?: React.ReactNode;
    path: Path;
    shape: Shape;
};
const LeafContainer = ({
    name,
    controls,
    children,
    path,
    shape,
}: LeafContainerProps): React.ReactElement => {
    const hasPreviewHeading = shape.type === "content" || shape.type === "hint";
    const previewHeading = hasPreviewHeading && (
        <div className={css(styles.containerHeader)}>
            {/* @ts-expect-error - TS2322 - Type '{ children: string; depth: number; className: string; }' is not assignable to type 'IntrinsicAttributes & HeaderProps & { children?: ReactNode; }'. */}
            <Header depth={path.length} className={css(styles.containerTitle)}>
                {capitalize(name)}
            </Header>
        </div>
    );
    return (
        <div className={css(styles.container)}>
            <span className={css(styles.row, styles.rowHeading)}>
                <div className={css(styles.columnLeft)}>
                    <div className={"pod-title " + css(styles.containerHeader)}>
                        <div className={css(styles.containerTitle)}>
                            {capitalize(name)}
                        </div>
                        {controls}
                    </div>
                </div>
                <div className={css(styles.columnRight)}>{previewHeading}</div>
            </span>
            {children}
        </div>
    );
};

interface ArrayContainerActions {
    addArrayElement: (path: Path, shape: Shape) => void;
}

type ArrayContainerProps = {
    name: string;
    controls?: React.ReactNode;
    children?: React.ReactNode;
    path: Path;
    shape: ArrayShape;
    actions: ArrayContainerActions;
};
const ArrayContainer = (props: ArrayContainerProps): React.ReactElement => {
    const {name, controls, children, path, shape, actions} = props;
    return (
        <div className={css(styles.container)}>
            {controls && (
                <div className={css(styles.columnLeft, styles.containerHeader)}>
                    {controls}
                </div>
            )}
            <div>{children}</div>
            <div className={css(styles.columnLeft)}>
                {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a
                    href="javascript:void 0"
                    onClick={() =>
                        actions.addArrayElement(path, shape.elementShape)
                    }
                >
                    Add a {pluralToSingular(name)}
                </a>
            </div>
        </div>
    );
};

type ObjectContainerProps = {
    name: string;
    controls?: React.ReactNode;
    children?: React.ReactNode;
    path: Path;
};
const ObjectContainer = ({
    name,
    controls,
    children,
    path,
}: ObjectContainerProps): React.ReactElement => {
    const headingEditor = (
        <div className={css(styles.containerHeader)}>
            {/* @ts-expect-error - TS2322 - Type '{ children: string; depth: number; className: string; }' is not assignable to type 'IntrinsicAttributes & HeaderProps & { children?: ReactNode; }'. */}
            <Header depth={path.length} className={css(styles.containerTitle)}>
                {capitalize(name)}
            </Header>
            {controls}
        </div>
    );
    const headingPreview = (name || controls) && (
        <div
            className={css(
                styles.containerHeader,
                styles.previewCollectionHeader,
            )}
        >
            {/* @ts-expect-error - TS2322 - Type '{ children: string; depth: number; className: string; }' is not assignable to type 'IntrinsicAttributes & HeaderProps & { children?: ReactNode; }'. */}
            <Header depth={path.length} className={css(styles.containerTitle)}>
                {capitalize(name)}
            </Header>
        </div>
    );
    const hasBothHeadings = headingEditor && headingPreview;
    return (
        <div className={css(styles.container)}>
            {hasBothHeadings && (
                <span className={css(styles.row)}>
                    <div className={css(styles.columnLeft)}>
                        {headingEditor}
                    </div>
                    <div className={css(styles.columnRight)}>
                        {headingPreview}
                    </div>
                </span>
            )}
            <div className={css(path.length > 0 && styles.contentIndent)}>
                {children}
            </div>
        </div>
    );
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
const NodeContent = (props: NodePropTypes) => {
    const {shape, data, ...restProps} = props;

    // All uses of `data` have been cast through any which isn't safe. This was
    // done to avoid introducing new logic which may have resulted in a change
    // of behavior.  Also, there doesn't appear to be a way to tell TypeScript the
    // difference between and `TagsNode` and `ItemArrayNode`, see
    // perseus-all-package/multi-items/item-types.js.
    if (shape.type === "content") {
        return (
            <ItemNodeContent
                shape={shape}
                data={data as ContentNode}
                {...restProps}
            />
        );
    }
    if (shape.type === "hint") {
        return (
            <HintNodeContent
                shape={shape}
                data={data as HintNode}
                {...restProps}
            />
        );
    }
    if (shape.type === "tags") {
        return (
            <TagsNodeContent
                shape={shape}
                data={data as TagsNode}
                {...restProps}
            />
        );
    }
    if (shape.type === "array") {
        return (
            <ArrayNodeContent
                shape={shape}
                data={data as ItemArrayNode}
                {...restProps}
            />
        );
    }
    if (shape.type === "object") {
        return (
            <ObjectNodeContent
                shape={shape}
                data={data as ItemObjectNode}
                {...restProps}
            />
        );
    }
    return null;
};

type WithStickinessProps = {
    sticky: boolean;
};

type WithStickiness<T> = T & WithStickinessProps;

/**
 * HOC that adds a "sticky" prop to the wrapped component that is true
 * when the rendered component is taller than the window. Since sticky content
 * can be somewhat distracting, we'd like to avoid it when not useful. This
 * HOC is useful for only making content sticky when useful.
 *
 * It does so by polling the height and comparing it to the window height.
 */
const withStickiness = <
    Config extends Record<any, any>,
    Component extends React.ComponentType<WithStickiness<Config>>,
>(
    WrappedComponent: Component,
): React.ComponentType<Config> => {
    type State = {
        sticky: boolean;
    };
    return class StickyComponent extends React.Component<Config, State> {
        // @ts-expect-error - TS2564 - Property 'stickynessTimer' has no initializer and is not definitely assigned in the constructor.
        stickynessTimer: number;

        state = {
            sticky: false,
        };

        componentDidMount() {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            // @ts-expect-error - TS2322 - Type 'Timer' is not assignable to type 'number'.
            this.stickynessTimer = setInterval(this.updateStickiness, 1000);
            this.updateStickiness();
        }

        componentWillUnmount() {
            // TODO(jeff, CP-3128): Use Wonder Blocks Timing API.
            // eslint-disable-next-line no-restricted-syntax
            clearInterval(this.stickynessTimer);
        }

        updateStickiness = () => {
            const domNode = ReactDOM.findDOMNode(this);
            // @ts-expect-error - TS2531 - Object is possibly 'null'. | TS2339 - Property 'offsetHeight' does not exist on type 'Element | Text'.
            const height = domNode.offsetHeight;
            const windowHeight = window.innerHeight;
            const sticky = height > windowHeight;
            if (sticky !== this.state.sticky) {
                this.setState({
                    sticky,
                });
            }
        };

        render(): React.ReactNode {
            return (
                // @ts-expect-error - TS2322 - Type 'Readonly<Config> & { sticky: boolean; children?: ReactNode; }' is not assignable to type 'IntrinsicAttributes & LibraryManagedAttributes<Component, PropsWithChildren<WithStickiness<Config>>>'.
                <WrappedComponent {...this.props} sticky={this.state.sticky} />
            );
        }
    };
};

const ItemNodeContent = withStickiness(
    (props: NodePropTypes<ContentShape, ContentNode> & WithStickinessProps) => {
        const {data, path, actions, apiOptions, renderers, sticky} = props;

        const preview = (
            <div className="framework-perseus">{lens(renderers).get(path)}</div>
        );

        return (
            <span>
                <div className={css(styles.row)}>
                    <div className={css(styles.columnLeft)}>
                        <div className={css(sticky && styles.sticky)}>
                            {/* TODO(CP-4852): only pass the props to Editor that it uses. */}
                            {
                                // @ts-expect-error - TS2769 - No overload matches this call.
                                <Editor
                                    {...data}
                                    onChange={(newVal) =>
                                        actions.mergeValueAtPath(path, newVal)
                                    }
                                    apiOptions={apiOptions}
                                />
                            }
                        </div>
                    </div>
                    <div className={css(styles.columnRight)}>
                        <div className={css(sticky && styles.sticky)}>
                            {preview}
                        </div>
                    </div>
                </div>
            </span>
        );
    },
);

const HintNodeContent = withStickiness(
    (props: NodePropTypes<HintShape, HintNode> & WithStickinessProps) => {
        const {data, path, actions, apiOptions, renderers, sticky} = props;

        const preview = (
            <div className="framework-perseus">{lens(renderers).get(path)}</div>
        );

        return (
            <div className={css(styles.row)}>
                <div className={css(styles.columnLeft)}>
                    <div className={css(sticky && styles.sticky)}>
                        <HintEditor
                            {...data}
                            className={css(styles.hintEditor)}
                            onChange={(newVal) =>
                                actions.mergeValueAtPath(path, newVal)
                            }
                            apiOptions={apiOptions}
                            showTitle={false}
                            showRemoveButton={false}
                            showMoveButtons={false}
                            // no-op handler since showRemoveButton={false}
                            onRemove={() => {}}
                            // no-op handler since showMoveButtons={false}
                            onMove={(direction: number) => {}}
                            isFirst={true}
                            isLast={true}
                        />
                    </div>
                </div>
                <div className={css(styles.columnRight)}>
                    <div className={css(sticky && styles.sticky)}>
                        {preview}
                    </div>
                </div>
            </div>
        );
    },
);

const TagsNodeContent = (props: NodePropTypes<TagsShape, TagsNode>) => {
    const {data, path, actions, apiOptions} = props;
    const {GroupMetadataEditor} = apiOptions;

    if (GroupMetadataEditor == null) {
        return null;
    }
    return (
        <div className={css(styles.columnLeft)}>
            <div className={css(styles.tagsEditor)}>
                <GroupMetadataEditor
                    value={data}
                    onChange={(newVal) => actions.setValueAtPath(path, newVal)}
                    showTitle={false}
                />
            </div>
        </div>
    );
};

const ArrayNodeContent = (props: NodePropTypes<ArrayShape, ItemArrayNode>) => {
    const {shape, data, path, actions, ...otherProps} = props;

    const collectionName = camelCaseToHuman(path[path.length - 1]);
    const elementName = pluralToSingular(collectionName);

    const elementType = shape.elementShape.type;
    const elementIsLeaf = elementType === "content" || elementType === "hint";

    /**
     * TODO(somewhatabstract, JIRA-XXXX):
     * The NodePropTypes generic and specifically the ItemArrayNode could
     * contain a variety of types that are not arrays. Probably need to refine
     * the type more before doing this work, or rework the `ArrayNodeContent`
     * component to be less permissive about the props it accepts.
     */
    const children = data.map((subdata, i) => {
        const subpath = path.concat(i);
        const controls = [
            i > 0 && (
                <div key="moveArrayElementUp" className={css(styles.control)}>
                    <SimpleButton
                        color="orange"
                        title="Move up"
                        onClick={() => actions.moveArrayElementUp(subpath)}
                    >
                        <div className={css(styles.verticalFlip)}>
                            <InlineIcon {...iconChevronDown} />
                        </div>
                    </SimpleButton>
                </div>
            ),
            i < data.length - 1 && (
                <div key="moveArrayElementDown" className={css(styles.control)}>
                    <SimpleButton
                        color="orange"
                        title="Move down"
                        onClick={() => actions.moveArrayElementDown(subpath)}
                    >
                        <InlineIcon {...iconChevronDown} />
                    </SimpleButton>
                </div>
            ),
            <div key="removeArrayElement" className={css(styles.control)}>
                <SimpleButton
                    color="orange"
                    title="Delete"
                    onClick={() => actions.removeArrayElement(subpath)}
                >
                    <InlineIcon {...iconTrash} />
                </SimpleButton>
            </div>,
        ];

        return (
            <div
                key={i}
                className={css(
                    styles.arrayElement,
                    !elementIsLeaf && styles.arrayElementAndNotLeaf,
                )}
            >
                <NodeContainer
                    {...otherProps}
                    key={i}
                    shape={shape.elementShape}
                    data={subdata}
                    path={subpath}
                    actions={actions}
                    name={`${elementName} ${i + 1}`}
                    controls={controls}
                />
            </div>
        );
    });

    return <div>{children}</div>;
};

const ObjectNodeContent = (
    props: NodePropTypes<ObjectShape, ItemObjectNode>,
) => {
    const {shape, data, path, ...otherProps} = props;

    // Object iteration order should automatically match the order in which the
    // keys were defined in the object literal. So, whatever order semantically
    // made sense to the shape's author is the order in which we'll iterate :)
    const children = Object.keys(shape.shape).map((subkey) => (
        <div key={subkey} className={css(styles.objectElement)}>
            <NodeContainer
                {...otherProps}
                shape={shape.shape[subkey]}
                data={data[subkey]}
                path={path.concat(subkey)}
            />
        </div>
    ));

    return <div>{children}</div>;
};

interface LayoutStatics {
    shape: Shape;
}

type MultiRendererEditorProps = {
    // eslint-disable-next-line no-restricted-syntax
    Layout: React.ComponentType<any> & LayoutStatics;
    apiOptions: APIOptions;
    item: Item;
    editorMode: EditorMode;
    onChange: ChangeHandler;
};

class MultiRendererEditor extends React.Component<MultiRendererEditorProps> {
    layout: React.ElementRef<any> | null | undefined;

    _renderLayout: () => React.ReactElement = () => {
        const {Layout, apiOptions, item} = this.props;

        return (
            <Layout
                ref={(node) => (this.layout = node)}
                item={item}
                apiOptions={apiOptions}
            />
        );
    };

    _renderJson: () => React.ReactElement<React.ComponentProps<"div">> = () => {
        return (
            <div>
                <ModeDropdown
                    currentMode={this.props.editorMode}
                    onChange={(editorMode) => this.props.onChange({editorMode})}
                />
                <JsonEditor
                    multiLine
                    value={this.props.item}
                    onChange={(item) => this.props.onChange({item})}
                />
            </div>
        );
    };

    _renderPreview: () => React.ReactElement<React.ComponentProps<"div">> =
        () => {
            return (
                <div>
                    <ModeDropdown
                        currentMode={this.props.editorMode}
                        onChange={(editorMode) =>
                            this.props.onChange({editorMode})
                        }
                    />
                    {this._renderLayout()}
                </div>
            );
        };

    mergeValueAtPath: (path: Path, newValue?: any) => void = (
        path: Path,
        newValue: unknown,
    ) => {
        this.props.onChange({
            item: lens(this.props.item)
                .merge(multiPath(path), newValue)
                .freeze(),
        });
    };

    setValueAtPath: (path: Path, newValue?: any) => void = (
        path: Path,
        newValue: unknown,
    ) => {
        this.props.onChange({
            item: lens(this.props.item).set(multiPath(path), newValue).freeze(),
        });
    };

    addArrayElement: (path: Path, shape: Shape) => void = (
        path: Path,
        shape: Shape,
    ) => {
        const currentLength = lens(this.props.item).get(multiPath(path)).length;
        const newElementPath = path.concat(currentLength);
        const newValue = buildEmptyItemTreeForShape(shape);
        this.props.onChange({
            item: lens(this.props.item)
                .set(multiPath(newElementPath), newValue)
                .freeze(),
        });
    };

    removeArrayElement: (path: Path) => void = (path: Path) => {
        this.props.onChange({
            item: lens(this.props.item).del(multiPath(path)).freeze(),
        });
    };

    moveArrayElementDown: (path: Path) => void = (path: Path) => {
        // Moving an element down can also be expressed as swapping it with the
        // following element.
        const index = path[path.length - 1];
        const nextElementIndex = index + 1;
        const nextElementPath = path.slice(0, -1).concat(nextElementIndex);

        const element = lens(this.props.item).get(multiPath(path));
        const nextElement = lens(this.props.item).get(
            multiPath(nextElementPath),
        );

        this.props.onChange({
            item: lens(this.props.item)
                .set(multiPath(path), nextElement)
                .set(multiPath(nextElementPath), element)
                .freeze(),
        });
    };

    moveArrayElementUp: (path: Path) => void = (path: Path) => {
        // Moving an element up can also be expressed as moving the previous
        // element down.
        const index = path[path.length - 1];
        const previousElementPath = path.slice(0, -1).concat(index - 1);
        this.moveArrayElementDown(previousElementPath);
    };

    _renderEdit: () => React.ReactElement<React.ComponentProps<"div">> = () => {
        const apiOptions = {
            ...ApiOptions.defaults,
            ...this.props.apiOptions,
        } as const;

        const {item} = this.props;
        const itemShape: Shape = this.props.Layout.shape;

        return (
            <div className="perseus-multirenderer-editor">
                <ModeDropdown
                    currentMode={this.props.editorMode}
                    onChange={(editorMode) => this.props.onChange({editorMode})}
                />

                <MultiRenderer
                    item={item}
                    shape={itemShape}
                    apiOptions={apiOptions}
                    // Today, with analytics being the only thing in
                    // dependencies, we send in a dummy function as we don't
                    // want to gather analytics events from within the editor.
                    dependencies={{
                        analytics: {onAnalyticsEvent: async () => {}},
                    }}
                >
                    {({renderers}) => (
                        <NodeContainer
                            shape={itemShape}
                            data={itemToTree(item)}
                            path={[]}
                            actions={this}
                            apiOptions={apiOptions}
                            renderers={renderers}
                        />
                    )}
                </MultiRenderer>
            </div>
        );
    };

    score: () => any | undefined = () => {
        if (this.layout) {
            // @ts-expect-error - TS2571 - Object is of type 'unknown'.
            return this.layout.score();
        }
    };

    getSerializedState: () => any | undefined = () => {
        if (this.layout) {
            // @ts-expect-error - TS2571 - Object is of type 'unknown'.
            return this.layout.getSerializedState();
        }
    };

    restoreSerializedState: (state?: any) => void = (state: any) => {
        if (this.layout) {
            // @ts-expect-error - TS2571 - Object is of type 'unknown'.
            this.layout.restoreSerializedState(state);
        }
    };

    _renderContent: () =>
        | React.ReactElement<React.ComponentProps<"div">>
        | React.ReactNode = () => {
        switch (this.props.editorMode) {
            case "json":
                return this._renderJson();
            case "preview":
                return this._renderPreview();
            case "edit":
                return this._renderEdit();
            default:
                return (
                    <ModeDropdown
                        currentMode={this.props.editorMode}
                        onChange={(editorMode) =>
                            this.props.onChange({
                                editorMode,
                            })
                        }
                    />
                );
        }
    };

    render(): React.ReactNode {
        return <div id="perseus">{this._renderContent()}</div>;
    }
}

const styles = StyleSheet.create({
    // This is used in a number of places throughout this file.
    container: {},

    // eslint-disable-next-line react-native/no-unused-styles
    editor: {
        width: "100%",
    },

    // eslint-disable-next-line react-native/no-unused-styles
    treePreview: {
        position: "relative",
    },

    verticalFlip: {
        transform: "scaleY(-1)",
    },

    control: {
        marginLeft: 12,
    },

    containerHeader: {
        alignItems: "flex-end",
        display: "flex",
        flexDirection: "row",
    },

    previewCollectionHeader: {
        marginBottom: 16,
    },

    containerTitle: {
        flexGrow: 1,
        margin: 0,
    },

    contentIndent: {
        marginLeft: 8,
    },

    hintEditor: {
        paddingBottom: 0,
    },

    arrayElement: {
        marginBottom: 16,
    },

    // Leaf nodes are already wrapped in cute little pods, so they don't need
    // this extra border between array elements.
    arrayElementAndNotLeaf: {
        borderBottom: "1px solid #ccc",
        ":first-child": {
            borderTop: "1px solid #ccc",
            paddingTop: 16,
        },
    },

    objectElement: {
        marginBottom: 16,
    },

    tagsEditor: {
        border: "1px solid #ddd",
        padding: "5px 10px",
    },

    /**
     * A row contains a fixed width editor and a preview that expands as
     * needed.
     */
    row: {
        display: "flex",
        position: "relative",
    },

    /**
     * The editor.
     */
    columnLeft: {
        width: 360,
        marginRight: 30,
        // so that the `position: absolute` of line markers are positioned
        // relative to this.
        position: "relative",
    },

    /**
     * The preview.
     */
    columnRight: {
        flex: 1,
        marginLeft: 30,
        position: "relative",
    },

    /**
     * Sticks to just under the heading.
     */
    sticky: {
        position: "sticky",
        top: 33, // height of the cute pod for the editor
    },

    /**
     * Used for sticky headings.
     */
    rowHeading: {
        position: "sticky",
        backgroundColor: "white",
        width: "100%",
        // TODO(joshuan): Make this less arbitrary. It should be higher than
        // perseus content.
        zIndex: 101,
        top: -1,
    },
});

export default MultiRendererEditor;
