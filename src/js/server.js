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

// resolve all requests to files in the build folder statically (bundle.js, index.css)
app.use('*/assets/*', (request, response) => {
    console.log(`[express]${request.originalUrl}`);
    let file = request.originalUrl;
    file = file.substring(file.lastIndexOf('/') + 1);
    response.sendFile(path.join(__dirname, 'assets', file));
});

// and all other requests return a page rendered on the server
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
            response.send(template({
                body: appString,
                title: 'classification of animals',
                initialState: JSON.stringify(state),
            }));
        } else {
            response.send(error);
        }
    });
});

app.listen(port);
console.log(`server started on port ${port}`);
