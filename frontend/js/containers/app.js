import 'babel-polyfill';
import React, { Component } from 'react';
import { Container } from 'flux/utils';
import Page from '../components/page';
import pageDataReducer from '../reducers/page_data';

class App extends Component {

    static getStores() {
        return [pageDataReducer];
    }

    static calculateState(prevState) {
        return {
            pageData: pageDataReducer.getState(),
        };
    }

    render() {
        console.log(this.state);
        return <div><Page {...this.state.pageData} /></div>;
    }
}

export default Container.create(App);
