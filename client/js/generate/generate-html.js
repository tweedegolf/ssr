import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../containers/app';
import template from './template';

const generateHTML = () => {
    const isMobile = true;
    const initialState = { isMobile };
    const appString = renderToString(<App {...initialState} />);
    const page = template({
        body: appString,
        title: 'Hello World from the server',
        initialState: JSON.stringify(initialState),
    });
    return page;
};
// print html to console so the page can be streamed to Silex
console.log(generateHTML());
