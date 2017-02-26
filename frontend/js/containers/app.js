import 'babel-polyfill';
import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import getStore from '../reducers/root';

const App = props => (
    <Provider store={getStore()}>
        <h1>hello world {props.segment1} {props.segment2}</h1>
    </Provider>
);

App.propTypes = {
    segment1: PropTypes.string.isRequired,
    segment2: PropTypes.string,
};

App.defaultProps = {
    segment2: '',
};

export default App;
