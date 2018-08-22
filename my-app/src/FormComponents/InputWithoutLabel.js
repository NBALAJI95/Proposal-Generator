import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateStateValue} from "../actions";

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
                    <input id={`${id}_Volume`} name={`${id}_Volume`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="Volume" onChange={this.handleChange.bind(this)}
                       value={this.StateV[id].Volume} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Number`} name={`${id}_Number`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="#" onChange={this.handleChange.bind(this)}
                       value={this.StateV[id].Number} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Percentage`} name={`${id}_Percentage`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="%" onChange={this.handleChange.bind(this)}
                       value={this.StateV[id].Percentage} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Item`} name={`${id}_Item`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="Item" onChange={this.handleChange.bind(this)}
                       value={this.StateV[id].Item} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Fee`} name={`${id}_Fee`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="Fee" onChange={this.handleChange.bind(this)}
                       value={this.StateV[`${id}`].Fee} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(CardInput);