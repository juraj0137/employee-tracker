import "./style.less";
import React from "react";
import {Button} from '../button';

class Navbar extends React.Component {

    constructor(props) {
        super(props);

        this.onQuickFilterChange = this.onQuickFilterChange.bind(this);
    }

    onQuickFilterChange(event) {
        const value = event.target.value.trim();
        if (value.length > 0) {
            this.props._onFilterChange({filterText: value});
        }
    }

    last24Months() {
        let months = [];
        for (let i = 0; i < 24; i++) {
            let date = new Date();
            date.setMonth(date.getMonth() - i);
            months.push(date);
        }
        return months.map((month, key) => {
            return <option key={key} value={month}>{`${month.getMonth() + 1}.${month.getFullYear()}`}</option>
        })
    }

    render() {
        return <div className="navbar">
            <select name="" id="" className="button month-filter">
                {this.last24Months()}
            </select>
            <input type="text"
                   className="navbar-input-filter"
                   placeholder="Quick filter..."
                   onChange={this.onQuickFilterChange}/>
            <Button className="filter-seach">Q</Button>
            <Button className="button add-employee" onClick={this.props.onAddEmployeeClick}>+ Add employee</Button>
        </div>
    }
}

export {Navbar};