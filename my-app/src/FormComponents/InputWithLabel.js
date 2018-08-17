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


class InputWithLabel extends Component {
    focus() {
        // console.log("Focused");
    }

    handleChange(event) {
        let val = '';

        if(event.target.type == "number")
            val = parseFloat(event.target.value);
        else
            val = event.target.value;

        this.props.updateStateValue('InputWithLabel', event.target.name, val);

        console.log(this.props.State);
    }

    render() {
        /*console.log('S', this.props.State);
        console.log('Prop:', this.props.id);
        console.log('Value: ', this.props.State[`${this.props.id}`]);*/
        return (
            <div>
                <strong>
                    <label htmlFor={this.props.id} style={{marginTop: '0.5rem'}}>
                        {this.props.label}
                        <span style={{color: 'red'}}> *</span>
                    </label>
                </strong>

                <div>
                    <input onFocus={this.focus.bind(this)} type={this.props.type || "number"} value={this.props.State[this.props.id]}
                       className="form-control" id={this.props.id} name={this.props.id} title={this.props.title}
                       placeholder={this.props.placeholder} required={this.props.required}
                       onChange={this.handleChange.bind(this)} min={this.props.min} />
                </div>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(InputWithLabel);