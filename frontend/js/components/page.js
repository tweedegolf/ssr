import React, { PropTypes } from 'react';
import R from 'ramda';
import { updateRouter } from '../actions';

const mapIndexed = R.addIndex(R.map);

const Page = (props) => {
    const {
        path,
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
        list = (<ul>{R.map(data => (<li key={data.label}>
            <a href={`${path}/${data.link}`}>{data.label}</a>
        </li>), subcategoryLinks)}</ul>);
    }

    // const createBreadCrumbs = () => {
    //     const numLinks = R.length(breadCrumbs);
    //     const crumbs = mapIndexed((data, i) => {
    //         if (i < numLinks - 1) {
    //             return <span key={`segment_${i}`}><a href={data.link}>{data.label}</a>/</span>;
    //         }
    //         return <span key={`segment_${i}`}>{data.label}</span>;
    //     }, breadCrumbs);
    //     return <span className="breadcrumbs">/ssr/{crumbs}</span>;
    // };


    const createBreadCrumbs = () => {
        const numLinks = R.length(breadCrumbs);
        const crumbs = mapIndexed((crumb, i) => {
            // console.log(crumb);
            const p = {
                onClick: () => {
                    updateRouter({ route: crumb.link });
                },
            };
            if (i < numLinks - 1) {
                return <span key={`segment_${i}`}><a {...p}>{crumb.label}</a>/</span>;
            }
            return <span key={`segment_${i}`}>{crumb.label}</span>;
        }, breadCrumbs);
        return <span className="breadcrumbs">/csr/{crumbs}</span>;
    };

    return (<div>
        <pre>
            {createBreadCrumbs()}
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
    subcategoryLinks: null,
};

export default Page;
