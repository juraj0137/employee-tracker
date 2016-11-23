import React from "react";
import IsEmail from "regex-email";
import {Button} from "../button";

/**
 * Modal for editing information about employee
 *
 * @component
 */
class EditEmployeeModal extends React.Component {

    /**
     *
     * @param props
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = this._getInitialState();

        this._onSave = this._onSave.bind(this);
        this._onClose = this._onClose.bind(this);
    }


    /**
     *
     * @returns {{active: boolean, name: string, email: string, phone: string, address: string, errors: Array}}
     * @private
     */
    _getInitialState() {
        return {
            name: '',
            email: '',
            phone: '',
            address: '',
            errors: []
        };
    }

    /**
     *
     * @private
     */
    _onSave() {
        // verification
        if (this._isValidForm() == false) return;

        // call callback
        const {name, phone, email, address} = this.state;
        this.props.onSave({name, phone, email, address});

        // hide modal
        this.props.onHideModal();
    }


    /**
     *
     * @private
     */
    _onClose() {
        this.setState(this._getInitialState());
        this.props.onHideModal();
    }


    _isValidForm() {
        const {name, phone, email, address} = this.state;
        const errors = [];

        if (name.length == 0)
            errors.push("Name field is required!");

        if (email.length > 0 && IsEmail.test(email) == false)
            errors.push("Email address is in incorrect form!");

        if (phone.length > 0 && phone.length < 6)
            errors.push("Phone number is too short!");

        if (errors.length > 0)
            this.setState({errors});

        return errors.length === 0;
    }


    /**
     *
     * @returns {XML}
     * @private
     */
    _renderModalBody() {

        const errors = this.state.errors.map((error, i) => <tr key={i}>
            <td></td>
            <td style={{textAlign: 'left', color: 'red'}}>{error}</td>
        </tr>);

        return <table>
            <tbody>
            {errors}
            <tr>
                <td>* Full name:</td>
                <td><Input value={this.state.name} onChange={(name) => this.setState({name})}/></td>
            </tr>
            <tr>
                <td>Email:</td>
                <td><Input value={this.state.email} onChange={(email) => this.setState({email})}/></td>
            </tr>
            <tr>
                <td>Address:</td>
                <td><Input value={this.state.address} onChange={(address) => this.setState({address})}/></td>
            </tr>
            <tr>
                <td>Phone number:</td>
                <td><Input value={this.state.phone} onChange={(phone) => this.setState({phone})}/></td>
            </tr>
            <tr>
                <td colSpan="2">* required fields</td>
            </tr>
            </tbody>
        </table>;
    }


    /**
     *
     * @override
     * @returns {XML}
     */
    render() {

        return <div className="modal-inner">
            <div className="modal-title">{this.props.title}</div>
            <div className="modal-body">
                {this._renderModalBody()}
            </div>
            <div className="modal-footer">
                <Button onClick={this._onClose} style={{marginRight: '15px'}}>Cancel</Button>
                <Button onClick={this._onSave}>Save</Button>
            </div>
        </div>
    }
}


/**
 * Input wrapper for easier manipulation with onChange handler
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const Input = (props) => {

    const {onChange, ...rest} = props;

    const _onChange = (event) => {
        onChange(event.target.value);
    };

    return <input type="text" onChange={_onChange} {...rest}/>
};

export {EditEmployeeModal};