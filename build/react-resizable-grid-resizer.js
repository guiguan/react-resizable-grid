'use strict';

exports.__esModule = true;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function Resizable(_ref) {
  var type = _ref.type,
      style = _ref.style,
      children = _ref.children;


  var childrenWithProps = _react.Children.map(children, function (child, idx) {
    var props = { type: type };

    if (1 + idx === _react.Children.count(children)) {
      props.style = _extends({}, child.props.style, { flex: '1 1 auto' });
    }

    return _react2.default.cloneElement(child, props);
  });

  return _react2.default.createElement(
    'div',
    {
      style: _extends({
        display: 'flex',
        flexDirection: type,
        overflow: 'hidden',
        minHeight: '100%',
        maxHeight: '100%'
      }, style)
    },
    childrenWithProps
  );
}

Resizable.propTypes = {
  type: _react.PropTypes.string,
  style: _react.PropTypes.object,
  children: _react.PropTypes.any
};

exports.default = Resizable;