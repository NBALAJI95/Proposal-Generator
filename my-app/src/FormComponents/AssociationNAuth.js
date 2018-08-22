import React, { Component } from 'react';
import {connect} from "react-redux";
import InputWithLabel from './InputWithLabel.js';
import Heading from './Heading.js';
import {toggleCheck} from "../actions";

class AssociationNAuth extends Component {

    checkChange(event) {
        this.props.toggleCheck(this.props.typeVal || "partA");
    }

    renderCheck() {
        const check = this.StateV.amexCheck;

        if(check) {
            return (
                <div>
                    <InputWithLabel id="amexFee" label="AMEX Fees" partB={this.props.typeVal}
                        placeholder="Amount (USD)" title="AMEX Fees"
                        min="0" required />
                </div>
            );
        }
    }

    render() {
        const { partA, partB } = this.props.State;
        this.StateV = (this.props.typeVal) ? partB : partA;

        const { amexCheck, assoFee, amexFee } = this.StateV;
        return (
            <div>
                <Heading headingText={"Association & Auth"} />

                <div className="form-group">
                    <div className="row">
                        <div className="col-sm-6">
                            <InputWithLabel id="assoFee" partB={this.props.typeVal} label="Association Fees" placeholder="Amount (USD)"
                                title="Association Fees" min="0" required />

                            <div style={{paddingTop: "0.5rem"}} className="form-group">
                                <input id="amex" checked={amexCheck}
                                   onChange={this.checkChange.bind(this)} type="checkbox" aria-label="Checkbox for AMEX" />

                                <label style={{paddingLeft: "7px"}} htmlFor="amex">
                                    Specify Amex Value
                                </label>

                                {this.renderCheck()}

                                {((parseFloat(assoFee) || 0) < (parseFloat(amexFee) || 0))? <b style={{color: 'red'}}> AMEX fee should be less than Association fee </b>: ""}

                            </div>

                        </div>

                        <div className="col-sm-6">
                            <InputWithLabel id="authFee" partB={this.props.typeVal} label="Other Auth fees" placeholder="Amount (USD)"
                                title="Other Auth fees" min="0" required />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}


const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {toggleCheck})(AssociationNAuth);

