import React, { PropTypes } from 'react';
import Resizable from './react-resizable-grid-resizer';

export function Rows({ className, style, children }) {
  return (
    <Resizable type="row" className={className} style={style}>{children}</Resizable>
  );
}

Rows.propTypes = {
  className: PropTypes.string,
  style: PropTypes.object,
  children: PropTypes.any,
};
