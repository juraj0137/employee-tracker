import React from "react";
import IsEmail from "regex-email";
import {Button} from '../button';
import {ModalWrapper} from './wrapper';

/**
 * Modal for editing information about employee
 *
 * @component
 */
class EditEmployeeModal extends ModalWrapper {

    /**
     *
     * @param props
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = this._getInitialState();

        // onClose function can't be arrow function assigned to class property because there is called 'super'
        this._onClose = this._onClose.bind(this);
    }


    componentWillReceiveProps(nextProps) {
        if (nextProps.employee != null) {
            const {name, email, phone, address} = nextProps.employee;
            this.setState({name, email, phone, address});
        }
    }

    /**
     *
     * @returns {{name: string, email: string, phone: string, address: string, errors: Array}}
     * @private
     */
    _getInitialState = () => {
        return {
            name: '',
            email: '',
            phone: '',
            address: '',
            errors: []
        };
    };

    /**
     *
     * @private
     */
    _onSave = () => {
        // verification
        if (this._isValidForm() == false) return;

        // call callback
        //noinspection JSUnresolvedVariable
        if (typeof this.props.onSave == "function") {
            const {name, phone, email, address} = this.state;

            //noinspection JSUnresolvedFunction
            this.props.onSave({...this.props.employee, name, phone, email, address});
        }

        // hide modal
        this._onClose();
    };


    /**
     *
     * @private
     */
    _onClose() {
        // reset state
        this.setState(this._getInitialState());

        // hide modal
        super.hideModal();
    };


    /**
     *
     * @returns {boolean}
     * @private
     */
    _isValidForm = () => {
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
    };

    /**
     *
     * @returns {XML}
     * @private
     */
    _renderModalBody = () => {

        const errorsList = this.state.errors.length == 0 ? null : <div className="row alert alert-danger">
            {this.state.errors.map(error => <div>{error}</div>)}
        </div>;

        return <div className="container-fluid">
            {errorsList}

            <InputGroup label="* Full name:"
                        value={this.state.name}
                        onChange={(name) => this.setState({name})}/>

            <InputGroup label="Email:"
                        type="email"
                        value={this.state.email}
                        onChange={(email) => this.setState({email})}/>

            <InputGroup label="Address:"
                        value={this.state.address}
                        onChange={(address) => this.setState({address})}/>

            <InputGroup label="Phone number:"
                        type="telephone"
                        value={this.state.phone}
                        onChange={(phone) => this.setState({phone})}/>

            <div className="row">
                <div className="col-sm-8 push-sm-4">* required fields</div>
            </div>
        </div>;
    };

    /**
     *
     * @override
     * @returns {XML}
     */
    render() {
        const modal = <div className="modal-content">
            <div className="modal-header">
                <h4 className="modal-title">{this.props.title}</h4>
            </div>
            <div className="modal-body">
                {this._renderModalBody()}
            </div>
            <div className="modal-footer">
                <Button onClick={this._onClose} type="secondary" style={{marginRight: '15px'}} children="Cancel"/>
                <Button onClick={this._onSave} type="primary" children="Save"/>
            </div>
        </div>;

        return super.renderWrapper(modal);
    }
}


/**
 * Input group wrapper for easier manipulation with onChange handler
 *
 * @param props
 * @returns {XML}
 * @constructor
 */
const InputGroup = (props) => {

    const {onChange, label, value, type = 'text'} = props;
    const id = Math.round(Math.random() * 10000);
    const _onChange = (event) => {
        onChange(event.target.value);
    };

    return <div className="row form-group">
        <label className="col-md-4 col-form-label text-xs-right" htmlFor={id}>{label}</label>
        <div className="col-md-8">
            <input className="form-control" type={type} onChange={_onChange} value={value} id={id}/>
        </div>
    </div>
};

export {EditEmployeeModal};