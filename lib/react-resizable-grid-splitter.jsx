import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import classNames from 'classnames';

export class Splitter extends Component {
  constructor(props) {
    super(props);

    this.state = {
      resizableElement: null,
      otherElement: null,
      active: false,
    };

    this.onMouseDown = this.onMouseDown.bind(this);
    this.onMouseUp = this.onMouseUp.bind(this);
    this.onMouseMove = this.onMouseMove.bind(this);
  }

  onMouseDown() {
    document.addEventListener('mousemove', this.onMouseMove);
    document.addEventListener('mouseup', this.onMouseUp);

    const node = ReactDOM.findDOMNode(this);
    const resizableElement = node.previousSibling;
    const otherElement = node.nextSibling;

    if (this.props.type === 'row') {
      resizableElement.style.maxWidth = `${resizableElement.clientWidth + otherElement.clientWidth}px`;
    } else {
      resizableElement.style.maxHeight = `${resizableElement.clientHeight + otherElement.clientHeight}px`;
    }

    this.setState({
      resizableElement,
      otherElement,
      active: true,
    });
  }

  onMouseUp() {
    document.removeEventListener('mousemove', this.onMouseMove);
    document.removeEventListener('mouseup', this.onMouseUp);

    if (this.props.type === 'row') {
      this.state.resizableElement.style.maxWidth = '';
    } else {
      this.state.resizableElement.style.maxHeight = '';
    }

    this.setState({
      active: false,
    });
  }

  onMouseMove({ clientX, clientY }) {
    const { resizableElement, otherElement } = this.state;
    const { top, left } = resizableElement.getBoundingClientRect();
    const { type, change } = this.props;
    const { clientHeight, clientWidth, parentNode } = ReactDOM.findDOMNode(this);

    if (type === 'column') {
      const newHeight = Math.max(0, Math.min(
        parseInt(resizableElement.style.maxHeight, 10),
        clientY - top - parseInt(clientHeight, 10) / 2
      ));
      const newOtherHeight = parseInt(resizableElement.style.maxHeight, 10) - newHeight;
      resizableElement.style.height = `${newHeight}px`;
      otherElement.style.height = `${newOtherHeight}px`;
    } else {
      const newWidth = Math.max(0, Math.min(
        parseInt(resizableElement.style.maxWidth, 10),
        clientX - left - parseInt(clientWidth, 10) / 2
      ));
      const newOtherWidth = parseInt(resizableElement.style.maxWidth, 10) - newWidth;
      resizableElement.style.width = `${newWidth}px`;
      otherElement.style.width = `${newOtherWidth}px`;
    }

    if (typeof change === 'function') {
      change(parentNode);
    }
  }

  render () {
    const { type, className = '', style } = this.props;
    const { active } = this.state;
    const classes = classNames(
      `${type === 'row' ? 'vertical' : 'horizontal'}-splitter`,
      className,
      { active }
    );

    return (
      <div
        className={classes}
        style={{
          flex: '0 0 auto',
          [type === 'column' ? 'width' : 'height']: '100%',
          cursor: `${type === 'column' ? 'row' : 'col'}-resize`,
          ...style
        }}
        onMouseDown={this.onMouseDown}
      />
    );
  }
}

Splitter.propTypes = {
  type: PropTypes.string,
  className: PropTypes.string,
  style: PropTypes.object,
  change: PropTypes.func,
};
