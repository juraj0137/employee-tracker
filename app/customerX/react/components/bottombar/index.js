import "./style.less";
import React from "react";

class BottomBar extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <div className="bottom-bar">
            {this.props.text}
        </div>
    }
}

export {BottomBar};