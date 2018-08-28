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

const removeNaN = (type, val) => {
    if(type === "number") {
        return (ValueOf(val) === 0) ? '' : val;
    }
    else
        return val;
};

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
        let name='';
        const { id, type, partB, title, placeholder, required, min } = this.props;
        if(id.indexOf("_") >= 0) {
            name = id.split('_');
            
            if(name[0] === 'AdditionalFees') {
                return (
                    <input onFocus={this.focus.bind(this)} type={type || "number"} className="form-control"
                       value={removeNaN(type || "number", this.StateV.AdditionalFees[name[1]])}
                       id={`${id}_${(partB || 'partA')}`} name={id} title={title} placeholder={placeholder}
                       required={required} onChange={this.handleChange.bind(this)} min={min} />
                );
            }
            else if (name[0] === 'Processing') {
                return (
                    <input onFocus={this.focus.bind(this)} type={type || "number"} min={min} className="form-control"
                       value={removeNaN(type || "number", this.StateV.ProcessingFees[name[1]][name[2]])}
                       name={id} title={title} id={`${id}`} placeholder={placeholder} required={required}
                       onChange={this.handleChange.bind(this)} />
                );
            }
        }
        else {
            return (
                <input onFocus={this.focus.bind(this)} type={type || "number"} className="form-control" min={min}
                   value={removeNaN(type || "number", this.StateV[id])} id={`${id}_${(partB || 'partA')}`} name={id}
                   title={title} placeholder={placeholder} required={required} onChange={this.handleChange.bind(this)} />
            );
        }
    }

    renderLabel(label) {
        if(label) {
            return (
                <strong>
                    <label htmlFor={`${this.props.id}_${(this.props.partB || 'partA')}`} style={{marginTop: '0.5rem'}}>
                        {this.props.label}
                        {InputWithLabel.requiredLabel(this.props.required)}
                    </label>
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

const mapStateToProps = (stateV) => {
    return (stateV);
};

export default connect(mapStateToProps, {updateStateValue})(InputWithLabel);