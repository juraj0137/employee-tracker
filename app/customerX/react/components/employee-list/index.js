import "./style.less";
import React from "react";

/**
 *
 */
class EmployeeList extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            order: '',
            filterCol: '',
            employees: props.data || []
        }
    }

    /**
     *
     * @param nextProps
     */
    componentWillReceiveProps(nextProps) {
        if (this.state.employees != nextProps.data) {
            this.setState({employees: nextProps.data});
        }
    }

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
        let salary = employee.salary || 0;
        return <tr key={key} onClick={(e) => this._onRowClick(e, employee)}>
            <td>{employee.name}</td>
            <td>{employee.email}</td>
            <td>{employee.phone}</td>
            <td>{parseInt(salary).toFixed(2)} <span className="fa fa-eur"/></td>
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

    _onSetFilter = (columnKey) => {

        const {order, filterCol} = this.state;

        if (filterCol == '') {
            this.setState({filterCol: columnKey, order: 'asc'});
        } else if (filterCol == columnKey) {
            this.setState({order: order == 'asc' ? 'desc' : 'asc'});
        } else {
            this.setState({filterCol: columnKey, order: 'asc'});
        }
    };

    /**
     *
     * @returns {XML}
     * @private
     */
    _renderHead = () => {

        const columns = {
            name: 'Name',
            email: 'Email',
            phone: 'Phone',
            salary: 'Month salary',
            action: 'Actions'
        };

        return <thead>
        <tr>
            {
                Object.keys(columns).map((key) =>
                    <ColumnHeader
                        key={key}
                        onClick={() => this._onSetFilter(key)}
                        filterValue={this.state.filterCol}
                        columnValue={key}
                        order={this.state.order}
                    >
                        {columns[key]}
                    </ColumnHeader>
                )
            }
        </tr>
        </thead>;
    };

    /**
     *
     * @private
     */
    _getFilteredData = () => {
        if (!(this.state.employees instanceof Array))
            return [];

        const {filterCol, order, employees} = this.state;

        if (filterCol) {
            return employees.sort((colA, colB) => {
                let a = colA[filterCol];
                let b = colB[filterCol];

                if (typeof a == "number")
                    return (order == 'desc' ? b - a : a - b);
                if (typeof a == "string") {
                    return order == 'desc' ? b.localeCompare(a) : a.localeCompare(b);
                }

            });
        }

        return employees;
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
                {this._getFilteredData().map(this._renderRow)}
                </tbody>

            </table>

        </div>
    }
}

export {EmployeeList};


const ColumnHeader = (props) => {

    let styles = [];
    let icon = null;

    if (typeof props.onClick == "function") {
        styles.push('filtered');

        if (props.columnValue == props.filterValue) {
            let order = props.order ? '-' + props.order : '';
            icon = <i className={`fa fa-sort${order}`}/>;
        }
    }

    return <th onClick={props.onClick} className={styles.join(' ')}>{props.children}{icon}</th>
};
