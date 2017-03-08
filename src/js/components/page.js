import React, { PropTypes } from 'react';
import R from 'ramda';
import Link from './link';

const mapIndexed = R.addIndex(R.map);

// Renders category data in a simple page. There are 2 ways of representations:
// - the page shows a category that has subcategories:
//   a list of the subcategories is shown
// - the page shows a category that has no subcategories:
//   a list of animals belonging to this category is shown
// In both cases the page renders a breadcrumb navigation
// mapping out the hierarchical structure of the categories.
const Page = (props) => {
    const {
        label,
        summary,
        examples,
        breadCrumbs,
        subcategoryLinks,
    } = props;


    let list = null;
    if (R.isNil(examples) === false && R.length(examples) > 0) {
        list = (<div>
            <span>Examples:</span>
            <ul>{R.map(item => <li key={item}>{item}</li>, examples)}</ul>
        </div>);
    } else if (R.isNil(subcategoryLinks) === false && R.length(subcategoryLinks) > 0) {
        list = (<ul>{R.map(data => (<li key={data.label}><Link {...data} /></li>), subcategoryLinks)}</ul>);
    }

    const numLinks = R.length(breadCrumbs);
    const crumbs = mapIndexed((data, i) => {
        if (i < numLinks - 1) {
            return <span key={`segment_${i}`}><Link {...data} />/</span>;
        }
        return <span key={`segment_${i}`}>{data.label}</span>;
    }, breadCrumbs);

    return (<div>
        <pre>
            <span className="breadcrumbs">/{crumbs}</span>
        </pre>
        <h1>{label}</h1>
        <p>{summary}</p>
        {list}
    </div>);
};

Page.propTypes = {
    breadCrumbs: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        label: PropTypes.string,
    })).isRequired,
    subcategoryLinks: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        label: PropTypes.string,
    })),
    label: PropTypes.string,
    summary: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.string),
};

Page.defaultProps = {
    label: null,
    links: null,
    summary: null,
    examples: null,
    subcategoryLinks: null,
};

export default Page;
