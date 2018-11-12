import React, { Component } from 'react';
import {
    FormGroup, Input, Label, InputGroupAddon, InputGroup, Button, Modal,
    ModalHeader, ModalBody, ModalFooter
} from 'reactstrap';
import {updateCashDiscountState, updateNewFees, updateCommon } from '../actions';
import {connect} from 'react-redux';

class CashDiscountInput extends Component {
    constructor(props) {
        super(props);

        this.state = {
            modal: false,
            modalFees: ''
        };

        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    inputValueHandler(event, stateProp, part) {
        if(stateProp.startsWith('fees')) {
            this.props.updateNewFees(stateProp.split('_')[1], event.target.value, part);
        } else if(stateProp === 'modalFees') {
            this.props.updateCommon(stateProp, event.target.value, part);
        } else if(part) {
            this.props.updateCashDiscountState(stateProp, event.target.value, part);
        } else {
            this.setState({modalFees: event.target.value});
        }
    }

    renderAddButton(name) {
        if(name.startsWith("Fees")) {
            return (
                <div>
                    <Button onClick={this.toggle} outline color="success"> <strong> + </strong> </Button>
                </div>
            );
        }
    };

    save(State, part) {
        if(State && State[part].modalFees) {
            this.props.updateNewFees(State[part].modalFees, '', part);
        }
        this.toggle();
    }

    renderNewFees(below, part) {
        const { State } = this.props;
        if(below.startsWith("Fees")) {
            return [...State.additional].map((fee) => {
                return (
                    <div className='row' key={fee} style={{ marginTop: "1rem" }}>
                        <div className="col-sm-6" style={{textAlign: 'right'}}>
                            <strong> <Label for={fee}> {fee} </Label> </strong>
                        </div>
                        <div className="col-md-4">
                            <InputGroup>
                                <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                                <Input type="number" className="form-control" id={fee} value={State[part].additionalFees[fee]}
                                       onChange={(evt) => this.inputValueHandler(evt, `fees_${fee}`, part)}
                                />
                            </InputGroup>
                        </div>
                    </div>
                );
            });
        }
    }

    render() {
        const { name, labelText } = this.props;
        let part;

        if(name[name.length-1] === 'A')
            part = 'partA';
        else
            part = 'partB';

        const { State } = this.props;
        return (
            <FormGroup>
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalHeader toggle={this.toggle}> Add new fee type </ModalHeader>
                    <ModalBody>
                        <Input type="text" className="form-control" id='newFees'
                           value={State[part].modalFees} onChange={(evt) => this.inputValueHandler(evt, "modalFees", part)}
                        />
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>{' '}
                        <Button color="primary" onClick={() => this.save(State, part)}>Save</Button>
                    </ModalFooter>
                </Modal>

                <div className="row" style={{ marginTop: "1rem", marginBottom: "1rem", textAlign:'right'}}>
                    <div className="col-sm-6">
                        <strong>
                            <Label for={name}>
                                {labelText}
                            </Label>
                        </strong>
                    </div>
                    <div className="col-md-4">
                        <InputGroup>
                            <InputGroupAddon addonType="prepend">$</InputGroupAddon>
                            <Input type="number" className="form-control" id={name}
                               value={State[part][name.slice(0, name.length-1)]}
                               onChange={(evt) => this.inputValueHandler(evt, name.slice(0, name.length-1), part)}
                            />
                            {this.renderAddButton(name)}
                        </InputGroup>
                    </div>
                </div>
                {this.renderNewFees(name, part)}
            </FormGroup>
        );
    }
}

const mapStateToProps = (state) => {
    return ({State: state.CashDiscountState});
};

export default connect(mapStateToProps, {updateCashDiscountState, updateCommon, updateNewFees})(CashDiscountInput);