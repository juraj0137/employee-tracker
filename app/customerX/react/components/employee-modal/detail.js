import './detail.less';
import React from "react";
import {Button} from '../button';
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
        return <div className="salary-wrapper">
            <table className="table">
                <thead>
                <tr>
                    <th>Month</th>
                    <th>Salary</th>
                </tr>
                </thead>
                <tbody>

                <tr>
                    <td>January 2016</td>
                    <td>2450E</td>
                </tr>
                <tr>
                    <td>January 2016</td>
                    <td>2450E</td>
                </tr>
                <tr>
                    <td>January 2016</td>
                    <td>2450E</td>
                </tr>
                <tr>
                    <td>January 2016</td>
                    <td>2450E</td>
                </tr>
                <tr>
                    <td>January 2016</td>
                    <td>2450E</td>
                </tr>
                <tr>
                    <td>January 2016</td>
                    <td>2450E</td>
                </tr>
                <tr>
                    <td>January 2016</td>
                    <td>2450E</td>
                </tr>
                <tr>
                    <td>January 2016</td>
                    <td>2450E</td>
                </tr>
                </tbody>
            </table>
        </div>
    };

    /**
     *
     * @private
     */
    _onSalaryAddClick = () => {
        //noinspection JSUnresolvedVariable
        if (typeof this.props.onSalaryAdd == "function") {
            //noinspection JSUnresolvedFunction
            this.props.onSalaryAdd();
        }
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
                    <Button className="text-xs-left" onClick={this._onSalaryAddClick} children="Add salary"/>
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