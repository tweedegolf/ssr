/* eslint no-underscore-dangle: "off" */

import { ReduceStore } from 'flux/utils';
import R from 'ramda';
import AppDispatcher from '../flux/app_dispatcher';
import data from '../data';
import { fixedEncodeURIComponent } from '../util/convert';

// const initialState = global.window.__APP_INITIAL_STATE__;

const invertKeyValue = obj => R.reduce((acc, key) =>
    R.merge(acc, { [obj[key]]: key }), {}, R.keys(obj));

const getCategories = categories => R.map((cat) => {
    const subs = cat.subcategories;
    if (R.isNil(subs) === false) {
        return [cat, ...getCategories(subs)];
    }
    return cat;
}, categories);

class Store extends ReduceStore {
    getInitialState() {
        this.categories = R.flatten(getCategories(data));
        this.labels = R.map(cat => cat.label, this.categories);
        this.labelUrl = R.reduce((acc, val) =>
            R.merge(acc, { [val]: fixedEncodeURIComponent(val) }), {}, this.labels);
        this.urlLabel = invertKeyValue(this.labelUrl);
        this.categoriesByLabel = R.reduce((acc, cat) =>
            R.merge(acc, { [cat.label]: cat }), {}, this.categories);
        // console.log(this.categoriesByLabel, this.labelUrl, this.urlLabel);
        return this.createNewState({}, { segments: { segment0: 'animals' } });
    }

    createNewState(state, action) {
        const mergedSegments = { ...state.segments, ...action.segments };
        const pathSegments = R.filter(val => R.isNil(val) === false && val !== 'NA', R.values(mergedSegments));
        const segment = R.last(pathSegments);
        const label = this.urlLabel[segment];
        const [path, segments] = R.reduce((acc, val) =>
            [`${acc[0]}/${val}`, [...acc[1], { link: `${acc[0]}/${val}`, label: val }]], ['/ssr', []], pathSegments);
        const {
            summary,
            subcategories,
            examples,
        } = this.categoriesByLabel[label];

        return {
            path,
            label,
            summary,
            segments,
            examples,
            subcategories: R.map(val =>
                ({ label: val.label, link: fixedEncodeURIComponent(val.label) }), subcategories),
        };
    }

    reduce(state, action) {
        switch (action.type) {
        case 'change':
            return this.createNewState(state, action);

        default:
            return state;
        }
    }
}

export default new Store(AppDispatcher);
