import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateStateValue} from "../actions";

class CardInput extends Component {

    handleChange(event) {
        console.log('val', event.target.value);
        let val = '';

        if(event.target.type == "number")
            val = parseFloat(event.target.value);
        else
            val = event.target.value;

        let key = event.target.name.split('_');
        
        let getV = this.props.State[`${key[0]}`];
        getV[`${key[1]}`] = val;

        const newV = {};

        let fee = ((parseFloat(getV['Volume']) || 0) * (parseFloat(getV['Percentage']) || 0)/100) +
            ((parseFloat(getV['Number']) || 0) * (parseFloat(getV['Item']) || 0));

        fee = parseFloat(fee.toFixed(2));

        getV['Fee'] = fee;

        newV[`${key[0]}`] = getV;

        this.props.updateStateValue('InputWithoutLabel', `${key[0]}`, getV);

        console.log('STATE', this.props.State);
    }

    render() {
        const id = this.props.id;

        return (
            <div className="row" style={{ marginTop: '1rem' }}>
                <div className="col-sm-2">
                    <strong> { this.props.label } </strong>
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Volume`} name={`${id}_Volume`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="Volume" onChange={this.handleChange.bind(this)}
                       value={this.props.State[id].Volume} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Number`} name={`${id}_Number`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="#" onChange={this.handleChange.bind(this)}
                       value={this.props.State[id].Number} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Percentage`} name={`${id}_Percentage`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="%" onChange={this.handleChange.bind(this)}
                       value={this.props.State[id].Percentage} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Item`} name={`${id}_Item`} className="form-control" min="0" type="number"
                       style={{width: '100%'}} placeholder="Item" onChange={this.handleChange.bind(this)}
                       value={this.props.State[id].Item} />
                </div>

                <div className="col-sm-2">
                    <input id={`${id}_Fee`} name={`${id}_Fee`} className="form-control" min="0" type="text"
                       style={{width: '100%'}} placeholder="Fee" onChange={this.handleChange.bind(this)}
                       value={this.props.State[`${id}`].Fee} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(CardInput);