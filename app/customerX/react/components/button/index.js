import "./style.less";
import React from "react";

class Button extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {

        const {className, ...rest} = this.props;

        return <button className={`button ${className}`} {...rest}>
            {this.props.children}
        </button>
    }
}

export {Button};