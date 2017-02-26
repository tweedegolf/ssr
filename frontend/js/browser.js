/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';

const initialState = global.window.__APP_INITIAL_STATE__;
render(<App {...initialState} />, global.document.getElementById('root'));
