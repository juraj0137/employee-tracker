import './detail.less';
import React from "react";
import {Button} from '../button';
import {ModalWrapper} from './wrapper';

/**
 * Modal for displaying message if you are sure you want to delete employee
 *
 * @component
 */
class RemoveEmployeeModal extends ModalWrapper {

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

    _hideModal() {
        super.hideModal();
    }

    /**
     *
     * @private
     */
    _onCancelClick = () => {
        //noinspection JSUnresolvedVariable
        if (typeof this.props.onRefuse == "function") {
            //noinspection JSUnresolvedFunction
            this.props.onRefuse()
        }

        this._hideModal();
    };

    _onDeleteClick = () => {
        //noinspection JSUnresolvedVariable
        if (typeof this.props.onAccept == "function") {
            //noinspection JSUnresolvedFunction
            this.props.onAccept(this.props.employee)
        }

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
                <h4 className="modal-title">Are you sure you want to delete employee?</h4>
            </div>

            <div className="modal-body row">
                <div className="col-sm-12">
                    <h4>Personal info</h4>
                    {this._renderEmployeeInfo()}
                </div>
            </div>

            <div className="modal-footer">
                <Button type="secondary" onClick={this._onCancelClick} style={{marginRight: '15px'}} children="Cancel"/>
                <Button type="danger" onClick={this._onDeleteClick} children="Yes, delete employee"/>
            </div>
        </div>;

        return super.renderWrapper(modal);
    }
}

export {RemoveEmployeeModal};