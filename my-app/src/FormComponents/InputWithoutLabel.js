import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateStateValue} from "../actions";
import InputWithLabel from './InputWithLabel.js';

const ValueOf = (val) => (
    parseFloat(val) || 0
);

class CardInput extends Component {

    handleChange(event) {
        let val = '';

        if(event.target.type === "number")
            val = ValueOf(event.target.value) || '';
        else
            val = event.target.value;

        let key = event.target.name.split('_');

        let getV = this.StateV[`${key[0]}`];
        getV[`${key[1]}`] = val;

        const newV = {};

        let fee = (ValueOf(getV['Volume']) * (ValueOf(getV['Percentage']))/100) +
            (ValueOf(getV['Number'])) * (ValueOf(getV['Item']));

        fee = parseFloat(fee.toFixed(2));

        getV['Fee'] = fee;

        newV[`${key[0]}`] = getV;

        this.props.updateStateValue('InputWithoutLabel', `${key[0]}`, getV, (this.props.partB || "partA"));
    }

    render() {
        const id = this.props.id;

        const { partA, partB } = this.props.State;
        this.StateV = (this.props.partB) ? partB : partA;

        return (
            <div className="row" style={{ marginTop: '1rem' }}>
                <div className="col-sm-2">
                    <strong> { this.props.label } </strong>
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Volume_${(this.props.partB || "partA")}`} placeholder="Volume (USD)"
                        title="Volume" min="0" partB={this.props.partB} />
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Number_${(this.props.partB || "partA")}`} placeholder="#"
                        title="#" min="0" partB={this.props.partB} />
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Percentage_${(this.props.partB || "partA")}`} placeholder="%"
                        title="%" min="0" partB={this.props.partB} />
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Item_${(this.props.partB || "partA")}`} placeholder="%"
                        title="%" min="0" partB={this.props.partB} />
                </div>

                <div className="col-sm-2">
                    <InputWithLabel id={`Processing_${id}_Fee_${(this.props.partB || "partA")}`} placeholder="Fee"
                        title="Fee" min="0" partB={this.props.partB} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(CardInput);