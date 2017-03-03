import 'babel-polyfill';
import express from 'express';
import path from 'path';
// import cors from 'cors';
import React from 'react';
import { renderToString } from 'react-dom/server';
import template from './frontend/js/ssr/template';
import App from './frontend/js/containers/app_ssr';
import getRouter from './frontend/js/get_router';
import getApi from './frontend/js/api';

const port = process.env.PORT || 8080;
const app = express();

const router = getRouter();
const api = getApi();
router.add(api.routes);

// app.use(cors());

app.use('*/assets/index.css', (request, response) => {
    response.sendFile(path.join(__dirname, 'assets', 'index.css'));
});

app.get('*/assets/bundle.js', (request, response) => {
    response.sendFile(path.join(__dirname, 'assets', 'bundle.js'));
});

app.get('*', (request, response) => {
    console.log(`[ssr] ${request.originalUrl}`);
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
