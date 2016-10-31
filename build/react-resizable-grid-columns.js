'use strict';

exports.__esModule = true;
exports.Columns = Columns;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactResizableGridResizer = require('./react-resizable-grid-resizer');

var _reactResizableGridResizer2 = _interopRequireDefault(_reactResizableGridResizer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Columns(_ref) {
  var style = _ref.style,
      children = _ref.children;

  return _react2.default.createElement(
    _reactResizableGridResizer2.default,
    { type: 'column', style: style },
    children
  );
}

Columns.propTypes = {
  style: _react.PropTypes.object,
  children: _react.PropTypes.any
};