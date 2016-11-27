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
            date.setDate(1);
            date.setHours(0);
            date.setMinutes(0);
            date.setSeconds(0);
            date.setMilliseconds(0);
            months.push(date);
        }

        return months.map((month, key) => {
            return <a key={key} className="dropdown-item" onClick={() => this.props.onMonthChange(month) }>
                {`${month.getMonth() + 1}.${month.getFullYear()}`}
            </a>;
        })
    }

    render() {

        const month = new Date(this.props.month);

        return <nav className="navbar navbar-light bg-faded navbar-fixed-top">

            <span className="navbar-brand">Salary tracker</span>

            <ul className="nav navbar-nav">
                <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle"
                       id="monthFilter"
                       data-toggle="dropdown">{`${month.getMonth() + 1}.${month.getFullYear()}`}</a>

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