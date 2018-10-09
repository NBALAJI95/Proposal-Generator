import React, { Component } from 'react';
import {connect} from "react-redux";
import InputWithLabel from './InputWithLabel.js';
import Heading from './Heading.js';
import {toggleCheck} from "../actions";
import { FormGroup, Label, Input } from 'reactstrap';

class AssociationNAuth extends Component {

    checkChange(event) {
        this.props.toggleCheck(this.props.typeVal || "partA");
    }

    renderCheck(typeVal) {
        const check = this.StateV.amexCheck;

        if(check) {
            return (
                <div>
                    <InputWithLabel id="amexFee" label="AMEX Fees" partB={typeVal}  placeholder="Amount (USD)" min="0"
                        title="AMEX Fees" required />
                </div>
            );
        }
    }

    render() {
        const { partA, partB } = this.props.State;
        this.StateV = (this.props.typeVal) ? partB : partA;
        const { typeVal } = this.props;

        const { amexCheck, assoFee, amexFee } = this.StateV;
        return (
            <div>
                <Heading headingText={"Association & Auth"} />

                <FormGroup>
                    <div className="row">
                        <div className="col-sm-6">
                            <InputWithLabel id="assoFee" partB={typeVal} label="Association Fees" placeholder="Amount (USD)"
                                title="Association Fees" min="0" required />

                            <div style={{paddingTop: "0.5rem"}} className="form-group">
                                <FormGroup check>
                                    <Label check>
                                        <Input type="checkbox" checked={amexCheck}
                                            onChange={this.checkChange.bind(this)} />{' '} Specify Amex Value
                                    </Label>
                                </FormGroup>

                                {this.renderCheck(typeVal)}

                                {((parseFloat(assoFee) || 0) < (parseFloat(amexFee) || 0))?
                                    <b style={{color: 'red'}}> AMEX fee should be less than Association fee </b>: ""}

                            </div>

                        </div>

                        <div className="col-sm-6">
                            <InputWithLabel id="authFee" partB={typeVal} label="Other Auth fees" placeholder="Amount (USD)"
                                title="Other Auth fees" min="0" required />
                        </div>
                    </div>
                </FormGroup>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => (stateV);

export default connect(mapStateToProps, {toggleCheck})(AssociationNAuth);