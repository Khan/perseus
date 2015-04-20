/*! Perseus | http://github.com/Khan/perseus */
// commit c3b673f72248510b4baeeeb21ab495e6a0d513dc
// branch gh-pages
!function(e){"object"==typeof exports?module.exports=e():"function"==typeof define&&define.amd?define(e):"undefined"!=typeof window?window.Perseus=e():"undefined"!=typeof global?global.Perseus=e():"undefined"!=typeof self&&(self.Perseus=e())}(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
/*
Software License Agreement (BSD License)

Copyright (c) 2009-2011, Kevin Decker <kpdecker@gmail.com>

All rights reserved.

Redistribution and use of this software in source and binary forms, with or without modification,
are permitted provided that the following conditions are met:

* Redistributions of source code must retain the above
  copyright notice, this list of conditions and the
  following disclaimer.

* Redistributions in binary form must reproduce the above
  copyright notice, this list of conditions and the
  following disclaimer in the documentation and/or other
  materials provided with the distribution.

* Neither the name of Kevin Decker nor the names of its
  contributors may be used to endorse or promote products
  derived from this software without specific prior
  written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND ANY EXPRESS OR
IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND
FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR
CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER
IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT
OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

/*
 * Text diff implementation.
 *
 * This library supports the following APIS:
 * JsDiff.diffChars: Character by character diff
 * JsDiff.diffWords: Word (as defined by \b regex) diff which ignores whitespace
 * JsDiff.diffLines: Line based diff
 *
 * JsDiff.diffCss: Diff targeted at CSS content
 *
 * These methods are based on the implementation proposed in
 * "An O(ND) Difference Algorithm and its Variations" (Myers, 1986).
 * http://citeseerx.ist.psu.edu/viewdoc/summary?doi=10.1.1.4.6927
 */
var JsDiff = (function() {
  /*jshint maxparams: 5*/
  function clonePath(path) {
    return { newPos: path.newPos, components: path.components.slice(0) };
  }
  function removeEmpty(array) {
    var ret = [];
    for (var i = 0; i < array.length; i++) {
      if (array[i]) {
        ret.push(array[i]);
      }
    }
    return ret;
  }
  function escapeHTML(s) {
    var n = s;
    n = n.replace(/&/g, '&amp;');
    n = n.replace(/</g, '&lt;');
    n = n.replace(/>/g, '&gt;');
    n = n.replace(/"/g, '&quot;');

    return n;
  }

  var Diff = function(ignoreWhitespace) {
    this.ignoreWhitespace = ignoreWhitespace;
  };
  Diff.prototype = {
      diff: function(oldString, newString) {
        // Handle the identity case (this is due to unrolling editLength == 0
        if (newString === oldString) {
          return [{ value: newString }];
        }
        if (!newString) {
          return [{ value: oldString, removed: true }];
        }
        if (!oldString) {
          return [{ value: newString, added: true }];
        }

        newString = this.tokenize(newString);
        oldString = this.tokenize(oldString);

        var newLen = newString.length, oldLen = oldString.length;
        var maxEditLength = newLen + oldLen;
        var bestPath = [{ newPos: -1, components: [] }];

        // Seed editLength = 0
        var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);
        if (bestPath[0].newPos+1 >= newLen && oldPos+1 >= oldLen) {
          return bestPath[0].components;
        }

        for (var editLength = 1; editLength <= maxEditLength; editLength++) {
          for (var diagonalPath = -1*editLength; diagonalPath <= editLength; diagonalPath+=2) {
            var basePath;
            var addPath = bestPath[diagonalPath-1],
                removePath = bestPath[diagonalPath+1];
            oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;
            if (addPath) {
              // No one else is going to attempt to use this value, clear it
              bestPath[diagonalPath-1] = undefined;
            }

            var canAdd = addPath && addPath.newPos+1 < newLen;
            var canRemove = removePath && 0 <= oldPos && oldPos < oldLen;
            if (!canAdd && !canRemove) {
              bestPath[diagonalPath] = undefined;
              continue;
            }

            // Select the diagonal that we want to branch from. We select the prior
            // path whose position in the new string is the farthest from the origin
            // and does not pass the bounds of the diff graph
            if (!canAdd || (canRemove && addPath.newPos < removePath.newPos)) {
              basePath = clonePath(removePath);
              this.pushComponent(basePath.components, oldString[oldPos], undefined, true);
            } else {
              basePath = clonePath(addPath);
              basePath.newPos++;
              this.pushComponent(basePath.components, newString[basePath.newPos], true, undefined);
            }

            var oldPos = this.extractCommon(basePath, newString, oldString, diagonalPath);

            if (basePath.newPos+1 >= newLen && oldPos+1 >= oldLen) {
              return basePath.components;
            } else {
              bestPath[diagonalPath] = basePath;
            }
          }
        }
      },

      pushComponent: function(components, value, added, removed) {
        var last = components[components.length-1];
        if (last && last.added === added && last.removed === removed) {
          // We need to clone here as the component clone operation is just
          // as shallow array clone
          components[components.length-1] =
            {value: this.join(last.value, value), added: added, removed: removed };
        } else {
          components.push({value: value, added: added, removed: removed });
        }
      },
      extractCommon: function(basePath, newString, oldString, diagonalPath) {
        var newLen = newString.length,
            oldLen = oldString.length,
            newPos = basePath.newPos,
            oldPos = newPos - diagonalPath;
        while (newPos+1 < newLen && oldPos+1 < oldLen && this.equals(newString[newPos+1], oldString[oldPos+1])) {
          newPos++;
          oldPos++;

          this.pushComponent(basePath.components, newString[newPos], undefined, undefined);
        }
        basePath.newPos = newPos;
        return oldPos;
      },

      equals: function(left, right) {
        var reWhitespace = /\S/;
        if (this.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right)) {
          return true;
        } else {
          return left === right;
        }
      },
      join: function(left, right) {
        return left + right;
      },
      tokenize: function(value) {
        return value;
      }
  };

  var CharDiff = new Diff();

  var WordDiff = new Diff(true);
  var WordWithSpaceDiff = new Diff();
  WordDiff.tokenize = WordWithSpaceDiff.tokenize = function(value) {
    return removeEmpty(value.split(/(\s+|\b)/));
  };

  var CssDiff = new Diff(true);
  CssDiff.tokenize = function(value) {
    return removeEmpty(value.split(/([{}:;,]|\s+)/));
  };

  var LineDiff = new Diff();
  LineDiff.tokenize = function(value) {
    var retLines = [],
        lines = value.split(/^/m);

    for(var i = 0; i < lines.length; i++) {
      var line = lines[i],
          lastLine = lines[i - 1];

      // Merge lines that may contain windows new lines
      if (line == '\n' && lastLine && lastLine[lastLine.length - 1] === '\r') {
        retLines[retLines.length - 1] += '\n';
      } else if (line) {
        retLines.push(line);
      }
    }

    return retLines;
  };

  return {
    Diff: Diff,

    diffChars: function(oldStr, newStr) { return CharDiff.diff(oldStr, newStr); },
    diffWords: function(oldStr, newStr) { return WordDiff.diff(oldStr, newStr); },
    diffWordsWithSpace: function(oldStr, newStr) { return WordWithSpaceDiff.diff(oldStr, newStr); },
    diffLines: function(oldStr, newStr) { return LineDiff.diff(oldStr, newStr); },

    diffCss: function(oldStr, newStr) { return CssDiff.diff(oldStr, newStr); },

    createPatch: function(fileName, oldStr, newStr, oldHeader, newHeader) {
      var ret = [];

      ret.push('Index: ' + fileName);
      ret.push('===================================================================');
      ret.push('--- ' + fileName + (typeof oldHeader === 'undefined' ? '' : '\t' + oldHeader));
      ret.push('+++ ' + fileName + (typeof newHeader === 'undefined' ? '' : '\t' + newHeader));

      var diff = LineDiff.diff(oldStr, newStr);
      if (!diff[diff.length-1].value) {
        diff.pop();   // Remove trailing newline add
      }
      diff.push({value: '', lines: []});   // Append an empty value to make cleanup easier

      function contextLines(lines) {
        return lines.map(function(entry) { return ' ' + entry; });
      }
      function eofNL(curRange, i, current) {
        var last = diff[diff.length-2],
            isLast = i === diff.length-2,
            isLastOfType = i === diff.length-3 && (current.added !== last.added || current.removed !== last.removed);

        // Figure out if this is the last line for the given file and missing NL
        if (!/\n$/.test(current.value) && (isLast || isLastOfType)) {
          curRange.push('\\ No newline at end of file');
        }
      }

      var oldRangeStart = 0, newRangeStart = 0, curRange = [],
          oldLine = 1, newLine = 1;
      for (var i = 0; i < diff.length; i++) {
        var current = diff[i],
            lines = current.lines || current.value.replace(/\n$/, '').split('\n');
        current.lines = lines;

        if (current.added || current.removed) {
          if (!oldRangeStart) {
            var prev = diff[i-1];
            oldRangeStart = oldLine;
            newRangeStart = newLine;

            if (prev) {
              curRange = contextLines(prev.lines.slice(-4));
              oldRangeStart -= curRange.length;
              newRangeStart -= curRange.length;
            }
          }
          curRange.push.apply(curRange, lines.map(function(entry) { return (current.added?'+':'-') + entry; }));
          eofNL(curRange, i, current);

          if (current.added) {
            newLine += lines.length;
          } else {
            oldLine += lines.length;
          }
        } else {
          if (oldRangeStart) {
            // Close out any changes that have been output (or join overlapping)
            if (lines.length <= 8 && i < diff.length-2) {
              // Overlapping
              curRange.push.apply(curRange, contextLines(lines));
            } else {
              // end the range and output
              var contextSize = Math.min(lines.length, 4);
              ret.push(
                  '@@ -' + oldRangeStart + ',' + (oldLine-oldRangeStart+contextSize)
                  + ' +' + newRangeStart + ',' + (newLine-newRangeStart+contextSize)
                  + ' @@');
              ret.push.apply(ret, curRange);
              ret.push.apply(ret, contextLines(lines.slice(0, contextSize)));
              if (lines.length <= 4) {
                eofNL(ret, i, current);
              }

              oldRangeStart = 0;  newRangeStart = 0; curRange = [];
            }
          }
          oldLine += lines.length;
          newLine += lines.length;
        }
      }

      return ret.join('\n') + '\n';
    },

    applyPatch: function(oldStr, uniDiff) {
      var diffstr = uniDiff.split('\n');
      var diff = [];
      var remEOFNL = false,
          addEOFNL = false;

      for (var i = (diffstr[0][0]==='I'?4:0); i < diffstr.length; i++) {
        if(diffstr[i][0] === '@') {
          var meh = diffstr[i].split(/@@ -(\d+),(\d+) \+(\d+),(\d+) @@/);
          diff.unshift({
            start:meh[3],
            oldlength:meh[2],
            oldlines:[],
            newlength:meh[4],
            newlines:[]
          });
        } else if(diffstr[i][0] === '+') {
          diff[0].newlines.push(diffstr[i].substr(1));
        } else if(diffstr[i][0] === '-') {
          diff[0].oldlines.push(diffstr[i].substr(1));
        } else if(diffstr[i][0] === ' ') {
          diff[0].newlines.push(diffstr[i].substr(1));
          diff[0].oldlines.push(diffstr[i].substr(1));
        } else if(diffstr[i][0] === '\\') {
          if (diffstr[i-1][0] === '+') {
            remEOFNL = true;
          } else if(diffstr[i-1][0] === '-') {
            addEOFNL = true;
          }
        }
      }

      var str = oldStr.split('\n');
      for (var i = diff.length - 1; i >= 0; i--) {
        var d = diff[i];
        for (var j = 0; j < d.oldlength; j++) {
          if(str[d.start-1+j] !== d.oldlines[j]) {
            return false;
          }
        }
        Array.prototype.splice.apply(str,[d.start-1,+d.oldlength].concat(d.newlines));
      }

      if (remEOFNL) {
        while (!str[str.length-1]) {
          str.pop();
        }
      } else if (addEOFNL) {
        str.push('');
      }
      return str.join('\n');
    },

    convertChangesToXML: function(changes){
      var ret = [];
      for ( var i = 0; i < changes.length; i++) {
        var change = changes[i];
        if (change.added) {
          ret.push('<ins>');
        } else if (change.removed) {
          ret.push('<del>');
        }

        ret.push(escapeHTML(change.value));

        if (change.added) {
          ret.push('</ins>');
        } else if (change.removed) {
          ret.push('</del>');
        }
      }
      return ret.join('');
    },

    // See: http://code.google.com/p/google-diff-match-patch/wiki/API
    convertChangesToDMP: function(changes){
      var ret = [], change;
      for ( var i = 0; i < changes.length; i++) {
        change = changes[i];
        ret.push([(change.added ? 1 : change.removed ? -1 : 0), change.value]);
      }
      return ret;
    }
  };
})();

if (typeof module !== 'undefined') {
    module.exports = JsDiff;
}

},{}],2:[function(require,module,exports){
/** @jsx React.DOM */

var React = require("react");

/* You know when you want to propagate input to a parent...
 * but then that parent does something with the input...
 * then changing the props of the input...
 * on every keystroke...
 * so if some input is invalid or incomplete...
 * the input gets reset or otherwise effed...
 *
 * This is the solution.
 *
 * Enough melodrama. Its an input that only sends changes
 * to its parent on blur.
 */
var BlurInput = React.createClass({displayName: 'BlurInput',
    propTypes: {
        value: React.PropTypes.string.isRequired,
        onChange: React.PropTypes.func.isRequired
    },
    getInitialState: function() {
        return { value: this.props.value };
    },
    render: function() {
        return this.transferPropsTo(React.DOM.input(
            {type:"text",
            value:this.state.value,
            onChange:this.handleChange,
            onBlur:this.handleBlur} ));
    },
    componentWillReceiveProps: function(nextProps) {
        this.setState({ value: nextProps.value });
    },
    handleChange: function(e) {
        this.setState({ value: e.target.value });
    },
    handleBlur: function(e) {
        this.props.onChange(e.target.value);
    }
});

module.exports = BlurInput;

},{"react":115}],3:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var RCSS = require('rcss');
var _ = require('underscore');

var outerStyle = {
    display: 'inline-block',
};

var buttonStyle = {
    backgroundColor: 'white',
    border: '1px solid #ccc',
    borderBottom: '1px solid #ccc',
    borderLeft: '0',
    cursor: 'pointer',
    margin: '0',
    padding: '5px 10px',
    position: 'relative', // for hover

    ':first-child': {
        borderLeft: '1px solid #ccc',
        borderTopLeftRadius: '3px',
        borderBottomLeftRadius: '3px'
    },

    ':last-child': {
        borderRight: '1px solid #ccc',
        borderTopRightRadius: '3px',
        borderBottomRightRadius: '3px'
    },

    ':hover': {
        backgroundColor: '#ccc'
    },

    ':focus': {
        zIndex: '2'
    }
};

var selectedStyle = {
    backgroundColor: '#ddd'
};

RCSS.createClass(outerStyle);
RCSS.createClass(buttonStyle);
RCSS.createClass(selectedStyle);

/* ButtonGroup is an aesthetically pleasing group of buttons.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "text": this is the text shown on the button
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with the updated value
 *     (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   value - the initial value of the button selected, defaults to null.
 *   allowEmpty - if false, exactly one button _must_ be selected; otherwise
 *     it defaults to true and _at most_ one button (0 or 1) may be selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

var ButtonGroup = React.createClass({displayName: 'ButtonGroup',
    propTypes: {
        value: React.PropTypes.any,
        buttons: React.PropTypes.arrayOf(React.PropTypes.shape({
            value: React.PropTypes.any.isRequired,
            text: React.PropTypes.renderable,
            title: React.PropTypes.string
        })).isRequired,
        onChange: React.PropTypes.func.isRequired,
        allowEmpty: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            value: null,
            allowEmpty: true
        };
    },

    render: function() {
        var value = this.props.value;
        var buttons = _(this.props.buttons).map(function(button, i)  {
                var maybeSelected = button.value === value ?
                        selectedStyle.className :
                        "";
                return React.DOM.button( {title:button.title,
                        id:"" + i,
                        ref:"button" + i,
                        key:"" + i,
                        className:(buttonStyle.className + " " + maybeSelected),
                        onClick:this.toggleSelect.bind(this, button.value)}, 
                    button.text || "" + button.value
                );
            }.bind(this));

        return React.DOM.div( {className:outerStyle.className}, 
            buttons
        );
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    toggleSelect: function(newValue) {
        var value = this.props.value;

        if (this.props.allowEmpty) {
            // Select the new button or unselect if it's already selected
            this.props.onChange(value !== newValue ? newValue : null);
        } else {
            this.props.onChange(newValue);
        }
    }
});

module.exports = ButtonGroup;

},{"rcss":6,"react":115,"underscore":116}],4:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');

/* This component makes its children a drag target. Example:
 *
 *     <DragTarget onDrop={this.handleDrop}>Drag to me</DragTarget>
 *
 *     ...
 *
 *     handleDrop: function(e) {
 *         this.addImages(e.nativeEvent.dataTransfer.files);
 *     }
 *
 * Now "Drag to me" will be a drag target - when something is dragged over it,
 * the element will become partially transparent as a visual indicator that
 * it's a target.
 */
// TODO(joel) - indicate before the hover is over the target that it's possible
// to drag into the target. This would (I think) require a high level handler -
// like on Perseus itself, waiting for onDragEnter, then passing down the
// event. Sounds like a pain. Possible workaround - create a div covering the
// entire page...
//
// Other extensions:
// * custom styles for global drag and dragOver
// * only respond to certain types of drags (only images for instance)!
var DragTarget = React.createClass({displayName: 'DragTarget',
    propTypes: {
        onDrop: React.PropTypes.func.isRequired,
        component: React.PropTypes.component,
        shouldDragHighlight: React.PropTypes.func
    },
    render: function() {
        var opacity = this.state.dragHover ? { "opacity": 0.3 } : {};
        var component = this.props.component;

        return this.transferPropsTo(
            component( {style:opacity,
                       onDrop:this.handleDrop,
                       onDragEnd:this.handleDragEnd,
                       onDragOver:this.handleDragOver,
                       onDragEnter:this.handleDragEnter,
                       onDragLeave:this.handleDragLeave}, 
                this.props.children
            )
        );
    },
    getInitialState: function() {
        return { dragHover: false };
    },
    getDefaultProps: function() {
        return {
            component: React.DOM.div,
            shouldDragHighlight: function()  {return true;}
        };
    },
    handleDrop: function(e) {
        e.stopPropagation();
        e.preventDefault();
        this.setState({ dragHover: false });
        this.props.onDrop(e);
    },
    handleDragEnd: function() {
        this.setState({ dragHover: false });
    },
    handleDragOver: function(e) {
        e.preventDefault();
    },
    handleDragLeave: function() {
        this.setState({ dragHover: false });
    },
    handleDragEnter: function(e) {
        this.setState({ dragHover: this.props.shouldDragHighlight(e) });
    }
});

module.exports = DragTarget;

},{"react":115}],5:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var RCSS = require('rcss');
var _ = require('underscore');

var colors = {
    grayLight: '#aaa',
    basicBorderColor: '#ccc',
    white: '#fff'
};

var infoTip = {
    display: 'inline-block',
    marginLeft: '5px',
    position: 'relative'
};

var infoTipI = {
    cursor: 'pointer'
};

var infoTipContainer = {
    position: 'absolute',
    'top': '-12px',
    left: '22px',
    zIndex: '1000'
};

var triangleBeforeAfter = {
    borderBottom: '9px solid transparent',
    borderTop: '9px solid transparent',
    content: ' ',
    height: '0',
    position: 'absolute',
    'top': '0',
    width: '0'
};

var infoTipTriangle = {
    height: '10px',
    left: '0',
    position: 'absolute',
    'top': '8px',
    width: '0',
    zIndex: '1',

    ':before': _.extend({}, triangleBeforeAfter, {
        borderRight: '9px solid #bbb',
        right: '0',
    }),

    ':after': _.extend({}, triangleBeforeAfter, {
        borderRight: ("9px solid " + colors.white),
        right: '-1px'
    })
};

var basicBorder = {
    border: ("1px solid " + colors.basicBorderColor)
};

var boxShadow = function(str)  { return { boxShadow: str }; };

var verticalShadow = RCSS.merge(
    basicBorder,
    boxShadow(("0 1px 3px " + colors.basicBorderColor)),
    { borderBottom: ("1px solid " + colors.grayLight) }
);

var infoTipContentContainer = RCSS.merge(verticalShadow, {
    background: colors.white,
    padding: '5px 10px',
    width: '240px'
});

RCSS.createClass(infoTip);
RCSS.createClass(infoTipI);
RCSS.createClass(infoTipTriangle);
RCSS.createClass(verticalShadow);
RCSS.createClass(infoTipContainer);
RCSS.createClass(infoTipContentContainer);

var questionMark = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAoAAAAKCAYAAACNMs+9AAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA3NpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNS1jMDIxIDc5LjE1NDkxMSwgMjAxMy8xMC8yOS0xMTo0NzoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDo2N2M3NTAxYS04YmVlLTQ0M2MtYmRiNS04OGM2N2IxN2NhYzEiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OUJCRTk4Qjc4NjAwMTFFMzg3QUJDNEI4Mzk2QTRGQkQiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OUJCRTk4QjY4NjAwMTFFMzg3QUJDNEI4Mzk2QTRGQkQiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NGE5ZDI0OTMtODk1NC00OGFkLTlhMTgtZDAwM2MwYWNjNDJlIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjY3Yzc1MDFhLThiZWUtNDQzYy1iZGI1LTg4YzY3YjE3Y2FjMSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6eG1wbWV0YT4gPD94cGFja2V0IGVuZD0iciI/Pqm89uYAAADMSURBVHjaXJA9DoJAEIUH1M4TUHIFsCMGen9OwCGw1YRGW2ntKel0exsojHIBC0ouQAyUviFDstmXfNmZeS+zm7XSNCXRFiRgJf0bXIHixpbhGdxBBJYC1w/xaA424MhNEATkui71fU9KqfEU78UbD9PdbJRlOdae55GmhIP+1NV1TcMwkOM41DSNHvRtMhTHMRVFQW3b6mOLgx99kue5GRp/gIOZuZGvNpTNwjD8oliANU+qqqKu6/TQBdymN57AHjzBT+B6Jx79BRgAvc49kQA4yxgAAAAASUVORK5CYII='; // @NoLint

var InfoTip = React.createClass({displayName: 'InfoTip',
    getInitialState: function() {
        return {
            hover: false
        };
    },

    render: function() {
        return React.DOM.div( {className:infoTip.className}, 
            React.DOM.img( {width:10,
                 height:10,
                 src:questionMark,
                 onMouseEnter:this.handleMouseEnter,
                 onMouseLeave:this.handleMouseLeave} ),
            React.DOM.div( {className:infoTipContainer.className,
                 style:{display: this.state.hover ? 'block' : 'none'}}, 
                React.DOM.div( {className:infoTipTriangle.className} ),
                /* keep the classes here - used for selectors on KA */
                React.DOM.div( {className:infoTipContentContainer.className}, 
                    this.props.children
                )
            )
        );
    },

    handleMouseEnter: function() {
        this.setState({hover: true});
    },

    handleMouseLeave: function() {
        this.setState({hover: false});
    }
});

module.exports = InfoTip;

},{"rcss":6,"react":115,"underscore":116}],6:[function(require,module,exports){
var assign = require('lodash.assign');

var styleRuleValidator = require('./styleRuleValidator');
var styleRuleConverter = require('./styleRuleConverter');
var mediaQueryValidator = require('valid-media-queries');

var existingClasses = {};
var styleTag = createStyleTag();

var classNameId = 0;
var randomSuffix = Math.random().toString(36).slice(-5);

function generateValidCSSClassName() {
  // CSS classNames can't start with a number.
  return 'c' + (classNameId++) + '-' + randomSuffix;
}

function objToCSS(style) {
  var serialized = '';
  for (var propName in style) {
    // we put that ourselves
    if (propName == 'className') continue;

    var cssPropName = styleRuleConverter.hyphenateProp(propName);
    if (!styleRuleValidator.isValidProp(cssPropName)) {
      console.warn(
        '%s (transformed into %s) is not a valid CSS property name.', propName, cssPropName
      );
      continue;
    }

    var styleValue = style[propName];
    if (!styleRuleValidator.isValidValue(styleValue)) continue;

    if (styleValue !== null) {
      serialized += cssPropName + ':';
      serialized += styleRuleConverter.escapeValueForProp(styleValue,
        cssPropName) + ';';
    }
  }
  return serialized || null;
}

function createStyleTag() {
  var tag = document.createElement('style');
  document.getElementsByTagName('head')[0].appendChild(tag);
  return tag;
}

function styleToCSS(style) {
  var styleStr = '.' + style.className + '{';
  styleStr += objToCSS(style.value);
  styleStr += '}';

  if (style.media) {
    if (!mediaQueryValidator(style.media)) {
      console.log('%s is not a valid media query.', style.media);
    }
    styleStr = style.media + '{' + styleStr + '}';
  }

  return styleStr;
}

// TODO: support media queries
function parseStyles(className, styleObj) {
  var mainStyle = {
    className: className,
    value: {}
  };
  var styles = [mainStyle];

  Object.keys(styleObj).forEach(function(k){
    // pseudo-selector, insert a new rule
    if (k[0] === ':') {
      styles.push({
        className: className+k,
        value: styleObj[k]
      });
      return;
    } else if (k.substring(0, 6) === '@media') {
      styles.push({
        className: className,
        value: styleObj[k],
        media: k
      });
      return;
    }

    // normal rule, insert into main one
    mainStyle.value[k] = styleObj[k];
  });

  return styles;
}

function insertStyle(className, styleObj) {
  var styles = parseStyles(className, styleObj);
  var styleStr = styles.map(styleToCSS).join('');
  styleTag.innerHTML += styleStr;
}

var RCSS = {
  merge: function(a, b, c, d, e) {
    return assign({}, a, b, c, d, e);
  },

  createClass: function(styleObj) {
    var styleId = JSON.stringify(styleObj);
    var className;

    if (existingClasses[styleId]) {
      // already exists, use the existing className
      className = existingClasses[styleId];
    } else {
      // generate a new class and insert it
      className = generateValidCSSClassName();
      existingClasses[styleId] = className;
      insertStyle(className, styleObj);
    }

    styleObj.className = className;
    return styleObj;
  }
};

module.exports = RCSS;

},{"./styleRuleConverter":111,"./styleRuleValidator":112,"lodash.assign":7,"valid-media-queries":46}],7:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    keys = require('lodash.keys'),
    objectTypes = require('lodash._objecttypes');

/**
 * Assigns own enumerable properties of source object(s) to the destination
 * object. Subsequent sources will overwrite property assignments of previous
 * sources. If a callback is provided it will be executed to produce the
 * assigned values. The callback is bound to `thisArg` and invoked with two
 * arguments; (objectValue, sourceValue).
 *
 * @static
 * @memberOf _
 * @type Function
 * @alias extend
 * @category Objects
 * @param {Object} object The destination object.
 * @param {...Object} [source] The source objects.
 * @param {Function} [callback] The function to customize assigning values.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns the destination object.
 * @example
 *
 * _.assign({ 'name': 'fred' }, { 'employer': 'slate' });
 * // => { 'name': 'fred', 'employer': 'slate' }
 *
 * var defaults = _.partialRight(_.assign, function(a, b) {
 *   return typeof a == 'undefined' ? b : a;
 * });
 *
 * var object = { 'name': 'barney' };
 * defaults(object, { 'name': 'fred', 'employer': 'slate' });
 * // => { 'name': 'barney', 'employer': 'slate' }
 */
var assign = function(object, source, guard) {
  var index, iterable = object, result = iterable;
  if (!iterable) return result;
  var args = arguments,
      argsIndex = 0,
      argsLength = typeof guard == 'number' ? 2 : args.length;
  if (argsLength > 3 && typeof args[argsLength - 2] == 'function') {
    var callback = baseCreateCallback(args[--argsLength - 1], args[argsLength--], 2);
  } else if (argsLength > 2 && typeof args[argsLength - 1] == 'function') {
    callback = args[--argsLength];
  }
  while (++argsIndex < argsLength) {
    iterable = args[argsIndex];
    if (iterable && objectTypes[typeof iterable]) {
    var ownIndex = -1,
        ownProps = objectTypes[typeof iterable] && keys(iterable),
        length = ownProps ? ownProps.length : 0;

    while (++ownIndex < length) {
      index = ownProps[ownIndex];
      result[index] = callback ? callback(result[index], iterable[index]) : iterable[index];
    }
    }
  }
  return result
};

module.exports = assign;

},{"lodash._basecreatecallback":8,"lodash._objecttypes":29,"lodash.keys":30}],8:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var bind = require('lodash.bind'),
    identity = require('lodash.identity'),
    setBindData = require('lodash._setbinddata'),
    support = require('lodash.support');

/** Used to detected named functions */
var reFuncName = /^\s*function[ \n\r\t]+\w/;

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/** Native method shortcuts */
var fnToString = Function.prototype.toString;

/**
 * The base implementation of `_.createCallback` without support for creating
 * "_.pluck" or "_.where" style callbacks.
 *
 * @private
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 */
function baseCreateCallback(func, thisArg, argCount) {
  if (typeof func != 'function') {
    return identity;
  }
  // exit early for no `thisArg` or already bound by `Function#bind`
  if (typeof thisArg == 'undefined' || !('prototype' in func)) {
    return func;
  }
  var bindData = func.__bindData__;
  if (typeof bindData == 'undefined') {
    if (support.funcNames) {
      bindData = !func.name;
    }
    bindData = bindData || !support.funcDecomp;
    if (!bindData) {
      var source = fnToString.call(func);
      if (!support.funcNames) {
        bindData = !reFuncName.test(source);
      }
      if (!bindData) {
        // checks if `func` references the `this` keyword and stores the result
        bindData = reThis.test(source);
        setBindData(func, bindData);
      }
    }
  }
  // exit early if there are no `this` references or `func` is bound
  if (bindData === false || (bindData !== true && bindData[1] & 1)) {
    return func;
  }
  switch (argCount) {
    case 1: return function(value) {
      return func.call(thisArg, value);
    };
    case 2: return function(a, b) {
      return func.call(thisArg, a, b);
    };
    case 3: return function(value, index, collection) {
      return func.call(thisArg, value, index, collection);
    };
    case 4: return function(accumulator, value, index, collection) {
      return func.call(thisArg, accumulator, value, index, collection);
    };
  }
  return bind(func, thisArg);
}

module.exports = baseCreateCallback;

},{"lodash._setbinddata":9,"lodash.bind":12,"lodash.identity":26,"lodash.support":27}],9:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('lodash._isnative'),
    noop = require('lodash.noop');

/** Used as the property descriptor for `__bindData__` */
var descriptor = {
  'configurable': false,
  'enumerable': false,
  'value': null,
  'writable': false
};

/** Used to set meta data on functions */
var defineProperty = (function() {
  // IE 8 only accepts DOM elements
  try {
    var o = {},
        func = isNative(func = Object.defineProperty) && func,
        result = func(o, o, o) && func;
  } catch(e) { }
  return result;
}());

/**
 * Sets `this` binding data on a given function.
 *
 * @private
 * @param {Function} func The function to set data on.
 * @param {Array} value The data array to set.
 */
var setBindData = !defineProperty ? noop : function(func, value) {
  descriptor.value = value;
  defineProperty(func, '__bindData__', descriptor);
};

module.exports = setBindData;

},{"lodash._isnative":10,"lodash.noop":11}],10:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Used to detect if a method is native */
var reNative = RegExp('^' +
  String(toString)
    .replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    .replace(/toString| for [^\]]+/g, '.*?') + '$'
);

/**
 * Checks if `value` is a native function.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a native function, else `false`.
 */
function isNative(value) {
  return typeof value == 'function' && reNative.test(value);
}

module.exports = isNative;

},{}],11:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * A no-operation function.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.noop(object) === undefined;
 * // => true
 */
function noop() {
  // no operation performed
}

module.exports = noop;

},{}],12:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createWrapper = require('lodash._createwrapper'),
    slice = require('lodash._slice');

/**
 * Creates a function that, when called, invokes `func` with the `this`
 * binding of `thisArg` and prepends any additional `bind` arguments to those
 * provided to the bound function.
 *
 * @static
 * @memberOf _
 * @category Functions
 * @param {Function} func The function to bind.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {...*} [arg] Arguments to be partially applied.
 * @returns {Function} Returns the new bound function.
 * @example
 *
 * var func = function(greeting) {
 *   return greeting + ' ' + this.name;
 * };
 *
 * func = _.bind(func, { 'name': 'fred' }, 'hi');
 * func();
 * // => 'hi fred'
 */
function bind(func, thisArg) {
  return arguments.length > 2
    ? createWrapper(func, 17, slice(arguments, 2), null, thisArg)
    : createWrapper(func, 1, null, null, thisArg);
}

module.exports = bind;

},{"lodash._createwrapper":13,"lodash._slice":25}],13:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseBind = require('lodash._basebind'),
    baseCreateWrapper = require('lodash._basecreatewrapper'),
    isFunction = require('lodash.isfunction'),
    slice = require('lodash._slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push,
    unshift = arrayRef.unshift;

/**
 * Creates a function that, when called, either curries or invokes `func`
 * with an optional `this` binding and partially applied arguments.
 *
 * @private
 * @param {Function|string} func The function or method name to reference.
 * @param {number} bitmask The bitmask of method flags to compose.
 *  The bitmask may be composed of the following flags:
 *  1 - `_.bind`
 *  2 - `_.bindKey`
 *  4 - `_.curry`
 *  8 - `_.curry` (bound)
 *  16 - `_.partial`
 *  32 - `_.partialRight`
 * @param {Array} [partialArgs] An array of arguments to prepend to those
 *  provided to the new function.
 * @param {Array} [partialRightArgs] An array of arguments to append to those
 *  provided to the new function.
 * @param {*} [thisArg] The `this` binding of `func`.
 * @param {number} [arity] The arity of `func`.
 * @returns {Function} Returns the new function.
 */
function createWrapper(func, bitmask, partialArgs, partialRightArgs, thisArg, arity) {
  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      isPartial = bitmask & 16,
      isPartialRight = bitmask & 32;

  if (!isBindKey && !isFunction(func)) {
    throw new TypeError;
  }
  if (isPartial && !partialArgs.length) {
    bitmask &= ~16;
    isPartial = partialArgs = false;
  }
  if (isPartialRight && !partialRightArgs.length) {
    bitmask &= ~32;
    isPartialRight = partialRightArgs = false;
  }
  var bindData = func && func.__bindData__;
  if (bindData && bindData !== true) {
    // clone `bindData`
    bindData = slice(bindData);
    if (bindData[2]) {
      bindData[2] = slice(bindData[2]);
    }
    if (bindData[3]) {
      bindData[3] = slice(bindData[3]);
    }
    // set `thisBinding` is not previously bound
    if (isBind && !(bindData[1] & 1)) {
      bindData[4] = thisArg;
    }
    // set if previously bound but not currently (subsequent curried functions)
    if (!isBind && bindData[1] & 1) {
      bitmask |= 8;
    }
    // set curried arity if not yet set
    if (isCurry && !(bindData[1] & 4)) {
      bindData[5] = arity;
    }
    // append partial left arguments
    if (isPartial) {
      push.apply(bindData[2] || (bindData[2] = []), partialArgs);
    }
    // append partial right arguments
    if (isPartialRight) {
      unshift.apply(bindData[3] || (bindData[3] = []), partialRightArgs);
    }
    // merge flags
    bindData[1] |= bitmask;
    return createWrapper.apply(null, bindData);
  }
  // fast path for `_.bind`
  var creater = (bitmask == 1 || bitmask === 17) ? baseBind : baseCreateWrapper;
  return creater([func, bitmask, partialArgs, partialRightArgs, thisArg, arity]);
}

module.exports = createWrapper;

},{"lodash._basebind":14,"lodash._basecreatewrapper":19,"lodash._slice":25,"lodash.isfunction":24}],14:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('lodash._basecreate'),
    isObject = require('lodash.isobject'),
    setBindData = require('lodash._setbinddata'),
    slice = require('lodash._slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `_.bind` that creates the bound function and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new bound function.
 */
function baseBind(bindData) {
  var func = bindData[0],
      partialArgs = bindData[2],
      thisArg = bindData[4];

  function bound() {
    // `Function#bind` spec
    // http://es5.github.io/#x15.3.4.5
    if (partialArgs) {
      // avoid `arguments` object deoptimizations by using `slice` instead
      // of `Array.prototype.slice.call` and not assigning `arguments` to a
      // variable as a ternary expression
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    // mimic the constructor's `return` behavior
    // http://es5.github.io/#x13.2.2
    if (this instanceof bound) {
      // ensure `new bound` is an instance of `func`
      var thisBinding = baseCreate(func.prototype),
          result = func.apply(thisBinding, args || arguments);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisArg, args || arguments);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseBind;

},{"lodash._basecreate":15,"lodash._setbinddata":9,"lodash._slice":25,"lodash.isobject":18}],15:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('lodash._isnative'),
    isObject = require('lodash.isobject'),
    noop = require('lodash.noop');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeCreate = isNative(nativeCreate = Object.create) && nativeCreate;

/**
 * The base implementation of `_.create` without support for assigning
 * properties to the created object.
 *
 * @private
 * @param {Object} prototype The object to inherit from.
 * @returns {Object} Returns the new object.
 */
function baseCreate(prototype, properties) {
  return isObject(prototype) ? nativeCreate(prototype) : {};
}
// fallback for browsers without `Object.create`
if (!nativeCreate) {
  baseCreate = (function() {
    function Object() {}
    return function(prototype) {
      if (isObject(prototype)) {
        Object.prototype = prototype;
        var result = new Object;
        Object.prototype = null;
      }
      return result || global.Object();
    };
  }());
}

module.exports = baseCreate;

},{"lodash._isnative":16,"lodash.isobject":18,"lodash.noop":17}],16:[function(require,module,exports){
module.exports=require(10)
},{}],17:[function(require,module,exports){
module.exports=require(11)
},{}],18:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('lodash._objecttypes');

/**
 * Checks if `value` is the language type of Object.
 * (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(1);
 * // => false
 */
function isObject(value) {
  // check if the value is the ECMAScript language type of Object
  // http://es5.github.io/#x8
  // and avoid a V8 bug
  // http://code.google.com/p/v8/issues/detail?id=2291
  return !!(value && objectTypes[typeof value]);
}

module.exports = isObject;

},{"lodash._objecttypes":29}],19:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreate = require('lodash._basecreate'),
    isObject = require('lodash.isobject'),
    setBindData = require('lodash._setbinddata'),
    slice = require('lodash._slice');

/**
 * Used for `Array` method references.
 *
 * Normally `Array.prototype` would suffice, however, using an array literal
 * avoids issues in Narwhal.
 */
var arrayRef = [];

/** Native method shortcuts */
var push = arrayRef.push;

/**
 * The base implementation of `createWrapper` that creates the wrapper and
 * sets its meta data.
 *
 * @private
 * @param {Array} bindData The bind data array.
 * @returns {Function} Returns the new function.
 */
function baseCreateWrapper(bindData) {
  var func = bindData[0],
      bitmask = bindData[1],
      partialArgs = bindData[2],
      partialRightArgs = bindData[3],
      thisArg = bindData[4],
      arity = bindData[5];

  var isBind = bitmask & 1,
      isBindKey = bitmask & 2,
      isCurry = bitmask & 4,
      isCurryBound = bitmask & 8,
      key = func;

  function bound() {
    var thisBinding = isBind ? thisArg : this;
    if (partialArgs) {
      var args = slice(partialArgs);
      push.apply(args, arguments);
    }
    if (partialRightArgs || isCurry) {
      args || (args = slice(arguments));
      if (partialRightArgs) {
        push.apply(args, partialRightArgs);
      }
      if (isCurry && args.length < arity) {
        bitmask |= 16 & ~32;
        return baseCreateWrapper([func, (isCurryBound ? bitmask : bitmask & ~3), args, null, thisArg, arity]);
      }
    }
    args || (args = arguments);
    if (isBindKey) {
      func = thisBinding[key];
    }
    if (this instanceof bound) {
      thisBinding = baseCreate(func.prototype);
      var result = func.apply(thisBinding, args);
      return isObject(result) ? result : thisBinding;
    }
    return func.apply(thisBinding, args);
  }
  setBindData(bound, bindData);
  return bound;
}

module.exports = baseCreateWrapper;

},{"lodash._basecreate":20,"lodash._setbinddata":9,"lodash._slice":25,"lodash.isobject":23}],20:[function(require,module,exports){
module.exports=require(15)
},{"lodash._isnative":21,"lodash.isobject":23,"lodash.noop":22}],21:[function(require,module,exports){
module.exports=require(10)
},{}],22:[function(require,module,exports){
module.exports=require(11)
},{}],23:[function(require,module,exports){
module.exports=require(18)
},{"lodash._objecttypes":29}],24:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Checks if `value` is a function.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if the `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 */
function isFunction(value) {
  return typeof value == 'function';
}

module.exports = isFunction;

},{}],25:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Slices the `collection` from the `start` index up to, but not including,
 * the `end` index.
 *
 * Note: This function is used instead of `Array#slice` to support node lists
 * in IE < 9 and to ensure dense arrays are returned.
 *
 * @private
 * @param {Array|Object|string} collection The collection to slice.
 * @param {number} start The start index.
 * @param {number} end The end index.
 * @returns {Array} Returns the new array.
 */
function slice(array, start, end) {
  start || (start = 0);
  if (typeof end == 'undefined') {
    end = array ? array.length : 0;
  }
  var index = -1,
      length = end - start || 0,
      result = Array(length < 0 ? 0 : length);

  while (++index < length) {
    result[index] = array[start + index];
  }
  return result;
}

module.exports = slice;

},{}],26:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * This method returns the first argument provided to it.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'name': 'fred' };
 * _.identity(object) === object;
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = identity;

},{}],27:[function(require,module,exports){
var global=typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {};/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('lodash._isnative');

/** Used to detect functions containing a `this` reference */
var reThis = /\bthis\b/;

/**
 * An object used to flag environments features.
 *
 * @static
 * @memberOf _
 * @type Object
 */
var support = {};

/**
 * Detect if functions can be decompiled by `Function#toString`
 * (all but PS3 and older Opera mobile browsers & avoided in Windows 8 apps).
 *
 * @memberOf _.support
 * @type boolean
 */
support.funcDecomp = !isNative(global.WinRTError) && reThis.test(function() { return this; });

/**
 * Detect if `Function#name` is supported (all but IE).
 *
 * @memberOf _.support
 * @type boolean
 */
support.funcNames = typeof Function.name == 'string';

module.exports = support;

},{"lodash._isnative":28}],28:[function(require,module,exports){
module.exports=require(10)
},{}],29:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to determine if values are of the language type Object */
var objectTypes = {
  'boolean': false,
  'function': true,
  'object': true,
  'number': false,
  'string': false,
  'undefined': false
};

module.exports = objectTypes;

},{}],30:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var isNative = require('lodash._isnative'),
    isObject = require('lodash.isobject'),
    shimKeys = require('lodash._shimkeys');

/* Native method shortcuts for methods with the same name as other `lodash` methods */
var nativeKeys = isNative(nativeKeys = Object.keys) && nativeKeys;

/**
 * Creates an array composed of the own enumerable property names of an object.
 *
 * @static
 * @memberOf _
 * @category Objects
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 * @example
 *
 * _.keys({ 'one': 1, 'two': 2, 'three': 3 });
 * // => ['one', 'two', 'three'] (property order is not guaranteed across environments)
 */
var keys = !nativeKeys ? shimKeys : function(object) {
  if (!isObject(object)) {
    return [];
  }
  return nativeKeys(object);
};

module.exports = keys;

},{"lodash._isnative":31,"lodash._shimkeys":32,"lodash.isobject":33}],31:[function(require,module,exports){
module.exports=require(10)
},{}],32:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var objectTypes = require('lodash._objecttypes');

/** Used for native method references */
var objectProto = Object.prototype;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * A fallback implementation of `Object.keys` which produces an array of the
 * given object's own enumerable property names.
 *
 * @private
 * @type Function
 * @param {Object} object The object to inspect.
 * @returns {Array} Returns an array of property names.
 */
var shimKeys = function(object) {
  var index, iterable = object, result = [];
  if (!iterable) return result;
  if (!(objectTypes[typeof object])) return result;
    for (index in iterable) {
      if (hasOwnProperty.call(iterable, index)) {
        result.push(index);
      }
    }
  return result
};

module.exports = shimKeys;

},{"lodash._objecttypes":29}],33:[function(require,module,exports){
module.exports=require(18)
},{"lodash._objecttypes":29}],34:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var escapeHtmlChar = require('lodash._escapehtmlchar'),
    keys = require('lodash.keys'),
    reUnescapedHtml = require('lodash._reunescapedhtml');

/**
 * Converts the characters `&`, `<`, `>`, `"`, and `'` in `string` to their
 * corresponding HTML entities.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {string} string The string to escape.
 * @returns {string} Returns the escaped string.
 * @example
 *
 * _.escape('Fred, Wilma, & Pebbles');
 * // => 'Fred, Wilma, &amp; Pebbles'
 */
function escape(string) {
  return string == null ? '' : String(string).replace(reUnescapedHtml, escapeHtmlChar);
}

module.exports = escape;

},{"lodash._escapehtmlchar":35,"lodash._reunescapedhtml":37,"lodash.keys":39}],35:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var htmlEscapes = require('lodash._htmlescapes');

/**
 * Used by `escape` to convert characters to HTML entities.
 *
 * @private
 * @param {string} match The matched character to escape.
 * @returns {string} Returns the escaped character.
 */
function escapeHtmlChar(match) {
  return htmlEscapes[match];
}

module.exports = escapeHtmlChar;

},{"lodash._htmlescapes":36}],36:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Used to convert characters to HTML entities:
 *
 * Though the `>` character is escaped for symmetry, characters like `>` and `/`
 * don't require escaping in HTML and have no special meaning unless they're part
 * of a tag or an unquoted attribute value.
 * http://mathiasbynens.be/notes/ambiguous-ampersands (under "semi-related fun fact")
 */
var htmlEscapes = {
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;'
};

module.exports = htmlEscapes;

},{}],37:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var htmlEscapes = require('lodash._htmlescapes'),
    keys = require('lodash.keys');

/** Used to match HTML entities and HTML characters */
var reUnescapedHtml = RegExp('[' + keys(htmlEscapes).join('') + ']', 'g');

module.exports = reUnescapedHtml;

},{"lodash._htmlescapes":38,"lodash.keys":39}],38:[function(require,module,exports){
module.exports=require(36)
},{}],39:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"lodash._isnative":40,"lodash._shimkeys":41,"lodash.isobject":43}],40:[function(require,module,exports){
module.exports=require(10)
},{}],41:[function(require,module,exports){
module.exports=require(32)
},{"lodash._objecttypes":42}],42:[function(require,module,exports){
module.exports=require(29)
},{}],43:[function(require,module,exports){
module.exports=require(18)
},{"lodash._objecttypes":44}],44:[function(require,module,exports){
module.exports=require(29)
},{}],45:[function(require,module,exports){
var _validCSSProps = {
  'alignment-adjust': true,
  'alignment-baseline': true,
  'animation': true,
  'animation-delay': true,
  'animation-direction': true,
  'animation-duration': true,
  'animation-iteration-count': true,
  'animation-name': true,
  'animation-play-state': true,
  'animation-timing-function': true,
  'appearance': true,
  'backface-visibility': true,
  'background': true,
  'background-attachment': true,
  'background-clip': true,
  'background-color': true,
  'background-image': true,
  'background-origin': true,
  'background-position': true,
  'background-repeat': true,
  'background-size': true,
  'baseline-shift': true,
  'bookmark-label': true,
  'bookmark-level': true,
  'bookmark-target': true,
  'border': true,
  'border-bottom': true,
  'border-bottom-color': true,
  'border-bottom-left-radius': true,
  'border-bottom-right-radius': true,
  'border-bottom-style': true,
  'border-bottom-width': true,
  'border-collapse': true,
  'border-color': true,
  'border-image': true,
  'border-image-outset': true,
  'border-image-repeat': true,
  'border-image-slice': true,
  'border-image-source': true,
  'border-image-width': true,
  'border-left': true,
  'border-left-color': true,
  'border-left-style': true,
  'border-left-width': true,
  'border-radius': true,
  'border-right': true,
  'border-right-color': true,
  'border-right-style': true,
  'border-right-width': true,
  'border-spacing': true,
  'border-style': true,
  'border-top': true,
  'border-top-color': true,
  'border-top-left-radius': true,
  'border-top-right-radius': true,
  'border-top-style': true,
  'border-top-width': true,
  'border-width': true,
  'bottom': true,
  'box-align': true,
  'box-decoration-break': true,
  'box-direction': true,
  'box-flex': true,
  'box-flex-group': true,
  'box-lines': true,
  'box-ordinal-group': true,
  'box-orient': true,
  'box-pack': true,
  'box-shadow': true,
  'box-sizing': true,
  'caption-side': true,
  'clear': true,
  'clip': true,
  'color': true,
  'color-profile': true,
  'column-count': true,
  'column-fill': true,
  'column-gap': true,
  'column-rule': true,
  'column-rule-color': true,
  'column-rule-style': true,
  'column-rule-width': true,
  'column-span': true,
  'column-width': true,
  'columns': true,
  'content': true,
  'counter-increment': true,
  'counter-reset': true,
  'crop': true,
  'cursor': true,
  'direction': true,
  'display': true,
  'dominant-baseline': true,
  'drop-initial-after-adjust': true,
  'drop-initial-after-align': true,
  'drop-initial-before-adjust': true,
  'drop-initial-before-align': true,
  'drop-initial-size': true,
  'drop-initial-value': true,
  'empty-cells': true,
  'fit': true,
  'fit-position': true,
  'float': true,
  'float-offset': true,
  'font': true,
  'font-family': true,
  'font-size': true,
  'font-size-adjust': true,
  'font-stretch': true,
  'font-style': true,
  'font-variant': true,
  'font-weight': true,
  'grid-columns': true,
  'grid-rows': true,
  'hanging-punctuation': true,
  'height': true,
  'hyphenate-after': true,
  'hyphenate-before': true,
  'hyphenate-character': true,
  'hyphenate-lines': true,
  'hyphenate-resource': true,
  'hyphens': true,
  'icon': true,
  'image-orientation': true,
  'image-resolution': true,
  'inline-box-align': true,
  'left': true,
  'letter-spacing': true,
  'line-height': true,
  'line-stacking': true,
  'line-stacking-ruby': true,
  'line-stacking-shift': true,
  'line-stacking-strategy': true,
  'list-style': true,
  'list-style-image': true,
  'list-style-position': true,
  'list-style-type': true,
  'margin': true,
  'margin-bottom': true,
  'margin-left': true,
  'margin-right': true,
  'margin-top': true,
  'mark': true,
  'mark-after': true,
  'mark-before': true,
  'marks': true,
  'marquee-direction': true,
  'marquee-play-count': true,
  'marquee-speed': true,
  'marquee-style': true,
  'max-height': true,
  'max-width': true,
  'min-height': true,
  'min-width': true,
  'move-to': true,
  'nav-down': true,
  'nav-index': true,
  'nav-left': true,
  'nav-right': true,
  'nav-up': true,
  'opacity': true,
  'orphans': true,
  'outline': true,
  'outline-color': true,
  'outline-offset': true,
  'outline-style': true,
  'outline-width': true,
  'overflow': true,
  'overflow-style': true,
  'overflow-x': true,
  'overflow-y': true,
  'padding': true,
  'padding-bottom': true,
  'padding-left': true,
  'padding-right': true,
  'padding-top': true,
  'page': true,
  'page-break-after': true,
  'page-break-before': true,
  'page-break-inside': true,
  'page-policy': true,
  'perspective': true,
  'perspective-origin': true,
  'phonemes': true,
  'position': true,
  'punctuation-trim': true,
  'quotes': true,
  'rendering-intent': true,
  'resize': true,
  'rest': true,
  'rest-after': true,
  'rest-before': true,
  'right': true,
  'rotation': true,
  'rotation-point': true,
  'ruby-align': true,
  'ruby-overhang': true,
  'ruby-position': true,
  'ruby-span': true,
  'size': true,
  'string-set': true,
  'table-layout': true,
  'target': true,
  'target-name': true,
  'target-new': true,
  'target-position': true,
  'text-align': true,
  'text-align-last': true,
  'text-decoration': true,
  'text-height': true,
  'text-indent': true,
  'text-justify': true,
  'text-outline': true,
  'text-overflow': true,
  'text-shadow': true,
  'text-transform': true,
  'text-wrap': true,
  'top': true,
  'transform': true,
  'transform-origin': true,
  'transform-style': true,
  'transition': true,
  'transition-delay': true,
  'transition-duration': true,
  'transition-property': true,
  'transition-timing-function': true,
  'unicode-bidi': true,
  'user-select': true,
  'vertical-align': true,
  'visibility': true,
  'voice-balance': true,
  'voice-duration': true,
  'voice-pitch': true,
  'voice-pitch-range': true,
  'voice-rate': true,
  'voice-stress': true,
  'voice-volume': true,
  'white-space': true,
  'widows': true,
  'width': true,
  'word-break': true,
  'word-spacing': true,
  'word-wrap': true,
  'z-index': true
}

var vendorPrefixRegEx = /^-.+-/;

module.exports = function(prop) {
  if (prop[0] === '-') {
    return !!_validCSSProps[prop.replace(vendorPrefixRegEx, '')];
  }
  return !!_validCSSProps[prop];
};

},{}],46:[function(require,module,exports){
var every = require('lodash.every');

function isValidRatio(ratio) {
    var re = /\d+\/\d+/;
    return !!ratio.match(re);
}

function isValidInteger(integer) {
    var re = /\d+/;
    return !!integer.match(re);
}

function isValidLength(length) {
    var re = /\d+(?:ex|em|ch|rem|vh|vw|vmin|vmax|px|mm|cm|in|pt|pc)?$/;
    return !!length.match(re);
}

function isValidOrientation(orientation) {
    return orientation === 'landscape' || orientation === 'portrait';
}

function isValidScan(scan) {
    return scan === 'progressive' || scan === 'interlace';
}

function isValidResolution(resolution) {
    var re = /(?:\+|-)?(?:\d+|\d*\.\d+)(?:e\d+)?(?:dpi|dpcm|dppx)$/;
    return !!resolution.match(re);
}

function isValidValue(value) {
  return value != null && typeof value !== 'boolean' && value !== '';
}

var _mediaFeatureValidator = {
    'width': isValidLength,
    'min-width': isValidLength,
    'max-width': isValidLength,
    'height': isValidLength,
    'min-height': isValidLength,
    'max-height': isValidLength,
    'device-width': isValidLength,
    'min-device-width': isValidLength,
    'max-device-width': isValidLength,
    'device-height': isValidLength,
    'min-device-height': isValidLength,
    'max-device-height': isValidLength,
    'aspect-ratio': isValidRatio,
    'min-aspect-ratio': isValidRatio,
    'max-aspect-ratio': isValidRatio,
    'device-aspect-ratio': isValidRatio,
    'min-device-aspect-ratio': isValidRatio,
    'max-device-aspect-ratio': isValidRatio,
    'color': isValidValue,
    'min-color': isValidValue,
    'max-color': isValidValue,
    'color-index': isValidInteger,
    'min-color-index': isValidInteger,
    'max-color-index': isValidInteger,
    'monochrome': isValidInteger,
    'min-monochrome': isValidInteger,
    'max-monochrome': isValidInteger,
    'resolution': isValidResolution,
    'min-resolution': isValidResolution,
    'max-resolution': isValidResolution,
    'scan': isValidScan,
    'grid': isValidInteger,
    'orientation': isValidOrientation
};

var _validMediaFeatures = {
    'width': true,
    'min-width': true,
    'max-width': true,
    'height': true,
    'min-height': true,
    'max-height': true,
    'device-width': true,
    'min-device-width': true,
    'max-device-width': true,
    'device-height': true,
    'min-device-height': true,
    'max-device-height': true,
    'aspect-ratio': true,
    'min-aspect-ratio': true,
    'max-aspect-ratio': true,
    'device-aspect-ratio': true,
    'min-device-aspect-ratio': true,
    'max-device-aspect-ratio': true,
    'color': true,
    'min-color': true,
    'max-color': true,
    'color-index': true,
    'min-color-index': true,
    'max-color-index': true,
    'monochrome': true,
    'min-monochrome': true,
    'max-monochrome': true,
    'resolution': true,
    'min-resolution': true,
    'max-resolution': true,
    'scan': true,
    'grid': true,
    'orientation': true
};

var _validMediaTypes = {
    'all': true,
    'aural': true,
    'braille': true,
    'handheld': true,
    'print': true,
    'projection': true,
    'screen': true,
    'tty': true,
    'tv': true,
    'embossed': true
};

var _validQualifiers = {
    'not': true,
    'only': true
};

function isValidFeature(feature) {
    return !!_validMediaFeatures[feature];
}

function isValidQualifier(qualifier) {
    return !!_validQualifiers[qualifier];
}

function isValidMediaType(mediaType) {
    return !!_validMediaTypes[mediaType];
}

function isValidQualifiedMediaType(mediaType) {
    var terms = mediaType.trim().split(/\s+/);
    switch (terms.length) {
        case 1:
            return isValidMediaType(terms[0]);
        case 2:
            return isValidQualifier(terms[0]) && isValidMediaType(terms[1]);
        default:
            return false;
    }
}

function isValidExpression(expression) {
    if (expression.length < 2) {
        return false;
    }

    // Parentheses are required around expressions
    if (expression[0] !== '(' || expression[expression.length - 1] !== ')') {
        return false;
    }

    // Remove parentheses and spacess
    expression = expression.substring(1, expression.length - 1);

    // Is there a value to accompany the media feature?
    var featureAndValue = expression.split(/\s*:\s*/);
    switch (featureAndValue.length) {
        case 1:
            var feature = featureAndValue[0].trim();
            return isValidFeature(feature);
        case 2:
            var feature = featureAndValue[0].trim();
            var value = featureAndValue[1].trim();
            return isValidFeature(feature) &&
                   _mediaFeatureValidator[feature](value);
        default:
            return false;
    }
}

function isValidMediaQuery(query) {
    var andSplitter = /\s+and\s+/;
    var queryTerms = query.split(andSplitter);
    return (isValidQualifiedMediaType(queryTerms[0]) ||
        isValidExpression(queryTerms[0])) &&
        every(queryTerms.slice(1), isValidExpression);
}

function isValidMediaQueryList(mediaQuery) {
    mediaQuery = mediaQuery.toLowerCase();

    if (mediaQuery.substring(0, 6) !== '@media') {
        return false;
    }

    var commaSplitter = /\s*,\s*/;
    var queryList = mediaQuery.substring(7, mediaQuery.length)
                              .split(commaSplitter);
    return every(queryList, isValidMediaQuery);
}

module.exports = isValidMediaQueryList

},{"lodash.every":47}],47:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var createCallback = require('lodash.createcallback'),
    forOwn = require('lodash.forown');

/**
 * Checks if the given callback returns truey value for **all** elements of
 * a collection. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, index|key, collection).
 *
 * If a property name is provided for `callback` the created "_.pluck" style
 * callback will return the property value of the given element.
 *
 * If an object is provided for `callback` the created "_.where" style callback
 * will return `true` for elements that have the properties of the given object,
 * else `false`.
 *
 * @static
 * @memberOf _
 * @alias all
 * @category Collections
 * @param {Array|Object|string} collection The collection to iterate over.
 * @param {Function|Object|string} [callback=identity] The function called
 *  per iteration. If a property name or object is provided it will be used
 *  to create a "_.pluck" or "_.where" style callback, respectively.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {boolean} Returns `true` if all elements passed the callback check,
 *  else `false`.
 * @example
 *
 * _.every([true, 1, null, 'yes']);
 * // => false
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // using "_.pluck" callback shorthand
 * _.every(characters, 'age');
 * // => true
 *
 * // using "_.where" callback shorthand
 * _.every(characters, { 'age': 36 });
 * // => false
 */
function every(collection, callback, thisArg) {
  var result = true;
  callback = createCallback(callback, thisArg, 3);

  var index = -1,
      length = collection ? collection.length : 0;

  if (typeof length == 'number') {
    while (++index < length) {
      if (!(result = !!callback(collection[index], index, collection))) {
        break;
      }
    }
  } else {
    forOwn(collection, function(value, index, collection) {
      return (result = !!callback(value, index, collection));
    });
  }
  return result;
}

module.exports = every;

},{"lodash.createcallback":48,"lodash.forown":84}],48:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    baseIsEqual = require('lodash._baseisequal'),
    isObject = require('lodash.isobject'),
    keys = require('lodash.keys'),
    property = require('lodash.property');

/**
 * Produces a callback bound to an optional `thisArg`. If `func` is a property
 * name the created callback will return the property value for a given element.
 * If `func` is an object the created callback will return `true` for elements
 * that contain the equivalent object properties, otherwise it will return `false`.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {*} [func=identity] The value to convert to a callback.
 * @param {*} [thisArg] The `this` binding of the created callback.
 * @param {number} [argCount] The number of arguments the callback accepts.
 * @returns {Function} Returns a callback function.
 * @example
 *
 * var characters = [
 *   { 'name': 'barney', 'age': 36 },
 *   { 'name': 'fred',   'age': 40 }
 * ];
 *
 * // wrap to create custom callback shorthands
 * _.createCallback = _.wrap(_.createCallback, function(func, callback, thisArg) {
 *   var match = /^(.+?)__([gl]t)(.+)$/.exec(callback);
 *   return !match ? func(callback, thisArg) : function(object) {
 *     return match[2] == 'gt' ? object[match[1]] > match[3] : object[match[1]] < match[3];
 *   };
 * });
 *
 * _.filter(characters, 'age__gt38');
 * // => [{ 'name': 'fred', 'age': 40 }]
 */
function createCallback(func, thisArg, argCount) {
  var type = typeof func;
  if (func == null || type == 'function') {
    return baseCreateCallback(func, thisArg, argCount);
  }
  // handle "_.pluck" style callback shorthands
  if (type != 'object') {
    return property(func);
  }
  var props = keys(func),
      key = props[0],
      a = func[key];

  // handle "_.where" style callback shorthands
  if (props.length == 1 && a === a && !isObject(a)) {
    // fast path the common case of providing an object with a single
    // property containing a primitive value
    return function(object) {
      var b = object[key];
      return a === b && (a !== 0 || (1 / a == 1 / b));
    };
  }
  return function(object) {
    var length = props.length,
        result = false;

    while (length--) {
      if (!(result = baseIsEqual(object[props[length]], func[props[length]], null, true))) {
        break;
      }
    }
    return result;
  };
}

module.exports = createCallback;

},{"lodash._basecreatecallback":49,"lodash._baseisequal":68,"lodash.isobject":77,"lodash.keys":79,"lodash.property":83}],49:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"lodash._setbinddata":50,"lodash.bind":53,"lodash.identity":65,"lodash.support":66}],50:[function(require,module,exports){
module.exports=require(9)
},{"lodash._isnative":51,"lodash.noop":52}],51:[function(require,module,exports){
module.exports=require(10)
},{}],52:[function(require,module,exports){
module.exports=require(11)
},{}],53:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"lodash._createwrapper":54,"lodash._slice":64}],54:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"lodash._basebind":55,"lodash._basecreatewrapper":59,"lodash._slice":64,"lodash.isfunction":63}],55:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"lodash._basecreate":56,"lodash._setbinddata":50,"lodash._slice":64,"lodash.isobject":77}],56:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"lodash._isnative":57,"lodash.isobject":77,"lodash.noop":58}],57:[function(require,module,exports){
module.exports=require(10)
},{}],58:[function(require,module,exports){
module.exports=require(11)
},{}],59:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"lodash._basecreate":60,"lodash._setbinddata":50,"lodash._slice":64,"lodash.isobject":77}],60:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"lodash._isnative":61,"lodash.isobject":77,"lodash.noop":62}],61:[function(require,module,exports){
module.exports=require(10)
},{}],62:[function(require,module,exports){
module.exports=require(11)
},{}],63:[function(require,module,exports){
module.exports=require(24)
},{}],64:[function(require,module,exports){
module.exports=require(25)
},{}],65:[function(require,module,exports){
module.exports=require(26)
},{}],66:[function(require,module,exports){
module.exports=require(27)
},{"lodash._isnative":67}],67:[function(require,module,exports){
module.exports=require(10)
},{}],68:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var forIn = require('lodash.forin'),
    getArray = require('lodash._getarray'),
    isFunction = require('lodash.isfunction'),
    objectTypes = require('lodash._objecttypes'),
    releaseArray = require('lodash._releasearray');

/** `Object#toString` result shortcuts */
var argsClass = '[object Arguments]',
    arrayClass = '[object Array]',
    boolClass = '[object Boolean]',
    dateClass = '[object Date]',
    numberClass = '[object Number]',
    objectClass = '[object Object]',
    regexpClass = '[object RegExp]',
    stringClass = '[object String]';

/** Used for native method references */
var objectProto = Object.prototype;

/** Used to resolve the internal [[Class]] of values */
var toString = objectProto.toString;

/** Native method shortcuts */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * The base implementation of `_.isEqual`, without support for `thisArg` binding,
 * that allows partial "_.where" style comparisons.
 *
 * @private
 * @param {*} a The value to compare.
 * @param {*} b The other value to compare.
 * @param {Function} [callback] The function to customize comparing values.
 * @param {Function} [isWhere=false] A flag to indicate performing partial comparisons.
 * @param {Array} [stackA=[]] Tracks traversed `a` objects.
 * @param {Array} [stackB=[]] Tracks traversed `b` objects.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 */
function baseIsEqual(a, b, callback, isWhere, stackA, stackB) {
  // used to indicate that when comparing objects, `a` has at least the properties of `b`
  if (callback) {
    var result = callback(a, b);
    if (typeof result != 'undefined') {
      return !!result;
    }
  }
  // exit early for identical values
  if (a === b) {
    // treat `+0` vs. `-0` as not equal
    return a !== 0 || (1 / a == 1 / b);
  }
  var type = typeof a,
      otherType = typeof b;

  // exit early for unlike primitive values
  if (a === a &&
      !(a && objectTypes[type]) &&
      !(b && objectTypes[otherType])) {
    return false;
  }
  // exit early for `null` and `undefined` avoiding ES3's Function#call behavior
  // http://es5.github.io/#x15.3.4.4
  if (a == null || b == null) {
    return a === b;
  }
  // compare [[Class]] names
  var className = toString.call(a),
      otherClass = toString.call(b);

  if (className == argsClass) {
    className = objectClass;
  }
  if (otherClass == argsClass) {
    otherClass = objectClass;
  }
  if (className != otherClass) {
    return false;
  }
  switch (className) {
    case boolClass:
    case dateClass:
      // coerce dates and booleans to numbers, dates to milliseconds and booleans
      // to `1` or `0` treating invalid dates coerced to `NaN` as not equal
      return +a == +b;

    case numberClass:
      // treat `NaN` vs. `NaN` as equal
      return (a != +a)
        ? b != +b
        // but treat `+0` vs. `-0` as not equal
        : (a == 0 ? (1 / a == 1 / b) : a == +b);

    case regexpClass:
    case stringClass:
      // coerce regexes to strings (http://es5.github.io/#x15.10.6.4)
      // treat string primitives and their corresponding object instances as equal
      return a == String(b);
  }
  var isArr = className == arrayClass;
  if (!isArr) {
    // unwrap any `lodash` wrapped values
    var aWrapped = hasOwnProperty.call(a, '__wrapped__'),
        bWrapped = hasOwnProperty.call(b, '__wrapped__');

    if (aWrapped || bWrapped) {
      return baseIsEqual(aWrapped ? a.__wrapped__ : a, bWrapped ? b.__wrapped__ : b, callback, isWhere, stackA, stackB);
    }
    // exit for functions and DOM nodes
    if (className != objectClass) {
      return false;
    }
    // in older versions of Opera, `arguments` objects have `Array` constructors
    var ctorA = a.constructor,
        ctorB = b.constructor;

    // non `Object` object instances with different constructors are not equal
    if (ctorA != ctorB &&
          !(isFunction(ctorA) && ctorA instanceof ctorA && isFunction(ctorB) && ctorB instanceof ctorB) &&
          ('constructor' in a && 'constructor' in b)
        ) {
      return false;
    }
  }
  // assume cyclic structures are equal
  // the algorithm for detecting cyclic structures is adapted from ES 5.1
  // section 15.12.3, abstract operation `JO` (http://es5.github.io/#x15.12.3)
  var initedStack = !stackA;
  stackA || (stackA = getArray());
  stackB || (stackB = getArray());

  var length = stackA.length;
  while (length--) {
    if (stackA[length] == a) {
      return stackB[length] == b;
    }
  }
  var size = 0;
  result = true;

  // add `a` and `b` to the stack of traversed objects
  stackA.push(a);
  stackB.push(b);

  // recursively compare objects and arrays (susceptible to call stack limits)
  if (isArr) {
    // compare lengths to determine if a deep comparison is necessary
    length = a.length;
    size = b.length;
    result = size == length;

    if (result || isWhere) {
      // deep compare the contents, ignoring non-numeric properties
      while (size--) {
        var index = length,
            value = b[size];

        if (isWhere) {
          while (index--) {
            if ((result = baseIsEqual(a[index], value, callback, isWhere, stackA, stackB))) {
              break;
            }
          }
        } else if (!(result = baseIsEqual(a[size], value, callback, isWhere, stackA, stackB))) {
          break;
        }
      }
    }
  }
  else {
    // deep compare objects using `forIn`, instead of `forOwn`, to avoid `Object.keys`
    // which, in this case, is more costly
    forIn(b, function(value, key, b) {
      if (hasOwnProperty.call(b, key)) {
        // count the number of properties.
        size++;
        // deep compare each property value.
        return (result = hasOwnProperty.call(a, key) && baseIsEqual(a[key], value, callback, isWhere, stackA, stackB));
      }
    });

    if (result && !isWhere) {
      // ensure both objects have the same number of properties
      forIn(a, function(value, key, a) {
        if (hasOwnProperty.call(a, key)) {
          // `size` will be `-1` if `a` has more properties than `b`
          return (result = --size > -1);
        }
      });
    }
  }
  stackA.pop();
  stackB.pop();

  if (initedStack) {
    releaseArray(stackA);
    releaseArray(stackB);
  }
  return result;
}

module.exports = baseIsEqual;

},{"lodash._getarray":69,"lodash._objecttypes":71,"lodash._releasearray":72,"lodash.forin":75,"lodash.isfunction":76}],69:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayPool = require('lodash._arraypool');

/**
 * Gets an array from the array pool or creates a new one if the pool is empty.
 *
 * @private
 * @returns {Array} The array from the pool.
 */
function getArray() {
  return arrayPool.pop() || [];
}

module.exports = getArray;

},{"lodash._arraypool":70}],70:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used to pool arrays and objects used internally */
var arrayPool = [];

module.exports = arrayPool;

},{}],71:[function(require,module,exports){
module.exports=require(29)
},{}],72:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var arrayPool = require('lodash._arraypool'),
    maxPoolSize = require('lodash._maxpoolsize');

/**
 * Releases the given array back to the array pool.
 *
 * @private
 * @param {Array} [array] The array to release.
 */
function releaseArray(array) {
  array.length = 0;
  if (arrayPool.length < maxPoolSize) {
    arrayPool.push(array);
  }
}

module.exports = releaseArray;

},{"lodash._arraypool":73,"lodash._maxpoolsize":74}],73:[function(require,module,exports){
module.exports=require(70)
},{}],74:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/** Used as the max size of the `arrayPool` and `objectPool` */
var maxPoolSize = 40;

module.exports = maxPoolSize;

},{}],75:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    objectTypes = require('lodash._objecttypes');

/**
 * Iterates over own and inherited enumerable properties of an object,
 * executing the callback for each property. The callback is bound to `thisArg`
 * and invoked with three arguments; (value, key, object). Callbacks may exit
 * iteration early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * function Shape() {
 *   this.x = 0;
 *   this.y = 0;
 * }
 *
 * Shape.prototype.move = function(x, y) {
 *   this.x += x;
 *   this.y += y;
 * };
 *
 * _.forIn(new Shape, function(value, key) {
 *   console.log(key);
 * });
 * // => logs 'x', 'y', and 'move' (property order is not guaranteed across environments)
 */
var forIn = function(collection, callback, thisArg) {
  var index, iterable = collection, result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
    for (index in iterable) {
      if (callback(iterable[index], index, collection) === false) return result;
    }
  return result
};

module.exports = forIn;

},{"lodash._basecreatecallback":49,"lodash._objecttypes":71}],76:[function(require,module,exports){
module.exports=require(24)
},{}],77:[function(require,module,exports){
module.exports=require(18)
},{"lodash._objecttypes":78}],78:[function(require,module,exports){
module.exports=require(29)
},{}],79:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"lodash._isnative":80,"lodash._shimkeys":81,"lodash.isobject":77}],80:[function(require,module,exports){
module.exports=require(10)
},{}],81:[function(require,module,exports){
module.exports=require(32)
},{"lodash._objecttypes":82}],82:[function(require,module,exports){
module.exports=require(29)
},{}],83:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */

/**
 * Creates a "_.pluck" style function, which returns the `key` value of a
 * given object.
 *
 * @static
 * @memberOf _
 * @category Utilities
 * @param {string} key The name of the property to retrieve.
 * @returns {Function} Returns the new function.
 * @example
 *
 * var characters = [
 *   { 'name': 'fred',   'age': 40 },
 *   { 'name': 'barney', 'age': 36 }
 * ];
 *
 * var getName = _.property('name');
 *
 * _.map(characters, getName);
 * // => ['barney', 'fred']
 *
 * _.sortBy(characters, getName);
 * // => [{ 'name': 'barney', 'age': 36 }, { 'name': 'fred',   'age': 40 }]
 */
function property(key) {
  return function(object) {
    return object[key];
  };
}

module.exports = property;

},{}],84:[function(require,module,exports){
/**
 * Lo-Dash 2.4.1 (Custom Build) <http://lodash.com/>
 * Build: `lodash modularize modern exports="npm" -o ./npm/`
 * Copyright 2012-2013 The Dojo Foundation <http://dojofoundation.org/>
 * Based on Underscore.js 1.5.2 <http://underscorejs.org/LICENSE>
 * Copyright 2009-2013 Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 * Available under MIT license <http://lodash.com/license>
 */
var baseCreateCallback = require('lodash._basecreatecallback'),
    keys = require('lodash.keys'),
    objectTypes = require('lodash._objecttypes');

/**
 * Iterates over own enumerable properties of an object, executing the callback
 * for each property. The callback is bound to `thisArg` and invoked with three
 * arguments; (value, key, object). Callbacks may exit iteration early by
 * explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @type Function
 * @category Objects
 * @param {Object} object The object to iterate over.
 * @param {Function} [callback=identity] The function called per iteration.
 * @param {*} [thisArg] The `this` binding of `callback`.
 * @returns {Object} Returns `object`.
 * @example
 *
 * _.forOwn({ '0': 'zero', '1': 'one', 'length': 2 }, function(num, key) {
 *   console.log(key);
 * });
 * // => logs '0', '1', and 'length' (property order is not guaranteed across environments)
 */
var forOwn = function(collection, callback, thisArg) {
  var index, iterable = collection, result = iterable;
  if (!iterable) return result;
  if (!objectTypes[typeof iterable]) return result;
  callback = callback && typeof thisArg == 'undefined' ? callback : baseCreateCallback(callback, thisArg, 3);
    var ownIndex = -1,
        ownProps = objectTypes[typeof iterable] && keys(iterable),
        length = ownProps ? ownProps.length : 0;

    while (++ownIndex < length) {
      index = ownProps[ownIndex];
      if (callback(iterable[index], index, collection) === false) return result;
    }
  return result
};

module.exports = forOwn;

},{"lodash._basecreatecallback":85,"lodash._objecttypes":106,"lodash.keys":107}],85:[function(require,module,exports){
arguments[4][8][0].apply(exports,arguments)
},{"lodash._setbinddata":86,"lodash.bind":89,"lodash.identity":103,"lodash.support":104}],86:[function(require,module,exports){
module.exports=require(9)
},{"lodash._isnative":87,"lodash.noop":88}],87:[function(require,module,exports){
module.exports=require(10)
},{}],88:[function(require,module,exports){
module.exports=require(11)
},{}],89:[function(require,module,exports){
arguments[4][12][0].apply(exports,arguments)
},{"lodash._createwrapper":90,"lodash._slice":102}],90:[function(require,module,exports){
arguments[4][13][0].apply(exports,arguments)
},{"lodash._basebind":91,"lodash._basecreatewrapper":96,"lodash._slice":102,"lodash.isfunction":101}],91:[function(require,module,exports){
arguments[4][14][0].apply(exports,arguments)
},{"lodash._basecreate":92,"lodash._setbinddata":86,"lodash._slice":102,"lodash.isobject":95}],92:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"lodash._isnative":93,"lodash.isobject":95,"lodash.noop":94}],93:[function(require,module,exports){
module.exports=require(10)
},{}],94:[function(require,module,exports){
module.exports=require(11)
},{}],95:[function(require,module,exports){
module.exports=require(18)
},{"lodash._objecttypes":106}],96:[function(require,module,exports){
arguments[4][19][0].apply(exports,arguments)
},{"lodash._basecreate":97,"lodash._setbinddata":86,"lodash._slice":102,"lodash.isobject":100}],97:[function(require,module,exports){
arguments[4][15][0].apply(exports,arguments)
},{"lodash._isnative":98,"lodash.isobject":100,"lodash.noop":99}],98:[function(require,module,exports){
module.exports=require(10)
},{}],99:[function(require,module,exports){
module.exports=require(11)
},{}],100:[function(require,module,exports){
module.exports=require(18)
},{"lodash._objecttypes":106}],101:[function(require,module,exports){
module.exports=require(24)
},{}],102:[function(require,module,exports){
module.exports=require(25)
},{}],103:[function(require,module,exports){
module.exports=require(26)
},{}],104:[function(require,module,exports){
module.exports=require(27)
},{"lodash._isnative":105}],105:[function(require,module,exports){
module.exports=require(10)
},{}],106:[function(require,module,exports){
module.exports=require(29)
},{}],107:[function(require,module,exports){
arguments[4][30][0].apply(exports,arguments)
},{"lodash._isnative":108,"lodash._shimkeys":109,"lodash.isobject":110}],108:[function(require,module,exports){
module.exports=require(10)
},{}],109:[function(require,module,exports){
module.exports=require(32)
},{"lodash._objecttypes":106}],110:[function(require,module,exports){
module.exports=require(18)
},{"lodash._objecttypes":106}],111:[function(require,module,exports){
var escape = require('lodash.escape');

var _uppercasePattern = /([A-Z])/g;

function hyphenateProp(string) {
  return string.replace(_uppercasePattern, '-$1').toLowerCase();
}

function escapeValueForProp(value, prop) {
  // 'content' is a special property that must be quoted
  if (prop === 'content') {
    return '"' + value + '"';
  }
  return escape(value);
}

module.exports = {
  hyphenateProp: hyphenateProp,
  escapeValueForProp: escapeValueForProp
};

},{"lodash.escape":34}],112:[function(require,module,exports){
var isValidCSSProps = require('valid-css-props');

function isValidProp(prop) {
  return isValidCSSProps(prop);
}

function isValidValue(value) {
  return value != null && typeof value !== 'boolean' && value !== '';
}

module.exports = {
  isValidProp: isValidProp,
  isValidValue: isValidValue
};

},{"valid-css-props":45}],113:[function(require,module,exports){
/** @jsx React.DOM */
/**
 * For math rendered using KaTex and/or MathJax. Use me like <TeX>2x + 3</TeX>.
 */
// TODO(joel) - require MathJax / katex so they don't have to be global

var React = require('react');

var pendingScripts = [];
var needsProcess = false;
var timeout = null;

function process(script, callback) {
    pendingScripts.push(script);
    if (!needsProcess) {
        needsProcess = true;
        timeout = setTimeout(doProcess, 0, callback);
    }
}

function doProcess(callback) {
    MathJax.Hub.Queue(function() {
        var oldElementScripts = MathJax.Hub.elementScripts;
        MathJax.Hub.elementScripts = function(element) {
            var scripts = pendingScripts;
            pendingScripts = [];
            needsProcess = false;
            return scripts;
        };

        try {
            return MathJax.Hub.Process(null, callback);
        } catch (e) {
            // IE8 requires `catch` in order to use `finally`
            throw e;
        } finally {
            MathJax.Hub.elementScripts = oldElementScripts;
        }
    });
}

var TeX = React.createClass({displayName: 'TeX',
    getDefaultProps: function() {
        return {
            // Called after math is rendered or re-rendered
            onRender: function() {}
        };
    },

    render: function() {
        return React.DOM.span( {style:this.props.style}, 
            React.DOM.span( {ref:"mathjax"} ),
            React.DOM.span( {ref:"katex"} )
        );
    },

    componentDidMount: function() {
        var text = this.props.children;
        var onRender = this.props.onRender;

        try {
            var katexHolder = this.refs.katex.getDOMNode();
            katex.process(text, katexHolder);
            onRender();
            return;
        } catch (e) {
            /* jshint -W103 */
            if (e.__proto__ !== katex.ParseError.prototype) {
            /* jshint +W103 */
                throw e;
            }
        }

        this.setScriptText(text);
        process(this.script, onRender);
    },

    componentDidUpdate: function(prevProps, prevState) {
        var oldText = prevProps.children;
        var newText = this.props.children;
        var onRender = this.props.onRender;

        if (oldText !== newText) {
            try {
                var katexHolder = this.refs.katex.getDOMNode();
                katex.process(newText, katexHolder);
                if (this.script) {
                    var jax = MathJax.Hub.getJaxFor(this.script);
                    if (jax) {
                        jax.Remove();
                    }
                }
                onRender();
                return;
            } catch (e) {
                /* jshint -W103 */
                if (e.__proto__ !== katex.ParseError.prototype) {
                /* jshint +W103 */
                    throw e;
                }
            }

            $(this.refs.katex.getDOMNode()).empty();

            if (this.script) {
                var component = this;
                MathJax.Hub.Queue(function() {
                    var jax = MathJax.Hub.getJaxFor(component.script);
                    if (jax) {
                        return jax.Text(newText, onRender);
                    } else {
                        component.setScriptText(newText);
                        process(component.script, onRender);
                    }
                });
            } else {
                this.setScriptText(newText);
                process(this.script, onRender);
            }
        }
    },

    setScriptText: function(text) {
        if (!this.script) {
            this.script = document.createElement("script");
            this.script.type = "math/tex";
            this.refs.mathjax.getDOMNode().appendChild(this.script);
        }
        if ("text" in this.script) {
            // IE8, etc
            this.script.text = text;
        } else {
            this.script.textContent = text;
        }
    },

    componentWillUnmount: function() {
        if (this.script) {
            var jax = MathJax.Hub.getJaxFor(this.script);
            if (jax) {
                jax.Remove();
            }
        }
    }
});

module.exports = TeX;

},{"react":115}],114:[function(require,module,exports){
/** @jsx React.DOM */

var React = require("react");
var _ = require("underscore");

// TODO(joel/jack) fix z-index issues https://s3.amazonaws.com/uploads.hipchat.com/6574/29028/yOApjwmgiMhEZYJ/Screen%20Shot%202014-05-30%20at%203.34.18%20PM.png
// z-index: 3 on perseus-formats-tooltip seemed to work

/**
 * A generic tooltip library for React.js
 *
 * This should eventually end up in react-components
 *
 * Interface: ({a, b} means one of a or b)
 * var Tooltip = require("./tooltip.jsx");
 * <Tooltip
 *         className="class-for-tooltip-contents"
 *         horizontalPosition="left" // one of "left", "right"
 *         horizontalAlign="left" // one of "left", "right"
 *         verticalPosition="bottom" // one of "top", "bottom"
 *         arrowSize={10} // arrow size in pixels
 *         borderColor="#ccc" // color of the border for the tooltip
 *         show={true} // whether the tooltip should currently be visible
 *         >
 *     <TargetElementOfTheTooltip />
 *     <TooltipContents1 />
 *     <TooltipContents2 />
 * </Tooltip>
 *
 * To show/hide the tooltip, the parent component should call the
 * .show() and .hide() methods of the tooltip when appropriate.
 * (These are usually set up as handlers of events on the target element.)
 *
 * Notes:
 *     className should not specify a border; that is handled by borderColor
 *     so that the arrow and tooltip match
 */

//          __,,--``\\
//  _,,-''``         \\     ,
// '----------_.------'-.___|\__
//    _.--''``    `)__   )__   @\__
//   (  .. ''---/___,,E/__,E'------`
//    `-''`''
// Here be dragons.

var zIndex = 10;

var Triangle = React.createClass({displayName: 'Triangle',
    propTypes: {
        color: React.PropTypes.string.isRequired,
        left: React.PropTypes.number.isRequired,
        "top": React.PropTypes.number.isRequired,
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        horizontalDirection: React.PropTypes.oneOf(
            ["left", "right"]
        ).isRequired,
        verticalDirection: React.PropTypes.oneOf(
            ["top", "bottom"]
        ).isRequired,
    },

    render: function() {
        var borderLeft, borderRight, borderTop, borderBottom;

        var hBorder = (this.props.width + "px solid transparent");
        if (this.props.horizontalDirection === "right") {
            borderLeft = hBorder;
        } else {
            borderRight = hBorder;
        }

        var vBorder = (this.props.height + "px solid " + this.props.color);
        if (this.props.verticalDirection === "top") {
            borderTop = vBorder;
        } else {
            borderBottom = vBorder;
        }

        return React.DOM.div( {style:{
            display: "block",
            height: 0,
            width: 0,
            position: "absolute",
            left: this.props.left,
            "top": this.props["top"],
            borderLeft: borderLeft,
            borderRight: borderRight,
            borderTop: borderTop,
            borderBottom: borderBottom
        }} );
    }
});

var TooltipArrow = React.createClass({displayName: 'TooltipArrow',
    propTypes: {
        position: React.PropTypes.string,
        visibility: React.PropTypes.string,
        left: React.PropTypes.number,
        "top": React.PropTypes.number,
        color: React.PropTypes.string.isRequired,  // a css color
        border: React.PropTypes.string.isRequired,  // a css color
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired,
        horizontalDirection: React.PropTypes.oneOf(
            ["left", "right"]
        ).isRequired,
        verticalDirection: React.PropTypes.oneOf(
            ["top", "bottom"]
        ).isRequired
    },

    getDefaultProps: function() {
        return {
            position: "relative",
            visibility: "visible",
            left: 0,
            "top": 0
        };
    },

    // TODO(jack): Think about adding a box-shadow to the triangle here
    // See http://css-tricks.com/triangle-with-shadow/
    render: function() {
        var isRight = (this.props.horizontalDirection === "right");
        var isTop = (this.props.verticalDirection === "top");

        var frontTopOffset = isTop ? 0 : 1;
        var borderTopOffset = isTop ? 0 : -1;

        return React.DOM.div( {style:{
                display: "block",
                position: this.props.position,
                visibility: this.props.visibility,
                left: this.props.left,
                "top": this.props["top"],
                width: this.props.width + 2,
                height: this.props.height + 1,
                marginTop: -1,
                marginBottom: -2,
                zIndex: zIndex
            }}, 
            /* The background triangle used to create the effect of a
                border around the foreground triangle*/
            Triangle(
                {horizontalDirection:this.props.horizontalDirection,
                verticalDirection:this.props.verticalDirection,
                color:this.props.border,
                left:0,
                top:borderTopOffset,
                width:this.props.width + 2,  // one extra for the diagonal
                height:this.props.height + 2} ),
            /* The foreground triangle covers all but the left/right edges
                of the background triangle */
            Triangle(
                {horizontalDirection:this.props.horizontalDirection,
                verticalDirection:this.props.verticalDirection,
                color:this.props.color,
                left:1,
                top:frontTopOffset,
                width:this.props.width,
                height:this.props.height} )
        );
    }
});

var VERTICAL_CORNERS = {
    "top": {
        "top": "-100%"
    },
    bottom: {
        "top": 0
    }
};

var HORIZONTAL_CORNERS = {
    left: {
        targetLeft: 0,
    },

    right: {
        targetLeft: "100%",
    }
};

var HORIZONTAL_ALIGNMNENTS = {
    left: {
        tooltipLeft: 0,
        arrowLeft: function(arrowSize)  {return 0;}
    },
    right: {
        tooltipLeft: "-100%",
        arrowLeft: function(arrowSize)  {return -arrowSize - 2;}
    }
};


var Tooltip = React.createClass({displayName: 'Tooltip',
    propTypes: {
        show: React.PropTypes.bool.isRequired,
        className: React.PropTypes.string,
        arrowSize: React.PropTypes.number,
        borderColor: React.PropTypes.string,
        verticalPosition: React.PropTypes.oneOf(
            _.keys(VERTICAL_CORNERS)
        ),
        horizontalPosition: React.PropTypes.oneOf(
            _.keys(HORIZONTAL_CORNERS)
        ),
        horizontalAlign: React.PropTypes.oneOf(
            _.keys(HORIZONTAL_ALIGNMNENTS)
        ),
        children: React.PropTypes.arrayOf(
            React.PropTypes.component
        ).isRequired
    },

    getDefaultProps: function() {
        return {
            className: "",
            arrowSize: 10,
            borderColor: "#ccc",
            verticalPosition: "bottom",
            horizontalPosition: "left",
            horizontalAlign: "left"
        };
    },

    getInitialState: function() {
        return {
            height: null  // used for offsetting "top" positioned tooltips
        };
    },

    componentWillReceiveProps: function() {
        // If the contents have changed, reset our measure of the height
        this.setState({height: null});
    },

    render: function() {
        var isTooltipAbove = this.props.verticalPosition === "top";

        /* We wrap the entire output in a span so that it displays inline */
        return React.DOM.span(null, 
            isTooltipAbove && this._renderToolTipDiv(isTooltipAbove),

            /* We wrap our input in a div so that we can put the tooltip in a
                div above/below it */
            React.DOM.div(null, 
                _.first(this.props.children)
            ),

            !isTooltipAbove && this._renderToolTipDiv()
        );
    },

    _renderToolTipDiv: function(isTooltipAbove) {
        var settings = _.extend({},
            HORIZONTAL_CORNERS[this.props.horizontalPosition],
            HORIZONTAL_ALIGNMNENTS[this.props.horizontalAlign],
            VERTICAL_CORNERS[this.props.verticalPosition]
        );

        var arrowAbove;
        var arrowBelow;

        if (isTooltipAbove) {
            // We put an absolutely positioned arrow in the correct place
            arrowAbove = TooltipArrow(
                {verticalDirection:"top",
                horizontalDirection:this.props.horizontalAlign,
                position:"absolute",
                color:"white",
                border:this.props.borderColor,
                left:settings.arrowLeft(this.props.arrowSize),
                top:-this.props.arrowSize + 2,
                width:this.props.arrowSize,
                height:this.props.arrowSize,
                zIndex:zIndex} );

            // And we use a visibility: hidden arrow below to shift up the
            // content by the correct amount
            arrowBelow = TooltipArrow(
                {verticalDirection:"top",
                horizontalDirection:this.props.horizontalAlign,
                visibility:"hidden",
                color:"white",
                border:this.props.borderColor,
                left:settings.arrowLeft(this.props.arrowSize),
                top:-1,
                width:this.props.arrowSize,
                height:this.props.arrowSize,
                zIndex:zIndex} );
        } else {
            arrowAbove = TooltipArrow(
                {verticalDirection:"bottom",
                horizontalDirection:this.props.horizontalAlign,
                color:"white",
                border:this.props.borderColor,
                left:settings.arrowLeft(this.props.arrowSize),
                top:-1,
                width:this.props.arrowSize,
                height:this.props.arrowSize,
                zIndex:zIndex} );

            arrowBelow = null;
        }

        /* A positioned div below the input to be the parent for our
            tooltip */
        return React.DOM.div( {style:{
                position: "relative",
                height: 0,
                display: this.props.show ? "block" : "none",
                }}, 
            React.DOM.div( {ref:"tooltipContainer", className:"tooltipContainer", style:{
                        position: "absolute",
                        // height must start out undefined, not null, so that
                        // we can measure the actual height with jquery.
                        // This is used to position the tooltip with top: -100%
                        // when in verticalPosition: "top" mode
                        height: this.state.height || undefined,
                        left: settings.targetLeft
                    }}, 
                arrowAbove,

                /* The contents of the tooltip */
                React.DOM.div( {className:this.props.className,
                        ref:"tooltipContent",
                        style:{
                            position: "relative",
                            "top": settings["top"],
                            "left": settings.tooltipLeft,
                            border: "1px solid " + this.props.borderColor,
                            "-webkit-box-shadow": "0 1px 3px " +
                                    this.props.borderColor,
                            "-moz-box-shadow": "0 1px 3px " +
                                    this.props.borderColor,
                            boxShadow: "0 1px 3px " +
                                    this.props.borderColor,
                            zIndex: zIndex - 1
                        }}, 
                    _.rest(this.props.children)
                ),

                arrowBelow
            )
        );
    },

    componentDidMount: function() {
        this._updateHeight();
    },

    componentDidUpdate: function() {
        this._updateHeight();
    },

    _updateHeight: function() {
        var height = this.refs.tooltipContainer.getDOMNode().offsetHeight;
        if (height !== this.state.height) {
            this.setState({height:height});
        }
    }
});

// Sorry.  // Apology-Oriented-Programming
module.exports = Tooltip;

},{"react":115,"underscore":116}],115:[function(require,module,exports){
/* This note applies to rcss, react, and underscore.
 *
 * We're faking a node module for this package by just exporting the global.
 * There are a few complications which led us to this solution as a temporary
 * fix.
 *
 * - Browserify can slow down a lot when you include the other packages (and
 *   their dependency graphs). We were also battling general browserify
 *   slowness at this time - browserify 3.4.0 is "good" but later versions
 *   (3.53 if I remember correctly) are terribly slow (on the order of 20x
 *   slower).
 *
 * - I'm not clear on the details of packaging this so we don't duplicate
 *   dependencies anywhere. For instance when packaging perseus for webapp we
 *   need to be careful not to include packages like underscore from our
 *   dependencies or from the packages we depend on. (note: this is a very good
 *   opportunity to either explain how existing tools solve the problem or
 *   create a new tool to solve it)
 *
 * - Joel (and Jack)
 */
module.exports = window.React;

},{}],116:[function(require,module,exports){
/* This note applies to rcss, react, and underscore.
 *
 * We're faking a node module for this package by just exporting the global.
 * There are a few complications which led us to this solution as a temporary
 * fix.
 *
 * - Browserify can slow down a lot when you include the other packages (and
 *   their dependency graphs). We were also battling general browserify
 *   slowness at this time - browserify 3.4.0 is "good" but later versions
 *   (3.53 if I remember correctly) are terribly slow (on the order of 20x
 *   slower).
 *
 * - I'm not clear on the details of packaging this so we don't duplicate
 *   dependencies anywhere. For instance when packaging perseus for webapp we
 *   need to be careful not to include packages like underscore from our
 *   dependencies or from the packages we depend on. (note: this is a very good
 *   opportunity to either explain how existing tools solve the problem or
 *   create a new tool to solve it)
 *
 * - Joel (and Jack)
 */
module.exports = window._;

},{}],117:[function(require,module,exports){
var Widgets = require("./widgets.js");

_.each([
    require("./widgets/categorizer.jsx"),
    require("./widgets/dropdown.jsx"),
    require("./widgets/example-widget.jsx"),
    require("./widgets/example-graphie-widget.jsx"),
    require("./widgets/expression.jsx"),
    require("./widgets/iframe.jsx"),
    require("./widgets/input-number.jsx"),
    require("./widgets/interactive-graph.jsx"),
    require("./widgets/interactive-number-line.jsx"),
    require("./widgets/lights-puzzle.jsx"),
    require("./widgets/matcher.jsx"),
    require("./widgets/measurer.jsx"),
    require("./widgets/number-line.jsx"),
    require("./widgets/numeric-input.jsx"),
    require("./widgets/orderer.jsx"),
    require("./widgets/plotter.jsx"),
    require("./widgets/radio.jsx"),
    require("./widgets/sorter.jsx"),
    require("./widgets/table.jsx"),
    require("./widgets/transformer.jsx"),
    require("./widgets/image.jsx")
], function(widget) {
    Widgets.register(widget.name, _.omit(widget, "name"));
});

},{"./widgets.js":171,"./widgets/categorizer.jsx":172,"./widgets/dropdown.jsx":173,"./widgets/example-graphie-widget.jsx":174,"./widgets/example-widget.jsx":175,"./widgets/expression.jsx":176,"./widgets/iframe.jsx":177,"./widgets/image.jsx":178,"./widgets/input-number.jsx":179,"./widgets/interactive-graph.jsx":180,"./widgets/interactive-number-line.jsx":181,"./widgets/lights-puzzle.jsx":182,"./widgets/matcher.jsx":183,"./widgets/measurer.jsx":184,"./widgets/number-line.jsx":185,"./widgets/numeric-input.jsx":186,"./widgets/orderer.jsx":187,"./widgets/plotter.jsx":188,"./widgets/radio.jsx":189,"./widgets/sorter.jsx":190,"./widgets/table.jsx":191,"./widgets/transformer.jsx":192}],118:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Editor = require("./editor.jsx");
var InfoTip = require("react-components/info-tip");
var Widgets = require("./widgets.js");

var WidgetsInAnswerAreaEditor = ['Image'];

var AnswerAreaEditor = React.createClass({displayName: 'AnswerAreaEditor',
    getDefaultProps: function() {
        return {
            type: "input-number",
            options: {},
            calculator: false
        };
    },

    render: function() {
        var cls;
        if (this.props.type === "multiple") {
            cls = Editor;
        } else {
            cls = Widgets.getEditor(this.props.type);
        }

        var editor = cls(_.extend({
            ref: "editor",
            placeholder: "This answer area is being deprecated. " +
            "Please use the widgets in the question area for your answer.",
            onChange: function(newProps, cb)  {
                var options = _.extend({}, this.props.options, newProps);
                this.props.onChange({options: options}, cb);
            }.bind(this)
        }, this.props.options));

        return React.DOM.div( {className:"perseus-answer-editor"}, 
            React.DOM.div( {className:"perseus-answer-options"}, 
            React.DOM.div(null
            ),
            React.DOM.div(null, React.DOM.label(null, 
                ' ',"Answer type:",' ',
                React.DOM.select( {value:this.props.type,
                        onChange:function(e)  {
                            this.props.onChange({
                                type: e.target.value,
                                options: {}
                            }, function()  {
                                this.refs.editor.focus();
                            }.bind(this));
                        }.bind(this)}, 
                    React.DOM.option( {value:"radio"}, "Multiple choice"),
                    React.DOM.option( {value:"input-number"}, "Text input (number)")
                )
            )
            )
            ),
            React.DOM.div( {className:cls !== Editor ? "perseus-answer-widget" : ""}, 
                editor
            )
        );
    },

    toJSON: function(skipValidation) {
        // Could be just _.pick(this.props, "type", "options"); but validation!
        return {
            type: this.props.type,
            options: this.refs.editor.toJSON(skipValidation),
            calculator: this.props.calculator
        };
    }
});

module.exports = AnswerAreaEditor;

},{"./editor.jsx":143,"./widgets.js":171,"react":115,"react-components/info-tip":5}],119:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Renderer = require("./renderer.jsx");
var QuestionParagraph = require("./question-paragraph.jsx");
var WidgetContainer = require("./widget-container.jsx");
var Widgets = require("./widgets.js");

var Util = require("./util.js");
var EnabledFeatures = require("./enabled-features.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;

var SINGLE_ITEM_WIDGET_ID = "answer-area";
var PT = React.PropTypes;

var AnswerAreaRenderer = React.createClass({displayName: 'AnswerAreaRenderer',
    propTypes: {
        type: PT.string,
        options: PT.object,
        calculator: PT.bool,
        problemNum: PT.number,
        onInteractWithWidget: PT.func.isRequired,
        enabledFeatures: EnabledFeatures.propTypes,
        highlightedWidgets: PT.array.isRequired,
        apiOptions: ApiOptions.propTypes
    },

    getInitialState: function() {
        // TODO(alpert): Move up to parent props?
        return {
            widget: {},
            cls: this.getClass(this.props.type)
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({cls: this.getClass(nextProps.type)});
    },

    getClass: function(type) {
        if (type === "multiple") {
            return Renderer;
        } else {
            return Widgets.getWidget(type, this.props.enabledFeatures);
        }
    },

    render: function() {
        if (this.props.type === "multiple") {
            return this.renderMultiple();
        } else {
            return this.renderSingle();
        }
    },

    emptyWidgets: function() {
        if (this.props.type === "multiple") {
            return this.refs.widget.emptyWidgets();
        } else {
            return Util.scoreIsEmpty(
                this.refs.widget.simpleValidate(this.props.options)) ?
                [SINGLE_ITEM_WIDGET_ID] : [];
        }
    },

    // Gets a focus object fixed up with an "answer-" prefix for
    // onFocusChange when type === "multiple"
    _getAnswerAreaFocusObj: function(rendererFocusObj) {
        if (rendererFocusObj.path == null) {
            return rendererFocusObj;
        }
        // TODO(jack): make "answer" the first element of the prefix
        // array, rather than modifying the widgetId, once we have
        // expunged widgetIds from the rest of the api calls in
        // favor of focus paths
        var answerPath = ["answer-" + rendererFocusObj.path[0]];
        answerPath = answerPath.concat(_.rest(rendererFocusObj.path));
        return {
            path: answerPath,
            element: rendererFocusObj.element
        };
    },

    renderMultiple: function() {
        var parentInterceptInputFocus =
                this.props.apiOptions.interceptInputFocus;
        var parentOnFocusChange = this.props.apiOptions.onFocusChange;

        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            parentInterceptInputFocus && {
                // Rewrite widgetIds sent to interceptInputFocus on the way
                // up to include an "answer-" prefix
                interceptInputFocus: function(widgetId)  {
                    var args = _.toArray(arguments);
                    var fullWidgetId = "answer-" + widgetId;
                    args[0] = fullWidgetId;
                    return parentInterceptInputFocus.apply(null, args);
                }
            },
            parentOnFocusChange && {
                onFocusChange: function(newFocus, oldFocus)  {
                    // If we have an apiOptions.onFocusChange, call
                    // it with an "answer-" prefix on our widget id
                    parentOnFocusChange(
                        this._getAnswerAreaFocusObj(newFocus),
                        this._getAnswerAreaFocusObj(oldFocus)
                    );
                }.bind(this)
            }
        );

        return this.state.cls(_.extend({
            ref: "widget",
            problemNum: this.props.problemNum,
            onChange: this.handleChangeRenderer,
            onInteractWithWidget: this.props.onInteractWithWidget,
            highlightedWidgets: this.props.highlightedWidgets,
            enabledFeatures: _.extend({}, this.props.enabledFeatures, {
                // Hide answer area tooltip formats,
                // the "Acceptable formats" box already works
                toolTipFormats: false
            }),
            apiOptions: apiOptions
        }, this.props.options, this.state.widget));
    },

    renderSingle: function() {
        var shouldHighlight = _.contains(this.props.highlightedWidgets,
                                    SINGLE_ITEM_WIDGET_ID);

        var editorProps = this.props.options;
        var transform = Widgets.getTransform(this.props.type);
        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions
        );

        // Pass onFocus/onBlur handlers to each widget, so they
        // can trigger `onFocusChange`s if/when those happen.
        // Since we're just a single widget, any focusing has
        // to be from nothing (path: null), and any blurring has
        // to be to nothing. Our parent ItemRenderer will handle
        // connecting the dots between these events and any
        // focusing/blurring between elements in the question
        // area to combine this event with those into a single
        // onChangeFocus at the ItemRenderer level.
        var onFocus = function(path, elem)  {
            this._isFocused = true;
            apiOptions.onFocusChange({
                path: [SINGLE_ITEM_WIDGET_ID].concat(path),
                element: elem || this.refs.widget.getDOMNode()
            }, {
                // we're pretending we're a renderer, so if we got
                // focus, we must not have had it before
                path: null,
                element: null
            });
        }.bind(this);
        var onBlur = function(path, elem)  {
            this._isFocused = false;
            apiOptions.onFocusChange({
                path: null,
                element: null
            }, {
                path: [SINGLE_ITEM_WIDGET_ID].concat(path),
                element: elem || this.refs.widget.getDOMNode()
            });
        }.bind(this);

        return QuestionParagraph(null, 
            WidgetContainer(
                {shouldHighlight:shouldHighlight} , 
                this.state.cls(_.extend({
                    ref: "widget",
                    widgetId: SINGLE_ITEM_WIDGET_ID,
                    problemNum: this.props.problemNum,
                    onChange: this.handleChangeRenderer,
                    enabledFeatures: _.extend({}, this.props.enabledFeatures, {
                        // Hide answer area tooltip formats,
                        // the "Acceptable formats" box already works
                        toolTipFormats: false
                    }),
                    apiOptions: apiOptions,
                    onFocus: onFocus,
                    onBlur: onBlur
                }, transform(editorProps), this.state.widget))
            )
        );
    },

    _setWidgetProps: function(widgetId, newProps, cb) {
        // "area" -> global id "answer-area" ;)
        if (widgetId === "area" && this.props.type !== "multiple") {
            // We have a single widget
            this.handleChangeRenderer(newProps, cb);
        } else if (this.props.type === "multiple") {
            // We have a `Renderer`
            this.refs.widget._setWidgetProps(widgetId, newProps, cb);
        } else if ((typeof console) !== "undefined" && console.error) {
            // We have a widget id other than area in a non-renderer area
            console.error(
                "Sent invalid widget id `answer-" + widgetId +
                "` to an answerArea of type `" + this.props.type + "`."
            );
        }
    },

    handleChangeRenderer: function(newProps, cb) {
        var widget = _.extend({}, this.state.widget, newProps);
        this.setState({widget: widget}, function()  {
            if (this.props.type !== "multiple") {
                var cbResult = cb && cb();
                this.props.onInteractWithWidget(SINGLE_ITEM_WIDGET_ID);
                // If we're not type === "multiple", send an onFocusChange
                // event to focus to this widget if we aren't already focused.
                // For type "multiple" these events are handled in the
                // multiple's Renderer

                if (cbResult !== false &&
                        this.props.apiOptions.onFocusChange &&
                        !this._isFocused) {
                    this._isFocused = true;
                    this.props.apiOptions.onFocusChange({
                        path: [SINGLE_ITEM_WIDGET_ID],
                        // TODO(jack): Make this less hacky (call some magic
                        // getElement function or something):
                        element: this.refs.widget.getDOMNode()
                    }, {
                        // we're pretending we're a renderer, so if we got
                        // focus, we must not have had it before
                        path: null,
                        element: null
                    });
                }
            }
        }.bind(this));
    },

    componentDidMount: function() {
        // Storing things directly on components should be avoided!
        this.examples = [];
        this.$examples = $("<div id='examples'></div>");
        this._isFocused = false;

        this.update();
    },

    componentDidUpdate: function() {
        this.update();
    },

    update: function() {
        $("#calculator").toggle(this.props.calculator);

        var widget = this.refs.widget;
        var examples = widget.examples ? widget.examples() : null;

        if (_.isEqual(examples, this.examples)) {
            // Only destroy (and maybe recreate) qtip if examples have changed
            return;
        }

        this.examples = examples;

        $("#examples-show").hide();
        if ($("#examples-show").data("qtip")) {
            // This will warn about Jquery removing a node owned by React, 
            // however React no longer owns that node. We created that node 
            // using React, copied its html, passed it to qtip, and then 
            // unmounted it from React. So it React thinks it is it's code 
            // because it has a data-reactid, but qtip created it.      
            $("#examples-show").qtip("destroy", /* immediate */ true);
        }

        if (examples && $("#examples-show").length) {
            $("#examples-show").append(this.$examples);

            var content = _.map(examples, function(example) {
                return "- " + example;
            }).join("\n");

            React.renderComponent(
                Renderer({content: content}),
                this.$examples[0]);

            $("#examples-show").qtip({
                content: {
                    text: this.$examples.html()
                },
                style: {classes: "qtip-light leaf-tooltip"},
                position: {
                    my: "center right",
                    at: "center left"
                },
                show: {
                    delay: 200,
                    effect: {
                        length: 0
                    }
                },
                hide: {delay: 0}
            });

            // Now that qtip has been created with a copy of the react 
            // component's html, we no longer need to keep the react component.
            React.unmountComponentAtNode(this.$examples[0]);
            this.$examples.remove();

            $("#examples-show").show();
        }
    },

    componentWillUnmount: function() {
        if (this.props.calculator) {
            $("#calculator").hide();
        }
        if (this.state.cls.examples && $("#examples-show").length) {
            $("#examples-show").hide();
            React.unmountComponentAtNode(
                    document.getElementById("examples"));
        }
    },

    focus: function() {
        this.refs.widget.focus();
    },

    guessAndScore: function() {
        // TODO(alpert): These should probably have the same signature...
        if (this.props.type === "multiple") {
            return this.refs.widget.guessAndScore();
        } else {
            var guess = this.refs.widget.toJSON();

            var score;
            if (this.props.graded == null || this.props.graded) {
                // props.graded is unset or true
                // TODO(alpert): Separate out the rubric
                score = this.refs.widget.simpleValidate(this.props.options);
            } else {
                score = Util.noScore;
            }

            return [guess, score];
        }
    }
});

module.exports = AnswerAreaRenderer;

},{"./enabled-features.jsx":144,"./perseus-api.jsx":162,"./question-paragraph.jsx":164,"./renderer.jsx":165,"./util.js":168,"./widget-container.jsx":170,"./widgets.js":171,"react":115}],120:[function(require,module,exports){
/** @jsx React.DOM */

/**
 * A <select> component rendered with classes instead of natively,
 * so that the classes may be styled/animated/magics
 *
 * Usage:
 * <FancySelect value={1}>
 *     <FancySelect.Option value={0}>text0</FancySelect.Option>
 *     <FancySelect.Option value={1}>text1</FancySelect.Option>
 *     <FancySelect.Option value={2}>text2</FancySelect.Option>
 * </FancySelect>
 *
 * Here be dragons.
 */

var React = require("react");

// Hack to get around react descriptors not being renderable
// in a new component after the first render. This is being
// fixed in react 0.11 with the separation of descriptors,
// so we can probably remove these tricks then.
// TODO(jack): Remove these once we upgrade to React 0.11
var cloneWithProps = React.addons.cloneWithProps;

var cloneSingle = function(comp)  {
    if (React.isValidComponent(comp)) {
        return cloneWithProps(comp);
    } else {
        return comp;
    }
};

var cloneRenderables = function(children)  {
    if (!children) {
        return children;
    } else if (_.isArray(children)) {
        return _.map(children, cloneSingle);
    } else {
        return cloneSingle(children);
    }
};
// END TODO

var FancyOption = function(props)     {
    var children = _.rest(arguments);
    return _.extend(props, {
        children: children
    });
};

var FancySelect = React.createClass({displayName: 'FancySelect',

    propTypes: {
        value: React.PropTypes.any.isRequired,
        className: React.PropTypes.string,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onChange: function()  { }
        };
    },

    getInitialState: function() {
        return {
            active: false,
            // Keep track of whether we've closed this select
            // from open so that we can only run CSS animations
            // when closing/opening, and not on page load
            // If we just use active, we get a closing animation
            // when the element loads :(.
            closed: false
        };
    },

    render: function() {
        var children = _.flatten([this.props.children || []]);

        // Some css-box magic:
        // We render all of the options on top of each other in a hidden,
        // floated span. This span then forces the <FancySelect>'s
        // width to be large enough to fit the largest option when
        // selected, so that the page doesn't have to re-flow when changing
        // select items.
        var optionSizer = React.DOM.span( {style:{
                    display: "inline-block",
                    float: "left",
                    visibility: "hidden",
                    height: 0
                }}, 
            _.map(children, function(option)  {
                return React.DOM.div( {className:"fancy-select-value-hidden",
                            style:{height: 0}}, 
                    cloneRenderables(option.children)
                );
            })
        );

        var selectedOption = _.findWhere(children, {
            value: this.props.value
        });

        var selectBoxClassName = React.addons.classSet({
            "fancy-select": true,
            active: this.state.active,
            closed: this.state.closed
        });

        var selectBox = React.DOM.div( {className:selectBoxClassName,
                onClick:this._swapActive}, 
                optionSizer,
                /* position this absolutely so it goes on top
                    of the optionSizer, not next to it */
                React.DOM.span(
                        {className:"fancy-select-value",
                        style:{position: "absolute"}}, 
                    cloneRenderables(selectedOption.children)
                )
        );

        var options = _.map(children, function(option, i)  {
            // options can specify visible={true|false|null/undefined} to
            // control whether they are displayed always, never, or when
            // active (the default). `true` is useful if you want to manage
            // visibility manually via css.
            var visible = option.visible != null ?
                    option.visible :
                    this.state.active;
            if (!visible) {
                return null;
            }

            var className = React.addons.classSet({
                "fancy-option": true,
                active: this.state.active,
                closed: this.state.closed,
                selected: option.value === this.props.value
            });
            if (option.className) {
                className += " " + option.className;
            }

            return React.DOM.li(
                    {className:className,
                    key:i,
                    style:option.style,
                    onClick:function()  {
                        this.props.onChange(option.value, option);
                        this.setState({
                            active: false,
                            closed: true
                        });
                    }.bind(this)}, 
                cloneRenderables(option.children)
            );
        }.bind(this));

        var optionsBoxClassName = React.addons.classSet({
            "fancy-select-options": true,
            active: this.state.active,
            closed: this.state.closed
        });

        return React.DOM.div( {className:this.props.className}, 
            selectBox,
            React.DOM.ul( {className:optionsBoxClassName}, 
                options
            )
        );
    },

    _swapActive: function() {
        var active = !this.state.active;
        var closed = !active;
        this.setState({
            active: active,
            closed: closed
        });
    }
});

FancySelect.Option = FancyOption;

module.exports = FancySelect;

},{"react":115}],121:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Changeable  = require("../mixins/changeable.jsx");

var ButtonGroup = require("react-components/button-group");
var InfoTip     = require("react-components/info-tip");
var NumberInput = require("../components/number-input.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var RangeInput = require("../components/range-input.jsx");
var Util = require("../util.js");

var defaultBoxSize = 400;
var defaultBackgroundImage = {
    url: null,
    scale: 1,
    bottom: 0,
    left: 0,
};

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

var GraphSettings = React.createClass({displayName: 'GraphSettings',

    mixins: [Changeable],

    getInitialState: function() {
        return {
            labelsTextbox: this.props.labels,
            gridStepTextbox: this.props.gridStep,
            snapStepTextbox: this.props.snapStep,
            stepTextbox: this.props.step,
            rangeTextbox: this.props.range
        };
    },

    getDefaultProps: function() {
        return {
            box: [340, 340],
            labels: ["x", "y"],
            range: [[-10, 10], [-10, 10]],
            step: [1, 1],
            gridStep: [1, 1],
            snapStep: Util.snapStepFromGridStep(
                this.props.gridStep || [1, 1]),
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10
        };
    },

    render: function() {
        return React.DOM.div(null, 
            React.DOM.div( {className:"graph-settings"}, 
                React.DOM.div( {className:"perseus-widget-row"}, 
                    React.DOM.div( {className:"perseus-widget-left-col"},  " x Label",
                        React.DOM.input(  {type:"text",
                                className:"graph-settings-axis-label",
                                ref:"labels-0",
                                onChange:this.changeLabel.bind(this, 0),
                                value:this.state.labelsTextbox[0]} )
                    ),
                    React.DOM.div( {className:"perseus-widget-right-col"}, "y Label",
                        React.DOM.input(  {type:"text",
                                className:"graph-settings-axis-label",
                                ref:"labels-1",
                                onChange:this.changeLabel.bind(this, 1),
                                value:this.state.labelsTextbox[1]} )
                    )
                ),

                React.DOM.div( {className:"perseus-widget-row"}, 
                    React.DOM.div( {className:"perseus-widget-left-col"}, 
                        "x Range",
                        RangeInput( {value: this.state.rangeTextbox[0],
                            onChange:  this.changeRange.bind(this, 0)} )
                    ),
                    React.DOM.div( {className:"perseus-widget-right-col"}, 
                        "y Range",
                        RangeInput( {value: this.state.rangeTextbox[1],
                            onChange:  this.changeRange.bind(this, 1)} )
                    )
                ),
                React.DOM.div( {className:"perseus-widget-row"}, 
                    React.DOM.div( {className:"perseus-widget-left-col"}, 
                        "Tick Step",
                        RangeInput( {value: this.state.stepTextbox,
                                    onChange:  this.changeStep} )
                    ),
                    React.DOM.div( {className:"perseus-widget-right-col"}, 
                        "Grid Step",
                        RangeInput( {value: this.state.gridStepTextbox,
                                    onChange:  this.changeGridStep} )
                    )
                ),
                React.DOM.div( {className:"perseus-widget-row"}, 
                    React.DOM.div( {className:"perseus-widget-left-col"}, 
                        "Snap Step",
                        RangeInput( {value: this.state.snapStepTextbox,
                                    onChange:  this.changeSnapStep} )
                    )
                ),
                React.DOM.div( {className:"perseus-widget-row"}, 
                    React.DOM.label(null, "Markings:",' ', " " ),
                    ButtonGroup( {value:this.props.markings,
                        allowEmpty:false,
                        buttons:[
                            {value: "graph", text: "Graph"},
                            {value: "grid", text: "Grid"},
                            {value: "none", text: "None"}],
                        onChange:this.change("markings")} )
                )
            ),
            React.DOM.div( {className:"image-settings"}, 
                React.DOM.div(null, "Background image:"),
                React.DOM.div(null, "Url:",' ',
                    React.DOM.input( {type:"text",
                            className:"graph-settings-background-url",
                            ref:"bg-url",
                            defaultValue:this.props.backgroundImage.url,
                            onKeyPress:this.changeBackgroundUrl,
                            onBlur:this.changeBackgroundUrl} ),
                    InfoTip(null, 
                        React.DOM.p(null, "Create an image in graphie, or use the \"Add image\""+' '+
                        "function to create a background.")
                    )
                ),
                this.props.backgroundImage.url && React.DOM.div(null, 
                    React.DOM.div(null, "Pixels from left:",' ',
                        React.DOM.input( {type:"text",
                                ref:"bg-left",
                                value:this.props.backgroundImage.left,
                                onChange:
                        _.partial(this.changeBackgroundSetting, "left")} )
                    ),
                    React.DOM.div(null, "Pixels from bottom:",' ',
                        React.DOM.input( {type:"text",
                                ref:"bg-bottom",
                                value:this.props.backgroundImage.bottom,
                                onChange:
                        _.partial(this.changeBackgroundSetting, "bottom")} )
                    ),
                    React.DOM.div(null, "Image scale:",' ',
                        React.DOM.input( {type:"text",
                                ref:"bg-scale",
                                value:this.props.backgroundImage.scale,
                                onChange:
                        _.partial(this.changeBackgroundSetting, "scale")} )
                    )
                )
            ),
            React.DOM.div( {className:"misc-settings"}, 
                React.DOM.div( {className:"perseus-widget-row"}, 
                    React.DOM.div( {className:"perseus-widget-left-col"}, 
                        PropCheckBox( {label:"Show ruler",
                            showRuler:this.props.showRuler,
                            onChange:this.props.onChange} )
                    ),
                    React.DOM.div( {className:"perseus-widget-right-col"}, 
                        PropCheckBox( {label:"Show protractor",
                            showProtractor:this.props.showProtractor,
                            onChange:this.props.onChange} )
                    )
                ),
                this.props.showRuler && React.DOM.div(null, 
                    React.DOM.div(null, 
                        React.DOM.label(null, 
                            ' ',"Ruler label:",' ',
                            React.DOM.select(
                                {onChange:this.changeRulerLabel,
                                value:this.props.rulerLabel} , 
                                    React.DOM.option( {value:""}, "None"),
                                    React.DOM.optgroup( {label:"Metric"}, 
                                        this.renderLabelChoices([
                                            ["milimeters", "mm"],
                                            ["centimeters", "cm"],
                                            ["meters", "m"],
                                            ["kilometers", "km"]
                                        ])
                                    ),
                                    React.DOM.optgroup( {label:"Imperial"}, 
                                        this.renderLabelChoices([
                                            ["inches", "in"],
                                            ["feet", "ft"],
                                            ["yards", "yd"],
                                            ["miles", "mi"]
                                        ])
                                    )
                            )
                        )
                    ),
                    React.DOM.div(null, 
                        React.DOM.label(null, 
                            ' ',"Ruler ticks:",' ',
                            React.DOM.select(
                                {onChange:this.changeRulerTicks,
                                value:this.props.rulerTicks} , 
                                    _.map([1, 2, 4, 8, 10, 16], function(n) {
                                        return React.DOM.option( {value:n}, n);
                                    })
                            )
                        )
                    )
                )
            )
        );
    },

    renderLabelChoices: function(choices) {
        return _.map(choices, function(nameAndValue) {
            return React.DOM.option( {value:nameAndValue[1]}, nameAndValue[0]);
        });
    },

    componentDidMount: function() {
        var changeGraph = this.changeGraph;
        this.changeGraph = _.debounce(changeGraph.bind(this), 300);
    },


    validRange: function(range) {
        var numbers = _.every(range, function(num) {
            return _.isFinite(num);
        });
        if (! numbers) {
            return "Range must be a valid number";
        }
        if (range[0] >= range[1]) {
            return "Range must have a higher number on the right";
        }
        return true;
    },

    validateStepValue: function(settings) {
        var step = settings.step;
        var range = settings.range;
        var name = settings.name;
        var minTicks = settings.minTicks;
        var maxTicks = settings.maxTicks;

        if (! _.isFinite(step)) {
            return name + " must be a valid number";
        }
        var nSteps = numSteps(range, step);
        if (nSteps < minTicks) {
            return name + " is too large, there must be at least " +
               minTicks + " ticks.";
        }
        if (nSteps > maxTicks) {
            return name + " is too small, there can be at most " +
               maxTicks + " ticks.";
        }
        return true;
    },

    validSnapStep: function(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Snap step",
            minTicks: 5,
            maxTicks: 60
        });
    },

    validGridStep: function(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Grid step",
            minTicks: 3,
            maxTicks: 60
        });
    },

    validStep: function(step, range) {
        return this.validateStepValue({
            step: step,
            range: range,
            name: "Step",
            minTicks: 3,
            maxTicks: 20
        });
    },

    validateGraphSettings: function(range, step, gridStep, snapStep) {
        var self = this;
        var msg;
        var goodRange = _.every(range, function(range) {
            msg = self.validRange(range);
            return msg === true;
        });
        if (!goodRange) {
            return msg;
        }
        var goodStep = _.every(step, function(step, i) {
            msg = self.validStep(step, range[i]);
            return msg === true;
        });
        if (!goodStep) {
            return msg;
        }
        var goodGridStep = _.every(gridStep, function(gridStep, i) {
            msg = self.validGridStep(gridStep, range[i]);
            return msg === true;
        });
        if (!goodGridStep) {
            return msg;
        }
        var goodSnapStep = _.every(snapStep, function(snapStep, i) {
            msg = self.validSnapStep(snapStep, range[i]);
            return msg === true;
        });
        if (!goodSnapStep) {
            return msg;
        }
        return true;
    },

    changeLabel: function(i, e) {
        var val = e.target.value;
        var labels = this.state.labelsTextbox.slice();
        labels[i] = val;
        this.setState({ labelsTextbox: labels }, this.changeGraph);
    },

    changeRange: function(i, values) {
        var ranges = this.state.rangeTextbox.slice();
        ranges[i] = values;
        var step = this.state.stepTextbox.slice();
        var gridStep = this.state.gridStepTextbox.slice();
        var snapStep = this.state.snapStepTextbox.slice();
        var scale = Util.scaleFromExtent(ranges[i], this.props.box[i]);
        if (this.validRange(ranges[i]) === true) {
            step[i] = Util.tickStepFromExtent(
                    ranges[i], this.props.box[i]);
            gridStep[i] = Util.gridStepFromTickStep(step[i], scale);
            snapStep[i] = gridStep[i] / 2;
        }
        this.setState({
            stepTextbox: step,
            gridStepTextbox: gridStep,
            snapStepTextbox: snapStep,
            rangeTextbox: ranges
        }, this.changeGraph);
    },

    changeStep: function(step) {
        this.setState({ stepTextbox: step }, this.changeGraph);
    },

    changeSnapStep: function(snapStep) {
        this.setState({ snapStepTextbox: snapStep },
                this.changeGraph);
    },

    changeGridStep: function(gridStep) {
        this.setState({
            gridStepTextbox: gridStep,
            snapStepTextbox: _.map(gridStep, function(step) {
                return step / 2;
            })
        }, this.changeGraph);
    },

    changeGraph: function() {
        var labels = this.state.labelsTextbox;
        var range = _.map(this.state.rangeTextbox, function(range) {
            return _.map(range, Number);
        });
        var step = _.map(this.state.stepTextbox, Number);
        var gridStep = this.state.gridStepTextbox;
        var snapStep = this.state.snapStepTextbox;

        // validationResult is either:
        //   true -> the settings are valid
        //   a string -> the settings are invalid, and the explanation
        //               is contained in the string
        // TODO(jack): Refactor this to not be confusing
        var validationResult = this.validateGraphSettings(range, step,
                gridStep, snapStep);

        if (validationResult === true) {  // either true or a string
            this.change({
                valid: true,
                labels: labels,
                range: range,
                step: step,
                gridStep: gridStep,
                snapStep: snapStep
            });
        } else {
            this.change({
                valid: validationResult  // a string message, not false
            });
        }
    },

    changeBackgroundUrl: function(e) {
        var self = this;

        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        var url = self.refs["bg-url"].getDOMNode().value;
        var setUrl = function() {
            var image = _.clone(self.props.backgroundImage);
            image.url = url;
            image.width = img.width;
            image.height = img.height;
            self.props.onChange({
                backgroundImage: image,
                markings: url ? "none" : "graph"
            });
        };
        if (url) {
            var img = new Image();
            img.onload = setUrl;
            img.src = url;
        } else {
            var img = {
                url: url,
                width: 0,
                height: 0
            };
            setUrl();
        }
    },

    changeBackgroundSetting: function(type, e) {
        var image = _.clone(this.props.backgroundImage);
        image[type] = e.target.value;
        this.change({ backgroundImage: image });
    },

    // TODO(jack): Make either a wrapper for standard events to work
    // with this.change, or make these use some TextInput/NumberInput box
    changeRulerLabel: function(e) {
        this.change({rulerLabel: e.target.value});
    },

    changeRulerTicks: function(e) {
        this.change({rulerTicks: +e.target.value});
    }
});

module.exports = GraphSettings;

},{"../components/number-input.jsx":129,"../components/prop-check-box.jsx":130,"../components/range-input.jsx":131,"../mixins/changeable.jsx":159,"../util.js":168,"react":115,"react-components/button-group":3,"react-components/info-tip":5}],122:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Util = require("../util.js");

var defaultBoxSize = 400;
var defaultBackgroundImage = {
    url: null,
    scale: 1,
    bottom: 0,
    left: 0,
};

/* Style objects */
var defaultInstructionsStyle = {
    fontStyle: 'italic',
    fontWeight: 'bold',
    fontSize: '32px',
    width: '100%',
    height: '100%',
    textAlign: 'center',
    backgroundColor: 'white',
    position: 'absolute',
    zIndex: 1,
    transition: 'opacity .25s ease-in-out',
    '-moz-transition': 'opacity .25s ease-in-out',
    '-webkit-transition': 'opacity .25s ease-in-out'
};

var instructionsTextStyle = {
    position: 'relative',
    top: '25%'
};

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

var Graph = React.createClass({displayName: 'Graph',
    propTypes: {
        box: React.PropTypes.array.isRequired,
        labels: React.PropTypes.arrayOf(React.PropTypes.string),
        range: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(
                React.PropTypes.number
            )
        ),
        step: React.PropTypes.arrayOf(React.PropTypes.number),
        gridStep: React.PropTypes.arrayOf(React.PropTypes.number),
        snapStep: React.PropTypes.arrayOf(React.PropTypes.number),
        markings: React.PropTypes.string,
        backgroundImage: React.PropTypes.shape({
            url: React.PropTypes.string,
            scale: React.PropTypes.number,
            bottom: React.PropTypes.number,
            left: React.PropTypes.number
        }),
        showProtractor: React.PropTypes.bool,
        showRuler: React.PropTypes.bool,
        rulerLabel: React.PropTypes.string,
        rulerTicks: React.PropTypes.number,
        onNewGraphie: React.PropTypes.func,
        instructions: React.PropTypes.string,
        onClick: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            box: [defaultBoxSize, defaultBoxSize],
            labels: ["x", "y"],
            range: [[-10, 10], [-10, 10]],
            step: [1, 1],
            gridStep: [1, 1],
            snapStep: [0.5, 0.5],
            markings: "graph",
            backgroundImage: defaultBackgroundImage,
            showProtractor: false,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            instructions: null,
            onNewGraphie: null,
            onClick: null,
            onMouseDown: null,
        };
    },

    render: function() {
        var image = this.props.backgroundImage;
        if (image.url) {
            var preScale = this.props.box[0] / defaultBoxSize;
            var scale = image.scale * preScale;
            var style = {
                bottom: (preScale * image.bottom) + "px",
                left: (preScale * image.left) + "px",
                width: (scale * image.width) + "px",
                height: (scale * image.height) + "px"
            };
            image = React.DOM.img( {style:style, src:image.url} );
        } else {
            image = null;
        }

        return React.DOM.div(
                    {className:"graphie-container above-scratchpad",
                    style:{
                        width: this.props.box[0],
                        height: this.props.box[1]
                    },
                    onMouseOut:this.onMouseOut,
                    onMouseOver:this.onMouseOver,
                    onClick:this.onClick} , 
            image,
        React.DOM.div( {className:"graphie", ref:"graphieDiv"} )
        );
    },

    componentDidMount: function() {
        this._setupGraphie();
    },

    componentDidUpdate: function() {
        // Only setupGraphie once per componentDidUpdate().
        // See explanation in setupGraphie().
        this._hasSetupGraphieThisUpdate = false;
        if (this._shouldSetupGraphie) {
            this._setupGraphie();
            this._shouldSetupGraphie = false;
        }
    },

    componentWillReceiveProps: function(nextProps) {
        var potentialChanges = ["labels", "range", "step", "markings",
            "showProtractor", "showRuler", "rulerLabel", "rulerTicks",
            "gridStep", "snapStep"];
        var self = this;
        _.each(potentialChanges, function(prop) {
            if (!_.isEqual(self.props[prop], nextProps[prop])) {
                self._shouldSetupGraphie = true;
            }
        });
    },

    /* Reset the graphie canvas to its initial state
     *
     * Use when re-rendering the parent component and you need a blank
     * graphie.
     */
    reset: function() {
        this._setupGraphie();
    },

    graphie: function() {
        return this._graphie;
    },

    pointsFromNormalized: function(coordsList, noSnap) {
        var self = this;
        return _.map(coordsList, function(coords) {
            return _.map(coords, function(coord, i) {
                var range = self.props.range[i];
                if (noSnap) {
                    return range[0] + (range[1] - range[0]) * coord;
                } else {
                    var step = self.props.step[i];
                    var nSteps = numSteps(range, step);
                    var tick = Math.round(coord * nSteps);
                    return range[0] + step * tick;
                }
            });
        });
    },

    _setupGraphie: function() {
        // Only setupGraphie once per componentDidUpdate().
        // This prevents this component from rendering graphie
        // and then immediately re-render graphie because its
        // parent component asked it to. This will happen when
        // props on the parent and props on this component both
        // require graphie to be re-rendered.
        if (this._hasSetupGraphieThisUpdate) {
            return;
        }

        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var labels = this.props.labels;
        var range = this.props.range;
        var graphie = this._graphie = KhanUtil.createGraphie(graphieDiv);

        var gridConfig = this._getGridConfig();
        graphie.snap = this.props.snapStep;

        if (this.props.markings === "graph") {
            graphie.graphInit({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                axisArrows: "<->",
                labelFormat: function(s) { return "\\small{" + s + "}"; },
                gridStep: this.props.gridStep,
                tickStep: _.pluck(gridConfig, "tickStep"),
                labelStep: 1,
                unityLabels: _.pluck(gridConfig, "unityLabel")
            });
            graphie.label([0, range[1][1]], labels[1], "above");
            graphie.label([range[0][1], 0], labels[0], "right");
        } else if (this.props.markings === "grid") {
            graphie.graphInit({
                range: range,
                scale: _.pluck(gridConfig, "scale"),
                gridStep: this.props.gridStep,
                axes: false,
                ticks: false,
                labels: false
            });
        } else if (this.props.markings === "none") {
            graphie.init({
                range: range,
                scale: _.pluck(gridConfig, "scale")
            });
        }

        // Add instructions just before mouse layer
        var visible = 0.5;
        var invisible = 0.0;
        var $instructionsWrapper;
        if (this.props.instructions) {
            var $instructionsWrapper = $("<div/>");
            _.each(defaultInstructionsStyle, function(value, key) {
                $instructionsWrapper.css(key, value);
            });
            $instructionsWrapper.css("opacity", visible);

            var $instructions = $("<span/>", {
                text: this.props.instructions
            });
            _.each(instructionsTextStyle, function(value, key) {
                $instructions.css(key, value);
            });

            $instructionsWrapper.append($instructions);
            $(graphieDiv).append($instructionsWrapper);
        } else {
            $instructionsWrapper = undefined;
        }

        // Add some handlers for instructions text (if necessary)
        var onMouseDown = ($instructionsWrapper || this.props.onMouseDown) ?
            _.bind(function(coord) {
                if ($instructionsWrapper) {
                    $instructionsWrapper.remove();
                    $instructionsWrapper = null;
                }
                this.props.onMouseDown(coord);
            }, this) : null;

        var onMouseOver = ($instructionsWrapper) ?
            function() {
                $instructionsWrapper &&
                    $instructionsWrapper.css("opacity", invisible);
            } : null;

        var onMouseOut = ($instructionsWrapper) ?
            function() {
                $instructionsWrapper &&
                    $instructionsWrapper.css("opacity", visible);
            } : null;

        graphie.addMouseLayer({
            onClick: this.props.onClick,
            onMouseDown: onMouseDown,
            onMouseOver: onMouseOver,
            onMouseOut: onMouseOut,
            onMouseUp: this.props.onMouseUp,
            onMouseMove: this.props.onMouseMove,
            allowScratchpad: true
        });

        this._updateProtractor();
        this._updateRuler();

        // We set this flag before jumping into our callback
        // to avoid recursing if our callback calls reset() itself
        this._hasSetupGraphieThisUpdate = true;
        if (this.props.onNewGraphie) {
            this.props.onNewGraphie(graphie);
        }
    },

    _getGridConfig: function() {
        var self = this;
        return _.map(self.props.step, function(step, i) {
            return Util.gridDimensionConfig(
                    step,
                    self.props.range[i],
                    self.props.box[i],
                    self.props.gridStep[i]);
        });
    },

    _updateProtractor: function() {
        if (this.protractor) {
            this.protractor.remove();
        }

        if (this.props.showProtractor) {
            var coord = this.pointsFromNormalized([[0.50, 0.05]])[0];
            this.protractor = this._graphie.protractor(coord);
        }
    },

    _updateRuler: function() {
        if (this.ruler) {
            this.ruler.remove();
        }

        if (this.props.showRuler) {
            var coord = this.pointsFromNormalized([[0.50, 0.25]])[0];
            var extent = this._graphie.range[0][1] - this._graphie.range[0][0];
            this.ruler = this._graphie.ruler({
                center: coord,
                label: this.props.rulerLabel,
                pixelsPerUnit: this._graphie.scale[0],
                ticksPerUnit: this.props.rulerTicks,
                units: Math.round(0.8 * extent)
            });
        }
    },

    toJSON: function() {
        return _.pick(this.props, 'range', 'step', 'markings', 'labels',
                      'backgroundImage', 'showProtractor', 'showRuler',
                      'rulerLabel', 'rulerTicks', 'gridStep', 'snapStep');
    }
});

module.exports = Graph;

},{"../util.js":168,"react":115}],123:[function(require,module,exports){
/** @jsx React.DOM */var Util = require("../util.js");
var nestedMap = Util.nestedMap;
var deepEq = Util.deepEq;

/**
 * A base class for all Graphie Movables
 *
 * Used for checking that all Graphie children are, in fact,
 * GraphieMovables
 */
function GraphieMovable(descriptor) {
    _.extend(this, descriptor);
}

var abstractMethod = function() {
    throw new Error("Abstract method! Must be implemented by Graphie Movable" +
            this.constructor.displayName);
};

_.extend(GraphieMovable.prototype, {
    movableProps: [],
    key: function() {
        return this.props.key;
    },
    add: abstractMethod,
    modify: abstractMethod,
    remove: abstractMethod,
    toFront: function() { /* no op */ }
});


/**
 * returns cloned props modified with `children: childrenArray`
 */
var rewriteProps = function(props, childrenArray) {
    // Clone the props and add `children:`
    // childrenArray is always an array here because this is only called
    // from createClass, which initializes childrenArray as _.rest(arguments)
    return _.extend({}, props, {
        children: _.filter(_.flatten(childrenArray), _.identity)
    });
};


/**
 * Create a custom GraphieMovable class
 */
var createClass = function(spec) {
    var GraphieClass = function(props, childrenArray) {
        this.props = rewriteProps(props, childrenArray);
        return this;
    };

    spec.displayName = spec.displayName || _.uniqueId("GraphieClass");

    // Add the displayName to the constructor for compatibility with
    // React's myDescriptor.constructor.displayName
    GraphieClass.displayName = spec.displayName;

    GraphieClass.prototype = new GraphieMovable(spec);
    GraphieClass.prototype.constructor = GraphieClass;

    return function(props) {
        return new GraphieClass(props, _.rest(arguments));
    };
};


/**
 * Create a GraphieMovable class from a function that describes
 * how to add said class to a graphie, and returns an array of
 * `.remove()`able elements to be used when a remove() or
 * modify() is called.
 *
 * This convenience method creates an inefficient class, although
 * it does check for a difference in this.props and prevProps before
 * removing and re-adding itself.
 *
 * The primary benefit of this is being able to very easily create
 * a wrapper for old graphie code to make it interface with <Graphie>
 *
 * Commonly used elements should use the fully-fledged createClass
 * and implement an efficient modify() operation.
 */
var createSimpleClass = function(addFunction) {
    return createClass({
        displayName: addFunction.name || _.uniqueId("GraphieSimpleClass"),
        movableProps: ["children"],

        add: function(graphie) {
            this._elements = addFunction(graphie, this.props);
            this._prevProps = this.props;
        },

        modify: function(graphie) {
            if (!deepEq(this.props, this._prevProps)) {
                this.remove();
                this.add(graphie);
                this._prevProps = this.props;
                return "reordered";
            }
        },

        remove: function() {
            nestedMap(this._elements, function(elem)  {
                if (elem) {
                    elem.remove();
                }
            });
            this._elements = null;
            this._prevProps = null;
        },

        toFront: function() {
            nestedMap(this._elements, function(elem)  {
                if (_.isFunction(elem.toFront)) {
                    elem.toFront();
                }
            });
        }
    });
};


module.exports = {
    GraphieMovable: GraphieMovable,
    createClass: createClass,
    createSimpleClass: createSimpleClass
};

},{"../util.js":168}],124:[function(require,module,exports){
/** @jsx React.DOM */var GraphieClasses = require("./graphie-classes.jsx");
var Interactive2 = require("../interactive2.js");
var InteractiveUtil = require("../interactive2/interactive-util.js");

var assert = InteractiveUtil.assert;

var MovablePoint = GraphieClasses.createClass({
    displayName: "MovablePoint",

    movableProps: ["children"],

    add: function(graphie) {
        this.point = Interactive2.addMovablePoint(graphie, this.props);
    },

    modify: function() {
        this.point.modify(this.props);
    },

    remove: function() {
        this.point.remove();
    },

    toFront: function() {
        this.point.toFront();
    }
});

// Include helper methods, such as MovablePoint.constrain.snap()
_.extend(MovablePoint, Interactive2.MovablePoint);

var Line = GraphieClasses.createSimpleClass(function(graphie, props)  {
    return graphie.line(props.start, props.end, props.style);
});

var Label = GraphieClasses.createSimpleClass(function(graphie, props)  {
    return graphie.label(
        props.coord,
        props.text,
        props.direction,
        props.tex
    );
});

module.exports = {
    Line: Line,
    Label: Label,
    MovablePoint: MovablePoint
};

},{"../interactive2.js":148,"../interactive2/interactive-util.js":149,"./graphie-classes.jsx":123}],125:[function(require,module,exports){
/** @jsx React.DOM */

var GraphieClasses = require("./graphie-classes.jsx");
var Movables = require("./graphie-movables.jsx");

var GraphieMovable = GraphieClasses.GraphieMovable;

var deepEq = require("../util.js").deepEq;
var nestedMap = require("../util.js").nestedMap;
var assert = require("../interactive2/interactive-util.js").assert;

var createGraphie = KhanUtil.createGraphie;

var Graphie = React.createClass({displayName: 'Graphie',
    propTypes: {
        box: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,
        range: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.number)
        ),
        options: React.PropTypes.object,
        setup: React.PropTypes.func.isRequired,
        onClick: React.PropTypes.func,
        onMouseDown: React.PropTypes.func,
        onMouseUp: React.PropTypes.func,
        onMouseMove: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            range: [[-10, 10], [-10, 10]],
            options: {}
        };
    },

    render: function() {
        return React.DOM.div( {className:"graphie-container"}, 
            React.DOM.div( {className:"graphie", ref:"graphieDiv"} )
        );
    },

    componentDidMount: function() {
        this._setupGraphie();
        this._updateMovables();
    },

    shouldComponentUpdate: function(nextProps) {
        return !deepEq(this.props, nextProps);
    },

    componentDidUpdate: function(prevProps) {
        // If someone changes the setup function passed in, we should
        // technically setup graphie again. But that's definitely an
        // anti-pattern, since it is most-likely caused by passing in an
        // anonymous function rather than a "real" change, and re-rendering
        // in that case would cause us to constantly re-setup graphie, which
        // would have horrible performance implications. In order to avoid
        // those, we just warn here.
        if (this.props.setup !== prevProps.setup &&
                window.console && window.console.warn) {
            window.console.warn("<Graphie> was given a new setup function. " +
                    "This is a bad idea; please refactor your code to give " +
                    "the same setup function reference to <Graphie> on " +
                    "every render.");
        }
        if (!deepEq(this.props.options, prevProps.options)) {
            this._setupGraphie();
        }
        this._updateMovables();
    },

    /**
     * Allow parents of the <Graphie> component to grab a reference to the
     * underlying graphie object using
     * `this.refs.graphieComponent.getGraphie()`
     *
     * This shouldn't be necessary for 90% of cases, but the power is there.
     * Use it for good and not evil.
     */
    getGraphie: function() {
        return this._graphie;
    },

    // bounds-checked range
    _range: function() {
        return _.map(this.props.range, function(dimRange)  {
            if (dimRange[0] >= dimRange[1]) {
                return [-10, 10];
            } else {
                return dimRange;
            }
        });
    },

    _box: function() {
        return _.map(this.props.box, function(pixelDim)  {
            // 340 = default size in the editor. exact value
            // is arbitrary; this is just a safety check.
            return pixelDim > 0 ? pixelDim : 340;
        });
    },

    _scale: function() {
        var box = this._box();
        var range = this._range();
        return _.map(box, function(pixelDim, i)  {
            var unitDim = range[i][1] - range[i][0];
            return pixelDim / unitDim;
        });
    },

    _setupGraphie: function() {
        this._removeMovables();

        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var graphie = this._graphie = createGraphie(graphieDiv);

        // This has to be called before addMouseLayer. You can re-init
        // with graphInit later if you prefer
        graphie.init({
            range: this._range(),
            scale: this._scale()
        });
        graphie.addMouseLayer({
            onClick: this.props.onClick,
            onMouseDown: this.props.onMouseDown,
            onMouseUp: this.props.onMouseUp,
            onMouseMove: this.props.onMouseMove
        });
        graphie.snap = this.props.options.snapStep || [1, 1];
        this.props.setup(graphie, this.props.options);
    },

    _removeMovables: function() {
        // _.invoke works even when this._movables is undefined
        _.invoke(this._movables, "remove");
        this._movables = {};
    },

    _renderMovables: function(children, options) {
        // Each leaf of `children` is a movable descriptor created by a call to
        // some `GraphieMovable`, such as `MovablePoint`.
        //
        // This function takes these descriptors and renders them into
        // on-screen movables, or updates on-screen movables for
        // descriptors when possible.
        //
        // If there is no movable with that key already, this descriptor is
        // stored in this._movables and promoted to an on-screen movable by
        // calling `child.add(graphie)`.
        //
        // If a movable of the same type with the same key exists already,
        // we take `child.props` and give them to the already-existing
        // on-screen movable, and call `movable.modify()`

        var graphie = options.graphie;
        var oldMovables = options.oldMovables;
        var newMovables = options.newMovables; /* output parameter */

        var renderChildren = function(elem)  {
            _.each(elem.movableProps, function(prop)  {
                // Render the children, and save the results of that
                // render to the appropriate props
                elem.props[prop] = this._renderMovables(
                    elem.props[prop],
                    options
                );
            }.bind(this));
        }.bind(this);

        // Add/modify movables

        // We want to keep track of whether we have added a new svg element,
        // because if we have, then we need to call .toFront() on any svg
        // elements occurring afterwards. If this happens, we set
        // `areMovablesOutOfOrder` to true:
        var areMovablesOutOfOrder = false;
        return nestedMap(children, function(child)  {
            if (!child) {
                // Still increment the key to avoid cascading key changes
                // on hiding/unhiding children, i.e. by using
                // {someBoolean && <MovablePoint />}
                options.nextKey++;
                // preserve the null/undefined in the resulting array
                return child;
            }

            assert(child instanceof GraphieMovable,
                "All children of a Graphie component must be Graphie " +
                "movables");

            // Give each child a key
            var key = child.key() || ("_no_id_" + options.nextKey);
            options.nextKey++;

            // We render our children first. This allows us to replace any
            // `movableProps` on our child with the on-screen movables
            // corresponding with those descriptors.
            renderChildren(child);

            var prevMovable = oldMovables[key];
            if (!prevMovable) {
                // We're creating a new child
                child.add(graphie);
                areMovablesOutOfOrder = true;

                newMovables[key] = child;

            } else if (child.constructor === prevMovable.constructor) {
                // We're updating an old child
                prevMovable.props = child.props;
                var modifyResult = prevMovable.modify(graphie);
                if (modifyResult === "reordered") {
                    areMovablesOutOfOrder = true;
                }

                newMovables[key] = prevMovable;

            } else {
                // We're destroying an old child and replacing it
                // with a new child of a different type

                // This generally is a bad idea, so warn about it if this
                // is being caused by implicit keys
                if (!child.key()) {
                    if (typeof console !== "undefined" && console.warn) {
                        console.warn("Replacing a <Graphie> child with a " +
                                "child of a different type. Please add keys " +
                                "to your <Graphie> children");
                    }
                }

                prevMovable.remove();
                child.add(graphie);
                areMovablesOutOfOrder = true;

                newMovables[key] = child;
            }

            if (areMovablesOutOfOrder) {
                newMovables[key].toFront();
            }

            return newMovables[key];
        });
    },

    // Sort of like react diffing, but for movables
    _updateMovables: function() {
        var graphie = this._graphie;

        var oldMovables = this._movables;
        var newMovables = {};
        this._movables = newMovables;

        this._renderMovables(this.props.children, {
            nextKey: 1,
            graphie: graphie,
            oldMovables: oldMovables,
            newMovables: newMovables
        });

        // Remove any movables that no longer exist in the child array
        _.each(oldMovables, function(oldMovable, key)  {
            if (!newMovables[key]) {
                oldMovable.remove();
            }
        });
    }
});

// Attach Graphie.createClass and Graphie.createSimpleClass
_.extend(Graphie, GraphieClasses);
// Attach the Movable react components for easy reference
_.extend(Graphie, Movables);

module.exports = Graphie;

},{"../interactive2/interactive-util.js":149,"../util.js":168,"./graphie-classes.jsx":123,"./graphie-movables.jsx":124}],126:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Tooltip = require("react-components/tooltip");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;

var MathInput = require("./math-input.jsx");
var Renderer  = require("../renderer.jsx");
var TextInput = require("./text-input.jsx");

var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var MATH = "math";
var TEXT = "text";

var InputWithExamples = React.createClass({displayName: 'InputWithExamples',
    propTypes: {
        type: React.PropTypes.oneOf([MATH, TEXT]),
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        examples: React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        shouldShowExamples: React.PropTypes.bool,
        convertDotToTimes: React.PropTypes.bool,
        interceptFocus: React.PropTypes.func,
        buttonSet: React.PropTypes.string,
        buttonsVisible: React.PropTypes.oneOf(['always', 'never', 'focused']),
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            type: TEXT,
            shouldShowExamples: true,
            onFocus: function() { },
            onBlur: function() { }
        };
    },

    getInitialState: function() {
        return {
            focused: false,
            showExamples: false
        };
    },

    _getInputClassName: function() {
        // confining mutability!
        var className = ApiClassNames.INPUT;
        if (this.state.focused) {
            className += " " + ApiClassNames.FOCUSED;
        }
        if (this.props.className) {
            className += " " + this.props.className;
        }
        return className;
    },

    render: function() {
        var examplesContent = _.map(this.props.examples, function(example)  {
            return "- " + example;
        }).join("\n");

        var showExamples = this.props.shouldShowExamples &&
                this.state.showExamples;

        var inputProps = {
            className: this._getInputClassName(),
            value: this.props.value,
            buttonSet: this.props.buttonSet,
            buttonsVisible: this.props.buttonsVisible,
            onChange: this.props.onChange,
            onFocus: this._handleFocus,
            // HACK (jack): This fixes readonly inputs (from interceptFocus)
            // not getting focus events when clicked on mobile:
            onClick: this.props.interceptFocus != null ? this.focus : null,
            onBlur: this._handleBlur,
            onTouchStart: captureScratchpadTouchStart,
            ref: "input"
        };

        var input = this.props.type === MATH ?
            MathInput(_.extend({
                convertDotToTimes: this.props.convertDotToTimes,
            }, inputProps)) :
            TextInput(_.extend({
                autoCapitalize: "off",
                autoComplete: "off",
                autoCorrect: "off",
                spellCheck: "false",
                // HACK(jack): We make the input read-only if there is a
                // this.props.interceptFocus function, so that the focus can
                // be intercepted pre-focus for mobile, which doesn't want a
                // keyboard to pop up. Hacky, I know
                readOnly: this.props.interceptFocus != null,
            }, inputProps));

        return Tooltip(
                {ref:"tooltip",
                className:"perseus-formats-tooltip",
                horizontalPosition:"left",
                horizontalAlign:"left",
                verticalPosition:"bottom",
                arrowSize:10,
                borderColor:"#ccc",
                show:showExamples}, 
            input,
            Renderer( {content:examplesContent} )
        );
    },

    _handleFocus: function() {
        var showExamples = true;
        if (this.props.interceptFocus) {
            var interceptResult = this.props.interceptFocus();
            if (interceptResult === false) {
                showExamples = false;
            }
        }
        this.props.onFocus();
        this.setState({
            focused: true,
            showExamples: showExamples
        });
    },

    show: function() {
        this.setState({showExamples: true});
    },

    hide: function() {
        this.setState({showExamples: false});
    },

    _handleBlur: function() {
        this.props.onBlur();
        this.setState({
            focused: false,
            showExamples: false
        });
    },

    focus: function() {
        this.refs.input.focus();
    },

    handleChange: function(e) {
        this.props.onChange(e.target.value);
    },

    getInputDOMNode: function() {
        return this.refs.input.getDOMNode();
    }
});

module.exports = InputWithExamples;

},{"../perseus-api.jsx":162,"../renderer.jsx":165,"../util.js":168,"./math-input.jsx":127,"./text-input.jsx":134,"react":115,"react-components/tooltip":114}],127:[function(require,module,exports){
/** @jsx React.DOM */

// TODO(alex): Package MathQuill
var MathQuill = window.MathQuill;
var React     = require("react");
var _         = require("underscore");
var cx        = React.addons.classSet;
var PT = React.PropTypes;
var TexButtons = require("./tex-buttons.jsx");

// A WYSIWYG math input that calls `onChange(LaTeX-string)`
var MathInput = React.createClass({displayName: 'MathInput',
    propTypes: {
        value: PT.string,
        onChange: PT.func.isRequired,
        convertDotToTimes: PT.bool,
        buttonsVisible: PT.oneOf(['always', 'never', 'focused']),
        onFocus: PT.func,
        onBlur: PT.func
    },

    render: function() {
        var className = cx({
            "perseus-math-input": true,

            // mathquill usually adds these itself but react removes them when
            // updating the component.
            "mq-editable-field": true,
            "mq-math-mode": true
        });

        var buttons = null;
        if (this._shouldShowButtons()) {
            buttons = TexButtons(
                {className:"math-input-buttons absolute",
                convertDotToTimes:this.props.convertDotToTimes,
                onInsert:this.insert} );
        }

        return React.DOM.div( {style:{display: "inline-block"}}, 
            React.DOM.div( {style:{display: 'inline-block'}}, 
                React.DOM.span( {className:className,
                      ref:"mathinput",
                      onFocus:this.handleFocus,
                      onBlur:this.handleBlur} )
            ),
            React.DOM.div( {style:{position: "relative"}}, 
                buttons
            )
        );
    },

    // handlers:
    // keep track of two related bits of state:
    // * this.state.focused - whether the buttons are currently shown
    // * this.mouseDown - whether a mouse click is active that started in the
    //   buttons div

    handleFocus: function() {
        this.setState({ focused: true });
        // TODO(joel) fix properly - we should probably allow onFocus handlers
        // to this property, but we need to work correctly with them.
        // if (this.props.onFocus) {
        //     this.props.onFocus();
        // }
    },

    handleMouseDown: function(event) {
        var focused = this.getDOMNode().contains(event.target);
        this.mouseDown = focused;
        if (!focused) {
            this.setState({ focused: false });
        }
    },

    handleMouseUp: function() {
        // this mouse click started in the buttons div so we should focus the
        // input
        if (this.mouseDown) {
            this.focus();
        }
        this.mouseDown = false;
    },

    handleBlur: function() {
        if (!this.mouseDown) {
            this.setState({ focused: false });
        }
    },

    _shouldShowButtons: function() {
        if (this.props.buttonsVisible === 'always') {
            return true;
        } else if (this.props.buttonsVisible === 'never') {
            return false;
        } else {
            return this.state.focused;
        }
    },

    getDefaultProps: function() {
        return {
            value: "",
            convertDotToTimes: false,
            buttonsVisible: 'focused'
        };
    },

    getInitialState: function() {
        return { focused: false };
    },

    insert: function(value) {
        var input = this.mathField();
        if (_(value).isFunction()) {
            value(input);
        } else if (value[0] === '\\') {
            input.cmd(value).focus();
        } else {
            input.write(value).focus();
        }
        input.focus();
    },

    mathField: function(options) {
        // MathQuill.MathField takes a DOM node, MathQuill-ifies it if it's
        // seeing that node for the first time, then returns the associated
        // MathQuill object for that node. It is stable - will always return
        // the same object when called on the same DOM node.
        return MathQuill.MathField(this.refs.mathinput.getDOMNode(), options);
    },

    componentWillUnmount: function() {
        window.removeEventListener("mousedown", this.handleMouseDown);
        window.removeEventListener("mouseup", this.handleMouseUp);
    },

    componentDidMount: function() {
        window.addEventListener("mousedown", this.handleMouseDown);
        window.addEventListener("mouseup", this.handleMouseUp);

        // These options can currently only be set globally. (Hopefully this
        // will change at some point.) They appear safe to set multiple times.

        // LaTeX commands that, when typed, are immediately replaced by the
        // appropriate symbol. This does not include ln, log, or any of the
        // trig functions; those are always interpreted as commands.
        MathQuill.addAutoCommands("pi theta phi sqrt");

        // Pop the cursor out of super/subscripts on addition or (in)equalities
        // Avoid popping on '-' to allow negative exponents
        MathQuill.addCharsThatBreakOutOfSupSub("+=<>≠≤≥");

        // Prevent excessive super/subscripts or fractions from being created
        // without operands, e.g. when somebody holds down a key
        MathQuill.disableCharsWithoutOperand("^_/");

        var initialized = false;

        // Initialize MathQuill.MathField instance
        this.mathField({
            // The name of this option is somewhat misleading, as tabbing in
            // MathQuill breaks you out of a nested context (fraction/script)
            // if you're in one, but moves focus to the next input if you're
            // not. Spaces (with this option enabled) are just ignored in the
            // latter case.
            //
            // TODO(alex): In order to allow inputting mixed numbers, we will
            // have to accept spaces in certain cases. The desired behavior is
            // still to escape nested contexts if currently in one, but to
            // insert a space if not (we don't expect mixed numbers in nested
            // contexts). We should also limit to one consecutive space.
            spaceBehavesLikeTab: true,

            handlers: {
                edited: function(mathField)  {
                    // This handler is guaranteed to be called on change, but
                    // unlike React it sometimes generates false positives.
                    // One of these is on initialization (with an empty string
                    // value), so we have to guard against that below.
                    var value = mathField.latex();

                    // Provide a MathQuill-compatible way to generate the
                    // not-equals sign without pasting unicode or typing TeX
                    value = value.replace(/<>/g, "\\ne");

                    // Use the specified symbol to represent multiplication
                    // TODO(alex): Add an option to disallow variables, in
                    // which case 'x' should get converted to '\\times'
                    if (this.props.convertDotToTimes) {
                        value = value.replace(/\\cdot/g, "\\times");
                    } else {
                        value = value.replace(/\\times/g, "\\cdot");
                    }

                    if (initialized && this.props.value !== value) {
                        this.props.onChange(value);
                    }
                }.bind(this),
                enter: function()  {
                    // This handler is called when the user presses the enter
                    // key. Since this isn't an actual <input> element, we have
                    // to manually trigger the usually automatic form submit.
                    $(this.refs.mathinput.getDOMNode()).submit();
                }.bind(this),
                upOutOf: function(mathField)  {
                    // This handler is called when the user presses the up
                    // arrow key, but there is nowhere in the expression to go
                    // up to (no numerator or exponent). For ease of use,
                    // interpret this as an attempt to create an exponent.
                    mathField.typedText("^");
                }
            }
        });

        // Ideally, we would be able to pass an initial value directly into
        // the constructor above
        this.mathField().latex(this.props.value);

        initialized = true;
    },

    componentDidUpdate: function() {
        if (!_.isEqual(this.mathField().latex(), this.props.value)) {
            this.mathField().latex(this.props.value);
        }
    },

    focus: function() {
        this.mathField().focus();
        this.setState({ focused: true });
    }
});

module.exports = MathInput;

},{"./tex-buttons.jsx":133,"react":115,"underscore":116}],128:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');

/* MultiButtonGroup is an aesthetically pleasing group of buttons,
 * which allows multiple buttons to be selected at the same time.
 *
 * The class requires these properties:
 *   buttons - an array of objects with keys:
 *     "value": this is the value returned when the button is selected
 *     "text": this is the text shown on the button
 *     "title": this is the title-text shown on hover
 *   onChange - a function that is provided with an array of the updated
 *     values (which it then is responsible for updating)
 *
 * The class has these optional properties:
 *   values - an array of the initial values of the buttons selected.
 *
 * Requires stylesheets/perseus-admin-package/editor.less to look nice.
 */

var MultiButtonGroup = React.createClass({displayName: 'MultiButtonGroup',
    propTypes: {
        values: React.PropTypes.array,
        buttons: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
    },

    getDefaultProps: function() {
        return {
            values: []
        };
    },

    render: function() {
        var buttons = this.props.buttons;
        var values = this.props.values;

        return React.DOM.div( {className:"perseus-button-group"}, 
            _.map(buttons, function(button, i) {
                var isSelected = _.contains(values, button.value);
                return React.DOM.button( {title:button.title,
                    id:"" + i, key:  "" + i,
                    className:isSelected ? "selected" : "",
                    onClick:this.toggleSelect.bind(this, button.value)}, 
                        button.text
                );
            }, this)
        );
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    toggleSelect: function(newValue) {
        var values = this.props.values;

        if (_.contains(values, newValue)) {
            // If the value is already selected, unselect it
            this.props.onChange(_.without(values, newValue));
        } else {
            // Otherwise merge with other values and return
            this.props.onChange(_.union(values, [newValue]));
        }
    }
});

module.exports = MultiButtonGroup;

},{"react":115}],129:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var firstNumericalParse = require("../util.js").firstNumericalParse;
var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;
var knumber = KhanUtil.knumber;
var toNumericString = KhanUtil.toNumericString;
var getNumericFormat = KhanUtil.getNumericFormat;

/* An input box that accepts only numeric strings
 *
 * Calls onChange(value, format) for valid numbers.
 * Reverts to the current value onBlur or on [ENTER],
 *   but maintains the format (i.e. 3/2, 1 1/2, 150%)
 * Accepts empty input and sends it to onChange as null
 *   if no numeric placeholder is set.
 * If given a checkValidity function, will turn
 *   the background/outline red when invalid
 * If useArrowKeys is set to true, up/down arrows will
 *   increment/decrement integers
 * Optionally takes a size ("mini", "small", "normal")
 */
var NumberInput = React.createClass({displayName: 'NumberInput',
    propTypes: {
        value: React.PropTypes.number,
        format: React.PropTypes.string,
        placeholder: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        onChange: React.PropTypes.func.isRequired,
        onFormatChange: React.PropTypes.func,
        checkValidity: React.PropTypes.func,
        size: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            value: null,
            placeholder: null,
            format: null,
            onFormatChange: function()  {return null;},
            checkValidity: function()  {return true;},
            useArrowKeys: false
        };
    },

    getInitialState: function() {
        return {
            format: this.props.format
        };
    },

    render: function() {
        cx = React.addons.classSet;

        var classes = cx({
            "number-input": true,
            "number-input-label": this.props.label != null,
            "invalid-input": !this._checkValidity(this.props.value),
            "mini": this.props.size === "mini",
            "small": this.props.size === "small",
            "normal": this.props.size === "normal"
        });
        if (this.props.className != null) {
            classes = [classes, this.props.className].join(" ");
        }

        var input = React.DOM.input(_.extend({}, this.props, {
            className: classes,
            type: "text",
            ref: "input",
            onChange: this._handleChange,
            onBlur: this._handleBlur,
            onKeyPress: this._handleBlur,
            onKeyDown: this._onKeyDown,
            onTouchStart: captureScratchpadTouchStart,
            defaultValue: toNumericString(this.props.value, this.state.format),
            value: undefined
        }));

        if (this.props.label) {
            return React.DOM.label(null, this.props.label,input);
        } else {
            return input;
        }
    },

    componentDidUpdate: function(prevProps) {
        if (!knumber.equal(this.getValue(), this.props.value)) {
            this._setValue(this.props.value, this.state.format);
        }
    },

    /* Return the current "value" of this input
     * If empty, it returns the placeholder (if it is a number) or null
     */
    getValue: function() {
        return this.parseInputValue(this.refs.input.getDOMNode().value);
    },

    parseInputValue: function(value) {
        if (value === "") {
            placeholder = this.props.placeholder;
            return _.isFinite(placeholder) ? +placeholder : null;
        } else {
            var result = firstNumericalParse(value);
            return _.isFinite(result) ? result : this.props.value;
        }
    },

    /* Set text input focus to this input */
    focus: function() {
        this.refs.input.getDOMNode().focus();
    },

    _checkValidity: function(value) {
        if(value == null) {
            return true;
        }

        var val = firstNumericalParse(value);
        var checkValidity = this.props.checkValidity;

        return _.isFinite(val) && checkValidity(val);
    },

    _handleChange: function(e) {
        var text = e.target.value;
        var value = this.parseInputValue(text);
        var format = getNumericFormat(text);

        this.props.onChange(value);
        if (format) {
            this.props.onFormatChange(value, format);
            this.setState({format: format});
        }
    },

    _handleBlur: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        this._setValue(this.props.value, this.state.format);
    },

    _onKeyDown: function(e) {
        if (!this.props.useArrowKeys ||
            !_.contains(["ArrowUp", "ArrowDown"], e.key)) {
            return;
        }

        var val = this.getValue();
        if (val !== Math.floor(val)) {
            return; // bail if not an integer
        }

        if (e.key === "ArrowUp") {
            val = val + 1;
        } else if (e.key === "ArrowDown") {
            val = val - 1;
        }

        if (this._checkValidity(val)) {
            this.props.onChange(val);
        }
    },

    _setValue: function(val, format) {
        $(this.refs.input.getDOMNode()).val(toNumericString(val, format));
    }
});

module.exports = NumberInput;

},{"../util.js":168,"react":115}],130:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');

/* A checkbox that syncs its value to props using the
 * renderer's onChange method, and gets the prop name
 * dynamically from its props list
 */
var PropCheckBox = React.createClass({displayName: 'PropCheckBox',
    propTypes: {
        labelAlignment: React.PropTypes.oneOf(["left", "right"])
    },

    DEFAULT_PROPS: {
        label: null,
        onChange: null,
        labelAlignment: "left"
    },

    getDefaultProps: function() {
        return this.DEFAULT_PROPS;
    },

    propName: function() {
        var propName = _.find(_.keys(this.props), function(localPropName) {
            return !_.has(this.DEFAULT_PROPS, localPropName);
        }, this);

        if (!propName) {
            throw new Error("Attempted to create a PropCheckBox with no " +
                    "prop!");
        }

        return propName;
    },

    _labelAlignLeft: function() {
        return this.props.labelAlignment === "left";
    },

    render: function() {
        var propName = this.propName();
        return React.DOM.label(null, 
            this._labelAlignLeft() && this.props.label,
            React.DOM.input( {type:"checkbox",
                    checked:this.props[propName],
                    onChange:this.toggle} ),
            !this._labelAlignLeft() && this.props.label
        );
    },

    toggle: function() {
        var propName = this.propName();
        var changes = {};
        changes[propName] = !this.props[propName];
        this.props.onChange(changes);
    }
});

module.exports = PropCheckBox;

},{"react":115}],131:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var NumberInput = require("../components/number-input.jsx");

var truth = function()  {return true;};

/* A minor abstraction on top of NumberInput for ranges
 *
 */
var RangeInput = React.createClass({displayName: 'RangeInput',
    propTypes: {
        value: React.PropTypes.array.isRequired,
        onChange: React.PropTypes.func.isRequired,
        placeholder: React.PropTypes.array,
        checkValidity: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            placeholder: [null, null]
        };
    },

    render: function() {
        var value = this.props.value;
        var checkValidity = this.props.checkValidity || truth;

        return React.DOM.div( {className:"range-input"}, 
            "[",
            this.transferPropsTo(NumberInput(
                {value:value[0],
                checkValidity:function(val)  {return checkValidity([val, value[1]]);},
                onChange:this.onChange.bind(this, 0),
                placeholder:this.props.placeholder[0]} )),
            ",",
            this.transferPropsTo(NumberInput(
                {value:value[1],
                checkValidity:function(val)  {return checkValidity([value[0], val]);},
                onChange:this.onChange.bind(this, 1),
                placeholder:this.props.placeholder[1]} )),
            "]"
        );
    },

    onChange: function(i, newVal) {
        var value = this.props.value;
        if (i === 0) {
            this.props.onChange([newVal, value[1]]);
        } else {
            this.props.onChange([value[0], newVal]);
        }
    }

});

module.exports = RangeInput;

},{"../components/number-input.jsx":129,"react":115}],132:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');

var Util     = require("../util.js");
var Renderer = require("../renderer.jsx");

var PREFIX = "perseus-sortable";


// A placeholder that appears in the sortable whenever an item is dragged.
var Placeholder = React.createClass({displayName: 'Placeholder',
    propTypes: {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired
    },

    render: function() {
        var className = [PREFIX + "-card", PREFIX + "-placeholder"].join(" ");
        var style = {width: this.props.width, height: this.props.height};

        if (this.props.margin != null) {
            style.margin = this.props.margin;
        }

        return React.DOM.li( {className:className, style:style} );
    }
});


var STATIC = "static",
    DRAGGING = "dragging",
    ANIMATING = "animating",
    DISABLED = "disabled";

// A draggable item in the sortable. Can be in one of four states:
//     Static:    The item is not being interacted with.
//     Dragging:  The item is being dragged.
//     Animating: The item has been released, and is moving to its destination.
//     Disabled:  The item cannot be interacted with.
//
// Usual flow:      Static -> Dragging -> Animating -> Static
// [Dis|en]abling:  Static|Dragging|Animating -> Disabled -> Static
var Draggable = React.createClass({displayName: 'Draggable',
    propTypes: {
        type: React.PropTypes.oneOf([STATIC, DRAGGING, ANIMATING, DISABLED]),
        content: React.PropTypes.string.isRequired,
        endPosition: React.PropTypes.object.isRequired,
        onRender: React.PropTypes.func.isRequired,
        onMouseDown: React.PropTypes.func.isRequired,
        onMouseMove: React.PropTypes.func.isRequired,
        onMouseUp: React.PropTypes.func.isRequired,
        onAnimationEnd: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            type: STATIC
        };
    },

    getInitialState: function() {
        return {
            startPosition: {left: 0, top: 0},
            startMouse: {left: 0, top: 0},
            mouse: {left: 0, top: 0}
        };
    },

    componentDidMount: function() {
        this.isMouseMoveUpBound = false;
    },

    componentWillUnmount: function() {
        // Event handlers should be unbound before component unmounting, but
        // just in case...
        if (this.isMouseMoveUpBound) {
            this.unbindMouseMoveUp();
        }
    },

    getCurrentPosition: function() {
        return {
            left: this.state.startPosition.left +
                  this.state.mouse.left -
                  this.state.startMouse.left,
            top: this.state.startPosition.top +
                 this.state.mouse.top -
                 this.state.startMouse.top
        };
    },

    render: function() {
        var className = [
                PREFIX + "-card",
                PREFIX + "-draggable",
                PREFIX + "-" + this.props.type
            ].join(" ");

        var style = {
            position: "static"
        };

        if (this.props.type === DRAGGING || this.props.type === ANIMATING) {
            _.extend(style, {position: "absolute"}, this.getCurrentPosition());
        }

        if (this.props.width) {
            style.width = this.props.width + 1; // Fix for non-integer widths
        }
        if (this.props.height) {
            style.height = this.props.height;
        }
        if (this.props.margin != null) {
            style.margin = this.props.margin;
        }

        return React.DOM.li(
                    {className:className,
                    style:style,
                    onMouseDown:this.onMouseDown,
                    onTouchStart:this.onMouseDown,
                    onTouchMove:this.onMouseMove,
                    onTouchEnd:this.onMouseUp,
                    onTouchCancel:this.onMouseUp} , 
            Renderer(
                {content:this.props.content,
                onRender:this.props.onRender} )
        );
    },

    componentDidUpdate: function(prevProps) {
        if (this.props.type === prevProps.type) {
            return;
        }

        if (this.props.type === ANIMATING) {
            // Start animating
            var current = this.getCurrentPosition();
            var duration = 15 * Math.sqrt(
                Math.sqrt(
                    Math.pow(this.props.endPosition.left - current.left, 2) +
                    Math.pow(this.props.endPosition.top - current.top, 2)
                )
            );

            $(this.getDOMNode()).animate(this.props.endPosition, {
                duration: Math.max(duration, 1),
                // Animating -> Static
                complete: this.props.onAnimationEnd
            });
        } else if (this.props.type === STATIC) {
            // Ensure that any animations are done
            $(this.getDOMNode()).finish();
        }
    },

    bindMouseMoveUp: function() {
        this.isMouseMoveUpBound = true;
        $(document).on("mousemove", this.onMouseMove);
        $(document).on("mouseup", this.onMouseUp);
    },

    unbindMouseMoveUp: function() {
        this.isMouseMoveUpBound = false;
        $(document).off("mousemove", this.onMouseMove);
        $(document).off("mouseup", this.onMouseUp);
    },


    onMouseDown: function(event) {
        if (this.props.type !== STATIC) {
            return;
        }

        if (!(event.button === 0 ||
                (event.touches != null && event.touches.length === 1))) {
            return;
        }

        event.preventDefault();
        var loc = Util.extractPointerLocation(event);
        if (loc) {
            this.setState({
                startPosition: $(this.getDOMNode()).position(),
                startMouse: loc,
                mouse: loc
            }, function() {
                this.bindMouseMoveUp();

                // Static -> Dragging
                this.props.onMouseDown();
            });
        }
    },

    onMouseMove: function(event) {
        if (this.props.type !== DRAGGING) {
            return;
        }

        event.preventDefault();
        var loc = Util.extractPointerLocation(event);
        if (loc) {
            this.setState({
                mouse: loc,
            }, this.props.onMouseMove);
        }
    },

    onMouseUp: function(event) {
        if (this.props.type !== DRAGGING) {
            return;
        }

        event.preventDefault();
        var loc = Util.extractPointerLocation(event);
        if (loc) {
            this.unbindMouseMoveUp();

            // Dragging -> Animating
            this.props.onMouseUp();
        }
    }
});


var HORIZONTAL = "horizontal",
    VERTICAL = "vertical";

// The main sortable component.
var Sortable = React.createClass({displayName: 'Sortable',
    propTypes: {
        options: React.PropTypes.array.isRequired,
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        padding: React.PropTypes.bool,
        disabled: React.PropTypes.bool,
        constraints: React.PropTypes.object,
        onMeasure: React.PropTypes.func,
        margin: React.PropTypes.number,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            layout: HORIZONTAL,
            padding: true,
            disabled: false,
            constraints: {},
            onMeasure: function() {},
            margin: 5,
            onChange: function() {}
        };
    },

    getInitialState: function() {
        return {
            items: this.itemsFromProps(this.props)
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var prevProps = this.props;

        if (!_.isEqual(nextProps.options, prevProps.options)) {

            // Regenerate items
            this.setState({
                items: this.itemsFromProps(nextProps)
            });

        } else if (nextProps.layout !== prevProps.layout ||
                   nextProps.padding !== prevProps.padding ||
                   nextProps.disabled !== prevProps.disabled ||
                   !_.isEqual(nextProps.constraints, prevProps.constraints)) {

            // Clear item measurements
            this.setState({
                items: this.clearItemMeasurements(this.state.items)
            });
        }
    },

    componentDidUpdate: function(prevProps) {
        // Measure items if their dimensions have been reset
        if (this.state.items.length && !this.state.items[0].width) {
            this.measureItems();
        }
    },

    itemsFromProps: function(props) {
        var type = props.disabled ? DISABLED : STATIC;
        return _.map(props.options, function(option, i) {
            return {
                option: option,
                key: i,
                type: type,
                endPosition: {},
                width: 0,
                height: 0
            };
        });
    },

    clearItemMeasurements: function(items) {
        return _.map(items, function(item) {
            return _.extend(item, {
                width: 0,
                height: 0
            });
        });
    },

    measureItems: function() {
        // Measure all items and cache what their dimensions should be, taking
        // into account constraints and the current layout. This allows syncing
        // widths and heights for pretty rows/columns. Note that dimensions are
        // explictly set on Draggables - this prevents them from changing size
        // or shape while being dragged.

        var items = _.clone(this.state.items);
        var $items = _.map(items, function(item) {
            return $(this.refs[item.key].getDOMNode());
        }, this);

        var widths = _.invoke($items, "outerWidth");
        var heights = _.invoke($items, "outerHeight");

        var constraints = this.props.constraints;
        var layout = this.props.layout;

        var syncWidth;
        if (constraints.width) {
            // Items must be at least as wide as the specified constraint
            syncWidth = _.max(widths.concat(constraints.width));
        } else if (layout === VERTICAL) {
            // Sync widths to get a clean column
            syncWidth = _.max(widths);
        }

        var syncHeight;
        if (constraints.height) {
            // Items must be at least as high as the specified constraint
            syncHeight = _.max(heights.concat(constraints.height));
        } else if (layout === HORIZONTAL) {
            // Sync widths to get a clean row
            syncHeight = _.max(heights);
        }

        items = _.map(items, function(item, i) {
            item.width = syncWidth || widths[i];
            item.height = syncHeight || heights[i];
            return item;
        });

        this.setState({items: items}, function()  {
            this.props.onMeasure({widths: widths, heights: heights});
        }.bind(this));
    },

    remeasureItems: _.debounce(function() {
        this.setState({
            // Clear item measurements
            items: this.clearItemMeasurements(this.state.items)
        }, this.measureItems);
    }, 20),

    render: function() {
        var className = [PREFIX, "layout-" + this.props.layout].join(" ");
        var cards = [];

        className += this.props.padding ? "" : " unpadded";

        _.each(this.state.items, function(item, i, items) {
            var isLast = (i === items.length - 1);
            var isStatic = (item.type === STATIC || item.type === DISABLED);
            var margin;

            if (this.props.layout === HORIZONTAL) {
                margin = "0 " + this.props.margin + "px 0 0"; // right
            } else if (this.props.layout === VERTICAL) {
                margin = "0 0 " + this.props.margin + "px 0"; // bottom
            }

            cards.push(
                Draggable(
                    {content:item.option,
                    key:item.key,
                    type:item.type,
                    ref:item.key,
                    width:item.width,
                    height:item.height,
                    margin:isLast && isStatic ? 0 : margin,
                    endPosition:item.endPosition,
                    onRender:this.remeasureItems,
                    onMouseDown:this.onMouseDown.bind(this, item.key),
                    onMouseMove:this.onMouseMove.bind(this, item.key),
                    onMouseUp:this.onMouseUp.bind(this, item.key),
                    onTouchMove:this.onMouseMove.bind(this, item.key),
                    onTouchEnd:this.onMouseUp.bind(this, item.key),
                    onTouchCancel:this.onMouseUp.bind(this, item.key),
                    onAnimationEnd:this.onAnimationEnd.bind(this,
                        item.key)} )
            );

            if (item.type === DRAGGING || item.type === ANIMATING) {
                cards.push(
                    Placeholder(
                        {key:"placeholder_" + item.key,
                        ref:"placeholder_" + item.key,
                        width:item.width,
                        height:item.height,
                        margin:isLast ? 0 : margin} )
                );
            }
        }, this);

        return React.DOM.ul( {className:className}, 
            cards
        );
    },

    onMouseDown: function(key) {
        // Static -> Dragging
        var items = _.map(this.state.items, function(item) {
            if (item.key === key) {
                item.type = DRAGGING;
            }
            return item;
        });

        this.setState({items: items});
     },

    onMouseMove: function(key) {
        // Dragging: Rearrange items based on draggable's position
        var $draggable = $(this.refs[key].getDOMNode());
        var $sortable = $(this.getDOMNode());
        var items = _.clone(this.state.items);
        var item = _.findWhere(this.state.items, {key: key});
        var margin = this.props.margin;
        var currentIndex = _.indexOf(items, item);
        var newIndex = 0;

        items.splice(currentIndex, 1);

        if (this.props.layout === HORIZONTAL) {
            var midWidth = $draggable.offset().left - $sortable.offset().left;
            var sumWidth = 0;
            var cardWidth;

            _.each(items, function(item) {
                cardWidth = item.width;
                if (midWidth > sumWidth + cardWidth / 2) {
                    newIndex += 1;
                }
                sumWidth += cardWidth + margin;
            });

        } else {
            var midHeight = $draggable.offset().top - $sortable.offset().top;
            var sumHeight = 0;
            var cardHeight;

            _.each(items, function(item) {
                cardHeight = item.height;
                if (midHeight > sumHeight + cardHeight / 2) {
                    newIndex += 1;
                }
                sumHeight += cardHeight + margin;
            });
        }

        if (newIndex !== currentIndex) {
            items.splice(newIndex, 0, item);
            this.setState({items: items});
        }
    },

    onMouseUp: function(key) {
        // Dragging -> Animating
        var items = _.map(this.state.items, function(item) {
            if (item.key === key) {
                item.type = ANIMATING;
                item.endPosition = $(this.refs["placeholder_" + key]
                                    .getDOMNode()).position();
            }
            return item;
        }, this);

        this.setState({items: items});
        // HACK: We need to know *that* the widget changed, but currently it's
        // not set up in a nice way to tell us *how* it changed, since the
        // permutation of the items is stored in state.
        this.props.onChange({});
    },

    onAnimationEnd: function(key) {
        // Animating -> Static
        var items = _.map(this.state.items, function(item) {
            if (item.key === key) {
                item.type = STATIC;
            }
            return item;
        });

        this.setState({items: items});
    },

    getOptions: function() {
        return _.pluck(this.state.items, "option");
    }
});

module.exports = Sortable;

},{"../renderer.jsx":165,"../util.js":168,"react":115}],133:[function(require,module,exports){
/** @jsx React.DOM */

var React     = require("react");
var TeX       = require("react-components/tex");
var clone     = React.addons.cloneWithProps;

var prettyBig = { fontSize: "150%" };
var slightlyBig = { fontSize: "120%" };
var trigStyle = { marginLeft: -4 };
var symbStyle = { fontSize: "130%" };

// These are functions because we want to generate a new component for each use
// on the page rather than reusing an instance (which will cause an error).
// Also, it's useful for things which might look different depending on the
// props.
var buttons = [

    // basics
    [
        function()  {return [React.DOM.span( {style:slightlyBig}, "+"), "+"];},
        function()  {return [React.DOM.span( {style:prettyBig}, "-"), "-"];},

        // TODO(joel) - display as \cdot when appropriate
        function(props)  {
            if (props.convertDotToTimes) {
                return [TeX( {style:prettyBig}, "\\times"), "\\times"];
            } else {
                return [TeX( {style:prettyBig}, "\\cdot"), "\\cdot"];
            }
        },
        function()  {return [
            TeX( {style:prettyBig}, "\\frac{□}{□}"),

            // If there's something in the input that can become part of a
            // fraction, typing "/" puts it in the numerator. If not, typing
            // "/" does nothing. In that case, enter a \frac.
            function(input)  {
                var contents = input.latex();
                input.typedText("/");
                if (input.latex() === contents) {
                    input.cmd("\\frac");
                }
            }
        ];}
    ],

    // relations
    [
        // [<TeX>{"="}</TeX>, "\\eq"],
        function()  {return [TeX(null, "\\neq"), "\\neq"];},
        function()  {return [TeX(null, "\\leq"), "\\leq"];},
        function()  {return [TeX(null, "\\geq"), "\\geq"];},
        function()  {return [TeX(null, "\\lt"), "\\lt"];},
        function()  {return [TeX(null, "\\gt"), "\\gt"];},
    ],

    // trig
    [
        function()  {return [TeX(null, "\\sin"), "\\sin"];},
        function()  {return [TeX(null, "\\cos"), "\\cos"];},
        function()  {return [TeX(null, "\\tan"), "\\tan"];},
        function()  {return [TeX( {style:symbStyle}, "\\theta"), "\\theta"];},
        function()  {return [TeX( {style:symbStyle}, "\\phi"), "\\phi"];}
    ],

    // prealgebra
    [
        function()  {return [TeX(null, "\\sqrt{x}"), "\\sqrt"];},
        // TODO(joel) - how does desmos do this?
        // ["\\sqrt[3]{x}", "\\sqrt[3]{x}"],
        function()  {return [
            TeX( {style:slightlyBig}, "□^a"),
            function(input)  {
                var contents = input.latex();
                input.keystroke("Up");
                if (input.latex() === contents) {
                    input.typedText("a^b");
                }
            }
        ];},
        function()  {return [TeX( {style:slightlyBig}, "\\pi"), "\\pi"];}
    ]

];

var TexButtons = React.createClass({displayName: 'TexButtons',
    propTypes: {
        onInsert: React.PropTypes.func.isRequired
    },
    render: function() {
        var buttonRows = _(buttons).map(function(row)  {return row.map(function(symbGen)  {
            // create a (component, thing we should send to mathquill) pair
            var symbol = symbGen(this.props);
            return React.DOM.button( {onClick:function()  {return this.props.onInsert(symbol[1]);}.bind(this),
                           className:"tex-button",
                           tabIndex:-1,
                           type:"button"}, 
                symbol[0]
            );
        }.bind(this));}.bind(this));

        var buttonPopup = _(buttonRows).map(function(row, i)  {
            return React.DOM.div( {className:"clearfix tex-button-row"}, row);
        });

        return React.DOM.div( {className:this.props.className}, 
            buttonPopup
        );
    }
});

module.exports = TexButtons;

},{"react":115,"react-components/tex":113}],134:[function(require,module,exports){
/** @jsx React.DOM */

var TextInput = React.createClass({displayName: 'TextInput',
    propTypes: {
        value: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired,
        className: React.PropTypes.string,
        onFocus: React.PropTypes.func,
        onBlur: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            value: ""
        };
    },

    render: function() {
        return React.DOM.input(_.extend({}, this.props, {
            type: "text",
            onChange: function(e)  {return this.props.onChange(e.target.value);}.bind(this)
        }));
    },

    focus: function() {
        this.getDOMNode().focus();
    }
});

module.exports = TextInput;

},{}],135:[function(require,module,exports){
/** @jsx React.DOM */

var textWidthCache = {};
function getTextWidth(text) {
    if (!textWidthCache[text]) {
        // Hacky way to guess the width of an input box
        var $test = $("<span>").text(text).appendTo("body");
        textWidthCache[text] = $test.width() + 5;
        $test.remove();
    }
    return textWidthCache[text];
}


var TextListEditor = React.createClass({displayName: 'TextListEditor',
    propTypes: {
        options: React.PropTypes.array,
        layout: React.PropTypes.string,
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            options: [],
            layout: "horizontal"
        };
    },

    getInitialState: function() {
        return {
            items: this.props.options.concat("")
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            items: nextProps.options.concat("")
        });
    },

    render: function() {
        var className = [
            "perseus-text-list-editor",
            "ui-helper-clearfix",
            "layout-" + this.props.layout
        ].join(" ");

        var inputs = _.map(this.state.items, function(item, i) {
            return React.DOM.li( {key:i}, 
                React.DOM.input(
                    {ref:"input_" + i,
                    type:"text",
                    value:item,
                    onChange:this.onChange.bind(this, i),
                    onKeyDown:this.onKeyDown.bind(this, i),
                    style:{width: getTextWidth(item)}} )
            );
        }, this);

        return React.DOM.ul( {className:className}, inputs);
    },

    onChange: function(index, event) {
        var items = _.clone(this.state.items);
        items[index] = event.target.value;

        if (index === items.length - 1) {
            items = items.concat("");
        }

        this.setState({items: items});
        this.props.onChange(_.compact(items));
    },

    onKeyDown: function(index, event) {
        var which = event.nativeEvent.keyCode;

        // Backspace deletes an empty input...
        if (which === 8 /* backspace */ && this.state.items[index] === "") {
            event.preventDefault();

            var items = _.clone(this.state.items);
            var focusIndex = (index === 0) ? 0 : index - 1;

            if (index === items.length - 1 &&
                    (index === 0 || items[focusIndex] !== "")) {
                // ...except for the last one, iff it is the only empty
                // input at the end.
                this.refs["input_" + focusIndex].getDOMNode().focus();
            } else {
                items.splice(index, 1);
                this.setState({items: items}, function() {
                    this.refs["input_" + focusIndex].getDOMNode().focus();
                });                
            }

        // Deleting the last character in the second-to-last input removes it
        } else if (which === 8 /* backspace */ &&
                this.state.items[index].length === 1 &&
                index === this.state.items.length - 2) {
            event.preventDefault();

            var items = _.clone(this.state.items);
            items.splice(index, 1);
            this.setState({items: items});
            this.props.onChange(_.compact(items));

        // Enter adds an option below the current one...
        } else if (which === 13 /* enter */) {
            event.preventDefault();

            var items = _.clone(this.state.items);
            var focusIndex = index + 1;

            if (index === items.length - 2) {
                // ...unless the empty input is just below.
                this.refs["input_" + focusIndex].getDOMNode().focus();
            } else {
                items.splice(focusIndex, 0, "");
                this.setState({items: items}, function() {
                    this.refs["input_" + focusIndex].getDOMNode().focus();
                });
            }
        }
    }
});

module.exports = TextListEditor;

},{}],136:[function(require,module,exports){
/** @jsx React.DOM */

// Responsible for combining the text diffs from text-diff and the widget
// diffs from widget-differ.

var TextDiff = require("./text-diff.jsx");
var WidgetDiff = require("./widget-diff.jsx");

// Deeply look up a property in an object,
// -> getPath(obj, ["a", "b", "c"]) === obj["a"]["b"]["c"]
var getPath = function(obj, path, defaultValue) {
    var returningDefault = false;
    var result = _(path).reduce(function(obj, key) {
        if (returningDefault || !obj.hasOwnProperty(key)) {
            returningDefault = true;
            return defaultValue;
        }
        return obj[key];
    }, obj);
    return result;
};

var widgetsIn = function(item) {
    var question = item.question || {};
    var widgets = question.widgets || {};
    return _.keys(widgets);
};

var isWidget = function(obj)  {return _.isObject(obj) && !("content" in obj);};

var RevisionDiff = React.createClass({displayName: 'RevisionDiff',
    propTypes: {
        beforeItem: React.PropTypes.object.isRequired,
        afterItem: React.PropTypes.object.isRequired
    },

    render: function() {
        var before = this.props.beforeItem;
        var after = this.props.afterItem;
        // Not going to handle inserting hints in the middle so well, but
        // that's pretty complicated to handle nicely.
        // This will do for now.
        var hintCount = 0;
        if (_(before).has("hints") && _(after).has("hints")) {
            hintCount = Math.max(before.hints.length, after.hints.length);
        }

        var widgets = _.union(widgetsIn(before), widgetsIn(after));
        var sections = [
            {
                title: "Question Area",
                path: ["question"]
            },
            {
                title: "Answer Area",
                path: ["answerArea", "options"]
            }
        ].concat(
            _.times(hintCount, function(n) {
                return {
                    title: "Hint #" + (n + 1),
                    path: ["hints", n]
                };
            })
        ).concat(
            _.map(widgets, function(widget) {
                return {
                    title: widget,
                    path: ["question", "widgets", widget, "options"]
                };
            })
        );

        var result = [];

        _(sections).each(function(section) {
            var path = section.path;
            var beforeValue = getPath(before, path, "");
            var afterValue = getPath(after, path, "");
            var displayedDiff;
            if (isWidget(beforeValue) || isWidget(afterValue)) {
                if (!isWidget(beforeValue)) {
                    beforeValue = {};
                }
                if (!isWidget(afterValue)) {
                    afterValue = {};
                }
                displayedDiff = WidgetDiff(
                    {key:section.title,
                    title:section.title,
                    before:beforeValue,
                    after:afterValue} );
            } else {
                displayedDiff = TextDiff(
                    {key:section.title,
                    title:section.title,
                    before:beforeValue.content,
                    after:afterValue.content} );
            }
            result.push(React.DOM.div(null, 
                React.DOM.div( {className:"diff-header"}, section.title),
                React.DOM.div( {className:"diff-header"}, section.title),
                React.DOM.div( {className:"diff-body ui-helper-clearfix"}, 
                    displayedDiff
                )
            ));
        });

        return React.DOM.div(null, result);
    }
});

module.exports = RevisionDiff;

},{"./text-diff.jsx":139,"./widget-diff.jsx":141}],137:[function(require,module,exports){
/** @jsx React.DOM */// Split a word-wise diff generated by jsdiff into multiple lines, for the
// purpose of breaking up the diffs into lines, so that modified lines can be
// faintly highlighted

var splitDiff = function(diffEntries) {
    var lines = [];
    var currentLine = [];
    _.each(diffEntries, function(entry)  {
        var values = entry.value.split("\n");
        _.each(values, function(value, i)  {
            var isNewline = i > 0;
            if (isNewline) {
                lines.push(currentLine);
                currentLine = [];
            }
            var newEntry = _.extend({}, entry, { value: value });
            currentLine.push(newEntry);
        });
    });

    if (currentLine.length) {
        lines.push(currentLine);
    }
    return lines;
};


module.exports = splitDiff;

},{}],138:[function(require,module,exports){
/** @jsx React.DOM */var jsdiff = require("../../lib/jsdiff");

var statusFor = function(chunk) {
    if (chunk.added) {
        return "added";
    } else if (chunk.removed) {
        return "removed";
    } else {
        return "unchanged";
    }
};

// Turn a chunk (which contains an array of values and a status)
// into an array of values, each with the same status
var splitUpChunk = function(chunk)  {return _.map(chunk.value, function(value)  {
    return {
        value: value,
        status: statusFor(chunk)
    };
});};

// Apply `fn` to every element in `lst` and then concatenate all the results
// http://clojuredocs.org/clojure_core/clojure.core/mapcat
var mapcat = function(lst, fn) {
    return _.flatten(_.map(lst, fn), true /* only flatten one level */);
};

// > ArrayDiff.diff([1,2,3], [2,3,4]);
// = [{ "value": [1],
//      "removed": true },
//    { "value": [2, 3] },
//    { "value": [4],
//      "added": true }]
var ArrayDiff = new jsdiff.Diff();
ArrayDiff.tokenize = function(array)  {return _.map(array, function(elem)  {return [elem];});};
// The default is `+` for string concatenation, which doesn't work for array
// concatenation.
ArrayDiff.join = function(a, b)  {return a.concat(b);};
// By default jsDiff uses ===
ArrayDiff.equals = _.isEqual;

// Take the output of jsdiff's function (which concatenates adjacent entries)
// and make it just one entry per chunk
// > flattenChunks([{ "value": [1],
//                    "removed": true },
//                  { "value": [2, 3] },
//                  { "value": [4],
//                    "added": true }])
// = [{ "value":1, "status":"removed"},
//    { "value":2, "status":"unchanged"},
//    { "value":3, "status":"unchanged"},
//    { "value":4, "status":"added"}]
var flattenChunks = function(chunks)  {return mapcat(chunks, splitUpChunk);};

// Take two arrays and create a diff for them. The result is two arrays of
// objects, one for the things that should be included in a 'before', and one
// for 'after'
var stringArrayDiff = function(a, b) {
    var diffResult = ArrayDiff.diff(a, b);
    var flattened = flattenChunks(diffResult);

    return {
        before: _.filter(flattened, function(entry)  {return entry.status !== "added";}),
        after: _.filter(flattened, function(entry)  {return entry.status !== "removed";})
    };
};

module.exports = stringArrayDiff;

},{"../../lib/jsdiff":1}],139:[function(require,module,exports){
/** @jsx React.DOM */

var diff = require("../../lib/jsdiff");
var splitDiff = require("./split-diff.jsx");
var stringArrayDiff = require("./string-array-diff.jsx");

var cx = React.addons.classSet;

var BEFORE = "before";
var AFTER = "after";

var IMAGE_REGEX = /http.*?\.png/g;

var imagesInString = function(str) {
    return str.match(IMAGE_REGEX) || [];
};

var COLORS = {
  "before": "#FFAAAA",
  "after": "#AAFFAA"
};

var classFor = function(entry, ifAdded, ifRemoved) {
    if (entry.added) {
        return ifAdded;
    } else if (entry.removed) {
        return ifRemoved;
    } else {
        return "";
    }
};

var ImageDiffSide = React.createClass({displayName: 'ImageDiffSide',
    propTypes: {
        side: React.PropTypes.oneOf([BEFORE, AFTER]).isRequired,
        images: React.PropTypes.array.isRequired
    },

    render: function() {
        return React.DOM.div(null, 
            this.props.images.length > 0 &&
                React.DOM.div( {className:"diff-header"}, "Images"),
            _.map(this.props.images, function(entry)  {
                var className = cx({
                    "image": true,
                    "image-unchanged": entry.status === "unchanged",
                    "image-added": entry.status === "added",
                    "image-removed": entry.status === "removed"
                });
                return React.DOM.div(null, 
                    React.DOM.img( {src:entry.value,
                        title:entry.value,
                        className:className} )
                );
            })
        );
    }
});

var TextDiff = React.createClass({displayName: 'TextDiff',
    propTypes: {
        before: React.PropTypes.string,
        after: React.PropTypes.string,
        title: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            before: "",
            after: "",
            title: ""
        };
    },

    getInitialState: function() {
        return {
            collapsed: this.props.before === this.props.after
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            collapsed: nextProps.before === nextProps.after
        });
    },

    render: function() {
        var diffed = diff.diffWords(this.props.before, this.props.after);

        var lines = splitDiff(diffed);

        beforeImages = imagesInString(this.props.before);
        afterImages = imagesInString(this.props.after);

        var images = stringArrayDiff(beforeImages, afterImages);

        var renderedLines = _.map(lines, function(line)  {
            var contents = {};

            contents.before = _(line).map(function(entry, i) {
                var className = classFor(entry, "not-present", "removed dark");
                return React.DOM.span(
                    {key:i,
                    className:className}, entry.value);
            });

            contents.after = _(line).map(function(entry, i) {
                var className = classFor(entry, "added dark", "not-present");
                return React.DOM.span(
                    {key:i,
                    className:className}, entry.value);
            });
            return contents;
        });

        var className = cx({
            "diff-row": true,
            "collapsed": this.state.collapsed
        });

        return React.DOM.div(null, 
            React.DOM.div( {className:"ui-helper-clearfix"}, 
                _.map([BEFORE, AFTER], function(side)  {
                    return React.DOM.div( {className:"diff-row " + side} , 
                        !this.state.collapsed &&
                            _.map(renderedLines, function(line)  {
                                var changed = line[side].length > 1;
                                var lineClass = cx({
                                    "diff-line": true,
                                    "added": side === AFTER && changed,
                                    "removed": side === BEFORE && changed
                                });
                                return React.DOM.div( {className:lineClass} , 
                                    line[side]
                                );
                            }),
                         !this.state.collapsed &&
                             ImageDiffSide(
                                 {side:side,
                                 images:images[side]} )
                    );
                }.bind(this))
            ),
            _.map([BEFORE, AFTER], function(side)  {
                return React.DOM.div( {className:className + " " + side,
                    onClick:this.handleExpand} , 
                    this.state.collapsed &&
                    React.DOM.span(null, 
                        React.DOM.span( {className:"expand-button"} , 
                            " ","[ show unmodified ]"
                        )
                    )
                );
            }.bind(this))
        );
    },

    handleExpand: function() {
        this.setState({ collapsed: false });
    }
});

module.exports = TextDiff;

},{"../../lib/jsdiff":1,"./split-diff.jsx":137,"./string-array-diff.jsx":138}],140:[function(require,module,exports){
/** @jsx React.DOM */var UNCHANGED = "unchanged";
var CHANGED = "changed";
var ADDED = "added";
var REMOVED = "removed";

// For values which do not have further values nested within them (strings,
// numbers, and booleans)
var valueEntry = function(before, after, key) {
    var status;
    if (before === after) {
        status = UNCHANGED;
    } else if (before === undefined) {
        status = ADDED;
    } else if (after === undefined) {
        status = REMOVED;
    } else {
        status = CHANGED;
    }

    return {
        after: JSON.stringify(after),
        before: JSON.stringify(before),
        children: [],
        key: key,
        status: status
    };
};

// For values which require a more granular diff (objects and arrays)
var objectEntry = function(before, after, key) {
    var beforeKeys = (_.isObject(before)) ? _(before).keys() : [];
    var afterKeys = (_.isObject(after)) ? _(after).keys() : [];
    var keys = _.union(beforeKeys, afterKeys);

    var children = _.map(keys, function(key) {
        return performDiff((before || {})[key], (after || {})[key], key);
    });

    var status;
    if (before === undefined) {
        status = ADDED;
    } else if (after === undefined) {
        status = REMOVED;
    } else {
        var changed = _.any(children, function(child) {
            return child.status !== UNCHANGED;
        });
        status = changed ? CHANGED : UNCHANGED;
    }

    return {
        after: "",
        before: "",
        children: children,
        key: key,
        status: status
    };
};

var performDiff = function(before, after, /* optional */ key) {
    if (typeof before === "object" || typeof after === "object") {
        return objectEntry(before, after, key);
    } else {
        return valueEntry(before, after, key);
    }
};

module.exports = performDiff;

},{}],141:[function(require,module,exports){
/** @jsx React.DOM */

var cx = React.addons.classSet;
var performDiff = require("./widget-diff-performer.jsx");

var indentationFromDepth = function(depth) {
    return (depth - 1) * 20;
};

var BEFORE = "before";
var AFTER = "after";

var UNCHANGED = "unchanged";

var DiffSide = React.createClass({displayName: 'DiffSide',
    propTypes: {
        side: React.PropTypes.oneOf([BEFORE, AFTER]).isRequired,
        className: React.PropTypes.string.isRequired,
        showKey: React.PropTypes.bool.isRequired,
        propKey: React.PropTypes.string.isRequired,
        value: React.PropTypes.string,
        depth: React.PropTypes.number.isRequired
    },

    render: function() {
        var className = this.props.className + " " + cx({
            "diff-row": true,
            before: this.props.side === BEFORE,
            after: this.props.side === AFTER
        });
        return React.DOM.div( {className:className} , 
            React.DOM.div( {style:{
                paddingLeft: indentationFromDepth(this.props.depth)
            }} , 
                this.props.showKey && this.props.propKey + ": ",
                React.DOM.span( {className:"inner-value dark " + this.props.className} , 
                    this.props.value
                )
            )
        );
    }
});

var CollapsedRow = React.createClass({displayName: 'CollapsedRow',
    propTypes: {
        depth: React.PropTypes.number,
        onClick: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            depth: 0
        };
    },

    render: function() {
        var self = this;
        return React.DOM.div( {onClick:self.props.onClick}, 
            _.map([BEFORE, AFTER], function(side) {
                return React.DOM.div( {className:"diff-row collapsed " + side,
                    key:side} , 
                        React.DOM.div( {style:{
                            paddingLeft: indentationFromDepth(self.props.depth)
                        }}, 
                        React.DOM.span(null,  " [ show unmodified ] " )
                    )
                );
            })
        );
    }
});

// Component representing a single property that may be nested.
var DiffEntry = React.createClass({displayName: 'DiffEntry',
    propTypes: {
        entry: React.PropTypes.shape({
            key: React.PropTypes.string,
            children: React.PropTypes.array,
            before: React.PropTypes.string,
            after: React.PropTypes.string
        }),
        depth: React.PropTypes.number,
        expanded: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            depth: 0
        };
    },

    getInitialState: function() {
        return {
            expanded: this.props.expanded
        };
    },

    render: function() {
        var entry = this.props.entry;
        var propertyDeleted = entry.status === "removed";
        var propertyAdded   = entry.status === "added";
        var propertyChanged = entry.status === "changed";

        var hasChildren = entry.children.length > 0;

        var leftClass = cx({
            "removed": (propertyDeleted || propertyChanged) && !hasChildren,
            "dark": propertyDeleted,
            "blank-space": propertyAdded
        });

        var rightClass = cx({
            "added": (propertyAdded || propertyChanged) && !hasChildren,
            "dark": propertyAdded,
            "blank-space": propertyDeleted
        });

        var shownChildren;
        if (this.state.expanded) {
            shownChildren = entry.children;
        } else {
            shownChildren = _(entry.children).select(function(child) {
                return child.status !== UNCHANGED;
            });
        }

        var collapsed = shownChildren.length < entry.children.length;

        // don't hide just one entry
        if (entry.children.length === shownChildren.length + 1) {
            shownChildren = entry.children;
            collapsed = false;
        }

        var self = this;
        return React.DOM.div(null, 
            entry.key && React.DOM.div(null, 
            DiffSide(
                {side:BEFORE,
                className:leftClass,
                depth:this.props.depth,
                propKey:entry.key,
                showKey:!propertyAdded,
                value:entry.before} ),
            DiffSide(
                {side:AFTER,
                className:rightClass,
                depth:this.props.depth,
                propKey:entry.key,
                showKey:!propertyDeleted,
                value:entry.after} )
            ),
            _.map(shownChildren, function(child) {
                return DiffEntry(
                    {key:child.key,
                    depth:self.props.depth + 1,
                    entry:child,
                    expanded:self.state.expanded} );
            }),
            collapsed &&
                CollapsedRow(
                    {depth:this.props.depth + 1,
                    onClick:this.expand} )
        );
    },

    expand: function() {
        this.setState({ expanded: true });
    }
});

var WidgetDiff = React.createClass({displayName: 'WidgetDiff',
    propTypes: {
        before: React.PropTypes.shape({
            options: React.PropTypes.object
        }).isRequired,
        after: React.PropTypes.shape({
            options: React.PropTypes.object
        }).isRequired,
        title: React.PropTypes.string.isRequired
    },

    render: function() {
        var diff = performDiff(this.props.before,
                               this.props.after);
        return React.DOM.div(null, 
            React.DOM.div( {className:"ui-helper-clearfix"}, 
                DiffEntry( {entry:diff} )
            )
        );
    }
});

module.exports = WidgetDiff;

},{"./widget-diff-performer.jsx":140}],142:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var CombinedHintsEditor = require("./hint-editor.jsx");
var EnabledFeatures = require("./enabled-features.jsx");
var ItemEditor = require("./item-editor.jsx");
var ItemRenderer = require("./item-renderer.jsx");
var PropCheckBox = require("./components/prop-check-box.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;

var JsonEditor = React.createClass({displayName: 'JsonEditor',

    getInitialState: function() {
        return {
            currentValue: JSON.stringify(this.props.value, null, 4),
            valid: true
        };
    },

    componentWillReceiveProps: function(nextProps) {
        var shouldReplaceContent = !this.state.valid ||
            !_.isEqual(
                nextProps.value,
                JSON.parse(this.state.currentValue)
            );

        if (shouldReplaceContent) {
            this.setState(this.getInitialState());
        }
    },

    render: function() {
        var classes = "perseus-json-editor " +
            (this.state.valid ? "valid" : "invalid");

        return React.DOM.textarea(
            {className:classes,
            value:this.state.currentValue,
            onChange:this.handleChange,
            onKeyDown:this.handleKeyDown,
            onBlur:this.handleBlur} );
    },

    handleKeyDown: function(e) {
        // This handler allows the tab character to be entered by pressing
        // tab, instead of jumping to the next (non-existant) field
        if (e.key === "Tab") {
            var cursorPos = e.target.selectionStart;
            var v = e.target.value;
            var textBefore = v.substring(0, cursorPos);
            var textAfter = v.substring(cursorPos, v.length);
            e.target.value = textBefore+ "    " +textAfter;
            e.target.selectionStart = textBefore.length + 4;
            e.target.selectionEnd = textBefore.length + 4;

            e.preventDefault();
            this.handleChange(e);
        }
    },

    handleChange: function(e) {
        var nextString = e.target.value;
        try {
            var json = JSON.parse(nextString);
            // Some extra handling to allow copy-pasting from /api/vi
            if (_.isString(json)) {
                json = JSON.parse(json);
            }
            // This callback unfortunately causes multiple renders,
            // but seems to be necessary to avoid componentWillReceiveProps
            // being called before setState has gone through
            this.setState({
                currentValue: nextString,
                valid: true
            }, function() {
                this.props.onChange(json);
            });
        } catch (ex) {
            this.setState({
                currentValue: nextString,
                valid: false
            });
        }
    },

    handleBlur: function(e) {
        var nextString = e.target.value;
        try {
            var json = JSON.parse(nextString);
            // Some extra handling to allow copy-pasting from /api/vi
            if (_.isString(json)) {
                json = JSON.parse(json);
            }
            // This callback unfortunately causes multiple renders,
            // but seems to be necessary to avoid componentWillReceiveProps
            // being called before setState has gone through
            this.setState({
                currentValue: JSON.stringify(json, null, 4),
                valid: true
            }, function() {
                this.props.onChange(json);
            });
        } catch (ex) {
            this.setState({
                currentValue: JSON.stringify(this.props.value, null, 4),
                valid: true
            });
        }
    }
});

var EditorPage = React.createClass({displayName: 'EditorPage',
    propTypes: {
        // A function which takes a file object (guaranteed to be an image) and
        // a callback, then calls the callback with the url where the image
        // will be hosted. Image drag and drop is disabled when imageUploader
        // is null.
        imageUploader: React.PropTypes.func,
        enabledFeatures: EnabledFeatures.propTypes
    },

    getDefaultProps: function() {
        return {
            developerMode: false,
            jsonMode: false,
            enabledFeatures: {
                toolTipFormats: true,
                useMathQuill: true
            },
            apiOptions: {} // deep defaults on updateRenderer
        };
    },

    getInitialState: function() {
        return {
            json: {
                question: this.props.question,
                answer: this.props.answerArea,
                hints: this.props.hints
            },
            gradeMessage: "",
            wasAnswered: false
        };
    },

    render: function() {

        return React.DOM.div( {id:"perseus", className:"framework-perseus"}, 
            this.props.developerMode &&
                React.DOM.div(null, 
                    React.DOM.label(null, 
                        ' ',"Developer JSON Mode:",' ',
                        React.DOM.input( {type:"checkbox",
                            checked:this.props.jsonMode,
                            onChange:this.toggleJsonMode} )
                    )
                ),
            

            this.props.developerMode && this.props.jsonMode &&
                React.DOM.div(null, 
                    JsonEditor(
                        {multiLine:true,
                        value:this.state.json,
                        onChange:this.changeJSON} )
                ),
            

            (!this.props.developerMode || !this.props.jsonMode) &&
                ItemEditor(
                    {ref:"itemEditor",
                    rendererOnly:this.props.jsonMode,
                    question:this.props.question,
                    answerArea:this.props.answerArea,
                    imageUploader:this.props.imageUploader,
                    onChange:this.handleChange,
                    wasAnswered:this.state.wasAnswered,
                    gradeMessage:this.state.gradeMessage,
                    onCheckAnswer:this.handleCheckAnswer} ),
            

            (!this.props.developerMode || !this.props.jsonMode) &&
                CombinedHintsEditor(
                    {ref:"hintsEditor",
                    hints:this.props.hints,
                    imageUploader:this.props.imageUploader,
                    onChange:this.handleChange} )
            
        );

    },

    handleCheckAnswer: function() {
        var result = this.scorePreview();
        this.setState({
            gradeMessage: result.message,
            wasAnswered: result.correct
        });
    },

    toggleJsonMode: function() {
        this.setState({
            json: this.toJSON(true)
        }, function() {
            this.props.onChange({
                jsonMode: !this.props.jsonMode
            });
        });
    },

    componentDidMount: function() {
        this.rendererMountNode = document.createElement("div");
        this.updateRenderer();
    },

    componentDidUpdate: function() {
        this.updateRenderer();
    },

    updateRenderer: function(cb) {
        if (this.props.jsonMode) {
            return;
        }
        var rendererConfig = _({
            item: this.toJSON(true),
            enabledFeatures: {
                toolTipFormats: true
            },
            apiOptions: _.extend(
                {},
                ApiOptions.defaults,
                this.props.apiOptions
            ),
            initialHintsVisible: 0  /* none; to be displayed below */
        }).extend(
            _(this.props).pick("workAreaSelector",
                               "solutionAreaSelector",
                               "hintsAreaSelector",
                               "problemNum",
                               "enabledFeatures")
        );

        this.renderer = React.renderComponent(
            ItemRenderer(rendererConfig),
            this.rendererMountNode,
            cb);
    },

    handleChange: function(toChange, cb) {
        var newProps = _(this.props).pick("question", "hints", "answerArea");
        _(newProps).extend(toChange);
        this.props.onChange(newProps, cb);
    },

    changeJSON: function(newJson) {
        this.setState({
            json: newJson,
        });
        this.props.onChange(newJson);
    },

    scorePreview: function() {
        if (this.renderer) {
            return this.renderer.scoreInput();
        } else {
            return null;
        }
    },

    toJSON: function(skipValidation) {
        if (this.props.jsonMode) {
            return this.state.json;
        } else {
            return _.extend(this.refs.itemEditor.toJSON(skipValidation), {
                hints: this.refs.hintsEditor.toJSON(skipValidation)
            });
        }
    }

});

module.exports = EditorPage;

},{"./components/prop-check-box.jsx":130,"./enabled-features.jsx":144,"./hint-editor.jsx":145,"./item-editor.jsx":157,"./item-renderer.jsx":158,"./perseus-api.jsx":162,"react":115}],143:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var PropCheckBox = require("./components/prop-check-box.jsx");
var Util = require("./util.js");
var Widgets = require("./widgets.js");
var DragTarget = require("react-components/drag-target");

// like [[snowman input-number 1]]
var rWidgetSplit = /(\[\[\u2603 [a-z-]+ [0-9]+\]\])/g;

// widgets junyi can use now:
var widgetsInEditor = ['image'];

var WidgetSelect = React.createClass({displayName: 'WidgetSelect',
    handleChange: function(e) {
        var widgetType = e.target.value;
        if (widgetType === "") {
            // TODO(alpert): Not sure if change will trigger here
            // but might as well be safe
            return;
        }
        e.target.value = "";
        if (this.props.onChange) {
            this.props.onChange(widgetType);
        }
    },
    shouldComponentUpdate: function() {
        return false;
    },
    render: function() {
        var widgets = Widgets.getPublicWidgets();
        var junyiValidWidgets = _.pick(widgets, widgetsInEditor[0]);
        var orderedWidgetNames = _.sortBy(_.keys(junyiValidWidgets), function(name)  {
            return junyiValidWidgets[name].displayName;
        });

        return React.DOM.select( {onChange:this.handleChange}, 
            React.DOM.option( {value:""}, "Add a widget","\u2026"),
            React.DOM.option( {disabled:true}, "--"),
            _.map(orderedWidgetNames, function(name)  {
                return React.DOM.option( {value:name, key:name}, 
                    widgets[name].displayName
                );
            })
        );
    }
});


var WidgetEditor = React.createClass({displayName: 'WidgetEditor',
    propTypes: {
        type: React.PropTypes.string,
        id: React.PropTypes.string,
        graded: React.PropTypes.bool,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            graded: true,
            options: {}
        };
    },

    getInitialState: function() {
        return {
            showWidget: true
        };
    },

    render: function() {
        // We can't call our widget's `toJSON` here, because on
        // first render that ref hasn't mounted yet.
        // This means that on first render we'll send in
        // `options: {}` to `upgradeWidgetInfoToLatestVersion`, but
        // `upgradeWidgetInfoToLatestVersion` accounts for that
        // before sending {} to any of our prop upgrade functions.
        var upgradedWidgetInfo = Widgets.upgradeWidgetInfoToLatestVersion(
            this.props
        );
        var type = upgradedWidgetInfo.type;

        var cls = Widgets.getEditor(type);

        var isUngradedEnabled = (type === "transformer");
        var direction = this.state.showWidget ? "down" : "right";

        var gradedPropBox = PropCheckBox( {label:"Graded:",
                                graded:upgradedWidgetInfo.graded,
                                onChange:this.props.onChange} );

        return React.DOM.div( {className:"perseus-widget-editor"}, 
            React.DOM.a( {href:"#", className:"perseus-widget-editor-title " +
                    (this.state.showWidget ? "open" : "closed"),
                    onClick:this.toggleWidget}, 
                this.props.id,
                React.DOM.i( {className:"icon-chevron-" + direction} )
            ),
            React.DOM.div( {className:"perseus-widget-editor-content " +
                    (this.state.showWidget ? "enter" : "leave")}, 
                isUngradedEnabled && gradedPropBox,
                cls(_.extend({
                    ref: "widget",
                    onChange: this._handleWidgetChange
                }, upgradedWidgetInfo.options))
            )
        );
    },

    toggleWidget: function(e) {
        e.preventDefault();
        this.setState({showWidget: !this.state.showWidget});
    },

    _handleWidgetChange: function(newProps, cb) {
        // TODO(jack): It is unfortunate to call toJSON here, but is
        // important so that the widgetInfo we pass to our upgrade
        // functions is always complete. If we just sent this.props in,
        // we could run into situations where we would send things like
        // { answerType: "decimal" } to our upgrade functions, without
        // the rest of the props representing the widget.
        var currentWidgetInfo = _.extend({}, this.props, {
            options: this.refs.widget.toJSON(true)
        });
        var newWidgetInfo = Widgets.upgradeWidgetInfoToLatestVersion(
            currentWidgetInfo
        );
        newWidgetInfo.options = _.extend(newWidgetInfo.options, newProps);
        this.props.onChange(newWidgetInfo, cb);
    },

    toJSON: function(skipValidation) {
        return {
            type: this.props.type,
            graded: this.props.graded,
            options: this.refs.widget.toJSON(skipValidation),
            version: Widgets.getVersion(this.props.type)
        };
    }
});

// This is more general than the actual markdown image parsing regex,
// which is fine for correctness since it should only mean we could
// store extra image dimensions, unless the question is insanely
// formatted.
// A simplified regex here should hopefully be easier to keep in
// sync if the markdown parsing changes, though if it becomes
// easy to hook into the actual markdown regex without copy-pasting
// it, we should do that.
var IMAGE_REGEX = /!\[[^\]]*\]\(([^\s\)]+)[^\)]*\)/g;

/**
 * Find all the matches to a /g regex.
 *
 * Returns an array of the regex matches. Infinite loops if `regex` does not
 * have a /g modifier.
 *
 * Note: Returns an array of the capture objects, whereas String::match
 * ignores captures. If you don't need captures, use String::match
 */
var allMatches = function(regex, str) {
    var result = [];
    while (true) {
        var match = regex.exec(str);
        if (!match) {
            break;
        }
        result.push(match);
    }
    return result;
};

/**
 * Return an array of URLs of all the images in the given renderer
 * markdown.
 */
var imageUrlsFromContent = function(content) {
    return _.map(
        allMatches(IMAGE_REGEX, content),
        function(capture)  {return capture[1];}
    );
};

/**
 * Sends the dimensions of the image located at the given url to `callback`
 */
var sizeImage = function(url, callback) {
    var image = new Image();
    image.onload = function()  {
        var width = image.naturalWidth || image.width;
        var height = image.naturalHeight || image.height;
        callback(width, height);
    };
    image.src = url;
};

var Editor = React.createClass({displayName: 'Editor',
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            content: "",
            placeholder: "",
            widgets: {},
            images: {},
            widgetEnabled: true,
            immutableWidgets: false
        };
    },

    getWidgetEditor: function(id, type) {
        if (!Widgets.getEditor(type)) {
            return;
        }
        return WidgetEditor(_.extend({
            ref: id,
            id: id,
            type: type,
            onChange: this._handleWidgetEditorChange.bind(this, id)
        }, this.props.widgets[id]));
    },

    _handleWidgetEditorChange: function(id, newProps, cb) {
        var widgets = _.clone(this.props.widgets);
        widgets[id] = _.extend({}, widgets[id], newProps);
        this.props.onChange({widgets: widgets}, cb);
    },

    /**
     * Calculate the size of all the images in props.content, and send
     * those sizes to this.props.images using props.onChange.
     */
    _sizeImages: function(props) {
        var imageUrls = imageUrlsFromContent(props.content);

        // Discard any images in our dimension table that no
        // longer exist in content.
        var images = _.pick(props.images, imageUrls);

        // Only calculate sizes for images that were not present previously.
        // Most content edits shouldn't have new images.
        // This could get weird in the case of multiple images with the same
        // URL, if you've changed the backing image size, but given graphie
        // hashes it's probably an edge case.
        var newImageUrls = _.filter(imageUrls, function(url)  {return !images[url];});

        // TODO(jack): Q promises would make this nicer and only
        // fire once.
        _.each(newImageUrls, function(url)  {
            sizeImage(url, function(width, height)  {
                // We keep modifying the same image object rather than a new
                // copy from this.props because all changes here are additive.
                // Maintaining old changes isn't strictly necessary if
                // props.onChange calls are not batched, but would be if they
                // were, so this is nice from that anti-race-condition
                // perspective as well.
                images[url] = {
                    width: width,
                    height: height
                };
                props.onChange({
                    images: _.clone(images)
                });
            });
        });
    },

    render: function() {
        var pieces;
        var widgets;
        var underlayPieces;
        var widgetsDropDown;
        var templatesDropDown;
        var widgetsAndTemplates;

        if (this.props.widgetEnabled) {
            pieces = Util.split(this.props.content, rWidgetSplit);
            widgets = {};
            underlayPieces = [];

            for (var i = 0; i < pieces.length; i++) {
                var type = i % 2;
                if (type === 0) {
                    // Normal text
                    underlayPieces.push(pieces[i]);
                } else {
                    // Widget reference
                    var match = Util.rWidgetParts.exec(pieces[i]);
                    var id = match[1];
                    var type = match[2];

                    var selected = false;
                    // TODO(alpert):
                    // var selected = focused && selStart === selEnd &&
                    //         offset <= selStart &&
                    //         selStart < offset + text.length;
                    // if (selected) {
                    //     selectedWidget = id;
                    // }

                    var duplicate = id in widgets;

                    widgets[id] = this.getWidgetEditor(id, type);
                    var classes = (duplicate || !widgets[id] ? "error " : "") +
                            (selected ? "selected " : "");
                    var key = duplicate ? i : id;
                    underlayPieces.push(
                            React.DOM.b( {className:classes, key:key}, pieces[i]));
                }
            }

            // TODO(alpert): Move this to the content-change event handler
            // _.each(_.keys(this.props.widgets), function(id) {
            //     if (!(id in widgets)) {
            //         // It's strange if these preloaded options stick around
            //         // since it's inconsistent with how things work if you
            //         // don't have the serialize/deserialize step in the
            //         // middle
            //         // TODO(alpert): Save options in a consistent manner so
            //         // that you can undo the deletion of a widget
            //         delete this.props.widgets[id];
            //     }
            // }, this);

            this.widgetIds = _.keys(widgets);
            widgetsDropDown = WidgetSelect( {onChange:this.addWidget} );

            templatesDropDown = React.DOM.select( {onChange:this.addTemplate}, 
                React.DOM.option( {value:""}, "Insert template","\u2026"),
                React.DOM.option( {disabled:true}, "--"),
                React.DOM.option( {value:"table"}, "Table")
            );

            if (!this.props.immutableWidgets) {
                widgetsAndTemplates = React.DOM.div( {className:"perseus-editor-widgets"}, 
                    React.DOM.div( {className:"perseus-editor-widgets-selectors"}, 
                        widgetsDropDown,
                        templatesDropDown
                    ),
                    widgets
                );
            }
        } else {
            underlayPieces = [this.props.content];
        }

        // Without this, the underlay isn't the proper size when the text ends
        // with a newline.
        underlayPieces.push(React.DOM.br( {key:"end"}));

        var completeTextarea = [
                React.DOM.div( {className:"perseus-textarea-underlay",
                     ref:"underlay",
                     key:"underlay"}, 
                    underlayPieces
                ),
                React.DOM.textarea( {ref:"textarea",
                          key:"textarea",
                          onChange:this.handleChange,
                          placeholder:this.props.placeholder,
                          value:this.props.content} )
            ];
        var textareaWrapper;
        if (this.props.imageUploader) {
            textareaWrapper = DragTarget(
                    {onDrop:this.handleDrop,
                    className:"perseus-textarea-pair"}, 
                completeTextarea
            );
        } else {
            textareaWrapper = React.DOM.div( {className:"perseus-textarea-pair"}, 
                completeTextarea
            );
        }

        return React.DOM.div( {className:"perseus-single-editor " +
                (this.props.className || "")} , 
            textareaWrapper,
            widgetsAndTemplates
        );
    },

    componentDidMount: function() {
        // This can't be in componentWillMount because that's happening during
        // the middle of our parent's render, so we can't call
        // this.props.onChange during that, since it calls our parent's
        // setState
        this._sizeImages(this.props);
    },

    componentDidUpdate: function(prevProps) {
        // TODO(alpert): Maybe fix React so this isn't necessary
        var textarea = this.refs.textarea.getDOMNode();
        textarea.value = this.props.content;

        // This can't be in componentWillReceiveProps because that's happening
        // during the middle of our parent's render.
        if (this.props.content !== prevProps.content) {
            this._sizeImages(this.props);
        }
    },

    handleDrop: function(e) {
        var content = this.props.content;
        var dataTransfer = e.nativeEvent.dataTransfer;

        // files will hold something if the drag was from the desktop or a file
        // located on the user's computer.
        var files = dataTransfer.files;

        // ... but we only get a url if the drag originated in another window
        if (files.length === 0) {
            var imageUrl = dataTransfer.getData("URL");

            if (imageUrl) {
                // TODO(joel) - relocate when the image upload dialog lands
                var newContent = content + "\n\n![](" + imageUrl + ")";
                this.props.onChange({ content: newContent });
            }

            return;
        }

        /* For each file we make sure it's an image, then create a sentinel -
         * snowman + identifier to insert into the current text. The sentinel
         * only lives there temporarily until we get a response back from the
         * server that the image is now hosted on AWS, at which time we replace
         * the temporary sentinel with the permanent url for the image.
         *
         * There is an abuse of tap in the middle of the pipeline to make sure
         * everything is sequenced in the correct order. We want to modify the
         * content (given any number of images) at the same time, i.e. only
         * once, so we do that step with the tap. After the content has been
         * changed we send off the request for each image.
         *
         * Note that the snowman doesn't do anything special in this case -
         * it's effectively just part of a broken link. Perseus could be
         * extended to recognize this sentinel and highlight it like for
         * widgets.
         */
        _(files)
            .chain()
            .map(function(file) {
                if (!file.type.match('image.*')) {
                    return null;
                }

                var sentinel = "\u2603 " + _.uniqueId("image_");
                // TODO(joel) - figure out how to temporarily include the image
                // before the server returns.
                content += "\n\n![](" + sentinel + ")";

                return { file: file, sentinel: sentinel };
            })
            .reject(_.isNull)
            .tap(function()  { this.props.onChange({ content: content }); }.bind(this))
            .each(function(fileAndSentinel)  {
                this.props.imageUploader(fileAndSentinel.file, function(url)  {
                    this.props.onChange({
                        content: this.props.content.replace(
                            fileAndSentinel.sentinel, url)
                    });
                }.bind(this));
            }.bind(this));
    },

    handleChange: function() {
        var textarea = this.refs.textarea.getDOMNode();
        this.props.onChange({content: textarea.value});
    },

    addWidget: function(widgetType) {
        var oldContent = this.props.content;

        // Add newlines before "big" widgets like graphs
        if (widgetType !== "input-number" && widgetType !== "dropdown") {
            oldContent = oldContent.replace(/\n*$/, "\n\n");
        }

        for (var i = 1; oldContent.indexOf("[[\u2603 " + widgetType + " " + i +
                "]]") > -1; i++) {
            // pass
        }

        var id = widgetType + " " + i;
        var newContent = oldContent + "[[\u2603 " + id + "]]";

        var widgets = _.clone(this.props.widgets);
        widgets[id] = {type: widgetType};
        this.props.onChange({
            content: newContent,
            widgets: widgets
        }, this.focusAndMoveToEnd);
    },

    addTemplate: function(e) {
        var templateType = e.target.value;
        if (templateType === "") {
            return;
        }
        e.target.value = "";

        var oldContent = this.props.content;

        // Force templates to have a blank line before them,
        // as they are usually used as block elements
        // (especially important for tables)
        oldContent = oldContent.replace(/\n*$/, "\n\n");

        var template;
        if (templateType === "table") {
            template = "header 1 | header 2 | header 3\n" +
                       "- | - | -\n" +
                       "data 1 | data 2 | data 3\n" +
                       "data 4 | data 5 | data 6\n" +
                       "data 7 | data 8 | data 9";
        } else if (templateType === "alignment") {
            template = "$\\begin{align} x+5 &= 30 \\\\\n" +
                       "x+5-5 &= 30-5 \\\\\n" +
                       "x &= 25 \\end{align}$";
        } else if (templateType === "piecewise") {
            template = "$f(x) = \\begin{cases}\n" +
                       "7 & \\text{if $x=1$} \\\\\n" +
                       "f(x-1)+5 & \\text{if $x > 1$}\n" +
                       "\\end{cases}$";
        } else {
            throw new Error("Invalid template type: " + templateType);
        }

        var newContent = oldContent + template;

        this.props.onChange({content: newContent}, this.focusAndMoveToEnd);
    },

    toJSON: function(skipValidation) {
        // Could be _.pick(this.props, "content", "widgets"); but validation!
        var widgets = {};
        var widgetIds = _.intersection(this.widgetIds, _.keys(this.refs));

        _.each(widgetIds, function(id) {
            widgets[id] = this.refs[id].toJSON(skipValidation);
        }, this);

        return {
            content: this.props.content,
            images: this.props.images,
            widgets: widgets
        };
    },

    focus: function() {
        this.refs.textarea.getDOMNode().focus();
    },

    focusAndMoveToEnd: function() {
        this.focus();
        var textarea = this.refs.textarea.getDOMNode();
        textarea.selectionStart = textarea.value.length;
        textarea.selectionEnd = textarea.value.length;
    }
});

module.exports = Editor;

},{"./components/prop-check-box.jsx":130,"./util.js":168,"./widgets.js":171,"react":115,"react-components/drag-target":4}],144:[function(require,module,exports){
/** @jsx React.DOM */var React = require('react');

module.exports = {
    propTypes: React.PropTypes.shape({
        toolTipFormats: React.PropTypes.bool.isRequired,
        useMathQuill: React.PropTypes.bool.isRequired
    }).isRequired,

    defaults: {
        // TODO(jack): Remove this two options
        toolTipFormats: true,
        useMathQuill: false
    }
};

},{"react":115}],145:[function(require,module,exports){
/** @jsx React.DOM */

/* Collection of classes for rendering the hint editor area,
 * hint editor boxes, and hint previews
 */

var React = require('react');
var Editor = require("./editor.jsx");
var HintRenderer = require("./hint-renderer.jsx");
var InfoTip = require("react-components/info-tip");

/* Renders a hint editor box
 *
 * This includes:
 *  ~ A "Hint" title
 *  ~ the textarea for the hint
 *  ~ the "remove this hint" box
 *  ~ the move hint up/down arrows
 */
var HintEditor = React.createClass({displayName: 'HintEditor',
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            content: ""
        };
    },

    render: function() {
        return React.DOM.div( {className:"perseus-hint-editor perseus-editor-left-cell"}, 
            React.DOM.div( {className:"pod-title"}, "Hint"),
            Editor( {ref:"editor",
                    widgets:this.props.widgets,
                    content:this.props.content,
                    images:this.props.images,
                    placeholder:"Type your hint here...",
                    imageUploader:this.props.imageUploader,
                    onChange:this.props.onChange} ),
            React.DOM.div( {className:"hint-controls-container clearfix"}, 
                React.DOM.span( {className:"reorder-hints"}, 
                    React.DOM.a( {href:"#",
                        className:this.props.isLast && "hidden",
                        onClick:function()  {
                            this.props.onMove(1);
                            return false;
                        }.bind(this)}, 
                        React.DOM.span( {className:"icon-circle-arrow-down"} )
                    ),
                    ' ',
                    React.DOM.a( {href:"#",
                        className:this.props.isFirst && "hidden",
                        onClick:function()  {
                            this.props.onMove(-1);
                            return false;
                        }.bind(this)}, 
                        React.DOM.span( {className:"icon-circle-arrow-up"} )
                    ),
                    ' ',
                    this.props.isLast &&
                    InfoTip(null, 
                        React.DOM.p(null, "The last hint is automatically bolded.")
                    )
                ),
                React.DOM.a( {href:"#", className:"remove-hint simple-button orange",
                        onClick:function()  {
                            this.props.onRemove();
                            return false;
                        }.bind(this)}, 
                    React.DOM.span( {className:"icon-trash"} ), " Remove this hint",' '
                )
            )
        );
    },

    focus: function() {
        this.refs.editor.focus();
    },

    toJSON: function(skipValidation) {
        return this.refs.editor.toJSON(skipValidation);
    }
});


/* A single hint-row containing a hint editor and preview */
var CombinedHintEditor = React.createClass({displayName: 'CombinedHintEditor',
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    render: function() {
        var shouldBold = this.props.isLast &&
                         !(/\*\*/).test(this.props.hint.content);
        return React.DOM.div( {className:"perseus-combined-hint-editor " +
                    "perseus-editor-row"}, 
            HintEditor(
                {ref:"editor",
                isFirst:this.props.isFirst,
                isLast:this.props.isLast,
                widgets:this.props.hint.widgets,
                content:this.props.hint.content,
                images:this.props.hint.images,
                imageUploader:this.props.imageUploader,
                onChange:this.props.onChange,
                onRemove:this.props.onRemove,
                onMove:this.props.onMove} ),

            React.DOM.div( {className:"perseus-editor-right-cell"}, 
                HintRenderer( {hint:this.props.hint, bold:shouldBold} )
            )
        );
    },

    toJSON: function(skipValidation) {
        return this.refs.editor.toJSON(skipValidation);
    },

    focus: function() {
        this.refs.editor.focus();
    }
});


/* The entire hints editing/preview area
 *
 * Includes:
 *  ~ All the hint edit boxes, move and remove buttons
 *  ~ All the hint previews
 *  ~ The "add a hint" button
 */
var CombinedHintsEditor = React.createClass({displayName: 'CombinedHintsEditor',
    propTypes: {
        imageUploader: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            onChange: function()  {},
            hints: []
        };
    },

    render: function() {
        var hints = this.props.hints;
        var hintElems = _.map(hints, function(hint, i) {
            return CombinedHintEditor(
                        {ref:"hintEditor" + i,
                        key:"hintEditor" + i,
                        isFirst:i === 0,
                        isLast:i + 1 === hints.length,
                        hint:hint,
                        imageUploader:this.props.imageUploader,
                        onChange:this.handleHintChange.bind(this, i),
                        onRemove:this.handleHintRemove.bind(this, i),
                        onMove:this.handleHintMove.bind(this, i)} );
        }, this);

        return React.DOM.div( {className:"perseus-hints-container perseus-editor-table"}, 
            hintElems,
            React.DOM.div( {className:"perseus-editor-row"}, 
                React.DOM.div( {className:"add-hint-container perseus-editor-left-cell"}, 
                React.DOM.a( {href:"#", className:"simple-button orange",
                        onClick:this.addHint}, 
                    React.DOM.span( {className:"icon-plus"} ),
                    ' ',"Add a hint",' '
                )
                ),
                React.DOM.div( {className:"perseus-editor-right-cell"} )
            )
        );
    },

    handleHintChange: function(i, newProps, cb) {
        var hints = _(this.props.hints).clone();
        hints[i] = _.extend({}, hints[i], newProps);
        this.props.onChange({hints: hints}, cb);
    },

    handleHintRemove: function(i) {
        var hints = _(this.props.hints).clone();
        hints.splice(i, 1);
        this.props.onChange({hints: hints});
    },

    handleHintMove: function(i, dir) {
        var hints = _(this.props.hints).clone();
        var hint = hints.splice(i, 1)[0];
        hints.splice(i + dir, 0, hint);
        this.props.onChange({hints: hints}, function()  {
            this.refs["hintEditor" + (i + dir)].focus();
        }.bind(this));
    },

    addHint: function() {
        var hints = _(this.props.hints).clone().concat([{ content: "" }]);
        this.props.onChange({hints: hints}, function()  {
            var i = hints.length - 1;
            this.refs["hintEditor" + i].focus();
        }.bind(this));

        // TODO(joel) - is this doing anything?
        return false;
    },

    toJSON: function(skipValidation) {
        return this.props.hints.map(function(hint, i) {
            return this.refs["hintEditor" + i].toJSON(skipValidation);
        }, this);
    }
});

module.exports = CombinedHintsEditor;

},{"./editor.jsx":143,"./hint-renderer.jsx":146,"react":115,"react-components/info-tip":5}],146:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Renderer = require("./renderer.jsx");

/* Renders just a hint preview */
var HintRenderer = React.createClass({displayName: 'HintRenderer',
    render: function() {
        var shouldBold = this.props.bold;
        var hint = this.props.hint;
        var classNames;
        if (shouldBold) {
            classNames = "perseus-hint-renderer last-hint";
        } else {
            classNames = "perseus-hint-renderer";
        }
        return React.DOM.div( {className:classNames}, 
            Renderer(
                {widgets:this.props.hint.widgets,
                content:this.props.hint.content || "",
                images:this.props.hint.images} )
        );
    }
});

module.exports = HintRenderer;

},{"./renderer.jsx":165,"react":115}],147:[function(require,module,exports){
var React = require('react');

var init = function(options) {
    _.defaults(options, {
        // Pass skipMathJax: true if MathJax is already loaded and configured.
        skipMathJax: false
    });

    var deferred = $.Deferred();

    markedReact.setOptions({
        sanitize: true,
        paragraphFn: function(text) {
            return React.DOM.div(null, text);
        }
    });

    if (options.skipMathJax) {
        deferred.resolve();
    } else {
        MathJax.Hub.Config({
            messageStyle: "none",
            skipStartupTypeset: "none",
            "HTML-CSS": {
                availableFonts: ["TeX"],
                imageFont: null,
                scale: 100,
                showMathMenu: false
            }
        });

        MathJax.Hub.Configured();
        MathJax.Hub.Queue(deferred.resolve);
    }

    return deferred;
};

module.exports = init;

},{"react":115}],148:[function(require,module,exports){
var Movable = require("./interactive2/movable.js");
var MovablePoint = require("./interactive2/movable-point.js");
var MovableLine = require("./interactive2/movable-line.js");

var Interactive2 = {
    MovablePoint: MovablePoint,
    addMovablePoint: function(graphie, options) {
        var movable = new Movable(graphie, {});
        return new MovablePoint(graphie, movable, options);
    },
    MovableLine: MovableLine,
    addMovableLine: function(graphie, options) {
        var movable = new Movable(graphie, {});
        return new MovableLine(graphie, movable, options);
    }
};

module.exports = Interactive2;

},{"./interactive2/movable-line.js":152,"./interactive2/movable-point.js":154,"./interactive2/movable.js":155}],149:[function(require,module,exports){
/**
 * Utility functions for writing Interactive2 movablethings
 */

var MovableHelperMethods = require("./movable-helper-methods.js");

var InteractiveUtil = {
    assert: function(isTrue, message) {
        if (!isTrue) {
            throw new Error("Assertion Error" +
                    (message ? ": " + message : ""));
        }
    },

    /**
     * Create getters for this.state, based on the default state, `defaults`
     */
    createGettersFor: function(Class, defaults) {
        _.each(_.keys(defaults), function(key) {
            if (Class.prototype[key] === undefined) {
                Class.prototype[key] = function() {
                    return this.state[key];
                };
            }
        });
    },

    /**
     * Add MovableHelperMethods methods to a MovableThing class
     */
    addMovableHelperMethodsTo: function(Class) {
        _.each(MovableHelperMethods, function(methodFunc, methodName) {
            if (Class.prototype[methodName] === undefined) {
                Class.prototype[methodName] = methodFunc;
            }
        });
    },

    /**
     * Turn a function or an array of functions into an array of functions
     */
    arrayify: function(funcOrArray) {
        if (funcOrArray == null) {
            return [];
        } else if (_.isArray(funcOrArray)) {
            return _.filter(_.flatten(funcOrArray), _.identity);
        } else {
            return [funcOrArray];
        }
    },

    /**
     * Convert all function-or-array arguments to arrays of functions
     */
    normalizeOptions: function(arrayOptionNames, options) {
        // TODO(jack): Having to clone here is annoying; this
        // function should really just modify this.state in place
        // (and maybe be a function on MovableHelperMethods to get access
        // to this.state), which would also be nicer because we could
        // normalizeOptions once in this.modify
        var result = _.clone(options);
        _.each(arrayOptionNames, function(eventName) {
            var funcOrArray = options[eventName];
            // Only propagate values which were set; not present values
            // shouldn't be added to options because we'd like them to
            // fall through to defaults
            if (funcOrArray !== undefined) {
                var funcArray = InteractiveUtil.arrayify(funcOrArray);
                result[eventName] = funcArray;
            }
        });
        return result;
    }
};

module.exports = InteractiveUtil;

},{"./movable-helper-methods.js":150}],150:[function(require,module,exports){
/**
 * MovableThing convenience methods
 *
 * Usually added to a Movable* class through
 * InteractiveUtils.addMovableHelperMethodsTo(), but these implementations
 * are simply for convenience.
 */

var kpoint = KhanUtil.kpoint;

var MovableHelperMethods = {
    /**
     * Fire an onSomething type event to all functions in listeners
     */
    _fireEvent: function(listeners, currentValue, previousValue) {
        _.invoke(listeners, "call", this, currentValue, previousValue);
    },

    /**
     * Combine the array of constraints functions
     * Returns either an [x, y] coordinate or false
     */
    _applyConstraints: function(current, previous) {
        return _.reduce(this.state.constraints, function(memo, constraint) {
            // A move that has been cancelled won't be propagated to later
            // constraints calls
            if (memo === false) {
                return false;
            }

            var result = constraint.call(this, memo, previous);
            if (result === false) {
                // Returning false cancels the move
                return false;

            } else if (kpoint.is(result, 2)) {
                // Returning a coord from constraints overrides the move
                return result;

            } else if (result === true || result == null) {
                // Returning true or undefined allow the move to occur
                return memo;

            } else {
                // Anything else is an error
                throw new Error("Constraint returned invalid result: " +
                        result);
            }
        }, current, this);
    },

    /**
     * Call all draw functions, and update our prevState for the next
     * draw function
     */
    draw: function() {
        var currState = this.cloneState();
        MovableHelperMethods._fireEvent.call(this,
            this.state.draw,
            currState,
            this.prevState
        );
        this.prevState = currState;
    },

    /**
     * Add a listener to any event: startMove, constraints, onMove, onMoveEnd,
     * etc.
     *
     * eventName: the string name of the event to listen to. one of:
     *   "onMoveStart", "onMove", "onMoveEnd", "draw", "remove"
     *
     * id: a string id that can be used to remove this event at a later time
     *   note: adding multiple listeners with the same id is undefined behavior
     *
     * func: the function to call when the event happens, which is called
     *   with the event's standard parameters [usually (coord, prevCoord) or
     *   (state, prevState)]
     */
    listen: function(eventName, id, func) {
        this._listenerMap = this._listenerMap || {};
        this._listenerMap[eventName + ":" + id] = this.state[eventName].length;
        this.state[eventName].push(func);
    },

    /**
     * Remove a previously added listener, by the id specified in the
     * corresponding listen() call
     *
     * If the given id has not been registered already, this is a no-op
     */
    unlisten: function(eventName, id) {
        this._listenerMap = this._listenerMap || {};
        var index = this._listenerMap[eventName + ":" + id];
        if (index !== undefined) {
            this.state[eventName].splice(index, 1);
        }
    }
};

module.exports = MovableHelperMethods;

},{}],151:[function(require,module,exports){
/**
 * A library of options to pass to add/draw/remove/constraints
 */

var knumber = KhanUtil.knumber;
var kvector = KhanUtil.kvector;
var kpoint = KhanUtil.kpoint;

/**
 * Helper functions
 */
var getScaledPolarDiff = function(line) {
    var scaledA = line.graphie.scalePoint(line.coord(0));
    var scaledZ = line.graphie.scalePoint(line.coord(1));
    var polarDiff = kvector.polarDegFromCart(
        kvector.subtract(
            scaledZ,
            scaledA
        )
    );
    return polarDiff;
};

// Given `coord` and `angle`, find the point where a line extended
// from `coord` in the direction of `angle` would be clipped by the
// edge of the graphie canvas. Then draw an arrowhead at that point
// pointing in the direction of `angle`.
var drawArrowAtClipPoint = function(graph, coord, angle, style) {
    // Actually put the arrowheads 4px from the edge so they have
    // a bit of room
    var xExtent = graph.range[0][1] - graph.range[0][0];
    var yExtent = graph.range[1][1] - graph.range[1][0];

    // shoot a point off into the distance ...
    var distance = xExtent + yExtent;
    // we need to scale the point according to the scale of the axes
    var angleVec = graph.unscaleVector(
        kvector.cartFromPolarDeg([1, angle])
    );
    var distVec = kvector.scale(
        kvector.normalize(angleVec),
        distance
    );
    var farCoord = kvector.add(coord, distVec);
    var scaledAngle = kvector.polarDegFromCart(angleVec)[1];
    // ... and then bring it back
    var clipPoint = graph.constrainToBoundsOnAngle(farCoord, 4,
                                  scaledAngle * Math.PI / 180);
    clipPoint = graph.scalePoint(clipPoint);

    var arrowHead = graph.raphael.path("M-3 4 C-2.75 2.5 0 0.25 0.75 0C0 -0.25 -2.75 -2.5 -3 -4");
    arrowHead.rotate(360 - angle, 0.75, 0)
        .scale(1.4, 1.4, 0.75, 0)
        .translate(clipPoint[0], clipPoint[1])
        .attr(style)
        .attr({ "stroke-linejoin": "round", "stroke-linecap": "round", "stroke-dasharray": "" });

    return arrowHead;
};


/**
 * MovableLine option functions
 */
var add = {
    // We do this in add as well as in standard so that we can call
    // pointsToFront after the first draw (which adds `this.visibleShape`)
    draw: function() {
        this.draw();
    },

    pointsToFront: function(state) {
        _.invoke(state.points, "toFront");
    }
};

add.standard = [add.draw, add.pointsToFront];

var modify = {
    draw: function() {
        this.draw();
    }
};

modify.standard = [modify.draw];

var draw = {
    basic: function(state) {
        var graphie = this.graphie;
        if (!this.state.visibleShape) {
            this.state.visibleShape = graphie.path(
                [[0, 0]],
                this.normalStyle()
            );
            this.state.visibleShape.attr({
                path: KhanUtil.unscaledSvgPath([[0, 0], [1, 0]])
            });
        }


        // Clip the line 5px from the edge of the graphie to allow for
        // arrowheads
        if (state.extendLine || state.extendRay) {
            this.state.visibleShape.attr({
                "clip-rect": "5 5 " + (graphie.dimensions[0] - 10) + " " +
                    (graphie.dimensions[1] - 10)
            });
        }

        var scaledA = graphie.scalePoint(this.coord(0));
        var scaledZ = graphie.scalePoint(this.coord(1));
        var polarDiff = getScaledPolarDiff(this);
        var lineLength = polarDiff[0];
        var angle = polarDiff[1];

        var elements = [this.state.visibleShape];
        if (this.mouseTarget()) {
            elements.push(this.mouseTarget());
        }
        _.each(elements, function(element) {
            element.translate(scaledA[0] - element.attr("translation").x,
                    scaledA[1] - element.attr("translation").y);
            element.rotate(angle, scaledA[0], scaledA[1]);
            if (state.extendLine) {
                element.translate(-0.5, 0);
                lineLength = graphie.dimensions[0] + graphie.dimensions[1];
                lineLength = 2 * lineLength;
            } else if (state.extendRay) {
                lineLength = graphie.dimensions[0] + graphie.dimensions[1];
            }
            element.scale(lineLength, 1, scaledA[0], scaledA[1]);
        });
    },

    arrows: function(state) {
        if (this._arrows != null) {
            _.invoke(this._arrows, "remove");
        }
        this._arrows = [];

        var polarDiff = getScaledPolarDiff(this);
        var angle = polarDiff[1];

        if (state.extendLine) {
            this._arrows.push(drawArrowAtClipPoint(
                this.graphie, this.state.points[0].coord(), 360 - angle,
                this.normalStyle()));
            this._arrows.push(drawArrowAtClipPoint(
                this.graphie, this.state.points[1].coord(),
                (540 - angle) % 360,
                this.normalStyle()));
        } else if (state.extendRay) {
            this._arrows.push(drawArrowAtClipPoint(
                this.graphie, this.state.points[0].coord(), 360 - angle,
                this.normalStyle()));
        }
    },

    highlight: function(state, prevState) {
        // TODO(jack): Figure out a way to highlight the points attached to
        // the line. Maybe this means an additional isHovering: []
        // function to state of movable/movablepoint to define [additional?]
        // times it should be highlighted
        if (state.isHovering && !prevState.isHovering) {
            state.visibleShape.animate(
                state.highlightStyle,
                50
            );
        } else if (!state.isHovering && prevState.isHovering) {
            state.visibleShape.animate(
                state.normalStyle,
                50
            );
        }
    }
};

draw.standard = [draw.basic, draw.arrows, draw.highlight];


var remove = {
    basic: function() {
        if (this.state.visibleShape) {
            this.state.visibleShape.remove();
        }
    },
    arrows: function() {
        if (this._arrows != null) {
            _.invoke(this._arrows, "remove");
        }
    }
};

remove.standard = [remove.basic, remove.arrows];


var constraints = {
    fixed: function() {
        return function() { return false; };
    },

    snap: function(snap) {
        return function(coord, prevCoord) {
            if (snap === null) {
                return true;
            }
            var delta = kvector.subtract(coord, prevCoord);
            snap = snap || this.graphie.snap;
            delta = kpoint.roundTo(delta, snap);
            return kvector.add(prevCoord, delta);
        };
    },

    bound: function(range, snap, paddingPx) {
        if (paddingPx === undefined) {
            if (range === undefined) {
                paddingPx = 10;
            } else {
                paddingPx = 0;
            }
        }
        return function(coord, prevCoord) {
            var graphie = this.graphie;
            var delta = kvector.subtract(coord, prevCoord);
            var range = range || graphie.range;
            // A null snap means no snap; an undefined snap means
            // default to graphie's
            if (snap === undefined) {
                snap = graphie.snap;
            }

            // Calculate the bounds for both points
            var absoluteLower = graphie.unscalePoint([
                paddingPx,
                graphie.ypixels - paddingPx
            ]);
            var absoluteUpper = graphie.unscalePoint([
                graphie.xpixels - paddingPx,
                paddingPx
            ]);
            if (snap) {
                absoluteLower = kpoint.ceilTo(absoluteLower, snap);
                absoluteUpper = kpoint.floorTo(absoluteUpper, snap);
            }

            // Calculate the bounds for the delta.
            var deltaBounds = _.map(this.coords(), function(coord, i) {
                var max = kvector.subtract(absoluteUpper, coord);
                var min = kvector.subtract(absoluteLower, coord);
                return [min, max];
            });

            // bound the delta by the calculated bounds
            var boundedDelta = _.reduce(deltaBounds,
                    function(delta, bound) {
                var lower = bound[0];
                var upper = bound[1];
                var deltaX = Math.max(lower[0], Math.min(upper[0], delta[0]));
                var deltaY = Math.max(lower[1], Math.min(upper[1], delta[1]));
                return [deltaX, deltaY];
            }, delta);

            return kvector.add(prevCoord, boundedDelta);
        };
    }
};

constraints.standard = null;


module.exports = {
    add: add,
    modify: modify,
    draw: draw,
    remove: remove,

    onMoveStart: {standard: null},
    constraints: constraints,
    onMove: {standard: null},
    onMoveEnd: {standard: null},
};

},{}],152:[function(require,module,exports){
/**
 * MovableLine
 */

var MovableLineOptions = require("./movable-line-options.js");
var InteractiveUtil = require("./interactive-util.js");
var objective_ = require("./objective_.js");
var assert = InteractiveUtil.assert;
var normalizeOptions = InteractiveUtil.normalizeOptions;

var knumber = KhanUtil.knumber;
var kvector = KhanUtil.kvector;
var kpoint = KhanUtil.kpoint;

var FUNCTION_ARRAY_OPTIONS = [
    "add",
    "draw",
    "remove",
    "onMoveStart",
    "constraints",
    "onMove",
    "onMoveEnd"
];

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.cursor() etc).
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the point should be on "state".
var DEFAULT_PROPS = {
    points: [[0, 0], [4, 4]],
    updatePoints: false,
    static: false,
    cursor: "move",
    normalStyle: null,     // turned into an object in this.modify
    highlightStyle: null,  // likewise
    extendLine: false,
    extendRay: false
};
var DEFAULT_STATE = {
    visibleShape: null,
    mouseTarget: null
};

var MovableLine = function(graphie, movable, options) {
    assert(graphie != null);
    assert(options != null);

    _.extend(this, {
        graphie: graphie,
        movable: movable,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movableLine")
        }
    });

    // We only set DEFAULT_STATE once, here
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

_.extend(MovableLine, MovableLineOptions);
InteractiveUtil.createGettersFor(MovableLine, _.extend({},
    DEFAULT_PROPS,
    DEFAULT_STATE
));
InteractiveUtil.addMovableHelperMethodsTo(MovableLine);

_.extend(MovableLine.prototype, {

    cloneState: function() {
        return _.extend(this.movable.cloneState(), {
            coords: this.coords(),
        }, this.state);
    },

    _createDefaultState: function() {
        return _.extend({
            id: this.state.id,
        }, normalizeOptions(
            FUNCTION_ARRAY_OPTIONS,
            // Defaults are copied from MovableLineOptions.*.standard
            // These defaults are set here instead of DEFAULT_PROPS/STATE
            // because they:
            //    - are objects, not primitives (and need a deeper copy)
            //    - they don't need getters created for them
            // TODO(jack): Consider "default" once we es3ify perseus
            objective_.pluck(MovableLineOptions, "standard")
        ), DEFAULT_PROPS);
    },

    /**
     * Resets the object to its state as if it were constructed with
     * `options` originally. state not on DEFAULT_PROPS is maintained.
     *
     * Analogous to React.js's replaceProps
     */
    modify: function(options) {
        this.update(_.extend(this._createDefaultState(), options));
    },

    /**
     * Adjusts constructor parameters without changing previous settings
     * for any option not specified
     *
     * Analogous to React.js's setProps
     */
    update: function(options) {
        var self = this;
        var graphie = this.graphie;
        var state = self.state = _.extend(
            self.state,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options)
        );

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep.
        // We use _.extend instead of _.defaults because we don't want
        // to modify the passed-in copy (especially if it's from
        // DEFAULT_PROPERTIES!)
        var normalColor = (state.static) ? KhanUtil.DYNAMIC :
                                           KhanUtil.INTERACTIVE;
        state.normalStyle = _.extend({
            stroke: normalColor,
            "stroke-width": 2
        }, state.normalStyle);

        state.highlightStyle = _.extend({
            stroke: KhanUtil.INTERACTING,
            "stroke-width": 3
        }, state.highlightStyle);

        if (!state.static) {
            // the invisible shape in front of the point that gets mouse events
            if (!state.mouseTarget) {
                state.mouseTarget = graphie.mouselayer.rect(0, -15, 1, 30);
                state.mouseTarget.attr({fill: "#000", "opacity": 0.0});
            }
        }

        if (state.static && state.mouseTarget) {
            // state.static was specified, remove any previously
            // existing mousetarget (from a previous modify)
            state.mouseTarget.remove();
            state.mouseTarget = null;
        }

        // The movable that handles mouse events for us
        self.movable.modify(_.extend({}, state, {
            mouseTarget: state.mouseTarget,

            // We null out the add/modify/remove to avoid propagating our
            // state.add... to the movable, so that we can fire those
            // events ourselves, rather than letting the movable handle
            // them
            add: null,
            modify: null,
            draw: self.draw.bind(self),
            remove: null,

            onMoveStart: function() {
                self._initialRefCoord = self.coord(0);
                self._prevRefCoord = self._initialRefCoord;
                self._totalDelta = [0, 0];

                self._fireEvent(self.state.onMoveStart,
                    self.coord(0),
                    self.coord(0)
                );
            },

            onMove: function(mouseCoord, prevMouseCoord) {
                var delta = kvector.subtract(mouseCoord, prevMouseCoord);
                self._totalDelta = kvector.add(self._totalDelta, delta);
                var refCoord = kvector.add(self._initialRefCoord, self._totalDelta);

                refCoord = self._applyConstraints(refCoord, self._prevRefCoord);
                if (refCoord === false) {
                    return;
                }

                var actualDelta = kvector.subtract(refCoord, self._prevRefCoord);

                if (self.state.updatePoints) {
                    _.each(self.state.points, function(point) {
                        point.setCoord(kvector.add(
                            point.coord(),
                            actualDelta
                        ));
                    });
                }

                self._fireEvent(self.state.onMove, refCoord, self._prevRefCoord);
                self._prevRefCoord = refCoord;
            },

            onMoveEnd: function() {
                self._fireEvent(self.state.onMoveEnd,
                    self._prevRefCoord,
                    self._initialRefCoord
                );
            },
        }));

        // Update the line with the points' movement
        _.invoke(state.points, "listen", "onMove", state.id,
                self.draw.bind(self));

        // Trigger an add event if this hasn't been added before
        if (!state.added) {
            self.prevState = {};
            self._fireEvent(state.add, self.cloneState(), self.prevState);
            state.added = true;

            // Update the state for `added` and in case the add event
            // changed it
            self.prevState = self.cloneState();
        }

        // Trigger a modify event
        self._fireEvent(state.modify, self.cloneState(), self.prevState);
    },

    coords: function() {
        return _.invoke(this.state.points, "coord");
    },

    point: function(index) {
        return this.state.points[index];
    },

    coord: function(index) {
        return this.point(index).coord();
    },

    remove: function() {
        this._fireEvent(this.state.remove);
        if (this.points) {
            _.invoke(this.points, "unlisten", "onMove", this.state.id);
        }

        if (this.movable) {
            // We need this to be guarded because it is called on the initial
            // constructor/modify call, before this.movable is created
            this.movable.remove();
        }
    },

    // Change z-order to back
    toBack: function() {
        this.movable.toBack();
        if (this.state.visibleShape) {
            this.state.visibleShape.toBack();
        }
    },

    // Change z-order to front
    toFront: function() {
        if (this.state.visibleShape) {
            this.state.visibleShape.toFront();
        }
        this.movable.toFront();
    },

    /**
     * Forwarding methods to this.movable:
     */
    isHovering: function() {
        return this.movable.isHovering();
    },

    isDragging: function() {
        return this.movable.isDragging();
    },

    mouseTarget: function() {
        return this.movable.mouseTarget();
    }
});

module.exports = MovableLine;

},{"./interactive-util.js":149,"./movable-line-options.js":151,"./objective_.js":156}],153:[function(require,module,exports){
/**
 * A library of options to pass to add/draw/remove/constraints
 */

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

var add = {
    constrain: function() {
        this.constrain();
    }
};

add.standard = [add.constrain];

var modify = {
    draw: function() {
        this.draw();
    }
};

modify.standard = [modify.draw];


var draw = {
    basic: function(state, prevState) {
        var graphie = this.graphie;
        if (!this.state.visibleShape) {
            this.state.visibleShape = graphie.ellipse(
                this.coord(),
                [
                    this.pointSize() / graphie.scale[0],
                    this.pointSize() / graphie.scale[1]
                ],
                _.omit(this.normalStyle(), "scale")
            );
        }
        if (state.normalStyle !== prevState.normalStyle &&
                !_.isEqual(state.normalStyle, prevState.normalStyle)) {
            this.state.visibleShape.attr(this.normalStyle());
        }
        var scaledPoint = graphie.scalePoint(this.coord());
        this.state.visibleShape.attr({cx: scaledPoint[0]});
        this.state.visibleShape.attr({cy: scaledPoint[1]});
        if (this.mouseTarget()) {
            this.mouseTarget().attr({ cx: scaledPoint[0] });
            this.mouseTarget().attr({ cy: scaledPoint[1] });
        }
    },

    highlight: function(state, prevState) {
        if (state.isHovering && !prevState.isHovering) {
            state.visibleShape.animate(
                this.highlightStyle(),
                50
            );
        } else if (!state.isHovering && prevState.isHovering) {
            state.visibleShape.animate(
                this.normalStyle(),
                50
            );
        }
    }
};

draw.standard = [draw.basic, draw.highlight];


var remove = {
    basic: function() {
        if (this.state.visibleShape) {
            this.state.visibleShape.remove();
            this.state.visibleShape = null;
        }
    }
};

remove.standard = remove.basic;


var constraints = {
    fixed: function() {
        return function() { return false; };
    },

    snap: function(snap) {
        return function(coord) {
            if (snap === null) {
                return true;
            }
            snap = snap || this.graphie.snap;
            return kpoint.roundTo(coord, snap);
        };
    },

    bound: function(range, snap, paddingPx) {
        if (paddingPx === undefined) {
            if (range === undefined) {
                paddingPx = 10;
            } else {
                paddingPx = 0;
            }
        }
        return function(coord) {
            var graphie = this.graphie;
            range = range || graphie.range;
            if (snap === undefined) {
                snap = graphie.snap;
            }

            var lower = graphie.unscalePoint([
                paddingPx,
                graphie.ypixels - paddingPx
            ]);
            var upper = graphie.unscalePoint([
                graphie.xpixels - paddingPx,
                paddingPx
            ]);
            if (snap) {
                lower = kpoint.ceilTo(lower, snap);
                upper = kpoint.floorTo(upper, snap);
            }
            var coordX = Math.max(lower[0], Math.min(upper[0], coord[0]));
            var coordY = Math.max(lower[1], Math.min(upper[1], coord[1]));
            return [coordX, coordY];
        };
    }
};

constraints.standard = null;

module.exports = {
    add: add,
    modify: modify,
    draw: draw,
    remove: remove,

    onMoveStart: {standard: null},
    constraints: constraints,
    onMove: {standard: null},
    onMoveEnd: {standard: null},
    onClick: {standard: null}
};

},{}],154:[function(require,module,exports){
/**
 * Creates and adds a point to the graph that can be dragged around.
 * It allows constraints on its movement and draws when moves happen.
 *
 * Options can be passed to the constructor to control how the point behaves:
 *   coord: [x, y]
 *     The initial position of the point
 *   pointSize:
 *     changes the size of the point. defaults to 4
 *   static: boolean
 *     draw the point, but don't let it be interactable
 *   cursor: "move", "pointer"
 *     css cursor for this point
 *   add: [function(state)]
 *     called immediately when this movablePoint is added
 *     default: apply any constraints and draw
 *   draw: [function(prevState, currentState)]
 *     drawing functions. default to [basic, highlight]
 *   remove: [function(state)]
 *     called when this movablePoint is removed
 *   onMoveStart: [function(coord)]
 *     called when this point is clicked on
 *   constraints: [function(coord)]
 *     called when this point is dragged
 *     return true or nothing to accept the move
 *     return false to cancel the move
 *     return an [x, y] coordinate to override the move
 *   onMove: [function(coord)]
 *     called after all constraints functions pass and the point
 *     is moved to a new location
 *   onMoveEnd: [function(coord)]
 *     called when the mouse is released from a click or move
 *   onClick: [function(coord)]
 *     called when someone mouses down, doesn't move the point,
 *     and mouses up.
 *   normalStyle:
 *     the raphael/graphie style of the point when not hovering
 *   highlightStyle:
 *     the raphael/graphie style of the point when hovering, if
 *     MovablePoint.draw.highlight is used
 *
 * This creates a MovablePoint object with the following methods:
 *   setCoord: [x, y]
 *     changes the point's coordinate
 *   draw:
 *     redraws the coord
 *   modify: {options}
 *     modifies the original options passed to the point
 *   remove:
 *     removes the point from graphie
 */

var MovablePointOptions = require("./movable-point-options.js");
var InteractiveUtil = require("./interactive-util.js");
var objective_ = require("./objective_.js");
var assert = InteractiveUtil.assert;
var normalizeOptions = InteractiveUtil.normalizeOptions;

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

// State parameters that should be converted into an array of
// functions
var FUNCTION_ARRAY_OPTIONS = _.keys(MovablePointOptions);

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.coord() etc).
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the point should be on "state".
var DEFAULT_PROPS = {
    coord: [0, 0],
    pointSize: 4,
    static: false,
    cursor: "move",
    normalStyle: null,    // turned into an object in this.modify
    highlightStyle: null  // likewise
};
var DEFAULT_STATE = {
    added: false,
    hasMoved: false,
    visibleShape: null,
    mouseTarget: null
};

var MovablePoint = function(graphie, movable, options) {
    _.extend(this, {
        graphie: graphie,
        movable: movable,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movablePoint")
        }
    });

    // We only set DEFAULT_STATE once, here
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

_.extend(MovablePoint, MovablePointOptions);
InteractiveUtil.createGettersFor(MovablePoint, _.extend({},
    DEFAULT_PROPS,
    DEFAULT_STATE
));
InteractiveUtil.addMovableHelperMethodsTo(MovablePoint);

_.extend(MovablePoint.prototype, {

    cloneState: function() {
        return _.extend(this.movable.cloneState(), this.state);
    },

    _createDefaultState: function() {
        return _.extend({
            id: this.state.id,
        }, normalizeOptions(
            FUNCTION_ARRAY_OPTIONS,
            // Defaults are copied from MovablePointOptions.*.standard
            // These defaults are set here instead of DEFAULT_PROPS/STATE
            // because they:
            //    - are objects, not primitives (and need a deeper copy)
            //    - they don't need getters created for them
            // TODO(jack): Consider "default" once we es3ify perseus
            objective_.pluck(MovablePointOptions, "standard")

        // We only update props here, because we want things on state to
        // be persistent, and updated appropriately in modify()
        ), DEFAULT_PROPS);
    },

    /**
     * Resets the object to its state as if it were constructed with
     * `options` originally. state not on DEFAULT_PROPS is maintained.
     *
     * Analogous to React.js's replaceProps
     */
    modify: function(options) {
        this.update(_.extend(this._createDefaultState(), options));
    },

    /**
     * Adjusts constructor parameters without changing previous settings
     * for any option not specified
     *
     * Analogous to React.js's setProps
     */
    update: function(options) {
        var self = this;
        var graphie = self.graphie;
        var state = _.extend(
            self.state,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options)
        );

        assert(kpoint.is(state.coord));

        // Default things inside the state.normalStyle object, because
        // _.extend is not deep.
        // We use _.extend instead of _.defaults because we don't want
        // to modify the passed-in copy (especially if it's from
        // DEFAULT_PROPS/STATE!)
        var normalColor = (state.static) ? KhanUtil.DYNAMIC
                                         : KhanUtil.INTERACTIVE;
        state.normalStyle = _.extend({
            fill: normalColor,
            stroke: normalColor,
            scale: 1
        }, state.normalStyle);

        state.highlightStyle = _.extend({
            fill: KhanUtil.INTERACTING,
            stroke: KhanUtil.INTERACTING,
            scale: 2
        }, state.highlightStyle);

        if (!state.static) {
            // the invisible shape in front of the point that gets mouse events
            if (!state.mouseTarget) {
                state.mouseTarget = graphie.mouselayer.circle(
                    graphie.scalePoint(self.state.coord)[0],
                    graphie.scalePoint(self.state.coord)[1],
                    15
                );
                state.mouseTarget.attr({fill: "#000", opacity: 0.0});
            }
        }

        // The starting coord of any move, sent to onMoveEnd as the previous
        // value
        var startCoord = state.coord;

        // The Movable representing this movablePoint's representation
        // This handles mouse events for us, which we propagate in
        // onMove
        self.movable.modify(_.extend({}, state, {
            add: null,
            modify: null,
            draw: self.draw.bind(self),
            remove: null,
            onMoveStart: function() {
                state.hasMoved = false;
                startCoord = state.coord;
                self._fireEvent(state.onMoveStart, startCoord, startCoord);
                self.draw();
            },
            onMove: function(coord) {
                // The caller has the option of adding an onMove() method to the
                // movablePoint object we return as a sort of event handler
                // By returning false from onMove(), the move can be vetoed,
                // providing custom constraints on where the point can be moved.
                // By returning array [x, y], the move can be overridden

                var result = self._applyConstraints(coord, state.coord);
                if (result === false) {
                    return;
                } else if (kpoint.is(result)) {
                    coord = result;
                }
                if (!kpoint.equal(coord, state.coord)) {
                    var prevCoord = state.coord;
                    state.coord = coord;
                    state.hasMoved = true;
                    self._fireEvent(state.onMove, state.coord, prevCoord);
                    self.draw();
                }
            },
            onMoveEnd: function() {
                if (self.isHovering() && !state.hasMoved) {
                    self._fireEvent(state.onClick, state.coord, startCoord);
                }
                self._fireEvent(state.onMoveEnd, state.coord, startCoord);
                state.hasMoved = false;
                self.draw();
            }
        }));

        // Trigger an add event if this hasn't been added before
        if (!state.added) {
            self.prevState = {};
            self._fireEvent(state.add, self.cloneState(), self.prevState);
            state.added = true;

            // Update the state for `added` and in case the add event
            // changed it
            self.prevState = self.cloneState();
        }

        // Trigger a modify event
        self._fireEvent(state.modify, self.cloneState(), self.prevState);
    },

    remove: function() {
        this.state.added = false;
        this._fireEvent(this.state.remove);
        if (this.movable) {
            this.movable.remove();
        }
        // TODO(jack): This should really be moved off of
        // movablePoint.state and only kept on movable.state
        this.state.mouseTarget = null;
    },

    constrain: function() {
        var result = this._applyConstraints(this.coord(), this.coord());
        if (kpoint.is(result)) {
            this.setCoord(result);
        }
        return result !== false;
    },

    setCoord: function(coord) {
        assert(kpoint.is(coord, 2));
        this.state.coord = _.clone(coord);
        this.draw();
    },

    setCoordConstrained: function(coord) {
        assert(kpoint.is(coord, 2));
        var result = this._applyConstraints(coord, coord);
        this.state.coord = _.clone(result);
        this.draw();
    },

    // Clone these for use with raphael, which modifies the input
    // style parameters
    normalStyle: function() {
        return _.clone(this.state.normalStyle);
    },

    highlightStyle: function() {
        return _.clone(this.state.highlightStyle);
    },

    // Change z-order to back
    toBack: function() {
        this.movable.toBack();
        if (this.state.visibleShape) {
            this.state.visibleShape.toBack();
        }
    },

    // Change z-order to front
    toFront: function() {
        if (this.state.visibleShape) {
            this.state.visibleShape.toFront();
        }
        this.movable.toFront();
    },

    /**
     * Forwarding methods to this.movable:
     */
    isHovering: function() {
        return this.movable.isHovering();
    },

    isDragging: function() {
        return this.movable.isDragging();
    },

    mouseTarget: function() {
        return this.movable.mouseTarget();
    },

    grab: function() {
        this.movable.grab();
    }
});

module.exports = MovablePoint;

},{"./interactive-util.js":149,"./movable-point-options.js":153,"./objective_.js":156}],155:[function(require,module,exports){
/**
 * Movable
 *
 * A Movable Something, that sends onMove events based on the
 * mouse coordinate (graphie unscaled, non-pixel-value) of the
 * move.
 *
 * Other MovableThings should generally have a Movable field, and
 * let this class handle all of the virtual mouse events, and then
 * take appropriate action in onMoveStart, onMove, onMoveEnd
 */

var InteractiveUtil = require("./interactive-util.js");
var normalizeOptions = InteractiveUtil.normalizeOptions;

var assert = InteractiveUtil.assert;
var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

// state parameters that should be converted into an array of
// functions
var FUNCTION_ARRAY_OPTIONS = [
    "add",
    "modify",
    "draw",
    "remove",
    "onMoveStart",
    "onMove",
    "onMoveEnd",
    "onClick"
];

// Default "props" and "state". Both are added to this.state and
// receive magic getter methods (this.isHovering() etc).
// However, properties in DEFAULT_PROPS are updated on `modify()`,
// while those in DEFAULT_STATE persist and are not updated.
// Things that the user might want to change should be on "props",
// while things used to render the movable should be on "state".
var DEFAULT_PROPS = {
    cursor: null
};
var DEFAULT_STATE = {
    added: false,
    isHovering: false,
    isMouseOver: false,
    isDragging: false,
    mouseTarget: null
};

var Movable = function(graphie, options) {
    _.extend(this, {
        graphie: graphie,
        state: {
            // Set here because this must be unique for each instance
            id: _.uniqueId("movable")
        }
    });

    // We only set DEFAULT_STATE once, here
    this.modify(_.extend({}, DEFAULT_STATE, options));
};

InteractiveUtil.createGettersFor(Movable, _.extend({},
    DEFAULT_PROPS,
    DEFAULT_STATE
));
InteractiveUtil.addMovableHelperMethodsTo(Movable);

_.extend(Movable.prototype, {

    cloneState: function() {
        return _.clone(this.state);
    },

    _createDefaultState: function() {
        return _.extend({
            id: this.state.id,
            add: [],
            modify: [],
            draw: [],
            remove: [],
            onMoveStart: [],
            onMove: [],
            onMoveEnd: [],
            onClick: []

        // We only update props here, because we want things on state to
        // be persistent, and updated appropriately in modify()
        }, DEFAULT_PROPS);
    },

    /**
     * Resets the object to its state as if it were constructed with
     * `options` originally. The only state maintained is `state.id`
     *
     * Analogous to React.js's replaceProps
     */
    modify: function(options) {
        this.update(_.extend({}, this._createDefaultState(), options));
    },

    /**
     * Simulates a mouse grab event on the movable object.
     */
    grab: function(coord) {
        assert(kpoint.is(coord));
        var self = this;
        var graphie = self.graphie;
        var state = self.state;

        state.isHovering = true;
        state.isDragging = true;
        graphie.isDragging = true;

        var startMouseCoord = coord;
        var prevMouseCoord = startMouseCoord;
        self._fireEvent(
            state.onMoveStart,
            startMouseCoord,
            startMouseCoord
        );

        var moveHandler = function(e) {
            e.preventDefault();

            var mouseCoord = graphie.getMouseCoord(e);
            self._fireEvent(
                state.onMove,
                mouseCoord,
                prevMouseCoord
            );
            self.draw();
            prevMouseCoord = mouseCoord;
        };

        var upHandler = function(e) {
            $(document).unbind("vmousemove", moveHandler);
            $(document).unbind("vmouseup", upHandler);
            if (state.isHovering) {
                self._fireEvent(
                    state.onClick,
                    prevMouseCoord,
                    startMouseCoord
                );
            }
            state.isHovering = self.state.isMouseOver;
            state.isDragging = false;
            graphie.isDragging = false;
            self._fireEvent(
                state.onMoveEnd,
                prevMouseCoord,
                startMouseCoord
            );
            self.draw();
        };

        $(document).bind("vmousemove", moveHandler);
        $(document).bind("vmouseup", upHandler);
    },

    /**
     * Adjusts constructor parameters without changing previous settings
     * for any option not specified
     *
     * Analogous to React.js's setProps
     */
    update: function(options) {
        var self = this;
        var graphie = self.graphie;

        var prevState = self.cloneState();
        var state = _.extend(
            self.state,
            normalizeOptions(FUNCTION_ARRAY_OPTIONS, options)
        );

        // the invisible shape in front of the point that gets mouse events
        if (state.mouseTarget && !prevState.mouseTarget) {
            var $mouseTarget = $(state.mouseTarget[0]);

            var isMouse = !('ontouchstart' in window);

            if (isMouse) {
                $mouseTarget.on("vmouseover", function() {
                    state.isMouseOver = true;
                    if (!graphie.isDragging) {
                        state.isHovering = true;
                    }
                    if (self.state.added) {
                        // Avoid drawing if the point has been removed
                        self.draw();
                    }
                });

                $mouseTarget.on("vmouseout", function() {
                    state.isMouseOver = false;
                    if (!state.isDragging) {
                        state.isHovering = false;
                    }
                    if (self.state.added) {
                        // Avoid drawing if the point has been removed
                        self.draw();
                    }
                });
            }

            $mouseTarget.on("vmousedown", function(e) {
                if (e.which !== 0 && e.which !== 1) {
                    return;
                }
                e.preventDefault();

                var mouseCoord = graphie.getMouseCoord(e);
                self.grab(mouseCoord);
            });
        }

        if (state.mouseTarget && state.cursor !== undefined) {
            // "" removes the css cursor if state.cursor is null
            $(state.mouseTarget[0]).css("cursor", state.cursor || "");
        }


        // Trigger an add event if this hasn't been added before
        if (!state.added) {
            self._fireEvent(state.modify, self.cloneState(), {});
            state.added = true;

            // Update the state for `added` and in case the add event
            // changed it
            self.prevState = self.cloneState();
        }

        // Trigger a modify event
        self._fireEvent(state.modify, self.cloneState(), self.prevState);
    },

    remove: function() {
        this.state.added = false;
        this._fireEvent(this.state.remove);
        if (this.state.mouseTarget) {
            $(this.state.mouseTarget).off();
            this.state.mouseTarget.remove();
            this.state.mouseTarget = null;
        }
    },

    // Change z-order to back
    toBack: function() {
        if (this.state.mouseTarget) {
            this.state.mouseTarget.toBack();
        }
    },

    // Change z-order to front
    toFront: function() {
        if (this.state.mouseTarget) {
            this.state.mouseTarget.toFront();
        }
    }
});

module.exports = Movable;

},{"./interactive-util.js":149}],156:[function(require,module,exports){
/**
 * A work-in-progress of _ methods for objects.
 * That is, they take an object as a parameter,
 * and return an object instead of an array.
 */

/* Does a pluck on keys inside objects in an object
 *
 * Ex:
 * tools = {
 *     translation: {
 *         enabled: true
 *     },
 *     rotation: {
 *         enabled: false
 *     }
 * };
 * pluckObject(tools, "enabled") returns {
 *     translation: true
 *     rotation: false
 * }
 */
var pluck = exports.pluck = function(table, subKey) {
    return _.object(_.map(table, function(value, key) {
        return [key, value[subKey]];
    }));
};

},{}],157:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var AnswerAreaEditor = require("./answer-area-editor.jsx");
var Editor = require("./editor.jsx");
var ITEM_DATA_VERSION = require("./version.json").itemDataVersion;

var ItemEditor = React.createClass({displayName: 'ItemEditor',
    propTypes: {
        imageUploader: React.PropTypes.func,
        wasAnswered: React.PropTypes.bool,
        gradeMessage: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            onChange: function()  {},
            question: {},
            answerArea: {}
        };
    },

    // Notify the parent that the question or answer area has been updated.
    updateProps: function(newProps, cb) {
        var props = _(this.props).pick("question", "answerArea");
        this.props.onChange(_(props).extend(newProps), cb);
    },

    render: function() {
        return React.DOM.div( {className:"perseus-editor-table"}, 
            React.DOM.div( {className:"perseus-editor-row perseus-question-container"}, 
                React.DOM.div( {className:"perseus-editor-left-cell"}, 
                    React.DOM.div( {className:"pod-title"}, "Question"),
                    Editor(_.extend({
                        ref: "questionEditor",
                        placeholder: "Type your question here...",
                        className: "perseus-question-editor",
                        imageUploader: this.props.imageUploader,
                        onChange: function(newProps, cb)  {
                            var question = _.extend({},
                                    this.props.question, newProps);
                            this.updateProps({question: question}, cb);
                        }.bind(this)
                    }, this.props.question))
                ),

                React.DOM.div( {className:"perseus-editor-right-cell"}, 
                    React.DOM.div( {id:"problemarea"}, 
                        React.DOM.div( {id:"workarea", className:"workarea"} ),
                        React.DOM.div( {id:"hintsarea",
                             className:"hintsarea",
                             style:{display: "none"}} )
                    )
                )
            ),

            React.DOM.div( {className:"perseus-editor-row perseus-answer-container"}, 
                React.DOM.div( {className:"perseus-editor-left-cell"}, 
                    React.DOM.div( {className:"pod-title"}, "Answer"),
                    AnswerAreaEditor(_.extend({
                        ref: "answerAreaEditor",
                        onChange: function(newProps, cb)  {
                            var answerArea = _.extend({},
                                    this.props.answerArea, newProps);
                            this.updateProps({answerArea: answerArea}, cb);
                        }.bind(this)
                    }, this.props.answerArea))
                ),

                React.DOM.div( {className:"perseus-editor-right-cell"}, 
                    React.DOM.div( {id:"answer_area"}, 
                        React.DOM.span( {id:"examples-show", style:{display: "none"}}, 
                            ' ',"Acceptable formats",' '
                        ),
                        React.DOM.div( {id:"solutionarea", className:"solutionarea"} ),
                        React.DOM.div( {className:"answer-buttons"}, 
                            React.DOM.input(
                                {type:"button",
                                className:"simple-button green",
                                onClick:this.props.onCheckAnswer,
                                value:"Check Answer"} ),
                            this.props.wasAnswered &&
                                React.DOM.img( {src:"/images/face-smiley.png",
                                    className:"smiley"} ),
                            this.props.gradeMessage &&
                                React.DOM.span(null, this.props.gradeMessage)
                        )
                    )
                )
            )
        );
    },

    toJSON: function(skipValidation) {
        return {
            question: this.refs.questionEditor.toJSON(skipValidation),
            answerArea: this.refs.answerAreaEditor.toJSON(skipValidation),
            itemDataVersion: ITEM_DATA_VERSION
        };
    },

    focus: function() {
        this.questionEditor.focus();
    }
});

module.exports = ItemEditor;

},{"./answer-area-editor.jsx":118,"./editor.jsx":143,"./version.json":169,"react":115}],158:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var AnswerAreaRenderer = require("./answer-area-renderer.jsx");
var HintRenderer = require("./hint-renderer.jsx");
var Renderer = require("./renderer.jsx");
var Util = require("./util.js");
var ApiOptions = require("./perseus-api.jsx").Options;
var EnabledFeatures = require("./enabled-features.jsx");

var HintsRenderer = React.createClass({displayName: 'HintsRenderer',
    render: function() {
        var hintsVisible = this.props.hintsVisible;
        var hints = this.props.hints
            .slice(0, hintsVisible === -1 ? undefined : hintsVisible)
            .map(function(hint, i) {
                var shouldBold = i === this.props.hints.length - 1 &&
                                 !(/\*\*/).test(hint.content);
                return HintRenderer(
                            {bold:shouldBold,
                            hint:hint,
                            key:"hintRenderer" + i,
                            enabledFeatures:this.props.enabledFeatures,
                            apiOptions:this.props.apiOptions} );
            }, this);

        return React.DOM.div(null, hints);
    }
});

var highlightedWidgets = function(widgetList) 
    {return _.filter(widgetList, Util.widgetShouldHighlight);};

var ItemRenderer = React.createClass({displayName: 'ItemRenderer',
    getDefaultProps: function() {
        return {
            initialHintsVisible: 0,

            // TODO(joel) - handle this differently. Pass around nodes or
            // something half reasonable.
            workAreaSelector: "#workarea",
            solutionAreaSelector: "#solutionarea",
            hintsAreaSelector: "#hintsarea",

            enabledFeatures: {},  // a deep default is done in `this.update()`
            apiOptions: {}  // likewise ^
        };
    },

    getInitialState: function() {
        return {
            hintsVisible: this.props.initialHintsVisible,
            questionCompleted: false,
            questionHighlightedWidgets: [],
            answerHighlightedWidgets: []
        };
    },

    componentWillReceiveProps: function(nextProps) {
        this.setState({
            questionHighlightedWidgets: [],
            answerHighlightedWidgets: []
        });
    },

    componentDidMount: function() {
        if (Khan.scratchpad) {
            Khan.scratchpad.enable();
        }
        this._currentFocus = {
            path: null,
            element: null
        };
        this.update();
    },

    componentDidUpdate: function() {
        this.update();
    },

    update: function() {
        var enabledFeatures = _.extend(
            {},
            EnabledFeatures.defaults,
            this.props.enabledFeatures
        );

        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions,
            {
                onFocusChange: this._handleFocusChange
            }
        );

        // Since the item renderer works by rendering things into three divs
        // that have completely different places in the DOM, we have to do this
        // strangeness instead of relying on React's normal render() method.
        // TODO(alpert): Figure out how to clean this up somehow
        this.questionRenderer = React.renderComponent(
                Renderer(_.extend({
                    problemNum: this.props.problemNum,
                    onInteractWithWidget: this.handleInteractWithWidget,
                    highlightedWidgets: this.state.questionHighlightedWidgets,
                    enabledFeatures: enabledFeatures,
                    apiOptions: apiOptions,
                    questionCompleted: this.state.questionCompleted
                }, this.props.item.question)),
                document.querySelector(this.props.workAreaSelector));

        this.answerAreaRenderer = React.renderComponent(
                AnswerAreaRenderer({
                    type: this.props.item.answerArea.type,
                    options: this.props.item.answerArea.options,
                    calculator: this.props.item.answerArea.calculator || false,
                    problemNum: this.props.problemNum,
                    onInteractWithWidget: this.handleInteractWithAnswerWidget,
                    highlightedWidgets: this.state.answerHighlightedWidgets,
                    enabledFeatures: enabledFeatures,
                    apiOptions: apiOptions
                }),
                document.querySelector(this.props.solutionAreaSelector));

        this.hintsRenderer = React.renderComponent(
                HintsRenderer({
                    hints: this.props.item.hints,
                    hintsVisible: this.state.hintsVisible,
                    enabledFeatures: enabledFeatures,
                    apiOptions: apiOptions
                }),
                document.querySelector(this.props.hintsAreaSelector));
    },

    _handleFocusChange: function(newFocus, oldFocus) {
        if (newFocus.path != null) {
            this._setCurrentFocus(newFocus);
        } else {
            this._onRendererBlur(oldFocus);
        }
    },

    // Sets the current focus path and element and
    // send an onChangeFocus event back to our parent.
    _setCurrentFocus: function(newFocus) {
        // By the time this happens, newFocus.path cannot be a prefix of
        // prevFocused.path, since we must have either been called from
        // an onFocusChange within a renderer, which is only called when
        // this is not a prefix, or between the question and answer areas,
        // which can never prefix each other.
        var prevFocus = this._currentFocus;
        this._currentFocus = newFocus;
        if (this.props.apiOptions.onFocusChange != null) {
            this.props.apiOptions.onFocusChange(this._currentFocus, prevFocus);
        }
    },

    _onRendererBlur: function(oldFocus) {
        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        _.defer(function()  {
            if (_.isEqual(this._currentFocus.path, oldFocus.path)) {
                this._setCurrentFocus({path: null, element: null});
            }
        }.bind(this));
    },

    /**
     * Accepts a question area widgetId, or an answer area widgetId of
     * the form "answer-input-number 1", or the string "answer-area"
     * for the whole answer area (if the answer area is a single widget).
     */
    _setWidgetProps: function(widgetId, newProps, callback) {
        var maybeAnswerAreaWidget = widgetId.match(/^answer-(.*)$/);

        if (maybeAnswerAreaWidget) {
            var answerAreaWidgetId = maybeAnswerAreaWidget[1];
            this.answerAreaRenderer._setWidgetProps(
                answerAreaWidgetId,
                newProps,
                callback
            );
        } else {
            this.questionRenderer._setWidgetProps(
                widgetId,
                newProps,
                callback
            );
        }
    },

    setInputValue: function(inputWidgetId, newValue, focus) {
        // TODO(jack): This is a hack to allow for a consistent format
        // between this and onFocusChange. Remove when we're no longer
        // using widget ids in our api
        if (_.isArray(inputWidgetId)) {
            inputWidgetId = inputWidgetId[0];
        }
        // TODO(jack): change this to value: when we change input-number/
        // expression's prop to be value
        // TODO(jack): As the code below demonstrates, this whole
        // implementation is a horrible, horrible hack, and should be
        // changed so that the widget can handle setting this "value"
        // itself
        var newProps;
        if (/expression /.test(inputWidgetId)) {
            newProps = {value: newValue};
        } else if (inputWidgetId === "answer-area") {
            // If it's the answer area, do both! #yolo
            // (maybe it's an input-number, maybe it's an expression)
            // TODO(jack): Fix this.
            newProps = {
                currentValue: newValue,
                value: newValue
            };
        } else {
            newProps = {currentValue: newValue};
        }
        this._setWidgetProps(inputWidgetId, newProps, function()  {return focus;});
    },

    handleInteractWithWidget: function(widgetId) {
        var withRemoved = _.difference(this.state.questionHighlightedWidgets,
                                       [widgetId]);
        this.setState({
            questionCompleted: false,
            questionHighlightedWidgets: withRemoved
        });
    },

    handleInteractWithAnswerWidget: function(widgetId) {
        var withRemoved = _.difference(this.state.answerHighlightedWidgets,
                                       [widgetId]);
        this.setState({
            answerHighlightedWidgets: withRemoved
        });
    },

    render: function() {
        return React.DOM.div(null );
    },

    focus: function() {
        return this.questionRenderer.focus() ||
                this.answerAreaRenderer.focus();
    },

    componentWillUnmount: function() {
        React.unmountComponentAtNode(
                document.querySelector(this.props.workAreaSelector));
        React.unmountComponentAtNode(
                document.querySelector(this.props.solutionAreaSelector));
        React.unmountComponentAtNode(
                document.querySelector(this.props.hintsAreaSelector));
    },

    showHint: function() {
        if (this.state.hintsVisible < this.getNumHints()) {
            this.setState({
                hintsVisible: this.state.hintsVisible + 1
            });
        }
    },

    getNumHints: function() {
        return this.props.item.hints.length;
    },

    scoreInput: function() {
        var qGuessAndScore = this.questionRenderer.guessAndScore();
        var aGuessAndScore = this.answerAreaRenderer.guessAndScore();

        var qGuess = qGuessAndScore[0], qScore = qGuessAndScore[1];
        var aGuess = aGuessAndScore[0], aScore = aGuessAndScore[1];

        var emptyQuestionAreaWidgets = this.questionRenderer.emptyWidgets();
        var emptyAnswerAreaWidgets = this.answerAreaRenderer.emptyWidgets();
        this.setState({
            questionHighlightedWidgets: emptyQuestionAreaWidgets,
            answerHighlightedWidgets: emptyAnswerAreaWidgets
        });

        var guess, score;
        if (qGuess.length === 0) {
            // No widgets in question. For compatability with old guess format,
            // leave it out here completely.
            guess = aGuess;
            score = aScore;
        } else {
            guess = [qGuess, aGuess];
            score = Util.combineScores(qScore, aScore);
        }

        if (score.type === "points") {
            var correct = score.earned >= score.total;
            this.setState({ questionCompleted: correct });
            return {
                empty: false,
                correct: correct,
                message: score.message,
                guess: guess
            };
        } else if (score.type === "invalid") {
            this.setState({ questionCompleted: false });
            return {
                empty: true,
                correct: false,
                message: score.message,
                guess: guess
            };
        }
    }
});

module.exports = ItemRenderer;

},{"./answer-area-renderer.jsx":119,"./enabled-features.jsx":144,"./hint-renderer.jsx":146,"./perseus-api.jsx":162,"./renderer.jsx":165,"./util.js":168,"react":115}],159:[function(require,module,exports){
/** @jsx React.DOM */
/**
 * Changeable
 *
 * Adds a this.change() function to a component
 *
 * This.change takes prop changes as parameters, and calls
 * this.props.onChange with the modified props.
 */

var WIDGET_PROP_BLACKLIST = require("./widget-prop-blacklist.jsx");

var USAGE = "Usage:\n" +
            "  this.change({propName: 5}, callback);\n" +
            "  this.change(\"propName\", 5, callback);\n" +
            "  this.change(\"propName\")";

/**
 * Primary helper function for this.change()
 *
 * Takes the parameters in a consistent style, once this.change() has
 * figured out which way it was called.
 */
var _changeMultiple = function(component, newProps, callback) {
    // Omit "default" props:
    // ref and key come from react, and don't actually represent
    //   the conceptual state of our component
    // onChange comes from our parent to allow this modification,
    //   and doesn't conceptually represent the state of our component
    var currProps = _.omit(component.props, WIDGET_PROP_BLACKLIST);
    var nextProps = _.extend(currProps, newProps);
    component.props.onChange(nextProps, callback);
};

/**
 * Helper function for changing a single prop
 */
var _changeSingle = function(component, propName, value, callback) {
    if (value === undefined) {
        // If called with a single prop name, return a lambda to change
        // a single prop on the current object
        return _.partial(_changeSingle, component, propName);
    } else {
        // If called with two values, change a single prop of the
        // current object
        var newProps = {};
        newProps[propName] = value;
        _changeMultiple(component, newProps, callback);
    }
};

/**
 * this.change()
 *
 * Can be called as follows:
 * this.change(newProps, callback);
 *
 * this.change(propName, propValue, callback);
 *
 * this.change(propName) -> returns a lambda that takes a prop value to
 * set and a callback to call after having set that value.
 */
var change = function(newPropsOrSinglePropName,
                      propValue,
                      callback) {

    if (_.isObject(newPropsOrSinglePropName) &&
            callback === undefined) {
        // Called with an object of multiple props to change
        callback = propValue;
        return _changeMultiple(
            this,
            newPropsOrSinglePropName,  // object newProps
            callback
        );

    } else if (_.isString(newPropsOrSinglePropName)) {
        // Called with a string propName of a single prop to change
        return _changeSingle(
            this,
            newPropsOrSinglePropName,  // string propName
            propValue,
            callback
        );

    } else {
        throw new Error("Invalid types sent to this.change(): " +
                _.toArray(arguments).join() + "\n" + USAGE);
    }
};

var Changeable = {
    propTypes: {
        onChange: React.PropTypes.func.isRequired
    },
    change: change
};

module.exports = Changeable;

},{"./widget-prop-blacklist.jsx":161}],160:[function(require,module,exports){
/** @jsx React.DOM */var WIDGET_PROP_BLACKLIST = require("./widget-prop-blacklist.jsx");

var JsonifyProps = {
    toJSON: function() {
        // Omit props that get passed to all widgets
        return _.omit(this.props, WIDGET_PROP_BLACKLIST);
    }
};

module.exports = JsonifyProps;

},{"./widget-prop-blacklist.jsx":161}],161:[function(require,module,exports){
/** @jsx React.DOM */module.exports = [
    // standard props "added" by react
    // (technically the renderer still adds them)
    "key",
    "ref",
    // added by src/renderer.jsx
    "widgetId",
    "onChange",
    "problemNum",
    "enabledFeatures",
    "apiOptions"
];

},{}],162:[function(require,module,exports){
/** @jsx React.DOM *//**
 * [Most of] the Perseus client API.
 *
 * If making a change to this file, or otherwise to the perseus
 * API, you should increment:
 *  * the perseus api major version if it is a breaking change
 *  * the perseus api minor version if it is an additive-only change
 *  * nothing if it is purely a bug fix.
 *
 * Callbacks passed to Renderer/ItemRenderer:
 *  * interceptInputFocus:
 *    When non-null, inputs will not receive focus events,
 *    but instead this function will be called
 *  * onInputError:
 *    Called when there is an error grading a widget
 *  * onFocusChange: (newFocus, oldFocus)
 *    Called when the user focus changes. Each parameter is an object
 *    containing two fields, `path` and `element`.
 *    `path` is an array uniquely identifying the input to perseus
 *    `element` is a DOM element representing the area covered by
 *    the input (but is not necessarily an `<input>` element).
 *    When focus changes to or from nothing being selected, `path`
 *    will be null.
 *
 * Stable CSS ClassNames:
 * These are css class names that will continue to preserve their
 * semantic meaning across the same perseus api major version.
 */
module.exports = {
    Options: {
        propTypes: React.PropTypes.shape({
            fancyDropdowns: React.PropTypes.bool.isRequired,
            interceptInputFocus: React.PropTypes.func,
            onInputError: React.PropTypes.func.isRequired,
            onFocusChange: React.PropTypes.func.isRequired,
            staticRender: React.PropTypes.bool.isRequired
        }).isRequired,

        defaults: {
            fancyDropdowns: false,
            interceptInputFocus: null,
            onInputError: function() { },
            onFocusChange: function() { },
            staticRender: false
        }
    },
    ClassNames: {
        INPUT: "perseus-input",
        FOCUSED: "perseus-focused",
        RADIO: {
            OPTION: "perseus-radio-option",
            SELECTED: "perseus-radio-selected",
            OPTION_CONTENT: "perseus-radio-option-content"
        }
    }
};


},{}],163:[function(require,module,exports){
require("./all-widgets.js");

var version = require("./version.json");

module.exports = {
    apiVersion:         version.apiVersion,
    itemDataVersion:    version.itemDataVersion,
    init:               require("./init.js"),
    AnswerAreaRenderer: require("./answer-area-renderer.jsx"),
    Editor:             require("./editor.jsx"),
    EditorPage:         require("./editor-page.jsx"),
    ItemRenderer:       require("./item-renderer.jsx"),
    Renderer:           require("./renderer.jsx"),
    RevisionDiff:       require("./diffs/revision-diff.jsx"),
    StatefulEditorPage: require("./stateful-editor-page.jsx"),
    ClassNames:         require("./perseus-api.jsx").ClassNames,
    Util:               require("./util.js")
};

},{"./all-widgets.js":117,"./answer-area-renderer.jsx":119,"./diffs/revision-diff.jsx":136,"./editor-page.jsx":142,"./editor.jsx":143,"./init.js":147,"./item-renderer.jsx":158,"./perseus-api.jsx":162,"./renderer.jsx":165,"./stateful-editor-page.jsx":166,"./util.js":168,"./version.json":169}],164:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var cx = React.addons.classSet;

var QuestionParagraph = React.createClass({displayName: 'QuestionParagraph',
    render: function() {
        return React.DOM.div( {className:"paragraph"}, 
            this.props.children
        );
    }
});

module.exports = QuestionParagraph;

},{"react":115}],165:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var TeX = require("./tex.jsx");
var WidgetContainer = require("./widget-container.jsx");
var Widgets = require("./widgets.js");
var QuestionParagraph = require("./question-paragraph.jsx");

var Util = require("./util.js");
var EnabledFeatures = require("./enabled-features.jsx");
var ApiOptions = require("./perseus-api.jsx").Options;

var mapObject = function(obj, lambda) {
    var result = {};
    _.each(_.keys(obj), function(key) {
        result[key] = lambda(obj[key], key);
    });
    return result;
};

var specialChars = {
    // escaped: original
    "\\a": "\u0007", // \a isn't valid javascript
    "\\b": "\b",
    "\\t": "\t",
    "\\n": "\n",
    "\\v": "\v",
    "\\f": "\f",
    "\\r": "\r",
    "\\\\": "\\"
};

var rEscapedChars = /\\a|\\b|\\t|\\n|\\v|\\f|\\r|\\\\/g;

if (typeof KA !== "undefined" && KA.language === "en-PT") {
    // When using crowdin's jipt (Just in place translation), we need to keep a
    // registry of crowdinId's to component so that we can update the
    // component's state as the translator enters their translation.
    window.PerseusTranslationComponents = [];

    if (!KA.jipt_dom_insert_checks) {
        KA.jipt_dom_insert_checks = [];
    }

    // We add a function that will get called whenever jipt says the dom needs
    // to be updated
    KA.jipt_dom_insert_checks.push(function(text, node, attribute) {
        var index = $(node).data("perseus-component-index");
        // We only update if we had added an index onto the node's data.
        if (node && typeof index !== "undefined") {
            var component = window.PerseusTranslationComponents[index];

            if (!component) {
                // The component has disappeared, so we tell jipt not to try
                // and insert anything
                return false;
            }
            // Jipt sends down the escaped translation, so we need to
            // unescape \\t to \t among other characters here
            text = text.replace(
                rEscapedChars,
                function(ch) {
                    return specialChars[ch];
                });

            component.setState({
                jiptContent: text
            });

            // Return false to tell jipt not to insert anything into the DOM
            // itself, otherwise it will mess up what React expects there to be
            return false;
        }
        // The string updated wasn't part of perseus, so we tell jipt to just
        // insert the translation as-is.
        return text;
    });
}

var SHOULD_CLEAR_WIDGETS_PROP_LIST = [
    "content",
    "problemNum",
    "widgets"
];

// Check if one focus path / id path is a prefix of another
// The focus path null will never be a prefix of any non-null
// path, since it represents no focus.
// Otherwise, prefix is calculated by whether every array
// element in the prefix is present in the same position in the
// wholeArray path.
var isIdPathPrefix = function(prefixArray, wholeArray) {
    if (prefixArray === null || wholeArray === null) {
        return prefixArray === wholeArray;
    }
    return _.every(prefixArray, function(elem, i)  {
        return _.isEqual(elem, wholeArray[i]);
    });
};

var Renderer = React.createClass({displayName: 'Renderer',
    propTypes: {
        highlightedWidgets: React.PropTypes.array,
        enabledFeatures: EnabledFeatures.propTypes,
        apiOptions: React.PropTypes.object,
        questionCompleted: React.PropTypes.bool,
        onInteractWithWidget: React.PropTypes.func
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(_.pick(this.props, SHOULD_CLEAR_WIDGETS_PROP_LIST),
                       _.pick(nextProps, SHOULD_CLEAR_WIDGETS_PROP_LIST))) {
            this.setState(this._getInitialWidgetState(nextProps));
        }
    },

    getDefaultProps: function() {
        return {
            content: "",
            widgets: {},
            ignoreMissingWidgets: false,
            highlightedWidgets: [],
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: {},  // we'll do a deep defaults in render()
            // onRender may be called multiple times per render, for example
            // if there are multiple images or TeX pieces within `content`.
            // It is a good idea to debounce any functions passed here.
            questionCompleted: false,
            onRender: function() {},
            onInteractWithWidget: function() {}
        };
    },

    getInitialState: function() {
        return _.extend({
            jiptContent: null
        }, this._getInitialWidgetState());
    },

    _getInitialWidgetState: function(props) {
        props = props || this.props;
        var allWidgetInfo = this._getAllWidgetsInfo(props);
        return {
            widgetInfo: allWidgetInfo,
            widgetProps: this._getAllWidgetsStartProps(allWidgetInfo),
        };
    },

    _getAllWidgetsInfo: function(props) {
        props = props || this.props;
        return mapObject(props.widgets, function(widgetInfo, widgetId)  {
            if (!widgetInfo.type) {
                var type = widgetId.split(" ")[0];
                widgetInfo = _.extend({}, widgetInfo, {
                    type: type
                });
            }
            return Widgets.upgradeWidgetInfoToLatestVersion(widgetInfo);
        });
    },

    _getAllWidgetsStartProps: function(allWidgetInfo) {
        return mapObject(allWidgetInfo, function(editorProps)  {
            return Widgets.getRendererPropsForWidgetInfo(_.extend({
                problemNum: this.props.problemNum
            }, editorProps));
        }.bind(this));
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        var stateChanged = !_.isEqual(this.state, nextState);
        var propsChanged = !_.isEqual(this.props, nextProps);
        return propsChanged || stateChanged;
    },

    getPiece: function(saved, /* output */ widgetIds, apiOptions) {
        if (saved.charAt(0) === "@") {
            // Just text
            return saved;
        } else if (saved.charAt(0) === "$") {
            // Math
            var tex = saved.slice(1, saved.length - 1);
            return TeX( {onRender:this.props.onRender}, tex);
        } else if (saved.charAt(0) === "[") {
            // Widget
            var match = Util.rWidgetParts.exec(saved);
            var id = match[1];
            var implied_type = match[2];

            var widgetInfo = this.state.widgetInfo[id];
            if (widgetInfo || this.props.ignoreMissingWidgets) {
                // TODO(jack): Remove this input/output parameter
                widgetIds.push(id);

                var type = (widgetInfo || {}).type || implied_type;
                var cls = Widgets.getWidget(type, this.props.enabledFeatures);
                var widgetProps = this.state.widgetProps[id] || {};
                var shouldHighlight = _.contains(
                    this.props.highlightedWidgets,
                    id
                );

                return WidgetContainer(
                    {shouldHighlight:shouldHighlight}, 
                    cls(_.extend({}, widgetProps, {
                            ref: id,
                            widgetId: id,
                            problemNum: this.props.problemNum,
                            enabledFeatures: this.props.enabledFeatures,
                            apiOptions: apiOptions,
                            questionCompleted: this.props.questionCompleted,
                            onFocus: _.partial(this._onWidgetFocus, id),
                            onBlur: _.partial(this._onWidgetBlur, id),
                            onChange: function(newProps, cb)  {
                                this._setWidgetProps(id, newProps, cb);
                            }.bind(this)
                        })
                    )
                );
            }
        }
    },

    _onWidgetFocus: function(id, focusPath, element) {
        if (focusPath === undefined && element === undefined) {
            focusPath = [];
            element = this.refs[id].getDOMNode();
        } else {
            if (!_.isArray(focusPath)) {
                throw new Error(
                    "widget props.onFocus focusPath must be an Array, " +
                    "but was" + JSON.stringify(focusPath)
                );
            }
            if (element == null) {
                throw new Error(
                    "widget props.onFocus element was " +
                    element
                );
            }
        }
        this._setCurrentFocus([id].concat(focusPath), element);
    },

    _onWidgetBlur: function(id) {
        var blurringFocus = this._currentFocus;
        // Wait until after any new focus events fire this tick before
        // declaring that nothing is focused.
        // If a different widget was focused, we'll see an onBlur event
        // now, but then an onFocus event on a different element before
        // this callback is executed
        _.defer(function()  {
            if (_.isEqual(this._currentFocus.path, blurringFocus.path)) {
                this._setCurrentFocus(null, null);
            }
        }.bind(this));
    },

    render: function() {
        var content = this.state.jiptContent || this.props.content;

        if (typeof KA !== "undefined" && KA.language === "en-PT" &&
                this.state.jiptContent == null &&
                this.props.content.indexOf('crwdns') !== -1) {
            // Crowdin's JIPT (Just in place translation) uses a fake language
            // with language tag "en-PT" where the value of the translations
            // look like: {crwdns2657085:0}{crwdne2657085:0} where it keeps the
            // {crowdinId:ngettext variant}. We detect whether the current
            // content matches this, so we can take over rendering of
            // the perseus content as the translators interact with jipt.
            // We search for only part of the tag that crowdin uses to guard
            // against them changing the format on us. The full tag it looks
            // for can be found in https://cdn.crowdin.net/jipt/jipt.js
            // globalPhrase var.

            // If we haven't already added this component to the registry do so
            // now. showHints() may cause this component to be rerendered
            // before jipt has a chance to replace its contents, so this check
            // will keep us from adding the component to the registry a second
            // time.
            if (!this.translationIndex) {
                this.translationIndex =
                    window.PerseusTranslationComponents.push(this) - 1;
            }
            // We now need to output this tag, as jipt looks for it to be
            // able to replace it with a translation that it runs an ajax
            // call to get.  We add a data attribute with the index to the
            // Persues.TranslationComponent registry so that when jipt
            // calls its before_dom_insert we can lookup this component by
            // this attribute and render the text with markdown.
            return React.DOM.div(
                    {'data-perseus-component-index':this.translationIndex}, 
                content
            );
        }
        var self = this;
        var extracted = Renderer.extractMathAndWidgets(content);
        var markdown = extracted[0];
        var savedMath = extracted[1];
        var widgetIds = this.widgetIds = [];

        var apiOptions = _.extend(
            {},
            ApiOptions.defaults,
            this.props.apiOptions
        );

        // XXX(alpert): smartypants gets called on each text node before it's
        // added to the DOM tree, so we override it to insert the math and
        // widgets.
        var smartypants = markedReact.InlineLexer.prototype.smartypants;
        markedReact.InlineLexer.prototype.smartypants = function(text) {
            var pieces = Util.split(text, /@@(\d+)@@/g);
            for (var i = 0; i < pieces.length; i++) {
                var type = i % 2;
                if (type === 0) {
                    pieces[i] = smartypants.call(this, pieces[i]);
                } else if (type === 1) {
                    // A saved math-or-widget number
                    pieces[i] = self.getPiece(
                        savedMath[pieces[i]],
                        widgetIds,
                        apiOptions
                    );
                }
            }
            return pieces;
        };

        var wrap = function(text) {
            return QuestionParagraph(null, 
                text
            );
        };

        var tok = markedReact.Parser.prototype.tok;
        var tokLevelCount = 0;
        markedReact.Parser.prototype.tok = function() {
            tokLevelCount++;
            var result;
            var text = tok.call(this);
            if (tokLevelCount === 1 && (!_.isArray(text) || text.length)) {
                result = wrap(text);
            } else {
                result = text;
            }
            tokLevelCount--;
            return result;
        };

        try {
            return React.DOM.div(null, markedReact(markdown));
        } finally {
            markedReact.InlineLexer.prototype.smartypants = smartypants;
            markedReact.Parser.prototype.tok = tok;
        }
    },

    handleRender: function() {
        var onRender = this.props.onRender;

        var $images = $(this.getDOMNode()).find("img");
        var imageAttrs = this.props.images || {};

        // TODO(jack): Weave this into the rendering in markedReact by passing
        // a function for how to render images, which reads this data
        // (probably part of a larger marked refactor to take all rendering
        // methods via parameters)
        _.map(_.toArray($images), function(image, i)  {
            var $image = $(image);
            var src = $image.attr('src');
            var attrs = imageAttrs[src];
            if (attrs) {
                $image.attr(attrs);
            }
        });

        // Fire callback on image load...
        // TODO (jack): make this call happen exactly once through promises!
        $images.on("load", onRender);

        // ...as well as right now (non-image, non-TeX or image from cache)
        onRender();
    },

    componentDidMount: function() {
        this.handleRender();
        this._currentFocus = {
            path: null,
            element: null
        };
    },

    componentDidUpdate: function() {
        this.handleRender();
    },

    componentWillUnmount: function() {
        if (this.translationIndex != null) {
            window.PerseusTranslationComponents[this.translationIndex] = null;
        }
    },

    // Sets the current focus path and element
    // If the new focus path is not a prefix of the old focus path,
    // we send an onChangeFocus event back to our parent.
    _setCurrentFocus: function(path, element) {
        // We don't do this when the new path is a prefix because
        // that prefix is already focused (we're just in a more specific
        // area of it). This makes it safe to call _setCurrentFocus
        // whenever a widget is interacted with--we won't wipe out
        // our focus state if we are already focused on a subpart
        // of that widget (i.e. a transformation NumberInput inside
        // of a transformer widget).
        if (!isIdPathPrefix(path, this._currentFocus.path)) {
            var prevFocus = this._currentFocus;
            this._currentFocus = {
                path: path,
                element: element
            };
            if (this.props.apiOptions.onFocusChange != null) {
                this.props.apiOptions.onFocusChange(
                    this._currentFocus,
                    prevFocus
                );
            }
        }
    },

    focus: function() {
        var id;
        var focusResult;
        for (var i = 0; i < this.widgetIds.length; i++) {
            var widgetId = this.widgetIds[i];
            var widget = this.refs[widgetId];
            var widgetFocusResult = widget.focus && widget.focus();
            if (widgetFocusResult) {
                id = widgetId;
                focusResult = widgetFocusResult;
                break;
            }
        }

        if (id) {
            // reconstruct a {path, element} focus object
            var path;
            var element;
            if (_.isObject(focusResult)) {
                // The result of focus was a {path, id} object itself
                path = [id].concat(focusResult.path || []);
                element = focusResult.element || this.refs[id].getDOMNode();
            } else {
                // The result of focus was true or the like; just
                // construct a root focus object
                path = [id];
                element = this.refs[id].getDOMNode();
            }

            this._setCurrentFocus(path, element);
            return true;
        }
    },

    toJSON: function(skipValidation) {
        var state = {};
        _.each(this.props.widgets, function(props, id) {
            var widget = this.refs[id];
            var s = widget.toJSON(skipValidation);
            if (!_.isEmpty(s)) {
                state[id] = s;
            }
        }, this);
        return state;
    },

    emptyWidgets: function () {
        return _.filter(this.widgetIds, function(id)  {
            var widgetProps = this.props.widgets[id];
            var score = this.refs[id].simpleValidate(
                widgetProps.options,
                null
            );
            return Util.scoreIsEmpty(score);
        }.bind(this));
    },

    _setWidgetProps: function(id, newProps, cb) {
        var widgetProps = _.clone(this.state.widgetProps);
        widgetProps[id] = _.extend({}, widgetProps[id], newProps);
        this.setState({widgetProps: widgetProps}, function()  {
            var cbResult = cb && cb();
            this.props.onInteractWithWidget(id);
            if (cbResult !== false) {
                // TODO(jack): For some reason, some widgets don't always end
                // up in refs here, which is repro-able if you make an
                // [[ orderer 1 ]] and copy-paste this, then change it to be
                // an [[ orderer 2 ]]. The resulting Renderer ends up with
                // an "orderer 2" ref but not an "orderer 1" ref. @_@??
                // TODO(jack): Figure out why this is happening and fix it
                // As far as I can tell, this is only an issue in the
                // editor-page, so doing this shouldn't break clients hopefully
                var element = this.refs[id] ?
                        this.refs[id].getDOMNode() : null;
                this._setCurrentFocus([id], element);
            }
        }.bind(this));
    },

    setInputValue: function(inputWidgetId, newValue, focus) {
        // TODO(jack): change this to value: when we change input-number/
        // expression's prop to be value
        this._setWidgetProps(inputWidgetId, {
            currentValue: String(newValue)
        }, function()  {return focus;});
    },

    guessAndScore: function() {
        var widgetProps = this.props.widgets;
        var onInputError = this.props.apiOptions.onInputError ||
                function() { };

        var totalGuess = _.map(this.widgetIds, function(id) {
            return this.refs[id].toJSON();
        }, this);

        var totalScore = _.chain(this.widgetIds)
                .filter(function(id) {
                    var props = widgetProps[id];
                    // props.graded is unset or true
                    return props.graded == null || props.graded;
                })
                .map(function(id) {
                    var props = widgetProps[id];
                    var widget = this.refs[id];
                    return widget.simpleValidate(props.options, onInputError);
                }, this)
                .reduce(Util.combineScores, Util.noScore)
                .value();

        return [totalGuess, totalScore];
    },

    examples: function() {
        var widgets = _.values(this.refs);
        var examples = _.compact(_.map(widgets, function(widget) {
            return widget.examples ? widget.examples() : null;
        }));

        // no widgets with examples
        if (!examples.length) {
            return null;
        }

        var allEqual = _.all(examples, function(example) {
            return _.isEqual(examples[0], example);
        });

        // some widgets have different examples
        // TODO(alex): handle this better
        if (!allEqual) {
            return null;
        }

        return examples[0];
    },

    statics: {
        extractMathAndWidgets: extractMathAndWidgets
    }
});

var rInteresting =
        /(\$|[{}]|\\[\\${}]|\n{2,}|\[\[\u2603 [a-z-]+ [0-9]+\]\]|@@\d+@@)/g;

function extractMathAndWidgets(text) {
    // "$x$ is a cool number, just like $6 * 7$!" gives
    //     ["@@0@@ is a cool number, just like @@1@@!", ["$x$", "$6 * 7$"]]
    //
    // Inspired by http://stackoverflow.com/q/11231030.
    var savedMath = [];
    var blocks = Util.split(text, rInteresting);

    var mathPieces = [], l = blocks.length, block, braces;
    for (var i = 0; i < l; i++) {
        block = blocks[i];

        if (mathPieces.length) {
            // Looking for an end delimeter
            mathPieces.push(block);
            blocks[i] = "";

            if (block === "$" && braces <= 0) {
                blocks[i] = saveMath(mathPieces.join(""));
                mathPieces = [];
            } else if (block.slice(0, 2) === "\n\n" || i === l - 1) {
                // We're at the end of a line... just don't do anything
                // TODO(alpert): Error somehow?
                blocks[i] = mathPieces.join("");
                mathPieces = [];
            } else if (block === "{") {
                braces++;
            } else if (block === "}") {
                braces--;
            }
        } else if (i % 2 === 1) {
            // Looking for a start delimeter
            var two = block && block.slice(0, 2);
            if (two === "[[" || two === "@@") {
                // A widget or an @@n@@ thing (which we pull out so we don't
                // get confused later).
                blocks[i] = saveMath(block);
            } else if (block === "$") {
                // We got one! Save it for later and blank out its space.
                mathPieces.push(block);
                blocks[i] = "";
                braces = 0;
            }
            // Else, just normal text. Move along, move along.
        }
    }

    return [blocks.join(""), savedMath];

    function saveMath(math) {
        savedMath.push(math);
        return "@@" + (savedMath.length - 1) + "@@";
    }
}

module.exports = Renderer;

},{"./enabled-features.jsx":144,"./perseus-api.jsx":162,"./question-paragraph.jsx":164,"./tex.jsx":167,"./util.js":168,"./widget-container.jsx":170,"./widgets.js":171,"react":115}],166:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var EditorPage = require("./editor-page.jsx");

/* Renders an EditorPage as a non-controlled component.
 *
 * Normally the parent of EditorPage must pass it an onChange callback and then
 * respond to any changes by modifying the EditorPage props to reflect those
 * changes. With StatefulEditorPage changes are stored in state so you can
 * query them with toJSON.
 */
var StatefulEditorPage = React.createClass({displayName: 'StatefulEditorPage',
    render: function() {
        return EditorPage(this.state);
    },
    getInitialState: function() {
        return _({}).extend(this.props, {
            onChange: this.handleChange,
            ref: "editor"
        });
    },
    // getInitialState isn't called if the react component is re-rendered
    // in-place on the dom, in which case this is called instead, so we
    // need to update the state here.
    // (This component is currently re-rendered by the "Add image" button.)
    componentWillReceiveProps: function(nextProps) {
        this.setState(nextProps);
    },
    toJSON: function() {
        return this.refs.editor.toJSON();
    },
    handleChange: function(newState, cb) {
        this.setState(newState, cb);
    },
    scorePreview: function() {
        return this.refs.editor.scorePreview();
    }
});

module.exports = StatefulEditorPage;

},{"./editor-page.jsx":142,"react":115}],167:[function(require,module,exports){
/** @jsx React.DOM */
/**
 * For math rendered using MathJax. Use me like <TeX>2x + 3</TeX>.
 */

var React = require('react');

var pendingScripts = [];
var needsProcess = false;
var timeout = null;

function process(script, callback) {
    pendingScripts.push(script);
    if (!needsProcess) {
        needsProcess = true;
        timeout = setTimeout(doProcess, 0, callback);
    }
}

function doProcess(callback) {
    MathJax.Hub.Queue(function() {
        var oldElementScripts = MathJax.Hub.elementScripts;
        MathJax.Hub.elementScripts = function(element) {
            var scripts = pendingScripts;
            pendingScripts = [];
            needsProcess = false;
            return scripts;
        };

        try {
            return MathJax.Hub.Process(null, callback);
        } catch (e) {
            // IE8 requires `catch` in order to use `finally`
            throw e;
        } finally {
            MathJax.Hub.elementScripts = oldElementScripts;
        }
    });
}

var TeX = React.createClass({displayName: 'TeX',
    getDefaultProps: function() {
        return {
            // Called after math is rendered or re-rendered
            onRender: function() {},
            onClick: null
        };
    },

    render: function() {
        return React.DOM.span( {onClick:this.props.onClick}, 
            React.DOM.span( {ref:"mathjax"} ),
            React.DOM.span( {ref:"katex"} )
        );
    },

    componentDidMount: function() {
        var text = this.props.children;
        var onRender = this.props.onRender;

        if (typeof Exercises === "undefined" || Exercises.useKatex) {
            try {
                var katexHolder = this.refs.katex.getDOMNode();
                katex.process(text, katexHolder);
                onRender();
                return;
            } catch (e) {
                /* jshint -W103 */
                if (e.__proto__ !== katex.ParseError.prototype) {
                /* jshint +W103 */
                    throw e;
                }
            }
        }

        this.setScriptText(text);
        process(this.script, onRender);
    },

    componentDidUpdate: function(prevProps, prevState) {
        var oldText = prevProps.children;
        var newText = this.props.children;
        var onRender = this.props.onRender;

        if (oldText !== newText) {
            if (typeof Exercises === "undefined" || Exercises.useKatex) {
                try {
                    var katexHolder = this.refs.katex.getDOMNode();
                    katex.process(newText, katexHolder);
                    if (this.script) {
                        var jax = MathJax.Hub.getJaxFor(this.script);
                        if (jax) {
                            jax.Remove();
                        }
                    }
                    onRender();
                    return;
                } catch (e) {
                    /* jshint -W103 */
                    if (e.__proto__ !== katex.ParseError.prototype) {
                    /* jshint +W103 */
                        throw e;
                    }
                }
            }

            $(this.refs.katex.getDOMNode()).empty();

            if (this.script) {
                var component = this;
                MathJax.Hub.Queue(function() {
                    var jax = MathJax.Hub.getJaxFor(component.script);
                    if (jax) {
                        return jax.Text(newText, onRender);
                    } else {
                        component.setScriptText(newText);
                        process(component.script, onRender);
                    }
                });
            } else {
                this.setScriptText(newText);
                process(this.script, onRender);
            }
        }
    },

    setScriptText: function(text) {
        if (!this.script) {
            this.script = document.createElement("script");
            this.script.type = "math/tex";
            this.refs.mathjax.getDOMNode().appendChild(this.script);
        }
        if ("text" in this.script) {
            // IE8, etc
            this.script.text = text;
        } else {
            this.script.textContent = text;
        }
    },

    componentWillUnmount: function() {
        if (this.script) {
            var jax = MathJax.Hub.getJaxFor(this.script);
            if (jax) {
                jax.Remove();
            }
        }
    }
});

module.exports = TeX;

},{"react":115}],168:[function(require,module,exports){
var nestedMap = function(children, func, context) {
    if (_.isArray(children)) {
        return _.map(children, function(child) {
            return nestedMap(child, func);
        });
    } else {
        return func.call(context, children);
    }
};

var Util = {
    nestedMap: nestedMap,

    rWidgetParts: /^\[\[\u2603 (([a-z-]+) ([0-9]+))\]\]$/,

    noScore: {
        type: "points",
        earned: 0,
        total: 0,
        message: null
    },

    seededRNG: function(seed) {
        var randomSeed = seed;

        return function() {
            // Robert Jenkins' 32 bit integer hash function.
            var seed = randomSeed;
            seed = ((seed + 0x7ed55d16) + (seed << 12)) & 0xffffffff;
            seed = ((seed ^ 0xc761c23c) ^ (seed >>> 19)) & 0xffffffff;
            seed = ((seed + 0x165667b1) + (seed << 5)) & 0xffffffff;
            seed = ((seed + 0xd3a2646c) ^ (seed << 9)) & 0xffffffff;
            seed = ((seed + 0xfd7046c5) + (seed << 3)) & 0xffffffff;
            seed = ((seed ^ 0xb55a4f09) ^ (seed >>> 16)) & 0xffffffff;
            return (randomSeed = (seed & 0xfffffff)) / 0x10000000;
        };
    },

    // Shuffle an array using a given random seed or function.
    // If `ensurePermuted` is true, the input and ouput are guaranteed to be
    // distinct permutations.
    shuffle: function(array, randomSeed, ensurePermuted) {
        // Always return a copy of the input array
        var shuffled = _.clone(array);

        // Handle edge cases (input array is empty or uniform)
        if (!shuffled.length || _.all(shuffled, function(value) {
                                    return _.isEqual(value, shuffled[0]);
                                })) {
            return shuffled;
        }

        var random;
        if (_.isFunction(randomSeed)) {
            random = randomSeed;
        } else {
            random = Util.seededRNG(randomSeed);
        }

        do {
            // Fischer-Yates shuffle
            for (var top = shuffled.length; top > 0; top--) {
                var newEnd = Math.floor(random() * top),
                    temp = shuffled[newEnd];

                shuffled[newEnd] = shuffled[top - 1];
                shuffled[top - 1] = temp;
            }
        } while (ensurePermuted && _.isEqual(array, shuffled));

        return shuffled;
    },

    // In IE8, split doesn't work right. Implement it ourselves.
    split: "x".split(/(.)/g).length ?
        function(str, r) { return str.split(r); } :
        function(str, r) {
            // Based on Steven Levithan's MIT-licensed split, available at
            // http://blog.stevenlevithan.com/archives/cross-browser-split
            var output = [];
            var lastIndex = r.lastIndex = 0;
            var match;

            while ((match = r.exec(str))) {
                output.push(str.slice(lastIndex, match.index));
                output.push.apply(output, match.slice(1));
                lastIndex = match.index + match[0].length;
            }

            output.push(str.slice(lastIndex));
            return output;
        },

    /**
     * Given two score objects for two different widgets, combine them so that
     * if one is wrong, the total score is wrong, etc.
     */
    combineScores: function(scoreA, scoreB) {
        var message;

        if (scoreA.type === "points" && scoreB.type === "points") {
            if (scoreA.message && scoreB.message &&
                    scoreA.message !== scoreB.message) {
                // TODO(alpert): Figure out how to combine messages usefully
                message = null;
            } else {
                message = scoreA.message || scoreB.message;
            }

            return {
                type: "points",
                earned: scoreA.earned + scoreB.earned,
                total: scoreA.total + scoreB.total,
                message: message
            };

        } else if (scoreA.type === "points" && scoreB.type === "invalid") {
            return scoreB;

        } else if (scoreA.type === "invalid" && scoreB.type === "points") {
            return scoreA;

        } else if (scoreA.type === "invalid" && scoreB.type === "invalid") {
            if (scoreA.message && scoreB.message &&
                    scoreA.message !== scoreB.message) {
                // TODO(alpert): Figure out how to combine messages usefully
                message = null;
            } else {
                message = scoreA.message || scoreB.message;
            }

            return {
                type: "invalid",
                message: message
            };
        }
    },

    /**
     * Return the first valid interpretation of 'text' as a number, in the form
     * {value: 2.3, exact: true}.
     */
    firstNumericalParse: function(text) {
        // TODO(alpert): This is sort of hacky...
        var first;
        var val = Khan.answerTypes.predicate.createValidatorFunctional(
            function(ans) {
                first = ans;
                return true;  /* break */
            }, {
                simplify: "optional",
                inexact: true,
                forms: "integer, proper, improper, pi, log, mixed, decimal"
            });

        val(text);
        return first;
    },

    stringArrayOfSize: function(size) {
        return _(size).times(function() {
            return "";
        });
    },

    /**
     * For a graph's x or y dimension, given the tick step,
     * the ranges extent (e.g. [-10, 10]), the pixel dimension constraint,
     * and the grid step, return a bunch of configurations for that dimension.
     *
     * Example:
     *      gridDimensionConfig(10, [-50, 50], 400, 5)
     *
     * Returns: {
     *      scale: 4,
     *      snap: 2.5,
     *      tickStep: 2,
     *      unityLabel: true
     * };
     */
    gridDimensionConfig: function(absTickStep, extent, dimensionConstraint,
                                     gridStep) {
        var scale = Util.scaleFromExtent(extent, dimensionConstraint);
        var stepPx = absTickStep * scale;
        var unityLabel = stepPx > 30;
        return {
            scale: scale,
            tickStep: absTickStep / gridStep,
            unityLabel: unityLabel
        };
    },

    /**
     * Given the range, step, and boxSize, calculate the reasonable gridStep.
     * Used for when one was not given explicitly.
     *
     * Example:
     *      getGridStep([[-10, 10], [-10, 10]], [1, 1], 340)
     *
     * Returns: [1, 1]
     */
    getGridStep: function(range, step, boxSize) {
        return _(2).times(function(i) {
            var scale = Util.scaleFromExtent(range[i], boxSize);
            var gridStep = Util.gridStepFromTickStep(step[i], scale);
            return gridStep;
        });
    },

    snapStepFromGridStep: function(gridStep) {
        return _.map(gridStep, function(step) { return step / 2; });
    },

    /**
     * Given the range and a dimension, come up with the appropriate
     * scale.
     * Example:
     *      scaleFromExtent([-25, 25], 500) // returns 10
     */
    scaleFromExtent: function(extent, dimensionConstraint) {
        var span = extent[1] - extent[0];
        var scale = dimensionConstraint / span;
        return scale;
    },

    /**
     * Return a reasonable tick step given extent and dimension.
     * (extent is [begin, end] of the domain.)
     * Example:
     *      tickStepFromExtent([-10, 10], 300) // returns 2
     */
    tickStepFromExtent: function(extent, dimensionConstraint) {
        var span = extent[1] - extent[0];

        var tickFactor;
        // If single number digits
        if (15 < span && span <= 20) {
            tickFactor = 23;

        // triple digit or decimal
        } else if (span > 100 || span < 5) {
            tickFactor = 10;

        // double digit
        } else {
            tickFactor = 16;
        }
        var constraintFactor = dimensionConstraint / 500;
        var desiredNumTicks = tickFactor * constraintFactor;
        return Util.tickStepFromNumTicks(span, desiredNumTicks);
    },

    /**
     * Given the tickStep and the graph's scale, find a
     * grid step.
     * Example:
     *      gridStepFromTickStep(200, 0.2) // returns 100
     */
    gridStepFromTickStep: function(tickStep, scale) {
        var tickWidth = tickStep * scale;
        var x = tickStep;
        var y = Math.pow(10, Math.floor(Math.log(x) / Math.LN10));
        var leadingDigit = Math.floor(x / y);
        if (tickWidth < 25) {
            return tickStep;
        }
        if (tickWidth < 50) {
            if (leadingDigit === 5) {
                return tickStep;
            } else {
                return tickStep / 2;
            }
        }
        if (leadingDigit === 1) {
            return tickStep / 2;
        }
        if (leadingDigit === 2) {
            return tickStep / 4;
        }
        if (leadingDigit === 5) {
            return tickStep / 5;
        }
    },

    /**
     * Find a good tick step for the desired number of ticks in the range
     * Modified from d3.scale.linear: d3_scale_linearTickRange.
     * Thanks, mbostock!
     * Example:
     *      tickStepFromNumTicks(50, 6) // returns 10
     */
    tickStepFromNumTicks: function(span, numTicks) {
        var step = Math.pow(10, Math.floor(Math.log(span / numTicks) / Math.LN10));
        var err = numTicks / span * step;

        // Filter ticks to get closer to the desired count.
        if (err <= 0.15) {
            step *= 10;
        } else if (err <= 0.35) {
            step *= 5;
        } else if (err <= 0.75) {
            step *= 2;
        }

        // Round start and stop values to step interval.
        return step;
    },

    /**
     * Transparently update deprecated props so that the code to deal
     * with them only lives in one place: (Widget).deprecatedProps
     *
     * For example, if a boolean `foo` was deprecated in favor of a
     * number 'bar':
     *      deprecatedProps: {
     *          foo: function(props) {
     *              return {bar: props.foo ? 1 : 0};
     *          }
     *      }
     */
    DeprecationMixin: {
        // This lifecycle stage is only called before first render
        componentWillMount: function() {
            var newProps = {};

            _.each(this.deprecatedProps, function(func, prop) {
                if (_.has(this.props, prop)) {
                    _.extend(newProps, func(this.props));
                }
            }, this);

            if (!_.isEmpty(newProps)) {
                // Set new props directly so that widget renders correctly
                // when it first mounts, even though these will be overwritten
                // almost immediately afterwards...
                _.extend(this.props, newProps);

                // ...when we propagate the new props upwards and they come
                // back down again.
                setTimeout(this.props.onChange, 0, newProps);
            }
        }
    },

    /**
     * Approximate equality on numbers and primitives.
     */
    eq: function(x, y) {
        if (_.isNumber(x) && _.isNumber(y)) {
            return Math.abs(x - y) < 1e-9;
        } else {
            return x === y;
        }
    },

    /**
     * Deep approximate equality on primitives, numbers, arrays, and objects.
     */
    deepEq: function(x, y) {
        if (_.isArray(x) && _.isArray(y)) {
            if (x.length !== y.length) {
                return false;
            }
            for (var i = 0; i < x.length; i++) {
                if (!Util.deepEq(x[i], y[i])) {
                    return false;
                }
            }
            return true;
        } else if (_.isArray(x) || _.isArray(y)) {
            return false;
        } else if (_.isObject(x) && _.isObject(y)) {
            return _.all(x, function(value, key) {
                return Util.deepEq(y[key], value);
            }) && _.all(y, function(value, key) {
                return Util.deepEq(x[key], value);
            });
        } else if (_.isObject(x) || _.isObject(y)) {
            return false;
        } else {
            return Util.eq(x, y);
        }
    },

    /**
     * Query String Parser
     *
     * Original from:
     * http://stackoverflow.com/questions/901115/get-querystring-values-in-javascript/2880929#2880929
     */
    parseQueryString: function(query) {
        query = query || window.location.search.substring(1);
        var urlParams = {},
            e,
            a = /\+/g,  // Regex for replacing addition symbol with a space
            r = /([^&=]+)=?([^&]*)/g,
            d = function(s) { return decodeURIComponent(s.replace(a, " ")); };
        
        
        while (e = r.exec(query)) {
            urlParams[d(e[1])] = d(e[2]);
        }
        
        return urlParams;
    },

    /** 
     * Query string adder
     * Works for URLs without #.
     * Original from:
     * http://stackoverflow.com/questions/5999118/add-or-update-query-string-parameter
     */
    updateQueryString: function(uri, key, value) {
        value = encodeURIComponent(value);
        var re = new RegExp("([?&])" + key + "=.*?(&|$)", "i");
        var separator = uri.indexOf('?') !== -1 ? "&" : "?";
        if (uri.match(re)) {
            return uri.replace(re, '$1' + key + "=" + value + '$2');
        } else {
            return uri + separator + key + "=" + value;
        }
    },

    /**
     * A more strict encodeURIComponent that escapes `()'!`s
     * Especially useful for creating URLs that are embeddable in markdown
     *
     * Adapted from
     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/encodeURIComponent
     * This function and the above original available under the
     * CC-BY-SA 2.5 license.
     */
    strongEncodeURIComponent: function(str) {
        return encodeURIComponent(str)
            // Note that although RFC3986 reserves "!", RFC5987 does not,
            // so we do not need to escape it
            .replace(/['()!]/g, window.escape) // i.e., %27 %28 %29
            .replace(/\*/g, '%2A');
    },

    // There are certain widgets where we don't want to provide the "answered"
    // highlight indicator.
    // The issue with just using the `graded` flag on questions is that showing
    // that a certain widget is ungraded can sometimes reveal the answer to a
    // question ("is this transformation possible? if so, do it")
    // This is kind of a hack to get around this.
    widgetShouldHighlight: function(widget) {
        if (!widget) {
            return false;
        }
        var HIGHLIGHT_BAR_BLACKLIST = ["measurer", "protractor"];
        return !_.contains(HIGHLIGHT_BAR_BLACKLIST, widget.type);
    },

    /**
     * If a widget says that it is empty once it is graded.
     * Trying to encapsulate references to the score format.
     */
    scoreIsEmpty: function(score) {
        return score.type === "invalid";
    },

    /**
     * Extracts the location of a touch or mouse event, allowing you to pass
     * in a "mouseup", "mousedown", or "mousemove" event and receive the
     * correct coordinates. Shouldn't be used with "vmouse" events.
     *
     * The Util.touchHandlers are used to track the current state of the touch
     * event, such as whether or not the user is currently pressed down (either
     * through touch or mouse) on the screen.
     */

    touchHandlers: {
        pointerDown: false,
        currentTouchIdentifier: null
    },

    resetTouchHandlers: function() {
        _.extend(Util.touchHandlers, {
            pointerDown: false,
            currentTouchIdentifier: null
        });
    },

    extractPointerLocation: function(event) {
        var touchOrEvent;

        if (Util.touchHandlers.pointerDown) {
            // Look for the touch matching the one we're tracking; ignore others
            if (Util.touchHandlers.currentTouchIdentifier != null) {
                var len = event.changedTouches ? event.changedTouches.length : 0;
                for (var i = 0; i < len; i++) {
                    if (event.changedTouches[i].identifier ===
                            Util.touchHandlers.currentTouchIdentifier) {
                        touchOrEvent = event.changedTouches[i];
                    }
                }
            } else {
                touchOrEvent = event;
            }

            var isEndish =
                    event.type === "touchend" || event.type === "touchcancel";
            if (touchOrEvent && isEndish) {
                Util.touchHandlers.pointerDown = false;
                Util.touchHandlers.currentTouchIdentifier = null;
            }
        } else {
            // touchstart or mousedown
            Util.touchHandlers.pointerDown = true;
            if (event.touches) {
                touchOrEvent = event.touches[0];
                Util.touchHandlers.currentTouchIdentifier = touchOrEvent.identifier;
            } else {
                touchOrEvent = event;
            }
        }

        if (touchOrEvent) {
            return {
                left: touchOrEvent.pageX,
                top: touchOrEvent.pageY
            };
        }
    },

    /**
     * Pass this function as the touchstart for an element to
     * avoid sending the touch to the mobile scratchpad
     */
    captureScratchpadTouchStart: function(e) {
        e.stopPropagation();
    }
};

Util.random = Util.seededRNG(new Date().getTime() & 0xffffffff);

module.exports = Util;

},{}],169:[function(require,module,exports){
module.exports={
    "apiVersion": {
        "major": 1,
        "minor": 0
    },
    "itemDataVersion": {
        "major": 0,
        "minor": 1
    }
}

},{}],170:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var cx = React.addons.classSet;

var WidgetContainer = React.createClass({displayName: 'WidgetContainer',
    propTypes: {
        shouldHighlight: React.PropTypes.bool,
    },

    render: function() {
        var className = cx({
            "perseus-widget-container": true,
            "widget-highlight": this.props.shouldHighlight,
            "widget-nohighlight": !this.props.shouldHighlight,
        });

        if (_.flatten([this.props.children.constructor]).length !== 1) {
            throw new Error("WidgetContainer takes exactly one child.");
        }

        var widgetClass = this.props.children.constructor;
        if (widgetClass.displayMode == null) {
            throw new Error("You didn't specify a displayMode in the " +
                          "statics for " + widgetClass.displayName + ".");
        }

        return React.DOM.div( {className:className,
            style:{
                display: widgetClass.displayMode
            }}, 
            this.props.children
        );
    }
});

module.exports = WidgetContainer;

},{"react":115}],171:[function(require,module,exports){
var widgets = {};

var Widgets = {
    // Widgets must be registered to avoid circular dependencies with the
    // core Editor and Renderer components.
    register: function(name, data) {
        widgets[name] = data;
    },

    getWidget: function(name, enabledFeatures) {
        // TODO(alex): Consider referring to these as renderers to avoid
        // overloading "widget"
        if (!_.has(widgets, name)) {
            return null;
        }

        // Allow widgets to specify a widget directly or via a function
        if (widgets[name].getWidget) {
            return widgets[name].getWidget(enabledFeatures);
        } else {
            return widgets[name].widget;
        }
    },

    getEditor: function(name) {
        return _.has(widgets, name) ? widgets[name].editor : null;
    },

    getTransform: function(name) {
        return _.has(widgets, name) ?
            widgets[name].transform || _.identity :
            null;
    },

    getVersion: function(name) {
        return widgets[name].version || {major: 0, minor: 0};
    },

    getVersionVector: function() {
        var version = {};
        _.each(_.keys(widgets), function(name) {
            version[name] = Widgets.getVersion(name);
        });
        return version;
    },

    getPublicWidgets: function() {
        // TODO(alex): Update underscore.js so that _.pick can take a function.
        return _.pick(widgets, _.reject(_.keys(widgets), function(name) {
            return widgets[name].hidden;
        }));
    },

    upgradeWidgetInfoToLatestVersion: function(oldWidgetInfo) {
        var type = oldWidgetInfo.type;
        if (!_.isString(type)) {
            throw new Error("widget type must be a string, but was: " + type);
        }
        var widgetExports = widgets[type];

        if (widgetExports == null) {
            // If we have a widget that isn't registered, we can't upgrade it
            // TODO(jack): Figure out what the best thing to do here would be
            return oldWidgetInfo;
        }

        // Unversioned widgets (pre-July 2014) are all implicitly 0.0
        var initialVersion = oldWidgetInfo.version || {major: 0, minor: 0};
        var latestVersion = widgetExports.version || {major: 0, minor: 0};

        // We do a clone here so that it's safe to mutate the input parameter
        // in propUpgrades functions (which I will probably accidentally do at
        // some point, and we would like to not break when that happens).
        var newEditorProps = _.clone(oldWidgetInfo.options) || {};

        var upgradePropsMap = widgetExports.propUpgrades || {};

        // Empty props usually mean a newly created widget by the editor,
        // and are always considerered up-to-date.
        // Mostly, we'd rather not run upgrade functions on props that are
        // not complete.
        if (_.keys(newEditorProps).length !== 0) {

            // We loop through all the versions after the current version of
            // the loaded widget, up to and including the latest version of the
            // loaded widget, and run the upgrade function to bring our loaded
            // widget's props up to that version.
            // There is a little subtlety here in that we call
            // upgradePropsMap[1] to upgrade *to* version 1,
            // (not from version 1).
            for (var nextVersion = initialVersion.major + 1;
                    nextVersion <= latestVersion.major;
                    nextVersion++) {

                if (upgradePropsMap[nextVersion]) {
                    newEditorProps = upgradePropsMap[nextVersion](
                        newEditorProps
                    );

                } else if ((typeof console !== 'undefined') && console.warn) {
                    // This is a warning because it is unlikely to be hit in
                    // local testing, and a warning is slightly less scary in
                    // prod than a `throw new Error`
                    console.warn(
                        "No upgrade found for widget `" + type + "` from " +
                        "major version `" + (nextVersion - 1) + "` to " +
                        "major version `" + nextVersion + "` found. This " +
                        "is necessary to render this `" + type + "` correctly."
                    );
                    // But try to keep going anyways (yolo!)
                    // (Throwing an error here would just break the page
                    // silently anyways, so that doesn't seem much better
                    // than a halfhearted attempt to continue, however
                    // shallow...)
                }
            }
        }

        return _.extend({}, oldWidgetInfo, {  // maintain other info, like type
            version: latestVersion,
            // Default graded to true (so null/undefined becomes true):
            graded: (
                (oldWidgetInfo.graded != null) ? oldWidgetInfo.graded : true
            ),
            options: newEditorProps
        });
    },

    getRendererPropsForWidgetInfo: function(widgetInfo) {
        var type = widgetInfo.type;
        var widgetExports = widgets[type];
        var transform = widgetExports.transform || _.identity;
        // widgetInfo.options are the widgetEditor's props:
        return transform(widgetInfo.options);
    }
};

module.exports = Widgets;

},{}],172:[function(require,module,exports){
/** @jsx React.DOM */

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var Renderer = require("../renderer.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var Categorizer = React.createClass({displayName: 'Categorizer',
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        // List of items that are being categorized (along the left side)
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        // List of categories (across the top)
        categories: React.PropTypes.arrayOf(React.PropTypes.string),
        // Ordered list of correct answers, mapping items to categories thusly:
        //   values[<items_index>] == <categories_index>
        values: React.PropTypes.arrayOf(React.PropTypes.number)
    },

    getDefaultProps: function() {
        return {
            items: [],
            categories: [],
            values: []
        };
    },

    getInitialState: function() {
        return {
            uniqueId: _.uniqueId("perseus_radio_")
        };
    },

    render: function() {
        var self = this;

        return React.DOM.div( {className:"categorizer-container clearfix"}, React.DOM.table(null, 
            React.DOM.thead(null, React.DOM.tr(null, 
                React.DOM.th(null, " "),
                _.map(this.props.categories, function(category)  {
                    return React.DOM.th( {className:"category"}, 
                        Renderer( {content:category})
                    );
                })
            )),
            React.DOM.tbody(null, _.map(this.props.items, function(item, itemNum)  {
                var uniqueId = self.state.uniqueId + "_" + itemNum;
                return React.DOM.tr(null, 
                    React.DOM.td(null, Renderer( {content:item})),
                    _.range(self.props.categories.length).map(function(catNum)  {
                        return React.DOM.td( {className:"category"}, 
                            React.DOM.label( {onTouchStart:captureScratchpadTouchStart}, 
                                React.DOM.input(
                                    {type:"radio",
                                    name:uniqueId,
                                    checked:
                                        self.props.values[itemNum] === catNum,
                                    
                                    onChange:this.onChange.bind(
                                        this,
                                        itemNum,
                                        catNum
                                    )}
                                    ),
                                React.DOM.span(null)
                            )
                        );
                    }.bind(this))
                );
            }.bind(this)))
        ));
    },

    onChange: function(itemNum, catNum) {
        var values = _.clone(this.props.values);
        values[itemNum] = catNum;
        this.change("values", values);
    },

    simpleValidate: function(rubric) {
        return Categorizer.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});


_.extend(Categorizer, {
    validate: function(state, rubric) {
        var completed = true;
        var allCorrect = true;
        _.each(rubric.values, function(value, i) {
            if (state.values[i] == null) {
                completed = false;
            }
            if (state.values[i] !== value) {
                allCorrect = false;
            }
        });
        if (!completed) {
            return {
                type: "invalid",
                message: "Make sure you select something for every row."
            };
        }
        return {
            type: "points",
            earned: allCorrect ? 1 : 0,
            total: 1,
            message: null
        };
    }
});


var CategorizerEditor = React.createClass({displayName: 'CategorizerEditor',
    mixins: [JsonifyProps, Changeable],

    propTypes: {
        items: React.PropTypes.arrayOf(React.PropTypes.string),
        categories: React.PropTypes.arrayOf(React.PropTypes.string),
        values: React.PropTypes.arrayOf(React.PropTypes.number)
    },

    getDefaultProps: function() {
        return {
            items: [],
            categories: [],
            values: []
        };
    },

    render: function() {
        return React.DOM.div(null, 
            "Categories:",
            TextListEditor(
                {options:this.props.categories,
                onChange:function(cat)  {this.change("categories", cat);}.bind(this),
                layout:"horizontal"} ),

            "Items:",
            TextListEditor(
                {options:this.props.items,
                onChange:function(items)  {this.change({
                        items: items,
                        // TODO(eater): This truncates props.values so there
                        // are never more correct answers than items, ensuring
                        // the widget is possible to answer correctly.
                        // It doesn't necessarly keep each answer with
                        // its corresponding item if an item is deleted from
                        // the middle. Inconvenient, but it's at least possible
                        // for content creators to catch and fix.
                        values: _.first(this.props.values, items.length)
                    });}.bind(this),
                layout:"vertical"} ),

            Categorizer(
                {items:this.props.items,
                categories:this.props.categories,
                values:this.props.values,
                onChange:function(newProps)  {this.props.onChange(newProps);}.bind(this)}
                )
        );
    },
});

module.exports = {
    name: "categorizer",
    displayName: "Categorizer",
    widget: Categorizer,
    editor: CategorizerEditor,
    transform: function(editorProps)  {
        return _.pick(editorProps, "items", "categories");
    },
    hidden: true
};


},{"../components/text-list-editor.jsx":135,"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"../renderer.jsx":165,"../util.js":168}],173:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var InfoTip = require("react-components/info-tip");
var FancySelect = require("../components/fancy-select.jsx");
var FancyOption = FancySelect.Option;

var JsonifyProps = require("../mixins/jsonify-props.jsx");
var ApiOptions = require("../perseus-api.jsx").Options;

var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var Dropdown = React.createClass({displayName: 'Dropdown',
    propTypes: {
        choices: React.PropTypes.arrayOf(React.PropTypes.string),
        selected: React.PropTypes.number,
        placeholder: React.PropTypes.string,
        apiOptions: ApiOptions.propTypes
    },

    getDefaultProps: function() {
        return {
            choices: [],
            selected: 0,
            placeholder: "",
            apiOptions: ApiOptions.defaults
        };
    },

    render: function() {
        var choices = this.props.choices.slice();

        if (this.props.apiOptions.fancyDropdowns) {
            return FancySelect(
                    {onChange:this._handleChange,
                    className:"perseus-widget-dropdown",
                    value:this.props.selected}, 
                FancyOption( {value:0, visible:false}, 
                    React.DOM.span( {className:"placeholder"}, 
                        this.props.placeholder
                    )
                ),
                choices.map(function(choice, i)  {
                    // Always visible so we can animate them with css
                    return FancyOption( {value:i + 1, visible:true}, 
                        choice
                    );
                })
            );

        } else {
            return React.DOM.select(
                        {onChange:this._handleChangeEvent,
                        onTouchStart:captureScratchpadTouchStart,
                        className:"perseus-widget-dropdown",
                        value:this.props.selected}, 
                React.DOM.option( {value:0, disabled:true}, 
                    this.props.placeholder
                ),
                choices.map(function(choice, i)  {
                    return React.DOM.option(
                            {key:"" + (i + 1),
                            value:i + 1}, 
                        choice
                    );
                })
            );
        }
    },

    focus: function() {
        this.getDOMNode().focus();
        return true;
    },

    _handleChangeEvent: function(e) {
        this._handleChange(parseInt(e.target.value));
    },

    _handleChange: function(selected) {
        this.props.onChange({selected: selected});
    },

    toJSON: function(skipValidation) {
        return {value: this.props.selected};
    },

    simpleValidate: function(rubric) {
        return Dropdown.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(Dropdown, {
    validate: function(state, rubric) {
        var selected = state.value;
        if (selected === 0) {
            return {
                type: "invalid",
                message: null
            };
        } else {
            var correct = rubric.choices[selected - 1].correct;
            return {
                type: "points",
                earned: correct ? 1 : 0,
                total: 1,
                message: null
            };
        }
    }
});

var DropdownEditor = React.createClass({displayName: 'DropdownEditor',
    mixins: [JsonifyProps],

    propTypes: {
        choices: React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            correct: React.PropTypes.bool
        })),
        placeholder: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            placeholder: "",
            choices: [{
                content: "",
                correct: false
            }]
        };
    },

    render: function() {
        var dropdownGroupName = _.uniqueId("perseus_dropdown_");
        return React.DOM.div( {className:"perseus-widget-dropdown"}, 
            React.DOM.div(null, "Dropdown",
                InfoTip(null, 
                    React.DOM.p(null, "The drop down is useful for making inequalities in a"+' '+
                    "custom format. We normally use the symbols ", "<",", ", ">",","+' '+
                    "≤, ≥ (in that order) which you can copy into the"+' '+
                    "choices. When possible, use the \"multiple choice\" answer"+' '+
                    "type instead.")
                )
            ),
            React.DOM.input(
                {type:"text",
                placeholder:"Placeholder value",
                value:this.props.placeholder,
                onChange:this.onPlaceholderChange} ),
            InfoTip(null, 
                React.DOM.p(null, "This value will appear as the drop down default. It should"+' '+
                "give the user some indication of the values available in the"+' '+
                "drop down itself, e.g., Yes/No/Maybe.")
            ),
            React.DOM.ul(null, 
                this.props.choices.map(function(choice, i) {
                    return React.DOM.li( {key:"" + i}, 
                        React.DOM.div(null, 
                            React.DOM.input(
                                {ref:"radio" + i,
                                type:"radio",
                                name:dropdownGroupName,
                                checked:choice.correct ? "checked" : "",
                                onChange:this.onCorrectChange.bind(this, i),
                                value:i} ),
                            React.DOM.input(
                                {type:"text",
                                ref:"editor" + i,
                                onChange:this.onContentChange.bind(this, i),
                                value:choice.content} ),
                            React.DOM.a( {href:"#", className:"simple-button orange",
                                    onClick:this.removeChoice.bind(this, i)}, 
                                React.DOM.span( {className:"icon-trash remove-choice"} )
                            )
                        )
                    );
                }, this)
            ),

            React.DOM.div( {className:"add-choice-container"}, 
                React.DOM.a( {href:"#", className:"simple-button orange",
                        onClick:this.addChoice}, 
                    React.DOM.span( {className:"icon-plus"} ),
                    ' ',"Add a choice",' '
                )
            )
        );
    },

    onPlaceholderChange: function(e) {
        var placeholder = e.target.value;
        this.props.onChange({placeholder: placeholder});
    },

    onCorrectChange: function(choiceIndex) {
        var choices = _.map(this.props.choices, function (choice, i) {
            return _.extend({}, choice, {
                correct: i === choiceIndex
            });
        });
        this.props.onChange({choices: choices});
    },

    onContentChange: function(choiceIndex, e) {
        var choices = this.props.choices.slice();
        var choice = _.clone(choices[choiceIndex]);
        choice.content = e.target.value;
        choices[choiceIndex] = choice;
        this.props.onChange({choices: choices});
    },

    addChoice: function(e) {
        e.preventDefault();

        var choices = this.props.choices;
        var blankChoice = {content: "", correct: false};
        this.props.onChange({
            choices: choices.concat([blankChoice])
        }, this.focus.bind(this, choices.length));
    },

    removeChoice: function(choiceIndex, e) {
        e.preventDefault();
        var choices = _(this.props.choices).clone();
        choices.splice(choiceIndex, 1);
        this.props.onChange({
            choices: choices
        });
    },

    focus: function(i) {
        this.refs["editor" + i].getDOMNode().focus();
        return true;
    }
});

var propTransform = function(editorProps)  {
    return {
        placeholder: editorProps.placeholder,
        choices: _.map(editorProps.choices, function(choice)  {return choice.content;})
    };
};

module.exports = {
    name: "dropdown",
    displayName: "Drop down",
    widget: Dropdown,
    editor: DropdownEditor,
    transform: propTransform,
    hidden: true
};

},{"../components/fancy-select.jsx":120,"../mixins/jsonify-props.jsx":160,"../perseus-api.jsx":162,"../util.js":168,"react":115,"react-components/info-tip":5}],174:[function(require,module,exports){
/** @jsx React.DOM */

/**
 * This is an example graphie-using widget
 *
 * TODO(jack): Add more comments
 */

var React = require('react');
var Util = require("../util.js");
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var Graphie = require("../components/graphie.jsx");
var MovablePoint = Graphie.MovablePoint;

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

/**
 * This is the widget's renderer. It shows up in the right column
 * in test.html, and is what is visible to users, and where
 * users enter their answers.
 */
var ExampleGraphieWidget = React.createClass({displayName: 'ExampleGraphieWidget',
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        graph: React.PropTypes.object.isRequired,
        coord: React.PropTypes.arrayOf(React.PropTypes.number)
    },

    getDefaultProps: function() {
        return {
            // We want to allow our coord to be null to test if the
            // user has interacted with this widget yet when grading it
            coord: null,
            graph: {
                box: [400, 400],
                labels: ["x", "y"],
                range: [[-10, 10], [-10, 10]],
                step: [1, 1],
                gridStep: [1, 1],
                valid: true,
                backgroundImage: null,
                markings: "grid",
                showProtractor: false
            }
        };
    },

    render: function() {
        return Graphie(
                {ref:"graphie",
                box:this.props.graph.box,
                range:this.props.graph.range,
                options:this.props.graph,
                setup:this.setupGraphie}, 
            MovablePoint(
                    {pointSize:5,
                    coord:this.props.coord || [0, 0],
                    constraints:[
                        MovablePoint.constraints.snap(),
                        MovablePoint.constraints.bound()
                    ],
                    onMove:this.movePoint} )
        );
    },

    movePoint: function(newCoord) {
        this.change({
            coord: newCoord
        });
    },

    _getGridConfig: function(options) {
        return _.map(options.step, function(step, i) {
            return Util.gridDimensionConfig(
                    step,
                    options.range[i],
                    options.box[i],
                    options.gridStep[i]);
        });
    },

    setupGraphie: function(graphie, options) {
        var gridConfig = this._getGridConfig(options);
        graphie.graphInit({
            range: options.range,
            scale: _.pluck(gridConfig, "scale"),
            axisArrows: "<->",
            labelFormat: function(s) { return "\\small{" + s + "}"; },
            gridStep: options.gridStep,
            tickStep: _.pluck(gridConfig, "tickStep"),
            labelStep: 1,
            unityLabels: _.pluck(gridConfig, "unityLabel")
        });
        graphie.label([0, options.range[1][1]], options.labels[1], "above");
    },

    simpleValidate: function(rubric) {
        return ExampleGraphieWidget.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});


/**
 * This is the widget's grading function
 */
_.extend(ExampleGraphieWidget, {
    validate: function(state, rubric) {
        if (state.coord == null) {
            return {
                type: "invalid",
                message: null
            };
        } else if (kpoint.equal(state.coord, rubric.correct)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in test.html. Only the question writer sees this.
 */
var ExampleGraphieWidgetEditor = React.createClass({displayName: 'ExampleGraphieWidgetEditor',
    mixins: [Changeable, JsonifyProps],

    getDefaultProps: function() {
        return {
            correct: [4, 4],
            graph: {
                box: [340, 340],
                labels: ["x", "y"],
                range: [[-10, 10], [-10, 10]],
                step: [1, 1],
                gridStep: [1, 1],
                valid: true,
                backgroundImage: null,
                markings: "grid",
                showProtractor: false
            }
        };
    },

    render: function() {
        return React.DOM.div(null, 
            ExampleGraphieWidget(
                {graph:this.props.graph,
                coord:this.props.correct,
                onChange:this.handleChange} )
        );
    },

    handleChange: function(newProps) {
        if (newProps.coord) {
            this.change({
                correct: newProps.coord
            });
        }
    }
});


/**
 * For this widget to work, we must export it.
 * We also must require() this file in src/all-widgets.js
 */
module.exports = {
    name: "example-graphie-widget",
    displayName: "Example Graphie Widget",
    hidden: true,   // Hides this widget from the Perseus.Editor widget select
    widget: ExampleGraphieWidget,
    editor: ExampleGraphieWidgetEditor
};

},{"../components/graphie.jsx":125,"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"../util.js":168,"react":115}],175:[function(require,module,exports){
/** @jsx React.DOM */

/**
 * This is a simple number-entry widget
 * It is not as powerful as number-input, but has a simpler, more
 * representative structure as an example widget, and is easier to
 * test new ideas on.
 *
 * TODO(jack): Add more comments
 */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var TextInput = React.createClass({displayName: 'TextInput',
    render: function() {
        return React.DOM.input(
            {ref:"input",
            value:this.props.value || "",
            onChange:this.changeValue} );
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    changeValue: function(e) {
        // Translating from the js event e to the value
        // of the textbox to send to onChange
        this.props.onChange(e.target.value);
    },

    statics: {
        displayMode: "inline-block"
    }
});

/**
 * This is the widget's renderer. It shows up in the right column
 * in test.html, and is what is visible to users, and where
 * users enter their answers.
 */
var ExampleWidget = React.createClass({displayName: 'ExampleWidget',
    propTypes: {
        value: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            value: ""
        };
    },

    /**
     * Changeling creates this.change() to tell our parent to update our props
     *
     * JsonifyProps creates this.toJSON() which returns the state of the widget
     * for checking the answer in simpleValidate
     */
    mixins: [Changeable, JsonifyProps],

    render: function() {
        return TextInput(
            {ref:"input",
            value:this.props.value,
            onChange:this.change("value")} );
    },

    /**
     * Widgets that are focusable should add a focus method that returns
     * true if focusing succeeded. The first such widget found will be
     * focused on page load.
     */
    focus: function() {
        this.refs.input.focus();
        return true;
    },

    /**
     * simpleValidate is called for grading. Rubric is the result of calling
     * toJSON() on the editor that created this widget.
     *
     * Should return an object representing the grading result, such as
     * {
     *     type: "points",
     *     earned: 1,
     *     total: 1,
     *     message: null
     * }
     */
    simpleValidate: function(rubric) {
        return ExampleWidget.validate(this.toJSON(), rubric);
    }
});


/**
 * This is the widget's grading function
 */
_.extend(ExampleWidget, {
    /**
     * simpleValidate generally defers to this function
     *
     * state is usually the result of toJSON on the widget
     * rubric is the result of calling toJSON() on the editor
     */
    validate: function(state, rubric) {
        if (state.value === "") {
            return {
                type: "invalid",
                message: "It looks like you haven't answered all of the " +
                    "question yet."
            };
        } else if (state.value === rubric.correct) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


/**
 * This is the widget's editor. This is what shows up on the left side
 * of the screen in test.html. Only the question writer sees this.
 */
var ExampleWidgetEditor = React.createClass({displayName: 'ExampleWidgetEditor',
    mixins: [Changeable, JsonifyProps],

    getDefaultProps: function() {
        return {
            correct: ""
        };
    },

    handleAnswerChange: function(event) {
        this.change({
            correct: event.target.value
        });
    },

    render: function() {
        return React.DOM.div(null, 
            React.DOM.label(null, 
                "Correct answer:",
                React.DOM.input(
                    {value:this.props.correct,
                    onChange:this.handleAnswerChange,
                    ref:"input"} )
            )
        );
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    }
});


/**
 * For this widget to work, we must require() this file in src/all-widgets.js
 */
module.exports = {
    name: "example-widget",
    displayName: "Example Widget",
    hidden: true,   // Hides this widget from the Perseus.Editor widget select
    widget: ExampleWidget,
    editor: ExampleWidgetEditor
};

},{"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"react":115}],176:[function(require,module,exports){
/** @jsx React.DOM */

var React   = require("react");
var InfoTip = require("react-components/info-tip");
var Tooltip = require("react-components/tooltip");

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");
var ApiOptions = require("../perseus-api.jsx").Options;

var EnabledFeatures   = require("../enabled-features.jsx");
var PropCheckBox      = require("../components/prop-check-box.jsx");

var InputWithExamples = require("../components/input-with-examples.jsx");
var MathInput         = require("../components/math-input.jsx");
var TeX               = require("../tex.jsx"); // OldExpression only
var TexButtons        = require("../components/tex-buttons.jsx");

var cx = React.addons.classSet;
var EnabledFeatures = require("../enabled-features.jsx");

var ERROR_MESSAGE = $._("Sorry, I don't understand that!");

// The new, MathQuill input expression widget
var Expression = React.createClass({displayName: 'Expression',
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        value: React.PropTypes.string,
        times: React.PropTypes.bool,
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        buttonsVisible: React.PropTypes.oneOf(['always', 'never', 'focused']),
        enabledFeatures: EnabledFeatures.propTypes,
        apiOptions: ApiOptions.propTypes
    },

    getDefaultProps: function() {
        return {
            value: "",
            times: false,
            functions: [],
            onFocus: function() { },
            onBlur: function() { },
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: ApiOptions.defaults
        };
    },

    getInitialState: function() {
        return {
            showErrorTooltip: false,
            showErrorText: false
        };
    },

    parse: function(value, props) {
        // TODO(jack): Disable icu for content creators here, or
        // make it so that solution answers with ','s or '.'s work
        var options = _.pick(props || this.props, "functions");
        if (icu && icu.getDecimalFormatSymbols) {
            _.extend(options, icu.getDecimalFormatSymbols());
        }
        return KAS.parse(value, options);
    },

    render: function() {
        if (this.props.apiOptions.staticRender) {
            var style = {
                borderRadius: "5px",
                padding: "4px",
                background: "white",
                border: "1px solid #a4a4a4"
            };
            return React.DOM.span( {style:style}, 
                TeX( {ref:"input", onClick:this._handleFocus}, 
                    this.props.value
                )
            );
        } else {
            // TODO(alex): Style this tooltip to be more consistent with other
            // tooltips on the site; align to left middle (once possible)
            var errorTooltip = React.DOM.span( {className:"error-tooltip"}, 
                Tooltip(
                        {className:"error-text-container",
                        horizontalPosition:"right",
                        horizontalAlign:"left",
                        verticalPosition:"top",
                        arrowSize:10,
                        borderColor:"#fcc335",
                        show:this.state.showErrorText} , 
                    React.DOM.i(
                        {className:"icon-exclamation-sign error-icon",
                        onMouseEnter:function()  {
                            this.setState({showErrorText: true});
                        }.bind(this),
                        onMouseLeave:function()  {
                            this.setState({showErrorText: false});
                        }.bind(this),
                        onClick:function()  {
                            // TODO(alex): Better error feedback for mobile
                            this.setState({
                                showErrorText: !this.state.showErrorText
                            });
                        }.bind(this)} ),
                    React.DOM.div( {className:"error-text"}, 
                        ERROR_MESSAGE
                    )
                )
            );

            var className = cx({
                "perseus-widget-expression": true,
                "show-error-tooltip": this.state.showErrorTooltip
            });

            return React.DOM.span( {className:className}, 
                MathInput(
                    {ref:"input",
                    value:this.props.value,
                    onChange:this.change("value"),
                    convertDotToTimes:this.props.times,
                    buttonsVisible:this.props.buttonsVisible || "focused",
                    onFocus:this._handleFocus,
                    onBlur:this._handleBlur} ),
                this.state.showErrorTooltip && errorTooltip
            );
        }
    },

    _handleFocus: function() {
        if (this.props.apiOptions.staticRender) {
            this.props.onFocus([], this.refs.input.getDOMNode());
        } else {
            this.props.onFocus([], this.refs.input.getInputDOMNode());
        }
    },

    _handleBlur: function() {
        this.props.onBlur([], this.refs.input.getInputDOMNode());
    },

    errorTimeout: null,

    // Whenever the input value changes, attempt to parse it.
    //
    // Clear any errors if this parse succeeds, show an error within a second
    // if it fails.
    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.value, nextProps.value) ||
            !_.isEqual(this.props.functions, nextProps.functions)) {

            clearTimeout(this.errorTimeout);

            if (this.parse(nextProps.value, nextProps).parsed) {
                this.setState({showErrorTooltip: false});
            } else {
                // Store timeout ID so that we can clear it above
                this.errorTimeout = setTimeout(function()  {
                    var apiResult = this.props.apiOptions.onInputError(
                        null, // reserved for some widget identifier
                        this.props.value,
                        ERROR_MESSAGE
                    );
                    if (apiResult !== false) {
                        this.setState({showErrorTooltip: true});
                    }
                }.bind(this), 500);
            }
        }
    },

    componentWillUnmount: function() {
        clearTimeout(this.errorTimeout);
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    // HACK(joel)
    insert: function(text) {
        this.refs.input.insert(text);
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return Expression.validate(this.toJSON(), rubric, onInputError);
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(Expression, {
    validate: function(state, rubric, onInputError) {
        var options = _.clone(rubric);
        if (icu && icu.getDecimalFormatSymbols) {
            _.extend(options, icu.getDecimalFormatSymbols());
        }
        // We don't give options to KAS.parse here because that is parsing
        // the solution answer, not the student answer, and we don't
        // want a solution to work if the student is using a different
        // language but not in english.
        var val = Khan.answerTypes.expression.createValidatorFunctional(
            KAS.parse(rubric.value, rubric).expr, options);

        var result = val(state.value);

        // TODO(eater): Seems silly to translate result to this invalid/points
        // thing and immediately translate it back in ItemRenderer.scoreInput()
        if (result.empty) {
            var apiResult = onInputError(
                null, // reserved for some widget identifier
                state.value,
                result.message
            );
            return {
                type: "invalid",
                message: (apiResult === false) ? null : result.message
            };
        } else {
            return {
                type: "points",
                earned: result.correct ? 1 : 0,
                total: 1,
                message: result.message
            };
        }
    }
});

// The old, plain-text input expression widget
var OldExpression = React.createClass({displayName: 'OldExpression',
    propTypes: {
        value: React.PropTypes.string,
        times: React.PropTypes.bool,
        functions: React.PropTypes.arrayOf(React.PropTypes.string),
        enabledFeatures: EnabledFeatures.propTypes
    },

    getDefaultProps: function() {
        return {
            value: "",
            times: false,
            functions: [],
            onFocus: function() { },
            onBlur: function() { },
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: ApiOptions.defaults
        };
    },

    getInitialState: function() {
        return {
            lastParsedTex: ""
        };
    },

    parse: function(value, props) {
        // TODO(jack): Disable icu for content creators here, or
        // make it so that solution answers with ','s or '.'s work
        var options = _.pick(props || this.props, "functions");
        if (icu && icu.getDecimalFormatSymbols) {
            _.extend(options, icu.getDecimalFormatSymbols());
        }
        return KAS.parse(value, options);
    },

    componentWillMount: function() {
        this.updateParsedTex(this.props.value);
    },

    componentWillReceiveProps: function(nextProps) {
        this.updateParsedTex(nextProps.value, nextProps);
    },

    render: function() {
        var result = this.parse(this.props.value);
        var shouldShowExamples = this.props.enabledFeatures.toolTipFormats;

        return React.DOM.span( {className:"perseus-widget-expression-old"}, 
            InputWithExamples(
                    {ref:"input",
                    value:this.props.value,
                    onKeyDown:this.handleKeyDown,
                    onKeyPress:this.handleKeyPress,
                    onChange:this.handleChange,
                    examples:this.examples(),
                    shouldShowExamples:shouldShowExamples,
                    interceptFocus:this._getInterceptFocus(),
                    onFocus:this._handleFocus,
                    onBlur:this._handleBlur} ),
            React.DOM.span( {className:"output"}, 
                React.DOM.span( {className:"tex",
                        style:{opacity: result.parsed ? 1.0 : 0.5}}, 
                    TeX(null, this.state.lastParsedTex)
                ),
                React.DOM.span( {className:"placeholder"}, 
                    React.DOM.span( {ref:"error", className:"error",
                            style:{display: "none"}}, 
                        React.DOM.span( {className:"buddy"} ),
                        React.DOM.span( {className:"message"}, React.DOM.span(null, 
                            ERROR_MESSAGE
                        ))
                    )
                )
            )
        );
    },

    _handleFocus: function() {
        this.props.onFocus([], this.refs.input.getInputDOMNode());
    },

    _handleBlur: function() {
        this.props.onBlur([], this.refs.input.getInputDOMNode());
    },

    _getInterceptFocus: function() {
        return this.props.apiOptions.interceptInputFocus ?
                this._interceptFocus : null;
    },

    _interceptFocus: function() {
        var interceptProp = this.props.apiOptions.interceptInputFocus;
        if (interceptProp) {
            return interceptProp(
                this.props.widgetId,
                this.refs.input.getInputDOMNode()
            );
        }
    },

    errorTimeout: null,

    componentDidMount: function() {
        this.componentDidUpdate();
    },

    componentDidUpdate: function() {
        clearTimeout(this.errorTimeout);
        if (this.parse(this.props.value).parsed) {
            this.hideError();
        } else {
            this.errorTimeout = setTimeout(this.showError, 2000);
        }
    },

    componentWillUnmount: function() {
        clearTimeout(this.errorTimeout);
    },

    showError: function() {
        var apiResult = this.props.apiOptions.onInputError(
            null, // reserved for some widget identifier
            this.props.value,
            ERROR_MESSAGE
        );
        if (apiResult !== false) {
            var $error = $(this.refs.error.getDOMNode());
            if (!$error.is(":visible")) {
                $error.css({ top: 50, opacity: 0.1 }).show()
                    .animate({ top: 0, opacity: 1.0 }, 300);
            }
        } else {
            this.hideError();
        }
    },

    hideError: function() {
        var $error = $(this.refs.error.getDOMNode());
        if ($error.is(":visible")) {
            $error.animate({ top: 50, opacity: 0.1 }, 300, function() {
                $(this).hide();
            });
        }
    },

    /**
     * The keydown handler handles clearing the error timeout, telling
     * props.value to update, and intercepting the backspace key when
     * appropriate...
     */
    handleKeyDown: function(event) {
        var input = this.refs.input.getDOMNode();
        var text = input.value;

        var start = input.selectionStart;
        var end = input.selectionEnd;
        var supported = start !== undefined;

        var which = event.nativeEvent.keyCode;

        if (supported && which === 8 /* backspace */) {
            if (start === end && text.slice(start - 1, start + 1) === "()") {
                event.preventDefault();
                var val = text.slice(0, start - 1) + text.slice(start + 1);

                // this.props.onChange will update the value for us, but
                // asynchronously, making it harder to set the selection
                // usefully, so we just set .value directly here as well.
                input.value = val;
                input.selectionStart = start - 1;
                input.selectionEnd = end - 1;
                this.props.onChange({value: val});
            }
        }
    },

    /**
     * ...whereas the keypress handler handles the parentheses because keyCode
     * is more useful for actual character insertions (keypress gives 40 for an
     * open paren '(' instead of keydown which gives 57, the code for '9').
     */
    handleKeyPress: function(event) {
        var input = this.refs.input.getDOMNode();
        var text = input.value;

        var start = input.selectionStart;
        var end = input.selectionEnd;
        var supported = start !== undefined;

        var which = event.nativeEvent.charCode;

        if (supported && which === 40 /* left paren */) {
            event.preventDefault();

            var val;
            if (start === end) {
                var insertMatched = _.any([" ", ")", ""], function(val) {
                    return text.charAt(start) === val;
                });

                val = text.slice(0, start) +
                        (insertMatched ? "()" : "(") + text.slice(end);
            } else {
                val = text.slice(0, start) +
                        "(" + text.slice(start, end) + ")" + text.slice(end);
            }

            input.value = val;
            input.selectionStart = start + 1;
            input.selectionEnd = end + 1;
            this.props.onChange({value: val});

        } else if (supported && which === 41 /* right paren */) {
            if (start === end && text.charAt(start) === ")") {
                event.preventDefault();
                input.selectionStart = start + 1;
                input.selectionEnd = end + 1;
            }
        }
    },

    handleChange: function(newValue) {
        this.props.onChange({value: newValue});
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    toJSON: function(skipValidation) {
        return {value: this.props.value};
    },

    updateParsedTex: function(value, props) {
        var result = this.parse(value, props);
        var options = _.pick(this.props, "times");
        if (result.parsed) {
            this.setState({lastParsedTex: result.expr.asTex(options)});
        }
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return Expression.validate(this.toJSON(), rubric, onInputError);
    },

    examples: function() {
        var mult = $._("For $2\\cdot2$, enter **2*2**");
        if (this.props.times) {
            mult = mult.replace(/\\cdot/g, "\\times");
        }

        return [
            $._("**Acceptable Formats**"),
            mult,
            $._("For $3y$, enter **3y** or **3*y**"),
            $._("For $\\dfrac{1}{x}$, enter **1/x**"),
            $._("For $\\dfrac{1}{xy}$, enter **1/(xy)**"),
            $._("For $\\dfrac{2}{x + 3}$, enter **2/(x + 3)**"),
            $._("For $x^{y}$, enter **x^y**"),
            $._("For $x^{2/3}$, enter **x^(2/3)**"),
            $._("For $\\sqrt{x}$, enter **sqrt(x)**"),
            $._("For $\\pi$, enter **pi**"),
            $._("For $\\sin \\theta$, enter **sin(theta)**"),
            $._("For $\\le$ or $\\ge$, enter **<=** or **>=**"),
            $._("For $\\neq$, enter **=/=**")
        ];
    },

    statics: {
        displayMode: "block"
    }
});

var ExpressionEditor = React.createClass({displayName: 'ExpressionEditor',
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        value: React.PropTypes.string,
        form: React.PropTypes.bool,
        simplify: React.PropTypes.bool,
        times: React.PropTypes.bool,
        functions: React.PropTypes.arrayOf(React.PropTypes.string)
    },

    getDefaultProps: function() {
        return {
            value: "",
            form: false,
            simplify: false,
            times: false,
            functions: ["f", "g", "h"]
        };
    },

    getInitialState: function() {
        var value = this.props.value;

        return {
            // Is the format of `value` TeX or plain text?
            // TODO(alex): Remove after backfilling everything to TeX
            isTex: value === "" ||                  // default to TeX if new;
                _.indexOf(value, "\\") !== -1 ||    // only TeX has backslashes
                _.indexOf(value, "{") !== -1        // and curly braces
        };
    },

    render: function() {
        var simplifyWarning = null;
        var shouldTryToParse = this.props.simplify && this.props.value !== "";
        if (shouldTryToParse) {
            var expression = KAS.parse(this.props.value);
            if (expression.parsed && !expression.expr.isSimplified()) {
                simplifyWarning = React.DOM.p( {className:"warning"}, React.DOM.b(null, "Warning"),": You"+' '+
                    "specified that the answer should be simplified but did not"+' '+
                    "provide a simplified answer. Are you sure you want to"+' '+
                    "require simplification?");
            }
        }

        // TODO(alex): Consider adding more warnings (like the above) here

        var expressionProps = {
            ref: "expression",
            value: this.props.value,
            times: this.props.times,
            functions: this.props.functions,
            onChange: function(newProps)  {return this.change(newProps);}.bind(this),
            buttonsVisible: "never"
        };

        var expression = this.state.isTex ? Expression : OldExpression;

        // TODO(joel) - move buttons outside of the label so they don't weirdly
        // focus
        return React.DOM.div(null, 
            React.DOM.div(null, React.DOM.label(null, 
                "Correct answer:",' ',
                expression(expressionProps)
            )),
            this.state.isTex && TexButtons(
                {className:"math-input-buttons",
                convertDotToTimes:this.props.times,
                onInsert:this.handleTexInsert} ),

            React.DOM.div(null, 
                PropCheckBox(
                    {form:this.props.form,
                    onChange:this.props.onChange,
                    labelAlignment:"right",
                    label:"Answer expression must have the same form."} ),
                InfoTip(null, 
                    React.DOM.p(null, "The student's answer must be in the same form."+' '+
                    "Commutativity and excess negative signs are ignored.")
                )
            ),

            React.DOM.div(null, 
                PropCheckBox(
                    {simplify:this.props.simplify,
                    onChange:this.props.onChange,
                    labelAlignment:"right",
                    label:"Answer expression must be fully expanded and"+' '+
                        "simplified."} ),
                InfoTip(null, 
                    React.DOM.p(null, "The student's answer must be fully expanded and"+' '+
                    "simplified. Answering this equation (x^2+2x+1) with this"+' '+
                    "factored equation (x+1)^2 will render this response"+' '+
                    "\"Your answer is not fully expanded and simplified.\"")
                )
            ),

            simplifyWarning,

            React.DOM.div(null, 
                PropCheckBox(
                    {times:this.props.times,
                    onChange:this.props.onChange,
                    labelAlignment:"right",
                    label:"Use × for rendering multiplication instead of a"+' '+
                        "center dot."} ),
                InfoTip(null, 
                    React.DOM.p(null, "For pre-algebra problems this option displays"+' '+
                    "multiplication as \\times instead of \\cdot in both the"+' '+
                    "rendered output and the acceptable formats examples.")
                )
            ),

            React.DOM.div(null, 
                React.DOM.label(null, 
                "Function variables: ",
                React.DOM.input( {type:"text",
                    defaultValue:this.props.functions.join(" "),
                    onChange:this.handleFunctions} )
                ),
                InfoTip(null, React.DOM.p(null, 
                    "Single-letter variables listed here will be"+' '+
                    "interpreted as functions. This let us know that f(x) means"+' '+
                    "\"f of x\" and not \"f times x\"."
                ))
            )

        );
    },

    handleTexInsert: function(str) {
        this.refs.expression.insert(str);
    },

    handleFunctions: function(e) {
        var newProps = {};
        newProps.functions = _.compact(e.target.value.split(/[ ,]+/));
        this.props.onChange(newProps);
    },

    focus: function() {
        this.refs.expression.focus();
        return true;
    }
});

module.exports = {
    name: "expression",
    displayName: "Expression / Equation",
    getWidget: function(enabledFeatures)  {
        // Allow toggling between the two versions of the widget
        return enabledFeatures.useMathQuill ? Expression : OldExpression;
    },
    editor: ExpressionEditor,
    transform: function(editorProps)  {
        return _.pick(editorProps, "times", "functions");
    },
    hidden: true
};

},{"../components/input-with-examples.jsx":126,"../components/math-input.jsx":127,"../components/prop-check-box.jsx":130,"../components/tex-buttons.jsx":133,"../enabled-features.jsx":144,"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"../perseus-api.jsx":162,"../tex.jsx":167,"react":115,"react-components/info-tip":5,"react-components/tooltip":114}],177:[function(require,module,exports){
/** @jsx React.DOM */

/**
 * This is an iframe widget. It is used for rendering an iframe that
 *  then communicates its state via window.postMessage
 * This is useful for embedding arbitrary visualizations/simulations with
 *  completed conditions, such as the mazes and games in Algorithms.
 * It's particularly well suited for embedding our ProcessingJS programs,
 *  but could also be used for embedding viz's hosted elsewhere.
 */

var React = require("react");

var BlurInput    = require("react-components/blur-input");
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");
var updateQueryString = require("../util.js").updateQueryString;


/* This renders the iframe and handles validation via window.postMessage */
var Iframe = React.createClass({displayName: 'Iframe',

    mixins: [Changeable, JsonifyProps],

    propTypes: {
        status: React.PropTypes.string,
        message: React.PropTypes.string,
    },

    getDefaultProps: function() {
        return {
            // options: incomplete, incorrect, correct
            status: "incomplete",
            // optional message
            message: null
        };
    },

    componentDidMount: function() {
        // We receive data from the iframe that contains {passed: true/false}
        //  and use that to set the status
        // It could also contain an optional message
        $(window).bind("message", function(e)  {
            var data = {};
            try {
                data = JSON.parse(e.originalEvent.data);
            } catch (err) {
                return;
            }

            if (_.isUndefined(data.testsPassed)) {
                return;
            }

            var status = (data.testsPassed ? "correct" : "incorrect");
            this.change({
                status: status,
                message: data.message
            });

        }.bind(this));
    },

    render: function() {
        var style = {
            width: this.props.width,
            height: this.props.height
        };
        var url = this.props.url;

        // If the URL doesnt start with http, it must be a program ID
        if (url.length && url.indexOf("http") !== 0) {
            url = "http://khanacademy.org/cs/program/" + url +
                    "/embedded?buttons=no&embed=yes&editor=no&author=no";
            // Origin is used by output.js in deciding to send messages
            url = updateQueryString(url, "origin", window.location.origin);
        }

        // Turn array of [{name: "", value: ""}] into object
        if (this.props.settings) {
            var settings = {};
            _.each(this.props.settings, function(setting) {
                if (setting.name && setting.value) {
                    settings[setting.name] = setting.value;
                }
            });
            // This becomes available to programs as Program.settings()
            url = updateQueryString(url, "settings", JSON.stringify(settings));
        }

        // We sandbox the iframe so that we whitelist only the functionality
        //  that we need. This makes it a bit safer in case some content
        //  creator "went wild".
        // http://www.html5rocks.com/en/tutorials/security/sandboxed-iframes/
        return React.DOM.iframe( {sandbox:"allow-same-origin allow-scripts",
                       style:style, src:url} );
    },

    simpleValidate: function(rubric) {
        return Iframe.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});


/**
 * This is the widget's grading function
 */
_.extend(Iframe, {
    validate: function(state, rubric) {
        // The iframe can tell us whether it's correct or incorrect,
        //  and pass an optional message
        if (state.status === "correct") {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: state.message || null
            };
        } else if (state.status === "incorrect") {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: state.message || null
            };
        } else {
            return {
                type: "invalid",
                message: "Keep going, you're not there yet!"
            };
        }
    }
});


/**
 * This is used for editing a name/value pair.
 */
var PairEditor = React.createClass({displayName: 'PairEditor',

    mixins: [Changeable, JsonifyProps],

    propTypes: {
        name: React.PropTypes.string,
        value: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            name:  "",
            value: ""
        };
    },

    render: function() {
        return React.DOM.fieldset(null, 
                React.DOM.label(null, "Name:", 
                    BlurInput( {value:this.props.name,
                           onChange:this.change("name")} )
                ),
                React.DOM.label(null, "Value:",
                    BlurInput( {value:this.props.value,
                           onChange:this.change("value")} )
                )
            );
    }
});

/**
 * This is used for editing a set of name/value pairs.
 */
var PairsEditor = React.createClass({displayName: 'PairsEditor',

    mixins: [Changeable, JsonifyProps],

    propTypes: {
        pairs: React.PropTypes.arrayOf(React.PropTypes.shape({
            name: React.PropTypes.string,
            value: React.PropTypes.string
        })).isRequired
    },

    render: function() {
        var editors = _.map(this.props.pairs, function(pair, i)  {
            return PairEditor( {key:i, name:pair.name, value:pair.value,
                     onChange:this.handlePairChange.bind(this, i)});
        }.bind(this));
        return React.DOM.div(null, 
            editors
            );
    },

    handlePairChange: function(pairIndex, pair) {
        // If they're both non empty, add a new one
        var pairs = this.props.pairs.slice();
        pairs[pairIndex] = pair;
        
        var lastPair = pairs[pairs.length-1];
        if (lastPair.name && lastPair.value) {
            pairs.push({name: "", value: ""});
        }
        this.change("pairs", pairs);
    }
});

/**
 * This is the main editor for this widget, to specify all the options.
 */
var IframeEditor = React.createClass({displayName: 'IframeEditor',

    mixins: [Changeable, JsonifyProps],

    getDefaultProps: function() {
        return {
            url: "",
            settings: [{name: "", value: ""}],
            width: 400,
            height: 400
        };
    },

    render: function() {
        return React.DOM.div(null, 
            React.DOM.label(null, "Url or Program ID:",
                BlurInput( {name:"url",
                           value:this.props.url,
                           onChange:this.change("url")} )
            ),
            React.DOM.br(null),
            React.DOM.label(null, "Settings:",
                PairsEditor( {name:"settings",
                           pairs:this.props.settings,
                           onChange:this.handleSettingsChange} )
            ),
            React.DOM.br(null),
            React.DOM.label(null, "Width:", 
                BlurInput( {name:"width",
                           value:this.props.width,
                           onChange:this.change("width")} )
            ),
            React.DOM.label(null, "Height:", 
                BlurInput( {name:"height",
                           value:this.props.height,
                           onChange:this.change("height")} )
            )
        );
    },

    handleSettingsChange: function(settings) {
        this.change({settings: settings.pairs});
    }
});


module.exports = {
    name: "iframe",
    displayName: "Iframe",
    widget: Iframe,
    // Let's not expose it to all content creators yet
    hidden: true,
    editor: IframeEditor
};

},{"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"../util.js":168,"react":115,"react-components/blur-input":2}],178:[function(require,module,exports){
/** @jsx React.DOM */

var BlurInput    = require("react-components/blur-input");
var InfoTip      = require("react-components/info-tip");

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var Graphie      = require("../components/graphie.jsx");
var RangeInput   = require("../components/range-input.jsx");

var defaultBoxSize = 400;
var defaultRange = [0, 10];
var defaultBackgroundImage = {
    url: null,
    width: 0,
    height: 0
};

/**
 * Alignment option for captions, relative to specified coordinates.
 */
var alignments = [
    "center",
    "above",
    "above right",
    "right",
    "below right",
    "below",
    "below left",
    "left",
    "above left"
];

function blankLabel() {
    return {
        content: "",
        coordinates: [0, 0],
        alignment: "center"
    };
}

var ImageWidget = React.createClass({displayName: 'ImageWidget',
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        range: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.number
            )
        ),
        box: React.PropTypes.arrayOf(React.PropTypes.number),
        backgroundImage: React.PropTypes.shape({
            url: React.PropTypes.string,
            width: React.PropTypes.number,
            height: React.PropTypes.number
        }),
        labels: React.PropTypes.arrayOf(
            React.PropTypes.shape({
                content: React.PropTypes.string,
                coordinates: React.PropTypes.arrayOf(React.PropTypes.number),
                alignment: React.PropTypes.string
            })
        )
    },

    getDefaultProps: function() {
        return {
            range: [defaultRange, defaultRange],
            box: [defaultBoxSize, defaultBoxSize],
            backgroundImage: defaultBackgroundImage,
            labels: []
        };
    },

    render: function() {
        var image;
        var backgroundImage = this.props.backgroundImage;
        if (backgroundImage.url) {
            var style = {
                width: backgroundImage.width,
                height: backgroundImage.height
            };
            image = React.DOM.img( {style:style, src:backgroundImage.url} );
        }

        var box = this.props.box;

        return React.DOM.div(
                {className:"graphie-container",
                style:{
                    width: box[0],
                    height: box[1]
                }}, 
            image,
            Graphie(
                {ref:"graphie",
                box:this.props.box,
                range:this.props.range,
                options:_.pick(this.props, "box", "range", "labels"),
                setup:this.setupGraphie}
            )
        );
    },

    setupGraphie: function(graphie, options) {
        _.map(options.labels, function(label) {
            graphie.label(label.coordinates, label.content, label.alignment);
        });
    },

    simpleValidate: function(rubric) {
        return ImageWidget.validate(this.toJSON(), rubric);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});

_.extend(ImageWidget, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 0,
            total: 0,
            message: null
        };
    }
});

var ImageEditor = React.createClass({displayName: 'ImageEditor',
    mixins: [Changeable, JsonifyProps],

    componentDidMount: function() {
        // If URL already provided on page load, should display image
        var url = this.props.backgroundImage.url;
        this.onUrlChange(url);
    },

    getDefaultProps: function() {
        return {
            range: [defaultRange, defaultRange],
            box: [defaultBoxSize, defaultBoxSize],
            backgroundImage: defaultBackgroundImage,
            labels: []
        };
    },

    render: function() {
        var imageSettings = React.DOM.div( {className:"image-settings"}, 
            React.DOM.div(null, "Background image:"),
            React.DOM.div(null, "Url:",' ',
                BlurInput( {value:this.props.backgroundImage.url,
                           onChange:this.onUrlChange} ),
                InfoTip(null, 
                    React.DOM.p(null, "Create an image in graphie, or use the \"Add image\""+' '+
                    "function to create a background.")
                )
            )
        );

        return React.DOM.div( {className:"perseus-widget-image"}, 
            imageSettings
            
        );
    },

    _renderRowForLabel: function(label, i) {
        return React.DOM.tr( {key:i}, 
            React.DOM.td(null, 
                RangeInput(
                    {value:label.coordinates,
                    onChange:this.onCoordinateChange.bind(this, i)} )
            ),
            React.DOM.td( {style:{verticalAlign: "bottom", width: "5px"}}, 
                React.DOM.input(
                    {type:"text",
                    className:"graph-settings-axis-label",
                    value:label.content,
                    onChange:this.onContentChange.bind(this, i)} )
            ),
            React.DOM.td(null, 
                React.DOM.select(
                    {className:"perseus-widget-dropdown",
                    value:label.alignment,
                    onChange:this.onAlignmentChange.bind(this, i)}, 
                    alignments.map(function(alignment, i) {
                        return React.DOM.option( {key:"" + i, value:alignment}, 
                            alignment
                        );
                    }, this)
                )
            ),
            React.DOM.td(null, 
                React.DOM.a(
                    {href:"#",
                    className:"simple-button orange delete-label",
                    title:"Remove this label",
                    onClick:this.removeLabel.bind(this, i)}, 
                    React.DOM.span( {className:"icon-trash"} )
                )
            )
        );
    },

    addLabel: function(e) {
        e.preventDefault();
        var labels = this.props.labels.slice();
        var label = blankLabel();
        labels.push(label);
        this.props.onChange({
            labels: labels,
        });
    },

    removeLabel: function(labelIndex, e) {
        e.preventDefault();
        var labels = _(this.props.labels).clone();
        labels.splice(labelIndex, 1);
        this.props.onChange({labels: labels});
    },

    onCoordinateChange: function(labelIndex, newCoordinates) {
        var labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            coordinates: newCoordinates
        });
        this.props.onChange({labels: labels});
    },

    onContentChange: function(labelIndex, e) {
        var newContent = e.target.value;
        var labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            content: newContent
        });
        this.props.onChange({labels: labels});
    },

    onAlignmentChange: function(labelIndex, e) {
        var newAlignment = e.target.value;
        var labels = this.props.labels.slice();
        labels[labelIndex] = _.extend({}, labels[labelIndex], {
            alignment: newAlignment
        });
        this.props.onChange({labels: labels});
    },

    setUrl: function(url, width, height) {
        var image = _.clone(this.props.backgroundImage);
        image.url = url;
        image.width = width;
        image.height = height;
        var box = [image.width, image.height];
        this.props.onChange({
            backgroundImage: image,
            box: box
        });
    },

    onUrlChange: function(url) {
        if (url) {
            var img = new Image();
            img.onload = function()  {return this.setUrl(url, img.width, img.height);}.bind(this);
            img.src = url;
        } else {
            this.setUrl(url, 0, 0);
        }
    },

    onRangeChange: function(type, newRange) {
        var range = this.props.range.slice();
        range[type] = newRange;
        this.props.onChange({range: range});
    },
});

module.exports = {
    name: "image",
    displayName: "Image",
    widget: ImageWidget,
    editor: ImageEditor
};


},{"../components/graphie.jsx":125,"../components/range-input.jsx":131,"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"react-components/blur-input":2,"react-components/info-tip":5}],179:[function(require,module,exports){
/** @jsx React.DOM */

var React             = require('react');
var BlurInput         = require("react-components/blur-input");
var InfoTip           = require("react-components/info-tip");
var Renderer          = require("../renderer.jsx");
var TeX               = require("../tex.jsx");
var InputWithExamples = require("../components/input-with-examples.jsx");

var ApiOptions = require("../perseus-api.jsx").Options;
var Util = require("../util.js");
var EnabledFeatures = require("../enabled-features.jsx");

var toNumericString = KhanUtil.toNumericString;

var answerTypes = {
    number: {
        name: "Numbers",
        forms: "integer, decimal, proper, improper, mixed"
    },
    decimal: {
        name: "Decimals",
        forms: "decimal"
    },
    integer: {
        name: "Integers",
        forms: "integer"
    },
    rational: {
        name: "Fractions and mixed numbers",
        forms: "integer, proper, improper, mixed"
    },
    improper: {
        name: "Improper numbers (no mixed)",
        forms: "integer, proper, improper"
    },
    mixed: {
        name: "Mixed numbers (no improper)",
        forms: "integer, proper, mixed"
    },
    percent: {
        name: "Numbers or percents",
        forms: "integer, decimal, proper, improper, mixed, percent"
    },
    pi: {
        name: "Numbers with pi", forms: "pi"
    }
};

var formExamples = {
    "integer": function(options) { return $._("an integer, like $6$"); },
    "proper": function(options) {
        if (options.simplify === "optional") {
            return $._("a *proper* fraction, like $1/2$ or $6/10$");
        } else {
            return $._("a *simplified proper* fraction, like $3/5$");
        }
    },
    "improper": function(options) {
        if (options.simplify === "optional") {
            return $._("an *improper* fraction, like $10/7$ or $14/8$");
        } else {
            return $._("a *simplified improper* fraction, like $7/4$");
        }
    },
    "mixed": function(options) {
        return $._("a mixed number, like $1\\ 3/4$");
    },
    "decimal": function(options) {
        return $._("an *exact* decimal, like $0.75$");
    },
    "percent": function(options) {
        return $._("a percent, like $12.34\\%$");
    },
    "pi": function(options) {
        return $._("a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$");
    }
};

var InputNumber = React.createClass({displayName: 'InputNumber',
    propTypes: {
        currentValue: React.PropTypes.string,
        enabledFeatures: EnabledFeatures.propTypes,
    },

    getDefaultProps: function() {
        return {
            currentValue: "",
            size: "normal",
            answerType: "number",
            enabledFeatures: EnabledFeatures.defaults,
            apiOptions: ApiOptions.defaults
        };
    },

    shouldShowExamples: function() {
        return this.props.enabledFeatures.toolTipFormats &&
                this.props.answerType !== "number";
    },

    render: function() {
        if (this.props.apiOptions.staticRender) {
            var style = {
                borderRadius: "5px",
                padding: "4px",
                background: "white",
                border: "1px solid #a4a4a4"
            };
            return React.DOM.span( {style:style}, 
                TeX( {ref:"input", onClick:this._handleFocus}, 
                    this.props.currentValue
                )
            );
        } else {
            return InputWithExamples(
                    {ref:"input",
                    value:this.props.currentValue,
                    onChange:this.handleChange,
                    className:"perseus-input-size-" + this.props.size,
                    examples:this.examples(),
                    shouldShowExamples:this.shouldShowExamples(),
                    interceptFocus:this._getInterceptFocus(),
                    onFocus:this._handleFocus,
                    onBlur:this._handleBlur} );
        }
    },

    _handleFocus: function() {
        if (this.props.apiOptions.staticRender) {
            this.props.onFocus([], this.refs.input.getDOMNode());
        } else {
            this.props.onFocus([], this.refs.input.getInputDOMNode());
        }
    },

    _handleBlur: function() {
        this.props.onBlur([], this.refs.input.getInputDOMNode());
    },

    _getInterceptFocus: function() {
        return this.props.apiOptions.interceptInputFocus &&
                this._interceptFocus;
    },

    _interceptFocus: function() {
        this.props.onFocus([], this.refs.input.getInputDOMNode());
        var interceptProp = this.props.apiOptions.interceptInputFocus;
        if (interceptProp) {
            return interceptProp(
                this.props.widgetId,
                this.refs.input.getInputDOMNode()
            );
        }
    },

    handleChange: function(newValue) {
        this.props.onChange({ currentValue: newValue });
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    toJSON: function(skipValidation) {
        return {
            currentValue: this.props.currentValue
        };
    },

    simpleValidate: function(rubric, onInputError) {
        onInputError = onInputError || function() { };
        return InputNumber.validate(
            this.toJSON(),
            rubric,
            onInputError
        );
    },

    examples: function() {
        var type = this.props.answerType;
        var forms = answerTypes[type].forms.split(/\s*,\s*/);

        var examples = _.map(forms, function(form) {
            return formExamples[form](this.props);
        }, this);

        return [$._("**Acceptable Formats**")].concat(examples);
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(InputNumber, {
    validate: function(state, rubric, onInputError) {
        if (rubric.answerType == null) {
            rubric.answerType = "number";
        }
        var val = Khan.answerTypes.number.createValidatorFunctional(
            rubric.value, {
                simplify: rubric.simplify,
                inexact: rubric.inexact || undefined,
                maxError: rubric.maxError,
                forms: answerTypes[rubric.answerType].forms
            });

        var result = val(state.currentValue);

        // TODO(eater): Seems silly to translate result to this invalid/points
        // thing and immediately translate it back in ItemRenderer.scoreInput()
        if (result.empty) {
            var apiResult = onInputError(
                null, // reserved for some widget identifier
                state.currentValue,
                result.message
            );
            return {
                type: "invalid",
                message: (apiResult === false) ? null : result.message
            };
        } else {
            return {
                type: "points",
                earned: result.correct ? 1 : 0,
                total: 1,
                message: result.message
            };
        }
    }
});

var InputNumberEditor = React.createClass({displayName: 'InputNumberEditor',
    getDefaultProps: function() {
        return {
            value: "0",
            simplify: "required",
            size: "normal",
            inexact: false,
            maxError: 0.1,
            answerType: "number"
        };
    },

    handleAnswerChange: function(str) {
        var value = Util.firstNumericalParse(str) || 0;
        this.props.onChange({value: value});
    },

    render: function() {
        var answerTypeOptions = _.map(answerTypes, function(v, k) {
            return React.DOM.option( {value:k, key:k}, v.name);
        }, this);

        return React.DOM.div(null, 
            React.DOM.div(null, React.DOM.label(null, 
                ' ',"Correct answer:",' ',
                BlurInput( {value:"" + this.props.value,
                           onChange:this.handleAnswerChange,
                           ref:"input"} )
            )),

            React.DOM.div(null, 
            ' ',"Answer type:",' ',
            React.DOM.select(
                {value:this.props.answerType,
                onChange:function(e)  {
                    this.props.onChange({answerType: e.target.value});
                }.bind(this)}, 
                answerTypeOptions
            ),
            InfoTip(null, 
                React.DOM.p(null, "Use the default \"Numbers\" unless the answer must be in a"+' '+
                "specific form (e.g., question is about converting decimals to"+' '+
                "fractions).")
            )
            ),

            React.DOM.div(null, 
                React.DOM.label(null, 
                    ' ',"Width",' ',
                    React.DOM.select( {value:this.props.size,
                            onChange:function(e)  {
                                this.props.onChange({size: e.target.value});
                            }.bind(this)}, 
                        React.DOM.option( {value:"normal"}, "Normal (80px)"),
                        React.DOM.option( {value:"small"}, "Small (40px)")
                    )
                ),
                InfoTip(null, 
                    React.DOM.p(null, "Use size \"Normal\" for all text boxes, unless there are"+' '+
                    "multiple text boxes in one line and the answer area is too"+' '+
                    "narrow to fit them.")
                )
            )
        );
    },

    focus: function() {
        this.refs.input.getDOMNode().focus();
        return true;
    },

    toJSON: function() {
        return _.pick(this.props,
                "value", "simplify", "size", "inexact", "maxError",
                "answerType");
    }
});

var propTransform = function(editorProps)  {
    return _.pick(editorProps, "simplify", "size", "answerType");
};

module.exports = {
    name: "input-number",
    displayName: "Number text box",
    widget: InputNumber,
    editor: InputNumberEditor,
    transform: propTransform
};

},{"../components/input-with-examples.jsx":126,"../enabled-features.jsx":144,"../perseus-api.jsx":162,"../renderer.jsx":165,"../tex.jsx":167,"../util.js":168,"react":115,"react-components/blur-input":2,"react-components/info-tip":5}],180:[function(require,module,exports){
/** @jsx React.DOM */

var React         = require('react');
var Graph         = require("../components/graph.jsx");
var GraphSettings = require("../components/graph-settings.jsx");
var InfoTip       = require("react-components/info-tip");
var Interactive2  = require("../interactive2.js");
var NumberInput   = require("../components/number-input.jsx");
var Util          = require("../util.js");

var knumber = KhanUtil.knumber;
var kpoint  = KhanUtil.kpoint;

var DeprecationMixin = Util.DeprecationMixin;


var TRASH_ICON_URI = 'https://ka-perseus-graphie.s3.amazonaws.com/b1452c0d79fd0f7ff4c3af9488474a0a0decb361.png';

var defaultBoxSize = 400;
var defaultEditorBoxSize = 340;
var defaultBackgroundImage = {
    url: null,
    scale: 1,
    bottom: 0,
    left: 0
};

var eq = Util.eq;
var deepEq = Util.deepEq;

var UNLIMITED = "unlimited";

// Sample background image:
// https://ka-perseus-graphie.s3.amazonaws.com/29c1b0fcd17fe63df0f148fe357044d5d5c7d0bb.png

function ccw(a, b, c) {
    return (b[0] - a[0]) * (c[1] - a[1]) - (c[0] - a[0]) * (b[1] - a[1]);
}

function collinear(a, b, c) {
    return eq(ccw(a, b, c), 0);
}

function sign(val) {
    if (eq(val, 0)) {
        return 0;
    } else {
        return val > 0 ? 1 : -1;
    }
}

// default to defaultValue if actual is null or undefined
function defaultVal(actual, defaultValue) {
    return (actual == null) ? defaultValue : actual;
}

// Given rect bounding points A and B, whether point C is inside the rect
function pointInRect(a, b, c) {
    return (c[0] <= Math.max(a[0], b[0]) && c[0] >= Math.min(a[0], b[0]) &&
            c[1] <= Math.max(a[1], b[1]) && c[1] >= Math.min(a[1], b[1]));
}

// Whether line segment AB intersects line segment CD
// http://www.geeksforgeeks.org/check-if-two-given-line-segments-intersect/
function intersects(ab, cd) {
    var triplets = [
        [ab[0], ab[1], cd[0]],
        [ab[0], ab[1], cd[1]],
        [cd[0], cd[1], ab[0]],
        [cd[0], cd[1], ab[1]]
    ];

    var orientations = _.map(triplets, function(triplet) {
        return sign(ccw.apply(null, triplet));
    });

    if (orientations[0] !== orientations[1] &&
        orientations[2] !== orientations[3]) {
        return true;
    }

    for (var i = 0; i < 4; i++) {
        if (orientations[i] === 0 && pointInRect.apply(null, triplets[i])) {
            return true;
        }
    }

    return false;
}

function vector(a, b) {
    return _.map(_.zip(a, b), function(pair) {
        return pair[0] - pair[1];
    });
}

function magnitude(v) {
    return Math.sqrt(_.reduce(v, function(memo, el) {
        return memo + Math.pow(el, 2);
    }, 0));
}

function dotProduct(a, b) {
    return _.reduce(_.zip(a, b), function(memo, pair) {
        return memo + pair[0] * pair[1];
    }, 0);
}

function sideLengths(coords) {
    var segments = _.zip(coords, rotate(coords));
    return _.map(segments, function(segment) {
        return magnitude(vector.apply(null, segment));
    });
}

// Based on http://math.stackexchange.com/a/151149
function angleMeasures(coords) {
    var triplets = _.zip(rotate(coords, -1), coords, rotate(coords, 1));

    var offsets = _.map(triplets, function(triplet) {
        var p = vector(triplet[1], triplet[0]);
        var q = vector(triplet[2], triplet[1]);
        var raw = Math.acos(dotProduct(p, q) / (magnitude(p) * magnitude(q)));
        return sign(ccw.apply(null, triplet)) > 0 ? raw : -raw;
    });

    var sum = _.reduce(offsets, function(memo, arg) { return memo + arg; }, 0);

    return _.map(offsets, function(offset) {
        return sum > 0 ? Math.PI - offset : Math.PI + offset;
    });
}

// Whether two polygons are similar (or if specified, congruent)
function similar(coords1, coords2, tolerance) {
    if (coords1.length !== coords2.length) {
        return false;
    }

    var n = coords1.length;

    var angles1 = angleMeasures(coords1);
    var angles2 = angleMeasures(coords2);

    var sides1 = sideLengths(coords1);
    var sides2 = sideLengths(coords2);

    for (var i = 0; i < 2 * n; i++) {
        var angles = angles2.slice();
        var sides = sides2.slice();

        // Reverse angles and sides to allow matching reflected polygons
        if (i >= n) {
            angles.reverse();
            sides.reverse();
            // Since sides are calculated from two coordinates,
            // simply reversing results in an off by one error
            sides = rotate(sides, 1);
        }

        angles = rotate(angles, i);
        sides = rotate(sides, i);

        if (deepEq(angles1, angles)) {
            var sidePairs = _.zip(sides1, sides);

            var factors = _.map(sidePairs, function(pair) {
                return pair[0] / pair[1];
            });

            var same = _.all(factors, function(factor) {
                return eq(factors[0], factor);
            });

            var congruentEnough = _.all(sidePairs, function(pair) {
                return knumber.equal(pair[0], pair[1], tolerance);
            });

            if (same && congruentEnough) {
                return true;
            }
        }
    }

    return false;
}

// Less than or approximately equal
function leq(a, b) {
    return a < b || eq(a, b);
}

// Given triangle with sides ABC return angle opposite side C in degrees
function lawOfCosines(a, b, c) {
    return Math.acos((a * a + b * b - c * c) / (2 * a * b)) * 180 / Math.PI;
}

function canonicalSineCoefficients(coeffs) {
    // For a curve of the form f(x) = a * Sin(b * x - c) + d,
    // this function ensures that a, b > 0, and c is its
    // smallest possible positive value.
    var amplitude = coeffs[0];
    var angularFrequency = coeffs[1];
    var phase = coeffs[2];
    var verticalOffset = coeffs[3];

    // Guarantee a > 0
    if (amplitude < 0) {
        amplitude *= -1;
        angularFrequency *= -1;
        phase *= -1;
    }

    var period = 2 * Math.PI;
    // Guarantee b > 0
    if (angularFrequency < 0) {
        angularFrequency *= -1;
        phase *= -1;
        phase += period / 2;
    }

    // Guarantee c is smallest possible positive value
    while (phase > 0) {
        phase -= period;
    }
    while (phase < 0) {
        phase += period;
    }

    return [amplitude, angularFrequency, phase, verticalOffset];
}

// e.g. rotate([1, 2, 3]) -> [2, 3, 1]
function rotate(array, n) {
    n = (typeof n === "undefined") ? 1 : (n % array.length);
    return array.slice(n).concat(array.slice(0, n));
}

function capitalize(str) {
    return str.replace(/(?:^|-)(.)/g, function(match, letter) {
        return letter.toUpperCase();
    });
}

function getLineEquation(first, second) {
    if (eq(first[0], second[0])) {
        return "x = " + first[0].toFixed(3);
    } else {
        var m = (second[1] - first[1]) /
                (second[0] - first[0]);
        var b = first[1] - m * first[0];
        return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
    }
}

// Stolen from the wikipedia article
// http://en.wikipedia.org/wiki/Line-line_intersection
function getLineIntersection(firstPoints, secondPoints) {
    var x1 = firstPoints[0][0],
        y1 = firstPoints[0][1],
        x2 = firstPoints[1][0],
        y2 = firstPoints[1][1],
        x3 = secondPoints[0][0],
        y3 = secondPoints[0][1],
        x4 = secondPoints[1][0],
        y4 = secondPoints[1][1];

    var determinant = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4);

    if (Math.abs(determinant) < 1e-9) {
        return "Lines are parallel";
    } else {
        var x = ((x1 * y2 - y1 * x2) * (x3 - x4) -
                 (x1 - x2) * (x3 * y4 - y3 * x4)) / determinant;
        var y = ((x1 * y2 - y1 * x2) * (y3 - y4) -
                 (y1 - y2) * (x3 * y4 - y3 * x4)) / determinant;
        return "Intersection: (" + x.toFixed(3) + ", " + y.toFixed(3) + ")";
    }
}

function numSteps(range, step) {
    return Math.floor((range[1] - range[0]) / step);
}

var deprecatedProps = {
    showGraph: function(props) {
        return {markings: props.showGraph ? "graph" : "none"};
    }
};


var InteractiveGraph = React.createClass({displayName: 'InteractiveGraph',

    getInitialState: function() {
        return {
            shouldShowInstructions: this._getShouldShowInstructions()
        };
    },

    getDefaultProps: function() {
        var range = this.props.range || [[-10, 10], [-10, 10]];
        var step = this.props.step || [1, 1];
        var gridStep = this.props.gridStep ||
                   Util.getGridStep(range, step, defaultBoxSize);
        var snapStep = this.props.snapStep ||
                   Util.snapStepFromGridStep(gridStep);
        return {
            labels: ["x", "y"],
            range: range,
            box: [defaultBoxSize, defaultBoxSize],
            step: step,
            gridStep: gridStep,
            snapStep: snapStep,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            graph: {
                type: "linear"
            }
        };
    },

    mixins: [DeprecationMixin],
    deprecatedProps: deprecatedProps,

    _getShouldShowInstructions: function(props) {
        props = props || this.props;
        return this.isClickToAddPoints(props) && (
            props.graph.coords == null || props.graph.coords.length === 0
        );
    },

    componentDidUpdate: function(prevProps, prevState) {
        var oldType = prevProps.graph.type;
        var newType = this.props.graph.type;
        if (oldType !== newType ||
                prevProps.graph.allowReflexAngles !==
                    this.props.graph.allowReflexAngles ||
                prevProps.graph.angleOffsetDeg !==
                    this.props.graph.angleOffsetDeg ||
                prevProps.graph.numPoints !== this.props.graph.numPoints ||
                prevProps.graph.numSides !== this.props.graph.numSides ||
                prevProps.graph.numSegments !== this.props.graph.numSegments ||
                prevProps.graph.showAngles !== this.props.graph.showAngles ||
                prevProps.graph.showSides !== this.props.graph.showSides ||
                prevProps.graph.snapTo !== this.props.graph.snapTo ||
                prevProps.graph.snapDegrees !== this.props.graph.snapDegrees) {
            this["remove" + capitalize(oldType) + "Controls"]();
            this["add" + capitalize(newType) + "Controls"]();
        }
        if (this.shouldResetGraphie) {
            this.resetGraphie();
        }
    },

    render: function() {
        var typeSelect;
        var extraOptions;
        if (this.props.flexibleType) {
            typeSelect = React.DOM.select(
                    {value:this.props.graph.type,
                    onChange:function(e)  {
                        var type = e.target.value;
                        this.props.onChange({
                            graph: {type: type}
                        });
                    }.bind(this)}, 
                React.DOM.option( {value:"linear"}, "Linear function"),
                React.DOM.option( {value:"quadratic"}, "Quadratic function"),
                React.DOM.option( {value:"sinusoid"}, "Sinusoid function"),
                React.DOM.option( {value:"circle"}, "Circle"),
                React.DOM.option( {value:"point"}, "Point(s)"),
                React.DOM.option( {value:"linear-system"}, "Linear System"),
                React.DOM.option( {value:"polygon"}, "Polygon"),
                React.DOM.option( {value:"segment"}, "Line Segment(s)"),
                React.DOM.option( {value:"ray"}, "Ray"),
                React.DOM.option( {value:"angle"}, "Angle")
            );

            if (this.props.graph.type === "point") {
                extraOptions = React.DOM.select(
                        {key:"point-select",
                        value:this.props.graph.numPoints || 1,
                        onChange:function(e)  {
                            // Convert numbers, leave UNLIMITED intact:
                            var num = +e.target.value || e.target.value;
                            this.props.onChange({
                                graph: {
                                    type: "point",
                                    numPoints: num,
                                    coords: null
                                }
                            });
                        }.bind(this)}, 
                    _.map(_.range(1, 7), function(n) {
                        return React.DOM.option( {value:n}, 
                            n, " point",n > 1 && "s"
                        );
                    }),
                    React.DOM.option( {value:UNLIMITED}, "unlimited")
                );
            } else if (this.props.graph.type === "polygon") {
                extraOptions = React.DOM.div(null, 
                    React.DOM.div(null, 
                        React.DOM.select(
                            {key:"polygon-select",
                            value:this.props.graph.numSides || 3,
                            onChange:function(e)  {
                                // Convert numbers, leave UNLIMITED intact:
                                var num = +e.target.value || e.target.value;
                                var graph = _.extend({}, this.props.graph, {
                                    numSides: num,
                                    coords: null,
                                    snapTo: "grid" // reset the snap for
                                                   // UNLIMITED, which only
                                                   // supports "grid"
                                });
                                this.props.onChange({graph: graph});
                            }.bind(this)}, 
                            _.map(_.range(3, 13), function(n) {
                                return React.DOM.option( {value:n}, n, " sides");
                            }),
                            React.DOM.option( {value:UNLIMITED}, "unlimited sides")
                        )
                    ),
                    React.DOM.div(null, 
                        React.DOM.label(null,  " Snap to",' ',
                            React.DOM.select(
                                {key:"polygon-snap",
                                value:this.props.graph.snapTo,
                                onChange:function(e)  {
                                    var graph = _.extend({},
                                        this.props.graph,
                                        {
                                            snapTo: e.target.value,
                                            coords: null
                                        });
                                    this.props.onChange({graph: graph});
                                }.bind(this)}, 
                                React.DOM.option( {value:"grid"}, "grid"),
                                (this.props.graph.numSides !== UNLIMITED) && [
                                    React.DOM.option( {value:"angles"}, 
                                        ' ',"interior angles",' '
                                    ),
                                    React.DOM.option( {value:"sides"}, 
                                        ' ',"side measures",' '
                                    )
                                ]
                            )
                        ),
                        InfoTip(null, 
                            React.DOM.p(null, "These options affect the movement of the vertex"+' '+
                            "points. The grid option will guide the points to"+' '+
                            "the nearest half step along the grid."),

                            React.DOM.p(null, "The interior angle and side measure options"+' '+
                            "guide the points to the nearest whole angle or"+' '+
                            "side"), " measure respectively.",' '
                        )
                    ),
                    React.DOM.div(null, 
                        React.DOM.label(null, "Show angle measures:",' ',
                            React.DOM.input( {type:"checkbox",
                                checked:this.props.graph.showAngles,
                                onChange:this.toggleShowAngles} )
                        ),
                        InfoTip(null, 
                            React.DOM.p(null, "Displays the interior angle measures.")
                        )
                    ),
                    React.DOM.div(null, 
                        React.DOM.label(null, "Show side measures:",' ',
                            React.DOM.input( {type:"checkbox",
                                checked:this.props.graph.showSides,
                                onChange:this.toggleShowSides} )
                        ),
                        InfoTip(null, 
                            React.DOM.p(null, "Displays the side lengths.")
                        )
                    )
                );
            } else if (this.props.graph.type === "segment") {
                extraOptions = React.DOM.select(
                        {key:"segment-select",
                        value:this.props.graph.numSegments || 1,
                        onChange:function(e)  {
                            var num = +e.target.value;
                            this.props.onChange({
                                graph: {
                                    type: "segment",
                                    numSegments: num,
                                    coords: null
                                }
                            });
                        }.bind(this)}, 
                    _.map(_.range(1, 7), function(n) {
                        return React.DOM.option( {value:n}, 
                            n, " segment",n > 1 && "s"
                        );
                    })
                );
            } else if (this.props.graph.type === "angle") {
                var allowReflexAngles = defaultVal(
                    this.props.graph.allowReflexAngles,
                    true
                );
                extraOptions = React.DOM.div(null, 
                    React.DOM.div(null, 
                        React.DOM.label(null, "Show angle measure:",' ',
                            React.DOM.input( {type:"checkbox",
                                checked:this.props.graph.showAngles,
                                onChange:this.toggleShowAngles} )
                        )
                    ),
                    React.DOM.div(null, 
                        React.DOM.label(null, "Allow reflex angles:",' ',
                            React.DOM.input( {type:"checkbox",
                                checked:allowReflexAngles,
                                onChange:function(newVal)  {
                                    this.props.onChange({
                                        graph: _.extend({}, this.props.graph, {
                                            allowReflexAngles:
                                                    !allowReflexAngles,
                                            coords: null
                                        })
                                    });
                                }.bind(this)} )
                        ),
                        InfoTip(null, 
                            React.DOM.p(null, 
                                "Reflex angles are angles with a measure"+' '+
                                "greater than 180 degrees."
                            ),
                            React.DOM.p(null, 
                                "By default, these should remain enabled."
                            )
                        )
                    ),
                    React.DOM.div(null, 
                        React.DOM.label(null, "Snap to increments of",' ',
                            NumberInput(
                                {key:"degree-snap",
                                placeholder:1,
                                value:this.props.graph.snapDegrees,
                                onChange:function(newVal)  {
                                    this.props.onChange({
                                        graph: _.extend({}, this.props.graph, {
                                            snapDegrees: Math.abs(newVal),
                                            coords: null
                                        })
                                    });
                                }.bind(this)} ),
                            ' ',"degrees",' '
                        )
                    ),
                    React.DOM.div(null, 
                        React.DOM.label(null, 
                            ' ',"With an offset of",' ',
                            NumberInput(
                                {key:"angle-offset",
                                placeholder:0,
                                value:this.props.graph.angleOffsetDeg,
                                onChange:function(newVal)  {
                                    this.props.onChange({
                                        graph: _.extend({}, this.props.graph, {
                                            angleOffsetDeg: newVal,
                                            coords: null
                                        })
                                    });
                                }.bind(this)} ),
                            ' ',"degrees",' '
                        )
                    )
                );
            }
        }

        var box = this.props.box;

        var image = this.props.backgroundImage;
        if (image.url) {
            var preScale = box[0] / defaultBoxSize;
            var scale = image.scale * preScale;
            var style = {
                bottom: (preScale * image.bottom) + "px",
                left: (preScale * image.left) + "px",
                width: (scale * image.width) + "px",
                height: (scale * image.height) + "px"
            };
            image = React.DOM.img( {style:style, src:image.url} );
        } else {
            image = null;
        }

        var instructions;
        if (this.isClickToAddPoints() && this.state.shouldShowInstructions) {
            if  (this.props.graph.type === "point") {
                instructions = $._("Click to add points");
            } else if (this.props.graph.type === "polygon") {
                instructions = $._("Click to add vertices");
            }
        } else {
            instructions = undefined;
        }

        var onMouseDown = this.isClickToAddPoints() ?
            this.handleAddPointsMouseDown :
            null;

        return React.DOM.div( {className:"perseus-widget " +
                    "perseus-widget-interactive-graph",
                    style:{
                        width: box[0],
                        height: this.props.flexibleType ? "auto" : box[1]
                    }}, 
            Graph(
                {instructions:instructions,
                ref:"graph",
                box:this.props.box,
                labels:this.props.labels,
                range:this.props.range,
                step:this.props.step,
                gridStep:this.props.gridStep,
                snapStep:this.props.snapStep,
                markings:this.props.markings,
                backgroundImage:this.props.backgroundImage,
                showProtractor:this.props.showProtractor,
                showRuler:this.props.showRuler,
                rulerLabel:this.props.rulerLabel,
                rulerTicks:this.props.rulerTicks,
                onMouseDown:onMouseDown,
                onNewGraphie:this.setGraphie} ),
            typeSelect,extraOptions
        );
    },

    setGraphie: function(newGraphie) {
        this.graphie = newGraphie;
        this.setupGraphie();
    },

    handleAddPointsMouseDown: function(coord) {
        // This function should only be called when this.isClickToAddPoints()
        // is true
        if (!this.isClickToAddPoints()) {
            throw new Error("handleAddPointsClick should not be registered" +
                "when isClickToAddPoints() is false");
        }
        if (!this.isCoordInTrash(coord)) {
            var point;
            if (this.props.graph.type === "point") {
                point = this.createPointForPointsType(
                    coord,
                    this.points.length
                );
                if (!point.constrain()) {
                    point.remove();
                    return;
                }
                this.points.push(point);

                // interactive2 allows us to grab the point
                var idx = this.points.length - 1;
                this.points[idx].grab(coord);

                this.updateCoordsFromPoints();
            } else if (this.props.graph.type === "polygon") {
                if (this.polygon.closed) {
                    return;
                }
                point = this.createPointForPolygonType(
                    coord,
                    this.points.length
                );
                this.points.push(point);

                var idx = this.points.length - 1;
                this.points[idx].grab();

                // We don't call updateCoordsFromPoints for
                // polygons, since the polygon won't be
                // closed yet.
                this.updatePolygon();
            }

            this.setState({
                shouldShowInstructions: false
            });
        }
    },

    resetGraphie: function() {
        this.shouldResetGraphie = false;
        this.refs.graph.reset();
    },

    setupGraphie: function() {
        this.setTrashCanVisibility(0);
        if (this.isClickToAddPoints()) {
            this.setTrashCanVisibility(0.5);
        }

        var type = this.props.graph.type;
        this["add" + capitalize(type) + "Controls"]();
    },

    setTrashCanVisibility: function(opacity) {
        var graphie = this.graphie;

        if (knumber.equal(opacity, 0)) {
            if (this.trashCan) {
                this.trashCan.remove();
                this.trashCan = null;
            }
        } else {
            if (!this.trashCan) {
                this.trashCan = graphie.raphael.image(TRASH_ICON_URI,
                    graphie.xpixels - 40,
                    graphie.ypixels - 40,
                    40,
                    40
                );
            }
            // TODO(jack): svg opacity is broken in chrome 34.
            // Uncomment this once chrome 35 is out.
            //this.trashCan.attr({
            //    opacity: opacity
            //});
        }
    },

    componentWillReceiveProps: function(nextProps) {
        if (this.isClickToAddPoints() !== this.isClickToAddPoints(nextProps)) {
            this.shouldResetGraphie = true;
            this.setState({
                shouldShowInstructions:
                        this._getShouldShowInstructions(nextProps)
            });
        }
    },

    isClickToAddPoints: function(props) {
        props = props || this.props;
        return (props.graph.type === "point" &&
                props.graph.numPoints === UNLIMITED) ||
               (props.graph.type === "polygon" &&
                props.graph.numSides === UNLIMITED);
    },

    addLine: function(type) {
        var self = this;
        var graphie = self.graphie;
        var coords = InteractiveGraph.getLineCoords(
            self.props.graph,
            self.props
        );

        var points = self.points = _.map(coords, function(coord)  {
            return Interactive2.addMovablePoint(graphie, {
                coord: coord,
                constraints: [
                    Interactive2.MovablePoint.constraints.bound(),
                    Interactive2.MovablePoint.constraints.snap()
                ],
                onMove: function()  {
                    var graph = _.extend({}, self.props.graph, {
                        coords: _.invoke(points, "coord")
                    });
                    self.props.onChange({graph: graph});
                },
                normalStyle: {
                    stroke: KhanUtil.INTERACTIVE,
                    fill: KhanUtil.INTERACTIVE
                }
            });
        });

        var lineConfig = {
            points: points,
            static: true
        };

        if (type === "line") {
            lineConfig.extendLine = true;
        } else if (type === "ray") {
            lineConfig.extendRay = true;
        }

        var line = self.line = Interactive2.addMovableLine(
            graphie,
            lineConfig
        );

        // A and B can't be in the same place
        points[0].listen("constraints", "isLine", function(coord)  {
            return !kpoint.equal(coord, points[1].coord());
        });
        points[1].listen("constraints", "isLine", function(coord)  {
            return !kpoint.equal(coord, points[0].coord());
        });
    },

    removeLine: function() {
        _.invoke(this.points, "remove");
        this.line.remove();
    },

    addLinearControls: function() {
        this.addLine("line");
    },

    removeLinearControls: function() {
        this.removeLine();
    },

    addQuadraticControls: function() {
        var graphie = this.graphie;
        var coords = this.props.graph.coords;
        if (!coords) {
            coords = InteractiveGraph.defaultQuadraticCoords(this.props);
        }

        var pointA = this.pointA = graphie.addMovablePoint({
            coord: coords[0],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {
                stroke: KhanUtil.INTERACTIVE,
                fill: KhanUtil.INTERACTIVE
            }
        });

        var pointB = this.pointB = graphie.addMovablePoint({
            coord: coords[1],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {
                stroke: KhanUtil.INTERACTIVE,
                fill: KhanUtil.INTERACTIVE
            }
        });

        var pointC = this.pointC = graphie.addMovablePoint({
            coord: coords[2],
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {
                stroke: KhanUtil.INTERACTIVE,
                fill: KhanUtil.INTERACTIVE
            }
        });

        // A, B, and C can't be in the same place
        pointA.onMove = function(x, y) {
            return x !== pointB.coord[0] && x !== pointC.coord[0];
        };
        pointB.onMove = function(x, y) {
            return x !== pointA.coord[0] && x !== pointC.coord[0];
        };
        pointC.onMove = function(x, y) {
            return x !== pointA.coord[0] && x !== pointB.coord[0];
        };

        this.updateQuadratic();

        $([pointA, pointB, pointC]).on("move", function()  {
            var graph = _.extend({}, this.props.graph, {
                coords: [pointA.coord, pointB.coord, pointC.coord]
            });
            this.props.onChange({graph: graph});
            this.updateQuadratic();
        }.bind(this));
    },

    updateQuadratic: function() {
        if (this.parabola) {
            this.parabola.remove();
        }

        var coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(
                this.props);
        if (!coeffs) {
            return;
        }

        var a = coeffs[0], b = coeffs[1], c = coeffs[2];
        this.parabola = this.graphie.plot(function(x) {
            return (a * x + b) * x + c;
        }, this.props.range[0]).attr({
            stroke: KhanUtil.INTERACTIVE
        });
        this.parabola.toBack();
    },

    removeQuadraticControls: function() {
        this.pointA.remove();
        this.pointB.remove();
        this.pointC.remove();
        if (this.parabola) {
            this.parabola.remove();
        }
    },

    addSinusoidControls: function() {
        var graphie = this.graphie;
        var coords = this.props.graph.coords;
        if (!coords) {
            coords = InteractiveGraph.defaultSinusoidCoords(this.props);
        }

        var pointA = this.pointA = Interactive2.addMovablePoint(graphie, {
            coord: coords[0],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                function(coord)  {
                    return !pointA || coord[0] !== pointB.coord()[0];
                }
            ],
            onMove: function()  {
                var graph = _.extend({}, this.props.graph, {
                    coords: [pointA.coord(), pointB.coord()]
                });
                this.props.onChange({graph: graph});
                this.updateSinusoid();
            }.bind(this),
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        var pointB = this.pointB = Interactive2.addMovablePoint(graphie, {
            coord: coords[1],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                function(coord)  {
                    return !pointA || coord[0] !== pointA.coord()[0];
                }
            ],
            onMove: function()  {
                var graph = _.extend({}, this.props.graph, {
                    coords: [pointA.coord(), pointB.coord()]
                });
                this.props.onChange({graph: graph});
                this.updateSinusoid();
            }.bind(this),
            normalStyle: {
                stroke: KhanUtil.BLUE,
                fill: KhanUtil.BLUE
            }
        });

        this.updateSinusoid();
    },

    updateSinusoid: function() {
        if (this.sinusoid) {
            this.sinusoid.remove();
        }

        var coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(
                this.props);
        if (!coeffs) {
            return;
        }

        var a = coeffs[0], b = coeffs[1], c = coeffs[2], d = coeffs[3];
        this.sinusoid = this.graphie.plot(function(x) {
            return a * Math.sin(b * x - c) + d;
        }, this.props.range[0]).attr({
            stroke: KhanUtil.BLUE
        });
        this.sinusoid.toBack();
    },

    removeSinusoidControls: function() {
        this.pointA.remove();
        this.pointB.remove();
        if (this.sinusoid) {
            this.sinusoid.remove();
        }
    },

    addCircleControls: function() {
        var graphie = this.graphie;
        var minSnap = _.min(graphie.snap);

        var circle = this.circle = graphie.addCircleGraph({
            center: this.props.graph.center || [0, 0],
            radius: this.props.graph.radius || _.min(this.props.step),
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            minRadius: minSnap * 2,
            snapRadius: minSnap
        });

        $(circle).on("move", function()  {
            var graph = _.extend({}, this.props.graph, {
                center: circle.center,
                radius: circle.radius
            });
            this.props.onChange({graph: graph});
        }.bind(this));
    },

    removeCircleControls: function() {
        this.circle.remove();
    },

    addLinearSystemControls: function() {
        var graphie = this.graphie;
        var coords = InteractiveGraph.getLinearSystemCoords(this.props.graph,
            this.props);

        var segmentColors = [KhanUtil.INTERACTIVE, KhanUtil.GREEN];
        var points = this.points = _.map(coords,
                function(segmentCoords, segmentIndex)  {
            var segmentPoints = _.map(segmentCoords, function(coord, i)  {
                return Interactive2.addMovablePoint(graphie, {
                    coord: coord,
                    constraints: [
                        Interactive2.MovablePoint.constraints.bound(),
                        Interactive2.MovablePoint.constraints.snap(),
                        function(coord)  {
                            if (!segmentPoints) {
                                // points hasn't been defined yet because
                                // we're still creating them
                                return;
                            }
                            return !kpoint.equal(
                                coord,
                                segmentPoints[1 - i].coord()
                            );
                        }
                    ],
                    onMove: function()  {
                        var graph = _.extend({}, this.props.graph, {
                            coords: _.map(
                                this.points,
                                function(segment)  {return _.invoke(segment, "coord");}
                            )
                        });
                        this.props.onChange({graph: graph});
                    }.bind(this),
                    normalStyle: {
                        stroke: segmentColors[segmentIndex],
                        fill: segmentColors[segmentIndex]
                    }
                });
            }.bind(this));
            return segmentPoints;
        }.bind(this));

        var lines = this.lines = _.map(points,
                function(segmentPoints, segmentIndex)  {
            return Interactive2.addMovableLine(graphie, {
                points: segmentPoints,
                static: true,
                extendLine: true,
                normalStyle: {
                    stroke: segmentColors[segmentIndex]
                }
            });
        });
    },

    removeLinearSystemControls: function() {
        _.invoke(this.lines, "remove");
        _.map(this.points, function(segment)  {return _.invoke(segment, "remove");});
    },

    isCoordInTrash: function(coord) {
        var graphie = this.graphie;
        var screenPoint = graphie.scalePoint(coord);
        return screenPoint[0] >= graphie.xpixels - 40 &&
                screenPoint[1] >= graphie.ypixels - 40;
    },

    createPointForPointsType: function(coord, i) {
        var self = this;
        var graphie = self.graphie;
        var point = Interactive2.addMovablePoint(graphie, {
            coord: coord,
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            constraints: [
                Interactive2.MovablePoint.constraints.bound(),
                Interactive2.MovablePoint.constraints.snap(),
                function(coord) {
                    // TODO(jack): There ought to be a
                    // MovablePoint.constraints.avoid
                    // default that lets you do things like this
                    return _.all(self.points, function(pt) {
                        return point === pt ||
                            !kpoint.equal(coord, pt.coord());
                    });
                }
            ],
            onMoveStart: function() {
                if (self.isClickToAddPoints()) {
                    self.setTrashCanVisibility(1);
                }
            },
            onMove: self.updateCoordsFromPoints,
            onMoveEnd: function(coord) {
                if (self.isClickToAddPoints()) {
                    if (self.isCoordInTrash(coord)) {
                        // remove this point from points
                        self.points = _.filter(self.points, function(pt) {
                            return pt !== point;
                        });
                        // update the correct answer box
                        self.updateCoordsFromPoints();

                        // remove this movablePoint from graphie.
                        // we wait to do this until we're not inside of
                        // said point's onMoveEnd method so its state is
                        // consistent throughout this method call
                        setTimeout(point.remove.bind(point), 0);
                    }
                    // In case we mouseup'd off the graphie and that
                    // stopped the move (in which case, we might not
                    // be in isCoordInTrash()
                    self.setTrashCanVisibility(0.5);
                }
            },
            normalStyle: {
                stroke: KhanUtil.INTERACTIVE,
                fill: KhanUtil.INTERACTIVE
            }
        });

        return point;
    },

    removePoint: function(point) {
        var index = null;
        this.points = _.filter(this.points, function(pt, i) {
            if (pt === point) {
                index = i;
                return false;
            } else {
                return true;
            }
        });
        return index;
    },

    createPointForPolygonType: function(coord, i) {
        var self = this;
        var graphie = this.graphie;

        // TODO(alex): check against "grid" instead, use constants
        var snapToGrid = !_.contains(["angles", "sides"],
            this.props.graph.snapTo);

        var point = graphie.addMovablePoint(_.extend({
            coord: coord,
            normalStyle: {
                stroke: KhanUtil.INTERACTIVE,
                fill: KhanUtil.INTERACTIVE
            }
        }, snapToGrid ? {
            snapX: graphie.snap[0],
            snapY: graphie.snap[1]
        } : {}
        ));

        // Index relative to current point -> absolute index
        // NOTE: This does not work when isClickToAddPoints() == true,
        // as `i` can be changed by dragging a point to the trash
        // Currently this function is only called when !isClickToAddPoints()
        function rel(j) {
            return (i + j + self.points.length) % self.points.length;
        }

        point.hasMoved = false;

        point.onMove = function(x, y)  {
            var coords = _.pluck(this.points, "coord");
            coords[i] = [x, y];
            if (!kpoint.equal([x, y], point.coord)) {
                point.hasMoved = true;
            }

            // Check for invalid positioning, but only if we aren't adding
            // points one click at a time, since those added points could
            // have already violated these constraints
            if (!self.isClickToAddPoints()) {
                // Polygons can't have consecutive collinear points
                if (collinear(coords[rel(-2)], coords[rel(-1)], coords[i]) ||
                    collinear(coords[rel(-1)], coords[i],  coords[rel(1)]) ||
                    collinear(coords[i],  coords[rel(1)],  coords[rel(2)])) {
                    return false;
                }

                var segments = _.zip(coords, rotate(coords));

                if (self.points.length > 3) {
                    // Constrain to simple (non self-intersecting) polygon by
                    // testing whether adjacent segments intersect any others
                    for (var j = -1; j <= 0; j++) {
                        var segment = segments[rel(j)];
                        var others = _.without(segments,
                            segment, segments[rel(j-1)], segments[rel(j+1)]);

                        for (var k = 0; k < others.length; k++) {
                            var other = others[k];
                            if (intersects(segment, other)) {
                                return false;
                            }
                        }
                    }
                }
            }

            if (this.props.graph.snapTo === "angles" &&
                    self.points.length > 2) {
                // Snap to whole degree interior angles

                var angles = _.map(angleMeasures(coords), function(rad) {
                    return rad * 180 / Math.PI;
                });

                _.each([-1, 1], function(j) {
                    angles[rel(j)] = Math.round(angles[rel(j)]);
                });

                var getAngle = function(a, vertex, b) {
                    var angle = KhanUtil.findAngle(
                        coords[rel(a)], coords[rel(b)], coords[rel(vertex)]
                    );
                    return (angle + 360) % 360;
                };

                var innerAngles = [
                    angles[rel(-1)] - getAngle(-2, -1, 1),
                    angles[rel(1)] - getAngle(-1, 1, 2)
                ];
                innerAngles[2] = 180 - (innerAngles[0] + innerAngles[1]);

                // Avoid degenerate triangles
                if (_.any(innerAngles, function(angle) {
                            return leq(angle, 1);
                        })) {
                    return false;
                }

                var knownSide = magnitude(vector(coords[rel(-1)],
                    coords[rel(1)]));

                var onLeft = sign(ccw(
                    coords[rel(-1)], coords[rel(1)], coords[i]
                )) === 1;

                // Solve for side by using the law of sines
                var side = Math.sin(innerAngles[1] * Math.PI / 180) /
                    Math.sin(innerAngles[2] * Math.PI / 180) * knownSide;

                var outerAngle = KhanUtil.findAngle(coords[rel(1)],
                    coords[rel(-1)]);

                var offset = this.graphie.polar(
                    side,
                    outerAngle + (onLeft? 1 : -1) * innerAngles[0]
                );

                return this.graphie.addPoints(coords[rel(-1)], offset);


            } else if (this.props.graph.snapTo === "sides" &&
                    self.points.length > 1) {
                // Snap to whole unit side measures

                var sides = _.map([
                    [coords[rel(-1)], coords[i]],
                    [coords[i], coords[rel(1)]],
                    [coords[rel(-1)], coords[rel(1)]]
                ], function(coords) {
                    return magnitude(vector.apply(null, coords));
                });

                _.each([0, 1], function(j) {
                    sides[j] = Math.round(sides[j]);
                });

                // Avoid degenerate triangles
                if (leq(sides[1] + sides[2], sides[0]) ||
                        leq(sides[0] + sides[2], sides[1]) ||
                        leq(sides[0] + sides[1], sides[2])) {
                    return false;
                }

                // Solve for angle by using the law of cosines
                var innerAngle = lawOfCosines(sides[0],
                    sides[2], sides[1]);

                var outerAngle = KhanUtil.findAngle(coords[rel(1)],
                    coords[rel(-1)]);

                var onLeft = sign(ccw(
                    coords[rel(-1)], coords[rel(1)], coords[i]
                )) === 1;

                var offset = this.graphie.polar(
                    sides[0],
                    outerAngle + (onLeft ? 1 : -1) * innerAngle
                );

                return this.graphie.addPoints(coords[rel(-1)], offset);

            } else {
                // Snap to grid (already done)
                return true;
            }

        }.bind(this);

        if (self.isClickToAddPoints()) {
            point.onMoveEnd = function(x, y) {
                if (self.isCoordInTrash([x, y])) {
                    // remove this point from points
                    var index = self.removePoint(point);
                    if (self.polygon.closed) {
                        self.points = rotate(self.points, index);
                        self.polygon.closed = false;
                    }
                    self.polygon.points = self.points;
                    self.updatePolygon();
                    // the polygon is now unclosed, so we need to
                    // remove any points props
                    self.clearCoords();

                    // remove this movablePoint from graphie.
                    // we wait to do this until we're not inside of
                    // said point's onMoveEnd method so its state is
                    // consistent throughout this method call
                    setTimeout(point.remove.bind(point), 0);
                } else if (self.points.length > 1 && ((
                            point === self.points[0] &&
                            kpoint.equal([x, y], _.last(self.points).coord)
                        ) || (
                            point === _.last(self.points) &&
                            kpoint.equal([x, y], self.points[0].coord)
                        ))) {
                    // Join endpoints
                    var pointToRemove = self.points.pop();
                    if (self.points.length > 2) {
                        self.polygon.closed = true;
                        self.updateCoordsFromPoints();
                    } else {
                        self.polygon.closed = false;
                        self.clearCoords();
                    }
                    self.updatePolygon();
                    // remove this movablePoint from graphie.
                    // we wait to do this until we're not inside of
                    // said point's onMoveEnd method so its state is
                    // consistent throughout this method call
                    setTimeout(pointToRemove.remove.bind(pointToRemove), 0);
                } else {
                    var shouldRemove = _.any(self.points, function(pt) {
                        return pt !== point && kpoint.equal(pt.coord, [x, y]);
                    });
                    if (shouldRemove) {
                        self.removePoint(point);
                        self.polygon.points = self.points;
                        if (self.points.length < 3) {
                            self.polygon.closed = false;
                            self.clearCoords();
                        } else if (self.polygon.closed) {
                            self.updateCoordsFromPoints();
                        }
                        self.updatePolygon();
                        // remove this movablePoint from graphie.
                        // we wait to do this until we're not inside of
                        // said point's onMoveEnd method so its state is
                        // consistent throughout this method call
                        setTimeout(point.remove.bind(point), 0);
                    }
                }
                // In case we mouseup'd off the graphie and that
                // stopped the move
                self.setTrashCanVisibility(0.5);
                return true;
            };
        }

        point.isTouched = false;
        $(point.mouseTarget[0]).on("vmousedown", function() {
            if (self.isClickToAddPoints()) {
                self.setTrashCanVisibility(1);
            }
            point.isTouched = true;
        });

        $(point.mouseTarget[0]).on("vmouseup", function()  {
            if (self.isClickToAddPoints()) {
                self.setTrashCanVisibility(0.5);
            }
            // If this was
            //  * a click on the first or last point
            //  * and not a drag,
            //  * and our polygon is not closed,
            //  * and we can close it (we need at least 3 points),
            // then close it
            if ((point === this.points[0] || point === _.last(this.points)) &&
                    point.isTouched &&
                    !point.hasMoved &&
                    !this.polygon.closed &&
                    this.points.length > 2) {
                this.polygon.closed = true;
                this.updatePolygon();
                // We finally have a closed polygon, so save our
                // points to props
                this.updateCoordsFromPoints();
            }
            point.isTouched = false;
            point.hasMoved = false;
        }.bind(this));

        $(point).on("move", function()  {
            this.polygon.transform();
            if (this.polygon.closed) {
                this.updateCoordsFromPoints();
            }
        }.bind(this));

        return point;
    },

    updateCoordsFromPoints: function() {
        var graph = _.extend({}, this.props.graph, {
            // Handle old movable points with .coord, or
            // Interactive2.MovablePoint's with .coord()
            coords: _.map(this.points, function(point) {
                return _.result(point, "coord");
            })
        });
        this.props.onChange({graph: graph});
    },

    clearCoords: function() {
        var graph = _.extend({}, this.props.graph, {
            coords: null
        });
        this.props.onChange({graph: graph});
    },

    addPointControls: function() {
        var coords = InteractiveGraph.getPointCoords(
            this.props.graph,
            this.props
        );
        // Clear out our old points so that newly added points don't
        // "collide" with them and reposition when being added
        // Without this, when added, each point checks whether it is on top
        // of a point in this.points, which (a) shouldn't matter since
        // we're clearing out this.points anyways, and (b) can cause problems
        // if each of this.points is a MovablePoint instead of an
        // Interactive2.MovablePoint, since one has a .coord and the other
        // has .coord()
        // TODO(jack): Figure out a better way to do this
        this.points = [];
        this.points = _.map(coords, this.createPointForPointsType, this);
    },

    removePointControls: function() {
        _.invoke(this.points, "remove");
    },

    addSegmentControls: function() {
        var self = this;
        var graphie = this.graphie;

        var coords = InteractiveGraph.getSegmentCoords(
            this.props.graph,
            this.props
        );

        this.points = [];
        this.lines = _.map(coords, function(segment, i) {
            var updateCoordProps = function() {
                var graph = _.extend({}, self.props.graph, {
                    coords: _.invoke(self.lines, "coords")
                });
                self.props.onChange({graph: graph});
            };

            var points = _.map(segment, function(coord, i) {
                return Interactive2.addMovablePoint(graphie, {
                    coord: coord,
                    normalStyle: {
                        stroke: KhanUtil.INTERACTIVE,
                        fill: KhanUtil.INTERACTIVE
                    },
                    constraints: [
                        Interactive2.MovablePoint.constraints.bound(),
                        Interactive2.MovablePoint.constraints.snap(),
                        function(coord)  {
                            if (!points) {
                                // points hasn't been defined yet because
                                // we're still creating them
                                return;
                            }
                            return !kpoint.equal(coord, points[1 - i].coord());
                        }
                    ],
                    onMove: updateCoordProps
                });
            });

            self.points = self.points.concat(points);
            var line = Interactive2.addMovableLine(graphie, {
                points: points,
                static: false,
                updatePoints: true,
                constraints: [
                    Interactive2.MovableLine.constraints.bound(),
                    Interactive2.MovableLine.constraints.snap()
                ],
                onMove: updateCoordProps,
                normalStyle: {
                    stroke: KhanUtil.INTERACTIVE
                },
                highlightStyle: {
                    stroke: KhanUtil.INTERACTING
                }
            });
            _.invoke(points, "toFront");

            return line;
        }, this);
    },

    removeSegmentControls: function() {
        _.invoke(this.points, "remove");
        _.invoke(this.lines, "remove");
    },

    addRayControls: function() {
        this.addLine("ray");
    },

    removeRayControls: function() {
        this.removeLine();
    },

    addPolygonControls: function() {
        this.polygon = null;
        var coords = InteractiveGraph.getPolygonCoords(
            this.props.graph,
            this.props
        );
        this.points = _.map(coords, this.createPointForPolygonType);
        this.updatePolygon();
    },

    updatePolygon: function() {
        var closed;
        if (this.polygon) {
            closed = this.polygon.closed;
        } else if (this.points.length >= 3) {
            closed = true;
        } else {
            // There will only be fewer than 3 points in click-to-add-vertices
            // mode, so we don't need to explicitly check for that here.
            closed = false;
        }

        if (this.polygon) {
            this.polygon.remove();
        }

        var graphie = this.graphie;
        var n = this.points.length;

        // TODO(alex): check against "grid" instead, use constants
        var snapToGrid = !_.contains(["angles", "sides"],
            this.props.graph.snapTo);

        var angleLabels = _.times(n, function(i) {
            if (!this.props.graph.showAngles ||
                    (!closed && (i === 0 || i === n - 1))) {
                return "";
            } else if (this.props.graph.snapTo === "angles") {
                return "$deg0";
            } else {
                return "$deg1";
            }
        }, this);

        var showRightAngleMarkers = _.times(n, function(i) {
            return closed || (i !== 0 && i !== n - 1);
        }, this);

        var numArcs = _.times(n, function(i) {
            if (this.props.graph.showAngles &&
                    (closed || (i !== 0 && i !== n - 1))) {
                return 1;
            } else {
                return 0;
            }
        }, this);

        var sideLabels = _.times(n, function(i) {
            if (!this.props.graph.showSides ||
                (!closed && i === n - 1)) {
                return "";
            } else if (this.props.graph.snapTo === "sides") {
                return "$len0";
            } else {
                return "$len1";
            }
        }, this);

        this.polygon = graphie.addMovablePolygon(_.extend({
            closed: closed,
            points: this.points,
            angleLabels: angleLabels,
            showRightAngleMarkers: showRightAngleMarkers,
            numArcs: numArcs,
            sideLabels: sideLabels,
            updateOnPointMove: false
        }, snapToGrid ? {
            snapX: graphie.snap[0],
            snapY: graphie.snap[1]
        } : {}
        ));

        $(this.polygon).on("move", function()  {
            if (this.polygon.closed) {
                this.updateCoordsFromPoints();
            }
        }.bind(this));
    },

    removePolygonControls: function() {
        _.invoke(this.points, "remove");
        this.polygon.remove();
    },

    addAngleControls: function() {
        var graphie = this.graphie;

        var coords = InteractiveGraph.getAngleCoords(
            this.props.graph,
            this.props
        );

        // The vertex snaps to the grid, but the rays don't...
        this.points = _.map(coords, function(coord, i) {
            return graphie.addMovablePoint(_.extend({
                coord: coord,
                normalStyle: {
                    stroke: KhanUtil.INTERACTIVE,
                    fill: KhanUtil.INTERACTIVE
                }
            }, i === 1 ? {
                snapX: graphie.snap[0],
                snapY: graphie.snap[1]
            } : {}));
        });

        // ...they snap to whole-degree angles from the vertex.
        this.angle = graphie.addMovableAngle({
            points: this.points,
            snapDegrees: this.props.graph.snapDegrees || 1,
            snapOffsetDeg: this.props.graph.angleOffsetDeg || 0,
            angleLabel: this.props.graph.showAngles ? "$deg0" : "",
            pushOut: 2,
            allowReflex: defaultVal(this.props.graph.allowReflexAngles, true)
        });

        $(this.angle).on("move", function()  {
            var graph = _.extend({}, this.props.graph, {
                coords: this.angle.getClockwiseCoords()
            });
            this.props.onChange({graph: graph});
        }.bind(this));
    },

    removeAngleControls: function() {
        _.invoke(this.points, "remove");
        this.angle.remove();
    },

    toggleShowAngles: function() {
        var graph = _.extend({}, this.props.graph, {
            showAngles: !this.props.graph.showAngles
        });
        this.props.onChange({graph: graph});
    },

    toggleShowSides: function() {
        var graph = _.extend({}, this.props.graph, {
            showSides: !this.props.graph.showSides
        });
        this.props.onChange({graph: graph});
    },

    toJSON: function() {
        return this.props.graph;
    },

    simpleValidate: function(rubric) {
        return InteractiveGraph.validate(this.toJSON(), rubric, this);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});


_.extend(InteractiveGraph, {
    getQuadraticCoefficients: function(coords) {
        var p1 = coords[0];
        var p2 = coords[1];
        var p3 = coords[2];

        var denom = (p1[0] - p2[0]) * (p1[0] - p3[0]) * (p2[0] - p3[0]);
        if (denom === 0) {
            return;
        }
        var a = (p3[0] * (p2[1] - p1[1]) +
                 p2[0] * (p1[1] - p3[1]) +
                 p1[0] * (p3[1] - p2[1])) / denom;
        var b = ((p3[0] * p3[0]) * (p1[1] - p2[1]) +
                 (p2[0] * p2[0]) * (p3[1] - p1[1]) +
                 (p1[0] * p1[0]) * (p2[1] - p3[1])) / denom;
        var c = (p2[0] * p3[0] * (p2[0] - p3[0]) * p1[1] +
                 p3[0] * p1[0] * (p3[0] - p1[0]) * p2[1] +
                 p1[0] * p2[0] * (p1[0] - p2[0]) * p3[1]) / denom;
        return [a, b, c];
    },

    getSinusoidCoefficients: function(coords) {
        // It's assumed that p1 is the root and p2 is the first peak
        var p1 = coords[0];
        var p2 = coords[1];

        // Resulting coefficients are canonical for this sine curve
        var amplitude = (p2[1] - p1[1]);
        var angularFrequency = Math.PI / (2 * (p2[0] - p1[0]));
        var phase = p1[0] * angularFrequency;
        var verticalOffset = p1[1];

        return [amplitude, angularFrequency, phase, verticalOffset];
    },


    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getLineCoords: function(graph, props) {
        return graph.coords || InteractiveGraph.pointsFromNormalized(
            props,
            [
                [0.25, 0.75],
                [0.75, 0.75]
            ]
        );
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getPointCoords: function(graph, props) {
        var numPoints = graph.numPoints || 1;
        var coords = graph.coords;

        if (coords) {
            return coords;
        } else {
            switch (numPoints) {
                case 1:
                    // Back in the day, one point's coords were in graph.coord
                    coords = [graph.coord || [0, 0]];
                    break;
                case 2:
                    coords = [[-5, 0], [5, 0]];
                    break;
                case 3:
                    coords = [[-5, 0], [0, 0], [5, 0]];
                    break;
                case 4:
                    coords = [[-6, 0], [-2, 0], [2, 0], [6, 0]];
                    break;
                case 5:
                    coords = [[-6, 0], [-3, 0], [0, 0], [3, 0], [6, 0]];
                    break;
                case 6:
                    coords = [[-5, 0], [-3, 0], [-1, 0], [1, 0], [3, 0],
                              [5, 0]];
                    break;
                case UNLIMITED:
                    coords = [];
                    break;
            }
            // Transform coords from their -10 to 10 space to 0 to 1
            // because of the old graph.coord, and also it's easier.
            var range = [[-10, 10], [-10, 10]];
            coords = InteractiveGraph.normalizeCoords(coords, range);

            var coords = InteractiveGraph.pointsFromNormalized(props, coords);
            return coords;
        }
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getLinearSystemCoords: function(graph, props) {
        return graph.coords ||
            _.map([
                [[0.25, 0.75], [0.75, 0.75]],
                [[0.25, 0.25], [0.75, 0.25]]
            ], function(coords)  {
                return InteractiveGraph.pointsFromNormalized(props, coords);
            });
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getPolygonCoords: function(graph, props) {
        var coords = graph.coords;
        if (coords) {
            return coords;
        }

        var n = graph.numSides || 3;

        if (n === UNLIMITED) {
            coords = [];
        } else {
            var angle = 2 * Math.PI / n;
            var offset = (1 / n - 1 / 2) * Math.PI;

            // TODO(alex): Generalize this to more than just triangles so that
            // all polygons have whole number side lengths if snapping to sides
            var radius = graph.snapTo === "sides" ? Math.sqrt(3) / 3 * 7: 4;

            // Generate coords of a regular polygon with n sides
            coords = _.times(n, function(i) {
                return [
                    radius * Math.cos(i * angle + offset),
                    radius * Math.sin(i * angle + offset)
                ];
            });
        }

        var range = [[-10, 10], [-10, 10]];
        coords = InteractiveGraph.normalizeCoords(coords, range);

        var snapToGrid = !_.contains(["angles", "sides"], graph.snapTo);
        coords = InteractiveGraph.pointsFromNormalized(props, coords,
            /* noSnap */ !snapToGrid);

        return coords;
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getSegmentCoords: function(graph, props) {
        var coords = graph.coords;
        if (coords) {
            return coords;
        }

        var n = graph.numSegments || 1;
        var ys = {
            1: [5],
            2: [5, -5],
            3: [5, 0, -5],
            4: [6, 2, -2, -6],
            5: [6, 3, 0, -3, -6],
            6: [5, 3, 1, -1, -3, -5]
        }[n];
        var range = [[-10, 10], [-10, 10]];

        return _.map(ys, function(y) {
            var segment = [[-5, y], [5, y]];
            segment = InteractiveGraph.normalizeCoords(segment, range);
            segment = InteractiveGraph.pointsFromNormalized(props, segment);
            return segment;
        });
    },

    /**
     * @param {object} graph Like props.graph or props.correct
     * @param {object} props of an InteractiveGraph instance
     */
    getAngleCoords: function(graph, props) {
        var coords = graph.coords;
        if (coords) {
            return coords;
        }

        var snap = graph.snapDegrees || 1;
        var angle = snap;
        while (angle < 20) {
            angle += snap;
        }
        angle = angle * Math.PI / 180;
        var offset = (graph.angleOffsetDeg || 0) * Math.PI / 180;

        coords = InteractiveGraph.pointsFromNormalized(props, [
            [0.85, 0.50],
            [0.5, 0.50]
        ]);

        var radius = magnitude(vector.apply(null, coords));

        // Adjust the lower point by angleOffsetDeg degrees
        coords[0] = [
            coords[1][0] + radius * Math.cos(offset),
            coords[1][1] + radius * Math.sin(offset)
        ];
        // Position the upper point angle radians from the
        // lower point
        coords[2] = [
            coords[1][0] + radius * Math.cos(angle + offset),
            coords[1][1] + radius * Math.sin(angle + offset)
        ];

        return coords;
    },

    normalizeCoords: function(coordsList, range) {
        return _.map(coordsList, function(coords) {
            return _.map(coords, function(coord, i) {
                var extent = range[i][1] - range[i][0];
                return ((coord + range[i][1]) / extent);
            });
        });
    },

    getEquationString: function(props) {
        var type = props.graph.type;
        var funcName = "get" + capitalize(type) + "EquationString";
        return InteractiveGraph[funcName](props);
    },

    pointsFromNormalized: function(props, coordsList, noSnap) {
        return _.map(coordsList, function(coords) {
            return _.map(coords, function(coord, i) {
                var range = props.range[i];
                if (noSnap) {
                    return range[0] + (range[1] - range[0]) * coord;
                } else {
                    var step = props.step[i];
                    var nSteps = numSteps(range, step);
                    var tick = Math.round(coord * nSteps);
                    return range[0] + step * tick;
                }
            });
        });
    },

    getLinearEquationString: function(props) {
        var coords = InteractiveGraph.getLineCoords(props.graph, props);
        if (eq(coords[0][0], coords[1][0])) {
            return "x = " + coords[0][0].toFixed(3);
        } else {
            var m = (coords[1][1] - coords[0][1]) /
                    (coords[1][0] - coords[0][0]);
            var b = coords[0][1] - m * coords[0][0];
            if (eq(m, 0)) {
                return "y = " + b.toFixed(3);
            } else {
                return "y = " + m.toFixed(3) + "x + " + b.toFixed(3);
            }
        }
    },

    getCurrentQuadraticCoefficients: function(props) {
        // TODO(alpert): Don't duplicate
        var coords = props.graph.coords ||
                InteractiveGraph.defaultQuadraticCoords(props);
        return InteractiveGraph.getQuadraticCoefficients(coords);
    },

    defaultQuadraticCoords: function(props) {
        var coords = [[0.25, 0.75], [0.5, 0.25], [0.75, 0.75]];
        return InteractiveGraph.pointsFromNormalized(props, coords);
    },

    getQuadraticEquationString: function(props) {
        var coeffs = InteractiveGraph.getCurrentQuadraticCoefficients(
                props);
        return "y = " + coeffs[0].toFixed(3) + "x^2 + " +
                        coeffs[1].toFixed(3) + "x + " +
                        coeffs[2].toFixed(3);
    },

    getCurrentSinusoidCoefficients: function(props) {
        var coords = props.graph.coords ||
                InteractiveGraph.defaultSinusoidCoords(props);
        return InteractiveGraph.getSinusoidCoefficients(coords);
    },

    defaultSinusoidCoords: function(props) {
        var coords = [[0.5, 0.5], [0.65, 0.60]];
        return InteractiveGraph.pointsFromNormalized(props, coords);
    },

    getSinusoidEquationString: function(props) {
        var coeffs = InteractiveGraph.getCurrentSinusoidCoefficients(
                props);
        return "y = " + coeffs[0].toFixed(3) + "sin(" +
                        coeffs[1].toFixed(3) + "x - " +
                        coeffs[2].toFixed(3) + ") + " +
                        coeffs[3].toFixed(3);
    },

    getCircleEquationString: function(props) {
        var graph = props.graph;
        // TODO(alpert): Don't duplicate
        var center = graph.center || [0, 0];
        var radius = graph.radius || 2;
        return "center (" + center[0] + ", " + center[1] + "), radius " +
                radius;
    },

    getLinearSystemEquationString: function(props) {
        var coords = InteractiveGraph.getLinearSystemCoords(
            props.graph,
            props
        );
        return "\n" +
            getLineEquation(coords[0][0], coords[0][1]) +
            "\n" +
            getLineEquation(coords[1][0], coords[1][1]) +
            "\n" +
            getLineIntersection(coords[0], coords[1]);
    },

    getPointEquationString: function(props) {
        var coords = InteractiveGraph.getPointCoords(props.graph, props);
        return coords.map(function(coord) {
            return "(" + coord[0] + ", " + coord[1] + ")";
        }).join(", ");
    },

    getSegmentEquationString: function(props) {
        var segments = InteractiveGraph.getSegmentCoords(props.graph,
            props);
        return _.map(segments, function(segment) {
            return "[" +
                _.map(segment, function(coord) {
                    return "(" + coord.join(", ") + ")";
                }).join(" ") +
            "]";
        }).join(" ");
    },

    getRayEquationString: function(props) {
        var coords = InteractiveGraph.getLineCoords(props.graph, props);
        var a = coords[0];
        var b = coords[1];
        var eq = InteractiveGraph.getLinearEquationString(props);

        if (a[0] > b[0]) {
            eq += " (for x <= " + a[0].toFixed(3) + ")";
        } else if (a[0] < b[0]) {
            eq += " (for x >= " + a[0].toFixed(3) + ")";
        } else if (a[1] > b[1]) {
            eq += " (for y <= " + a[1].toFixed(3) + ")";
        } else {
            eq += " (for y >= " + a[1].toFixed(3) + ")";
        }

        return eq;
    },

    getPolygonEquationString: function(props) {
        var coords = InteractiveGraph.getPolygonCoords(
            props.graph,
            props
        );
        return _.map(coords, function(coord) {
            return "(" + coord.join(", ") + ")";
        }).join(" ");
    },

    getAngleEquationString: function(props) {
        var coords = InteractiveGraph.getAngleCoords(props.graph, props);
        var angle = KhanUtil.findAngle(coords[2], coords[0], coords[1]);
        return angle.toFixed(0) + "\u00B0 angle" +
                " at (" + coords[1].join(", ") + ")";
    },

    validate: function(state, rubric, component) {
        // TODO(alpert): Because this.props.graph doesn't always have coords,
        // check that .coords exists here, which is always true when something
        // has moved
        if (state.type === rubric.correct.type && state.coords) {
            if (state.type === "linear") {
                var guess = state.coords;
                var correct = rubric.correct.coords;
                // If both of the guess points are on the correct line, it's
                // correct.
                if (collinear(correct[0], correct[1], guess[0]) &&
                        collinear(correct[0], correct[1], guess[1])) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "linear-system") {
                var guess = state.coords;
                var correct = rubric.correct.coords;

                if ((
                        collinear(correct[0][0], correct[0][1], guess[0][0]) &&
                        collinear(correct[0][0], correct[0][1], guess[0][1]) &&
                        collinear(correct[1][0], correct[1][1], guess[1][0]) &&
                        collinear(correct[1][0], correct[1][1], guess[1][1])
                    ) || (
                        collinear(correct[0][0], correct[0][1], guess[1][0]) &&
                        collinear(correct[0][0], correct[0][1], guess[1][1]) &&
                        collinear(correct[1][0], correct[1][1], guess[0][0]) &&
                        collinear(correct[1][0], correct[1][1], guess[0][1])
                    )) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }

            } else if (state.type === "quadratic") {
                // If the parabola coefficients match, it's correct.
                var guessCoeffs = this.getQuadraticCoefficients(state.coords);
                var correctCoeffs = this.getQuadraticCoefficients(
                        rubric.correct.coords);
                if (deepEq(guessCoeffs, correctCoeffs)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "sinusoid") {
                var guessCoeffs = this.getSinusoidCoefficients(
                    state.coords);
                var correctCoeffs = this.getSinusoidCoefficients(
                        rubric.correct.coords);

                var canonicalGuessCoeffs = canonicalSineCoefficients(
                                                guessCoeffs);
                var canonicalCorrectCoeffs = canonicalSineCoefficients(
                                                correctCoeffs);
                // If the canonical coefficients match, it's correct.
                if (deepEq(canonicalGuessCoeffs, canonicalCorrectCoeffs)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "circle") {
                if (deepEq(state.center, rubric.correct.center) &&
                        eq(state.radius, rubric.correct.radius)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "point") {
                var guess = state.coords;
                var correct = InteractiveGraph.getPointCoords(
                        rubric.correct, component);
                guess = guess.slice();
                correct = correct.slice();
                // Everything's already rounded so we shouldn't need to do an
                // eq() comparison but _.isEqual(0, -0) is false, so we'll use
                // eq() anyway. The sort should be fine because it'll stringify
                // it and -0 converted to a string is "0"
                guess.sort();
                correct.sort();
                if (deepEq(guess, correct)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "polygon") {
                var guess = state.coords.slice();
                var correct = rubric.correct.coords.slice();

                var match;
                if (rubric.correct.match === "similar") {
                    match = similar(guess, correct, Number.POSITIVE_INFINITY);
                } else if (rubric.correct.match === "congruent") {
                    match = similar(guess, correct, knumber.DEFAULT_TOLERANCE);
                } else if (rubric.correct.match === "approx") {
                    match = similar(guess, correct, 0.1);
                } else { /* exact */
                    guess.sort();
                    correct.sort();
                    match = deepEq(guess, correct);
                }

                if (match) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "segment") {
                var guess = state.coords.slice();
                var correct = rubric.correct.coords.slice();
                guess = _.invoke(guess, "sort").sort();
                correct = _.invoke(correct, "sort").sort();
                if (deepEq(guess, correct)) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "ray") {
                var guess = state.coords;
                var correct = rubric.correct.coords;
                if (deepEq(guess[0], correct[0]) &&
                        collinear(correct[0], correct[1], guess[1])) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            } else if (state.type === "angle") {
                var guess = state.coords;
                var correct = rubric.correct.coords;

                var match;
                if (rubric.correct.match === "congruent") {
                    var angles = _.map([guess, correct], function(coords) {
                        var angle = KhanUtil.findAngle(
                            coords[2], coords[0], coords[1]);
                        return (angle + 360) % 360;
                    });
                    match = eq.apply(null, angles);
                } else { /* exact */
                    match = deepEq(guess[1], correct[1]) &&
                            collinear(correct[1], correct[0], guess[0]) &&
                            collinear(correct[1], correct[2], guess[2]);
                }

                if (match) {
                    return {
                        type: "points",
                        earned: 1,
                        total: 1,
                        message: null
                    };
                }
            }
        }

        // The input wasn't correct, so check if it's a blank input or if it's
        // actually just wrong
        if (!state.coords || _.isEqual(state, rubric.graph)) {
            // We're where we started.
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});

var InteractiveGraphEditor = React.createClass({displayName: 'InteractiveGraphEditor',
    className: "perseus-widget-interactive-graph",

    getDefaultProps: function() {
        var range = this.props.range || [[-10, 10], [-10, 10]];
        var step = this.props.step || [1, 1];
        var gridStep = this.props.gridStep ||
                   Util.getGridStep(range, step, defaultEditorBoxSize);
        var snapStep = this.props.snapStep ||
                   Util.snapStepFromGridStep(gridStep);
        return {
            box: [defaultEditorBoxSize, defaultEditorBoxSize],
            labels: ["x", "y"],
            range: range,
            step: step,
            gridStep: gridStep,
            snapStep: snapStep,
            valid: true,
            backgroundImage: defaultBackgroundImage,
            markings: "graph",
            showProtractor: false,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            correct: {
                type: "linear",
                coords: null
            }
        };
    },

    mixins: [DeprecationMixin],
    deprecatedProps: deprecatedProps,

    render: function() {
        var graph;
        var equationString;

        if (this.props.valid === true) {
            // TODO(jack): send these down all at once
            var graphProps = {
                ref: "graph",
                box: this.props.box,
                range: this.props.range,
                labels: this.props.labels,
                step: this.props.step,
                gridStep: this.props.gridStep,
                snapStep: this.props.snapStep,
                graph: this.props.correct,
                backgroundImage: this.props.backgroundImage,
                markings: this.props.markings,
                showProtractor: this.props.showProtractor,
                showRuler: this.props.showRuler,
                rulerLabel: this.props.rulerLabel,
                rulerTicks: this.props.rulerTicks,
                flexibleType: true,
                onChange: function(newProps)  {
                    var correct = this.props.correct;
                    if (correct.type === newProps.graph.type) {
                        correct = _.extend({}, correct, newProps.graph);
                    } else {
                        // Clear options from previous graph
                        correct = newProps.graph;
                    }
                    this.props.onChange({correct: correct});
                }.bind(this)
            };
            graph = InteractiveGraph(graphProps);
            equationString = InteractiveGraph.getEquationString(graphProps);
        } else {
            graph = React.DOM.div(null, this.props.valid);
        }

        return React.DOM.div( {className:"perseus-widget-interactive-graph"}, 
            React.DOM.div(null, "Correct answer",' ',
                InfoTip(null, 
                    React.DOM.p(null, "Graph the correct answer in the graph below and ensure"+' '+
                    "the equation or point coordinates displayed represent the"+' '+
                    "correct answer.")
                ),
                ' ',": ", equationString),


            GraphSettings(
                {box:this.props.box,
                range:this.props.range,
                labels:this.props.labels,
                step:this.props.step,
                gridStep:this.props.gridStep,
                snapStep:this.props.snapStep,
                valid:this.props.valid,
                backgroundImage:this.props.backgroundImage,
                markings:this.props.markings,
                showProtractor:this.props.showProtractor,
                showRuler:this.props.showRuler,
                rulerLabel:this.props.rulerLabel,
                rulerTicks:this.props.rulerTicks,
                onChange:this.props.onChange} ),


            this.props.correct.type === "polygon" &&
            React.DOM.div( {className:"type-settings"}, 
                React.DOM.label(null, 
                    ' ',"Student answer must",' ',
                    React.DOM.select(
                            {value:this.props.correct.match,
                            onChange:this.changeMatchType}, 
                        React.DOM.option( {value:"exact"}, "match exactly"),
                        React.DOM.option( {value:"congruent"}, "be congruent"),
                        React.DOM.option( {value:"approx"}, 
                            "be approximately congruent"),
                        React.DOM.option( {value:"similar"}, "be similar")
                    )
                ),
                InfoTip(null, 
                    React.DOM.ul(null, 
                        React.DOM.li(null, 
                            React.DOM.p(null, React.DOM.b(null, "Match Exactly:"), " Match exactly in size,"+' '+
                            "orientation, and location on the grid even if it is"+' '+
                            "not shown in the background.")
                        ),
                        React.DOM.li(null, 
                            React.DOM.p(null, React.DOM.b(null, "Be Congruent:"), " Be congruent in size and"+' '+
                            "shape, but can be located anywhere on the grid.")
                        ),
                        React.DOM.li(null, 
                            React.DOM.p(null, 
                                React.DOM.b(null, "Be Approximately Congruent:"), " Be exactly"+' '+
                                "similar, and congruent in size and shape to"+' '+
                                "within 0.1 units, but can be located anywhere"+' '+
                                "on the grid. ", React.DOM.em(null, "Use this with snapping to"+' '+
                                "angle measure.")
                            )
                        ),
                        React.DOM.li(null, 
                            React.DOM.p(null, React.DOM.b(null, "Be Similar:"), " Be similar with matching"+' '+
                            "interior angles, and side measures that are"+' '+
                            "matching or a multiple of the correct side"+' '+
                            "measures. The figure can be located anywhere on the"+' '+
                            "grid.")
                        )
                    )
                )
            ),
            this.props.correct.type === "angle" &&
            React.DOM.div( {className:"type-settings"}, 
                React.DOM.div(null, 
                    React.DOM.label(null, 
                        ' ',"Student answer must",' ',
                        React.DOM.select(
                                {value:this.props.correct.match,
                                onChange:this.changeMatchType}, 
                            React.DOM.option( {value:"exact"}, "match exactly"),
                            React.DOM.option( {value:"congruent"}, "be congruent")
                        )
                    ),
                    InfoTip(null, 
                        React.DOM.p(null, "Congruency requires only that the angle measures are"+' '+
                        "the same. An exact match implies congruency, but also"+' '+
                        "requires that the angles have the same orientation and"+' '+
                        "that the vertices are in the same position.")
                    )
                )
            ),
            graph
        );
    },

    changeMatchType: function(e) {
        var correct = _.extend({}, this.props.correct, {
            match: e.target.value
        });
        this.props.onChange({correct: correct});
    },

    toJSON: function() {
        var json = _.pick(this.props, "step", "backgroundImage", "markings",
            "labels", "showProtractor", "showRuler", "rulerLabel",
            "rulerTicks", "range", "gridStep", "snapStep");

        var graph = this.refs.graph;
        if (graph) {
            var correct = graph && graph.toJSON();
            _.extend(json, {
                // TODO(alpert): Allow specifying flexibleType (whether the
                // graph type should be a choice or not)
                graph: {type: correct.type},
                correct: correct
            });

            _.each(["allowReflexAngles", "angleOffsetDeg", "numPoints",
                        "numSides", "numSegments", "showAngles", "showSides",
                        "snapTo", "snapDegrees"],
                    function(key) {
                        if (_.has(correct, key)) {
                            json.graph[key] = correct[key];
                        }
                    });
        }
        return json;
    }
});

module.exports = {
    name: "interactive-graph",
    displayName: "Interactive graph",
    widget: InteractiveGraph,
    editor: InteractiveGraphEditor,
    hidden: true
};

},{"../components/graph-settings.jsx":121,"../components/graph.jsx":122,"../components/number-input.jsx":129,"../interactive2.js":148,"../util.js":168,"react":115,"react-components/info-tip":5}],181:[function(require,module,exports){
/** @jsx React.DOM */

var InfoTip      = require("react-components/info-tip");
var PropCheckBox = require("../components/prop-check-box.jsx");
var Util         = require("../util.js");

function eq(x, y) {
    return Math.abs(x - y) < 1e-9;
}

var reverseRel = {
    ge: "le",
    gt: "lt",
    le: "ge",
    lt: "gt"
};

var toggleStrictRel = {
    ge: "gt",
    gt: "ge",
    le: "lt",
    lt: "le"
};

function formatImproper(n, d) {
    if (d === 1) {
        return "" + n;
    } else {
        return n + "/" + d;
    }
}

function formatMixed(n, d) {
    if (n < 0) {
        return "-" + formatMixed(-n, d);
    }
    var w = Math.floor(n / d);
    if (w === 0) {
        return formatImproper(n, d);
    } else if (n - w * d === 0) {
        return "" + w;
    } else {
        return w + "\\:" + formatImproper(n - w * d, d);
    }
}

var InteractiveNumberLine = React.createClass({displayName: 'InteractiveNumberLine',
    getDefaultProps: function() {
        return {
            labelStyle: "decimal",
            labelTicks: false,
            isInequality: false,
            pointX: 0,
            rel: "ge"
        };
    },

    isValid: function() {
        return this.props.range[0] < this.props.range[1] &&
                0 < this.props.tickStep &&
                0 < this.props.snapDivisions;
    },

    render: function() {
        var inequalityControls;
        if (this.props.isInequality) {
            inequalityControls = React.DOM.div(null, 
                React.DOM.input( {type:"button", value:"Switch direction",
                    onClick:this.handleReverse} ),
                React.DOM.input( {type:"button",
                    value:
                        this.props.rel === "le" || this.props.rel === "ge" ?
                            "Make circle open" :
                            "Make circle filled",
                        
                    onClick:this.handleToggleStrict} )
            );
        }

        var valid = this.isValid();
        return React.DOM.div( {className:"perseus-widget " +
                "perseus-widget-interactive-number-line"}, 
            React.DOM.div( {style:{display: valid ? "" : "none"},
                    className:"graphie above-scratchpad", ref:"graphieDiv"} ),
            React.DOM.div( {style:{display: valid ? "none" : ""}}, 
                ' ',"invalid number line configuration",' '
            ),
            inequalityControls
        );
    },

    handleReverse: function() {
        this.props.onChange({rel: reverseRel[this.props.rel]});
    },

    handleToggleStrict: function() {
        this.props.onChange({rel: toggleStrictRel[this.props.rel]});
    },

    componentDidMount: function() {
        this.addGraphie();
    },

    componentDidUpdate: function() {
        // Use jQuery to remove so event handlers don't leak
        var node = this.refs.graphieDiv.getDOMNode();
        $(node).children().remove();

        this.addGraphie();
    },

    _label: function(value) {
        var graphie = this.graphie;
        var labelStyle = this.props.labelStyle;

        // TODO(jack): Find out if any exercises have "decimal ticks" set,
        // and if so, re-save them and remove this check.
        if (labelStyle === "decimal" || labelStyle === "decimal ticks") {
            graphie.label([value, -0.53], value, "center");
        } else if (labelStyle === "improper") {
            var frac = KhanUtil.toFraction(value);
            graphie.label([value, -0.53],
                    formatImproper(frac[0], frac[1]), "center");
        } else if (labelStyle === "mixed") {
            var frac = KhanUtil.toFraction(value);
            graphie.label([value, -0.53],
                    formatMixed(frac[0], frac[1]), "center");
        }
    },

    addGraphie: function() {
        var self = this;
        var graphie = this.graphie = KhanUtil.createGraphie(
                this.refs.graphieDiv.getDOMNode());
        // Ensure a sane configuration to avoid infinite loops
        if (!this.isValid()) {
            return;
        }

        var range = this.props.range;
        var tickStep = this.props.tickStep;
        var scale = 400 / (range[1] - range[0]);

        graphie.init({
            range: [[range[0] - 30 / scale,
                     range[1] + 30 / scale],
                    [-1, 1]],
            scale: [scale, 40]
        });
        graphie.addMouseLayer({
            allowScratchpad: true
        });

        // Line

        graphie.line([range[0] - (25 / scale), 0],
             [range[1] + (25 / scale), 0], {
            arrows: "->"
        });
        graphie.line([range[1] + (25 / scale), 0],
             [range[0] - (25 / scale), 0], {
            arrows: "->"
        });

        // Ticks
        var labelStyle = this.props.labelStyle;
        for (var x = Math.ceil(range[0] / tickStep) * tickStep; x <= range[1];
                x += tickStep) {
            graphie.line([x, -0.2], [x, 0.2]);

            // TODO(jack): Find out if any exercises have "decimal ticks" set,
            // and if so, re-save them and remove this check.
            if (this.props.labelTicks || labelStyle === "decimal ticks") {
                this._label(x);
            }
        }

        graphie.style({
            stroke: KhanUtil.INTERACTIVE,
            strokeWidth: 3.5
        }, function() {
            graphie.line([range[0], -0.2], [range[0], 0.2]);
            graphie.line([range[1], -0.2], [range[1], 0.2]);
            if (range[0] < 0 && 0 < range[1]) {
                graphie.line([0, -0.2], [0, 0.2]);
            }
        });

        graphie.style({color: KhanUtil.INTERACTIVE}, function() {
            self._label(range[0]);
            self._label(range[1]);
            if (range[0] < 0 && 0 < range[1] && !self.props.labelTicks) {
                    graphie.label([0, -0.53], "0", "center");
            }
        });

        // Point

        var isInequality = this.props.isInequality;
        var rel = this.props.rel;

        var pointSize;
        var pointStyle;
        var highlightStyle;
        if (isInequality && (rel === "lt" || rel === "gt")) {
            pointSize = 5;
            pointStyle = {
                stroke: KhanUtil.INTERACTING,
                fill: KhanUtil._BACKGROUND,
                "stroke-width": 3
            };
            highlightStyle = {
                stroke: KhanUtil.INTERACTING,
                fill: KhanUtil._BACKGROUND,
                "stroke-width": 4
            };
        } else {
            pointSize = 4;
            pointStyle = highlightStyle = {
                stroke: KhanUtil.INTERACTING,
                fill: KhanUtil.INTERACTING
            };
        }

        var x = Math.min(Math.max(range[0], this.props.pointX), range[1]);
        var point = this.point = graphie.addMovablePoint({
            pointSize: pointSize,
            coord: [x, 0],
            snapX: this.props.tickStep / this.props.snapDivisions,
            constraints: {
                constrainY: true
            },
            normalStyle: pointStyle,
            highlightStyle: highlightStyle
        });
        point.onMove = function(x, y) {
            x = Math.min(Math.max(range[0], x), range[1]);
            updateInequality(x, y);
            return [x, y];
        };
        point.onMoveEnd = function(x, y)  {
            this.props.onChange({pointX: x});
        }.bind(this);

        // Inequality line

        var inequalityLine;
        updateInequality(x, 0);

        function updateInequality(px, py) {
            if (inequalityLine) {
                inequalityLine.remove();
                inequalityLine = null;
            }
            if (isInequality) {
                var end;
                if (rel === "ge" || rel === "gt") {
                    end = [range[1] + (26 / scale), 0];
                } else {
                    end = [range[0] - (26 / scale), 0];
                }
                inequalityLine = graphie.line(
                    [px, py],
                    end,
                    {
                        arrows: "->",
                        stroke: KhanUtil.INTERACTIVE,
                        strokeWidth: 3.5
                    }
                );
                point.toFront();
            }
        }
    },

    toJSON: function() {
        return {
            pointX: this.props.pointX,
            rel: this.props.isInequality ? this.props.rel : "eq"
        };
    },

    simpleValidate: function(rubric) {
        return InteractiveNumberLine.validate(this.toJSON(), rubric);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});


_.extend(InteractiveNumberLine, {
    validate: function(state, rubric) {
        var range = rubric.range;
        var start = Math.min(Math.max(range[0], 0), range[1]);
        var startRel = rubric.isInequality ? "ge" : "eq";
        var correctRel = rubric.correctRel || "eq";

        if (eq(state.pointX, rubric.correctX || 0) &&
                correctRel === state.rel) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (state.pointX === start && state.rel === startRel) {
            // We're where we started.
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


var InteractiveNumberLineEditor = React.createClass({displayName: 'InteractiveNumberLineEditor',
    getDefaultProps: function() {
        return {
            range: [0, 10],
            labelStyle: "decimal",
            labelTicks: false,
            tickStep: 1,
            snapDivisions: 4,
            correctRel: "eq",
            correctX: 0
        };
    },

    render: function() {
        return React.DOM.div(null, 
            React.DOM.label(null, 
                ' ',"min x: ", React.DOM.input( {defaultValue:'' + this.props.range[0],
                    onBlur:this.onRangeBlur.bind(this, 0)} )
            ),React.DOM.br(null ),
            React.DOM.label(null, 
                ' ',"max x: ", React.DOM.input( {defaultValue:'' + this.props.range[1],
                    onBlur:this.onRangeBlur.bind(this, 1)} )
            ),
            InfoTip(null, 
                React.DOM.p(null, "Change \"label styles\" below to display the max and min x in"+' '+
                "different number formats.")
            ),React.DOM.br(null ),
            React.DOM.span(null, 
                ' ',"correct:",' ',
                React.DOM.select( {value:this.props.correctRel,
                        onChange:this.onChange.bind(this, "correctRel")}, 
                    React.DOM.optgroup( {label:"Equality"}, 
                        React.DOM.option( {value:"eq"}, "x =")
                    ),
                    React.DOM.optgroup( {label:"Inequality"}, 
                        React.DOM.option( {value:"lt"}, "x <"),
                        React.DOM.option( {value:"gt"}, "x >"),
                        React.DOM.option( {value:"le"}, "x ≤"),
                        React.DOM.option( {value:"ge"}, "x ≥")
                    )
                ),
                React.DOM.input( {defaultValue:'' + this.props.correctX,
                    onBlur:this.onNumBlur.bind(this, "correctX")} )
            ),React.DOM.br(null ),React.DOM.br(null ),
            React.DOM.label(null, 
                ' ',"label style:",' ',
                React.DOM.select( {value:this.props.labelStyle,
                        onChange:this.onChange.bind(this, "labelStyle")}, 
                    React.DOM.option( {value:"decimal"}, "Decimals"),
                    React.DOM.option( {value:"improper"}, "Improper fractions"),
                    React.DOM.option( {value:"mixed"}, "Mixed numbers")
                ),
                PropCheckBox(
                    {label:"label ticks",
                    labelTicks:this.props.labelTicks,
                    onChange:this.props.onChange} )
            ),React.DOM.br(null ),
            React.DOM.label(null, 
                ' ',"tick step: ", React.DOM.input( {defaultValue:'' + this.props.tickStep,
                    onBlur:this.onNumBlur.bind(this, "tickStep")} )
            ),
            InfoTip(null, 
                React.DOM.p(null, "A tick mark is placed at every number of steps"+' '+
                "indicated.")
            ),React.DOM.br(null ),
            React.DOM.label(null, 
                ' ',"snap increments per tick:",' ',
                React.DOM.input( {defaultValue:'' + this.props.snapDivisions,
                    onBlur:this.onNumBlur.bind(this, "snapDivisions")} )
            ),
            InfoTip(null, 
                React.DOM.p(null, "Ensure the required number of snap increments is provided to"+' '+
                "answer the question.")
            )
        );
    },

    onRangeBlur: function(i, e) {
        var x = Util.firstNumericalParse(e.target.value) || 0;
        e.target.value = x;

        var range = this.props.range.slice();
        range[i] = x;
        this.props.onChange({range: range});
    },

    onChange: function(key, e) {
        var opts = {};
        opts[key] = e.target.value;
        this.props.onChange(opts);
    },

    onNumBlur: function(key, e) {
        var x = Util.firstNumericalParse(e.target.value) || 0;
        e.target.value = x;

        var opts = {};
        opts[key] = x;
        this.props.onChange(opts);
    },

    toJSON: function() {
        return {
            range: this.props.range,
            labelStyle: this.props.labelStyle,
            labelTicks: this.props.labelTicks,
            tickStep: this.props.tickStep,
            snapDivisions: this.props.snapDivisions,
            correctRel: this.props.correctRel,
            isInequality: this.props.correctRel !== "eq",
            correctX: this.props.correctX
        };
    }
});

module.exports = {
    name: "interactive-number-line",
    displayName: "Number line 2",
    hidden: true,
    widget: InteractiveNumberLine,
    editor: InteractiveNumberLineEditor
};

},{"../components/prop-check-box.jsx":130,"../util.js":168,"react-components/info-tip":5}],182:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var NumberInput = require("../components/number-input.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var InfoTip = require("react-components/info-tip");

var MAX_SIZE = 8;

// Styling
var CELL_PADDING = 5;

var TABLE_STYLE = {
    display: "table",
    tableLayout: "fixed"
};

var ROW_STYLE = {
    display: "table-row"
};

var CELL_STYLE = {
    display: "table-cell",
    padding: CELL_PADDING
};

var BASE_TILE_STYLE = {
    borderRadius: 10,
    cursor: "pointer"
};

var MOVE_COUNT_STYLE = {
    padding: CELL_PADDING,
    display: "inline-block"
};

var RESET_BUTTON_STYLE = {
    "float": "right",
    paddingRight: CELL_PADDING
};

var MAIN_TILE_SIZE = 50;

var mapCells = function(cells, func)  {
    return _.map(cells, function(row, y)  {
        return _.map(row, function(value, x)  {
            return func(value, y, x);
        });
    });
};

var genCells = function(height, width, func)  {
    return _.times(height, function(y)  {
        return _.times(width, function(x)  {
            return func(y, x);
        });
    });
};

var PATTERNS = {
    plus: function()  {return [
        [false, true, false],
        [true,  true, true ],
        [false, true, false]
    ];},
    x: function()  {return [
        [true,  false, true ],
        [false, true,  false],
        [true,  false, true ]
    ];},
    "plus/x": function(iter)  {
        return (iter % 2) ? PATTERNS.x() : PATTERNS.plus();
    }
};


/**
 * Clamps value to an integer in the range [min, max]
 */
var clampToInt = function(value, min, max) {
    value = Math.floor(value);
    value = Math.max(value, min);
    value = Math.min(value, max);
    return value;
};

// A single glowy cell
var Tile = React.createClass({displayName: 'Tile',
    propTypes: {
        value: React.PropTypes.bool.isRequired,
        size: React.PropTypes.number.isRequired
    },

    render: function() {
        var color = this.props.value ? "#55dd55" : "#115511";
        var style = _.extend({}, BASE_TILE_STYLE, {
            width: this.props.size,
            height: this.props.size,
            backgroundColor: color
        });
        return React.DOM.div(
            {style:style,
            onClick:this._flip} );
    },

    _flip: function() {
        this.props.onChange(!this.props.value);
    },
});

// A grid of glowy cells
var TileGrid = React.createClass({displayName: 'TileGrid',
    propTypes: {
        cells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ).isRequired,
        size: React.PropTypes.number.isRequired
    },

    render: function() {
        return React.DOM.div( {style:TABLE_STYLE, className:"no-select"}, 
            _.map(this.props.cells, function(row, y)  {
                return React.DOM.div( {key:y, style:ROW_STYLE}, 
                    _.map(row, function(cell, x)  {
                        return React.DOM.div( {key:x, style:CELL_STYLE}, 
                            Tile(
                                {value:cell,
                                size:this.props.size,
                                onChange:_.partial(this.props.onChange, y, x)}
                                )
                        );
                    }.bind(this))
                );
            }.bind(this))
        );
    },
});

// Returns a copy of the tiles, with tiles flipped according to
// whether or not their y, x position satisfies the predicate
var flipTilesPredicate = function(oldCells, predicate)  {
    return _.map(oldCells, function(row, y)  {
        return _.map(row, function(cell, x)  {
            return predicate(y, x) ? !cell : cell;
        });
    });
};

var flipTilesPattern = function(oldCells, tileY, tileX, pattern)  {
    return flipTilesPredicate(oldCells, function(y, x)  {
        var offsetY = y - tileY;
        var offsetX = x - tileX;
        if (Math.abs(offsetY) <= 1 && Math.abs(offsetX) <= 1) {
            return pattern[offsetY + 1][offsetX + 1];
        } else {
            return false;
        }
    });
};

// The lights puzzle widget
var LightsPuzzle = React.createClass({displayName: 'LightsPuzzle',
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        cells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ),
        startCells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ),
        flipPattern: React.PropTypes.string.isRequired,
        moveCount: React.PropTypes.number.isRequired
    },

    getDefaultProps: function() {
        return {
            cells: [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ],
            startCells: [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ],
            flipPattern: "plus",
            moveCount: 0
        };
    },

    render: function() {
        var width = this._width();
        var tileSize = MAIN_TILE_SIZE;
        var pxWidth = width * (tileSize + 2 * CELL_PADDING);
        return React.DOM.div(null, 
            TileGrid(
                {cells:this.props.cells,
                size:tileSize,
                onChange:this._flipTile} ),
            React.DOM.div( {style:{width: pxWidth}}, 
                React.DOM.div( {style:MOVE_COUNT_STYLE}, 
                    "Moves: ", this.props.moveCount
                ),
                React.DOM.div( {style:RESET_BUTTON_STYLE}, 
                React.DOM.input(
                    {type:"button",
                    value:"Reset",
                    onClick:this._reset,
                    className:"simple-button"} )
                )
            ),
            React.DOM.div( {className:"clearfix"} )
        );
    },

    _width: function() {
        if (this.props.cells.length !== 0) {
            return this.props.cells[0].length;
        } else {
            return 0; // default to 0
        }
    },

    componentDidMount: function() {
        this._initNextPatterns();
    },

    componentDidUpdate: function(prevProps) {
        if (prevProps.flipPattern !== this.props.flipPattern) {
            this._initNextPatterns();
        }
    },

    _initNextPatterns: function() {
        this._currPattern = PATTERNS[this.props.flipPattern](0);
        this._nextPattern = PATTERNS[this.props.flipPattern](1);
        this._patternIndex = 2;
    },

    _shiftPatterns: function() {
        this._currPattern = this._nextPattern;
        this._nextPattern = PATTERNS[this.props.flipPattern](
            this._patternIndex
        );
        this._patternIndex++;
    },

    _flipTile: function(tileY, tileX) {
        var newCells = flipTilesPattern(
            this.props.cells,
            tileY,
            tileX,
            this._currPattern
        );
        this._shiftPatterns();

        this.change({
            cells: newCells,
            moveCount: this.props.moveCount + 1
        });
    },

    _reset: function() {
        this.change({
            cells: this.props.startCells,
            moveCount: 0
        });
    },

    simpleValidate: function(rubric) {
        return validate(rubric, this.toJSON());
    },

    statics: {
        displayMode: "block"
    }
});

// The widget editor
var LightsPuzzleEditor = React.createClass({displayName: 'LightsPuzzleEditor',
    mixins: [Changeable, JsonifyProps],

    propTypes: {
        startCells: React.PropTypes.arrayOf(
            React.PropTypes.arrayOf(React.PropTypes.bool)
        ),
        flipPattern: React.PropTypes.string.isRequired,
        gradeIncompleteAsWrong: React.PropTypes.bool.isRequired
    },

    getDefaultProps: function() {
        return {
            startCells: [
                [false, false, false],
                [false, false, false],
                [false, false, false]
            ],
            flipPattern: "plus",
            gradeIncompleteAsWrong: false
        };
    },

    _height: function() {
        return this.props.startCells.length;
    },

    _width: function() {
        if (this.props.startCells.length !== 0) {
            return this.props.startCells[0].length;
        } else {
            return 0; // default to 0
        }
    },

    render: function() {
        return React.DOM.div(null, 
            React.DOM.div(null, 
                "Width:",
                NumberInput(
                    {value:this._width(),
                    placeholder:5,
                    onChange:this._changeWidth} ),
                ", ",
                "Height:",
                NumberInput(
                    {value:this._height(),
                    placeholder:5,
                    onChange:this._changeHeight} )
            ),
            React.DOM.div(null, 
                "Flip pattern:",
                React.DOM.select(
                        {value:this.props.flipPattern,
                        onChange:this._handlePatternChange}, 
                    _.map(_.keys(PATTERNS), function(pattern)  {
                        return React.DOM.option( {value:pattern}, pattern);
                    })
                )
            ),
            React.DOM.div(null, 
                "Grade incomplete puzzles as wrong:",
                " ",
                PropCheckBox(
                    {gradeIncompleteAsWrong:this.props.gradeIncompleteAsWrong,
                    onChange:this.props.onChange} ),
                    InfoTip(null, 
                        "By default, incomplete puzzles are graded as empty."
                    )
                ),
            React.DOM.div(null, 
                "Starting configuration:"
            ),
            React.DOM.div( {style:{overflowX: "auto"}}, 
                TileGrid(
                    {cells:this.props.startCells,
                    size:50,
                    onChange:this._switchTile} )
            )
        );
    },

    _handlePatternChange: function(e) {
        this.change("flipPattern", e.target.value);
    },

    _changeWidth: function(newWidth) {
        newWidth = clampToInt(newWidth, 1, MAX_SIZE);
        this._truncateCells(newWidth, this._height());
    },

    _changeHeight: function(newHeight) {
        newHeight = clampToInt(newHeight, 1, MAX_SIZE);
        this._truncateCells(this._width(), newHeight);
    },

    _truncateCells: function(newWidth, newHeight) {
        var newCells = _.times(newHeight, function(y)  {
            return _.times(newWidth, function(x)  {
                // explicitly cast the result to a boolean with !!
                return !!(this.props.startCells[y] &&
                        this.props.startCells[y][x]);
            }.bind(this));
        }.bind(this));

        this.change({startCells: newCells});
    },

    _switchTile: function(tileY, tileX) {
        var newCells = flipTilesPredicate(this.props.startCells, function(y, x)  {
            return y === tileY && x === tileX;
        });

        this.change({startCells: newCells});
    }
});

// grading function
var validate = function(rubric, state) {
    var empty = _.all(state.cells, function(row, y)  {
        return _.all(row, function(cell, x)  {
            return cell === rubric.startCells[y][x];
        });
    });
    if (empty) {
        return {
            type: "invalid",
            message: $._("Click on the tiles to change the lights.")
        };
    }

    var correct = _.all(state.cells, function(row)  {
        return _.all(row, function(cell)  {
            return cell;
        });
    });

    if (correct) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null
        };
    } else if (rubric.gradeIncompleteAsWrong) {
        return {
            type: "points",
            earned: 0,
            total: 1,
            message: null
        };
    } else {
        return {
            type: "invalid",
            message: $._("You must turn on all of the lights to continue.")
        };
    }
};

// The function run on the editor props to create the widget props
var transformProps = function(editorProps) {
    return {
        cells: editorProps.startCells,
        startCells: editorProps.startCells,
        flipPattern: editorProps.flipPattern
    };
};

module.exports = {
    name: "lights-puzzle",
    displayName: "Lights Puzzle",
    hidden: true,
    widget: LightsPuzzle,
    editor: LightsPuzzleEditor,
    transform: transformProps
};

},{"../components/number-input.jsx":129,"../components/prop-check-box.jsx":130,"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"react":115,"react-components/info-tip":5}],183:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var InfoTip        = require("react-components/info-tip");
var PropCheckBox   = require("../components/prop-check-box.jsx");
var Renderer       = require("../renderer.jsx");
var Sortable       = require("../components/sortable.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var shuffle = require("../util.js").shuffle;
var seededRNG = require("../util.js").seededRNG;

var Matcher = React.createClass({displayName: 'Matcher',
    propTypes: {
        left: React.PropTypes.array,
        right: React.PropTypes.array,
        labels: React.PropTypes.array,
        orderMatters: React.PropTypes.bool,
        padding: React.PropTypes.bool,
        problemNum: React.PropTypes.number,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            left: [],
            right: [],
            labels: ["", ""],
            orderMatters: true,
            padding: true,
            problemNum: 0,
            onChange: function() {}
        };
    },

    getInitialState: function() {
        return {
            leftHeight: 0,
            rightHeight: 0
        };
    },

    render: function() {
        // Use the same random() function to shuffle both columns sequentially
        var rng = seededRNG(this.props.problemNum);

        var left;
        if (!this.props.orderMatters) {
            // If the order doesn't matter, don't shuffle the left column
            left = this.props.left;
        } else {
            left = shuffle(this.props.left, rng, /* ensurePermuted */ true);
        }

        var right = shuffle(this.props.right, rng, /* ensurePermuted */ true);

        var showLabels = _.any(this.props.labels);
        var constraints = {height: _.max([this.state.leftHeight,
            this.state.rightHeight])};

        return React.DOM.div( {className:"perseus-widget-matcher ui-helper-clearfix"}, 
            React.DOM.div( {className:"column"}, 
                showLabels && React.DOM.div( {className:"column-label"}, 
                    Renderer( {content:this.props.labels[0] || "..."} )
                ),
                Sortable(
                    {options:left,
                    layout:"vertical",
                    padding:this.props.padding,
                    disabled:!this.props.orderMatters,
                    constraints:constraints,
                    onMeasure:this.onMeasureLeft,
                    onChange:this.props.onChange,
                    ref:"left"} )
            ),
            React.DOM.div( {className:"column"}, 
                showLabels && React.DOM.div( {className:"column-label"}, 
                    Renderer( {content:this.props.labels[1] || "..."} )
                ),
                Sortable(
                    {options:right,
                    layout:"vertical",
                    padding:this.props.padding,
                    constraints:constraints,
                    onMeasure:this.onMeasureRight,
                    onChange:this.props.onChange,
                    ref:"right"} )
            )
        );
    },

    onMeasureLeft: function(dimensions) {
        var height = _.max(dimensions.heights);
        this.setState({leftHeight: height});
    },

    onMeasureRight: function(dimensions) {
        var height = _.max(dimensions.heights);
        this.setState({rightHeight: height});
    },

    toJSON: function(skipValidation) {
        return {
            left: this.refs.left.getOptions(),
            right: this.refs.right.getOptions()
        };
    },

    simpleValidate: function(rubric) {
        return Matcher.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});


_.extend(Matcher, {
    validate: function(state, rubric) {
        var correct = _.isEqual(state.left, rubric.left) &&
                      _.isEqual(state.right, rubric.right);

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null
        };
    }
});


var MatcherEditor = React.createClass({displayName: 'MatcherEditor',
    propTypes: {
        left: React.PropTypes.array,
        right: React.PropTypes.array,
        labels: React.PropTypes.array,
        orderMatters: React.PropTypes.bool,
        padding: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            left: ["$x$", "$y$", "$z$"],
            right: ["$1$", "$2$", "$3$"],
            labels: ["test", "label"],
            orderMatters: true,
            padding: true
        };
    },

    render: function() {
        return React.DOM.div( {className:"perseus-matcher-editor"}, 
            React.DOM.div(null, 
                ' ',"Correct answer:",' ',
                InfoTip(null, 
                    React.DOM.p(null, "Enter the correct answers here. The preview on the right"+' '+
                    "will show the cards in a randomized order, which is how the"+' '+
                    "student will see them.")
                )
            ),
            React.DOM.div( {className:"ui-helper-clearfix"}, 
                TextListEditor(
                    {options:this.props.left,
                    onChange:function(options, cb)  {
                        this.props.onChange({left: options}, cb);
                    }.bind(this),
                    layout:"vertical"} ),
                TextListEditor(
                    {options:this.props.right,
                    onChange:function(options, cb)  {
                        this.props.onChange({right: options}, cb);
                    }.bind(this),
                    layout:"vertical"} )
            ),
            React.DOM.span(null, 
                ' ',"Labels:",' ',
                InfoTip(null, 
                    React.DOM.p(null, "These are entirely optional.")
                )
            ),
            React.DOM.div(null, 
                React.DOM.input( {type:"text",
                    defaultValue:this.props.labels[0],
                    onChange:this.onLabelChange.bind(this, 0)} ),
                React.DOM.input( {type:"text",
                    defaultValue:this.props.labels[1],
                    onChange:this.onLabelChange.bind(this, 1)} )
            ),
            React.DOM.div(null, 
                PropCheckBox(
                    {label:"Order of the matched pairs matters:",
                    orderMatters:this.props.orderMatters,
                    onChange:this.props.onChange} ),
                InfoTip(null, 
                    React.DOM.p(null, "With this option enabled, only the order provided above"+' '+
                    "will be treated as correct. This is useful when ordering is"+' '+
                    "significant, such as in the context of a proof."),
                    React.DOM.p(null, "If disabled, pairwise matching is sufficient. To make"+' '+
                    "this clear, the left column becomes fixed in the provided"+' '+
                    "order and only the cards in the right column can be"+' '+
                    "moved.")
                )
            ),
            React.DOM.div(null, 
                PropCheckBox(
                    {label:"Padding:",
                    padding:this.props.padding,
                    onChange:this.props.onChange} ),
                InfoTip(null, 
                    React.DOM.p(null, "Padding is good for text, but not needed for images.")
                )
            )
        );
    },

    onLabelChange: function(index, e) {
        var labels = _.clone(this.props.labels);
        labels[index] = e.target.value;
        this.props.onChange({labels: labels});
    },

    toJSON: function(skipValidation) {
        if (!skipValidation) {
            if (this.props.left.length !== this.props.right.length) {
                alert("Warning: The two halves of the matcher have different" +
                    " numbers of cards.");
            }
        }

        return _.pick(this.props,
            "left", "right", "labels", "orderMatters", "padding"
        );
    }
});

module.exports = {
    name: "matcher",
    displayName: "Two column matcher",
    widget: Matcher,
    editor: MatcherEditor,
    hidden: true
};

},{"../components/prop-check-box.jsx":130,"../components/sortable.jsx":132,"../components/text-list-editor.jsx":135,"../renderer.jsx":165,"../util.js":168,"react":115,"react-components/info-tip":5}],184:[function(require,module,exports){
/** @jsx React.DOM */

var React        = require('react');
var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var InfoTip       = require("react-components/info-tip");
var NumberInput   = require("../components/number-input.jsx");
var PropCheckBox  = require("../components/prop-check-box.jsx");
var RangeInput    = require("../components/range-input.jsx");

var defaultImage = {
    url: null,
    top: 0,
    left: 0
};

var Measurer = React.createClass({displayName: 'Measurer',
    propTypes: {
        box: React.PropTypes.arrayOf(React.PropTypes.number),
        image: React.PropTypes.shape({
            url: React.PropTypes.string,
            top: React.PropTypes.number,
            left: React.PropTypes.number
        }),
        showProtractor: React.PropTypes.bool,
        protractorX: React.PropTypes.number,
        protractorY: React.PropTypes.number,
        showRuler: React.PropTypes.bool,
        rulerLabel: React.PropTypes.string,
        rulerTicks: React.PropTypes.number,
        rulerPixels: React.PropTypes.number,
        rulerLength: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            box: [480, 480],
            image: {},
            showProtractor: true,
            protractorX: 7.5,
            protractorY: 0.5,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            rulerPixels: 40,
            rulerLength: 10
        };
    },

    getInitialState: function() {
        return {};
    },

    render: function() {
        var image = _.extend({}, defaultImage, this.props.image);
        return React.DOM.div(
                {className:
                    "perseus-widget perseus-widget-measurer " +
                    "graphie-container above-scratchpad",
                
                style:{width: this.props.box[0], height: this.props.box[1]}}, 
            image.url &&
                React.DOM.img(
                    {src:image.url,
                    style:{
                        top: image.top,
                        left: image.left
                    }} ),
            
            React.DOM.div( {className:"graphie", ref:"graphieDiv"} )
        );
    },

    componentDidMount: function() {
        this.setupGraphie();
    },

    componentDidUpdate: function(prevProps) {
        var shouldSetupGraphie = _.any([
                "box", "showProtractor", "showRuler", "rulerLabel",
                "rulerTicks", "rulerPixels", "rulerLength"
            ],
            function(prop) {
                return prevProps[prop] !== this.props[prop];
            },
            this
        );

        if (shouldSetupGraphie) {
            this.setupGraphie();
        }
    },

    setupGraphie: function() {
        var graphieDiv = this.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var graphie = this.graphie = KhanUtil.createGraphie(graphieDiv);

        var scale = [40, 40];
        var range = [
            [0, this.props.box[0] / scale[0]],
            [0, this.props.box[1] / scale[1]]
        ];
        graphie.init({
            range: range,
            scale: scale
        });
        graphie.addMouseLayer({
            allowScratchpad: true
        });

        if (this.protractor) {
            this.protractor.remove();
        }

        if (this.props.showProtractor) {
            this.protractor = graphie.protractor([
                this.props.protractorX,
                this.props.protractorY
            ]);
        }

        if (this.ruler) {
            this.ruler.remove();
        }

        if (this.props.showRuler) {
            this.ruler = graphie.ruler({
                center: [
                    (range[0][0] + range[0][1]) / 2,
                    (range[1][0] + range[1][1]) / 2
                ],
                label: this.props.rulerLabel,
                pixelsPerUnit: this.props.rulerPixels,
                ticksPerUnit: this.props.rulerTicks,
                units: this.props.rulerLength
            });
        }
    },

    toJSON: function() {
        return {};
    },

    simpleValidate: function(rubric) {
        return Measurer.validate(this.toJSON(), rubric);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});


_.extend(Measurer, {
    validate: function(state, rubric) {
        return {
            type: "points",
            earned: 1,
            total: 1,
            message: null
        };
    }
});


var MeasurerEditor = React.createClass({displayName: 'MeasurerEditor',
    mixins: [Changeable, JsonifyProps],
    className: "perseus-widget-measurer",

    propTypes: {
        box: React.PropTypes.arrayOf(React.PropTypes.number),
        image: React.PropTypes.shape({
            url: React.PropTypes.string,
            top: React.PropTypes.number,
            left: React.PropTypes.number
        }),
        showProtractor: React.PropTypes.bool,
        showRuler: React.PropTypes.bool,
        rulerLabel: React.PropTypes.string,
        rulerTicks: React.PropTypes.number,
        rulerPixels: React.PropTypes.number,
        rulerLength: React.PropTypes.number
    },

    getDefaultProps: function() {
        return {
            box: [480, 480],
            image: {},
            showProtractor: true,
            showRuler: false,
            rulerLabel: "",
            rulerTicks: 10,
            rulerPixels: 40,
            rulerLength: 10
        };
    },

    render: function() {
        var image = _.extend({}, defaultImage, this.props.image);

        return React.DOM.div( {className:"perseus-widget-measurer"}, 
            React.DOM.div(null, "Image displayed under protractor and/or ruler:"),
            React.DOM.div(null, "URL:",' ',
                React.DOM.input( {type:"text",
                        className:"perseus-widget-measurer-url",
                        ref:"image-url",
                        defaultValue:image.url,
                        onChange:this._changeUrl} ),
            InfoTip(null, 
                React.DOM.p(null, "Create an image in graphie, or use the \"Add image\" function"+' '+
                "to create a background.")
            )
            ),
            image.url && React.DOM.div( {className:"perseus-widget-row"}, 
                React.DOM.div( {className:"perseus-widget-left-col"}, 
                    NumberInput( {label:"Pixels from top:",
                        placeholder:0,
                        onChange:this._changeTop,
                        value:image.top,
                        useArrowKeys:true} )
                ),
                React.DOM.div( {className:"perseus-widget-right-col"}, 
                    NumberInput( {label:"Pixels from left:",
                        placeholder:0,
                        onChange:this._changeLeft,
                        value:image.left,
                        useArrowKeys:true} )
                )
            ),
            React.DOM.div(null, "Containing area [width, height]:",' ',
                RangeInput(
                    {onChange:this.change("box"),
                    value:this.props.box,
                    useArrowKeys:true} )
            ),
            React.DOM.div( {className:"perseus-widget-row"}, 
                React.DOM.div( {className:"perseus-widget-left-col"}, 
                    PropCheckBox( {label:"Show ruler",
                        showRuler:this.props.showRuler,
                        onChange:this.props.onChange} )
                ),
                React.DOM.div( {className:"perseus-widget-right-col"}, 
                    PropCheckBox( {label:"Show protractor",
                        showProtractor:this.props.showProtractor,
                        onChange:this.props.onChange} )
                )
            ),
            this.props.showRuler && React.DOM.div(null, 
            React.DOM.div(null, 
                React.DOM.label(null, 
                    ' ',"Ruler label:",' ',
                    React.DOM.select(
                        {onChange:function(e) 
                            {return this.change("rulerLabel", e.target.value);}.bind(this),
                        value:this.props.rulerLabel} , 
                            React.DOM.option( {value:""}, "None"),
                            React.DOM.optgroup( {label:"Metric"}, 
                                this.renderLabelChoices([
                                    ["milimeters", "mm"],
                                    ["centimeters", "cm"],
                                    ["meters", "m"],
                                    ["kilometers", "km"]
                                ])
                            ),
                            React.DOM.optgroup( {label:"Imperial"}, 
                                this.renderLabelChoices([
                                    ["inches", "in"],
                                    ["feet", "ft"],
                                    ["yards", "yd"],
                                    ["miles", "mi"]
                                ])
                            )
                    )
                )
            ),
            React.DOM.div(null, 
                React.DOM.label(null, 
                    ' ',"Ruler ticks:",' ',
                    React.DOM.select(
                        {onChange:function(e) 
                            {return this.change("rulerTicks", +e.target.value);}.bind(this),
                        value:this.props.rulerTicks} , 
                            _.map([1, 2, 4, 8, 10, 16], function(n) {
                                return React.DOM.option( {value:n}, n);
                            })
                    )
                )
            ),
            React.DOM.div(null, 
                NumberInput( {label:"Ruler pixels per unit:",
                    placeholder:40,
                    onChange:this.change("rulerPixels"),
                    value:this.props.rulerPixels,
                    useArrowKeys:true} )
            ),
            React.DOM.div(null, 
                NumberInput( {label:"Ruler length in units:",
                    placeholder:10,
                    onChange:this.change("rulerLength"),
                    value:this.props.rulerLength,
                    useArrowKeys:true} )
            )
            )
        );
    },

    _changeUrl: function(e) {
        this._changeImage("url", e.target.value);
    },

    _changeTop: function(newTop) {
        this._changeImage("top", newTop);
    },

    _changeLeft: function(newLeft) {
        this._changeImage("left", newLeft);
    },

    _changeImage: function(subProp, newValue) {
        var image = _.clone(this.props.image);
        image[subProp] = newValue;
        this.change("image", image);
    },

    renderLabelChoices: function(choices) {
        return _.map(choices, function(nameAndValue) {
            return React.DOM.option( {value:nameAndValue[1]}, nameAndValue[0]);
        });
    }
});

propUpgrades = {
    1: function(v0props)  {
        var v1props = _(v0props).chain()
            .omit("imageUrl", "imageTop", "imageLeft")
            .extend({
                image: {
                    url: v0props.imageUrl,
                    top: v0props.imageTop,
                    left: v0props.imageLeft
                }
            })
            .value();
        return v1props;
    }
};

module.exports = {
    name: "measurer",
    displayName: "Measurer",
    widget: Measurer,
    editor: MeasurerEditor,
    version: {major: 1, minor: 0},
    propUpgrades: propUpgrades,
    hidden: true
};

},{"../components/number-input.jsx":129,"../components/prop-check-box.jsx":130,"../components/range-input.jsx":131,"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"react":115,"react-components/info-tip":5}],185:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');

var Changeable   = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var ButtonGroup  = require("react-components/button-group");
var InfoTip      = require("react-components/info-tip");
var Interactive2 = require("../interactive2.js");
var NumberInput  = require("../components/number-input.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var RangeInput   = require("../components/range-input.jsx");

var Graphie = require("../components/graphie.jsx");
var MovablePoint = Graphie.MovablePoint;
var Line = Graphie.Line;
var Label = Graphie.Label;

var knumber = KhanUtil.knumber;
var kpoint = KhanUtil.kpoint;

var bound = function(x, gt, lt)  {return Math.min(Math.max(x, gt), lt);};
var deepEq = require("../util.js").deepEq;
var assert = require("../interactive2/interactive-util.js").assert;

var reverseRel = {
    ge: "le",
    gt: "lt",
    le: "ge",
    lt: "gt"
};

var toggleStrictRel = {
    ge: "gt",
    gt: "ge",
    le: "lt",
    lt: "le"
};

function formatImproper(n, d) {
    if (d === 1) {
        return "" + n;
    } else {
        return n + "/" + d;
    }
}

function formatMixed(n, d) {
    if (n < 0) {
        return "-" + formatMixed(-n, d);
    }
    var w = Math.floor(n / d);
    if (w === 0) {
        return formatImproper(n, d);
    } else if (n - w * d === 0) {
        return "" + w;
    } else {
        return w + "\\:" + formatImproper(n - w * d, d);
    }
}

function formatNonReduced(n, d, base) {
    var factor = Math.floor(base / d);
    return formatImproper(n * factor, base);
}

_label = function(graphie, labelStyle, pos, value, base)  {
    value = value || pos;

    // TODO(jack): Find out if any exercises have "decimal ticks" set,
    // and if so, re-save them and remove this check.
    if (labelStyle === "decimal" || labelStyle === "decimal ticks") {
        return graphie.label([pos, -0.53],
            Math.round(value * 100) / 100, "center");
    } else if (labelStyle === "improper") {
        var frac = KhanUtil.toFraction(value);
        return graphie.label([pos, -0.53],
                formatImproper(frac[0], frac[1]), "center");
    } else if (labelStyle === "mixed") {
        var frac = KhanUtil.toFraction(value);
        return graphie.label([pos, -0.53],
                formatMixed(frac[0], frac[1]), "center");
    } else if (labelStyle === "non-reduced") {
        var frac = KhanUtil.toFraction(value);
        return graphie.label([pos, -0.53],
                formatNonReduced(frac[0], frac[1], base), "center");
    }
};

TickMarks = Graphie.createSimpleClass(function(graphie, props)  {
    // Avoid infinite loop
    if (!_.isFinite(props.tickStep) || props.tickStep <= 0) {
        return []; // this has screwed me for the last time!
    }

    var results = [];

    // For convenience, extract some props into separate variables
    var range = props.range;
    var labelRange = props.labelRange;
    var range = props.range;
    var leftLabel = labelRange[0] == null ? range[0] : labelRange[0];
    var rightLabel = labelRange[1] == null ? range[1] : labelRange[1];

    // Find base via GCD for non-reduced fractions
    var base;
    if (props.labelStyle === "non-reduced") {
        var fractions = [leftLabel, rightLabel];
        for (var i = 0; i < props.numDivisions; i++) {
            var x = range[0] + i * props.tickStep;
            fractions.push(x);
        }
        var getDenom = function(x)  {return KhanUtil.knumber.toFraction(x)[1];};
        var denoms = _.map(fractions, getDenom);
        base = _.reduce(denoms, function(x, y)  {return KhanUtil.getLCM(x, y);});
    } else {
        base = undefined;
    }

    // Draw and save the tick marks and tick labels
    for (var i = 0; i < props.numDivisions; i++) {
        var x = range[0] + i * props.tickStep;
        results.push(graphie.line([x, -0.2], [x, 0.2]));

        var labelTicks = props.labelTicks;
        if (labelTicks || props.labelStyle === "decimal ticks") {
            results.push(_label(graphie, props.labelStyle, x, x, base));
        }
    }

    // Render the text labels
    graphie.style({color: KhanUtil.DYNAMIC}, function()  {
        results.push(_label(graphie, props.labelStyle, leftLabel, leftLabel,
            base));
        results.push(_label(graphie, props.labelStyle, rightLabel, rightLabel,
            base));
    });

    // Render the labels' lines
    graphie.style(
        {
            stroke: KhanUtil.DYNAMIC,
            strokeWidth: 3.5
        },
        function()  {
            results.push(graphie.line([leftLabel, -0.2], [leftLabel, 0.2]));
            results.push(graphie.line([rightLabel, -0.2], [rightLabel, 0.2]));
        }
    );

    return results;
});


var NumberLine = React.createClass({displayName: 'NumberLine',
    mixins: [Changeable],

    propTypes: {
        range: React.PropTypes.arrayOf(React.PropTypes.number).isRequired,

        labelRange: React.PropTypes.array.isRequired,
        labelStyle: React.PropTypes.string.isRequired,
        labelTicks: React.PropTypes.bool.isRequired,

        divisionRange: React.PropTypes.arrayOf(
            React.PropTypes.number
        ).isRequired,
        numDivisions: React.PropTypes.number.isRequired,
        snapDivisions: React.PropTypes.number.isRequired,

        isTickCtrl: React.PropTypes.bool.isRequired,
        isInequality: React.PropTypes.bool.isRequired,

        numLinePosition: React.PropTypes.number.isRequired,
        rel: React.PropTypes.oneOf(["lt", "gt", "le", "ge"])
    },

    getDefaultProps: function() {
        return {
            range: [0, 10],
            labelStyle: "decimal",
            labelRange: [null, null],
            divisionRange: [1, 10],
            labelTicks: true,
            isTickCtrl: false,
            isInequality: false,
            numLinePosition: 0,
            snapDivisions: 2,
            rel: "ge"
        };
    },

    isValid: function() {
        var range = this.props.range;
        var initialX = this.props.numLinePosition;
        var divisionRange = this.props.divisionRange;

        initialX = initialX == null ? range[0] : initialX;

        return range[0] <  range[1] &&
               initialX >= range[0] &&
               initialX <= range[1] &&
               divisionRange[0] < divisionRange[1] &&
               0 < this.props.numDivisions &&
               0 < this.props.snapDivisions;
    },

    render: function() {
        var inequalityControls = React.DOM.div(null, 
            React.DOM.input(
                {type:"button",
                className:"simple-button",
                value:"Switch direction",
                onClick:this.handleReverse} ),
            React.DOM.input(
                {type:"button",
                className:"simple-button",
                value:_(["le", "ge"]).contains(this.props.rel) ?
                        "Make circle open" :
                        "Make circle filled",
                onClick:this.handleToggleStrict} )
        );

        return React.DOM.div( {className:"perseus-widget " +
                "perseus-widget-interactive-number-line"}, 
            !this.isValid() ? React.DOM.div(null, "invalid number line configuration") :
                this._renderGraphie(),
            this.props.isInequality && inequalityControls
        );
    },

    _renderGraphie: function() {
        // Position variables
        var widthInPixels = 400;
        var range = this.props.range;
        var width = range[1] - range[0];
        var scale = width / widthInPixels;
        var buffer = 30 * scale;

        // Initiate the graphie without actually drawing anything
        var left = range[0] - buffer, right = range[1] + buffer;
        var bottom = -1, top = 1 + (this.props.isTickCtrl ? 1 : 0);

        var options = _.pick(this.props, [
            "range",
            "isTickCtrl",
        ]);

        // TODO(aria): Maybe save this as `this.calculatedProps`?
        var props = _.extend({}, this.props, {
            tickCtrlPosition: this.calculateTickControlPosition(
                this.props.numDivisions
            ),
            tickStep: width / this.props.numDivisions
        });

        return Graphie(
                {ref:"graphie",
                box:[460, (this.props.isTickCtrl ? 120 : 80)],
                options:options,
                setup:this._setupGraphie}, 
            this._renderTickControl(props),
            TickMarks(_.pick(props, [
                "range",
                "numDivisions",
                "labelTicks",
                "labelStyle",
                "labelRange",
                "tickStep"
            ])),
            this._renderInequality(props),
            this._renderNumberLinePoint(props)
        );
    },

    snapNumLinePosition: function(props, numLinePosition) {
        var left = props.range[0];
        var right = props.range[1];
        var snapX = props.tickStep / props.snapDivisions;

        x = bound(numLinePosition, left, right);
        x = left + knumber.roundTo(x - left, snapX);
        assert(_.isFinite(x));
        return x;
    },

    _renderNumberLinePoint: function(props) {
        var isOpen = _(["lt", "gt"]).contains(props.rel);
        var normalStyle = {
            fill: isOpen ? KhanUtil._BACKGROUND : KhanUtil.INTERACTIVE,
            "stroke-width": isOpen ? 3 : 1
        };
        var highlightStyle = {
            fill: isOpen ? KhanUtil._BACKGROUND : KhanUtil.INTERACTING,
            "stroke-width": isOpen ? 3 : 1
        };

        return MovablePoint(
            {pointSize:6,
            coord:[props.numLinePosition, 0],
            constraints:[
                function(coord, prevCoord)  {  // constrain-y
                    return [coord[0], prevCoord[1]];
                },
                function(coord, prevCoord)  {  // snap X
                    var x = this.snapNumLinePosition(props, coord[0]);
                    return [x, coord[1]];
                }.bind(this)
            ],
            normalStyle:normalStyle,
            highlightStyle:highlightStyle,
            onMove:function(coord)  {
                this.change({numLinePosition: coord[0]});
            }.bind(this)}
        );
    },

    _renderTickControl: function(props) {
        if (!this.props.isTickCtrl) {
            return null;
        }

        var width = props.range[1] - props.range[0];
        var tickCtrlWidth = (1/3) * width;
        var tickCtrlLeft = props.range[0] + (1/3) * width;
        var tickCtrlRight = props.range[0] + (2/3) * width;
        var scale = width / 400;
        var textBuffer = 50 * scale;
        var textLeft = tickCtrlLeft - textBuffer;
        var textRight = tickCtrlRight + textBuffer;
        var divSpan= props.divisionRange[1] - props.divisionRange[0];

        return [
            Line( {start:[tickCtrlLeft, 1.5], end:[tickCtrlRight, 1.5]} ),
            Label(
                {coord:[textLeft, 1.5],
                text:"fewer ticks",
                direction:"center",
                tex:false} ),
            Label(
                {coord:[textRight, 1.5],
                text:"more ticks",
                direction:"center",
                tex:false} ),
            MovablePoint(
                {key:"tickControl",
                pointSize:5,
                coord:[props.tickCtrlPosition, 1.5],
                constraints:[
                    function(coord, prevCoord)  {  // constrain-y
                        return [coord[0], prevCoord[1]];
                    },
                    function(coord, prevCoord)  {  // snap & bound
                        var snapX = tickCtrlWidth / (divSpan);
                        x = bound(coord[0], tickCtrlLeft, tickCtrlRight);
                        x = tickCtrlLeft +
                            Math.round((x - tickCtrlLeft) / (snapX)) * snapX;
                        assert(_.isFinite(x));
                        return [x, coord[1]];
                    }
                ],
                onMove:function(coord)  {
                    var numDivisions = this.calculateNumDivisions(coord[0]);
                    this.change({numDivisions: numDivisions});
                }.bind(this),
                onMoveEnd:function(coord)  {
                    // Snap point to a tick step
                    var numDivisions = this.calculateNumDivisions(coord[0]);

                    var nextProps = _.extend({}, props, {
                        numDivisions: numDivisions,
                        tickStep: width / numDivisions
                    });
                    var newNumLinePosition = this.snapNumLinePosition(
                        nextProps,
                        props.numLinePosition
                    );
                    this.change({numLinePosition: newNumLinePosition});
                }.bind(this)}
            )
        ];
    },

    handleReverse: function() {
        var newRel = reverseRel[this.props.rel];
        this.props.onChange({rel: newRel});
    },

    handleToggleStrict: function() {
        var newRel = toggleStrictRel[this.props.rel];
        this.props.onChange({rel: newRel});
    },

    _getInequalityEndpoint: function(props) {
        var isGreater = _(["ge","gt"]).contains(props.rel);
        var widthInPixels = 400;
        var range = props.range;
        var scale = (range[1] - range[0]) / widthInPixels;
        var buffer = 30 * scale;
        var left = range[0] - buffer;
        var right = range[1] + buffer;
        var end = isGreater ? [right, 0] : [left, 0];
        return end;
    },

    _renderInequality: function(props) {
        if (props.isInequality) {
            var end = this._getInequalityEndpoint(props);
            var style = {
                arrows: "->",
                stroke: KhanUtil.DYNAMIC,
                strokeWidth: 3.5
            };

            return Line(
                {start:[props.numLinePosition, 0],
                end:end,
                style:style} );
        } else {
            return null;
        }
    },

    calculateTickControlPosition: function(numDivisions) {
        var width = this.props.range[1] - this.props.range[0];
        var tickCtrlLeft = this.props.range[0] + (1/3) * width;
        var tickCtrlWidth = (1/3) * width;
        var minDivs = this.props.divisionRange[0];
        var maxDivs = this.props.divisionRange[1];

        var tickCtrlPosition = tickCtrlLeft + tickCtrlWidth *
                ((numDivisions - minDivs) / (maxDivs - minDivs));

        return tickCtrlPosition;
    },

    calculateNumDivisions: function(tickCtrlPosition) {
        var width = this.props.range[1] - this.props.range[0];
        var tickCtrlLeft = this.props.range[0] + (1/3) * width;
        var tickCtrlRight = this.props.range[0] + (2/3) * width;
        var tickCtrlWidth = (1/3) * width;
        var minDivs = this.props.divisionRange[0];
        var maxDivs = this.props.divisionRange[1];

        var tickCtrlPosition = bound(tickCtrlPosition,
                       tickCtrlLeft, tickCtrlRight);
        var numDivs = minDivs + Math.round((maxDivs - minDivs) *
                ((tickCtrlPosition - tickCtrlLeft) / tickCtrlWidth));

        assert(_.isFinite(numDivs));
        return numDivs;
    },

    _setupGraphie: function(graphie, options) {
        // Ensure a sane configuration to avoid infinite loops
        if (!this.isValid()) {return;}

        // Position variables
        var widthInPixels = 400;
        var range = options.range;
        var scale = (range[1] - range[0]) / widthInPixels;
        var buffer = 30 * scale;

        // Initiate the graphie without actually drawing anything
        var left = range[0] - buffer, right = range[1] + buffer;
        var bottom = -1, top = 1 + (options.isTickCtrl ? 1 : 0);
        graphie.init({
            range: [[left, right], [bottom, top]],
            scale: [1 / scale, 40]
        });

        // Draw the number line
        var center = (range[0] + range[1]) / 2;
        graphie.line([center, 0], [right, 0], {arrows: "->"});
        graphie.line([center, 0], [left, 0], {arrows: "->"});
    },

    toJSON: function() {
        return {
            numLinePosition: this.props.numLinePosition,
            rel: this.props.isInequality ? this.props.rel : "eq"
        };
    },

    simpleValidate: function(rubric) {
        return NumberLine.validate(this.toJSON(), rubric);
    },

    focus: $.noop,

    statics: {
        displayMode: "block"
    }
});


_.extend(NumberLine, {
    validate: function(state, rubric) {
        var range = rubric.range;
        var start = rubric.initialX != null ? rubric.initialX : range[0];
        var startRel = rubric.isInequality ? "ge" : "eq";
        var correctRel = rubric.correctRel || "eq";

        if (knumber.equal(state.numLinePosition, rubric.correctX || 0) &&
                correctRel === state.rel) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (state.numLinePosition === start && state.rel === startRel) {
            // We're where we started.
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});


var NumberLineEditor = React.createClass({displayName: 'NumberLineEditor',
    getDefaultProps: function() {
        return {
            range: [0, 10],
            labelRange: [null, null],
            divisionRange: [1, 10],
            labelStyle: "decimal",
            labelTicks: true,
            numDivisions: 5,
            tickStep: null,
            snapDivisions: 2,
            correctRel: "eq",
            correctX: null,
            initialX: null
        };
    },

    mixins: [JsonifyProps],

    render: function() {
        var range = this.props.range;
        var labelRange = this.props.labelRange;
        var divisionRange = this.props.divisionRange;

        range[0] = +range[0]; range[1] = +range[1];

        var width = range[1] - range[0];
        var numDivisions = this.props.numDivisions;
        var snapDivisions = this.props.snapDivisions;
        var tickStep = this.props.tickStep;
        var isTickCtrl = this.props.isTickCtrl;

        if (!isTickCtrl) {
            // this will help constrain the answer to what is reachable
            step = tickStep ? tickStep / snapDivisions :
                  (width / numDivisions) / snapDivisions;
        } else {
            // but if tickCtrl is on, the range of what is reachable is
            // rather large, and it becomes obnoxious to check for this
            step = null;
        }

        var labelStyleEditorButtons = [
              {value: "decimal", text: "0.75", title: "Decimals",},
              {value: "improper", text: "\u2077\u2044\u2084",
                title: "Improper fractions"},
              {value: "mixed", text: "1\u00BE",
                title: "Mixed numbers"},
              {value: "non-reduced", text: "\u2078\u2044\u2084",
                title: "Non-reduced"}];

        return React.DOM.div( {className:"perseus-widget-number-line-editor"}, 
            React.DOM.div( {className:"perseus-widget-row"}, 
                React.DOM.label(null, "correct x"),
                React.DOM.select( {value:this.props.correctRel,
                  onChange:this.onChangeRelation}, 
                    React.DOM.option( {value:"eq"},  " = " ),
                    React.DOM.option( {value:"lt"},  " < " ),
                    React.DOM.option( {value:"gt"},  " > " ),
                    React.DOM.option( {value:"le"},  " ≤ " ),
                    React.DOM.option( {value:"ge"},  " ≥ " )
                ),
                NumberInput( {value:this.props.correctX,
                    format:this.props.labelStyle,
                    onChange:this.onNumChange.bind(this, "correctX"),
                    checkValidity:function(val) 
                        {return val >= range[0] && val <= range[1] &&
                        (!step || Math.abs(val - range[0]) % step === 0);},
                    placeholder:"answer", size:"normal",
                    useArrowKeys:true} ),
                InfoTip(null, React.DOM.p(null, 
                    "This is the correct answer. The answer is validated"+' '+
                    "(as right or wrong) by using only the end position of the"+' '+
                    "point and the relation (=, <, >, ≤, ≥)"
                ))
            ),

            React.DOM.div( {className:"perseus-widget-row"}, 
                NumberInput( {label:"position",
                    value:this.props.initialX,
                    format:this.props.labelStyle,
                    onChange:this.onNumChange.bind(this, "initialX"),
                    placeholder:range[0],
                    checkValidity:function(val)  {return val >= range[0] && val <= range[1];},
                    useArrowKeys:true} ),
                React.DOM.span(null,  " ∈ ", ' ', " " ),
                RangeInput( {value:range,
                    onChange:this.onRangeChange,
                    format:this.props.labelStyle,
                    useArrowKeys:true} ),
                InfoTip(null, React.DOM.p(null, 
                    "This controls the initial position of the point along the"+' '+
                    "number line and the ", React.DOM.strong(null, "range"),", the position"+' '+
                    "of the endpoints of the number line. Setting the range"+' '+
                    "constrains the position of the answer and the labels."
                ))
            ),
            React.DOM.div( {className:"perseus-widget-row"}, 
                React.DOM.div( {className:"perseus-widget-left-col"}, 
                    React.DOM.span(null, "labels " ),
                    NumberInput(
                        {value:labelRange[0], placeholder:range[0],
                        format:this.props.labelStyle,
                        checkValidity:function(val) 
                            {return val >= range[0] && val <= range[1];},
                        onChange:this.onLabelRangeChange.bind(this, 0),
                        useArrowKeys:true} ),
                    React.DOM.span(null,  " & " ),
                    NumberInput(
                        {value:labelRange[1], placeholder:range[1],
                        format:this.props.labelStyle,
                        checkValidity:function(val) 
                            {return val >= range[0] && val <= range[1];},
                        onChange:this.onLabelRangeChange.bind(this, 1),
                        useArrowKeys:true} ),
                    InfoTip(null, React.DOM.p(null, 
                        "This controls the position of the left / right labels."+' '+
                        "By default, the labels are set by the range ", React.DOM.br(null ),
                        React.DOM.strong(null, "Note:"), " Ensure that the labels line up"+' '+
                        "with the tick marks, or it may be confusing for users."
                    ))
                )
            ),
            React.DOM.div( {className:"perseus-widget-row"}, 
                React.DOM.div( {className:"perseus-widget-left-col"}, 
                    React.DOM.label(null, "style"),
                    ButtonGroup( {allowEmpty:false,
                        value:this.props.labelStyle,
                        buttons:labelStyleEditorButtons,
                        onChange:this.onLabelStyleChange} ),
                    InfoTip(null, React.DOM.p(null, 
                        "This controls the styling of the labels for the two"+' '+
                        "main labels as well as all the tick mark labels,"+' '+
                        "if applicable. Your choices are decimal,"+' '+
                        "improper fractions, mixed fractions, and non-reduced"+' '+
                        "fractions."
                    ))
                )
            ),
            React.DOM.div( {className:"perseus-widget-row"}, 
                React.DOM.div( {className:"perseus-widget-left-col"}, 
                    PropCheckBox( {label:"show tick controller",
                        isTickCtrl:this.props.isTickCtrl,
                        onChange:this.props.onChange} )
                ),
                React.DOM.div( {className:"perseus-widget-right-col"}, 
                    PropCheckBox( {label:"show label ticks",
                        labelTicks:this.props.labelTicks,
                        onChange:this.props.onChange} )
                )
            ),
            React.DOM.div( {className:"perseus-widget-row"}, 
                NumberInput( {label:"num divisions",
                    value:this.props.numDivisions || null,
                    format:"decimal",
                    onChange:this.onNumDivisionsChange,
                    checkValidity:function(val) 
                        {return val >= divisionRange[0] && val <= divisionRange[1];},
                    placeholder:width / this.props.tickStep,
                    useArrowKeys:true} ),
                isTickCtrl && React.DOM.span(null,  " ∈ ", ' ',
                    RangeInput( {value:divisionRange,
                        format:this.props.labelStyle,
                        checkValidity:function(val)  {return val[0] >= 1 && val[1] > val[0];},
                        enforceInequality:true,
                        onChange:this.onDivisionRangeChange,
                        useArrowKeys:true} ),
                    InfoTip(null, React.DOM.p(null, 
                    "This controls the number (and position) of the tick marks."+' '+
                    "The range dictates the minimum and maximum number of ticks"+' '+
                    "that the user can make using the tick controller. ", React.DOM.br(null ),
                    React.DOM.strong(null, "Note:"), " There is no check to see if labels"+' '+
                    "coordinate with the tick marks, which may be confusing for"+' '+
                    "users if the blue labels and black ticks are off-step."
                    ))),
                !isTickCtrl && React.DOM.span(null, 
                    NumberInput( {label: " or tick step",
                        value:this.props.tickStep || null,
                        format:this.props.labelStyle,
                        onChange:this.onTickStepChange,
                        checkValidity:function(val)  {return val > 0 && val <= width;},
                        placeholder:width / this.props.numDivisions,
                        useArrowKeys:true} ),
                    InfoTip(null, React.DOM.p(null, 
                    "This controls the number (and position) of the tick marks;"+' '+
                    "you can either set the number of divisions (2 divisions"+' '+
                    "would split the entire range in two halves), or the"+' '+
                    "tick step (the distance between ticks) and the other"+' '+
                    "value will be updated accordingly. ", React.DOM.br(null ),
                    React.DOM.strong(null, "Note:"), " There is no check to see if labels"+' '+
                    "coordinate with the tick marks, which may be confusing for"+' '+
                    "users if the blue labels and black ticks are off-step."
                    )))
            ),
            React.DOM.div( {className:"perseus-widget-row"}, 
                NumberInput( {label:"snap increments per tick",
                    value:snapDivisions,
                    checkValidity:function(val)  {return val > 0;},
                    format:this.props.labelStyle,
                    onChange:this.onNumChange.bind(this, "snapDivisions"),
                    useArrowKeys:true} ),
                InfoTip(null, React.DOM.p(null, 
                    "This determines the number of different places the point"+' '+
                    "will snap between two adjacent tick marks. ", React.DOM.br(null ),
                    React.DOM.strong(null, "Note:"),"Ensure the required number of"+' '+
                    "snap increments is provided to answer the question."
                ))
            )

        );
    },

    onRangeChange: function(range) {
        // Changing the range constrains the initial position, as well as the
        // position of the answer and labels. Atm, it just marks them as
        // invalid and prevents the number line from showing; it was annoying
        // to change it for them, because if they're typing in fractions,
        // it registers one-at-a-time and messes things up.
        this.props.onChange({range: range});
    },

    onLabelRangeChange: function(i, num) {
        var range = this.props.range.slice(),
            labelRange = this.props.labelRange.slice(),
            otherNum = labelRange[1-i];

        if (num == null || otherNum == null) {
            labelRange[i] = num;
        } else {
            // If both labels have values, this updates the "appropriate" one.
            // It enforces that the position of the left label <= right label.
            // If left otherwise, it makes certain aspects of validation hard.
            labelRange = [Math.min(num, otherNum), Math.max(num, otherNum)];
        }

        this.props.onChange({labelRange: labelRange});
    },

    onDivisionRangeChange: function(divisionRange) {
        var numDivisions = this.props.numDivisions;
        numDivisions = bound(numDivisions, divisionRange[0], divisionRange[1]);
        this.props.onChange({
            divisionRange: divisionRange,
            numDivisions: numDivisions});
    },

    onNumChange: function(key, value) {
        var opts = {};
        opts[key] = value;
        this.props.onChange(opts);
    },

    onNumDivisionsChange: function(numDivisions) {
        var divRange = this.props.divisionRange.slice();

        if (!_.isFinite(numDivisions)) {
            numDivisions = null;
        }

        // Auto-updates (constrains) the numDivisions to be within the range
        // of appliable divisions (more important for when the tick controller
        // isn't shown and otherwise shows as invalid for no apparent reason)
        divRange[0] = Math.max(1, Math.min(divRange[0], numDivisions));
        divRange[1] = Math.max(divRange[1], numDivisions);

        this.props.onChange({
            tickStep: null,
            divisionRange: divRange,
            numDivisions: numDivisions,
        });
    },

    onTickStepChange: function(tickStep) {
        this.props.onChange({
            numDivisions: null,
            tickStep: tickStep,
        });
    },

    onChangeRelation: function(e) {
        value = e.target.value;
        this.props.onChange({
            correctRel: value,
            isInequality: value !== "eq",
        });
    },

    onLabelStyleChange: function(labelStyle) {
        this.props.onChange({
            labelStyle: labelStyle
        });
    }
});

var NumberLineTransform = function(editorProps)  {
    var props = _.pick(editorProps, [
        "range",

        "labelRange",
        "labelStyle",
        "labelTicks",

        "divisionRange",
        "snapDivisions",

        "isTickCtrl",
        "isInequality"
    ]);

    var numLinePosition = (editorProps.initialX != null) ?
            editorProps.initialX :
            editorProps.range[0];

    var width = editorProps.range[1] - editorProps.range[0];

    var numDivisions;
    if (editorProps.numDivisions != null) {
        numDivisions = editorProps.numDivisions;
    } else if (editorProps.tickStep != null) {
        numDivisions = width / editorProps.tickStep;
    } else {
        numDivisions = undefined; // send to getDefaultProps()
    }

    _.extend(props, {
        numLinePosition: numLinePosition,
        numDivisions: numDivisions
    });

    return props;
};

module.exports = {
    name: "number-line",
    displayName: "Number line",
    widget: NumberLine,
    editor: NumberLineEditor,
    transform: NumberLineTransform,
    hidden: true
};

},{"../components/graphie.jsx":125,"../components/number-input.jsx":129,"../components/prop-check-box.jsx":130,"../components/range-input.jsx":131,"../interactive2.js":148,"../interactive2/interactive-util.js":149,"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"../util.js":168,"react":115,"react-components/button-group":3,"react-components/info-tip":5}],186:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var JsonifyProps = require("../mixins/jsonify-props.jsx");

var InfoTip = require("react-components/info-tip");
var PropCheckBox = require("../components/prop-check-box.jsx");
var NumberInput = require("../components/number-input.jsx");
var ButtonGroup = require("react-components/button-group");
var MultiButtonGroup = require("../components/multi-button-group.jsx");
var InputWithExamples = require("../components/input-with-examples.jsx");

var Editor = require("../editor.jsx");

var firstNumericalParse = require("../util.js").firstNumericalParse;

var answerFormButtons = [
    {title: "Integers", value: "integer", text: "6"},
    {title: "Decimals", value: "decimal", text: "0.75"},
    {title: "Proper fractions", value: "proper", text: "\u2157"},
    {title: "Improper fractions", value: "improper",
        text: "\u2077\u2044\u2084"},
    {title: "Mixed numbers", value: "mixed", text: "1\u00BE"},
    {title: "Numbers with \u03C0", value: "pi", text: "\u03C0"}
];

var formExamples = {
    "integer": function(options)  {return $._("an integer, like $6$");},
    "proper": function(options)  {return options.simplify === "optional" ?
        $._("a *proper* fraction, like $1/2$ or $6/10$") :
        $._("a *simplified proper* fraction, like $3/5$");},
    "improper": function(options)  {return options.simplify === "optional" ?
        $._("an *improper* fraction, like $10/7$ or $14/8$") :
        $._("a *simplified improper* fraction, like $7/4$");},
    "mixed": function()  {return $._("a mixed number, like $1\\ 3/4$");},
    "decimal": function()  {return $._("an *exact* decimal, like $0.75$");},
    "pi": function()  {return $._("a multiple of pi, like $12\\ \\text{pi}$ or " +
                "$2/3\\ \\text{pi}$");}
};

var NumericInput = React.createClass({displayName: 'NumericInput',
    propTypes: {
        currentValue: React.PropTypes.string
    },

    getDefaultProps: function() {
        return {
            currentValue: "",
            size: "normal"
        };
    },

    render: function() {
        return InputWithExamples(
                {ref:"input",
                value:this.props.currentValue,
                onChange:this.handleChange,
                className:"perseus-input-size-" + this.props.size,
                examples:this.examples(),
                shouldShowExamples:this.shouldShowExamples()} );
    },

    handleChange: function(newValue) {
        this.props.onChange({ currentValue: newValue });
    },

    focus: function() {
        this.refs.input.focus();
        return true;
    },

    toJSON: function(skipValidation) {
        return {currentValue: this.props.currentValue};
    },

    simpleValidate: function(rubric) {
        return NumericInput.validate(this.toJSON(), rubric);
    },

    shouldShowExamples: function() {
        var noFormsAccepted = this.props.answerForms.length === 0;
        var allFormsAccepted = this.props.answerForms.length >=
                _.size(formExamples);
        return this.props.enabledFeatures.toolTipFormats &&
                !noFormsAccepted && !allFormsAccepted;
    },

    examples: function() {
        // if the set of specified forms are empty, allow all forms
        var forms = this.props.answerForms.length !== 0 ?
                this.props.answerForms : _.keys(formExamples);
        return _.map(forms, function(form)  {
            return formExamples[form](this.props);
        }.bind(this));
    },

    statics: {
        displayMode: "inline-block"
    }
});

_.extend(NumericInput, {
    validate: function(state, rubric) {
        var allAnswerForms = _.pluck(answerFormButtons, "value");

        var createValidator = function(answer) 
            {return Khan.answerTypes.number.createValidatorFunctional(
                answer.value, {
                    message: answer.message,
                    simplify: answer.status === "correct" ?
                        answer.simplify : "optional",
                    inexact: true, // TODO(merlob) backfill / delete
                    maxError: answer.maxError,
                    forms: (answer.strict && answer.answerForms.length !== 0) ?
                            answer.answerForms : allAnswerForms
            });};

        // Look through all correct answers for one that matches either
        // precisely or approximately and return the appropriate message:
        // - if precise, return the message that the answer came with
        // - if it needs to be simplified, etc., show that message
        var correctAnswers = _.where(rubric.answers, {status: "correct"});
        var result = _.find(_.map(correctAnswers, function(answer)  {
            var validate = createValidator(answer);
            return validate(state.currentValue);
        }), function(match)  {return match.correct || match.empty;});

        if (!result) { // Otherwise, if the guess is not correct
            var otherAnswers = ([]).concat(
                _.where(rubric.answers, {status: "ungraded"}),
                _.where(rubric.answers, {status: "wrong"})
            );

            // Look through all other answers and if one matches either
            // precisely or approximately return the answer's message
            match = _.find(otherAnswers, function(answer)  {
                 var validate = createValidator(answer);
                 return validate(state.currentValue).correct;
             });
            result = {
                empty: match ? match.status === "ungraded" : false,
                correct: match ? match.status === "correct" : false,
                message: match ? match.message : null,
                guess: state.currentValue
            };
        }

        // TODO(eater): Seems silly to translate result to this invalid/points
        // thing and immediately translate it back in ItemRenderer.scoreInput()
        if (result.empty) {
            return {
                type: "invalid",
                message: result.message
            };
        } else {
            return {
                type: "points",
                earned: result.correct ? 1 : 0,
                total: 1,
                message: result.message
            };
        }
    }
});

var initAnswer = function(status)  {
    return {
        value: null,
        status: status,
        message: "",
        simplify: "required",
        answerForms: [],
        strict: false,
        maxError: null
    };
};

var NumericInputEditor = React.createClass({displayName: 'NumericInputEditor',
    mixins: [JsonifyProps, Changeable],

    getDefaultProps: function() {
        return {
            answers: [initAnswer("correct")],
            size: "normal"
        };
    },

    getInitialState: function() {
        return {
            lastStatus: "wrong",
            showOptions: _.map(this.props.answers, function()  {return false;})
        };
    },

    render: function() {
        var lastStatus = this.state.lastStatus; // for a phantom last answer
        var answers = this.props.answers.concat(initAnswer(lastStatus));

        var unsimplifiedAnswers = function(i)  {return React.DOM.div( {className:"perseus-widget-row"}, 
            React.DOM.label(null, "Unsimplified answers are"),
            ButtonGroup( {value:answers[i]["simplify"],
                         allowEmpty:false,
                         buttons:[
                            {value: "required", text: "ungraded"},
                            {value: "optional", text: "accepted"},
                            {value: "enforced", text: "wrong"}],
                         onChange:this.updateAnswer(i, "simplify")} ),
            InfoTip(null, 
                React.DOM.p(null, "Normally select \"ungraded\". This will give the"+' '+
                "user a message saying the answer is correct but not"+' '+
                "simplified. The user will then have to simplify it and"+' '+
                "re-enter, but will not be penalized. (5th grade and after)"),
                React.DOM.p(null, "Select \"accepted\" only if the user is not"+' '+
                "expected to know how to simplify fractions yet. (Anything"+' '+
                "prior to 5th grade)"),
                React.DOM.p(null, "Select \"wrong\" ", React.DOM.em(null, "only"), " if we are"+' '+
                "specifically assessing the ability to simplify.")
            )
        );}.bind(this);

        var suggestedAnswerTypes = function(i)  {return React.DOM.div(null, 
            React.DOM.div( {className:"perseus-widget-row"}, 
                React.DOM.label(null, "Choose the suggested answer formats"),
                MultiButtonGroup( {buttons:answerFormButtons,
                    values:answers[i]["answerForms"],
                    onChange:this.updateAnswer(i, "answerForms")} ),
                InfoTip(null, 
                    React.DOM.p(null, "Formats will be autoselected for you based on the"+' '+
                        "given answer; to show no suggested formats and"+' '+
                        "accept all types, simply have a decimal/integer be"+' '+
                        "the answer. Values with π will have format \"pi\","+' '+
                        "and values that are fractions will have some subset"+' '+
                        "(mixed will be \"mixed\" and \"proper\"; improper/proper"+' '+
                        "will both be \"improper\" and \"proper\"). If you would"+' '+
                        "like to specify that it is only a proper fraction"+' '+
                        "(or only a mixed/improper fraction), deselect the"+' '+
                        "other format. Except for specific cases, you should"+' '+
                        "not need to change the autoselected formats."),
                    React.DOM.p(null, "To restrict the answer to ", React.DOM.em(null, "only"), " an improper"+' '+
                        "fraction (i.e. 7/4), select the"+' '+
                        "improper fraction and toggle \"strict\" to true."+' '+
                        "This ", React.DOM.b(null, "will not"), " accept 1.75 as an answer. " ),
                    React.DOM.p(null, "Unless you are testing that specific skill, please"+' '+
                        "do not restrict the answer format.")
                )
            ),
            React.DOM.div( {className:"perseus-widget-row"}, 
                PropCheckBox( {label:"Strictly match only these formats",
                    strict:answers[i]["strict"],
                    onChange:this.updateAnswer.bind(this, i)} )
            )
        );}.bind(this);

        var maxError = function(i)  {return React.DOM.div( {className:"perseus-widget-row"}, 
            NumberInput( {label:"Max error",
                className:"max-error",
                value:answers[i]["maxError"],
                onChange:this.updateAnswer(i, "maxError"),
                placeholder:"0"} )
        );}.bind(this);


        var inputSize = React.DOM.div(null, 
                React.DOM.label(null, "Width:",' ', " " ),
                ButtonGroup( {value:this.props.size, allowEmpty:false,
                    buttons:[
                        {value: "normal", text: "Normal (80px)"},
                        {value: "small", text: "Small (40px)"}],
                    onChange:this.change("size")} ),
                InfoTip(null, 
                    React.DOM.p(null, "Use size \"Normal\" for all text boxes, unless there are"+' '+
                    "multiple text boxes in one line and the answer area is too"+' '+
                    "narrow to fit them.")
                )
            );

        var instructions = {
            "wrong":    "(address the mistake/misconception)",
            "ungraded": "(explain in detail to avoid confusion)",
            "correct":  "(reinforce the user's understanding)"
        };

        var generateInputAnswerEditors = function()  {return answers.map(function(answer, i)  {
            var editor = Editor({
                content: answer.message || "",
                placeholder: "Why is this answer " + answer.status + "?\t" +
                    instructions[answer.status],
                widgetEnabled: false,
                onChange: function(newProps)  {
                    if ("content" in newProps) {
                        this.updateAnswer(i, {message: newProps.content});
                    }
                }.bind(this)
            });
            return React.DOM.div( {className:"perseus-widget-row", key:i}, 
                React.DOM.div( {className:"input-answer-editor-value-container" +
                    (answer.maxError ? " with-max-error" : "")}, 
                    NumberInput( {value:answer.value,
                        className:"numeric-input-value",
                        placeholder:"answer",
                        format:_.last(answer.answerForms),
                        onFormatChange:function(newValue, format)  {
                            var forms;
                            if (format === "pi") {
                                forms = ["pi"];
                            } else if (format === "mixed") {
                                forms = ["proper", "mixed"];
                            } else if (format === "proper" ||
                                       format === "improper") {
                                forms = ["proper", "improper"];
                            }
                            this.updateAnswer(i, {
                                value: firstNumericalParse(newValue),
                                answerForms: forms
                            });
                        }.bind(this),
                        onChange:function(newValue)  {
                            this.updateAnswer(i, {
                                value: firstNumericalParse(newValue)});
                        }.bind(this)} ),
                    answer.strict && React.DOM.div( {className:"is-strict-indicator",
                        title:"strictly equivalent to"}, "≡"),
                    answer.simplify !== "required" &&
                     answer.status === "correct" &&
                      React.DOM.div( {className:"simplify-indicator " + answer.simplify,
                        title:"accepts unsimplified answers"}, "‰"),
                    answer.maxError ? React.DOM.div( {className:"max-error-container"}, 
                        React.DOM.div( {className:"max-error-plusmn"}, "±"),
                        NumberInput( {placeholder:0,
                            value:answers[i]["maxError"],
                            format:_.last(answer.answerForms),
                            onChange:this.updateAnswer(i, "maxError")} )
                    ) : null,
                    React.DOM.div( {className:"value-divider"} ),
                    React.DOM.a( {href:"javascript:void(0)",
                      className:"answer-status " + answer.status,
                      onClick:this.onStatusChange.bind(this, i),
                      onKeyDown:function(e)  {if (e.key === " ") {
                        e.preventDefault(); // prevent page shifting
                        this.onStatusChange(i);
                      }}.bind(this)}, 
                        answer.status
                    ),
                    React.DOM.a( {href:"javascript:void(0)",
                       className:"options-toggle",
                       onClick:this.onToggleOptions.bind(this, i),
                       onKeyDown:function(e)  {if (e.key === " ") {
                        e.preventDefault(); // prevent page shifting
                        this.onToggleOptions(i);
                      }}.bind(this)}, 
                       React.DOM.i( {className:"icon-gear"} )
                    )
                ),
                React.DOM.div( {className:"input-answer-editor-message"}, editor),
                this.state.showOptions[i] &&
                    React.DOM.div( {className:"options-container"}, 
                        maxError(i),
                        answer.status === "correct" && unsimplifiedAnswers(i),
                        suggestedAnswerTypes(i)
                    )
            );
        }.bind(this));}.bind(this);

        return React.DOM.div( {className:"perseus-input-number-editor"}, 
            React.DOM.div( {className:"ui-title"}, "User input"),
            React.DOM.div( {className:"msg-title"}, "Message shown to user on attempt"),
            generateInputAnswerEditors(),
            inputSize
        );

    },

    onToggleOptions: function(choiceIndex) {
        var showOptions = this.state.showOptions.slice();
        showOptions[choiceIndex] = !showOptions[choiceIndex];
        this.setState({showOptions: showOptions});
    },

    onStatusChange: function(choiceIndex) {
        var statuses = ["wrong", "ungraded", "correct"];
        var lastAnswer = initAnswer(this.state.lastStatus);
        var answers = this.props.answers.concat(lastAnswer);
        var i = _.indexOf(statuses, answers[choiceIndex].status);
        var newStatus = statuses[(i + 1) % 3];

        // If we change the status of the new (phantom) answer
        if (choiceIndex === answers.length - 1) {
            this.setState({lastStatus: newStatus});
        } else {
            this.updateAnswer(choiceIndex, {
                status: newStatus,
                simplify: newStatus === "correct" ? "required" : "accepted"
            });
        }
    },

    updateAnswer: function(choiceIndex, update) {
        if (!_.isObject(update)) {
            return _.partial(function(choiceIndex, key, value)  {
                var update = {};
                update[key] = value;
                this.updateAnswer(choiceIndex, update);
            }.bind(this), choiceIndex, update);
        }
        var lastAnswer = initAnswer(this.state.lastStatus);
        var answers = this.props.answers.concat(lastAnswer);
        answers[choiceIndex] = _.extend({}, answers[choiceIndex], update);
        this.updateAllAnswers(answers);
    },

    updateAllAnswers: function(newAnswers) {
        // Filter out all the empty answers
        var answers = _.filter(newAnswers, function(c)  {
            return c.value != null || (c.message != null && c.message !== "");
        });

        var sortedAnswers = ([]).concat(
            _.where(answers, {status: "correct"}),
            _.where(answers, {status: "ungraded"}),
            _.where(answers, {status: "wrong"})
        );
        this.props.onChange({answers: sortedAnswers});
    }
});

var unionAnswerForms = function(answerFormsList) {
    var set = {};
    _.each(answerFormsList, function(answerForms)  {
        _.each(answerForms, function(form)  {
            set[form] = true;
        });
    });
    // Make sure to keep the order of forms in formExamples
    return _.filter(_.keys(formExamples), function(form)  {return set[form] === true;});
};

var propsTransform = function(editorProps) {
    var rendererProps = _.extend(
        _.omit(editorProps, "answers"),
        {
            answerForms: unionAnswerForms(
                _.pluck(editorProps.answers, "answerForms")
            )
        }
    );
    return rendererProps;
};

module.exports = {
    name: "numeric-input",
    displayName: "Number text box (new)",
    widget: NumericInput,
    editor: NumericInputEditor,
    transform: propsTransform,
    hidden: true
};

},{"../components/input-with-examples.jsx":126,"../components/multi-button-group.jsx":128,"../components/number-input.jsx":129,"../components/prop-check-box.jsx":130,"../editor.jsx":143,"../mixins/changeable.jsx":159,"../mixins/jsonify-props.jsx":160,"../util.js":168,"react":115,"react-components/button-group":3,"react-components/info-tip":5}],187:[function(require,module,exports){
/** @jsx React.DOM */

var React          = require('react');
var InfoTip        = require("react-components/info-tip");

var Util           = require("../util.js");
var Renderer       = require("../renderer.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var PlaceholderCard = React.createClass({displayName: 'PlaceholderCard',
    propTypes: {
        width: React.PropTypes.number.isRequired,
        height: React.PropTypes.number.isRequired
    },

    render: function() {
        return React.DOM.div( {className:"card-wrap", style:{width: this.props.width}}, 
            React.DOM.div(
                {className:"card placeholder",
                style:{height: this.props.height}} )
        );
    }
});

var DragHintCard = React.createClass({displayName: 'DragHintCard',
    render: function() {
        return React.DOM.div( {className:"card-wrap"}, 
            React.DOM.div( {className:"card drag-hint"} )
        );
    }
});

var PropTypes = {
    position: React.PropTypes.shape({
        left: React.PropTypes.number,
        top: React.PropTypes.number
    })
};

var Card = React.createClass({displayName: 'Card',
    propTypes: {
        floating: React.PropTypes.bool.isRequired,
        animating: React.PropTypes.bool,
        width: React.PropTypes.number,
        stack: React.PropTypes.bool,

        onMouseDown: React.PropTypes.func,
        onMouseMove: React.PropTypes.func,
        onMouseUp: React.PropTypes.func,

        // Used only for floating/animating cards
        startMouse: PropTypes.position,
        startOffset: PropTypes.position,
        animateTo: PropTypes.position,
        onAnimationEnd: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            stack: false,
            animating: false
        };
    },

    render: function() {
        var style = {};

        if (this.props.floating) {
            style = {
                position: "absolute",
                left: this.props.startOffset.left,
                top: this.props.startOffset.top,
            };
        }

        if (this.props.width) {
            style.width = this.props.width;
        }

        var className = ["card"];
        if (this.props.stack) {
            className.push("stack");
        }
        if (this.props.floating && !this.props.animating) {
            className.push("dragging");
            style.left += this.props.mouse.left - this.props.startMouse.left;
            style.top += this.props.mouse.top - this.props.startMouse.top;
        }

        // Pull out the content to get rendered
        var rendererProps = _.pick(this.props, "content");

        var onMouseDown = (this.props.animating) ? $.noop : this.onMouseDown;

        return React.DOM.div( {className:"card-wrap", style:style,
                    onMouseDown:onMouseDown,
                    onTouchStart:onMouseDown,
                    onTouchMove:this.onMouseMove,
                    onTouchEnd:this.onMouseUp,
                    onTouchCancel:this.onMouseUp}, 
                React.DOM.div( {className:className.join(" ")}, 
                    Renderer(rendererProps)
                )
            );
    },

    shouldComponentUpdate: function(nextProps, nextState) {
        // Cards in the bank or drag list don't usually change -- they only
        // reorder themselves -- so we want to skip the update to things a
        // little faster. We also need to re-render if the content changes,
        // which happens only in the editor. (We do want to update the floating
        // card on mouse move to update its position.)
        return this.props.floating || nextProps.floating ||
            this.props.content !== nextProps.content ||
            // TODO(alpert): Remove ref here after fixing facebook/react#1392.
            this.props.ref !== nextProps.ref;
    },

    componentDidMount: function() {
        this.mouseMoveUpBound = false;
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.props.animating && !prevProps.animating) {
            // If we just were changed into animating, start the animation.
            // We pick the animation speed based on the distance that the card
            // needs to travel. (Why sqrt? Just because it looks nice -- with a
            // linear scale, far things take too long to come back.)
            var ms = 15 * Math.sqrt(
                Math.sqrt(
                    Math.pow(this.props.animateTo.left -
                             this.props.startOffset.left, 2) +
                    Math.pow(this.props.animateTo.top -
                             this.props.startOffset.top, 2)
                )
            );
            $(this.getDOMNode()).animate(
                this.props.animateTo, Math.max(ms, 1),
                this.props.onAnimationEnd
            );
        }
    },

    componentWillUnmount: function() {
        // Event handlers should be unbound before component unmounting, but
        // just in case...
        if (this.mouseMoveUpBound) {
            console.warn("Removing an element with bound event handlers.");

            this.unbindMouseMoveUp();
            Util.resetTouchHandlers();
        }
    },

    bindMouseMoveUp: function() {
        this.mouseMoveUpBound = true;
        $(document).on("mousemove", this.onMouseMove);
        $(document).on("mouseup", this.onMouseUp);
    },

    unbindMouseMoveUp: function() {
        this.mouseMoveUpBound = false;
        $(document).off("mousemove", this.onMouseMove);
        $(document).off("mouseup", this.onMouseUp);
    },

    onMouseDown: function(event) {
        event.preventDefault();
        var loc = Util.extractPointerLocation(event);
        if (loc) {
            this.bindMouseMoveUp();
            this.props.onMouseDown && this.props.onMouseDown(loc, this);
        }
    },

    onMouseMove: function(event) {
        event.preventDefault();
        var loc = Util.extractPointerLocation(event);
        if (loc) {
            this.props.onMouseMove && this.props.onMouseMove(loc);
        }
    },

    onMouseUp: function(event) {
        event.preventDefault();
        var loc = Util.extractPointerLocation(event);
        if (loc) {
            this.unbindMouseMoveUp();
            this.props.onMouseUp && this.props.onMouseUp(loc);
        }
    }
});

var NORMAL = "normal",
    AUTO = "auto",
    HORIZONTAL = "horizontal",
    VERTICAL = "vertical";

var Orderer = React.createClass({displayName: 'Orderer',
    propTypes: {
        current: React.PropTypes.array,
        options: React.PropTypes.array,
        correctOptions: React.PropTypes.array,
        height: React.PropTypes.oneOf([NORMAL, AUTO]),
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL])
    },

    getDefaultProps: function() {
        return {
            current: [],
            options: [],
            correctOptions: [],
            height: NORMAL,
            layout: HORIZONTAL
        };
    },

    getInitialState: function() {
        return {
            current: [],
            dragging: false,
            placeholderIndex: null,
        };
    },

    componentWillReceiveProps: function(nextProps) {
        if (!_.isEqual(this.props.current, nextProps.current)) {
            this.setState({current: nextProps.current});
        }
    },

    render: function() {
        // This is the card we are currently dragging
        var dragging = this.state.dragging &&
            Card( {ref:"dragging",
                       floating:true,
                       content:this.state.dragContent,
                       startOffset:this.state.offsetPos,
                       startMouse:this.state.grabPos,
                       mouse:this.state.mousePos,
                       width:this.state.dragWidth,
                       onMouseUp:this.onRelease,
                       onMouseMove:this.onMouseMove,
                       key:this.state.dragKey || "draggingCard"}
                       );

        // This is the card that is currently animating
        var animating = this.state.animating &&
            Card( {floating:true,
                       animating:true,
                       content:this.state.dragContent,
                       startOffset:this.state.offsetPos,
                       width:this.state.dragWidth,
                       animateTo:this.state.animateTo,
                       onAnimationEnd:this.state.onAnimationEnd,
                       key:this.state.dragKey || "draggingCard"}
                       );

        // This is the list of draggable, rearrangable cards
        var sortableCards = _.map(this.state.current, function(opt, i) {
            return Card(
                {ref:"sortable" + i,
                floating:false,
                content:opt.content,
                width:opt.width,
                key:opt.key,
                onMouseDown:(this.state.animating) ?
                    $.noop :
                    this.onClick.bind(null, "current", i)} );
        }, this);

        if (this.state.placeholderIndex != null) {
            var placeholder = PlaceholderCard(
                {ref:"placeholder",
                width:this.state.dragWidth,
                height:this.state.dragHeight,
                key:"placeholder"} );
            sortableCards.splice(this.state.placeholderIndex, 0, placeholder);
        }

        var anySortableCards = sortableCards.length > 0;
        sortableCards.push(dragging, animating);

        // If there are no cards in the list, then add a "hint" card
        var sortable = React.DOM.div( {className:"ui-helper-clearfix draggable-box"}, 
            !anySortableCards && DragHintCard(null ),
            React.DOM.div( {ref:"dragList"}, sortableCards)
        );

        // This is the bank of stacks of cards
        var bank = React.DOM.div( {ref:"bank", className:"bank ui-helper-clearfix"}, 
            _.map(this.props.options, function(opt, i)  {
                return Card(
                    {ref:"bank" + i,
                    floating:false,
                    content:opt.content,
                    stack:true,
                    key:i,
                    onMouseDown:(this.state.animating) ?
                        $.noop :
                        this.onClick.bind(null, "bank", i),
                    onMouseMove:this.onMouseMove,
                    onMouseUp:this.onRelease} );
            }.bind(this), this)
        );

        return React.DOM.div( {className:"draggy-boxy-thing orderer " +
                        "height-" + this.props.height + " " +
                        "layout-" + this.props.layout + " " +
                        "above-scratchpad blank-background " +
                        "ui-helper-clearfix",
                    ref:"orderer"}, 
                   bank,
                   sortable
               );
    },

    onClick: function(type, index, loc, draggable) {
        var $draggable = $(draggable.getDOMNode());
        var list = this.state.current.slice();

        var opt;
        var placeholderIndex = null;

        if (type === "current") {
            // If this is coming from the original list, remove the original
            // card from the list
            list.splice(index, 1);
            opt = this.state.current[index];
            placeholderIndex = index;
        } else if (type === "bank") {
            opt = this.props.options[index];
        }

        this.setState({
            current: list,
            dragging: true,
            placeholderIndex: placeholderIndex,
            dragKey: opt.key,
            dragContent: opt.content,
            dragWidth: $draggable.width(),
            dragHeight: $draggable.height(),
            grabPos: loc,
            mousePos: loc,
            offsetPos: $draggable.position()
        });
    },

    onRelease: function(loc) {
        var draggable = this.refs.dragging;
        if (draggable == null) {
            return;
        }
        var inCardBank = this.isCardInBank(draggable);
        var index = this.state.placeholderIndex;

        // Here, we build a callback function for the card to call when it is
        // done animating
        var onAnimationEnd = function()  {
            var list = this.state.current.slice();

            if (!inCardBank) {
                // Insert the new card into the position
                var newCard = {
                    content: this.state.dragContent,
                    key: _.uniqueId("perseus_draggable_card_"),
                    width: this.state.dragWidth
                };

                list.splice(index, 0, newCard);
            }

            this.props.onChange({
                current: list
            });
            this.setState({
                current: list,
                dragging: false,
                placeholderIndex: null,
                animating: false
            });
        }.bind(this);

        // Find the position of the card we should animate to
        // TODO(alpert): Update mouse position once more before animating?
        var offset = $(draggable.getDOMNode()).position();
        var finalOffset = null;
        if (inCardBank) {
            // If we're in the card bank, go through the options to find the
            // one with the same content
            _.each(this.props.options, function(opt, i) {
                if (opt.content === this.state.dragContent) {
                    var card = this.refs["bank" + i].getDOMNode();
                    finalOffset = $(card).position();
                }
            }, this);
        } else {
            // Otherwise, go to the position that the placeholder is at
            finalOffset = $(this.refs.placeholder.getDOMNode()).position();
        }

        if (finalOffset == null) {
            // If we didn't find a card to go to, simply make the changes we
            // would have made at the end. (should only happen if we are
            // messing around with card contents, and not on the real site)
            onAnimationEnd();
        } else {
            this.setState({
                offsetPos: offset,
                animateTo: finalOffset,
                onAnimationEnd: onAnimationEnd,
                animating: true,
                dragging: false
            });
        }
    },

    onMouseMove: function(loc) {
        var draggable = this.refs.dragging;
        if (draggable == null) {
            return;
        }

        var index;
        if (this.isCardInBank(draggable)) {
            index = null;
        } else {
            index = this.findCorrectIndex(draggable, this.state.current);
        }

        this.setState({
            mousePos: loc,
            placeholderIndex: index
        });
    },

    findCorrectIndex: function(draggable, list) {
        // Find the correct index for a card given the current cards.
        var isHorizontal = this.props.layout === HORIZONTAL,
            $dragList = $(this.refs.dragList.getDOMNode()),
            leftEdge = $dragList.offset().left,
            topEdge = $dragList.offset().top,
            midWidth = $(draggable.getDOMNode()).offset().left - leftEdge,
            midHeight = $(draggable.getDOMNode()).offset().top - topEdge,
            index = 0,
            sumWidth = 0,
            sumHeight = 0;

        if (isHorizontal) {
            _.each(list, function(opt, i) {
                var card = this.refs["sortable" + i].getDOMNode();
                var outerWidth = $(card).outerWidth(true);
                if (midWidth > sumWidth + outerWidth / 2) {
                    index += 1;
                }
                sumWidth += outerWidth;
            }, this);
        } else {
            _.each(list, function(opt, i) {
                var card = this.refs["sortable" + i].getDOMNode();
                var outerHeight = $(card).outerHeight(true);
                if (midHeight > sumHeight + outerHeight / 2) {
                    index += 1;
                }
                sumHeight += outerHeight;
            }, this);
        }

        return index;
    },

    isCardInBank: function(draggable) {
        if (draggable == null) {
            return false;
        }

        var isHorizontal = this.props.layout === HORIZONTAL,
            $draggable = $(draggable.getDOMNode()),
            $bank = $(this.refs.bank.getDOMNode()),
            draggableOffset = $draggable.offset(),
            bankOffset = $bank.offset(),
            draggableHeight = $draggable.outerHeight(true),
            bankHeight = $bank.outerHeight(true),
            bankWidth = $bank.outerWidth(true),
            dragList = this.refs.dragList.getDOMNode(),
            dragListWidth = $(dragList).width(),
            draggableWidth = $draggable.outerWidth(true);

        if (isHorizontal) {
            return (draggableOffset.top + draggableHeight / 2 <
                    bankOffset.top + bankHeight);
        } else {
            return (draggableOffset.left + draggableWidth / 2 <
                    bankOffset.left + bankWidth);
        }
    },

    toJSON: function(skipValidation) {
        return {current: _.map(this.props.current, function(v) {
            return v.content;
        })};
    },

    simpleValidate: function(rubric) {
        return Orderer.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Orderer, {
    validate: function(state, rubric) {
        if (state.current.length === 0) {
            return {
                type: "invalid",
                message: null
            };
        }

        var correct = _.isEqual(
            state.current,
            _.pluck(rubric.correctOptions, 'content')
        );

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null
        };
    }
});


var OrdererEditor = React.createClass({displayName: 'OrdererEditor',
    propTypes: {
        correctOptions: React.PropTypes.array,
        otherOptions: React.PropTypes.array,
        height: React.PropTypes.oneOf([NORMAL, AUTO]),
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        onChange: React.PropTypes.func.isRequired
    },

    getDefaultProps: function() {
        return {
            correctOptions: [
                {content: "$x$"}
            ],
            otherOptions: [
                {content: "$y$"}
            ],
            height: NORMAL,
            layout: HORIZONTAL
        };
    },

    render: function() {
        var editor = this;

        return React.DOM.div( {className:"perseus-widget-orderer"}, 
            React.DOM.div(null, 
                ' ',"Correct answer:",' ',
                InfoTip(null, React.DOM.p(null, 
                    "Place the cards in the correct order. The same card can be"+' '+
                    "used more than once in the answer but will only be"+' '+
                    "displayed once at the top of a stack of identical cards."
                ))
            ),
            TextListEditor(
                {options:_.pluck(this.props.correctOptions, "content"),
                onChange:this.onOptionsChange.bind(this, "correctOptions"),
                layout:this.props.layout} ),

            React.DOM.div(null, 
                ' ',"Other cards:",' ',
                InfoTip(null, 
                    React.DOM.p(null, "Create cards that are not part of the answer.")
                )
            ),
            TextListEditor(
                {options:_.pluck(this.props.otherOptions, "content"),
                onChange:this.onOptionsChange.bind(this, "otherOptions"),
                layout:this.props.layout} ),

            React.DOM.div(null, 
                React.DOM.label(null, 
                    ' ',"Layout:",' ',
                    React.DOM.select( {value:this.props.layout,
                            onChange:this.onLayoutChange}, 
                        React.DOM.option( {value:HORIZONTAL}, "Horizontal"),
                        React.DOM.option( {value:VERTICAL}, "Vertical")
                    )
                ),
                InfoTip(null, 
                    React.DOM.p(null, "Use the horizontal layout for short text and small"+' '+
                    "images. The vertical layout is best for longer text (e.g."+' '+
                    "proofs).")
                )
            ),
            React.DOM.div(null, 
                React.DOM.label(null, 
                    ' ',"Height:",' ',
                    React.DOM.select( {value:this.props.height,
                            onChange:this.onHeightChange}, 
                        React.DOM.option( {value:NORMAL}, "Normal"),
                        React.DOM.option( {value:AUTO}, "Automatic")
                    )
                ),
                InfoTip(null, 
                    React.DOM.p(null, "Use \"Normal\" for text, \"Automatic\" for images.")
                )
            )
        );
    },

    onOptionsChange: function(whichOptions, options, cb) {
        var props = {};
        props[whichOptions] = _.map(options, function(option) {
            return {content: option};
        });
        this.props.onChange(props, cb);
    },

    onLayoutChange: function(e) {
        this.props.onChange({layout: e.target.value});
    },

    onHeightChange: function(e) {
        this.props.onChange({height: e.target.value});
    },

    toJSON: function(skipValidation) {
        // We combine the correct answer and the other cards by merging them,
        // removing duplicates and empty cards, and sorting them into
        // categories based on their content
        var options =
            _.chain(_.pluck(this.props.correctOptions, 'content'))
             .union(_.pluck(this.props.otherOptions, 'content'))
             .uniq()
             .reject(function(content) { return content === ""; })
             .sort()
             .sortBy(function(content) {
                 if (/\d/.test(content)) {
                     return 0;
                 } else if (/^\$?[a-zA-Z]+\$?$/.test(content)) {
                     return 2;
                 } else {
                     return 1;
                 }
             })
             .map(function(content) {
                 return { content: content };
             })
             .value();

        return {
            options: options,
            correctOptions: this.props.correctOptions,
            otherOptions: this.props.otherOptions,
            height: this.props.height,
            layout: this.props.layout
        };
    }
});

module.exports = {
    name: "orderer",
    displayName: "Orderer",
    widget: Orderer,
    editor: OrdererEditor,
    hidden: true
};

},{"../components/text-list-editor.jsx":135,"../renderer.jsx":165,"../util.js":168,"react":115,"react-components/info-tip":5}],188:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var InfoTip = require("react-components/info-tip");
var NumberInput = require("../components/number-input.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");
var RangeInput = require("../components/range-input.jsx");

var deepEq = require("../util.js").deepEq;

var BAR = "bar",
    LINE = "line",
    PIC = "pic",
    HISTOGRAM = "histogram",
    DOTPLOT = "dotplot";

var DOT_PLOT_POINT_SIZE = 4;
var DOT_PLOT_POINT_PADDING = 8;

var widgetPropTypes = {
    type: React.PropTypes.oneOf([BAR, LINE, PIC, HISTOGRAM, DOTPLOT]),
    labels: React.PropTypes.arrayOf(React.PropTypes.string),
    categories: React.PropTypes.arrayOf(React.PropTypes.oneOfType([
        React.PropTypes.number,
        React.PropTypes.string
    ])),

    scaleY: React.PropTypes.number,
    maxY: React.PropTypes.number,
    snapsPerLine: React.PropTypes.number,

    picSize: React.PropTypes.number,
    pixBoxHeight: React.PropTypes.number,
    picUrl: React.PropTypes.string,

    plotDimensions: React.PropTypes.arrayOf(React.PropTypes.number),
    labelInterval: React.PropTypes.number
};

var formatNumber = function(num)  {return "$" + KhanUtil.knumber.round(num, 2) + "$";};

var Plotter = React.createClass({displayName: 'Plotter',
    propTypes: widgetPropTypes,

    getDefaultProps: function () {
        return {
            type: BAR,
            labels: ["", ""],
            categories: [""],

            scaleY: 1,
            maxY: 10,
            snapsPerLine: 2,

            picSize: 40,
            picBoxHeight: 48,
            picUrl: "",

            plotDimensions: [380, 300],
            labelInterval: 1
        };
    },

    getInitialState: function() {
        return {
            values: this.props.starting || [1]
        };
    },

    render: function() {
        return React.DOM.div(
            {className:"perseus-widget-plotter graphie above-scratchpad",
            ref:"graphieDiv"} );
    },

    componentDidUpdate: function(prevProps, prevState) {
        if (this.shouldSetupGraphie) {
            this.setupGraphie(prevState);
        }
    },

    componentDidMount: function() {
        this.setupGraphie(this.state);
    },

    componentWillReceiveProps: function(nextProps) {
        var props = ["type", "labels", "categories", "scaleY", "maxY",
            "snapsPerLine", "picUrl", "labelInterval"];

        this.shouldSetupGraphie = _.any(props, function (prop) {
            return !_.isEqual(this.props[prop], nextProps[prop]);
        }, this);

        if (!_.isEqual(this.props.starting, nextProps.starting) &&
            !_.isEqual(this.state.values, nextProps.starting)) {
            this.shouldSetupGraphie = true;
            this.setState({values: nextProps.starting});
        }
    },

    setupGraphie: function(prevState) {
        var self = this;
        self.shouldSetupGraphie = false;
        var graphieDiv = self.refs.graphieDiv.getDOMNode();
        $(graphieDiv).empty();
        var graphie = KhanUtil.createGraphie(graphieDiv);

        // TODO(jakesandlund): It's not the react way to hang
        // something off the component object, but since graphie
        // is outside React, it makes it easier to do this.
        self.graphie = graphie;
        self.graphie.pics = [];
        self.mousedownPic = false;

        var isBar = self.props.type === BAR,
            isLine = self.props.type === LINE,
            isPic = self.props.type === PIC,
            isHistogram = self.props.type === HISTOGRAM,
            isDotplot = self.props.type === DOTPLOT;

        var isTiledPlot = isPic || isDotplot;

        var config = {};
        var c = config; // c for short

        c.graph = {
            lines: [],
            bars: [],
            points: [],
            dividers: []
        };
        c.scaleY = self.props.scaleY;
        c.dimX = self.props.categories.length;
        var plotDimensions = self.props.plotDimensions;
        if (isLine) {
            c.dimX += 1;
        } else if (isHistogram) {
            c.barPad = 0;
            c.barWidth = 1;
        } else if (isBar) {
            c.barPad = 0.15;
            c.barWidth = 1 - 2 * c.barPad;
            c.dimX += 2 * c.barPad;
        } else if (isTiledPlot) {
            c.picBoxHeight = self.props.picBoxHeight;
            c.picBoxWidthPx = plotDimensions[0] / self.props.categories.length;
            var picPadAllWidth = plotDimensions[0] - c.dimX * c.picBoxWidthPx;
            c.picPad = picPadAllWidth / (2 * c.dimX + 2);
            var picFullWidth = c.picBoxWidthPx + 2 * c.picPad;

            // Convert from px to "unscaled"
            c.picPad = c.picPad / picFullWidth;
            c.picBoxWidth = c.picBoxWidthPx / picFullWidth;
            c.dimX += 2 * c.picPad;
        }

        if (isDotplot) {
            c.picBoxHeight = DOT_PLOT_POINT_SIZE * 2 + DOT_PLOT_POINT_PADDING;
        }

        c.dimY = Math.ceil(self.props.maxY / c.scaleY) * c.scaleY;
        c.scale = _.map([c.dimX, c.dimY], function (dim, i) {
            return plotDimensions[i] / dim;
        });
        if (isTiledPlot) {
            c.scale[1] = c.picBoxHeight / c.scaleY;
        }

        var padX = 25 / c.scale[0];
        var padY = 25 / c.scale[1];

        // Since dotplot doesn't have an axis along the left it looks weird
        // with the same padding as the others
        if (isDotplot) {
            padX /= 2;
        }

        graphie.init({
            range: [[-3 * padX, c.dimX + padX], [-3 * padY, c.dimY + padY]],
            scale: c.scale
        });
        graphie.addMouseLayer({
            allowScratchpad: true
        });

        if (!isTiledPlot) {
            for (var y = 0; y <= c.dimY; y += c.scaleY) {
                graphie.label(
                    [0, y],
                    KhanUtil.roundToApprox(y, 2),
                    "left",
                    /* isTeX */ true /* for the \approx symbol */
                );
                graphie.style(
                    {stroke: "#000", strokeWidth: 1, opacity: 0.3},
                    function() {
                        graphie.line([0, y], [c.dimX, y]);
                    });
            }
        }

        self.setupCategories(config);

        if (isTiledPlot) {
            self.mousedownPic = false;
            $(document).on("mouseup.plotterPic", function() {
                self.mousedownPic = false;
            });
            self.drawPicHeights(self.state.values, prevState.values);
        }

        graphie.style(
            {stroke: "#000", strokeWidth: 2, opacity: 1.0},
            function() {
                if (isDotplot) {
                    graphie.line([0.5, 0], [c.dimX - 0.5, 0]);
                } else {
                    graphie.line([0, 0], [c.dimX, 0]);
                    graphie.line([0, 0], [0, c.dimY]);
                }
            });

        graphie.label([c.dimX / 2, -35 / c.scale[1]],
            self.props.labels[0],
            "below", false)
            .css("font-weight", "bold");

        graphie.label([-60 / c.scale[0], c.dimY / 2],
            self.props.labels[1],
            "center", false)
            .css("font-weight", "bold")
            .addClass("rotate");
    },

	labelCategory: function(x, category) {
		var graphie = this.graphie;
		category = category + "";
		var isTeX = false;
		var mathyCategory = category.match(/^\$(.*)\$$/);
		if (mathyCategory) {
			category = mathyCategory[1];
			isTeX = true;
		}
		graphie.label([x, 0], category, "below", isTeX);
	},

    setupCategories: function(config) {
        var self = this;
        var c = config;
        var graphie = self.graphie;

        if (self.props.type === HISTOGRAM) {
            // Histograms with n labels/categories have n - 1 buckets
            _.times(self.props.categories.length - 1, function(i) {
                self.setupBar({
                    index: i,
                    startHeight: self.state.values[i],
                    config: config,
                    isHistogram: true
                });
            });

            // Label categories
            _.each(self.props.categories, function(category, i) {
                var x = 0.5 + i * c.barWidth;

                self.labelCategory(x, category);
                var tickHeight = 6 / c.scale[1];
                graphie.style({
                    stroke: "#000", strokeWidth: 2, opacity: 1.0
                }, function() {
                    graphie.line([x, -tickHeight], [x, 0]);
                });
            });
        } else {
            _.each(self.props.categories, function (category, i) {
                var startHeight = self.state.values[i];
                var x;

                if (self.props.type === BAR) {
                    x = self.setupBar({
                        index: i,
                        startHeight: startHeight,
                        config: config,
                        isHistogram: false
                    });
                } else if (self.props.type === LINE) {
                    x = self.setupLine(i, startHeight, config);
                } else if (self.props.type === PIC) {
                    x = self.setupPic(i, config);
                } else if (self.props.type === DOTPLOT) {
                    x = self.setupDotplot(i, config);
                }

                var tickStart = 0;
                var tickEnd = -6 / c.scale[1];

                if (self.props.type === DOTPLOT) {
                    tickStart = -tickEnd;
                }

                if (self.props.type === DOTPLOT) {
                    // Dotplot lets you specify to only show labels every 'n'
                    // ticks. It also looks nicer if it makes the labelled
                    // ticks a bit bigger.
                    if (i % self.props.labelInterval === 0 ||
                            i === self.props.categories.length - 1) {
                        self.labelCategory(x, category);
                        tickStart *= 1.5;
                        tickEnd *= 1.5;
                    }
                } else {
                    self.labelCategory(x, category);
                }

                graphie.style({
                    stroke: "#000", strokeWidth: 2, opacity: 1.0
                }, function() {
                    graphie.line([x, tickStart], [x, tickEnd]);
                });
            });
        }
    },

    setupBar: function(args) {
        var i = args.index;
        var startHeight = args.startHeight;
        var config = args.config;
        var isHistogram = args.isHistogram;

        var self = this;
        var graphie = self.graphie;
        var barHalfWidth = config.barWidth / 2;
        var x;
        if (isHistogram) {
            x = 0.5 + i * config.barWidth + barHalfWidth;
        } else {
            x = 0.5 + i + config.barPad;
        }

        var scaleBar = function(i, height) {
            var center = graphie.scalePoint(0);

            // Scale filled bucket (bar)
            config.graph.bars[i].scale(
                    1, Math.max(0.01, height / config.scaleY),
                    center[0], center[1]);

            if (isHistogram) {
                // Scale dividers between buckets
                var leftDivider = config.graph.dividers[i - 1],
                    rightDivider = config.graph.dividers[i];

                if (leftDivider) {
                    var divHeight = Math.min(self.state.values[i - 1], height);
                    leftDivider.scale(
                        1, Math.max(0.01, divHeight / config.scaleY),
                        center[0], center[1]);
                }

                if (rightDivider) {
                    var divHeight = Math.min(self.state.values[i + 1], height);
                    rightDivider.scale(
                        1, Math.max(0.01, divHeight / config.scaleY),
                        center[0], center[1]
                    );
                }
            }

            // Align top of bar to edge unless at bottom
            if (height) {
                config.graph.lines[i].visibleLine.translate(0, 2);
            }
        };

        graphie.style({
            stroke: "none", fill: KhanUtil.LIGHT_BLUE, opacity: 1.0
        }, function() {
            config.graph.bars[i] = graphie.path([
                [x - barHalfWidth, 0],
                [x - barHalfWidth, config.scaleY],
                [x + barHalfWidth, config.scaleY],
                [x + barHalfWidth, 0],
                [x - barHalfWidth, 0]
            ]);
        });

        if (isHistogram) {
            if (i > 0) {
                // Don't draw a divider to the left of the first bucket
                graphie.style({
                    stroke: "#000", strokeWidth: 1, opacity: 0.3
                }, function() {
                    config.graph.dividers.push(graphie.path([
                        [x - barHalfWidth, 0],
                        [x - barHalfWidth, config.scaleY]
                    ]));
                });
            }
        }

        config.graph.lines[i] = graphie.addMovableLineSegment({
            coordA: [x - barHalfWidth, startHeight],
            coordZ: [x + barHalfWidth, startHeight],
            snapY: config.scaleY / self.props.snapsPerLine,
            constraints: {
                constrainX: true
            },
            normalStyle: {
                "stroke": KhanUtil.INTERACTIVE,
                "stroke-width": 4
            }
        });

        config.graph.lines[i].onMove = function(dx, dy) {
            var y = this.coordA[1];
            if (y < 0 || y > config.dimY) {
                y = Math.min(Math.max(y, 0), config.dimY);
                this.coordA[1] = this.coordZ[1] = y;

                // Snap the line back into range.
                this.transform();
            }

            var values = _.clone(self.state.values);
            values[i] = y;
            self.setState({values: values});
            self.props.onChange({ values: values });

            scaleBar(i, y);
        };

        scaleBar(i, startHeight);
        return x;
    },

    setupLine: function(i, startHeight, config) {
        var self = this;
        var c = config;
        var graphie = self.graphie;
        var x = i + 1;
        c.graph.points[i] = graphie.addMovablePoint({
            coord: [x, startHeight],
            constraints: {
                constrainX: true
            },
            normalStyle: {
                fill: KhanUtil.INTERACTIVE,
                stroke: KhanUtil.INTERACTIVE
            },
            snapY: c.scaleY / self.props.snapsPerLine,
        });
        c.graph.points[i].onMove = function(x, y) {
            y = Math.min(Math.max(y, 0), c.dimY);
            var values = _.clone(self.state.values);
            values[i] = y;
            self.setState({values: values});
            self.props.onChange({ values: values });
            return [x, y];
        };
        if (i > 0) {
            c.graph.lines[i] = graphie.addMovableLineSegment({
                pointA: c.graph.points[i - 1],
                pointZ: c.graph.points[i],
                constraints: {
                    fixed: true
                },
                normalStyle: {
                    stroke: "#9ab8ed",
                    "stroke-width": 2
                }
            });
        }
        return x;
    },

    setupDotplot: function(i, config) {
        var graphie = this.graphie;
        return this.setupTiledPlot(i, 1, config, function(x, y)  {
            return graphie.ellipse([x, y],
                 [
                     DOT_PLOT_POINT_SIZE / graphie.scale[0],
                     DOT_PLOT_POINT_SIZE / graphie.scale[1]
                 ],
                 {
                    fill: KhanUtil.INTERACTIVE,
                    stroke: KhanUtil.INTERACTIVE
                 });
        });
    },

    setupPic: function(i, config) {
        var graphie = this.graphie;
        return this.setupTiledPlot(i, 0, config, function(x, y)  {
            var scaledCenter = graphie.scalePoint([x, y]);
            var size = this.props.picSize;
            return graphie.raphael.image(
                    this.props.picUrl,
                    scaledCenter[0] - size / 2,
                    scaledCenter[1] - size / 2,
                    size,
                    size);
        }.bind(this));
    },

    setupTiledPlot: function(i, bottomMargin, config, createImage) {
        var self = this;
        var c = config;
        var graphie = self.graphie;
        var pics = graphie.pics;
        var x = i + 0.5 + c.picPad;

        pics[i] = [];
        var n = Math.round(c.dimY / c.scaleY) + 1;
        _(n).times(function(j) {
            j -= 1;
            var midY = (j + 0.5) * c.scaleY;
            var leftX = x - c.picBoxWidth / 2;
            var topY = midY + 0.5 * c.scaleY;
            var coord = graphie.scalePoint([leftX, topY + bottomMargin]);
            var mouseRect = graphie.mouselayer.rect(
                    coord[0], coord[1], c.picBoxWidthPx, c.picBoxHeight);
            $(mouseRect[0])
                .css({fill: "#000", opacity: 0.0, cursor: "pointer"})
                .on("mousedown", function(e) {
                    self.mousedownPic = true;
                    self.whichPicClicked = i;
                    self.setPicHeight(i, topY);
                    e.preventDefault();
                })
                .on("mouseover", function() {
                    if (self.mousedownPic) {
                        self.setPicHeight(self.whichPicClicked, topY);
                    }
                });

            if (j < 0) {
                // Don't show a pic underneath the axis!
                return;
            }
            pics[i][j] = createImage(x, midY + bottomMargin);
        });
        return x;
    },

    setPicHeight: function(i, y) {
        var values = _.clone(this.state.values);
        values[i] = y;
        this.drawPicHeights(values, this.state.values);
        this.setState({values: values});
        this.props.onChange({ values: values });
    },

    drawPicHeights: function(values, prevValues) {
        var self = this;
        var graphie = self.graphie;
        var pics = graphie.pics;
        _.each(pics, function(ps, i) {
            _.each(ps, function(pic, j) {
                var y = (j + 1) * self.props.scaleY;
                var show = y <= values[i];
                if (self.props.type === DOTPLOT) {
                    var wasShown = y <= prevValues[i];
                    var wasJustShown = show && !wasShown;
                    if (wasJustShown) {
                        pic.animate({
                            "stroke-width": 8
                        }, 75, function()  {return pic.animate({
                                "stroke-width": 2
                            }, 75);});
                    }
                }
                $(pic[0]).css({display: show ? "inline" : "none"});
            });
        });
    },

    toJSON: function(skipValidation) {
        return this.state.values;
    },

    simpleValidate: function(rubric) {
        return Plotter.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Plotter, {
    validate: function (guess, rubric) {
        if (deepEq(guess, rubric.starting)) {
            return {
                type: "invalid",
                message: null
            };
        } else {
            return {
                type: "points",
                earned: deepEq(guess, rubric.correct) ? 1 : 0,
                total: 1,
                message: null
            };
        }
    }
});


// Return a copy of array with length n, padded with given value
function padArray(array, n, value) {
    var copy = _.clone(array);
    copy.length = n;
    for (var i = array.length; i < n; i++) {
        copy[i] = value;
    }
    return copy;
}

var editorDefaults = {
    scaleY: 1,
    maxY: 10,
    snapsPerLine: 2
};

var PlotterEditor = React.createClass({displayName: 'PlotterEditor',
    propTypes: widgetPropTypes,

    getDefaultProps: function () {
        return _.extend({}, editorDefaults, {
            correct: [1],
            starting: [1],

            type: BAR,
            labels: ["", ""],
            categories: [""],

            picSize: 30,
            picBoxHeight: 36,
            picUrl: Khan.imageBase + "badges/earth-small.png",

            plotDimensions: [275, 200],
            labelInterval: 1
        });
    },

    getInitialState: function() {
        return {
            editing: "correct",
            pic: null,
            loadedUrl: null,
            minX: null,
            maxX: null,
            tickStep: null
        };
    },

    componentWillMount: function() {
        this.fetchPic(this.props.picUrl);
    },

    componentWillReceiveProps: function(nextProps) {
        this.fetchPic(nextProps.picUrl);
    },

    fetchPic: function(url) {
        if (this.state.loadedUrl !== url) {
            var pic = new Image();
            pic.src = url;
            pic.onload = function()  {
                this.setState({
                    pic: pic,
                    loadedUrl: url
                });
            }.bind(this);
        }
    },

    render: function() {
        var setFromScale = _.contains([LINE, HISTOGRAM, DOTPLOT],
                                      this.props.type);
        var canChangeSnaps = !_.contains([PIC, DOTPLOT], this.props.type);
        return React.DOM.div( {className:"perseus-widget-plotter-editor"}, 
            React.DOM.div(null, 
                "Chart type:",' ',
                _.map([BAR, LINE, PIC, HISTOGRAM, DOTPLOT], function(type) {
                    return React.DOM.label( {key:type}, 
                        React.DOM.input(
                            {type:"radio",
                            name:"chart-type",
                            checked:this.props.type === type,
                            onChange:_.partial(this.changeType, type)} ),
                        type
                    );
                }, this)
            ),
            React.DOM.div(null, 
                "Labels:",' ',
                _.map(["x", "y"], function(axis, i) {
                    return React.DOM.label( {key:axis}, 
                        axis + ":",
                        React.DOM.input(
                            {type:"text",
                            onChange:_.partial(this.changeLabel, i),
                            defaultValue:this.props.labels[i]} )
                    );
                }, this)
            ),

            setFromScale && React.DOM.div( {className:"set-from-scale-box"}, 
                React.DOM.span( {className:"categories-title"}, 
                    "Set Categories From Scale"
                ),
                React.DOM.div(null, 
                    React.DOM.label(null, 
                        "Tick Step:",' ',
                        NumberInput(
                            {placeholder:1,
                            useArrowKeys:true,
                            value:this.state.tickStep,
                            onChange:this.handleChangeTickStep} )
                    ),
                    InfoTip(null, 
                        React.DOM.p(null, "The difference between adjacent ticks.")
                    )
                ),
                React.DOM.div(null, 
                    React.DOM.label(null, 
                        "Range:",' ',
                        RangeInput(
                            {placeholder:[0, 10],
                            useArrowKeys:true,
                            value:[this.state.minX, this.state.maxX],
                            onChange:this.handleChangeRange} )
                    )
                ),
                React.DOM.div(null, 
                    React.DOM.button( {onClick:this.setCategoriesFromScale}, 
                        "Set Categories",' '
                    )
                )
            ),
            React.DOM.div(null, 
                React.DOM.label(null, 
                    "Label Interval:",' ',
                    NumberInput(
                        {useArrowKeys:true,
                        value:this.props.labelInterval,
                        onChange:this.changeLabelInterval} )
                ),
                InfoTip(null, 
                    React.DOM.p(null, "Which ticks to display the labels for. For instance,"+' '+
                    "setting this to \"4\" will only show every 4th label (plus"+' '+
                    "the last one)")
                )
            ),
            this.props.type === PIC && React.DOM.div(null, 
                React.DOM.label(null, 
                    "Picture:",' ',
                    React.DOM.input(
                        {type:"text",
                        className:"pic-url",
                        defaultValue:this.props.picUrl,
                        onKeyPress:this.changePicUrl,
                        onBlur:this.changePicUrl} ),
                InfoTip(null, 
                    React.DOM.p(null, "Use the default picture of Earth, or insert the URL for"+' '+
                    "a different picture using the \"Add image\" function.")
                )
                ),
                this.state.pic &&
                    this.state.pic.width !== this.state.pic.height &&
                    React.DOM.p( {className:"warning"}, 
                        React.DOM.b(null, "Warning"),": You are using a picture which is not"+' '+
                        "square.  This means the image will get distorted. You"+' '+
                        "should probably crop it to be square."
                    )
            ),
            React.DOM.div(null, 
                React.DOM.label(null, 
                    "Categories:",' ',
                    TextListEditor(
                        {ref:"categories",
                        layout:"horizontal",
                        options:this.props.categories,
                        onChange:this.changeCategories} )
                )
            ),
            React.DOM.div(null, 
                React.DOM.label(null, 
                    "Scale (y):",' ',
                    React.DOM.input(
                        {type:"text",
                        onChange:this.changeScale,
                        defaultValue:this.props.scaleY} )
                )
            ),
            React.DOM.div(null, 
                React.DOM.label(null, 
                    "Max y:",' ',
                    React.DOM.input(
                        {type:"text",
                        ref:"maxY",
                        onChange:this.changeMax,
                        defaultValue:this.props.maxY} )
                )
            ),
            canChangeSnaps && React.DOM.div(null, 
                React.DOM.label(null, 
                    "Snaps per line:",' ',
                    React.DOM.input(
                        {type:"text",
                        onChange:this.changeSnaps,
                        defaultValue:this.props.snapsPerLine} )
                ),
                InfoTip(null, 
                    React.DOM.p(null, "Creates the specified number of divisions between the"+' '+
                    "horizontal lines. Fewer snaps between lines makes the graph"+' '+
                    "easier for the student to create correctly.")
                )
            ),
            React.DOM.div(null, 
                "Editing values:",' ',
                _.map(["correct", "starting"], function(editing) {
                    return React.DOM.label( {key:editing}, 
                        React.DOM.input(
                            {type:"radio",
                            name:"editing",
                            checked:this.state.editing === editing,
                            onChange:_.partial(this.changeEditing, editing)}),
                        editing
                    );
                }, this),
                InfoTip(null, React.DOM.p(null, 
                    "Use this toggle to switch between editing the correct"+' '+
                    "answer (what the student will be graded on) and the"+' '+
                    "starting values (what the student will see plotted when"+' '+
                    "they start the problem). Note: These cannot be the same."
                ))
            ),
            this.transferPropsTo(
                Plotter(
                    {starting:this.props[this.state.editing],
                    onChange:this.handlePlotterChange} )
            )
        );
    },

    handleChangeTickStep: function(value) {
        this.setState({
            tickStep: value
        });
    },

    handleChangeRange: function(newValue) {
        this.setState({
            minX: newValue[0],
            maxX: newValue[1]
        });
    },

    changeLabelInterval: function(value) {
        this.props.onChange({
            labelInterval: value
        });
    },

    handlePlotterChange: function(newProps) {
        var props = {};
        props[this.state.editing] = newProps.values;
        this.props.onChange(props);
    },

    changeType: function(type) {
        var categories;
        if (type === HISTOGRAM) {
            // Switching to histogram, add a label (0) to the left
            categories = [formatNumber(0)].concat(this.props.categories);
            this.props.onChange({type: type, categories: categories});
        } else if (this.props.type === HISTOGRAM) {
            // Switching from histogram, remove a label from the left
            categories = this.props.categories.slice(1);
            this.props.onChange({type: type, categories: categories});
        } else {
            this.props.onChange({type: type});
        }

        if (categories) {
            this.refs.categories.getDOMNode().value = categories.join(", ");
        }
    },

    changeLabel: function(i, e) {
        var labels = _.clone(this.props.labels);
        labels[i] = e.target.value;
        this.props.onChange({labels: labels});
    },

    changePicUrl: function(e) {
        // Only continue on blur or "enter"
        if (e.type === "keypress" && e.keyCode !== 13) {
            return;
        }

        this.props.onChange({picUrl: e.target.value});
    },

    changeCategories: function(categories) {
        var n = categories.length;
        if (this.props.type === HISTOGRAM) {
            // Histograms with n labels/categories have n - 1 buckets
            n--;
        }
        var value = this.props.scaleY;

        this.props.onChange({
            categories: categories,
            correct: padArray(this.props.correct, n, value),
            starting: padArray(this.props.starting, n, value)
        });
    },

    changeScale: function(e) {
        var oldScale = this.props.scaleY;
        var newScale = +e.target.value || editorDefaults.scaleY;

        var scale = function(value) {
            return value * newScale / oldScale;
        };

        var maxY = scale(this.props.maxY);

        this.props.onChange({
            scaleY: newScale,
            maxY: maxY,
            correct: _.map(this.props.correct, scale),
            starting: _.map(this.props.starting, scale)
        });

        this.refs.maxY.getDOMNode().value = maxY;
    },

    changeMax: function(e) {
        this.props.onChange({
            maxY: +e.target.value || editorDefaults.maxY
        });
    },

    changeSnaps: function(e) {
        this.props.onChange({
            snapsPerLine: +e.target.value || editorDefaults.snapsPerLine
        });
    },

    changeEditing: function(editing) {
        this.setState({editing: editing});
    },

    setCategoriesFromScale: function() {
        var scale = this.state.tickStep || 1;
        var min = this.state.minX || 0;
        var max = this.state.maxX || 0;
        var length = Math.floor((max - min) / scale) * scale;

        var categories;
        if (this.props.type === HISTOGRAM || this.props.type === DOTPLOT) {
            // Ranges for histogram and dotplot labels should start at zero
            categories = _.range(0, length + scale, scale);
        } else {
            categories = _.range(scale, length + scale, scale);
        }

        categories = _.map(categories, function(num)  {return num + min;});
        categories = _.map(categories, formatNumber);

        this.changeCategories(categories);

        this.refs.categories.getDOMNode().value = categories.join(", ");
    },

    toJSON: function(skipValidation) {
        var json = _.pick(this.props, "correct", "starting", "type", "labels",
            "categories", "scaleY", "maxY", "snapsPerLine", "labelInterval");

        if (this.props.type === PIC) {
            json.picUrl = this.props.picUrl;
        }

        return json;
    }
});

module.exports = {
    name: "plotter",
    displayName: "Plotter",
    widget: Plotter,
    editor: PlotterEditor,
    hidden: true
};

},{"../components/number-input.jsx":129,"../components/range-input.jsx":131,"../components/text-list-editor.jsx":135,"../util.js":168,"react":115,"react-components/info-tip":5}],189:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Changeable = require("../mixins/changeable.jsx");
var ApiClassNames = require("../perseus-api.jsx").ClassNames;

var ButtonGroup = require("react-components/button-group");
var Editor = require("../editor.jsx");
var PropCheckBox = require("../components/prop-check-box.jsx");
var Renderer = require("../renderer.jsx");

var InfoTip = require("react-components/info-tip");

var shuffle = require("../util.js").shuffle;
var seededRNG = require("../util.js").seededRNG;
var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;

var cx = React.addons.classSet;

var BaseRadio = React.createClass({displayName: 'BaseRadio',
    propTypes: {
        labelWrap: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onCheckedChange: React.PropTypes.func,
        showClues: React.PropTypes.bool,
        onePerLine: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            onePerLine: true
        };
    },

    render: function() {
        var radioGroupName = _.uniqueId("perseus_radio_");
        var inputType = this.props.multipleSelect ? "checkbox" : "radio";

        return React.DOM.ul( {className:"perseus-widget-radio " +
                "above-scratchpad blank-background"}, 
            this.props.multipleSelect &&
                React.DOM.div( {className:"instructions"}, 
                    $_(null, "Select all that apply.")
                ),
            this.props.choices.map(function(choice, i) {

                var content = React.DOM.div(null, 
                        choice.content
                    );

                var classSet = {
                    "inline": !this.props.onePerLine
                };
                classSet[ApiClassNames.RADIO.OPTION] = true;
                classSet[ApiClassNames.RADIO.SELECTED] = choice.checked;
                var className = cx(classSet);

                return React.DOM.li( {className:className, key:i}, React.DOM.div(null, 
                    React.DOM.span( {className:"checkbox"}, 
                        React.DOM.input(
                            {ref:"radio" + i,
                            type:inputType,
                            name:radioGroupName,
                            checked:choice.checked,
                            onChange:function(e)  {
                                this.checkOption(i, e.target.checked);
                            }.bind(this)} )
                    ),
                    /* A pseudo-label. <label> is slightly broken on iOS,
                        so this works around that. Unfortunately, it is
                        simplest to just work around that everywhere. */
                    React.DOM.span(
                            {className:
                                "interactive-component " +
                                ApiClassNames.RADIO.OPTION_CONTENT,
                            
                            style:{
                                cursor: "default",
                            },
                            onTouchStart:!this.props.labelWrap ?
                                null : captureScratchpadTouchStart,
                            
                            onClick:!this.props.labelWrap ? null : function(e)  {
                                // Don't send this to the scratchpad
                                e.preventDefault();
                                this.checkOption(i,
                                    (this.props.multipleSelect ?
                                        !choice.checked :
                                        true
                                    )
                                );
                            }.bind(this)}, 
                        content
                    ),
                    Exercises.cluesEnabled === "cluesEnabled" &&
                        this.props.showClues && choice.checked &&
                        React.DOM.div( {className:"perseus-radio-clue"}, 
                            choice.clue
                        )
                ));

            }, this)
        );
    },

    checkOption: function(radioIndex, shouldBeChecked) {
        var newChecked;
        if (this.props.multipleSelect) {
            // When multipleSelect is on, clicking an index toggles the
            // selection of just that index.
            newChecked = _.map(this.props.choices, function(choice, i)  {
                return (i === radioIndex) ? shouldBeChecked : choice.checked;
            });
        } else {
            // When multipleSelect is turned off, we always select the
            // clicked index, and unselect everything else.
            newChecked = _.map(this.props.choices, function(choice, i)  {
                return i === radioIndex;
            });
        }

        // We send just the array of [true/false] checked values here;
        // onCheckedChange reconstructs the new choices to send to
        // this.props.onChange
        this.props.onCheckedChange(newChecked);
    },

    focus: function(i) {
        this.refs["radio" + (i || 0)].getDOMNode().focus();
        return true;
    }
});

var Radio = React.createClass({displayName: 'Radio',
    getDefaultProps: function() {
        return {
            choices: [{}],
            displayCount: null,
            multipleSelect: false,
        };
    },

    getInitialState: function() {
        return {
            showClues: false
        };
    },

    render: function() {
        var choices = this.props.choices;
        var values = this.props.values || _.map(choices, function()  {return false;});
        var revealNoneOfTheAbove = this._shouldRevealNoneOfTheAbove(choices,
                                                                    values);
        choices = _.map(choices, function(choice, i)  {
            var content;
            if (choice.isNoneOfTheAbove && !revealNoneOfTheAbove) {
                content = { content: "None of the above" };
            } else {
                content = _.pick(choice, "content");
            }
            return {
                // We need to make a copy, which _.pick does
                content: Renderer(content),
                checked: values[i],
                clue: Renderer({content: choice.clue}),
            };
        });
        choices = this.enforceOrdering(choices);

        return BaseRadio(
            {ref:"baseRadio",
            labelWrap:true,
            onePerLine:this.props.onePerLine,
            multipleSelect:this.props.multipleSelect,
            showClues:this.state.showClues,
            choices:choices.map(function(choice) {
                return _.pick(choice, "content", "checked", "clue");
            }),
            onCheckedChange:this.onCheckedChange} );
    },

    _shouldRevealNoneOfTheAbove: function(choices, values) {
        // We reveal when 'None of the above' is the correct choice
        // and the entire question is completed. If 'None of the above' isn't
        // selected and the question is completed, then it's the wrong choice
        // and not worth revealing.
        var noneOfTheAboveSelected = _.any(choices, function(choice, i)  {
            return choice.isNoneOfTheAbove && values[i];
        });
        return this.props.questionCompleted && this.props.noneOfTheAbove &&
                    noneOfTheAboveSelected;
    },

    focus: function(i) {
        return this.refs.baseRadio.focus(i);
    },

    onCheckedChange: function(checked) {
        this.setState({showClues: false});
        this.props.onChange({
            values: checked
        });
    },

    toJSON: function(skipValidation) {
        // Return checked inputs in the form {values: [bool]}. (Dear future
        // timeline implementers: this used to be {value: i} before multiple
        // select was added)
        if (this.props.values) {
            var noneOfTheAboveIndex = null;
            var noneOfTheAboveSelected = false;

            var values = this.props.values.slice();

            for (var i = 0; i < this.props.values.length; i++) {
                var index = this.props.choices[i].originalIndex;
                values[index] = this.props.values[i];

                if (this.props.choices[i].isNoneOfTheAbove) {
                    noneOfTheAboveIndex = index;

                    if (values[i]) {
                        noneOfTheAboveSelected = true;
                    }
                }
            }

            return _.extend({}, this.props, {
                values: values,
                noneOfTheAboveIndex: noneOfTheAboveIndex,
                noneOfTheAboveSelected: noneOfTheAboveSelected
              }
            );
        } else {
            // Nothing checked
            return {
                values: _.map(this.props.choices, function()  {return false;})
            };
        }
    },

    simpleValidate: function(rubric) {
        this.setState({showClues: true});
        return Radio.validate(this.toJSON(), rubric);
    },

    enforceOrdering: function(choices) {
        var content = _.pluck(choices, "content");
        if (_.isEqual(content, [$._("False"), $._("True")]) ||
            _.isEqual(content, [$._("No"), $._("Yes")])) {
            return ([choices[1]]).concat([choices[0]]);
        }
        return choices;
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Radio, {
    validate: function(state, rubric) {
        var numSelected = _.reduce(state.values, function(sum, selected) {
            return sum + ((selected) ? 1 : 0); }
        , 0);

        if (numSelected === 0) {
            return {
                type: "invalid",
                message: null
            };
        // If NOTA and some other answer are checked, ...
        } else if (state.noneOfTheAboveSelected && numSelected > 1) {
            return {
                type: "invalid",
                message: $._("'None of the above' may not be selected " +
                                    "when other answers are selected.")
             };
        } else {
            /* jshint -W018 */
            var correct = _.all(state.values, function(selected, i) {
                var isCorrect;
                if (state.noneOfTheAboveIndex === i) {
                    isCorrect = _.all(rubric.choices, function(choice, j) {
                        return i === j || !choice.correct;
                    });
                } else {
                    isCorrect = !!rubric.choices[i].correct;
                }
                return isCorrect === selected;
            });
            /* jshint +W018 */

            return {
                type: "points",
                earned: correct ? 1 : 0,
                total: 1,
                message: null
            };
        }
    }
});

var RadioEditor = React.createClass({displayName: 'RadioEditor',
    mixins: [Changeable],

    propTypes: {
        choices: React.PropTypes.arrayOf(React.PropTypes.shape({
            content: React.PropTypes.string,
            clue: React.PropTypes.string,
            correct: React.PropTypes.bool
        })),
        displayCount: React.PropTypes.number,
        randomize: React.PropTypes.bool,
        noneOfTheAbove: React.PropTypes.bool,
        multipleSelect: React.PropTypes.bool,
        onePerLine: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            choices: [{}, {}],
            displayCount: null,
            randomize: false,
            noneOfTheAbove: false,
            multipleSelect: false,
            onePerLine: true
        };
    },

    render: function() {
        return React.DOM.div(null, 
            React.DOM.div( {className:"perseus-widget-row"}, 
            
                React.DOM.div( {className:"perseus-widget-left-col"}, 
                    PropCheckBox( {label:"Multiple selections",
                                  labelAlignment:"right",
                                  multipleSelect:this.props.multipleSelect,
                                  onChange:this.onMultipleSelectChange} )
                )

            ),

            BaseRadio(
                {ref:"baseRadio",
                multipleSelect:this.props.multipleSelect,
                onePerLine:true,
                labelWrap:false,
                choices:this.props.choices.map(function(choice, i) {
                    var checkedClass = choice.correct ?
                        "correct" :
                        "incorrect";
                    var editor = Editor({
                        ref: "editor" + i,
                        content: choice.content || "",
                        widgetEnabled: false,
                        placeholder: "Type a choice here...",
                        onChange: function(newProps)  {
                            if ("content" in newProps) {
                                this.onContentChange(i, newProps.content);
                            }}.bind(this)
                    });
                    var clueEditor = Editor({
                        ref: "clue-editor-" + i,
                        content: choice.clue || "",
                        widgetEnabled: false,
                        placeholder: $._("Why is this choice " +
                            checkedClass + "?"),
                        onChange: function(newProps)  {
                            if ("content" in newProps) {
                                this.onClueChange(i, newProps.content);
                            }}.bind(this)
                    });
                    var deleteLink = React.DOM.a( {href:"#",
                            className:"simple-button orange delete-choice",
                            title:"Remove this choice",
                            onClick:this.onDelete.bind(this, i)}, 
                        React.DOM.span( {className:"icon-trash"} )
                    );
                    return {
                        content: React.DOM.div( {className:"choice-clue-editors"}, 
                            React.DOM.div( {className:"choice-editor " + checkedClass}, 
                                editor
                            ),
                            /* TODO(eater): Remove this condition after clues
                                            are fully launched. */
                            (!window.KA || window.KA.allowEditingClues) &&
                                React.DOM.div( {className:"clue-editor"}, 
                                    clueEditor
                                ),
                            
                            this.props.choices.length >= 2 && deleteLink
                        ),
                        checked: choice.correct
                    };
                }, this),
                onCheckedChange:this.onCheckedChange} ),

            React.DOM.div( {className:"add-choice-container"}, 
                React.DOM.a( {href:"#", className:"simple-button orange",
                        onClick:this.addChoice}, 
                    React.DOM.span( {className:"icon-plus"} ),
                    ' ',"Add a choice",' '
                )
            )

        );
    },

    onMultipleSelectChange: function(allowMultiple) {
        allowMultiple = allowMultiple.multipleSelect;

        var numSelected = _.reduce(this.props.choices,
                function(memo, choice) {
            return choice.correct ? memo + 1 : memo;
        }, 0);

        if (!allowMultiple && numSelected > 1) {
            var choices = _.map(this.props.choices, function(choice) {
                return _.defaults({
                    correct: false
                }, choice);
            });
            this.props.onChange({
                multipleSelect: allowMultiple,
                choices: choices
            });

        } else {
            this.props.onChange({
                multipleSelect: allowMultiple
            });
        }
    },

    onCheckedChange: function(checked) {
        var choices = _.map(this.props.choices, function(choice, i) {
            return _.extend({}, choice, {correct: checked[i]});
        });
        this.props.onChange({choices: choices});
    },

    onContentChange: function(choiceIndex, newContent) {
        var choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            content: newContent
        });
        this.props.onChange({choices: choices});
    },

    onClueChange: function(choiceIndex, newClue) {
        var choices = this.props.choices.slice();
        choices[choiceIndex] = _.extend({}, choices[choiceIndex], {
            clue: newClue
        });
        if (newClue === "") {
            delete choices[choiceIndex].clue;
        }
        this.props.onChange({choices: choices});
    },

    onDelete: function(choiceIndex, e) {
        e.preventDefault();
        var choices = this.props.choices.slice();
        choices.splice(choiceIndex, 1);
        this.props.onChange({choices: choices});
    },

    addChoice: function(e) {
        e.preventDefault();

        var choices = this.props.choices;
        this.props.onChange({choices: choices.concat([{}])}, function()  {
            this.refs["editor" + choices.length].focus();
        }.bind(this));
    },

    setDisplayCount: function(num){
        this.props.onChange({displayCount: num});
    },

    focus: function() {
        this.refs.editor0.focus();
        return true;
    },

    toJSON: function(skipValidation) {
        if (!skipValidation &&
                !_.some(_.pluck(this.props.choices, "correct"))) {
            alert("Warning: No choice is marked as correct.");
        }

        return _.pick(this.props, "choices", "randomize",
            "multipleSelect", "displayCount", "noneOfTheAbove", "onePerLine");
    }
});

var choiceTransform = function(editorProps)  {

    var randomize = function(array) {
        if (editorProps.randomize) {
            return shuffle(array, editorProps.problemNum);
        } else {
            return array;
        }
    };

    var addNoneOfAbove = function(array) {
        // Pick a random choice to replace with 'None of the above'
        if (!editorProps.randomize && editorProps.noneOfTheAbove) {
            // Seed RNG with problemNum
            var rand = seededRNG(editorProps.problemNum)();
            var randomIndex = Math.floor(rand * array.length);
            var itemToBeReplaced = array[randomIndex];

            // Shift array left so that 'None of the above' is last
            array.splice(randomIndex, 1);
            array.push(itemToBeReplaced);
        }

        array[array.length - 1].isNoneOfTheAbove = editorProps.noneOfTheAbove;
        return array;
    };

    // Add meta-information to choices
    var choices = editorProps.choices.slice();
    choices = _.map(choices, function(choice, i) {
        return _.extend({}, _.omit(choice, "correct"),
            { originalIndex: i, isNoneOfTheAbove: false }
        );
    });

    // Randomize and add 'None of the above'
    choices = addNoneOfAbove(randomize(choices));

    editorProps = _.extend({}, editorProps, { choices: choices });
    return _.pick(editorProps, "choices", "noneOfTheAbove", "onePerLine",
        "multipleSelect", "correctAnswer");
};

module.exports = {
    name: "radio",
    displayName: "Multiple choice",
    widget: Radio,
    editor: RadioEditor,
    transform: choiceTransform
};

},{"../components/prop-check-box.jsx":130,"../editor.jsx":143,"../mixins/changeable.jsx":159,"../perseus-api.jsx":162,"../renderer.jsx":165,"../util.js":168,"react":115,"react-components/button-group":3,"react-components/info-tip":5}],190:[function(require,module,exports){
/** @jsx React.DOM */

var React          = require('react');
var InfoTip        = require("react-components/info-tip");
var PropCheckBox   = require("../components/prop-check-box.jsx");
var Sortable       = require("../components/sortable.jsx");
var TextListEditor = require("../components/text-list-editor.jsx");

var shuffle = require("../util.js").shuffle;

var HORIZONTAL = "horizontal",
    VERTICAL = "vertical";

var Sorter = React.createClass({displayName: 'Sorter',
    propTypes: {
        correct: React.PropTypes.array,
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        padding: React.PropTypes.bool,
        problemNum: React.PropTypes.number,
        onChange: React.PropTypes.func
    },

    getDefaultProps: function() {
        return {
            correct: [],
            layout: HORIZONTAL,
            padding: true,
            problemNum: 0,
            onChange: function() {}
        };
    },

    render: function() {
        var options = shuffle(
            this.props.correct,
            this.props.problemNum,
            /* ensurePermuted */ true
        );

        return React.DOM.div( {className:"perseus-widget-sorter ui-helper-clearfix"}, 
            Sortable(
                {options:options,
                layout:this.props.layout,
                padding:this.props.padding,
                onChange:this.props.onChange,
                ref:"sortable"} )
        );
    },

    toJSON: function(skipValidation) {
        return {options: this.refs.sortable.getOptions()};
    },

    simpleValidate: function(rubric) {
        return Sorter.validate(this.toJSON(), rubric);
    },

    statics: {
        displayMode: "block"
    }
});


_.extend(Sorter, {
    validate: function(state, rubric) {
        var correct = _.isEqual(state.options, rubric.correct);

        return {
            type: "points",
            earned: correct ? 1 : 0,
            total: 1,
            message: null
        };
    }
});


var SorterEditor = React.createClass({displayName: 'SorterEditor',
    propTypes: {
        correct: React.PropTypes.array,
        layout: React.PropTypes.oneOf([HORIZONTAL, VERTICAL]),
        padding: React.PropTypes.bool
    },

    getDefaultProps: function() {
        return {
            correct: ["$x$", "$y$", "$z$"],
            layout: HORIZONTAL,
            padding: true
        };
    },

    render: function() {
        var editor = this;

        return React.DOM.div(null, 
            React.DOM.div(null, 
                ' ',"Correct answer:",' ',
                InfoTip(null, React.DOM.p(null, 
                    "Enter the correct answer (in the correct order) here. The"+' '+
                    "preview on the right will have the cards in a randomized"+' '+
                    "order, which is how the student will see them."
                ))
            ),
            TextListEditor(
                {options:this.props.correct,
                onChange:function(options, cb) {
                    editor.props.onChange({correct: options}, cb);
                },
                layout:this.props.layout} ),
            React.DOM.div(null, 
                React.DOM.label(null, 
                    ' ',"Layout:",' ',
                    React.DOM.select( {value:this.props.layout,
                            onChange:this.onLayoutChange}, 
                        React.DOM.option( {value:HORIZONTAL}, "Horizontal"),
                        React.DOM.option( {value:VERTICAL}, "Vertical")
                    )
                ),
                InfoTip(null, 
                    React.DOM.p(null, "Use the horizontal layout for short text and small"+' '+
                    "images. The vertical layout is best for longer text and"+' '+
                    "larger images.")
                )
            ),
            React.DOM.div(null, 
                PropCheckBox(
                    {label:"Padding:",
                    padding:this.props.padding,
                    onChange:this.props.onChange} ),
                InfoTip(null, 
                    React.DOM.p(null, "Padding is good for text, but not needed for images.")
                )
            )
        );
    },

    onLayoutChange: function(e) {
        this.props.onChange({layout: e.target.value});
    },

    toJSON: function(skipValidation) {
        return _.pick(this.props, "correct", "layout", "padding");
    }
});

module.exports = {
    name: "sorter",
    displayName: "Sorter",
    widget: Sorter,
    editor: SorterEditor,
    hidden: true
};

},{"../components/prop-check-box.jsx":130,"../components/sortable.jsx":132,"../components/text-list-editor.jsx":135,"../util.js":168,"react":115,"react-components/info-tip":5}],191:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Editor = require("../editor.jsx");
var InfoTip = require("react-components/info-tip");
var Renderer = require("../renderer.jsx");
var Util = require("../util.js");

var Table = React.createClass({displayName: 'Table',
    render: function() {
        var headers = this.props.headers;
        return React.DOM.table( {className:"perseus-widget-table-of-values non-markdown"}, 
            React.DOM.thead(null, 
                React.DOM.tr(null, 
                    _.map(headers, function(header, i) {
                        return React.DOM.th( {key:i}, Renderer({content: header}));
                    })
                
                )
            ),
            React.DOM.tbody(null, 
                _(this.props.rows).times(function(r)  {
                    return React.DOM.tr( {key:r}, 
                        _(this.props.columns).times(function(c)  {
                            return React.DOM.td( {key:c}, 
                                React.DOM.input(
                                    {ref:"answer" + r + "," + c,
                                    type:"text",
                                    onChange:this.handleChange}
                                )
                            );
                        }.bind(this))
                    );
                }.bind(this))
            
            )
        );
    },

    toJSON: function() {
        var self = this;
        return _.map(self.props.answers, function(answer, r) {
            return _.map(self.props.headers, function(header, c) {
                return self.refs["answer" + r + "," + c].getDOMNode().value;
            });
        });
    },

    handleChange: function() {
        // HACK: We need to know *that* the widget changed, but currently it's
        // not set up in a nice way to tell us *how* it changed
        this.props.onChange({});
    },

    simpleValidate: function(rubric) {
        return Table.validate(this.toJSON(), rubric);
    },

    focus: function() {
        this.refs["answer0,0"].getDOMNode().focus();
        return true;
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Table, {
    validate: function(state, rubric) {
        var filterNonEmpty = function (table) {
            return _.filter(table, function (row) {

                // Check if row has a cell that is nonempty
                return _.some(row, _.identity);
            });
        };
        var solution = filterNonEmpty(rubric.answers);
        var supplied = filterNonEmpty(state);
        var hasEmptyCell = _.some(supplied, function(row) {
            return _.some(row, function(cell) {
                return cell === "";
            });
        });
        if (hasEmptyCell || !supplied.length) {
            return {
                type: "invalid",
                message: null
            };
        }
        if (supplied.length !== solution.length) {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
        var createValidator = Khan.answerTypes
                                  .number.createValidatorFunctional;
        var message = null;
        var allCorrect = _.every(solution, function (rowSolution) {
            var i;
            for (i = 0; i < supplied.length; i++) {
                var rowSupplied = supplied[i];
                var correct = _.every(rowSupplied, function (cellSupplied, i) {
                    var cellSolution = rowSolution[i];
                    var validator = createValidator(
                            cellSolution, {
                                simplify: true
                            });
                    var result = validator(cellSupplied);
                    if (result.message) {
                        message = result.message;
                    }
                    return result.correct;
                });
                if (correct) {
                    supplied.splice(i, 1);
                    return true;
                }
            }
            return false;
        });
        return {
            type: "points",
            earned: allCorrect ? 1 : 0,
            total: 1,
            message: message
        };
    }
});

var TableEditor = React.createClass({displayName: 'TableEditor',
    getDefaultProps: function() {
        var defaultRows = 4;
        var defaultColumns = 1;
        var blankAnswers = _(defaultRows).times(function() {
            return Util.stringArrayOfSize(defaultColumns);
        });
        return {
            headers: [""],
            rows: defaultRows,
            columns: defaultColumns,
            numRawRows: defaultRows,
            numRawColumns: defaultColumns,
            answers: blankAnswers,
            type: "set"
        };
    },

    focus: function() {
        this.refs.numberOfColumns.getDOMNode().focus();
    },

    render: function() {
        var self = this;
        var rows = this.props.rows;
        var cols = this.props.columns;
        return React.DOM.div(null, 
            React.DOM.div(null, 
                React.DOM.label(null, 
                    ' ',"Number of columns:",' ',
                    React.DOM.input(
                        {ref:"numberOfColumns",
                        type:"text",
                        value:this.props.numRawColumns,
                        onChange:this.onSizeInput}
                    )
                )
            ),
            React.DOM.div(null, 
                React.DOM.label(null, 
                    ' ',"Number of rows:",' ',
                    React.DOM.input(
                        {ref:"numberOfRows",
                        type:"text",
                        value:this.props.numRawRows,
                        onChange:this.onSizeInput}
                    )
                )
            ),
            React.DOM.div(null, 
                ' ',"Table of answers type:",' ',
                React.DOM.ul(null, 
                    React.DOM.li(null, 
                        React.DOM.label(null, 
                            React.DOM.input(
                                {type:"radio",
                                checked:"checked",
                                readOnly:true} ),
                            "Set of values (complete)"
                        ),
                        InfoTip(null, 
                            React.DOM.p(null, "The student has to fill out all cells in the"+' '+
                            "table.  For partially filled tables create a table"+' '+
                            "using the template, and insert text input boxes"+' '+
                            "as desired.")
                        )
                    )
                )
            ),
            React.DOM.div(null, 
                React.DOM.table( {className:"perseus-widget-table-of-values non-markdown"}, 
                    React.DOM.thead(null, 
                        React.DOM.tr(null, 
                            _(cols).times(function(i) {
                                return React.DOM.th( {key:i}, 
                                    Editor(
                                        {ref:"columnHeader" + i,
                                        content:self.props.headers[i],
                                        widgetEnabled:false,
                                        onChange:
                                            self.onHeaderChange.bind(self, i)
                                        }
                                    )
                                );
                            })
                        )
                    ),
                    React.DOM.tbody(null, 
                        _(rows).times(function(r) {
                            return React.DOM.tr( {key:r}, 
                                _(cols).times(function(c) {
                                    return React.DOM.td( {key:c}, 
                                        React.DOM.input(
                                            {ref:"answer" + r + "," + c,
                                            type:"text",
                                            onChange:self.onAnswerInput,
                                            value:self.props.answers[r][c]}
                                        )
                                    );
                                })
                            );
                        })
                    )
                )
            )
        );
    },

    onHeaderChange: function(index, newProps) {
        if (_.has(newProps, "content")) {
            var headers = this.props.headers.slice();
            headers[index] = newProps.content;
            this.props.onChange({headers: headers});
        }
    },

    onSizeInput: function() {
        var numRawRows = this.refs.numberOfRows.getDOMNode().value;
        var numRawCols = this.refs.numberOfColumns.getDOMNode().value;
        var rows = +numRawRows || 0;
        var cols = +numRawCols || 0;
        rows = Math.min(Math.max(1, rows), 30);
        cols = Math.min(Math.max(1, cols), 6);
        var oldColumns = this.props.columns;
        var oldRows = this.props.rows;

        var answers = this.props.answers;
        if (oldRows < rows) {
            _(rows - oldRows).times(function() {
                answers.push(Util.stringArrayOfSize(oldColumns));
            });
        }

        var headers = this.props.headers;

        function fixColumnSizing(array) {
            _(cols - oldColumns).times(function() {
                array.push("");
            });
        }

        if (oldColumns < cols) {
            fixColumnSizing(headers);
            _.each(answers, fixColumnSizing);
        }

        this.props.onChange({
            rows: rows,
            columns: cols,
            numRawRows: numRawRows,
            numRawColumns: numRawCols,
            answers: answers,
            headers: headers
        });
    },

    onAnswerInput: function() {
        var self = this;
        var answers = _(self.props.rows).times(function(r) {
            return _(self.props.columns).times(function(c) {
                return self.refs["answer" + r + "," + c].getDOMNode().value;
            });
        });
        this.props.onChange({answers: answers});
    },

    toJSON: function() {
        var self = this;
        var answers = this.props.answers.slice(0, this.props.rows);
        answers = _.map(answers, function(row) {
            return row.slice(0, self.props.columns);
        });
        var json = _.pick(this.props, 'rows', 'columns');
        json.answers = answers;
        json.headers = this.props.headers.slice(0, this.props.columns);
        return json;
    }
});

module.exports = {
    name: "table",
    displayName: "Table of values",
    widget: Table,
    editor: TableEditor,
    hidden: true
};

},{"../editor.jsx":143,"../renderer.jsx":165,"../util.js":168,"react":115,"react-components/info-tip":5}],192:[function(require,module,exports){
/** @jsx React.DOM */

var React = require('react');
var Graph         = require("../components/graph.jsx");
var GraphSettings = require("../components/graph-settings.jsx");
var InfoTip       = require("react-components/info-tip");
var NumberInput   = require("../components/number-input.jsx");
var PropCheckBox  = require("../components/prop-check-box.jsx");
var TeX           = require("../tex.jsx");

var ROTATE_SNAP_DEGREES = 15;
var DEGREE_SIGN = "\u00B0";
var RENDER_TRANSFORM_DELAY_IN_MS = 300;
var ROTATE_HANDLE_DIST = 1.5;
var REFLECT_ROTATE_HANDLE_DIST = 2;
var REFLECT_BUTTON_SIZE = 1;

var deepEq = require("../util.js").deepEq;
var getGridStep = require("../util.js").getGridStep;
var captureScratchpadTouchStart =
        require("../util.js").captureScratchpadTouchStart;
var knumber = KhanUtil.knumber;
var kvector = KhanUtil.kvector;
var kpoint = KhanUtil.kpoint;
var kray = KhanUtil.kray;
var kline = KhanUtil.kline;

var defaultBoxSize = 400;
var defaultBackgroundImage = {
    url: null,
    scale: 1,
    bottom: 0,
    left: 0,
};

function arraySum(array) {
    return _.reduce(array, function(memo, arg) { return memo + arg; }, 0);
}

/* Does a pluck on keys inside objects in an object
 *
 * Ex:
 * tools = {
 *     translation: {
 *         enabled: true
 *     },
 *     rotation: {
 *         enabled: false
 *     }
 * };
 * pluckObject(tools, "enabled") returns {
 *     translation: true
 *     rotation: false
 * }
 */
function pluckObject(object, subKey) {
    return _.object(_.map(object, function (value, key) {
        return [key, value[subKey]];
    }));
}


var defaultGraphProps = function(setProps, boxSize) {
    setProps = setProps || {};
    var labels = setProps.labels || ["x", "y"];
    var range = setProps.range || [[-10, 10], [-10, 10]];
    var step = setProps.step || [1, 1];
    var gridStep = setProps.gridStep ||
               getGridStep(range, step, boxSize);
    return {
        box: [boxSize, boxSize],
        labels: labels,
        range: range,
        step: step,
        gridStep: gridStep,
        valid: true,
        backgroundImage: defaultBackgroundImage,
        markings: "grid",
        showProtractor: false
    };
};

var defaultTransformerProps = {
    gradeEmpty: false,
    graphMode: "interactive",
    listMode: "dynamic",
    tools: {
        translation: {
            enabled: true,
            required: false,
            constraints: {}
        },
        rotation: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coord: [1, 6]
        },
        reflection: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coords: [[2, -4], [2, 2]]
        },
        dilation: {
            enabled: true,
            required: false,
            constraints: {
                fixed: false
            },
            coord: [6, 6]
        }
    },
    drawSolutionShape: true,
    starting: {
        shape: {
            type: "polygon-3",
            coords: [[2, 2], [2, 6], [7, 2]],
        },
        transformations: []
    },
    correct: {
        shape: {
            type: "polygon-3",
            coords: [[2, 2], [2, 6], [7, 2]],
        },
        transformations: []
    }
};

function colorForTool(tool) {
    return tool.constraints.fixed ? KhanUtil.DYNAMIC
                                  : KhanUtil.INTERACTIVE;
}


/* Scales a distance from the default range of
 * [-10, 10] to a given props.range pair
 *
 * Used for sizing various transformation tools
 * (rotation handle, dilation circle)
 */
function scaleToRange(dist, range) {
    var spreadX = range[0][1] - range[0][0];
    var spreadY = range[1][1] - range[1][0];

    return dist * Math.max(spreadX, spreadY) / 20;
}

function dilatePointFromCenter(point, dilationCenter, scale) {
    var pv = KhanUtil.kvector.subtract(point, dilationCenter);
    var pvScaled = KhanUtil.kvector.scale(pv, scale);
    var transformedPoint = KhanUtil.kvector.add(dilationCenter, pvScaled);
    return transformedPoint;
}

// TODO(jack): i18nize this
function stringFromDecimal(number) {
    return String(KhanUtil.roundTo(9, number));
}

function stringFromFraction(number) {
    var frac = KhanUtil.toFraction(number, knumber.DEFAULT_TOLERANCE);
    if (frac[1] === 1) {
        return stringFromDecimal(number);
    } else {
        return stringFromDecimal(frac[0]) + "/" +
                stringFromDecimal(frac[1]);
    }
}

function texFromPoint(point) {
    return [
        TeX(null, "("),
        stringFromDecimal(point[0]),
        TeX(null, ", {}"),
        stringFromDecimal(point[1]),
        TeX(null, ")")
    ];
}

function texFromVector(vector) {
    return [
        TeX(null, "\\langle"),
        stringFromDecimal(vector[0]),
        TeX(null, ", {}"),
        stringFromDecimal(vector[1]),
        TeX(null, "\\rangle")
    ];
}

function texFromAngleDeg(angleDeg) {
    return stringFromDecimal(angleDeg) + DEGREE_SIGN;
}

function orderInsensitiveCoordsEqual(coords1, coords2) {
    coords1 = _.clone(coords1).sort(kpoint.compare);
    coords2 = _.clone(coords2).sort(kpoint.compare);
    return _.all(_.map(coords1, function(coord1, i) {
        var coord2 = coords2[i];
        return kpoint.equal(coord1, coord2);
    }));
}



/* Perform operations on raw transform objects */
var TransformOps = {
    apply: function(transform) {
        // Any transformation with empty text boxes is a no-op until
        // filled out (these show up as nulls in transform.vector/line/etc).
        // TODO (jack): Merge this just into reflections now that other
        // transforms are always valid (after merging transformation
        // collapsing, which may use isValid)
        if (!Transformations[transform.type].isValid(transform)) {
            return _.identity;  // do not transform the coord
        } else {
            return Transformations[transform.type].apply(transform);
        }
    },

    append: function(transformList, newTransform) {
        // Append newTransform to transformList, and collapse the last
        // two transforms if they are collapsable
        var results = TransformOps._appendAndCollapseLastTwo(
            transformList,
            newTransform
        );
        // Collapse any no-ops at the end of the transformation list
        return TransformOps._collapseFinalNoOps(results);
    },

    _collapseFinalNoOps: function(transforms) {
        // Collapse no-op transformations at the end of the list
        if (transforms.length && TransformOps.isNoOp(_.last(transforms))) {
            return _.initial(transforms);
        } else {
            return transforms;
        }
    },

    _appendAndCollapseLastTwo: function(transformList, newTransform) {
        if (!transformList.length) {
            return [newTransform];
        } else {
            var collapsed = TransformOps.collapse(
                _.last(transformList),
                newTransform
            );
            return _.initial(transformList).concat(collapsed);
        }
    },

    isNoOp: function(transform) {
        return Transformations[transform.type].isNoOp(transform);
    },

    collapse: function(transform1, transform2) {
        // We can only collapse transforms that have the same type
        if (transform1.type !== transform2.type) {
            return [transform1, transform2];
        }

        // Clicking the button again removes empty transformations
        if (TransformOps.isEmpty(transform1) &&
                TransformOps.isEmpty(transform2)) {
            return [];
        }

        // Don't collapse invalid transformations otherwise
        if (!TransformOps.isValid(transform1) ||
                !TransformOps.isValid(transform2)) {
            return [transform1, transform2];
        }

        return TransformOps._collapseValidMonotypedTransforms(
            transform1,
            transform2
        );
    },

    isValid: function(transform) {
        return Transformations[transform.type].isValid(transform);
    },

    isEmpty: function(transform) {
        return Transformations[transform.type].isEmpty(transform);
    },

    _collapseValidMonotypedTransforms: function(transform1, transform2) {
        var collapsed = Transformations[transform1.type].collapse(
            transform1,
            transform2
        );
        if (collapsed) {
            // Force all answers into an array
            if (!_.isArray(collapsed)) {
                collapsed = [collapsed];
            }
            // Add types to all transforms in the answer
            _.each(collapsed, function(transform) {
                transform.type = transform1.type;
            });
            return collapsed;
        } else {
            // These transforms can't be collapsed together
            return [transform1, transform2];
        }
    },

    toTeX: function(transform) {
        return Transformations[transform.type].toTeX(transform);
    },

    /* A react representation of this transform object */
    ListItem: React.createClass({displayName: 'ListItem',
        render: function() {
            if (this.props.mode === "dynamic") {
                return React.DOM.div(null, 
                    TransformOps.toTeX(this.props.transform)
                );
            } else if (this.props.mode === "interactive") {
                var transformClass =
                        Transformations[this.props.transform.type].Input;
                return transformClass(_.extend({
                    ref: "transform",
                    onChange: this.handleChange
                }, this.props.transform));
            } else {
                throw new Error("Invalid mode: " + this.props.mode);
            }
        },
        value: function() {
            if (this.props.mode === "interactive") {
                return _.extend({
                    type: this.props.transform.type,
                }, this.refs.transform.value());
            } else {
                return this.props.transform;
            }
        },
        handleChange: _.debounce(function() {
            this.props.onChange(this.value());
        }, RENDER_TRANSFORM_DELAY_IN_MS),
        focus: function() {
            this.refs.transform.focus();
        },

        statics: {
            displayMode: "block"
        }
    })
};

var Transformations = {
    translation: {
        // I18N: As in the command, "Translate the polygon"
        verbName: $._("Translate"),
        nounName: $._("Translation"),
        lowerNounName: $._("translation"),
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kvector.add(coord, transform.vector);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.vector[0]) &&
                _.isFinite(transform.vector[1]);
        },
        isEmpty: function(transform) {
            return transform.vector[0] === null &&
                transform.vector[1] === null;
        },
        isNoOp: function(transform) {
            return kvector.equal(transform.vector, [0, 0]);
        },
        collapse: function(transform1, transform2) {
            return {
                vector: kvector.add(
                    transform1.vector,
                    transform2.vector
                )
            };
        },
        toTeX: function(transform) {
            // I18N: As in the command, "Translation by <3, 1>"
            return $_( {vector:texFromVector(transform.vector)}, 
                "Translation by %(vector)s"
            );
        },
        Input: React.createClass({displayName: 'Input',
            getInitialState: function() {
                return {
                    vector: this.props.vector || [null, null]
                };
            },
            componentDidUpdate: function(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({vector: this.props.vector});
                }
            },
            render: function() {
                var vector = [
                    TeX(null, "\\langle"),
                    NumberInput(
                        {ref:"x",
                        placeholder:0,
                        value:this.state.vector[0],
                        useArrowKeys:true,
                        onChange:function(val0)  {
                            var val1 = this.state.vector[1];
                            this.setState({vector: [val0, val1]});
                            this.props.onChange();
                        }.bind(this)} ),
                    TeX(null, ", {}"),
                    NumberInput(
                        {ref:"y",
                        placeholder:0,
                        value:this.state.vector[1],
                        useArrowKeys:true,
                        onChange:function(val1)  {
                            var val0 = this.state.vector[0];
                            this.setState({vector: [val0, val1]});
                            this.props.onChange();
                        }.bind(this)} ),
                    TeX(null, "\\rangle")
                ];
                return React.DOM.div(null, 
                    $_( {vector:vector}, 
                        "Translation by %(vector)s"
                    )
                );
            },
            value: function() {
                var x = this.refs.x.getValue();
                var y = this.refs.y.getValue();
                return {
                    vector: [x, y]
                };
            },
            focus: function() {
                this.refs.x.focus();
            }
        })
    },

    rotation: {
        // I18N: As in the command, "Rotate the polygon"
        verbName: $._("Rotate"),
        nounName: $._("Rotation"),
        lowerNounName: $._("rotation"),
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kpoint.rotateDeg(coord, transform.angleDeg,
                        transform.center);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.angleDeg) &&
                _.isFinite(transform.center[0]) &&
                _.isFinite(transform.center[1]);
        },
        isEmpty: function(transform) {
            return transform.angleDeg === null &&
                transform.center[0] === null &&
                transform.center[1] === null;
        },
        isNoOp: function(transform) {
            return knumber.equal(transform.angleDeg, 0);
        },
        collapse: function(transform1, transform2) {
            if (!kpoint.equal(transform1.center, transform2.center)) {
                return false;
            }
            return {
                center: transform1.center,
                angleDeg: transform1.angleDeg + transform2.angleDeg
            };
        },
        toTeX: function(transform) {
            return $_( {degrees:texFromAngleDeg(transform.angleDeg),
                       point:texFromPoint(transform.center)}, 
                "Rotation by %(degrees)s about %(point)s"
            );
        },
        Input: React.createClass({displayName: 'Input',
            getInitialState: function() {
                return {
                    center: this.props.center || [null, null],
                    angleDeg: this.props.angleDeg || null
                };
            },
            componentDidUpdate: function(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({
                        center: this.props.center,
                        angleDeg: this.props.angleDeg
                    });
                }
            },
            render: function() {
                var point = [
                    TeX(null, "("),
                    NumberInput(
                        {ref:"centerX",
                        placeholder:0,
                        value:this.state.center[0],
                        useArrowKeys:true,
                        onChange:function(val0)  {
                            var val1 = this.state.center[1];
                            this.setState({center: [val0, val1]});
                            this.props.onChange();
                        }.bind(this)} ),
                    TeX(null, ", {}"),
                    NumberInput(
                        {ref:"centerY",
                        placeholder:0,
                        value:this.state.center[1],
                        useArrowKeys:true,
                        onChange:function(val1)  {
                            var val0 = this.state.center[0];
                            this.setState({center: [val0, val1]});
                            this.props.onChange();
                        }.bind(this)} ),
                    TeX(null, ")")
                ];
                var degrees = [
                    NumberInput(
                        {ref:"angleDeg",
                        placeholder:0,
                        value:this.state.angleDeg,
                        useArrowKeys:true,
                        onChange:function(val)  {
                            this.setState({angleDeg: val});
                            this.props.onChange();
                        }.bind(this)} ),
                    DEGREE_SIGN
                ];
                // I18N: %(point)s must come before %(degrees)s in this phrase
                var text = $_( {point:point, degrees:degrees}, 
                    "Rotation about %(point)s by %(degrees)s"
                );

                return React.DOM.div(null, text);
            },
            value: function() {
                var angleDeg = this.refs.angleDeg.getValue();
                var centerX = this.refs.centerX.getValue();
                var centerY = this.refs.centerY.getValue();
                return {
                    angleDeg: angleDeg,
                    center: [centerX, centerY]
                };
            },
            focus: function() {
                this.refs.centerX.focus();
            }
        })
    },

    reflection: {
        // I18N: As in the command, "Reflect the polygon"
        verbName: $._("Reflect"),
        nounName: $._("Reflection"),
        lowerNounName: $._("reflection"),
        apply: function(transform) {
            return function(coord) {
                return KhanUtil.kpoint.reflectOverLine(
                    coord,
                    transform.line
                );
            };
        },
        isValid: function(transform) {
            // A bit hacky, but we'll also define reflecting over a
            // single point as a no-op, to avoid NaN fun.
            return _.all(_.flatten(transform.line), _.isFinite) &&
                    !kpoint.equal(transform.line[0], transform.line[1]);
        },
        isEmpty: function(transform) {
            return _.all(_.flatten(transform.line), _.isNull);
        },
        isNoOp: function(transform) {
            // Invalid transforms are implicitly no-ops, so we don't
            // have to catch that case here.
            return false;
        },
        collapse: function(transform1, transform2) {
            if (!kline.equal(transform1.line, transform2.line)) {
                return false;
            }
            return [];
        },
        toTeX: function(transform) {
            var point1 = transform.line[0];
            var point2 = transform.line[1];
            return $_( {point1:texFromPoint(point1),
                       point2:texFromPoint(point2)}, 
                "Reflection over the line from %(point1)s to %(point2)s"
            );
        },
        Input: React.createClass({displayName: 'Input',
            getInitialState: function() {
                return {
                    line: this.props.line || [[null, null], [null, null]]
                };
            },
            componentDidUpdate: function(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({line: this.props.line});
                }
            },
            render: function() {
                var point1 = [TeX(null, "("),
                    NumberInput(
                        {ref:"x1",
                        value:this.state.line[0][0],
                        useArrowKeys:true,
                        onChange:this.changePoint.bind(this, 0, 0)} ),
                    TeX(null, ", {}"),
                    NumberInput(
                        {ref:"y1",
                        value:this.state.line[0][1],
                        useArrowKeys:true,
                        onChange:this.changePoint.bind(this, 0, 1)} ),
                    TeX(null, ")")
                ];
                var point2 = [TeX(null, "("),
                    NumberInput(
                        {ref:"x2",
                        value:this.state.line[1][0],
                        useArrowKeys:true,
                        onChange:this.changePoint.bind(this, 1, 0)} ),
                    TeX(null, ", {}"),
                    NumberInput(
                        {ref:"y2",
                        value:this.state.line[1][1],
                        useArrowKeys:true,
                        onChange:this.changePoint.bind(this, 1, 1)} ),
                    TeX(null, ")")
                ];
                return React.DOM.div(null, 
                    $_( {point1:point1, point2:point2}, 
                        "Reflection over the line from %(point1)s to %(point2)s"
                    )
                );
            },
            changePoint: function(i, j, val) {
                var line = _.map(this.state.line, _.clone);
                line[i][j] = val;
                this.setState({line: line});
                this.props.onChange();
            },
            value: function() {
                var x1 = this.refs.x1.getValue();
                var y1 = this.refs.y1.getValue();
                var x2 = this.refs.x2.getValue();
                var y2 = this.refs.y2.getValue();
                return {
                    line: [[x1, y1], [x2, y2]]
                };
            },
            focus: function() {
                this.refs.x1.focus();
            }
        })
    },

    dilation: {
        // I18N: As in the command, "Dilate the polygon"
        verbName: $._("Dilate"),
        nounName: $._("Dilation"),
        lowerNounName: $._("dilation"),
        apply: function(transform) {
            return function(coord) {
                return dilatePointFromCenter(coord, transform.center,
                        transform.scale);
            };
        },
        isValid: function(transform) {
            return _.isFinite(transform.scale) &&
                _.isFinite(transform.center[0]) &&
                _.isFinite(transform.center[1]);
        },
        isEmpty: function(transform) {
            return transform.scale === null &&
                transform.center[0] === null &&
                transform.center[1] === null;
        },
        isNoOp: function(transform) {
            return knumber.equal(transform.scale, 1);
        },
        collapse: function(transform1, transform2) {
            if (!kpoint.equal(transform1.center, transform2.center)) {
                return false;
            }
            return {
                center: transform1.center,
                scale: transform1.scale * transform2.scale
            };
        },
        toTeX: function(transform) {
            var scaleString = stringFromFraction(transform.scale);
            return $_( {scale:scaleString,
                       point:texFromPoint(transform.center)}, 
                "Dilation of scale %(scale)s about %(point)s"
            );
        },
        Input: React.createClass({displayName: 'Input',
            getInitialState: function() {
                return {
                    center: this.props.center || [null, null],
                    scale: this.props.scale || null
                };
            },
            componentDidUpdate: function(prevProps) {
                if (!deepEq(this.props, prevProps)) {
                    this.setState({
                        center: this.props.center,
                        scale: this.props.scale
                    });
                }
            },
            render: function() {
                var point = [TeX(null, "("),
                    NumberInput(
                        {ref:"x",
                        placeholder:0,
                        value:this.state.center[0],
                        useArrowKeys:true,
                        onChange:function(val0)  {
                            var val1 = this.state.center[1];
                            this.setState({center: [val0, val1]});
                            this.props.onChange();
                        }.bind(this)} ),
                    TeX(null, ", {}"),
                    NumberInput(
                        {ref:"y",
                        placeholder:0,
                        value:this.state.center[1],
                        useArrowKeys:true,
                        onChange:function(val1)  {
                            var val0 = this.state.center[0];
                            this.setState({center: [val0, val1]});
                            this.props.onChange();
                        }.bind(this)} ),
                    TeX(null, ")")
                ];
                var scale = NumberInput(
                    {ref:"scale",
                    placeholder:1,
                    value:this.state.scale,
                    useArrowKeys:true,
                    onChange:function(val)  {
                            this.setState({scale: val});
                            this.props.onChange();
                        }.bind(this)} );
                return React.DOM.div(null, 
                    $_( {point:point, scale:scale}, 
                        "Dilation about %(point)s by %(scale)s"
                    )
                );
            },
            value: function() {
                var scale = this.refs.scale.getValue();
                var x = this.refs.x.getValue();
                var y = this.refs.y.getValue();
                return {
                    scale: scale,
                    center: [x, y]
                };
            },
            focus: function() {
                this.refs.x.focus();
            }
        })
    }
};


/* Various functions to deal with different shape types */
var ShapeTypes = {
    getPointCountForType: function(type) {
        var splitType = type.split("-");
        if (splitType[0] === "polygon") {
            return splitType[1] || 3;
        } else if (splitType[0] === "line" ||
                splitType[0] === "lineSegment") {
            return 2;
        } else if (splitType[0] === "angle") {
            return 3;
        } else if (splitType[0] === "circle") {
            return 2;
        } else if (splitType[0] === "point") {
            return 1;
        }
    },

    addMovableShape: function(graphie, options) {
        if (options.editable && options.translatable) {
            throw new Error("It doesn't make sense to have a movable shape " +
                    "where you can stretch the points and translate them " +
                    "simultaneously. options: " + JSON.stringify(options));
        }

        var shape;
        var points = _.map(options.shape.coords, function(coord) {
            var currentPoint;
            var isMoving = false;
            var previousCoord = coord;

            var onMove = function(x, y) {
                if (!isMoving) {
                    previousCoord = currentPoint.coord;
                    isMoving = true;
                }

                var moveVector = KhanUtil.kvector.subtract(
                    [x, y],
                    currentPoint.coord
                );

                // Translate from (x, y) semantics to (dX, dY) semantics
                // This is more useful for translations on multiple points,
                // where we care about how the points moved, not where any
                // individual point ended up
                if (options.onMove) {
                    moveVector = options.onMove(moveVector[0],
                            moveVector[1]);
                }

                // Perform a translation on all points in this shape when
                // any point moves
                if (options.translatable) {
                    _.each(points, function(point) {
                        // The point itself will be updated by the
                        // movablePoint class, so only translate the other
                        // points
                        if (point !== currentPoint) {
                            point.setCoord(KhanUtil.kvector.add(
                                point.coord,
                                moveVector
                            ));
                        }
                    });
                }

                // Update our shape and our currentPoint
                // Without this, some shapes (circles, angles) appear
                // "bouncy" as they are updated with currentPoint at the
                // current mouse coordinate (oldCoord), rather than newCoord
                var oldCoord = currentPoint.coord;
                var newCoord = KhanUtil.kvector.add(
                    currentPoint.coord,
                    moveVector
                );
                // Temporarily change our coordinate so that
                // shape.update() sees the new coordinate
                currentPoint.coord = newCoord;
                shape.update();
                // ...But don't break onMove, which assumes it
                // is the only thing changing our coord
                currentPoint.coord = oldCoord;
                return newCoord;
            };

            var onMoveEnd = function() {
                // onMove isn't guaranteed to be called before onMoveEnd, so
                // we have to take into account that we may not have moved and
                // set previousCoord.
                if (options.onMoveEnd && isMoving) {
                    isMoving = false;
                    // We don't use the supplied x and y parameters here
                    // because MovablePoint's onMoveEnd semantics suck.
                    // It returns the mouseX, mouseY without processing them
                    // through onMove, leaving us with weird fractional moves
                    var change = KhanUtil.kvector.subtract(
                        currentPoint.coord,
                        previousCoord
                    );
                    options.onMoveEnd(change[0], change[1]);
                }
                shape.update();
            };

            currentPoint = graphie.addMovablePoint({
                coord: coord,
                normalStyle: options.normalPointStyle,
                highlightStyle: options.highlightPointStyle,
                constraints: {
                    fixed: !options.translatable && !options.editable
                },
                visible: options.showPoints,
                snapX: options.snap && options.snap[0] || 0,
                snapY: options.snap && options.snap[1] || 0,
                bounded: false, // Don't bound it when placing it on the graph
                onMove: onMove,
                onMoveEnd: onMoveEnd
            });

            // Bound it when moving
            // We can't set this earlier, because doing so would mean any
            // points outside of the graph would be moved into a moved into
            // a position that doesn't preserve the shape
            currentPoint.bounded = true;

            return currentPoint;
        });

        shape = ShapeTypes.addShape(graphie, options, points);
        var removeShapeWithoutPoints = shape.remove;
        shape.remove = function() {
            removeShapeWithoutPoints.apply(shape);
            _.invoke(points, "remove");
        };
        return shape;
    },

    addShape: function(graphie, options, points) {
        points = points || options.shape.coords;

        var types = ShapeTypes._typesOf(options.shape);
        var typeOptions = options.shape.options ||
                ShapeTypes.defaultOptions(types);

        var shapes = ShapeTypes._mapTypes(types, points,
                function(type, points, i) {
            var shapeOptions = _.extend({}, options, typeOptions[i]);
            return ShapeTypes._addType(graphie, type, points, shapeOptions);
        });

        var updateFuncs = _.filter(_.pluck(shapes, "update"), _.identity);
        var update = function() {
            _.invoke(updateFuncs, "call");
        };

        var removeFuncs = _.filter(_.pluck(shapes, "remove"), _.identity);
        var remove = function() {
            _.invoke(removeFuncs, "call");
        };

        var getOptions = function() {
            return _.map(shapes, function(shape) {
                if (shape.getOptions) {
                    return shape.getOptions();
                } else {
                    return {};
                }
            });
        };

        var toJSON = function() {
            var coords = _.map(points, function(pt) {
                if (_.isArray(pt)) {
                    return pt;
                } else {
                    return pt.coord;
                }
            });
            return {
                type: types,
                coords: coords,
                options: getOptions()
            };
        };

        return {
            type: types,
            points: points,
            update: update,
            remove: remove,
            toJSON: toJSON,
            getOptions: getOptions
        };
    },

    equal: function(shape1, shape2) {
        var types1 = ShapeTypes._typesOf(shape1);
        var types2 = ShapeTypes._typesOf(shape2);
        if (types1.length !== types2.length) {
            return false;
        }
        var shapes1 = ShapeTypes._mapTypes(types1, shape1.coords,
                ShapeTypes._combine);
        var shapes2 = ShapeTypes._mapTypes(types2, shape2.coords,
                ShapeTypes._combine);
        return _.all(_.map(shapes1, function(partialShape1, i) {
            var partialShape2 = shapes2[i];
            if (partialShape1.type !== partialShape2.type) {
                return false;
            }
            return ShapeTypes._forType(partialShape1.type).equal(
                partialShape1.coords,
                partialShape2.coords
            );
        }));
    },

    _typesOf: function(shape) {
        var types = shape.type;
        if (!_.isArray(types)) {
            types = [types];
        }
        return _.map(types, function(type) {
            if (type === "polygon") {
                return "polygon-3";
            } else {
                return type;
            }
        });
    },

    defaultOptions: function(types) {
        return _.map(types, function(type) {
            var typeDefaultOptions = ShapeTypes._forType(type).defaultOptions;
            return _.extend({}, typeDefaultOptions);
        });
    },

    _forType: function(type) {
        var baseType = type.split("-")[0];
        return ShapeTypes[baseType];
    },

    _mapTypes: function(types, points, func, context) {
        return _.map(types, function(type, i) {
            var pointCount = ShapeTypes.getPointCountForType(type);
            var currentPoints = _.first(points, pointCount);
            points = _.rest(points, pointCount);
            return func.call(context, type, currentPoints, i);
        });
    },

    _addType: function(graphie, type, points, options) {
        var lineCoords = _.isArray(points[0]) ? {
            coordA: points[0],
            coordZ: points[1],
        } : {
            pointA: points[0],
            pointZ: points[1],
        };

        type = type.split("-")[0];
        if (type === "polygon") {
            var polygon = graphie.addMovablePolygon(_.extend({}, options, {
                fixed: !options.editable,
                snapX: options.snap && options.snap[0] || 0,
                snapY: options.snap && options.snap[1] || 0,
                points: points,
                constrainToGraph: false
            }));
            return {
                update: polygon.transform.bind(polygon),
                remove: polygon.remove.bind(polygon)
            };
        } else if (type === "line" || type === "lineSegment") {
            var line = graphie.addMovableLineSegment(
                    _.extend({}, options, lineCoords, {
                movePointsWithLine: true,
                fixed: true,
                constraints: {
                    fixed: true
                },
                extendLine: (type === "line")
            }));

            // TODO(jack): Hide points on uneditable lines when translation
            // is a vector.
            // We can't just remove the points yet, because they are the
            // translation handle for the line.
            return {
                update: line.transform.bind(line, true),
                remove: line.remove.bind(line)
            };
        } else if (type === "angle") {
            // If this angle is editable, we want to be able to make angles
            // both larger and smaller than 180 degrees.
            // If this angle is not editable, it should always maintain
            // it's angle measure, even if it is reflected (causing the
            // clockwise-ness of the points to change)
            var shouldChangeReflexivity = options.editable ? null : false;

            var angle = graphie.addMovableAngle({
                angleLabel: "$deg0",
                fixed: true,
                points: points,
                normalStyle: options.normalStyle,
                reflex: options.reflex
            });

            // Hide non-vertex points on uneditable angles
            if (!_.isArray(points[0]) && !options.editable) {
                points[0].remove();
                points[2].remove();
            }
            return {
                update: angle.update.bind(angle, shouldChangeReflexivity),
                remove: angle.remove.bind(angle),
                getOptions: function() {
                    return {
                        reflex: angle.isReflex()
                    };
                }
            };
        } else if (type === "circle") {
            var perimeter = {
                // temporary object for the first removal
                remove: _.identity
            };
            var redrawPerim = function() {
                var coord0 = points[0].coord || points[0];
                var coord1 = points[1].coord || points[1];
                var radius = kpoint.distanceToPoint(coord0, coord1);
                perimeter.remove();
                perimeter = graphie.circle(coord0, radius, _.extend({
                    stroke: KhanUtil.DYNAMIC,
                    "stroke-width": 2,
                }, options.normalStyle));
            };

            redrawPerim();
            if (points[1].remove && !options.editable) {
                points[1].remove();
            }

            return {
                update: redrawPerim,
                remove: function() {
                    // Not _.bind because the remove function changes
                    // when the perimeter is redrawn
                    perimeter.remove();
                }
            };
        } else if (type === "point") {
            // do nothing
            return {
                update: null,
                remove: null
            };
        } else {
            throw new Error("Invalid shape type " + type);
        }
    },

    _combine: function(type, coords) {
        return {
            type: type,
            coords: coords
        };
    },

    polygon: {
        equal: orderInsensitiveCoordsEqual
    },

    line: {
        equal: kline.equal
    },

    lineSegment: {
        equal: orderInsensitiveCoordsEqual
    },

    angle: {
        equal: function(points1, points2) {
            if (!kpoint.equal(points1[1], points2[1])) {
                return false;
            }

            var line1_0 = [points1[1], points1[0]];
            var line1_2 = [points1[1], points1[2]];
            var line2_0 = [points2[1], points2[0]];
            var line2_2 = [points2[1], points2[2]];

            var equalUnflipped = kray.equal(line1_0, line2_0) &&
                    kray.equal(line1_2, line2_2);
            var equalFlipped = kray.equal(line1_0, line2_2) &&
                    kray.equal(line1_2, line2_0);

            return equalUnflipped || equalFlipped;
        },

        defaultOptions: {
            reflex: false
        }
    },

    circle: {
        equal: function(points1, points2) {
            var radius1 = kpoint.distanceToPoint(points1[0], points1[1]);
            var radius2 = kpoint.distanceToPoint(points2[0], points2[1]);
            return kpoint.equal(points1[0], points2[0]) &&
                knumber.equal(radius1, radius2);
        }
    },

    point: {
        equal: kpoint.equal
    }
};


var ToolSettings = React.createClass({displayName: 'ToolSettings',
    getDefaultProps: function() {
        return {
            allowFixed: true
        };
    },

    render: function() {
        return React.DOM.div(null, 
            this.props.name,":",' ',
            " ",
            PropCheckBox(
                {label:"enabled:",
                enabled:this.props.settings.enabled,
                onChange:this.props.onChange} ),
            " ",
            this.props.settings.enabled &&
                PropCheckBox(
                    {label:"required:",
                    required:this.props.settings.required,
                    onChange:this.props.onChange} ),
            
            this.props.settings.enabled &&
                InfoTip(null, 
                    "'Required' will only grade the answer as correct if the"+' '+
                    "student has used at least one such transformation."
                ),
            
            " ",
            this.props.allowFixed && this.props.settings.enabled &&
                PropCheckBox(
                    {label:"fixed:",
                    fixed:this.props.settings.constraints.fixed,
                    onChange:this.changeConstraints} ),
            
            this.props.allowFixed && this.props.settings.enabled &&
                InfoTip(null, 
                    "Enable 'fixed' to prevent the student from repositioning"+' '+
                    "the tool. The tool will appear in the position at which it"+' '+
                    "is placed in the editor below."
                )
            
        );
    },

    changeConstraints: function(changed) {
        var newConstraints = _.extend({}, this.props.constraints, changed);
        this.props.onChange({
            constraints: newConstraints
        });
    }
});


var TransformationExplorerSettings = React.createClass({displayName: 'TransformationExplorerSettings',
    render: function() {

        return React.DOM.div( {className:"transformer-settings"}, 
            React.DOM.div(null, 
                ' ',"Mode:",' ',
                React.DOM.select( {value:this.getMode(),
                        onChange:this.changeMode}, 
                    React.DOM.option( {value:"interactive,dynamic"}, 
                        ' ',"Exploration with text",' '
                    ),
                    React.DOM.option( {value:"interactive,static"}, 
                        ' ',"Exploration without text",' '
                    ),
                    React.DOM.option( {value:"dynamic,interactive"}, 
                        ' ',"Formal with movement",' '
                    ),
                    React.DOM.option( {value:"static,interactive"}, 
                        ' ',"Formal without movement",' '
                    )
                ),
                InfoTip(null, 
                    React.DOM.ul(null, 
                        React.DOM.li(null, 
                            React.DOM.b(null, "Exploration:"), " Students create"+' '+
                            "transformations with tools on the graph.",' '
                        ),
                        React.DOM.li(null, 
                            React.DOM.b(null, "Formal with movement:"), " Students specify"+' '+
                            "transformations mathematically in the"+' '+
                            "transformation list. Graph shows the results of"+' '+
                            "these transformations.",' '
                        ),
                        React.DOM.li(null, 
                            React.DOM.b(null, "Formal without movement:"), " Students specify"+' '+
                            "transformations mathematically in the"+' '+
                            "transformation list. Graph does not update.",' '
                        )
                    )
                )
            ),
            ToolSettings(
                    {name:"Translations",
                    settings:this.props.tools.translation,
                    allowFixed:false,
                    onChange:this.changeHandlerFor("translation")} ),
            ToolSettings(
                    {name:"Rotations",
                    settings:this.props.tools.rotation,
                    onChange:this.changeHandlerFor("rotation")} ),
            ToolSettings(
                    {name:"Reflections",
                    settings:this.props.tools.reflection,
                    onChange:this.changeHandlerFor("reflection")} ),
            ToolSettings(
                    {name:"Dilations",
                    settings:this.props.tools.dilation,
                    onChange:this.changeHandlerFor("dilation")} ),
            PropCheckBox(
                    {label:"Draw Solution:",
                    drawSolutionShape:this.props.drawSolutionShape,
                    onChange:this.props.onChange} )
        );
    },

    getMode: function() {
        return this.props.graphMode + "," + this.props.listMode;
    },

    changeMode: function(e) {
        var selected = e.target.value;
        var modes = selected.split(",");

        this.props.onChange({
            graphMode: modes[0],
            listMode: modes[1]
        });
    },

    changeHandlerFor: function(toolName) {
        return function(change)  {
            var newTools = _.clone(this.props.tools);
            newTools[toolName] = _.extend({}, this.props.tools[toolName],
                    change);

            this.props.onChange({
                tools: newTools
            });
        }.bind(this);
    }
});


var TransformationsShapeEditor = React.createClass({displayName: 'TransformationsShapeEditor',
    render: function() {
        return React.DOM.div(null, 
            Graph(
                {ref:"graph",
                box:this.props.graph.box,
                range:this.props.graph.range,
                labels:this.props.graph.labels,
                step:this.props.graph.step,
                gridStep:this.props.graph.gridStep,
                markings:this.props.graph.markings,
                backgroundImage:this.props.graph.backgroundImage,
                onNewGraphie:this.setupGraphie} ),
            React.DOM.select(
                    {key:"type-select",
                    value:this.getTypeString(this.props.shape.type),
                    onChange:this.changeType} , 
                React.DOM.option( {value:"polygon-3"}, "Triangle"),
                React.DOM.option( {value:"polygon-4"}, "Quadrilateral"),
                React.DOM.option( {value:"polygon-5"}, "Pentagon"),
                React.DOM.option( {value:"polygon-6"}, "Hexagon"),
                React.DOM.option( {value:"line"}, "Line"),
                React.DOM.option( {value:"line,line"}, "2 lines"),
                React.DOM.option( {value:"lineSegment"}, "Line segment"),
                React.DOM.option( {value:"lineSegment,lineSegment"}, 
                    ' ',"2 line segments",' '
                ),
                React.DOM.option( {value:"angle"}, "Angle"),
                React.DOM.option( {value:"circle"}, "Circle")
            )
        );
    },

    /* Return the option string for a given type */
    getTypeString: function(type) {
        if (_.isArray(type)) {
            return _.map(type, this.getTypeString).join(",");
        } else if (type === "polygon") {
            return "polygon-" + this.props.shape.coords.length;
        } else {
            return type;
        }
    },

    /* Change the type on the window event e
     *
     * e.target.value is the new type string
     */
    changeType: function(e) {
        var types = String(e.target.value).split(",");
        var pointCount = arraySum(_.map(
                types,
                ShapeTypes.getPointCountForType
        ));

        var radius = scaleToRange(4, this.refs.graph.props.range);
        var offset = (1 / 2 - 1 / pointCount) * 180;
        var coords = _.times(pointCount, function(i) {
            return KhanUtil.kpoint.rotateDeg([radius, 0],
                360 * i / pointCount + offset);
        });

        this.props.onChange({
            shape: {
                type: types,
                coords: coords,
                options: ShapeTypes.defaultOptions(types)
            }
        });
    },

    componentDidUpdate: function(prevProps) {
        if (!deepEq(prevProps.shape, this.props.shape)) {
            this.refs.graph.reset();
        }
    },

    updateCoords: function() {
        this.props.onChange({
            shape: this.shape.toJSON()
        });
    },

    setupGraphie: function(graphie) {
        this.shape = ShapeTypes.addMovableShape(graphie, {
            editable: true,
            snap: graphie.snap,
            shape: this.props.shape,
            onMoveEnd: this.updateCoords
        });
    },

});

var TransformationListItem = TransformOps.ListItem;

var TransformationList = React.createClass({displayName: 'TransformationList',
    render: function() {
        if (this.props.mode === "static") {
            return React.DOM.span(null );  // don't render anything
        }

        var transformationList = _.map(
            this.props.transformations,
            function(transform, i) {
                return TransformationListItem(
                            {ref:"transformation" + i,
                            key:"transformation" + i,
                            transform:transform,
                            mode:this.props.mode,
                            onChange:this.handleChange} );
            },
            this
        );

        return React.DOM.div( {className:"perseus-transformation-list"}, 
            transformationList
        );
    },

    _transformationRefs: function() {
        return _.times(this.props.transformations.length, function(i)  {
            return this.refs["transformation" + i];
        }.bind(this));
    },

    value: function() {
        return _.invoke(this._transformationRefs(), "value");
    },

    handleChange: function() {
        this.props.onChange(this.value());
    },

    focusLast: function() {
        var transformationRefs = this._transformationRefs();
        if (transformationRefs.length !== 0) {
            _.last(transformationRefs).focus();
        }
    }
});

var ToolButton = React.createClass({displayName: 'ToolButton',
    render: function() {
        var classes = this.props.toggled ?
            "simple-button exercise-orange toggled highlighted-tool-button" :
            "simple-button";

        return React.DOM.button(
                {type:"button",
                className:classes,
                onClick:this.props.onClick,
                onTouchStart:captureScratchpadTouchStart}, 
            this.props.children
        );
    }
});

var ToolsBar = React.createClass({displayName: 'ToolsBar',
    getInitialState: function() {
        return {
            selected: null
        };
    },

    render: function() {
        var tools = _.map(Transformations, function(tool, type) {
            if (this.props.enabled[type]) {
                return ToolButton(
                        {key:type,
                        toggled:this.state.selected === type,
                        onClick:this.changeSelected.bind(this, type)}, 
                    tool.verbName
                );
            }
        }, this);

        return React.DOM.div( {className:"transformer-tools-bar"}, 
            React.DOM.span( {className:"simple-button-group"}, 
                tools
            ),
            React.DOM.button(
                    {className:"transformer-undo-button simple-button",
                    type:"button",
                    onClick:this.props.onUndoClick,
                    onTouchStart:captureScratchpadTouchStart}, 
                React.DOM.span( {className:"icon-undo"} ),
                " ",
                "Undo"
            ),
            React.DOM.div( {className:"clear"})
        );
    },

    changeSelected: function(tool) {
        this.props.removeTool(this.state.selected);

        if (!tool || tool === this.state.selected) {
            this.setState({
                selected: null
            });
        } else {
            this.props.addTool(tool);
            this.setState({
                selected: tool
            });
        }
    }
});

var AddTransformBar = React.createClass({displayName: 'AddTransformBar',
    render: function() {
        var tools = _.map(Transformations, function(tool, type) {
            if (this.props.enabled[type]) {
                return ToolButton(
                        {key:type,
                        toggled:false,
                        onClick:this.changeSelected.bind(this, type)}, 
                    React.DOM.span( {className:"icon-plus"} ),
                    " ",
                    tool.nounName
                );
            }
        }, this);

        return React.DOM.div( {className:"transformer-tools-bar"}, 
            tools,
            React.DOM.button(
                    {className:"transformer-undo-button simple-button",
                    type:"button",
                    onClick:this.props.onUndoClick,
                    onTouchStart:captureScratchpadTouchStart}, 
                React.DOM.span( {className:"icon-undo"} ),
                " ",
                "Undo"
            ),
            React.DOM.div( {className:"clear"})
        );
    },

    changeSelected: function(tool) {
        if (tool) {
            this.props.addTool(tool);
        }
    }
});

var Transformer = React.createClass({displayName: 'Transformer',
    // TODO (jack): These should be refactored into a nice object at the top
    // so that we don't have all this duplication
    getDefaultProps: function() {
        return _.defaults({
            graph: {},
            transformations: []
        }, defaultTransformerProps);
    },

    render: function() {
        // Fill in any missing value in this.props.graph
        // this can happen because the graph json doesn't include
        // box, for example
        var graph = _.extend(
                defaultGraphProps(this.props.graph, defaultBoxSize),
                this.props.graph
        );

        var interactiveToolsMode = this.props.graphMode === "interactive";

        var ToolsBarClass = interactiveToolsMode ?
                ToolsBar :
                AddTransformBar;

        // This style is applied inline because it is dependent on the
        // size of the graph as set by the graph.box prop, and this also
        // lets us specify it in the same place the graph's width is
        // specified.
        var toolsBar = React.DOM.div( {style:{width: graph.box[0]}}, 
            ToolsBarClass(
                {ref:"toolsBar",
                enabled:pluckObject(this.props.tools, "enabled"),
                addTool:this.addTool,
                removeTool:this.removeTool,
                onUndoClick:this.handleUndoClick} )
        );

        return React.DOM.div( {className:"perseus-widget " +
                        "perseus-widget-transformer"}, 
            Graph(
                {ref:"graph",
                box:graph.box,
                range:graph.range,
                labels:graph.labels,
                step:graph.step,
                gridStep:graph.gridStep,
                markings:graph.markings,
                backgroundImage:graph.backgroundImage,
                showProtractor:graph.showProtractor,
                onNewGraphie:this.setupGraphie} ),

            !interactiveToolsMode && (
                "Add transformations below:"
            ),

            this.props.graphMode === "static" && [
                React.DOM.br( {key:"static-br"} ),
                React.DOM.em( {key:"static-nomove"}, 
                    ' ',"Note: For this question, the shape will not move.",' '
                )
            ],

            interactiveToolsMode && toolsBar,

            TransformationList(
                {ref:"transformationList",
                mode:this.props.listMode,
                transformations:this.props.transformations,
                onChange:this.setTransformationProps} ),

            !interactiveToolsMode && toolsBar

        );
    },

    componentDidUpdate: function(prevProps) {
        if (this.shouldSetupGraphie(this.props, prevProps)) {
            this.refs.graph.reset();
        } else if (!deepEq(this.props.transformations,
                this.transformations)) {
            this.setTransformations(this.props.transformations);
        }
    },

    shouldSetupGraphie: function(nextProps, prevProps) {
        if (!deepEq(prevProps.starting, nextProps.starting)) {
            return true;
        } else if (prevProps.graphMode !== nextProps.graphMode) {
            return true;
        } else if (prevProps.listMode !== nextProps.listMode) {
            return true;
        } else if (prevProps.drawSolutionShape !==
                nextProps.drawSolutionShape) {
            return true;
        } else if (nextProps.drawSolutionShape && !deepEq(
                prevProps.correct.shape, nextProps.correct.shape)) {
            return true;
        } else if (!deepEq(this.tools, nextProps.tools)) {
            return true;
        } else {
            return false;
        }
    },

    graphie: function() {
        return this.refs.graph.graphie();
    },

    setupGraphie: function() {
        var self = this;

        var graphie = this.graphie();

        // A background image of our solution:
        if (this.props.drawSolutionShape &&
                this.props.correct.shape &&
                this.props.correct.shape.coords) {
            ShapeTypes.addShape(graphie, {
                fixed: true,
                shape: self.props.correct.shape,
                normalStyle: {
                    stroke: KhanUtil.GRAY,
                    "stroke-dasharray": "",
                    "stroke-width": 2
                }
            });
        }

        this.currentTool = null;
        this.refs.toolsBar.changeSelected(null);
        this.addTransformerShape(this.props.starting.shape,
                /* translatable */ false);
        this.setTransformations(this.props.transformations);

        // Save a copy of our tools so that we can check future
        // this.props.tools changes against them
        // This seems weird, but gives us an easy way to tell whether
        // props changes were self-inflicted (for which a graphie reset
        // is not required, and is in fact a bad idea right now because
        // of resetting the size of the dilation tool).
        // TODO (jack): A deepClone method would be nice here
        this.tools = {
            translation: _.clone(this.props.tools.translation),
            rotation: _.clone(this.props.tools.rotation),
            reflection: _.clone(this.props.tools.reflection),
            dilation: _.clone(this.props.tools.dilation)
        };
    },

    /* Applies all transformations in `transformations`
     * to the starting shape, and updates this.transformations
     * to reflect this
     *
     * Usually called with this.props.transformations
     */
    setTransformations: function(transformations) {
        this.resetCoords();
        this.transformations = _.clone(transformations);
        _.each(this.transformations, this.applyTransform);
    },

    // the polygon that we transform
    addTransformerShape: function(shape, translatable) {
        var self = this;
        var graphie = this.graphie();

        this.shape = ShapeTypes.addMovableShape(graphie, {
            shape: shape,
            editable: false,
            showPoints: (this.props.graphMode !== "static"),
            translatable: translatable,
            onMove: function (dX, dY) {
                dX = KhanUtil.roundToNearest(graphie.snap[0], dX);
                dY = KhanUtil.roundToNearest(graphie.snap[1], dY);
                self.addTransform({
                    type: "translation",
                    vector: [dX, dY]
                });
                return [dX, dY];
            },
            normalPointStyle: {
                fill: (translatable ? KhanUtil.INTERACTIVE
                                    : KhanUtil.DYNAMIC),
                stroke: (translatable ? KhanUtil.INTERACTIVE
                                      : KhanUtil.DYNAMIC)
            },
            highlightPointStyle: {
                fill: KhanUtil.INTERACTING,
                stroke: KhanUtil.INTERACTING
            }
        });
    },

    addTool: function(toolId) {
        var self = this;

        if (this.props.graphMode === "interactive") {
            if (toolId === "translation") {
                this.currentTool = this.addTranslationTool();
            } else if (toolId === "rotation") {
                this.currentTool = this.addRotationTool();
            } else if (toolId === "reflection") {
                this.currentTool = this.addReflectionTool();
            } else if (toolId === "dilation") {
                this.currentTool = this.addDilationTool();
            } else {
                throw new Error("Invalid tool id: " + toolId);
            }
        } else {
            var transform;
            if (toolId === "translation") {
                transform = {
                    type: toolId,
                    vector: [null, null]
                };
            } else if (toolId === "rotation") {
                transform = {
                    type: toolId,
                    center: [null, null],
                    angleDeg: null
                };
            } else if (toolId === "reflection") {
                // Reflections with nulls in them won't be applied until
                // fills in the blanks
                transform = {
                    type: toolId,
                    line: [[null, null], [null, null]]
                };
            } else if (toolId === "dilation") {
                transform = {
                    type: toolId,
                    center: [null, null],
                    scale: null
                };
            } else {
                throw new Error("Invalid tool id: " + toolId);
            }

            this.doTransform(transform, function() {
                self.refs.transformationList.focusLast();
            });
        }
    },

    removeTool: function(toolId) {
        if (this.currentTool) {
            this.currentTool.remove();
        }
        this.currentTool = null;
    },

    addTranslationTool: function() {
        var self = this;
        this.shape.remove();
        this.addTransformerShape(this.shape.toJSON(),
                /* translatable */ true);

        return {
            remove: function() {
                self.shape.remove();
                self.addTransformerShape(self.shape.toJSON(),
                        /* translatable */ false);
            }
        };
    },

    // Snaps a coord to this.graphie()'s snap
    snapCoord: function(coord) {
        var graphie = this.graphie();
        return _.map(coord, function (val, dim) {
            return KhanUtil.roundToNearest(graphie.snap[dim], val);
        });
    },

    // Normalize the coords into something that fits the new 45 degree
    // reflection line.
    normalizeReflectionCoords: function(messyCoords) {
        var midpoint = this.snapCoord(kline.midpoint(messyCoords));
        var origDirectionPolar = kvector.polarDegFromCart(
            kvector.subtract(messyCoords[0], messyCoords[1])
        );
        var directionPolar = [
            1,
            KhanUtil.roundToNearest(45, origDirectionPolar[1])
        ];
        var direction = kvector.cartFromPolarDeg(directionPolar);
        var coords = _.map([-1, 1], function(directionCoefficient) {
            var coord = kvector.add(
                midpoint,
                kvector.scale(
                    direction,
                    directionCoefficient *
                        this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST)
                )
            );
            return this.snapCoord(coord);
        }, this);
        return coords;
    },

    addReflectionTool: function() {
        var options = this.props.tools.reflection;
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();

        var updateReflectionTool = function() {
            self.changeTool("reflection", {
                coords: _.pluck(reflectPoints, "coord")
            });
        };

        var coords = this.normalizeReflectionCoords(options.coords);

        // The points defining the line of reflection; hidden from the
        // user.
        var reflectPoints = _.map(coords, function(coord) {
            return graphie.addMovablePoint({
                coord: coord,
                visible: false
            });
        }, this);

        // the line of reflection
        // TODO(jack): graphie.style here is a hack to prevent the dashed
        // style from leaking into the rest of the shapes. Remove when
        // graphie.addMovableLineSegment doesn't leak styles anymore.
        var reflectLine;
        var normalColor = colorForTool(options);
        graphie.style({}, function() {
            reflectLine = graphie.addMovableLineSegment({
                fixed: options.constraints.fixed,
                constraints: options.constraints,
                pointA: reflectPoints[0],
                pointZ: reflectPoints[1],
                snapX: graphie.snap[0],
                snapY: graphie.snap[1],
                extendLine: true,
                normalStyle: {
                    "stroke": normalColor,
                    "stroke-width": 2,
                    "stroke-dasharray": "- "
                },
                highlightStyle: {
                    "stroke": KhanUtil.INTERACTING,
                    "stroke-width": 2,
                    "stroke-dasharray": "- " // TODO(jack) solid doesn't
                                             // work here, but would be
                                             // nicer
                },
                movePointsWithLine: true,
                onMoveEnd: updateReflectionTool
            });
        });

        // the "button" point in the center of the line of reflection
        var reflectButton = graphie.addReflectButton({
            fixed: options.constraints.fixed,
            line: reflectLine,
            size: this.scaleToCurrentRange(REFLECT_BUTTON_SIZE),
            onClick: function() {
                self.doTransform({
                    type: "reflection",
                    line: _.pluck(reflectPoints, "coord")
                });
                if (reflectRotateHandle) {
                    // flip the rotation handle
                    reflectRotateHandle.setCoord(kvector.add(
                        reflectButton.coord,
                        kvector.subtract(
                            reflectButton.coord,
                            reflectRotateHandle.coord
                        )
                    ));
                    reflectRotateHandle.update();
                }
            },
            normalStyle: {
                stroke: normalColor,
                "stroke-width": 2,
                fill: normalColor
            },
            highlightStyle: {
                stroke: KhanUtil.INTERACTING,
                "stroke-width": 3,
                fill: KhanUtil.INTERACTING
            },
            onMoveEnd: updateReflectionTool
        });

        var reflectRotateHandle = null;
        if (!options.constraints.fixed) {
            // The rotation handle for rotating the line of reflection
            var initRotateHandleAngle = kvector.polarDegFromCart(
                kvector.subtract(
                    reflectPoints[1].coord,
                    reflectPoints[0].coord
                )
            )[1] + 90; // 90 degrees off of the line
            reflectRotateHandle = graphie.addRotateHandle({
                center: reflectButton,
                radius: this.scaleToCurrentRange(REFLECT_ROTATE_HANDLE_DIST),
                angleDeg: initRotateHandleAngle,
                width: this.scaleToCurrentRange(0.24),
                hoverWidth: this.scaleToCurrentRange(0.4),
                lengthAngle: 17,
                onMove: function(newAngle) {
                    return KhanUtil.roundToNearest(45, newAngle);
                },
                onMoveEnd: updateReflectionTool
            });
        }

        // Move the reflectButton and reflectRotateHandle with the line
        $(reflectLine).on("move",
                function() {
            reflectButton.update();
            $(reflectButton).trigger("move"); // update the rotation handle,
                    // which watches for this in ke/utils/interactive.js.
        });

        // Update the line and reflect button when the reflectRotateHandle is
        // rotated
        if (reflectRotateHandle) {
            $(reflectRotateHandle).on("move", function() {
                var rotateHandleApprox = self.snapCoord(
                    reflectRotateHandle.coord
                );

                var rotateVector = kvector.subtract(
                    rotateHandleApprox,
                    reflectButton.coord
                );

                var flipped = reflectButton.isFlipped() ? 1 : 0;
                reflectPoints[flipped].setCoord(kvector.add(
                    reflectButton.coord,
                    kvector.rotateDeg(rotateVector, 90)
                ));
                reflectPoints[1 - flipped].setCoord(kvector.add(
                    reflectButton.coord,
                    kvector.rotateDeg(rotateVector, -90)
                ));

                reflectLine.transform(true);
                reflectButton.update();
            });
        }

        return {
            remove: function() {
                reflectButton.remove();
                if (reflectRotateHandle) {
                    reflectRotateHandle.remove();
                }
                reflectLine.remove();
                reflectPoints[0].remove();
                reflectPoints[1].remove();
            }
        };
    },

    /* Scales a distance from the default range of
     * [-10, 10] to the current this.props.graph.range
     *
     * Used for sizing various transformation tools
     * (rotation handle, dilation circle)
     */
    scaleToCurrentRange: function(dist) {
        return scaleToRange(dist, this.refs.graph.props.range);
    },

    addRotationTool: function() {
        var options = this.props.tools.rotation;
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();

        var pointColor = colorForTool(options);
        // The center of our rotation, which can be moved to change the
        // center of rotation
        this.rotatePoint = graphie.addMovablePoint({
            constraints: options.constraints,
            coord: options.coord,
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            normalStyle: {               // ugh, this seems to be a global and
                "stroke-dasharray": "",  // is set to dash above
                stroke: pointColor,
                fill: pointColor
            },
            highlightStyle: {
                "stroke-dasharray": "",
                stroke: KhanUtil.INTERACTING,
                fill: KhanUtil.INTERACTING
            }
        });

        // The point that we move around the center of rotation to actually
        // cause rotations
        this.rotateHandle = graphie.addRotateHandle({
            center: this.rotatePoint,
            radius: this.scaleToCurrentRange(ROTATE_HANDLE_DIST),
            width: this.scaleToCurrentRange(0.24),
            hoverWidth: this.scaleToCurrentRange(0.4),
            onMove: function(newAngle, oldAngle) {
                var transform = self.getRotationTransformFromAngle(
                    self.rotatePoint.coord,
                    newAngle - oldAngle
                );

                // Rotate polygon with rotateHandle
                self.doTransform(transform);

                return oldAngle + transform.angleDeg;
            }
        });

        // Update tools.rotation.coord
        this.rotatePoint.onMoveEnd = function(x, y) {
            self.changeTool("rotation", {
                coord: [x, y]
            });
        };


        return {
            remove: function() {
                self.rotateHandle.remove();
                self.rotatePoint.remove();
            }
        };
    },

    addDilationTool: function() {
        var options = this.props.tools.dilation;
        if (!options.enabled) {
            return;
        }
        var self = this;
        var graphie = this.refs.graph.graphie();

        var pointColor = colorForTool(options);
        // the circle for causing dilation transforms
        self.dilationCircle = graphie.addCircleGraph({
            centerConstraints: options.constraints,
            center: options.coord,
            radius: self.scaleToCurrentRange(2),
            snapX: graphie.snap[0],
            snapY: graphie.snap[1],
            minRadius: self.scaleToCurrentRange(1),
            snapRadius: self.scaleToCurrentRange(0.5),
            onResize: function(newRadius, oldRadius) {
                self.doTransform({
                    type: "dilation",
                    center: self.dilationCircle.centerPoint.coord,
                    scale: newRadius/oldRadius
                });
            },
            circleNormalStyle: {
                "stroke": pointColor,
                "stroke-width": 2,
                "stroke-dasharray": "- ",
                "fill-opacity": 0
            },
            circleHighlightStyle: {
                "stroke": KhanUtil.INTERACTING,
                "stroke-width": 2,
                "stroke-dasharray": "",
                "fill": KhanUtil.INTERACTING,
                "fill-opacity": 0.05
            },
            centerNormalStyle: {
                "stroke": pointColor,
                "fill": pointColor,
                "stroke-width": 2,
                "stroke-dasharray": ""
            },
            centerHighlightStyle: {
                "stroke": pointColor,
                "fill": pointColor,
                "stroke-width": 2,
                "stroke-dasharray": ""
            }
        });

        var origOnMoveEnd = this.dilationCircle.centerPoint.onMoveEnd;
        this.dilationCircle.centerPoint.onMoveEnd = function() {
            if (origOnMoveEnd) {
                origOnMoveEnd.apply(this, _.toArray(arguments));
            }
            self.changeTool("dilation", {
                coord: self.dilationCircle.centerPoint.coord
            });
        };

        return {
            remove: function() {
                self.dilationCircle.remove();
            }
        };
    },

    // returns a transformation object representing a rotation
    // rounds the angle to the nearest 15 degrees
    getRotationTransformFromAngle: function(center, angleChanged) {
        angleChanged = (angleChanged + 360) % 360;
        if (angleChanged > 180) {
            angleChanged -= 360;
        }
        var roundedAngle = Math.round(
                angleChanged / ROTATE_SNAP_DEGREES
            ) * ROTATE_SNAP_DEGREES;

        return {
            type: "rotation",
            center: center,
            angleDeg: roundedAngle
        };
    },

    // apply and save a transform
    doTransform: function(transform, callback) {
        this.applyTransform(transform);
        this.addTransform(transform, callback);
    },

    // apply a transform to our polygon (without modifying our transformation
    // list)
    applyTransform: function(transform) {
        if (this.props.graphMode !== "static") {
            var transformFunc = TransformOps.apply(transform);
            this.applyCoordTransformation(transformFunc);
        }
    },

    // transform our polygon by transforming each point using a given function
    applyCoordTransformation: function(pointTransform) {
        _.each(this.shape.points, function(point) {
            var newCoord = pointTransform(point.coord);
            point.setCoord(newCoord);
        });
        this.shape.update();
    },

    resetCoords: function() {
        var startCoords = this.props.starting.shape.coords;
        _.each(this.shape.points, function(point, i) {
            point.setCoord(startCoords[i]);
        });
        this.shape.update();
    },

    // Remove the last transformation
    handleUndoClick: function() {
        this.refs.toolsBar.changeSelected(null);
        if (this.props.transformations.length) {
            this.props.onChange({
                transformations: _.initial(this.props.transformations)
            });
        }
    },

    setTransformationProps: function(newTransfomationList) {
        this.props.onChange({
            transformations: newTransfomationList
        });
    },

    // add a transformation to our props list of transformation
    addTransform: function(transform, callback) {
        this.transformations = TransformOps.append(
                this.transformations,
                transform
        );
        this.props.onChange({
            transformations: _.clone(this.transformations)
        }, callback);
    },

    changeTool: function(tool, changes) {
        var newTools = _.clone(this.props.tools);
        newTools[tool] = _.extend({}, this.props.tools[tool], changes);
        this.tools[tool] = _.clone(newTools[tool]);
        this.props.onChange({
            tools: newTools,
        });
    },

    simpleValidate: function(rubric) {
        return Transformer.validate(this.toJSON(), rubric);
    },

    /**
     * Calculate where the coordinates would be if they were
     * moved, even if we're in formal mode with no movement
     * (and thus the actual movablepoints may not have moved
     */
    getCoords: function() {
        var startCoords = this.props.starting.shape.coords;
        var transforms = this.props.transformations;
        return _.reduce(transforms, function (coords, transform) {
            return _.map(coords, TransformOps.apply(transform));
        }, startCoords);
    },

    toJSON: function() {
        var json = _.pick(this.props, "grading", "starting", "graphMode",
                "listMode", "tools", "drawSolutionShape", "gradeEmpty");
        json.graph = this.refs.graph.toJSON();
        json.answer = {
            transformations: this.props.transformations,
            // This doesn't call this.shape.toJSON() because that doesn't
            // handle coordinates in formal mode without movement, since
            // the movablepoints never move
            shape: {
                type: this.shape.type,
                coords: this.getCoords(),
                options: this.shape.getOptions()
            }
        };
        json.version = 1.2; // Give us some safety to change the format
                            // when we realize that I wrote
                            // a horrible json spec for this widget
        return json;
    },

    statics: {
        displayMode: "block"
    }
});

_.extend(Transformer, {
    validate: function (guess, rubric) {
        // Check for any required transformations
        for (var type in Transformations) {
            if (rubric.tools[type].required) {
                var isUsed = _.any(_.map(guess.answer.transformations,
                        function(transform) {
                    // Required transformations must appear in the
                    // transformation list, and must not be no-ops
                    return (transform.type === type) &&
                        !TransformOps.isEmpty(transform) &&
                        !TransformOps.isNoOp(transform);
                }));

                if (!isUsed) {
                    return {
                        type: "invalid",
                        message: $._("Your transformation must use a " +
                                "%(type)s.", {
                            type: Transformations[type].lowerNounName
                        })
                    };
                }
            }
        }

        // Compare shapes
        if (ShapeTypes.equal(guess.answer.shape,
                rubric.correct.shape)) {
            return {
                type: "points",
                earned: 1,
                total: 1,
                message: null
            };
        } else if (!rubric.gradeEmpty && deepEq(
                    guess.answer.shape.coords,
                    rubric.starting.shape.coords
                )) {
            return {
                type: "invalid",
                message: $._("Use the interactive graph to define a " +
                    "correct transformation.")
            };
        } else {
            return {
                type: "points",
                earned: 0,
                total: 1,
                message: null
            };
        }
    }
});

var TransformerEditor = React.createClass({displayName: 'TransformerEditor',
    // TODO (jack): These should be refactored into a nice object at the top
    // so that we don't have all this duplication
    getDefaultProps: function() {
        return _.defaults({
            graph: defaultGraphProps(this.props.graph, 340)
        }, defaultTransformerProps);
    },

    render: function() {
        // Fill in any missing value in this.props.graph
        // this can happen because the graph json doesn't include
        // box, for example
        var graph = _.extend(
                defaultGraphProps(this.props.graph, 340),
                this.props.graph
        );

        return React.DOM.div(null, 
            React.DOM.div(null, 
                PropCheckBox(
                    {label:"Grade empty answers as wrong:",
                    gradeEmpty:this.props.gradeEmpty,
                    onChange:this.props.onChange} ),
                InfoTip(null, 
                    React.DOM.p(null, 
                        "We generally do not grade empty answers. This usually"+' '+
                        "works well, but sometimes can result in giving away"+' '+
                        "part of an answer in a multi-part question."
                    ),
                    React.DOM.p(null, 
                        "If this is a multi-part question (there is another"+' '+
                        "widget), you probably want to enable this option."+' '+
                        "Otherwise, you should leave it disabled."
                    ),
                    React.DOM.p(null, 
                        "Confused? Talk to Elizabeth."
                    )
                )
            ),
            React.DOM.div(null, "Graph settings:"),
            GraphSettings(
                {box:graph.box,
                labels:graph.labels,
                range:graph.range,
                step:graph.step,
                gridStep:graph.gridStep,
                valid:graph.valid,
                backgroundImage:graph.backgroundImage,
                markings:graph.markings,
                showProtractor:graph.showProtractor,
                onChange:this.changeGraph} ),
            React.DOM.div(null, "Transformation settings:"),
            TransformationExplorerSettings(
                {ref:"transformationSettings",
                graphMode:this.props.graphMode,
                listMode:this.props.listMode,
                tools:this.props.tools,
                drawSolutionShape:this.props.drawSolutionShape,
                onChange:this.props.onChange} ),
            React.DOM.div(null, "Starting location:"),
            TransformationsShapeEditor(
                {ref:"shapeEditor",
                graph:graph,
                shape:this.props.starting.shape,
                onChange:this.changeStarting} ),
            React.DOM.div(null, "Solution transformations:"),
            Transformer(
                {ref:"explorer",
                graph:graph,
                graphMode:this.props.graphMode,
                listMode:this.props.listMode,
                gradeEmpty:this.props.gradeEmpty,
                tools:this.props.tools,
                drawSolutionShape:this.props.drawSolutionShape,
                starting:this.props.starting,
                correct:this.props.starting,
                transformations:this.props.correct.transformations,
                onChange:this.changeTransformer} )
        );
    },

    // propagate a props change on our graph settings to
    // this.props.graph
    changeGraph: function(graphChanges, callback) {
        var newGraph = _.extend({}, this.props.graph, graphChanges);
        this.props.onChange({
            graph: newGraph
        }, callback);
    },

    // propagate a props change on our starting graph to
    // this.props.starting
    changeStarting: function(startingChanges) {
        var newStarting = _.extend({}, this.props.starting, startingChanges);
        this.props.onChange({
            starting: newStarting
        });
    },

    // propagate a transformations change onto correct.transformations
    changeTransformer: function(changes, callback) {
        if (changes.transformations) {
            changes.correct = {
                transformations: changes.transformations
            };
            delete changes.transformations;
        }
        this.props.onChange(changes, callback);
    },

    toJSON: function() {
        var json = this.refs.explorer.toJSON();
        json.correct = json.answer;
        delete json.answer;
        return json;
    }
});


module.exports = {
    name: "transformer",
    displayName: "Transformer",
    widget: Transformer,
    editor: TransformerEditor,
    hidden: true
};

},{"../components/graph-settings.jsx":121,"../components/graph.jsx":122,"../components/number-input.jsx":129,"../components/prop-check-box.jsx":130,"../tex.jsx":167,"../util.js":168,"react":115,"react-components/info-tip":5}]},{},[163])
(163)
});
;