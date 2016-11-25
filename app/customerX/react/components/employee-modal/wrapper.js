import $ from "jquery";
import React from "react";

/**
 * Modal wrapper for managing open/hide state
 *
 * @component
 */
class ModalWrapper extends React.Component {

    constructor(props) {
        super(props);

        // hideModal & renderWrapper can't be arrow function assigned to class property
        // because of calling 'super.renderWrapper' in child class
        this.hideModal = this.hideModal.bind(this);
        this.renderWrapper = this.renderWrapper.bind(this);
    }

    /**
     * Modal id
     *
     * @type {string}
     */
    id = 'id-' + Math.round(Math.random() * 10000);

    /**
     * Function to make modal visible
     *
     */
    showModal = () => {
        $(`#${this.id}`).modal('show');
    };

    /**
     *
     *
     */
    hideModal() {
        $(`#${this.id}`).modal('hide');
    };

    /**
     *
     * @param children
     * @returns {XML}
     */
    renderWrapper(children) {
        return <div className="modal fade" role="dialog" id={this.id} data-backdrop="static">
            <div className="modal-dialog modal-lg" role="document">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        </div>
    };

    /**
     *
     * @override
     * @returns {XML}
     */
    render() {
        return null
    }
}

export {ModalWrapper};