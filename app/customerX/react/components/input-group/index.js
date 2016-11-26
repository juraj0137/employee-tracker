import React from 'react';

/**
 * Input group wrapper for easier manipulation with onChange handler
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
export const InputGroup = (props) => {

    const {onChange, label, value, type = 'text'} = props;
    const id = Math.round(Math.random() * 10000);
    const _onChange = (event) => {
        onChange(event.target.value);
    };

    return <div className="row form-group">
        <label className="col-md-4 col-form-label text-xs-right" htmlFor={id}>{label}</label>
        <div className="col-md-8">
            <input className="form-control" type={type} onChange={_onChange} value={value} id={id}/>
        </div>
    </div>
};