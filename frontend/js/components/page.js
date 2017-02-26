import React, { PropTypes } from 'react';
import R from 'ramda';
import data from '../data';
import { fixedEncodeURIComponent } from '../util/convert';

const mapIndexed = R.addIndex(R.map);
const arrayToObject = (arr) => {
    const keysRaw = mapIndexed((val, i) => { return i % 2 === 0 ? val : null; }, arr);
    const valuesRaw = mapIndexed((val, i) => { return i % 2 === 1 ? val : null; }, arr);
    const keys = R.filter(val => R.isNil(val) === false, keysRaw);
    const values = R.filter(val => R.isNil(val) === false, valuesRaw);
    // console.log(keys, values);
    const keyValue = {};
    mapIndexed((key, i) => { keyValue[key] = values[i]; }, keys);
    return keyValue;
};
const invertKeyValue = obj => R.reduce((acc, key) => R.merge(acc, { [obj[key]]: key }), {}, R.keys(obj));

const urlsAndLabels = categories => R.map((cat) => {
    const url = fixedEncodeURIComponent(cat.label);
    const subs = cat.subcategories;
    if (R.isNil(subs) === false) {
        // return {
        //     [url]: cat.label,
        //     ...urlsAndLabels(subs),
        // };
        // return R.merge(urlsAndLabels(subs), { [url]: cat.label });
        return [url, cat.label, urlsAndLabels(subs)];
    }
    // return { [url]: cat.label };
    return [url, cat.label];
}, categories);


const Page = (props) => {
    // console.log(urlsAndLabels(data));
    // console.log(R.flatten(urlsAndLabels(data)));
    const ulFlatten = R.flatten(urlsAndLabels(data));
    // const urlLabel = R.reduce((acc, obj) => R.merge(acc, obj), {}, ulFlatten);
    const urlLabel = arrayToObject(ulFlatten);
    const labelUrl = invertKeyValue(urlLabel);
    // console.log(urlLabel, labelUrl);

    const label = urlLabel[props.segment0];
    // TODO: get data from loop
    const summary = labelUrl[props.segment0]; // data[labelUrl[props.segment0]].summary;
    const examples = [];

    return (<div>
        <pre>{props.segment0}</pre>
        <h1>{label}</h1>
        <p>{summary}</p>
        <ul>{examples}</ul>
        <button>up</button>
        <button>down</button>
    </div>);
};

Page.propTypes = {
    segment0: PropTypes.string.isRequired,
    segment1: PropTypes.string,
    segment2: PropTypes.string,
    segment3: PropTypes.string,
};

Page.defaultProps = {
    segment1: '',
    segment2: '',
    segment3: '',
};

export default Page;

// const hasSubCategories = (category, data) => R.length(R.filter(cat => cat === 'subcategory'), R.keys(data[category])) !== -1;

// const getSubCategories = (category, data) => {
//     // const
// };
    // const segments = R.map(key => props[key], R.keys(props));
    // const pageData = data[R.last[segments]]
    // const reversedSegments = R.reverse(segments);
