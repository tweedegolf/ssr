import React, { PropTypes } from 'react';
import R from 'ramda';
import { changeRenderType } from '../actions';

const Switcher = (props) => {
    const style = {
        position: 'absolute',
        zIndex: 2,
        right: 10,
        top: 10,
    };
    const p = {
        onClick: () => {
            global.window.location.href = global.window.location.href.replace('csr', 'ssr');
        },
    };

    return (<div className="switcher" style={style}>
        <a href={props.url} className={props.renderType === 'csr' ? 'selected' : 'active'}>csr</a>
        &nbsp;|&nbsp;
        <a {...p} className={props.renderType === 'ssr' ? 'selected' : 'active'}>ssr</a>
    </div>);
};

Switcher.propTypes = {
    renderType: PropTypes.string.isRequired,
    url: PropTypes.string,
};

Switcher.defaultProps = {
    url: '',
};

export default Switcher;
