import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import getRouter from './get_router';
import { initApi } from './api';
import { updateStateFromRouter } from './actions';

const router = getRouter();
const api = initApi('csr');
// console.log(api.routes);
router.add(api.routes);
router.start((error, state) => {
    if (error === null) {
        updateStateFromRouter(state);
    }
});

render(<App />, global.document.getElementById('root'));
