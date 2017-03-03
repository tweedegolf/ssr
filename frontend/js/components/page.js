import React, { PropTypes } from 'react';
import R from 'ramda';
import { updateRouter } from '../actions';

const mapIndexed = R.addIndex(R.map);
const routeNameToPath = name => R.compose(R.join('/'), R.split('.'))(name);

const Page = (props) => {
    const {
        label,
        summary,
        examples,
        breadCrumbs,
        subcategoryLinks,
        renderType,
    } = props;


    let list = null;
    if (R.isNil(examples) === false && R.length(examples) > 0) {
        list = (<div>
            <span>Examples:</span>
            <ul>{R.map(item => <li key={item}>{item}</li>, examples)}</ul>
        </div>);
    } else if (R.isNil(subcategoryLinks) === false && R.length(subcategoryLinks) > 0) {
        if (renderType === 'csr') {
            list = (<ul>{R.map((data) => {
                const p = {
                    onClick: () => { updateRouter({ name: data.name, path: data.path }); },
                };
                return (<li key={data.label}>
                    <a {...p}>{data.label}</a>
                </li>);
            }, subcategoryLinks)}</ul>);
        } else if (renderType === 'ssr') {
            list = (<ul>{R.map(data => (<li key={data.label}>
                <a href={routeNameToPath(`/${data.name}`)}>{data.label}</a>
            </li>), subcategoryLinks)}</ul>);
        }
    }

    let crumbs = null;
    const numLinks = R.length(breadCrumbs);
    if (renderType === 'csr') {
        crumbs = mapIndexed((crumb, i) => {
            // console.log(crumb);
            const p = {
                onClick: () => {
                    updateRouter({ name: crumb.name, path: crumb.path });
                },
            };
            if (i < numLinks - 1) {
                return <span key={`segment_${i}`}><a {...p}>{crumb.label}</a>/</span>;
            }
            return <span key={`segment_${i}`}>{crumb.label}</span>;
        }, breadCrumbs);
    } else if (renderType === 'ssr') {
        crumbs = mapIndexed((data, i) => {
            if (i < numLinks - 1) {
                return <span key={`segment_${i}`}><a href={routeNameToPath(`/${data.name}`)}>{data.label}</a>/</span>;
            }
            return <span key={`segment_${i}`}>{data.label}</span>;
        }, breadCrumbs);
    }

    return (<div>
        <pre>
            <span className="breadcrumbs">/csr/{crumbs}</span>
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
    renderType: PropTypes.string.isRequired,
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
