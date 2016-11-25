import "./style.less";
import React from "react";

/**
 *
 */
class EmployeeList extends React.Component {

    /**
     *
     * @param {MouseEvent} e
     * @param employee
     * @private
     */
    _onEditClick = (e, employee) => {
        e.stopPropagation();

        //noinspection JSUnresolvedVariable
        if (typeof this.props.onEditClick == "function") {

            //noinspection JSUnresolvedFunction
            this.props.onEditClick(employee);
        }

    };

    /**
     *
     * @param {MouseEvent} e
     * @param employee
     * @private
     */
    _onDeleteClick = (e, employee) => {
        e.stopPropagation();

        //noinspection JSUnresolvedVariable
        if (typeof this.props.onDeleteClick == "function") {

            //noinspection JSUnresolvedFunction
            this.props.onDeleteClick(employee)
        }
    };

    /**
     *
     * @param {MouseEvent} e
     * @param employee
     * @private
     */
    _onRowClick = (e, employee) => {

        //noinspection JSUnresolvedVariable
        if (typeof this.props.onRowClick == "function") {

            //noinspection JSUnresolvedFunction
            this.props.onRowClick(employee)
        }
    };

    /**
     *
     * @param employee
     * @param {number} key
     * @returns {XML}
     * @private
     */
    _renderRow = (employee, key) => {
        const salary = (1500 + Math.random() * 1000).toFixed(2);
        return <tr key={key} onClick={(e) => this._onRowClick(e, employee)}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td style={{width: '150px', textAlign: 'right'}}>{salary} <span className="fa fa-eur"/></td>
            <td className="actions-column">
                <button className="btn btn-link btn-sm" onClick={(e) => this._onEditClick(e, employee)}>
                    <i className="fa fa-pencil"/> Edit
                </button>
                <button className="btn btn-link btn-sm" onClick={(e) => this._onDeleteClick(e, employee)}>
                    <i className="fa fa-trash-o"/> Delete
                </button>
            </td>
        </tr>
    };

    /**
     *
     * @returns {XML}
     * @private
     */
    _renderHead = () => {

        const columns = ['Name', 'Email', 'Phone', 'Month salary', ''];

        return <thead>
        <tr>{columns.map((column, i) => <th key={i}>{column}</th>)}</tr>
        </thead>;
    };

    /**
     *
     * @returns {XML}
     */
    render() {
        return <div className="employee-list-wrapper">

            <table className="table table-hover table-striped">

                {this._renderHead()}

                <tbody>
                {this.props.data.map(this._renderRow)}
                </tbody>

            </table>

        </div>
    }
}

export {EmployeeList};
