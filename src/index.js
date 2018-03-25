import React from 'react';
import ReactDOM from 'react-dom';
import service from './js/service';
import Root from './js/react/Root';
import './css/theme.css';

ReactDOM.render(<Root />, document.getElementById('root'));
service();
