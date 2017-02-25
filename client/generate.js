import React from 'react';
import { renderToString } from 'react-dom/server';
import App from './main';
import template from './template';

const generate = () => {
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
// console.log('<html><head></head><body><h1>aap en beer zaten in het bos</h1></body></html>');
console.log(generate());
