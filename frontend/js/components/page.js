import React, { PropTypes } from 'react';
import R from 'ramda';
import data from '../data';
import { fixedEncodeURIComponent } from '../util/convert';

const mapIndexed = R.addIndex(R.map);
const invertKeyValue = obj => R.reduce((acc, key) => R.merge(acc, { [obj[key]]: key }), {}, R.keys(obj));

const getCategories = categories => R.map((cat) => {
    const subs = cat.subcategories;
    if (R.isNil(subs) === false) {
        return [cat, ...getCategories(subs)];
    }
    return cat;
}, categories);

const Page = (props) => {
    const categories = R.flatten(getCategories(data));
    const labels = R.map(cat => cat.label, categories);
    const labelUrl = R.reduce((acc, val) => R.merge(acc, { [val]: fixedEncodeURIComponent(val) }), {}, labels);
    const urlLabel = invertKeyValue(labelUrl);
    const categoriesByLabel = R.reduce((acc, cat) => R.merge(acc, { [cat.label]: cat }), {}, categories);
    // console.log(categoriesByLabel, labelUrl, urlLabel);

    const segments = R.filter(val => R.isNil(val) === false && val !== 'NA', R.values(props));
    const segment = R.last(segments);
    const [path, links] = R.reduce((acc, val) =>
        [`${acc[0]}/${val}`, [...acc[1], <a href={`${acc[0]}/${val}`}>{val}</a>]], ['/ssr', []], segments);

    // console.log(path);
    // console.log(links);

    const numSegments = R.length(segments);
    const label = urlLabel[segment];
    const catData = categoriesByLabel[label];
    const parentCatLabel = urlLabel[segments[numSegments - 1]];
    const summary = catData.summary;
    const examples = catData.examples;
    const subcategories = catData.subcategories;

    let list = null;
    if (R.isNil(examples) === false && R.length(examples) > 0) {
        list = (<div>
            <span>Examples:</span>
            <ul>{R.map(item => <li key={item}>{item}</li>, examples)}</ul>
        </div>);
    } else if (R.isNil(subcategories) === false) {
        list = (<ul>{R.map(item => (<li key={item.label}>
            <a href={`${path}/${fixedEncodeURIComponent(item.label)}`}>{item.label}</a>
        </li>), subcategories)}</ul>);
    }

    const createBreadCrumbs = (_links) => {
        const numLinks = R.length(_links);
        const elements = mapIndexed((link, i) => {
            if (i < numLinks - 1) {
                return <span key={`segment_${i}`}>{link}/</span>;
            }
            return <span key={`segment_${i}`}>{segments[i]}/</span>;
        }, _links);
        return <span className="breadcrumbs">/ssr/{elements}</span>;
    };

    return (<div>
        <pre>{createBreadCrumbs(links)}</pre>
        <h1>{label}</h1>
        <p>{summary}</p>
        {list}
    </div>);
};

Page.propTypes = {
    segment0: PropTypes.string.isRequired,
    segment1: PropTypes.string,
    segment2: PropTypes.string,
    segment3: PropTypes.string,
};

Page.defaultProps = {
    segment1: null,
    segment2: null,
    segment3: null,
};

export default Page;

// const hasSubCategories = (category, data) => R.length(R.filter(cat => cat === 'subcategory'), R.keys(data[category])) !== -1;

// const getSubCategories = (category, data) => {
//     // const
// };
    // const segments = R.map(key => props[key], R.keys(props));
    // const pageData = data[R.last[segments]]
    // const reversedSegments = R.reverse(segments);

/*
    const getSiblings = (data) => {

    };


    let next = null;
    let prev = null;
    // console.log(parentCatLabel);
    const siblings = categoriesByLabel[parentCatLabel].examples;
    if (R.isNil(siblings) === false) {
        const numSiblings = R.length(siblings);
        // console.log(numSiblings);
    }
        {next}
        {prev}
*/


        // const tmp = mapIndexed((val, i) => {
        //     if (i !== numSegments - 2) {
        //         return val;
        //     }
        //     return linkToParent;
        // }, segments);
