import 'babel-polyfill';
import React from 'react';
import { Provider } from 'react-redux';
import Page from '../components/page';
import getStore from '../reducers/root';

const App = props => (
    <Provider store={getStore()}>
        <Page {...props} />
    </Provider>
);

export default App;
