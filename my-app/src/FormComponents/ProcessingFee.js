import React, { Component } from 'react';
import CardInput from './InputWithoutLabel';
import Heading from './Heading.js';
import Total from './Total.js';
import {connect} from "react-redux";

class ProcessingFee extends Component {
    render() {
        const { partA, partB } = this.props.State;
        const { typeVal } = this.props;
        this.StateV = (this.props.typeVal) ? partB : partA;

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
                    <CardInput id="VISA" partB={typeVal} label={"VISA"} />
                </div>

                <div className="form-group">
                    <CardInput id="Mastercard" partB={typeVal} label={"Mastercard"} />
                </div>

                <div className="form-group">
                    <CardInput id="Discover" partB={typeVal} label={"Discover"} />
                </div>

                <div className="form-group">
                    <CardInput id="AMEX" partB={typeVal} label={"AMEX"} />
                </div>

                <Total label="processing fees" value={`$ ${this.StateV.Total.TotalProcessingFees}`} />
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps)(ProcessingFee);