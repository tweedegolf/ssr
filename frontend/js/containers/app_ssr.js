import 'babel-polyfill';
import React, { PropTypes } from 'react';
import Page from '../components/page';
import Switcher from '../components/switcher';

const App = props => <div><Page {...props} /><Switcher renderType="ssr" url={props.url} /></div>;

App.propTypes = {
    url: PropTypes.string,
};

App.defaultProps = {
    url: '',
};

export default App;
