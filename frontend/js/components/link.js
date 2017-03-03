import React, { PropTypes } from 'react';
import R from 'ramda';
import { updateRouter } from '../actions';

const nameToUrl = name => `/${R.compose(R.join('/'), R.split('.'))(name)}`;

const Link = (props) => {
    const p = {
        onClick: (e) => {
            e.preventDefault();
            updateRouter({ name: props.name, path: props.path });
        },
        href: nameToUrl(props.name),
    };
    return <a {...p}>{props.label}</a>;
};

Link.propTypes = {
    name: PropTypes.string.isRequired,
    path: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
};

export default Link;
