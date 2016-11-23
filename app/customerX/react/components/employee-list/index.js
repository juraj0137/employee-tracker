import "./style.less";
import React from "react";
import {EmployeeModal} from '../employee-modal';

const REF_EDIT_MODAL = 'detail';
const REF_DETAIL_MODAL = 'detail';

/**
 *
 */
class EmployeeList extends React.Component {

    /**
     *
     * @param props
     */
    constructor(props) {
        super(props);

        this._renderRow = this._renderRow.bind(this);
    }


    /**
     *
     * @param employee
     * @param key
     * @returns {XML}
     * @private
     */
    _renderRow(employee, key) {
        return <tr key={key} onClick={() => this.refs[REF_DETAIL_MODAL].showModal(employee)}>
            <td>{employee.name}</td>
            <td>{Math.random() * 1500}E</td>
        </tr>
    }


    /**
     *
     * @returns {XML}
     * @private
     */
    _renderHead() {
        return <thead>
        <tr>
            <th>Name</th>
            <th>Sallary</th>
        </tr>
        </thead>;
    }


    /**
     *
     * @returns {XML}
     */
    render() {
        return <div className="employee-list-wrapper">

            <EmployeeModal title="Edit employee"/>

            <EmployeeModal title="Detail"
                           ref={REF_DETAIL_MODAL}
                           type="detail"/>

            <table className="employee-list">
                {this._renderHead()}
                <tbody>
                {this.props.data.map(this._renderRow)}
                </tbody>
            </table>
        </div>
    }
}

export {EmployeeList};