import React, { Component } from 'react';
import {connect} from "react-redux";
import {updateStateValue} from "../actions";
import { Label, Input } from 'reactstrap';

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

class InputWithLabel extends Component {
    
    focus() {
        // console.log("Focused");
    }

    static requiredLabel(req) {
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

            if(name[0] === "AdditionalFees") {
                val = Object.assign({}, this.StateV[`${name[0]}`], {[name[1]]: val});
                name = "AdditionalFees";
            }
            else if (name[0] === "Processing") {
                const pf = Object.assign({}, this.StateV[`ProcessingFees`][name[1]], { [name[2]]: val });
                val = Object.assign({}, this.StateV[`ProcessingFees`], {[name[1]]: pf});
                name = 'ProcessingFees';
            }
        }

        this.props.updateStateValue('InputWithLabel', name, val, (this.props.partB || 'partA'));
    }

    renderInput() {
        let name = '';
        const { id, type, partB, title, placeholder, required, min } = this.props;
        let Value;

        if(id.indexOf("_") >= 0) {
            name = id.split('_');
            if(name[0] === 'AdditionalFees') {
                Value = this.StateV.AdditionalFees[name[1]];
            }
            else if (name[0] === 'Processing') {
                Value = this.StateV.ProcessingFees[name[1]][name[2]];
            }
        }
        else {
            Value = this.StateV[id];
        }

        return (
            <Input onFocus={this.focus.bind(this)} type={type || "number"} className="form-control"
               value={Value} id={`${id}_${(partB || 'partA')}`} name={id} title={title} placeholder={placeholder}
               required={required} onChange={this.handleChange.bind(this)} min={min} />
        );
    }

    renderLabel(label) {
        if(label) {
            return (
                <strong>
                    <Label for={`${this.props.id}_${(this.props.partB || 'partA')}`} style={{marginTop: '0.5rem'}}>
                        {this.props.label}
                        {InputWithLabel.requiredLabel(this.props.required)}
                    </Label>
                </strong>
            );
        }
    }

    render() {
        const { partA, partB } = this.props.State;
        this.StateV = (this.props.partB) ? partB : partA;

        return (
            <div>
                {this.renderLabel(this.props.label)}

                <div>
                    {this.renderInput()}
                </div>
            </div>
        );
    }
}

const mapStateToProps = (stateV) => (stateV);

export default connect(mapStateToProps, {updateStateValue})(InputWithLabel);