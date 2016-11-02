import React, { PropTypes } from 'react';
import Resizable from './react-resizable-grid-resizer';

export function Columns({ className, style, children }) {
  return (
    <Resizable type="column" className={className} style={style}>{children}</Resizable>
  );
}

Columns.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};
