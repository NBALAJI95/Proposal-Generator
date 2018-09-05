import React, { Component } from 'react';
import InputWithLabel from './InputWithLabel.js';
import Heading from './Heading.js';
import Total from './Total.js';
import {connect} from "react-redux";
import {updateStateValue} from "../actions";
import { FormGroup } from 'reactstrap';

const ValueOf = (val) => (
    parseFloat(val) || 0
);

const currency = (val) => {
    val = `$ ${parseFloat(val).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2})}`;
    return (val !== '$ NaN') ? val : ' ';
};

class AdditionalFee extends Component {
    constructor(props) {
        super(props);
        this.state = { modalInput: ''};
    }

    changeHandler(event) {
        this.setState({modalInput: event.target.value}, () => {console.log("Local State", this.state);});
    }

    clickHandler() {
        const { updateStateValue } = this.props;
        const newFeesVal = [...this.StateV.newFees, this.state.modalInput];
        this.setState({modalInput: ''});
        updateStateValue('ModalState', 'newFees', newFeesVal, (this.props.typeVal) ? 'partB' : 'partA');
    }


    renderRows(e) {
        const returnVal = [];

        for(let i = 0; i < e.length; i++) {
            returnVal.push(
                <div className="col-sm-4" key={`${e[i]}_${i}`}>
                    <InputWithLabel id={`AdditionalFees_${e[i]}`} label={e[i]} placeholder="Amount (USD)"
                        title={e[i]} min="0" partB={this.props.typeVal} />
                  </div>);
        }

        return returnVal;
    }

    renderNewElements() {
        const newElements = this.StateV.newFees;
        const returnComponent = [];
        const iterations = Math.ceil(newElements.length / 3);
        let j = 0;

        for(let i = 0; i < iterations; i++) {
            returnComponent.push(<div className="row" key={i}> {this.renderRows(newElements.slice(j, j+3))} </div>);
            j += 3;
        }

        return returnComponent;
    }

    renderModal(Id, part) {
        return (
            <div>
                <button type="button" className="btn btn-primary" data-toggle="modal" data-target={`#${Id}`}>
                    Add New Additional Fees
                </button>

                <div className="modal fade" id={Id} tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <input id={part} value={this.state.modalInput} name="newFee" type="text"
                                   onChange={this.changeHandler.bind(this)}/>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" data-dismiss="modal">Close
                                </button>
                                <button type="button" onClick={this.clickHandler.bind(this)} className="btn btn-primary">
                                    Save changes
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    renderAddNewAdditionalFee() {
        if(!this.props.typeVal) {
            return this.renderModal('exampleModal1', 'partA');
        }
        else {
            return this.renderModal('exampleModal2', 'partB');
        }
    }

    render() {
        const { partA, partB } = this.props.State;
        const { typeVal } = this.props;
        this.StateV = (this.props.typeVal) ? partB : partA;

        return (
            <div>
                <Heading headingText={"Additional Fees"} required />

                <FormGroup>
                    <div className="row">
                        <div className="col-sm-4">
                            <InputWithLabel id="AdditionalFees_monthlyFee" label="Monthly Fees" placeholder="Amount (USD)"
                                title="Monthly Fees" min="0" partB={typeVal} />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="AdditionalFees_regulatoryFee" label="Regulatory Fees" placeholder="Amount (USD)"
                                title="Regulatory Fees" min="0" partB={typeVal} />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="AdditionalFees_pciFee" label="PCI Compliance Fees" placeholder="Amount (USD)"
                                title="PCI Compliance Fees" min="0" partB={typeVal} />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col-sm-4">
                            <InputWithLabel id="AdditionalFees_techFee" label="Tech Fees" placeholder="Amount (USD)"
                                title="Tech Fees" min="0" partB={typeVal} />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="AdditionalFees_pos" label="POS Fees" placeholder="Amount (USD)"
                                title="POS Fees" min="0" partB={typeVal} />
                        </div>

                        <div className="col-sm-4">
                            <InputWithLabel id="AdditionalFees_misc" label="Misc Fees" placeholder="Amount (USD)"
                                title="Misc Fees" min="0" partB={typeVal} />
                        </div>

                    </div>

                    {this.renderNewElements()}

                    <br/>

                    {this.renderAddNewAdditionalFee()}

                    <Total label="additional fees" value={currency(this.StateV.Total.TotalAdditionalFee)} />

                    <hr/>

                    <Total label="Fees" value={currency(this.StateV.Total.Total_Fee)} />

                    <Total label="Effective Rate"
                       value={(ValueOf(( (this.StateV.Total.Total_Fee / ValueOf(this.StateV.volume)) * 100).toFixed(2))
                       || " - " )+ "%"} />

                    <hr/>

                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(AdditionalFee);