import 'babel-polyfill';
import React from 'react';
import { renderToString } from 'react-dom/server';
import App from '../containers/app';

const generateJSON = () => {
    const initialState = { segment0: 'animals' };
    const appString = renderToString(<App {...initialState} />);
    const page = {
        initialState,
        body: appString,
        title: 'ssr [animals]',
    };
    return JSON.stringify(page);
};
// print json to console so the page can be streamed into a Twig templage
console.log(generateJSON());
