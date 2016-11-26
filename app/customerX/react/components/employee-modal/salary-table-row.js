/**
 * Created by jkubala on 11/26/16.
 */
import React from 'react';

class SalaryTableRow extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false
        }
    }

    _renderActionButtons = () => {
        return <td className="actions-column">
            <button className="btn btn-link btn-sm" onClick={this.props.onEditClick}>
                <i className="fa fa-pencil"/>
            </button>
            <button className="btn btn-link btn-sm" onClick={() => this.setState({formVisible: true})}>
                <i className="fa fa-trash-o"/>
            </button>
        </td>;
    };

    _renderConfirmationForm = () => {
        return <td className="actions-column">
            <button className="btn btn-link btn-sm" onClick={() => this.setState({formVisible: false})}>
                <i className="fa fa-times"/>
            </button>
            <button className="btn btn-sm btn-danger"
                    onClick={() => {
                        this.setState({formVisible: false});
                        this.props.onDeleteClick(this.props.salary);
                    }}>
                Delete
            </button>
        </td>;
    };

    render() {

        if (this.props.salary == null)
            return null;

        const {date, salary} = this.props.salary;
        const formattedDate = `${date.getDate()}.${date.getMonth() + 1}.${date.getFullYear()}`;

        return <tr>
            <td>{formattedDate}</td>
            <td>{salary} <span className="fa fa-eur"/></td>
            {this.state.formVisible ? this._renderConfirmationForm() : this._renderActionButtons()}
        </tr>;
    }
}

export {SalaryTableRow}