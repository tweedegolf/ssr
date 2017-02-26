import React, { PropTypes } from 'react';

const App = props => (
    <div>
        <h1>hello world {props.isMobile ? 'mobile' : 'desktop'}</h1>
    </div>
);

App.propTypes = {
    isMobile: PropTypes.bool.isRequired,
};

export default App;
