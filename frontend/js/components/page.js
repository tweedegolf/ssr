import React, { PropTypes } from 'react';
import R from 'ramda';

const mapIndexed = R.addIndex(R.map);

const Page = (props) => {
    const {
        path,
        label,
        summary,
        examples,
        segments,
        subcategories,
    } = props;


    let list = null;
    if (R.isNil(examples) === false && R.length(examples) > 0) {
        list = (<div>
            <span>Examples:</span>
            <ul>{R.map(item => <li key={item}>{item}</li>, examples)}</ul>
        </div>);
    } else if (R.isNil(subcategories) === false && R.length(subcategories) > 0) {
        list = (<ul>{R.map(data => (<li key={data.label}>
            <a href={`${path}/${data.link}`}>{data.label}</a>
        </li>), subcategories)}</ul>);
    }

    const numLinks = R.length(segments);
    const breadCrumbs = mapIndexed((data, i) => {
        if (i < numLinks - 1) {
            return <span key={`segment_${i}`}><a href={data.link}>{data.label}</a>/</span>;
        }
        return <span key={`segment_${i}`}>{data.label}</span>;
    }, segments);

    return (<div>
        <pre>
            <span className="breadcrumbs">/ssr/{breadCrumbs}</span>
        </pre>
        <h1>{label}</h1>
        <p>{summary}</p>
        {list}
    </div>);
};

Page.propTypes = {
    segments: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        label: PropTypes.string,
    })).isRequired,
    subcategories: PropTypes.arrayOf(PropTypes.shape({
        link: PropTypes.string,
        label: PropTypes.string,
    })),
    path: PropTypes.string,
    label: PropTypes.string,
    summary: PropTypes.string,
    examples: PropTypes.arrayOf(PropTypes.string),
};

Page.defaultProps = {
    path: null,
    label: null,
    links: null,
    summary: null,
    examples: null,
    subcategories: null,
};

export default Page;
