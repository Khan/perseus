
var FloatingWidgetEditor = React.createClass({
	propTypes: {
	},
	render: function () {
		var style = {
			fontSize: "20px",
			color: "red"
		}
		return <div>
			<i className="icon-edit" style={style}>&nbsp;</i>
		</div>;
	}
});

module.exports = FloatingWidgetEditor;