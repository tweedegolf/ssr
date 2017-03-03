import 'babel-polyfill';
import React from 'react';
import R from 'ramda';
import { renderToString } from 'react-dom/server';
import App from '../containers/app';
import getRouter from '../get_router';
import { initApi } from '../api';
import { updateStateFromRouter } from '../actions';

const generatePage = path => new Promise((resolve, reject) => {
    const router = getRouter();
    const api = initApi('ssr');
    router.add(api.routes);
    // console.log(R.map(route => route.name, api.routes));
    router.start(path, (error, state) => {
        if (error === null) {
            updateStateFromRouter(state);
            const appString = renderToString(<App />);
            resolve({ appString, initialState: state });
        } else {
            reject(error);
        }
    });
});

export default generatePage;
