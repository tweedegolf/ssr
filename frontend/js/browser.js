import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import getRouter from './get_router';
import getApi from './api';
import { updateStateFromRouter } from './actions';

const router = getRouter();
const api = getApi('csr');
console.log(api.routes);
router.add(api.routes);
// router.addNode('csr', '/csr');
// router.addNode('csr.animals', '/csr/animals');
router.add({ name: 'csr', path: '/csr' });
router.add({ name: 'csr.animals', path: '/csr/animals' });
router.start();

router.addListener((a1, a2, a3) => {
    // updateStateFromRouter();
    console.log(a1, a2, a3);
});

render(<App />, global.document.getElementById('root'));
