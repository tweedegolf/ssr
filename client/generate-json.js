import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './main';
import template from './template';

const generateJSON = () => {
    const isMobile = true;
    const initialState = { isMobile };
    const appString = renderToString(<App {...initialState} />);
    const page = {
        body: appString,
        title: 'Hello World from the server',
        initialState: JSON.stringify(initialState),
    };
    return JSON.stringify(page);
};
// print json to console so the page can be streamed into a Twig templage
console.log(generateJSON());
