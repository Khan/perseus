/** @jsx React.DOM */
(function(Perseus) {

// TODO(jack): Fix up all this requireness
require("./item-editor.jsx");
var ItemEditor = Perseus.ItemEditor;

var StatefulItemEditor = React.createClass({
    getInitialState: function() {
        return {};
    },

    render: function() {
        return ItemEditor(_.extend({},
            this.state,
            {ref: "itemEditor"}
        ));
    },

    toJSON: function() {
        // Always skip validation, because we don't like alerts!
        // (and alerts would be bad in a nice function to transform
        // props!)
        // TODO(jack): Get rid of skipValidation
        return this.refs.itemEditor.toJSON(/* skipValidation */ true);
    }
});

/**
 * Cleans up props by passing them through ItemEditor.toJSON
 *
 * @param jsonProps the object representing datastore json / editor props
 * @returns a promise that resolves to the editor props json after being
 * passed through an editor to clean it up (give it default values, etc.)
 */
var fixupJSON = function(jsonProps) {
    $hidden = $("<div>").css("display", "none");
    $hidden.appendTo(document.body);
    var result = $.Deferred();

    React.renderComponent(
        <StatefulItemEditor />,
        $hidden.get(0),
        function() {
            var json = this.toJSON();  // `this` is the editor
            React.unmountComponentAtNode($hidden.get(0));
            $hidden.remove();
            result.resolve(json);
        }
    );

    return result.promise();
};

module.exports = fixupJSON;

})(Perseus);
