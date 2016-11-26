import './detail.less';
import React from "react";
import {Button} from '../button';
import {InputGroup} from '../input-group';
import {ModalWrapper} from './wrapper';

/**
 * Modal for viewing information about employee
 *
 * @component
 */
class DetailEmployeeModal extends ModalWrapper {

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
            return;

        const rows = salariesByEmployeeId[employee.id]
            .map((salaryId, i) => {
                const salary = salaries[salaryId];
                const date = `${salary.date.getDate()}.${salary.date.getMonth() + 1}.${salary.date.getFullYear()}`;
                return <tr key={i}>
                    <td>{date}</td>
                    <td>{salary.salary}E</td>
                </tr>;
            });

        return <div className="salary-wrapper">
            <table className="table">
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Salary</th>
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
            ...salary,
            employeeId: this.props.employee.id
        })
    }

    /**
     *
     * @override
     * @returns {XML}
     */
    render() {

        if (this.props.employee == null)
            return null;

        const modal = <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">{this.props.title}</h4>
            </div>

            <div className="modal-body row">
                <div className="col-sm-6">
                    <h4>Personal info</h4>
                    {this._renderEmployeeInfo()}
                    <AddSalaryForm onAdd={this._onSalaryAdd}/>
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

class AddSalaryForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            salary: 0,
            date: new Date()
        }
    }

    _onDateChange = (date) => {
        if (Number.isNaN(Date.parse(date)) == false) {
            this.setState({date: Date.parse(date)});
        }
    }

    _onSave = () => {
        this.setState({formVisible: false});
        this.props.onAdd({
            salary: this.state.salary,
            date: new Date(this.state.date)
        })
    }

    render() {
        if (!this.state.formVisible)
            return <Button
                className="btn-block"
                children="Add salary"
                onClick={() => this.setState({formVisible: true})}
            />;

        const date = new Date(this.state.date);

        const padWithZero = (number) => {
            return ('0' + number).slice(-2);
        };

        const dateString = `${date.getFullYear()}-${padWithZero(date.getMonth() + 1)}-${padWithZero(date.getDate())}`;

        return <div>

            <h4>Salary </h4>

            <InputGroup
                type="number"
                label="Salary:"
                value={this.state.salary}
                onChange={(salary) => this.setState({salary})}
            />

            <InputGroup
                label="Date:"
                type="date"
                value={dateString}
                onChange={this._onDateChange}
            />

            <Button
                type="success"
                children="Save"
                className="btn-block"
                onClick={this._onSave}
            />

        </div>
    }
}
;

export {DetailEmployeeModal};