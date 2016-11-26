import './style.less';
import React from "react";

import {EmployeeApi, SalaryApi} from '../../utils'

import {Navbar} from "../../components/navbar"
import {EmployeeList} from "../../components/employee-list"
import {EditEmployeeModal, DetailEmployeeModal, RemoveEmployeeModal} from "../../components/employee-modal"

const REF_MODAL_NEW = 'employee-modal-new';
const REF_MODAL_EDIT = 'employee-modal-edit';
const REF_MODAL_DETAIL = 'employee-modal-detail';
const REF_MODAL_REMOVE = 'employee-modal-remove';

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
            employee: null,
            employees: {},
            employeeIds: [],
            salaries: {},
            salariesByEmployeeId: {}
        };
    }

    /**
     *
     */
    componentDidMount() {
        EmployeeApi
            .loadEmployees()
            .then(employees => {

                const employeesById = employees.reduce((prev, next) => {
                    prev[next.id] = next;
                    return prev;
                }, {});

                const employeeIds = Object.keys(employeesById);

                this.setState({
                    employees: employeesById,
                    employeeIds: employeeIds
                });

                return employeeIds;
            })
            .then(this._loadSalariesForEmployees);

    }

    _loadSalariesForEmployees = (employeeIds, options = {}) => {
        return SalaryApi
            .loadSalariesByEmployeeIds(employeeIds, options)
            .then(salaries => {

                const salariesById = salaries.reduce((prev, next) => {
                    prev[next.id] = next;
                    return prev;
                }, {});

                const salariesIdsByEmployee = salaries.reduce((prev, next) => {
                    prev[next.employeeId] = prev[next.employeeId] || [];
                    prev[next.employeeId].push(next.id);
                    return prev;
                }, {});

                this.setState({
                    salaries: {...this.state.salaries, ...salariesById},
                    salariesByEmployeeId: {...this.state.salariesByEmployeeId, ...salariesIdsByEmployee}
                })
            });
    };

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
    _onAddEmployeeClick = () => {
        this.refs[REF_MODAL_NEW].showModal()
    };


    /**
     *
     * @param values
     * @private
     */
    _onNewEmployeeSave = (values)=> {

        EmployeeApi.saveEmployee(values)
            .then(employee =>
                this.setState({
                    employees: {...this.state.employees, [employee.id]: employee},
                    employeeIds: [employee.id, ...this.state.employeeIds]
                })
            )
            .catch(e => console.log(e));
    };

    /**
     *
     * @param employee
     * @private
     */
    _onDetailEmployeeClick = (employee) => {
        this.setState({employee}, () => {
            this._loadSalariesForEmployees([employee.id]);
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
    _onDeleteEmployeeClick = (employee) => {
        this.setState({employee}, () => {
            this.refs[REF_MODAL_REMOVE].showModal();
        });
    };

    /**
     *
     * @param employee
     * @private
     */
    _onEmployeeSave = (employee) => {
        EmployeeApi.updateEmployee(employee)
            .then((employee) => this.setState({
                employees: {...this.state.employees, [employee.id]: employee},
            }));
    };

    /**
     *
     * @param employee
     * @private
     */
    _onEmployeeDelete = (employee) => {
        EmployeeApi.deleteEmployee(employee)
            .then((employee) => {
                const newEmployees = {...this.state.employees};
                delete newEmployees[employee.id];
                this.setState({
                    employees: newEmployees,
                    employeeIds: this.state.employeeIds.filter(id => id != employee.id)
                })
            });
    };

    /**
     *
     * @param salary
     * @private
     */
    _onSalarySave = (salary) => {
        if (typeof salary.id != "undefined")
            SalaryApi.updateSalary(salary)
                .then(salary => {
                    this.setState({
                        salaries: {...this.state.salaries, [salary.id]: salary},
                    })
                });
        else
            SalaryApi.saveSalary(salary)
                .then(salary => {
                    this.setState({
                        salaries: {...this.state.salaries, [salary.id]: salary},
                        salariesByEmployeeId: {
                            ...this.state.salariesByEmployeeId,
                            [salary.employeeId]: [...this.state.salariesByEmployeeId[salary.employeeId], salary.id]
                        }
                    })
                })
    };

    /**
     *
     * @param salary
     * @private
     */
    _onSalaryDelete = (salary) => {
        SalaryApi.deleteSalary(salary)
            .then(salary => {

                const salaries = {...this.state.salaries};
                delete salaries[salary.id];

                this.setState({
                    salaries: salaries,
                    salariesByEmployeeId: {
                        ...this.state.salariesByEmployeeId,
                        [salary.employeeId]: this.state.salariesByEmployeeId[salary.employeeId].filter(id => id !== salary.id)
                    }
                })
            })
    };

    /**
     *
     * @returns {Array.<*>}
     * @private
     */
    _getFilteredEmployees = () => {
        return this.state.employeeIds
            .map(id => {
                const employee = this.state.employees[id];

                if (this.state.salariesByEmployeeId[id]) {
                    const salaryId = this.state.salariesByEmployeeId[id][0];
                    employee.salary = this.state.salaries[salaryId].salary;
                }

                return employee;
            })
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

        const employeesData = this._getFilteredEmployees();

        let totalSalary = employeesData.reduce((prev, next) => prev + next.salary, 0);

        if (Number.isNaN(totalSalary))
            totalSalary = 0;

        const averageSalary = totalSalary / employeesData.length;

        return <div>
            <Navbar
                onFilterChange={this._onFilterChange}
                onAddEmployeeClick={this._onAddEmployeeClick}
            />

            <div className="container" style={{marginTop: '100px'}}>

                <div className="row">
                    <div className="col-xs-12 text-xs-right" style={{paddingBottom: '20px'}}>
                        Total salary: <b>{totalSalary.toFixed(2)}</b> <span className="fa fa-eur"/> !
                        Average salary: <b>{averageSalary.toFixed(2)}</b> <span className="fa fa-eur"/>
                    </div>
                </div>

                <EmployeeList
                    data={employeesData}
                    onDeleteClick={this._onDeleteEmployeeClick}
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
                salaries={this.state.salaries}
                onSalaryAdd={this._onSalarySave}
                onSalaryDelete={this._onSalaryDelete}
                salariesByEmployeeId={this.state.salariesByEmployeeId}
            />

            <RemoveEmployeeModal
                ref={REF_MODAL_REMOVE}
                onAccept={this._onEmployeeDelete}
                employee={this.state.employee}
            />

        </div>
    }
}

export {Dashboard};
