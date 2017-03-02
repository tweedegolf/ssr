import React from 'react';
import { render } from 'react-dom';
import App from './containers/app';
import getRouter from './get_router';
import api from './api';

const router = getRouter();
const routes = api.createRoutes('csr');
//console.log(routes);
console.log(router.add(routes));

router.start('Animals');

// router.addListener((a1, a2, a3) => {
//     console.log(a1, a2, a3);
// });

render(<App />, global.document.getElementById('root'));
