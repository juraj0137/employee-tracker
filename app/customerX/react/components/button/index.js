import "./style.less";
import React from "react";

const Button = (props) => {

    const {className, type = 'info', icon = '', mr = 0, ...rest} = props;
    const Icon = icon.length > 0 ? <i className={`fa fa-fw fa-${plus} mr-${mr}`}/> : null;

    return <button className={`btn btn-${type} ${className}`} {...rest}>
        {Icon}
        {props.children}
    </button>
};

export {Button};