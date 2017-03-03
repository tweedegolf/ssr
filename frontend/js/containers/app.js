import 'babel-polyfill';
import React, { Component } from 'react';
import { Container } from 'flux/utils';
import Page from '../components/page';
import Switcher from '../components/switcher';
import pageDataReducer from '../reducers/page_data';
import { getApi } from '../api';

class App extends Component {

    static getStores() {
        return [pageDataReducer];
    }

    static calculateState(prevState) {
        const api = getApi();
        const { path, name } = pageDataReducer.getState();
        // console.log(api);
        const breadCrumbs = api.getBreadCrumbLinks(name);
        const label = api.getLabelLastSegment(path);
        const {
            summary,
            examples,
        } = api.getCategory(label) || {};
        const subcategoryLinks = api.getSubCategoryLinks(path, label);

        return {
            // pageData: pageDataReducer.getState(),
            pageData: {
                renderType: api.renderType,
                label,
                summary,
                examples,
                breadCrumbs,
                subcategoryLinks,
            },
        };
    }

    render() {
        return <div><Page {...this.state.pageData} /><Switcher renderType="csr" /></div>;
    }
}

export default Container.create(App);
