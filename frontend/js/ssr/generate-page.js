import 'babel-polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import R from 'ramda';
import App from '../containers/app';

const generatePage = () => {
    let i = 2;
    let s = 0;
    const initialState = {};
    while (i <= 5) {
        const segment = process.argv[i];
        if (R.isNil(segment) === false && segment !== 'NA') {
            initialState[`segment${s}`] = segment;
            s += 1;
        }
        i += 1;
    }
    const path = R.reduce((acc, val) => `${acc}/${val}`, '', R.values(initialState));
    const appString = renderToString(<App {...initialState} />);
    const page = {
        initialState,
        body: appString,
        title: `/ssr${path}`,
    };
    return JSON.stringify(page);
};
// print html to console so the page can be streamed to Silex
console.log(generatePage());
