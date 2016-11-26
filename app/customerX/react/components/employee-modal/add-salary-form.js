import React from 'react';
import {Button} from '../button';
import {InputGroup} from '../input-group';

class AddSalaryForm extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            formVisible: false,
            salary: 0,
            date: new Date()
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.salary == null) {
            this.setState({
                salary: 0,
                date: new Date(),
                formVisible: false,
            });
            return;
        }

        if (nextProps.salary != null && this.state.salary != nextProps.salary.salary && this.state.date != nextProps.salary.date) {
            this.setState({
                salary: nextProps.salary.salary,
                date: new Date(nextProps.salary.date),
                formVisible: true,
            })
        }
    }

    _onDateChange = (date) => {
        if (Number.isNaN(Date.parse(date)) == false) {
            this.setState({date: Date.parse(date)});
        }
    };

    _onSave = () => {
        this.setState({formVisible: false});
        //noinspection JSUnresolvedFunction
        this.props.onAdd({
            salary: this.state.salary,
            date: new Date(this.state.date)
        })
    };

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

export {AddSalaryForm}