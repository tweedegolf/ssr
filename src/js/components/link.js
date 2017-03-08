// Clickable component that works both when javascript is enabled and disabled in the browser;
// in the former case the action updateRouter is triggered, in the latter case the component is
// a plain <a> tag that navigates to a new page that will be rendered on the server.
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
