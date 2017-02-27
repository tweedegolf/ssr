/* eslint no-underscore-dangle: "off" */

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import getStore from './reducers/root';
import App from './containers/app';

// const initialState = global.window.__APP_INITIAL_STATE__;
const initialState = {
    segment0: 'animals',
    segment1: 'vertebrates',
    segment2: 'reptiles',
};
render(<Provider store={getStore()}>
    <App {...initialState} />
</Provider>, global.document.getElementById('root'));
