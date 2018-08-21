import React, { Component } from 'react';
import CardInput from './InputWithoutLabel';
import Heading from './Heading.js';
import Total from './Total.js';
import {connect} from "react-redux";
import {updateStateValue} from "../actions";

const ValueOf = (val) => (
    parseFloat(val) || 0
);

class ProcessingFee extends Component {
    calculateProcessingFee() {
        const array_val = ['VISA', 'Mastercard', 'Discover', 'AMEX'];

        let total = 0;

        array_val.forEach((val) => {
            total += ValueOf(this.props.State[val].Fee);
        });

        total = ValueOf(total.toFixed(2));

        return total;
    }
    
    render() {
        return (
            <div>
                <Heading headingText={"Processing Fees"} required />

                <div className="row" style={{ fontSize: "1.1rem" }}>
                    <div className="col-sm-2">
                        <strong> Card </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> Volume </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> # </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> % </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> Item </strong>
                    </div>

                    <div className="col-sm-2">
                        <strong> Fee </strong>
                    </div>
                </div>

                <hr/>

                <div className="form-group">
                    <CardInput id="VISA" label={"VISA"} />
                </div>

                <div className="form-group">
                    <CardInput id="Mastercard" label={"Mastercard"} />
                </div>

                <div className="form-group">
                    <CardInput id="Discover" label={"Discover"} />
                </div>

                <div className="form-group">
                    <CardInput id="AMEX" label={"AMEX"} />
                </div>

                <Total label="processing fees" value={`$ ${this.calculateProcessingFee()}`} />
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(ProcessingFee);