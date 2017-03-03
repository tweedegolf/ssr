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
    return (<div className="switcher" style={style}>
        <a href={props.url}><label htmlFor="csr">csr<input
          name="csr"
          type="checkbox"
          checked={props.renderType === 'csr'}
          onChange={() => {}}
        /></label></a>
        <label htmlFor="ssr">ssr<input
          name="ssr"
          type="checkbox"
          checked={props.renderType === 'ssr'}
          onChange={() => { global.window.location.href = global.window.location.href.replace('csr', 'ssr'); }}
          // onChange={() => { changeRenderType('ssr'); }}
        /></label>
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
