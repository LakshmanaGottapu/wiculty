import React from 'react';
import ReactDOM from 'react-dom';
import Toaster from './toast';

const messageFn = (msg, status) => {
  const toasterColors = {
    'success': '#4DBC18',
    'error': '#E74E46',
    'warning': '#F1C545'
  }
  ReactDOM.render(<Toaster
    msg={msg}
    color={toasterColors[status]}
    opacity={1}
    id={Math.random()}
  />, document.getElementById('toaster'))
}

export default messageFn;
