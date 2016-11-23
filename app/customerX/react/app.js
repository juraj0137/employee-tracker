import React from "react";
import ReactDOM from "react-dom";

import {Dashboard} from "./containers/dashboard";

class App extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return <Dashboard />
    }
}

ReactDOM.render(<App />, document.getElementById('react-app'));