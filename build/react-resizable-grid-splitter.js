'use strict';

exports.__esModule = true;
exports.Splitter = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Splitter = exports.Splitter = function (_Component) {
  _inherits(Splitter, _Component);

  function Splitter(props) {
    _classCallCheck(this, Splitter);

    var _this = _possibleConstructorReturn(this, _Component.call(this, props));

    _this.state = {
      resizableElement: null,
      otherElement: null
    };

    _this.onMouseDown = _this.onMouseDown.bind(_this);
    _this.onMouseUp = _this.onMouseUp.bind(_this);
    _this.onMouseMove = _this.onMouseMove.bind(_this);
    return _this;
  }

  Splitter.prototype.onMouseDown = function onMouseDown() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    var node = _reactDom2.default.findDOMNode(this);
    var resizableElement = node.previousSibling;
    var otherElement = node.nextSibling;

    if (this.props.type === 'row') {
      resizableElement.style.maxWidth = resizableElement.clientWidth + otherElement.clientWidth + 'px';
    } else {
      resizableElement.style.maxHeight = resizableElement.clientHeight + otherElement.clientHeight + 'px';
    }

    this.setState({
      resizableElement: resizableElement,
      otherElement: otherElement
    });
  };

  Splitter.prototype.onMouseUp = function onMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    if (this.props.type === 'row') {
      this.state.resizableElement.style.maxWidth = '';
    } else {
      this.state.resizableElement.style.maxHeight = '';
    }
  };

  Splitter.prototype.onMouseMove = function onMouseMove(_ref) {
    var clientX = _ref.clientX,
        clientY = _ref.clientY;
    var _state = this.state,
        resizableElement = _state.resizableElement,
        otherElement = _state.otherElement;

    var _resizableElement$get = resizableElement.getBoundingClientRect(),
        top = _resizableElement$get.top,
        left = _resizableElement$get.left;

    var _props = this.props,
        type = _props.type,
        change = _props.change;

    var _ReactDOM$findDOMNode = _reactDom2.default.findDOMNode(this),
        clientHeight = _ReactDOM$findDOMNode.clientHeight,
        clientWidth = _ReactDOM$findDOMNode.clientWidth,
        parentNode = _ReactDOM$findDOMNode.parentNode;

    if (type === 'column') {
      var newHeight = Math.max(0, Math.min(parseInt(resizableElement.style.maxHeight, 10), clientY - top - parseInt(clientHeight, 10) / 2));
      var newOtherHeight = parseInt(resizableElement.style.maxHeight, 10) - newHeight;
      resizableElement.style.height = newHeight + 'px';
      otherElement.style.height = newOtherHeight + 'px';
    } else {
      var newWidth = Math.max(0, Math.min(parseInt(resizableElement.style.maxWidth, 10), clientX - left - parseInt(clientWidth, 10) / 2));
      var newOtherWidth = parseInt(resizableElement.style.maxWidth, 10) - newWidth;
      resizableElement.style.width = newWidth + 'px';
      otherElement.style.width = newOtherWidth + 'px';
    }

    if (typeof change === 'function') {
      change(parentNode);
    }
  };

  Splitter.prototype.render = function render() {
    var _extends2;

    var _props2 = this.props,
        type = _props2.type,
        _props2$className = _props2.className,
        className = _props2$className === undefined ? '' : _props2$className,
        style = _props2.style;

    var splitterClass = type === 'row' ? 'vertical-splitter' : 'horizontal-splitter';

    return _react2.default.createElement('div', {
      className: splitterClass + ' ' + className,
      style: _extends((_extends2 = {
        flex: '0 0 auto'
      }, _extends2[type === 'column' ? 'width' : 'height'] = '100%', _extends2.cursor = type === 'column' ? 'row-resize' : 'col-resize', _extends2), style),
      onMouseDown: this.onMouseDown
    });
  };

  return Splitter;
}(_react.Component);

Splitter.propTypes = {
  type: _react.PropTypes.string,
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  change: _react.PropTypes.func
};