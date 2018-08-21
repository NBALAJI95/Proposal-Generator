import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateStateValue} from "../actions";

/*const commaFeature = (id) => {
    const tmp = parseFloat($(id).val()).toLocaleString('en-US', {minimumFractionDigits: 2, maximumFractionDigits:2});
    $(id).attr("type", "text");
    $(id).val(tmp);
};

const resetVal = (id) => {
    $(id).attr("type", "text");
    $(id).val("");
};

const numberInput = (id) => {
    const tmp = $(id).val();
    let op = "";
    for(let i = 0; i < tmp.length; i++) {
        if(tmp[i] !== ",") {
            op += tmp[i];
        }
    }
    op = parseFloat(op);
    $(id).attr("type", "number");
    $(id).val(op);
};*/

const ValueOf = (val) => (
    parseFloat(val) || 0
);

const calculateTotalAdditionalFee = (AdditionalFee) => {
    let total = 0;

    Object.values(AdditionalFee).forEach((item, key) => {
        total += ValueOf(item);
    });
    return total;
};

class InputWithLabel extends Component {
    focus() {
        // console.log("Focused");
    }

    requiredLabel(req) {
        if(req)
            return (<span style={{color: 'red'}}> *</span>);
    }

    handleChange(event) {
        let val = '', name = event.target.name;

        if(event.target.type === "number")
            val = parseFloat(event.target.value);
        else
            val = event.target.value;

        if(event.target.name.indexOf("_") >= 0) {
            name = event.target.name.split('_');
            val = Object.assign({}, this.props.State[`${name[0]}`], {[name[1]]: val});
            name = name[0];
            if(name === "AdditionalFees")
                this.props.updateStateValue('Total', "Total", {TotalAdditionalFee: calculateTotalAdditionalFee(val)});
        }

        this.props.updateStateValue('InputWithLabel', name, val);
    }

    renderInput() {
        if(this.props.id.indexOf("_") >= 0) {
            const name = this.props.id.split('_');
            if(name[0] === 'AdditionalFees') {

                return (
                    <input onFocus={this.focus.bind(this)} type={this.props.type || "number"}
                       value={parseFloat(this.props.State.AdditionalFees[name[1]]) || ''} className="form-control" id={this.props.id}
                       name={this.props.id} title={this.props.title} placeholder={this.props.placeholder}
                       required={this.props.required} onChange={this.handleChange.bind(this)} min={this.props.min}/>
                );
            }
        }
        else {
            return (
                <input onFocus={this.focus.bind(this)} type={this.props.type || "number"}
                       value={this.props.State[this.props.id]} className="form-control" id={this.props.id}
                       name={this.props.id} title={this.props.title} placeholder={this.props.placeholder}
                       required={this.props.required} onChange={this.handleChange.bind(this)} min={this.props.min}/>
            );
        }
    }

    render() {
        return (
            <div>
                <strong>
                    <label htmlFor={this.props.id} style={{marginTop: '0.5rem'}}>
                        {this.props.label}
                        {this.requiredLabel(this.props.required)}
                    </label>
                </strong>

                <div>
                    {this.renderInput()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(InputWithLabel);