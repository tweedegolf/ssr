import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../containers/app';

const generatePage = () => {
    const segment1 = process.argv[2];
    const segment2 = process.argv[3];
    const initialState = { segment1, segment2 };
    const appString = renderToString(<App {...initialState} />);
    const page = {
        initialState,
        body: appString,
        title: `ssr [${segment1}/${segment2}]`,
    };
    return JSON.stringify(page);
};
// print html to console so the page can be streamed to Silex
console.log(generatePage());
