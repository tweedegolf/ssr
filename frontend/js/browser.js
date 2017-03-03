import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import getRouter from './get_router';
import getApi from './api';
import { updateStateFromRouter } from './actions';

const router = getRouter();
const rootElement = global.document.getElementById('root');
const initialState = global.window.APP_INITIAL_STATE;

router.add(getApi().routes);
router.start(initialState.path, (error, state) => {
    if (error === null) {
        updateStateFromRouter(state);
        render(<App />, rootElement);
    } else {
        render(<div>
            <h1>{'ERROR'}</h1>
            <pre>{error.code}</pre>
            <p>{`path: ${error.path}`}</p>
        </div>, rootElement);
    }
});
