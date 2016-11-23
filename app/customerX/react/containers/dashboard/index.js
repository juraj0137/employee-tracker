import "./style.less";
import React from "react";

import {Api} from '../../utils'

import {Navbar} from "../../components/navbar"
import {BottomBar} from "../../components/bottombar"
import {EmployeeList} from "../../components/employee-list"
import {EmployeeModal} from "../../components/employee-modal"

const REF_EMPLOYEE_MODAL = 'employee_modal';

/**
 *
 */
class Dashboard extends React.Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this.state = {
            filterText: '',
            processing: false,
            employees: [
                {name: "ahoj", address: "Brmbolkovo", phone: "12345798", email: "ahoj@ahoj.sk"}
            ],
        };

        this._onFilterChange = this._onFilterChange.bind(this);
        this._onNewEmployeeSave = this._onNewEmployeeSave.bind(this);
        this._onAddEmployeeClick = this._onAddEmployeeClick.bind(this);
        this._getFilteredEmployees = this._getFilteredEmployees.bind(this);
    }


    /**
     *
     * @param filter
     * @private
     */
    _onFilterChange(filter) {
        const {filterText} = filter;
        this.setState({filterText: filterText.toLowerCase()});
    }


    /**
     *
     * @private
     */
    _onAddEmployeeClick() {
        this.refs[REF_EMPLOYEE_MODAL].showModal()
    }


    /**
     *
     * @param values
     * @private
     */
    _onNewEmployeeSave(values) {

        this.setState({processing: true});

        Api.saveEmployee(values)
            .then((employee) => this.setState({employees: this.state.employees.concat([employee])}))
            .then(() => this.setState({processing: false}))
            .catch(e => console.log(e));
    }


    /**
     *
     * @returns {Array.<*>}
     * @private
     */
    _getFilteredEmployees() {
        return this.state.employees.filter(employee => {
            const {filterText} = this.state;
            return !(filterText.length > 0 && employee.name.toLowerCase().search(filterText) == -1);
        });
    }


    /**
     *
     * @returns {XML}
     */
    render() {
        return <div className="container">
            <Navbar onFilterChange={this._onFilterChange} onAddEmployeeClick={this._onAddEmployeeClick}/>
            <EmployeeList data={this._getFilteredEmployees()}/>
            <BottomBar text={`Total / Average sallary: `}/>
            <EmployeeModal ref={REF_EMPLOYEE_MODAL}
                           type="new"
                           onSave={this._onNewEmployeeSave}
                           title="Add new employee"/>
        </div>
    }
}

export {Dashboard};