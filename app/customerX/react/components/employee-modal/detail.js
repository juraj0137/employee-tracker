import './detail.less';
import React from "react";
import {Button} from '../button';
import {ModalWrapper} from './wrapper';
import {AddSalaryForm} from './add-salary-form';
import {SalaryTableRow} from './salary-table-row';

/**
 * Modal for viewing information about employee
 *
 * @component
 */
class DetailEmployeeModal extends ModalWrapper {

    constructor(props) {
        super(props);

        this.state = {
            editedSalary: null
        }
    }

    /**
     *
     * @returns {XML}
     * @private
     */
    _renderEmployeeInfo = () => {

        const infoConfig = {
            name: 'Full name:',
            email: 'Email:',
            address: 'Address:',
            phone: 'Phone number:',
        };

        const rows = Object.keys(infoConfig).map(key => <tr key={key}>
            <td className="font-weight-bold">{infoConfig[key]}</td>
            <td>{this.props.employee[key]}</td>
        </tr>);

        return <table className="table">
            <tbody>
            {rows}
            </tbody>
        </table>;
    };

    /**
     *
     * @returns {XML}
     * @private
     */
    _renderSalaries = () => {

        const {salaries, salariesByEmployeeId, employee} = this.props;

        if (!(salariesByEmployeeId[employee.id] instanceof Array))
            return null;

        const rows = salariesByEmployeeId[employee.id]
            .map((salaryId) => salaries[salaryId])
            .sort((a, b) => b.date - a.date)
            .map((salary, i) => <SalaryTableRow key={i}
                                                salary={salary}
                                                onEditClick={() => this.setState({editedSalary: salary})}
                                                onDeleteClick={this.props.onSalaryDelete}/>);

        return <div className="salary-list-wrapper">
            <table className="table">
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Salary</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {rows}
                </tbody>
            </table>
        </div>
    };

    _hideModal() {
        super.hideModal();
    }

    /**
     *
     * @private
     */
    _onCancelClick = () => {
        this._hideModal();
    };

    _onSalaryAdd = (salary) => {

        this.props.onSalaryAdd({
            ...this.state.editedSalary,
            ...salary,
            employeeId: this.props.employee.id,
        });

        this.setState({editedSalary: null});
    };

    /**
     *
     * @override
     * @returns {XML}
     */
    render() {

        if (this.props.employee == null)
            return null;

        const modal = <div className="modal-content detail">
            <div className="modal-header">
                <h4 className="modal-title">{this.props.title}</h4>
            </div>

            <div className="modal-body row">
                <div className="col-sm-6">
                    <h4>Personal info</h4>
                    {this._renderEmployeeInfo()}
                    <AddSalaryForm
                        onAdd={this._onSalaryAdd}
                        salary={this.state.editedSalary}
                    />
                </div>
                <div className="col-sm-6">
                    <h4>Salaries</h4>
                    {this._renderSalaries()}
                </div>
            </div>

            <div className="modal-footer">
                <Button type="secondary" onClick={this._onCancelClick} children="Cancel"/>
            </div>
        </div>;

        return super.renderWrapper(modal);
    }
}

export {DetailEmployeeModal};