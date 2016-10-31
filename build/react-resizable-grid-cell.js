'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Cell = Cell;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Cell(_ref) {
  var height = _ref.height,
      width = _ref.width,
      type = _ref.type,
      style = _ref.style,
      className = _ref.className,
      children = _ref.children;

  return _react2.default.createElement(
    'div',
    {
      className: className,
      style: _extends({
        flex: '0 0 auto',
        height: height || type === 'column' ? '30%' : '',
        width: type === 'column' ? '100%' : width || '30%',
        whiteSpace: 'nowrap'
      }, style)
    },
    children
  );
}

Cell.propTypes = {
  type: _react.PropTypes.string,
  className: _react.PropTypes.string,
  width: _react.PropTypes.string,
  height: _react.PropTypes.string,
  style: _react.PropTypes.object,
  children: _react.PropTypes.any
};