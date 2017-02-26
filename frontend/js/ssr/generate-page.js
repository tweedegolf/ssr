import 'babel-polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../containers/app';

const generatePage = () => {
    const segment0 = process.argv[2];
    const segment1 = process.argv[3];
    const segment2 = process.argv[4];
    const segment3 = process.argv[5];
    const initialState = { segment0, segment1, segment2, segment3 };
    const appString = renderToString(<App {...initialState} />);
    const page = {
        initialState,
        body: appString,
        title: `ssr [${segment0}/${segment1}/${segment2}]`,
    };
    return JSON.stringify(page);
};
// print html to console so the page can be streamed to Silex
console.log(generatePage());
