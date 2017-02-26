import React, { PropTypes } from 'react';
import R from 'ramda';
import data from '../data';
import { fixedEncodeURIComponent } from '../util/convert';


// const hasSubCategories = (category, data) => R.length(R.filter(cat => cat === 'subcategory'), R.keys(data[category])) !== -1;

// const getSubCategories = (category, data) => {
//     // const
// };

const mapIndexed = R.addIndex(R.map);
const invertKeyValue = obj => R.reduce((acc, key) => R.merge(acc, { [obj[key]]: key }), {}, R.keys(obj));

const urlsAndLabels = categories => R.map((cat) => {
    const url = fixedEncodeURIComponent(cat.label);
    const subs = cat.subcategories;
    if (R.isNil(subs) === false) {
        return urlsAndLabels(subs);
    }
    return { [url]: cat.label };
}, categories);


const Page = (props) => {
    // const segments = R.map(key => props[key], R.keys(props));
    // const pageData = data[R.last[segments]]
    // const reversedSegments = R.reverse(segments);
    const ulFlatten = R.flatten(urlsAndLabels(data));
    const urlLabel = R.reduce((acc, obj) => R.merge(acc, obj), {}, ulFlatten);
    const labelUrl = invertKeyValue(urlLabel);
    console.log(urlLabel, labelUrl);

    const label = 'Animals';
    const summary = 'This is the grouping together of animals with similar characteristics. Animals can be classed as either vertebrates and invertebrates';
    const examples = [];

    return (<div>
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
