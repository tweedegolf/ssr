// main component for serverside rendering; props are passed in by the file server.js
import React from 'react';
import Page from '../components/page';

const App = props => <div><Page {...props} /></div>;

export default App;
