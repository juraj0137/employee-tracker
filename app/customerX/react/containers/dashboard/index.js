import React from "react";

import {Api} from '../../utils'

import {Navbar} from "../../components/navbar"
import {EmployeeList} from "../../components/employee-list"
import {EditEmployeeModal, DetailEmployeeModal} from "../../components/employee-modal"

const REF_MODAL_NEW = 'employee-modal-new';
const REF_MODAL_EDIT = 'employee-modal-edit';
const REF_MODAL_DETAIL = 'employee-modal-detail';

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
            employee: null,
            employees: {},
            employeeIds: [],
        };
    }

    /**
     *
     */
    componentDidMount() {
        Api.loadEmployees().then(employees => {

            const employeesById = employees.reduce((prev, next) => {
                prev[next.id] = next;
                return prev;
            }, {});

            this.setState({
                employees: employeesById,
                employeeIds: Object.keys(employeesById)
            });
        });

    }

    /**
     *
     * @param filter
     * @private
     */
    _onFilterChange = (filter) => {
        const {filterText} = filter;
        this.setState({filterText: filterText.toLowerCase()});
    };


    /**
     *
     * @private
     */
    _onAddEmployeeClick = ()=> {
        this.refs[REF_MODAL_NEW].showModal()
    };


    /**
     *
     * @param values
     * @private
     */
    _onNewEmployeeSave = (values)=> {

        this.setState({processing: true});

        Api.saveEmployee(values)
            .then((employee) => this.setState({employees: this.state.employees.concat([employee])}))
            .then(() => this.setState({processing: false}))
            .catch(e => console.log(e));
    };

    /**
     *
     * @param employee
     * @private
     */
    _onDetailEmployeeClick = (employee) => {
        this.setState({employee}, () => {
            this.refs[REF_MODAL_DETAIL].showModal();
        });
    };

    /**
     *
     * @param employee
     * @private
     */
    _onEditEmployeeClick = (employee) => {
        this.setState({employee}, () => {
            this.refs[REF_MODAL_EDIT].showModal();
        });
    };

    /**
     *
     * @param employee
     * @private
     */
    _onEmployeeSave = (employee) => {
        console.log(employee);
    };

    /**
     *
     * @returns {Array.<*>}
     * @private
     */
    _getFilteredEmployees = () => {
        return this.state.employeeIds
            .map(id => this.state.employees[id])
            .filter(employee => {
                const {filterText} = this.state;
                return !(filterText.length > 0 && employee.name.toLowerCase().search(filterText) == -1);
            });
    };


    /**
     *
     * @returns {XML}
     */
    render() {

        return <div>
            <Navbar
                onFilterChange={this._onFilterChange}
                onAddEmployeeClick={this._onAddEmployeeClick}
            />

            <div className="container" style={{marginTop: '100px'}}>
                <EmployeeList
                    data={this._getFilteredEmployees()}
                    onDeleteClick={() => alert('delete')}
                    onEditClick={this._onEditEmployeeClick}
                    onRowClick={this._onDetailEmployeeClick}
                />
            </div>

            <EditEmployeeModal
                ref={REF_MODAL_NEW}
                title="Add new employee"
                onSave={this._onNewEmployeeSave}
            />

            <EditEmployeeModal
                ref={REF_MODAL_EDIT}
                title="Edit employee"
                onSave={this._onEmployeeSave}
                employee={this.state.employee}
            />

            <DetailEmployeeModal
                title="Detail"
                ref={REF_MODAL_DETAIL}
                employee={this.state.employee}
            />

        </div>
    }
}

export {Dashboard};
