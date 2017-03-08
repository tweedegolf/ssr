import 'babel-polyfill';
import express from 'express';
import path from 'path';
import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './ssr/template';
import App from './containers/app_ssr';
import getRouter from './misc/get_router';
import getApi from './misc/api';

const port = process.env.PORT || 3000;
const app = express();

const router = getRouter();
const api = getApi();
router.add(api.routes);

// render the page with serverside React
app.get('*', (request, response) => {
    console.log(`[express]${request.originalUrl}`);
    router.clone().start(request.originalUrl, (error, state) => {
        if (error === null) {
            const breadCrumbs = api.getBreadCrumbLinks(state.name);
            const label = api.getLabelLastSegment(state.path);
            const {
                summary,
                examples,
            } = api.getCategory(label) || {};
            const subcategoryLinks = api.getSubCategoryLinks(path, label);
            const props = {
                label,
                summary,
                examples,
                breadCrumbs,
                subcategoryLinks,
            };

            const appString = renderToString(<App {...props} />);
            if (process.env.TWIG === '1') {
                response.send({
                    body: appString,
                    title: '[twig] classification of animals',
                    initialState: JSON.stringify(state),
                });
            } else {
                response.send(template({
                    body: appString,
                    title: 'classification of animals',
                    initialState: JSON.stringify(state),
                }));
            }
        } else {
            response.send(error);
        }
    });
});

app.listen(port);
console.log(`server started on port ${port} | render as json: ${process.env.TWIG === '1'}`);
