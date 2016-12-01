/**
 * Main entry point to the MultiRenderer render portion.
 *
 * Mainly, this file exposes the `MultiRenderer` component which performs
 * multi-rendering. To multi-render a question, pass in the content of the item
 * to the `MultiRenderer` component as a props. Then, pass in a function which
 * takes an object of renderers (in the same structure as the content), and
 * return a render tree. The `MultiRenderer` component will allow you to
 * combine scores, serialized state, etc. without having to manually call on
 * each of the functions. It also handles inter-widgets requests between the
 * different renderers.
 *
 * Example:
 *
 *   content = { left: <item data>, right: [<item data>, <item data>] }
 *
 *   <MultiRenderer content={content}>
 *       {({renderers}) =>
 *           <div>
 *               <div id="left">{renderers.left}</div>
 *               <ul id="right">
 *                   {renderers.right.map(r => <li>{r}</li>)}
 *               </ul>
 *           </div>
 *       }
 *   </MultiRenderer>
 */
const React = require("react");

const Renderer = require("./renderer.jsx");

const MultiRenderer = React.createClass({
    propTypes: {
        content: React.PropTypes.any.isRequired,
        children: React.PropTypes.func.isRequired,
    },

    componentWillMount() {
        this._rendererData = {
            left: this._makeRendererData(this.props.content.left),
            right: [
                this._makeRendererData(this.props.content.right[0]),
            ],
        };
    },

    componentWillReceiveProps(nextProps) {
        if (nextProps.content !== this.props.content) {
            this._rendererData = {
                left: this._makeRendererData(nextProps.left),
                right: [
                    this._makeRendererData(nextProps.right[0]),
                ],
            };
        }
    },

    _makeRendererData(item) {
        const data = {
            renderer: null,
            ref: null,
        };

        /* eslint-disable no-unused-vars */
        // eslint is complaining that `content` and `children` are unused. I'm
        // explicitly pulling them out of `this.props` so I don't pass them to
        // `<Renderer>`. I'm not sure how else to do this.
        const {
            content,
            children,
            ...otherProps, // @Nolint(trailing comma): I'm so confused why it's
                           // complaining about this, we want trailing commas..
        } = this.props;
        /* eslint-enable no-unused-vars */

        // NOTE(emily): The `findExternalWidgets` function here is computed
        // inline and thus changes each time we run this function. If it were
        // to change every render, it would cause the Renderer to re-render a
        // lot more than is necessary. Don't re-compute this element unless it
        // is necessary!
        data.renderer = <Renderer
            {...otherProps}
            {...item}
            ref={e => data.ref = e}
            findExternalWidgets={
                criterion => this._findWidgets(data, criterion)}
        />;

        return data;
    },

    _findWidgets(callingData, filterCriterion) {
        const results = [];

        const {left, right} = this._rendererData;

        if (left.ref && callingData !== left) {
            results.push(...left.ref.findInternalWidgets(filterCriterion));
        }

        if (right[0].ref && callingData !== right[0]) {
            results.push(...right[0].ref.findInternalWidgets(filterCriterion));
        }

        return results;
    },

    render() {
        return <div>
            {this.props.children({
                renderers: {
                    left: this._rendererData.left.renderer,
                    right: [
                        this._rendererData.right[0].renderer,
                    ],
                },
            })}
        </div>;
    },
});

module.exports = MultiRenderer;
