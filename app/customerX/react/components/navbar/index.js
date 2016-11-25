import React from "react";

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.onQuickFilterChange = this.onQuickFilterChange.bind(this);
    }

    onQuickFilterChange(event) {
        const value = event.target.value.trim();
        this.props.onFilterChange({filterText: value});
    }

    last24Months() {
        let months = [];
        for (let i = 0; i < 24; i++) {
            let date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push(date);
        }
        return months.map((month, key) => {
            return <a key={key} className="dropdown-item">
                {`${month.getMonth() + 1}.${month.getFullYear()}`}
            </a>;
        })
    }

    render() {
        return <nav className="navbar navbar-light bg-faded navbar-fixed-top">

            <span className="navbar-brand">Salary tracker</span>

            <ul className="nav navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle"
                       id="monthFilter"
                       data-toggle="dropdown">Month filter</a>

                    <div className="dropdown-menu" aria-labelledby="monthFilter">
                        {this.last24Months()}
                    </div>

                </li>
            </ul>

            <div className="form-inline">

                <input className="form-control"
                       placeholder="Filter..."
                       style={{marginRight: '20px', marginLeft: '50px'}}
                       onChange={this.onQuickFilterChange}/>

                <button className="btn btn-outline-success"
                        onClick={this.props.onAddEmployeeClick}>Add employee
                </button>

            </div>
        </nav>;
    }

}

export {Navbar};