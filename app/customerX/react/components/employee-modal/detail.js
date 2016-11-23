import React from "react";
import {Button} from "../button";

/**
 * Modal for editing information about employee
 *
 * @component
 */
class DetailEmployeeModal extends React.Component {

    /**
     *
     * @returns {XML}
     * @private
     */
    _renderEmployeeInfo() {

        return <table className="employee-info">
            <tbody>
            <tr>
                <td>Full name:</td>
                <td>{this.props.employee.name}</td>
            </tr>
            <tr>
                <td>Email:</td>
                <td>{this.props.employee.email}</td>
            </tr>
            <tr>
                <td>Address:</td>
                <td>{this.props.employee.address}</td>
            </tr>
            <tr>
                <td>Phone number:</td>
                <td>{this.props.employee.phone}</td>
            </tr>
            </tbody>
        </table>;
    }

    _renderSalaries() {
        return <div className="salary-wrapper">
            <h2>Salaries:</h2>
            <div className="table-scroll-wrapper">

                <table>
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
                </table>
            </div>
        </div>
    }


    /**
     *
     * @override
     * @returns {XML}
     */
    render() {

        if (this.props.employee == null)
            return null;

        return <div className="modal-inner">
            <div className="modal-title">{this.props.title}</div>
            <div className="modal-body">
                {this._renderEmployeeInfo()}
                {this._renderSalaries()}
            </div>
            <div className="modal-footer">
                <Button onClick={() => this.props.onHideModal()} style={{marginRight: '15px'}}>Cancel</Button>
            </div>
        </div>
    }
}


export {DetailEmployeeModal};