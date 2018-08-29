import React, { Component } from 'react';
import CardInput from './InputWithoutLabel';
import Heading from './Heading.js';
import Total from './Total.js';
import {connect} from "react-redux";
import { FormGroup } from 'reactstrap';

class ProcessingFee extends Component {
    render() {
        const { partA, partB } = this.props.State;
        const { typeVal } = this.props;

        const processingItems = ["VISA", "Mastercard", "Discover", "AMEX"];
        const cardInputs = processingItems.map((item, i) => (
            <FormGroup key={i}> <CardInput id={item} partB={typeVal} label={item} /> </FormGroup>
        ));

        this.StateV = (this.props.typeVal) ? partB : partA;

        return (
            <div>
                <Heading headingText={"Processing Fees"} required />

                <div className="row" style={{ fontSize: "1.1rem" }}>
                    <div className="col-sm-2"> <strong> Card </strong> </div>

                    <div className="col-sm-2"> <strong> Volume </strong> </div>

                    <div className="col-sm-2"> <strong> # </strong> </div>

                    <div className="col-sm-2"> <strong> % </strong> </div>

                    <div className="col-sm-2"> <strong> Item </strong> </div>

                    <div className="col-sm-2"> <strong> Fee </strong> </div>
                </div>

                <hr/>

                {cardInputs}

                <Total label="processing fees" value={`$ ${this.StateV.Total.TotalProcessingFees}`} />
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps)(ProcessingFee);