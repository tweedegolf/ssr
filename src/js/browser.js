// main entry point for csr
import 'babel-polyfill';
import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import getRouter from './misc/get_router';
import getApi from './misc/api';
import { updateStateFromRouter } from './actions';

const router = getRouter();

router.add(getApi().routes);

router.start((error, state) => {
    let jsx = null;
    if (error === null) {
        updateStateFromRouter(state);
        jsx = <App />;
    } else {
        jsx = (<div>
            <h1>{'ERROR'}</h1>
            <pre>{error.code}</pre>
            <p>{`path: ${error.path}`}</p>
        </div>);
    }
    render(jsx, global.document.getElementById('root'));
});

