import "./style.less";
import React from "react";
import {EditEmployeeModal} from "./edit";
import {DetailEmployeeModal} from "./detail";

/**
 * Modal for editing information about employee
 *
 * @component
 */
class EmployeeModal extends React.Component {

    /**
     *
     * @param props
     * @constructor
     */
    constructor(props) {
        super(props);

        this.state = {active: false, employee: null};

        this._hideModal = this._hideModal.bind(this);
    }


    /**
     * Function to make modal visible
     *
     */
    showModal(employee = null) {
        this.setState({active: true, employee});
    }


    /**
     *
     * @private
     */
    _hideModal() {
        this.setState({active: false, employee: null});
    }

    /**
     *
     * @override
     * @returns {XML}
     */
    render() {

        const modalStyle = {
            display: this.state.active ? "block" : "none"
        };

        const type = this.props.type;

        if (type == 'new') {

            return <div className={`edit-employee-modal ${type}`} style={modalStyle}>
                <EditEmployeeModal onHideModal={this._hideModal} {...this.props} />
            </div>;

        } else if (type == 'edit') {

            return <div className={`edit-employee-modal ${type}`} style={modalStyle}>
                <EditEmployeeModal onHideModal={this._hideModal} {...this.props} />
            </div>;

        } else if (type == 'detail') {

            return <div className={`edit-employee-modal ${type}`} style={modalStyle}>
                <DetailEmployeeModal onHideModal={this._hideModal} employee={this.state.employee} {...this.props} />
            </div>;

        }

        return null;
    }
}

export {EmployeeModal};