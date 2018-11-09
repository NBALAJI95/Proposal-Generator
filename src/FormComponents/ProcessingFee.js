import React, { Component } from 'react';
import CardInput from './InputWithoutLabel';
import Heading from './Heading.js';
import Total from './Total.js';
import {connect} from "react-redux";
import { FormGroup, Button, UncontrolledTooltip } from 'reactstrap';
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
                <br/>
                <Heading headingText={"Processing Fees"} required />
                <div className="row" style={{ fontSize: "1.05rem", paddingTop: "0.7rem" }}>
                    <div className="col-sm-2"> <strong> Card </strong> </div>

                    <div className="col-sm-2"> <strong> Volume </strong> </div>

                    <div className="col-sm-2"> <strong> # of Transactions </strong> </div>

                    <div className="col-sm-2">
                        <Button id={`percentage_${part}`} color="info" onClick={this.clickHandler.bind(this, "Percentage", part)}>
                            %
                            <UncontrolledTooltip placement="top" target={`percentage_${part}`}>
                                {`Fill the 1st '%' value for the rest. NOTE: This is the basis point markup on top of interchange.`}
                            </UncontrolledTooltip>
                        </Button>{' '}
                        <br/>
                        <b style={{fontSize: '0.9rem'}}>Interchange markup</b>
                    </div>

                    <div id="TooltipExample" className="col-sm-2">

                        <Button id={`Item_${part}`} color="info" onClick={this.clickHandler.bind(this, "Item", part)}>                            Item
                            <UncontrolledTooltip placement="top" target={`Item_${part}`}>
                                {"Fill the 1st 'Item' value for the rest."}
                            </UncontrolledTooltip>
                        </Button>{' '}

                        <br/>
                        <b style={{fontSize: '0.9rem'}}>Transaction Fee</b>
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
