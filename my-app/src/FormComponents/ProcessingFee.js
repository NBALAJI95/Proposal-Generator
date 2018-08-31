import React, { Component } from 'react';
import CardInput from './InputWithoutLabel';
import Heading from './Heading.js';
import Total from './Total.js';
import {connect} from "react-redux";
import { FormGroup, Button } from 'reactstrap';
import {updateStateValue} from "../actions";

class ProcessingFee extends Component {
    clickHandler(field, part) {
        let val = this.StateV.ProcessingFees.VISA[field];

        let pf = Object.assign({}, this.StateV[`ProcessingFees`].Mastercard, { [field]: val });
        let temp = Object.assign({}, this.StateV[`ProcessingFees`], {Mastercard: pf});

        pf = Object.assign({}, this.StateV[`ProcessingFees`].Discover, { [field]: val });
        temp = Object.assign({}, temp, {Discover: pf});

        pf = Object.assign({}, this.StateV[`ProcessingFees`].AMEX, { [field]: val });
        temp = Object.assign({}, temp, {AMEX: pf});
        this.props.updateStateValue('InputWithLabel', "ProcessingFees", temp, part);
    }

    render() {
        const { partA, partB } = this.props.State;
        const { typeVal } = this.props;

        const processingItems = ["VISA", "Mastercard", "Discover", "AMEX"];
        const cardInputs = processingItems.map((item, i) => (
            <FormGroup key={i}> <CardInput id={item} partB={typeVal} label={item} /> </FormGroup>
        ));

        const part = (this.props.typeVal) ? "partB" : "partA";
        this.StateV = (this.props.typeVal) ? partB : partA;

        return (
            <div>
                <Heading headingText={"Processing Fees"} required />

                <div className="row" style={{ fontSize: "1.1rem" }}>
                    <div className="col-sm-2"> <strong> Card </strong> </div>

                    <div className="col-sm-2"> <strong> Volume </strong> </div>

                    <div className="col-sm-2"> <strong> # </strong> </div>

                    <div className="col-sm-2">
                        <Button onClick={this.clickHandler.bind(this, "Percentage", part)}
                            title={"Fill the first '%' value for the rest"} outline color="info"> % </Button>{' '}
                    </div>

                    <div className="col-sm-2">
                        <Button onClick={this.clickHandler.bind(this, "Item", part)}
                           title={"Fill the first 'Item' value for the rest"} outline color="info"> Item </Button>{' '}
                    </div>

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

export default connect(mapStateToProps, {updateStateValue})(ProcessingFee);